import { Setting, User } from '@src/business';

export type LoginResult = {
  user: User;
  setting: Setting;
};
