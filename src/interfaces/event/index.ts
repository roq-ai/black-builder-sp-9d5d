import { EventAttendeeInterface } from 'interfaces/event-attendee';
import { GetQueryInterface } from 'interfaces';

export interface EventInterface {
  id?: string;
  name: string;
  description?: string;
  date: any;
  created_at?: any;
  updated_at?: any;
  event_attendee?: EventAttendeeInterface[];

  _count?: {
    event_attendee?: number;
  };
}

export interface EventGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
}
