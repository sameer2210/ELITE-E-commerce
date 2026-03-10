import ProjectRequest from '../models/projectRequest.model.js';
import { buildCrudController } from './crud.controller.js';

const { list, getById, create, update, remove } = buildCrudController(
  ProjectRequest,
  {
    resourceName: 'Project request',
    searchFields: ['title', 'description'],
    filterFields: ['clientId', 'category', 'technologies', 'status'],
    allowedPopulate: ['clientId', 'category', 'technologies', 'matchedDevelopers'],
    ownerField: 'clientId',
    assignOwnerOnCreate: true,
  }
);

export const getProjectRequests = list;
export const getProjectRequestById = getById;
export const createProjectRequest = create;
export const updateProjectRequest = update;
export const deleteProjectRequest = remove;
