import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator((_, ctx) =>
  getCurrentUserByContext(ctx),
);
