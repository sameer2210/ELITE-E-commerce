import Technology from '../models/technology.model.js';
import { buildCrudController } from './crud.controller.js';

const { list, getById, create, update, remove } = buildCrudController(
  Technology,
  {
    resourceName: 'Technology',
    searchFields: ['name', 'category'],
    filterFields: ['name', 'category'],
    defaultSort: 'name',
  }
);

export const getTechnologies = list;
export const getTechnologyById = getById;
export const createTechnology = create;
export const updateTechnology = update;
export const deleteTechnology = remove;
