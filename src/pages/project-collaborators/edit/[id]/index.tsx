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
import { getProjectCollaboratorById, updateProjectCollaboratorById } from 'apiSdk/project-collaborators';
import { Error } from 'components/error';
import { projectCollaboratorValidationSchema } from 'validationSchema/project-collaborators';
import { ProjectCollaboratorInterface } from 'interfaces/project-collaborator';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ProjectInterface } from 'interfaces/project';
import { CollaboratorInterface } from 'interfaces/collaborator';
import { getProjects } from 'apiSdk/projects';
import { getCollaborators } from 'apiSdk/collaborators';

function ProjectCollaboratorEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProjectCollaboratorInterface>(
    () => (id ? `/project-collaborators/${id}` : null),
    () => getProjectCollaboratorById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProjectCollaboratorInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProjectCollaboratorById(id, values);
      mutate(updated);
      resetForm();
      router.push('/project-collaborators');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ProjectCollaboratorInterface>({
    initialValues: data,
    validationSchema: projectCollaboratorValidationSchema,
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
            Edit Project Collaborator
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
            <AsyncSelect<ProjectInterface>
              formik={formik}
              name={'project_id'}
              label={'Select Project'}
              placeholder={'Select Project'}
              fetcher={getProjects}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<CollaboratorInterface>
              formik={formik}
              name={'collaborator_id'}
              label={'Select Collaborator'}
              placeholder={'Select Collaborator'}
              fetcher={getCollaborators}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
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
  entity: 'project_collaborator',
  operation: AccessOperationEnum.UPDATE,
})(ProjectCollaboratorEditPage);
