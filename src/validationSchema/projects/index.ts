import * as yup from 'yup';

export const projectValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  entrepreneur_id: yup.string().nullable().required(),
});
