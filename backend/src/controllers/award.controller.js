import Award from '../models/award.model.js';
import { buildCrudController } from './crud.controller.js';

const { list, getById, create, update, remove } = buildCrudController(Award, {
  resourceName: 'Award',
  searchFields: ['name', 'type'],
  filterFields: ['type', 'projectId', 'developerId', 'year'],
  allowedPopulate: ['projectId', 'developerId'],
});

export const getAwards = list;
export const getAwardById = getById;
export const createAward = create;
export const updateAward = update;
export const deleteAward = remove;
