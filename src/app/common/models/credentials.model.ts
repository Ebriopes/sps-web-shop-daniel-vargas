import { IUser } from './user.model';

export interface ICredentials {
  username: string;
  password: string;
}

export type ILogData = Omit<IUser, 'id'>;
