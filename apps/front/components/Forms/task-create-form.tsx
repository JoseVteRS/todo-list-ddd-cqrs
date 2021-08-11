import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';

/**
 * Task create mutation
 */
const TASK_CREATE = gql`
  mutation TaskCreate($input: TaskCreateInput!) {
    task_create(input: $input)
  }
`;

const TASK_LIST = gql`
  query TaskList {
    task_list {
      _id
      title
      description
      is_finish
    }
  }
`;

const TaskCreateForm = ({ setState }) => {
  const [task_create] = useMutation(TASK_CREATE, {
    update(cache, { data: { task_create } }) {
      const { task_list } = cache.readQuery({ query: TASK_LIST });
      cache.writeQuery({
        query: TASK_LIST,
        data: {
          task_list: [...task_list, task_create],
        },
      });
    },
  });

  const taskCreateTask = async (data) => {
    const { title, description } = data;

    try {
      const { data } = await task_create({
        variables: {
          input: {
            title,
            description,
          },
        },
      });
      toast.success('Tarea guardada correctamente');
    } catch (error) {
      toast.error('Se ha producido un error');
      console.log(error);
    }
  };

  return (
    <>

      <Formik
        validationSchema={schemaValidation()}
        enableReinitialize
        initialValues={{ title: '', description: '' }}
        onSubmit={(data) => {
          taskCreateTask(data);
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
                value="Guardar tarea"
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

export default TaskCreateForm;
