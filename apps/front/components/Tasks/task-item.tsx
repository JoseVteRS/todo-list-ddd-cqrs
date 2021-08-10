import React from 'react';
import TaskFinishButton from './task-finish-buttom';

const TaskItem = ({ task }) => {
  return (
    <div
      className={'p-3 flex items-center justify-between bg-gray-900 rounded-md shadow-md'}
    >
      <div>
        <p className='dark:text-gray-200 text-lg'>{task.title}</p>
        <p className='dark:text-gray-400 text-xs'>{task.description}</p>
      </div>

      <TaskFinishButton isFinished={task.is_finish} />
    </div>
  );
};

export default TaskItem;
