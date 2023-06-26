import { EventInterface } from 'interfaces/event';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EventAttendeeInterface {
  id?: string;
  event_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  event?: EventInterface;
  user?: UserInterface;
  _count?: {};
}

export interface EventAttendeeGetQueryInterface extends GetQueryInterface {
  id?: string;
  event_id?: string;
  user_id?: string;
}
