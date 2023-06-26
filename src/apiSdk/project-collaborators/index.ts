import axios from 'axios';
import queryString from 'query-string';
import { ProjectCollaboratorInterface, ProjectCollaboratorGetQueryInterface } from 'interfaces/project-collaborator';
import { GetQueryInterface } from '../../interfaces';

export const getProjectCollaborators = async (query?: ProjectCollaboratorGetQueryInterface) => {
  const response = await axios.get(`/api/project-collaborators${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createProjectCollaborator = async (projectCollaborator: ProjectCollaboratorInterface) => {
  const response = await axios.post('/api/project-collaborators', projectCollaborator);
  return response.data;
};

export const updateProjectCollaboratorById = async (id: string, projectCollaborator: ProjectCollaboratorInterface) => {
  const response = await axios.put(`/api/project-collaborators/${id}`, projectCollaborator);
  return response.data;
};

export const getProjectCollaboratorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/project-collaborators/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteProjectCollaboratorById = async (id: string) => {
  const response = await axios.delete(`/api/project-collaborators/${id}`);
  return response.data;
};
