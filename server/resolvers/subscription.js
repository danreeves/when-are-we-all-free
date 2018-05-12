import { forwardTo } from 'prisma-binding';

export const Subscription = {
  slot: { subscribe: forwardTo('db') },
};
