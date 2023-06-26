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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getProfileById, updateProfileById } from 'apiSdk/profiles';
import { Error } from 'components/error';
import { profileValidationSchema } from 'validationSchema/profiles';
import { ProfileInterface } from 'interfaces/profile';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function ProfileEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProfileInterface>(
    () => (id ? `/profiles/${id}` : null),
    () => getProfileById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProfileById(id, values);
      mutate(updated);
      resetForm();
      router.push('/profiles');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ProfileInterface>({
    initialValues: data,
    validationSchema: profileValidationSchema,
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
            Edit Profile
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="skills" mb="4" isInvalid={!!formik.errors?.skills}>
              <FormLabel>Skills</FormLabel>
              <Input type="text" name="skills" value={formik.values?.skills} onChange={formik.handleChange} />
              {formik.errors.skills && <FormErrorMessage>{formik.errors?.skills}</FormErrorMessage>}
            </FormControl>
            <FormControl id="expertise" mb="4" isInvalid={!!formik.errors?.expertise}>
              <FormLabel>Expertise</FormLabel>
              <Input type="text" name="expertise" value={formik.values?.expertise} onChange={formik.handleChange} />
              {formik.errors.expertise && <FormErrorMessage>{formik.errors?.expertise}</FormErrorMessage>}
            </FormControl>
            <FormControl id="interests" mb="4" isInvalid={!!formik.errors?.interests}>
              <FormLabel>Interests</FormLabel>
              <Input type="text" name="interests" value={formik.values?.interests} onChange={formik.handleChange} />
              {formik.errors.interests && <FormErrorMessage>{formik.errors?.interests}</FormErrorMessage>}
            </FormControl>
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'profile',
  operation: AccessOperationEnum.UPDATE,
})(ProfileEditPage);
