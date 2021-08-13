import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';

import { task_list, task_create } from '@next-shared/lib/graphql/task.graphql';

const TaskCreateForm = ({ setState }) => {
  const [taskCreateMutation] = useMutation(task_create, {
    update(cache, { data: { task_create } }) {
      const { task_list: taskList } = cache.readQuery({ query: task_list });
      cache.writeQuery({
        query: task_list,
        data: {
          task_list: [...taskList, task_create],
        },
      });
    },
  });

  const taskCreateTask = async (data) => {
    const { title, description } = data;

    try {
      const { data } = await taskCreateMutation({
        variables: {
          input: {
            title,
            description,
          },
        },
      });
      toast.success('Tarea guardada correctamente');
    } catch (error) {
      toast.error(error.message);
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
                  className="label"
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
                  className="label"
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
