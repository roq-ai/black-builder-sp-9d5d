import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProfileInterface {
  id?: string;
  user_id: string;
  skills?: string;
  expertise?: string;
  interests?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  skills?: string;
  expertise?: string;
  interests?: string;
}
