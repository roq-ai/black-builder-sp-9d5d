import * as yup from 'yup';

export const projectCollaboratorValidationSchema = yup.object().shape({
  project_id: yup.string().nullable().required(),
  collaborator_id: yup.string().nullable().required(),
});
