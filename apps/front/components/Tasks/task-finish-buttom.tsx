import React from 'react';

const TaskFinishButton = ({ isFinished }) => {
  return isFinished ? (
    <button className="button-blue">
      Marcar como no finalizada
    </button>
  ) : (
    <button className="button-green">
      Finalizar tarea
    </button>
  );
};

export default TaskFinishButton;
