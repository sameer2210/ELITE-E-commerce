import Project from '../models/project.model.js';
import { buildCrudController } from './crud.controller.js';

const { list, getById, create, update, remove } = buildCrudController(Project, {
  resourceName: 'Project',
  searchFields: ['title', 'description'],
  filterFields: ['developerId', 'category', 'technologies', 'awards'],
  allowedPopulate: ['developerId', 'category', 'technologies', 'awards'],
  ownerField: 'developerId',
  assignOwnerOnCreate: true,
});

export const getProjects = list;
export const getProjectById = getById;
export const createProject = create;
export const updateProject = update;
export const deleteProject = remove;
