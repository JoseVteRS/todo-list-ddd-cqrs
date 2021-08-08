import TaskList from '../components/Tasks/task-list';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import MainLayout from '../layouts/main-layout';

const TASK_UPDATE = gql`
  mutation TaskUpdate($taskId: ID!, $input: TaskUpdateInput! ){
    task_update(taskId: $taskId, input: $input)
  }
`;

export const Index = () => {
  /**
   * useMutation
   */
  const [task_update] = useMutation(TASK_UPDATE);

  /**
   * Schema validation
   */
  const schemaValidacion = Yup.object({
    title: Yup.string().required('El título es obligatorio'),
    description: Yup.string().max(150).required('El título es obligatorio'),
  });

  /**
   *Function to update a task
   * @param data
   */
  //TODO: Fix any
  const updateDataTask = async (data: any) => {
    const { title, description } = data;

    //TODO: This ID will get from query params
    const taskId = 'c7ce7ccb-207e-4609-aef3-f749d91b6cfe';
    try {
      const { data } = await task_update({
        variables: {
          taskId,
          input: {
            title,
            description,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <h2 className="title">TODO LIST</h2>
      <p className="dark:text-gray-300">Sample project to learn DDD and CQRS</p>
      <hr />
      <TaskList />
      <Formik
        validationSchema={schemaValidacion}
        enableReinitialize
        initialValues={{ title: 'hola', description: 'hola k ase' }}
        onSubmit={(data) => {
          updateDataTask(data);
        }}
      >
        {(props) => {
          // console.log(props);
          return (
            <form
              className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={props.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Task title"
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
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  placeholder="Description task"
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
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                value="Update task"
              />
            </form>
          );
        }}
      </Formik>
       
    </MainLayout>
  );
};

export default Index;
