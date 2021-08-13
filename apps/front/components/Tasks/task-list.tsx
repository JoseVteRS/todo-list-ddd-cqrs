import { gql, useQuery } from '@apollo/client';
import React from 'react';
import TaskItem from './task-item';

import { task_list } from '@next-shared/lib/graphql/task.graphql';

// const TASKS_LIST = gql`
//   query TaskList {
//     task_list {
//       _id
//       title
//       description
//       is_finish
//     }
//   }
// `;

const TaskList = () => {
  const { data, error, loading } = useQuery(task_list);
  if (loading) return <p className="title">'Cargando...'</p>;
  if (error) return <p className="title">'Error...'</p>;

  const { task_list: taskList } = data;

  return (
    <div className="px-8">
      {taskList.length === 0 ? (
        <p className="mt-5 text-center dark:text-gray-100 text-2xl">
          No hay tareas aún
        </p>
      ) : (
        taskList.map((task) => {
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
