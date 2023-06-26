import { ProjectInterface } from 'interfaces/project';
import { CollaboratorInterface } from 'interfaces/collaborator';
import { GetQueryInterface } from 'interfaces';

export interface ProjectCollaboratorInterface {
  id?: string;
  project_id: string;
  collaborator_id: string;
  created_at?: any;
  updated_at?: any;

  project?: ProjectInterface;
  collaborator?: CollaboratorInterface;
  _count?: {};
}

export interface ProjectCollaboratorGetQueryInterface extends GetQueryInterface {
  id?: string;
  project_id?: string;
  collaborator_id?: string;
}
