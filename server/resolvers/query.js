import { forwardTo } from 'prisma-binding';

export const Query = {
  users: forwardTo('db'),
  slots: forwardTo('db'),
  events: forwardTo('db'),
};
