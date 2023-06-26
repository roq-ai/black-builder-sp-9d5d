import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MentorshipInterface {
  id?: string;
  mentor_id: string;
  mentee_id: string;
  created_at?: any;
  updated_at?: any;

  user_mentorship_mentor_idTouser?: UserInterface;
  user_mentorship_mentee_idTouser?: UserInterface;
  _count?: {};
}

export interface MentorshipGetQueryInterface extends GetQueryInterface {
  id?: string;
  mentor_id?: string;
  mentee_id?: string;
}
