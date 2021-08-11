import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';

const TASK_UPDATE = gql`
  mutation TaskUpdate($taskId: ID!, $input: TaskUpdateInput!) {
    task_update(taskId: $taskId, input: $input)
  }
`;

const TASK_FIND_BY_ID = gql`
  query TaskFindById($taskId: ID!) {
    task_find_by_id(taskId: $taskId) {
      _id
      title
      description
    }
  }
`;

const TaskUpdateForm = ({ task, setState }) => {
  console.log('task from update form', task);

  const [task_update] = useMutation(TASK_UPDATE, {
    // update(cache, { data: { task_update } }) {
    //   const { task_find_by_id } = cache.readQuery({ query: TASK_FIND_BY_ID });
    //   cache.writeQuery({
    //     query: TASK_FIND_BY_ID,
    //     variables: {
    //         taskId: task._id
    //     },
    //     data: {
    //       task_find_by_id: [...task_find_by_id, task_update],
    //     },
    //   });
    // },
  });

  const taskUpdate = async (data) => {
    const { title, description } = data;
    try {
      const { data } = await task_update({
        variables: {
          taskId: task._id,
          input: {
            title,
            description,
          },
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Formik
        validationSchema={schemaValidation()}
        enableReinitialize
        initialValues={{ title: task.title, description: task.description }}
        onSubmit={(data) => {
          taskUpdate(data);
          setState(false);
        }}
      >
        {(props) => {
          // console.log(props);
          return (
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={props.handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Título
                </label>

                <input
                  className="input-text focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Título de la tarea"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.title}
                />
              </div>

              {props.touched.title && props.errors.title ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{props.errors.title}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Descriptión
                </label>

                <input
                  className="input-text focus:shadow-outline"
                  id="description"
                  type="text"
                  placeholder="Descripción de la terea"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.description}
                />
              </div>

              {props.touched.description && props.errors.description ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{props.errors.description}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-green-500 rounded w-full mt-5 p-2 text-white uppercase font-bold hover:bg-green-600"
                value="Actualizar tarea"
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
};

const schemaValidation = () => {
  return Yup.object({
    title: Yup.string().required('El title del cliente es obligatorio'),
    description: Yup.string()
      .max(150, 'El numero máximo de carateres es 150')
      .required('El description del cliente es obligatorio'),
  });
};

export default TaskUpdateForm;
