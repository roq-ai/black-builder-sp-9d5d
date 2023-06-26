import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createEventAttendee } from 'apiSdk/event-attendees';
import { Error } from 'components/error';
import { eventAttendeeValidationSchema } from 'validationSchema/event-attendees';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { EventInterface } from 'interfaces/event';
import { UserInterface } from 'interfaces/user';
import { getEvents } from 'apiSdk/events';
import { getUsers } from 'apiSdk/users';
import { EventAttendeeInterface } from 'interfaces/event-attendee';

function EventAttendeeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EventAttendeeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEventAttendee(values);
      resetForm();
      router.push('/event-attendees');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EventAttendeeInterface>({
    initialValues: {
      event_id: (router.query.event_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: eventAttendeeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Event Attendee
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<EventInterface>
            formik={formik}
            name={'event_id'}
            label={'Select Event'}
            placeholder={'Select Event'}
            fetcher={getEvents}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'event_attendee',
  operation: AccessOperationEnum.CREATE,
})(EventAttendeeCreatePage);
