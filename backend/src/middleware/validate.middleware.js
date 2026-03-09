const formatValidationErrors = (error) => {
  if (!error) return ["Invalid request"];

  if (Array.isArray(error)) {
    return error
      .map((item) => item?.message || item?.msg || (typeof item === "string" ? item : null))
      .filter(Boolean);
  }

  if (Array.isArray(error.errors)) {
    return error.errors
      .map((item) => item?.message || item?.msg || (typeof item === "string" ? item : null))
      .filter(Boolean);
  }

  if (Array.isArray(error.details)) {
    return error.details
      .map((detail) => detail?.message || detail?.msg || (typeof detail === "string" ? detail : null))
      .filter(Boolean);
  }

  if (Array.isArray(error.issues)) {
    return error.issues
      .map((issue) => issue?.message || issue?.msg || (typeof issue === "string" ? issue : null))
      .filter(Boolean);
  }

  if (error.message) return [error.message];

  return ["Invalid request"];
};

export const validate = (schema, source = "body") => (req, res, next) => {
  if (!schema) return next();

  const data = req[source];

  try {
    if (typeof schema.safeParse === "function") {
      const result = schema.safeParse(data);
      if (!result.success) {
        res.status(400);
        const errors = formatValidationErrors(result.error);
        return next(new Error(errors.join(", ")));
      }
      req[source] = result.data;
      return next();
    }

    if (typeof schema.parse === "function") {
      const parsed = schema.parse(data);
      req[source] = parsed;
      return next();
    }

    if (typeof schema.validate === "function") {
      const { error, value } = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        res.status(400);
        const errors = formatValidationErrors(error);
        return next(new Error(errors.join(", ")));
      }
      if (value !== undefined) {
        req[source] = value;
      }
      return next();
    }

    if (typeof schema === "function") {
      const result = schema(data, req);
      if (result === true || result === undefined) return next();
      if (result === false) {
        res.status(400);
        return next(new Error("Validation failed"));
      }
      if (typeof result === "string") {
        res.status(400);
        return next(new Error(result));
      }
      if (Array.isArray(result)) {
        res.status(400);
        return next(new Error(result.join(", ")));
      }
      if (result && result.error) {
        res.status(400);
        const errors = formatValidationErrors(result.error);
        return next(new Error(errors.join(", ")));
      }
      return next();
    }

    return next();
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(400);
    }
    return next(error);
  }
};

export const validateBody = (schema) => validate(schema, "body");
export const validateParams = (schema) => validate(schema, "params");
export const validateQuery = (schema) => validate(schema, "query");
