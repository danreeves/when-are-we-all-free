import { forwardTo } from 'prisma-binding';

export const Mutation = {
  createUser: forwardTo('db'),
  createEvent: forwardTo('db'),
  createSlot: forwardTo('db'),
  updateUser: forwardTo('db'),
  updateEvent: forwardTo('db'),
  updateSlot: forwardTo('db'),
  deleteUser: forwardTo('db'),
  deleteEvent: forwardTo('db'),
  deleteSlot: forwardTo('db'),
};
