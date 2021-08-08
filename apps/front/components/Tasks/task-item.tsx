import React from 'react';
import TaskFinishButton from './task-finish-buttom';

const TaskItem = ({ isFinished }) => {
  return (
    <div className={`dark:text-gray-300 my-2 grid grid-cols-2 dark:bg-gray-500 p-2 rounded`}>
      <div>
        <p className={`task-title ${isFinished ? 'line-through dark:text-gray-200' : ''}`}>
          Poner la lavadora
        </p>
        <p className={` text-xs text${isFinished ? 'line-through dark:text-gray-200' : ''}`}>Descripcion larga de la tarea</p>
      </div>

      <TaskFinishButton isFinished={isFinished} />
    </div>
  );
};

export default TaskItem;
