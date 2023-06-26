import * as yup from 'yup';

export const mentorshipValidationSchema = yup.object().shape({
  mentor_id: yup.string().nullable().required(),
  mentee_id: yup.string().nullable().required(),
});
