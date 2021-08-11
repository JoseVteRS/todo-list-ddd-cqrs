import { gql, useMutation } from '@apollo/client';
import React from 'react';
import toast from 'react-hot-toast';
import CheckIcon from '../ui/Icons/icon-check';
import TrashIcon from '../ui/Icons/icon-trash';
import TaskFinishButton from './task-finish-buttom';

const TASK_LIST = gql`
  query TaskList {
    task_list {
      _id
      title
      description
      is_finish
    }
  }
`;

const TASK_MARK_FINISH = gql`
  mutation TaskMarkAsFinished($taskId: ID!) {
    task_mark_as_finished(taskId: $taskId)
  }
`;

const TASK_MARK_NOT_FINISH = gql`
  mutation TaskMarkAsNotFinished($taskId: ID!) {
    task_mark_as_not_finished(taskId: $taskId)
  }
`;

const TASK_DELETE = gql`
  mutation TaskDelete($taskId: ID!) {
    task_delete(taskId: $taskId)
  }
`;

const TaskItem = ({ task }) => {
  /**
   * Mark task as finished
   */
  const [task_mark_as_finished] = useMutation(TASK_MARK_FINISH, {
    update(cache, { data: { task_mark_as_finished } }) {
      // const { task_list } = cache.readQuery({ query: TASK_LIST });
      cache.writeQuery({
        query: TASK_LIST,
        variables: {
          taskId: task._id,
        },
        data: {
          task_list: task_mark_as_finished,
        },
      });
    },
  });
  /**
   * Mark task as not finished
   */
  const [task_mark_as_not_finished] = useMutation(TASK_MARK_NOT_FINISH, {
    update(cache, { data: { task_mark_as_not_finished } }) {
      // const { task_list } = cache.readQuery({ query: TASK_LIST });
      cache.writeQuery({
        query: TASK_LIST,
        variables: {
          taskId: task._id,
        },
        data: {
          task_list: task_mark_as_not_finished,
        },
      });
    },
  });

  const [task_delete] = useMutation(TASK_DELETE);

  const taskMarkAsFinished = async () => {
    try {
      const { data } = await task_mark_as_finished({
        variables: {
          taskId: task._id,
        },
      });
      console.log('marcada', task._id);

      toast.success('Tarea finalizada');
    } catch (error) {
      toast.success(error);
      console.log(error);
    }
  };

  const taskMarkAsNotFinished = async () => {
    try {
      const { data } = await task_mark_as_not_finished({
        variables: {
          taskId: task._id,
        },
      });
      console.log('marcada', task._id);

      toast.success('Tarea marcada como pendiente');
    } catch (error) {
      toast.success(
        'Task cant mark as not finish because the task is marked as not'
      );
      console.log(error);
    }
  };

  const taskDelete = async () => {
    try {
      const { data } = await task_delete({
        variables: {
          taskId: task._id,
        },
      });
      toast.success('Tarea eliminada');
    } catch (error) {
      toast.error('Ha habido un error');
    }
  };

  return (
    <div
      className={`p-3 flex items-center justify-between ${
        task.is_finish ? 'bg-gray-700' : 'bg-gray-900'
      }  rounded-md shadow-lg`}
    >
      <div>
        {!task.is_finish ? (
          <>
            <p className="dark:text-gray-200 text-lg">{task.title}</p>
            <p className="dark:text-gray-400 text-xs">{task.description}</p>
          </>
        ) : (
          <>
            <p className="dark:text-gray-400 text-lg line-through">
              {task.title}
            </p>
            <p className="dark:text-gray-400 text-xs line-through">
              {task.description}
            </p>
          </>
        )}
      </div>

      <div className="w-1/2 flex justify-end">
        <div className="flex justify-arround items-center">
          <TaskFinishButton
            isFinished={task.is_finish}
            markTaskFinish={taskMarkAsFinished}
            markTaskNotFinish={taskMarkAsNotFinished}
          />
          <button
            onClick={taskDelete}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 w-8 h-8 mx-1"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
