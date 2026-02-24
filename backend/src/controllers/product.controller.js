import Product from "../models/product.model.js";

const parsePositiveInt = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return null;
  return Math.floor(num);
};

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

// @desc    Get all products (supports _start/_limit pagination)
// @route   GET /api/product OR /products
export const getProducts = async (req, res, next) => {
  try {
    const { skip, limit } = getPagination(req);
    let query = Product.find();
    if (skip) query = query.skip(skip);
    if (limit) query = query.limit(limit);
    const products = await query.exec();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/product/:id OR /products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/product OR /products
export const createProduct = async (req, res, next) => {
  try {
    const created = await Product.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT/PATCH /api/product/:id OR /products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/product/:id OR /products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({ message: "Product deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};
