import ClientProfile from '../models/clientProfile.model.js';
import { buildCrudController } from './crud.controller.js';

const { list, getById, create, update, remove } = buildCrudController(
  ClientProfile,
  {
    resourceName: 'Client profile',
    searchFields: ['companyName', 'industry', 'location', 'description'],
    filterFields: ['userId', 'industry', 'companySize', 'location'],
    ownerField: 'userId',
    assignOwnerOnCreate: true,
  }
);

export const getClientProfiles = list;
export const getClientProfileById = getById;
export const createClientProfile = create;
export const updateClientProfile = update;
export const deleteClientProfile = remove;

export const getMyClientProfile = async (req, res, next) => {
  try {
    const profile = await ClientProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Client profile not found' });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const upsertMyClientProfile = async (req, res, next) => {
  try {
    const payload = { ...req.body, userId: req.user._id };
    const profile = await ClientProfile.findOneAndUpdate(
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
