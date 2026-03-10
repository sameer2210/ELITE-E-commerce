import DeveloperProfile from '../models/developerProfile.model.js';
import { buildCrudController } from './crud.controller.js';

const { list, getById, create, update, remove } = buildCrudController(
  DeveloperProfile,
  {
    resourceName: 'Developer profile',
    searchFields: ['title', 'bio', 'skills', 'location'],
    filterFields: ['userId', 'skills', 'technologies', 'availability', 'location'],
    allowedPopulate: ['userId', 'technologies', 'portfolioProjects', 'awards'],
    ownerField: 'userId',
    assignOwnerOnCreate: true,
  }
);

export const getDeveloperProfiles = list;
export const getDeveloperProfileById = getById;
export const createDeveloperProfile = create;
export const updateDeveloperProfile = update;
export const deleteDeveloperProfile = remove;

export const getMyDeveloperProfile = async (req, res, next) => {
  try {
    const profile = await DeveloperProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Developer profile not found' });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const upsertMyDeveloperProfile = async (req, res, next) => {
  try {
    const payload = { ...req.body, userId: req.user._id };
    const profile = await DeveloperProfile.findOneAndUpdate(
      { userId: req.user._id },
      payload,
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
