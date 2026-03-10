const parsePositiveInt = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return null;
  return Math.floor(num);
};

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getPagination = (req) => {
  const start = parsePositiveInt(req.query._start);
  const limit = parsePositiveInt(req.query._limit);

  if (start !== null || limit !== null) {
    return { skip: start || 0, limit: limit || 0 };
  }

  const page = parsePositiveInt(req.query.page);
  const pageLimit = parsePositiveInt(req.query.limit);
  if (pageLimit !== null) {
    const safePage = page && page > 0 ? page : 1;
    return { skip: (safePage - 1) * pageLimit, limit: pageLimit };
  }

  return { skip: 0, limit: 0 };
};

const parseCommaList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const buildFilters = (query, allowedFields = []) => {
  const filters = {};
  for (const field of allowedFields) {
    const raw = query[field];
    if (raw === undefined) continue;
    if (typeof raw === "string" && raw.includes(",")) {
      filters[field] = { $in: parseCommaList(raw) };
    } else {
      filters[field] = raw;
    }
  }
  return filters;
};

const buildSearchFilter = (searchTerm, searchFields = []) => {
  if (!searchTerm || !searchFields.length) return null;
  const regex = new RegExp(escapeRegExp(searchTerm), "i");
  return {
    $or: searchFields.map((field) => ({ [field]: regex })),
  };
};

const applyPopulate = (query, req, allowedPopulate = [], defaultPopulate = []) => {
  const raw = req.query.populate;
  const requested = typeof raw === "string" ? parseCommaList(raw) : [];
  const populateFields = new Set([
    ...defaultPopulate,
    ...requested.filter((path) => allowedPopulate.includes(path)),
  ]);
  for (const path of populateFields) {
    query = query.populate(path);
  }
  return query;
};

const pickAllowed = (payload, allowedFields) => {
  if (!Array.isArray(allowedFields) || !allowedFields.length) {
    return { ...payload };
  }
  const picked = {};
  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      picked[field] = payload[field];
    }
  }
  return picked;
};

const isAdmin = (req) => req.user && req.user.role === "admin";

const ensureOwner = (doc, req, ownerField) => {
  if (!ownerField || isAdmin(req)) return true;
  const ownerId = doc?.[ownerField]?.toString();
  const userId = req.user?._id?.toString();
  return ownerId && userId && ownerId === userId;
};

const assignOwner = (payload, req, ownerField, allowAdminOverride = true) => {
  if (!ownerField || !req.user) return payload;
  if (!isAdmin(req) || !allowAdminOverride) {
    return { ...payload, [ownerField]: req.user._id };
  }
  if (!payload[ownerField]) {
    return { ...payload, [ownerField]: req.user._id };
  }
  return payload;
};

const sanitizePayload = (payload, req, ownerField, allowedFields) => {
  const cleaned = pickAllowed(payload, allowedFields);
  if (ownerField && !isAdmin(req)) {
    delete cleaned[ownerField];
  }
  return cleaned;
};

export const buildCrudController = (
  Model,
  {
    resourceName = "Resource",
    searchFields = [],
    filterFields = [],
    defaultSort = "-createdAt",
    allowedPopulate = [],
    defaultPopulate = [],
    ownerField = null,
    assignOwnerOnCreate = false,
    allowAdminOverride = true,
    allowedFields = null,
    scopeToUser = false,
  } = {}
) => {
  const list = async (req, res, next) => {
    try {
      const { skip, limit } = getPagination(req);
      const filters = buildFilters(req.query, filterFields);
      if (scopeToUser && ownerField && req.user && !isAdmin(req)) {
        filters[ownerField] = req.user._id;
      }

      const searchTerm = (req.query.q || req.query.search || "").trim();
      const searchFilter = buildSearchFilter(searchTerm, searchFields);

      let query = Model.find(filters);
      if (searchFilter) {
        query = query.find(searchFilter);
      }

      if (skip) query = query.skip(skip);
      if (limit) query = query.limit(limit);
      query = query.sort(req.query.sort || defaultSort);
      query = applyPopulate(query, req, allowedPopulate, defaultPopulate);

      const docs = await query.exec();
      res.json(docs);
    } catch (error) {
      next(error);
    }
  };

  const getById = async (req, res, next) => {
    try {
      let query = Model.findById(req.params.id);
      query = applyPopulate(query, req, allowedPopulate, defaultPopulate);
      const doc = await query.exec();
      if (!doc) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      res.json(doc);
    } catch (error) {
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      let payload = sanitizePayload(req.body || {}, req, ownerField, allowedFields);
      if (assignOwnerOnCreate) {
        payload = assignOwner(payload, req, ownerField, allowAdminOverride);
      }
      const created = await Model.create(payload);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      if (!ensureOwner(doc, req, ownerField)) {
        res.status(403);
        throw new Error("Not authorized to update this resource");
      }
      const updates = sanitizePayload(req.body || {}, req, ownerField, allowedFields);
      Object.assign(doc, updates);
      const updated = await doc.save();
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      if (!ensureOwner(doc, req, ownerField)) {
        res.status(403);
        throw new Error("Not authorized to delete this resource");
      }
      await doc.deleteOne();
      res.json({ message: `${resourceName} deleted`, id: req.params.id });
    } catch (error) {
      next(error);
    }
  };

  return { list, getById, create, update, remove };
};

export {
  applyPopulate,
  buildFilters,
  buildSearchFilter,
  escapeRegExp,
  getPagination,
  parsePositiveInt,
};
