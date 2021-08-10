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
  if (loading) return 'Cargando...';
  console.log(data);

  const { task_list } = data;

  return (
    <div className='w-1/2 mx-auto'>
      {task_list.length === 0 ? (
        <p className="mt-5 text-center text-2xl">No hay tareas aún</p>
      ) : (
        task_list.map((task) => {
          return (
            <div className='my-4'>
              <TaskItem key={task._id} task={task} />
            </div>
          )
        })
      )}
    </div>
  );
};

export default TaskList;
