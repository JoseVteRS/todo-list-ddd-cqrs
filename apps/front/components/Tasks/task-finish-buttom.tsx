import React from 'react';
import CheckIcon from '../ui/Icons/icon-check';
import CloseIcon from '../ui/Icons/icon-close';

const TaskFinishButton = ({ isFinished, markTaskFinish, markTaskNotFinish }) => {
  return isFinished ? (
    <button onClick={markTaskNotFinish} className="bg-gray-300 hover:bg-blue-400 text-white rounded-full p-1 w-8 h-8 mx-1">
      <CloseIcon />
    </button>
  ) : (
    <button onClick={markTaskFinish} className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1 w-8 h-8 mx-1">
      <CheckIcon />
    </button>
  );
};

export default TaskFinishButton;
