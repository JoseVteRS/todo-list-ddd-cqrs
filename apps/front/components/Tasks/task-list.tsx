import React from 'react';
import TaskItem from './task-item';

const TaskList = () => {
  return (
    <div>
      <TaskItem isFinished={true} />
      <TaskItem isFinished={true} />
      <TaskItem isFinished={true} />
      <TaskItem isFinished={true} />
      <TaskItem isFinished={false} />
      <TaskItem isFinished={false} />
      <TaskItem isFinished={true} />
      <TaskItem isFinished={true} />
      <TaskItem isFinished={false} />
    </div>
  );
};

export default TaskList;
