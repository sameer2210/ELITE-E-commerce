import Notification from '../models/notification.model.js';
import { getPagination } from './crud.controller.js';

export const getNotifications = async (req, res, next) => {
  try {
    const { skip, limit } = getPagination(req);
    const filters = { userId: req.user._id };

    if (req.query.isRead !== undefined) {
      filters.isRead = req.query.isRead === 'true';
    }

    let query = Notification.find(filters).sort('-createdAt');
    if (skip) query = query.skip(skip);
    if (limit) query = query.limit(limit);

    const notifications = await query.exec();
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  try {
    const created = await Notification.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const markNotificationRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      res.status(404);
      throw new Error('Notification not found');
    }

    if (
      req.user.role !== 'admin' &&
      notification.userId?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    notification.isRead = true;
    const updated = await notification.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      res.status(404);
      throw new Error('Notification not found');
    }

    if (
      req.user.role !== 'admin' &&
      notification.userId?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await notification.deleteOne();
    res.json({ message: 'Notification deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
};
