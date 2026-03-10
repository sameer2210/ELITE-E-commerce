import Message from '../models/message.model.js';
import { applyPopulate, getPagination } from './crud.controller.js';

const allowedPopulate = ['senderId', 'receiverId', 'projectRequestId'];

export const getMessages = async (req, res, next) => {
  try {
    const { skip, limit } = getPagination(req);
    const { projectRequestId, withUserId } = req.query;
    const filters = {};

    if (projectRequestId) {
      filters.projectRequestId = projectRequestId;
    }

    if (withUserId) {
      filters.$or = [
        { senderId: req.user._id, receiverId: withUserId },
        { senderId: withUserId, receiverId: req.user._id },
      ];
    } else {
      filters.$or = [
        { senderId: req.user._id },
        { receiverId: req.user._id },
      ];
    }

    let query = Message.find(filters).sort('-createdAt');
    if (skip) query = query.skip(skip);
    if (limit) query = query.limit(limit);
    query = applyPopulate(query, req, allowedPopulate, []);

    const messages = await query.exec();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const getMessageById = async (req, res, next) => {
  try {
    let query = Message.findById(req.params.id);
    query = applyPopulate(query, req, allowedPopulate, []);
    const message = await query.exec();
    if (!message) {
      res.status(404);
      throw new Error('Message not found');
    }

    const userId = req.user._id.toString();
    const sender = message.senderId?.toString();
    const receiver = message.receiverId?.toString();
    if (req.user.role !== 'admin' && sender !== userId && receiver !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(message);
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const payload = { ...req.body, senderId: req.user._id };
    const created = await Message.create(payload);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error('Message not found');
    }

    const sender = message.senderId?.toString();
    if (req.user.role !== 'admin' && sender !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (req.body.message !== undefined) message.message = req.body.message;
    if (req.body.attachments !== undefined)
      message.attachments = req.body.attachments;

    const updated = await message.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error('Message not found');
    }

    const sender = message.senderId?.toString();
    const receiver = message.receiverId?.toString();
    const userId = req.user._id.toString();
    if (
      req.user.role !== 'admin' &&
      sender !== userId &&
      receiver !== userId
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await message.deleteOne();
    res.json({ message: 'Message deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
};
