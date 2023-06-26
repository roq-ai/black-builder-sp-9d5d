import { ProjectCollaboratorInterface } from 'interfaces/project-collaborator';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  description?: string;
  entrepreneur_id: string;
  created_at?: any;
  updated_at?: any;
  project_collaborator?: ProjectCollaboratorInterface[];
  user?: UserInterface;
  _count?: {
    project_collaborator?: number;
  };
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  entrepreneur_id?: string;
}
