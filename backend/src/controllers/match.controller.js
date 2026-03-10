import Match from '../models/match.model.js';
import ProjectRequest from '../models/projectRequest.model.js';
import { applyPopulate, buildFilters, getPagination } from './crud.controller.js';

const allowedPopulate = ['projectRequestId', 'developerId'];

const ensureClientAccess = async (projectRequestId, userId) => {
  const request = await ProjectRequest.findById(projectRequestId).select(
    'clientId'
  );
  return request && request.clientId?.toString() === userId.toString();
};

export const getMatches = async (req, res, next) => {
  try {
    const { skip, limit } = getPagination(req);
    const filters = buildFilters(req.query, ['projectRequestId', 'developerId']);

    if (req.user.role === 'developer') {
      filters.developerId = req.user._id;
    }

    if (req.user.role === 'client') {
      if (filters.projectRequestId) {
        const allowed = await ensureClientAccess(
          filters.projectRequestId,
          req.user._id
        );
        if (!allowed) {
          return res.status(403).json({ message: 'Not authorized' });
        }
      } else {
        const requests = await ProjectRequest.find({
          clientId: req.user._id,
        }).select('_id');
        const ids = requests.map((item) => item._id);
        if (!ids.length) {
          return res.json([]);
        }
        filters.projectRequestId = { $in: ids };
      }
    }

    let query = Match.find(filters).sort('-createdAt');
    if (skip) query = query.skip(skip);
    if (limit) query = query.limit(limit);
    query = applyPopulate(query, req, allowedPopulate, []);

    const matches = await query.exec();
    res.json(matches);
  } catch (error) {
    next(error);
  }
};

export const getMatchById = async (req, res, next) => {
  try {
    let query = Match.findById(req.params.id);
    query = applyPopulate(query, req, allowedPopulate, []);
    const match = await query.exec();
    if (!match) {
      res.status(404);
      throw new Error('Match not found');
    }

    if (req.user.role === 'developer') {
      if (match.developerId?.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    if (req.user.role === 'client') {
      const allowed = await ensureClientAccess(
        match.projectRequestId,
        req.user._id
      );
      if (!allowed) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    res.json(match);
  } catch (error) {
    next(error);
  }
};

export const createMatch = async (req, res, next) => {
  try {
    const created = await Match.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateMatch = async (req, res, next) => {
  try {
    const updated = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404);
      throw new Error('Match not found');
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteMatch = async (req, res, next) => {
  try {
    const deleted = await Match.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error('Match not found');
    }
    res.json({ message: 'Match deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
};
