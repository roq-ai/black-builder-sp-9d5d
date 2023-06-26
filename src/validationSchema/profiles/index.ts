import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  skills: yup.string(),
  expertise: yup.string(),
  interests: yup.string(),
  user_id: yup.string().nullable().required(),
});
