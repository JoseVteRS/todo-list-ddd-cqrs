import { gql, useQuery } from '@apollo/client';
import React from 'react';
import TaskItem from './task-item';

const TASKS_LIST = gql`
  query TaskList {
    task_list {
      _id
      title
      description
      is_finish
    }
  }
`;

const TaskList = () => {
  const { data, error, loading } = useQuery(TASKS_LIST);
  if (loading) return (<p className='title'>'Cargando...'</p>);
  if (error) return (<p className='title'>'Error...'</p>);


  const { task_list } = data;

  return (
    <div className="px-8">
      {task_list.length === 0 ? (
        <p className="mt-5 text-center dark:text-gray-100 text-2xl">No hay tareas aún</p>
      ) : (
        task_list.map((task) => {
          return (
            <div key={task._id} className="my-4">
              <TaskItem task={task} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default TaskList;
