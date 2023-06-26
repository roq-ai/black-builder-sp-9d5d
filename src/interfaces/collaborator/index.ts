import { ProjectCollaboratorInterface } from 'interfaces/project-collaborator';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CollaboratorInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  project_collaborator?: ProjectCollaboratorInterface[];
  user?: UserInterface;
  _count?: {
    project_collaborator?: number;
  };
}

export interface CollaboratorGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
