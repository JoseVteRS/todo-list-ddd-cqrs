import React from 'react';
import CheckIcon from '../ui/Icons/icon-check';
import CloseIcon from '../ui/Icons/icon-close';

const TaskFinishButton = ({ isFinished, markTaskFinish, markTaskNotFinish }) => {
  return isFinished ? (
    <button onClick={markTaskNotFinish} className="bg-green-500 hover:bg-blue-400 text-white rounded-full p-1 w-4 h-4 mx-1">
      <CheckIcon className='text-gray-800' />
    </button>
  ) : (
    <button onClick={markTaskFinish} className="border border-green-500 hover:bg-green-600 text-white rounded-full p-1 w-4 h-4 mx-1">

    </button>
  );
};

export default TaskFinishButton;
