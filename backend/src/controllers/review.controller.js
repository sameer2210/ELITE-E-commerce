import Review from '../models/review.model.js';
import { buildCrudController } from './crud.controller.js';

const { list, getById, create, update, remove } = buildCrudController(Review, {
  resourceName: 'Review',
  searchFields: ['comment'],
  filterFields: ['clientId', 'developerId', 'projectRequestId', 'rating'],
  allowedPopulate: ['clientId', 'developerId', 'projectRequestId'],
  ownerField: 'clientId',
  assignOwnerOnCreate: true,
});

export const getReviews = list;
export const getReviewById = getById;
export const createReview = create;
export const updateReview = update;
export const deleteReview = remove;
