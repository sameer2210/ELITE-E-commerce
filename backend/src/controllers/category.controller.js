import Category from '../models/category.model.js';
import { buildCrudController } from './crud.controller.js';

const { list, getById, create, update, remove } = buildCrudController(
  Category,
  {
    resourceName: 'Category',
    searchFields: ['name', 'description'],
    filterFields: ['name'],
    defaultSort: 'name',
  }
);

export const getCategories = list;
export const getCategoryById = getById;
export const createCategory = create;
export const updateCategory = update;
export const deleteCategory = remove;
