import * as yup from 'yup';

export const eventAttendeeValidationSchema = yup.object().shape({
  event_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
