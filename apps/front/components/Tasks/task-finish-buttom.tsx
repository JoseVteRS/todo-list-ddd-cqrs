import React from 'react';

const TaskFinishButton = ({ isFinished }) => {
  return isFinished ? (
    <button className="p-2 dark:bg-gray-700 rounded shadow-lg">
      Tarea finalizada
    </button>
  ) : (
    <button className="p-2 dark:bg-green-600 rounded shadow">
      Finalizar tarea
    </button>
  );
};

export default TaskFinishButton;
