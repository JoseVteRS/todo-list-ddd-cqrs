import { ApolloError, gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import TaskUpdateForm from '../Forms/task-update-form';
import CheckIcon from '../ui/Icons/icon-check';
import PencilIcon from '../ui/Icons/icon-pencil';
import TrashIcon from '../ui/Icons/icon-trash';
import Modal from '../ui/Modal/Modal';
import TaskFinishButton from './task-finish-buttom';
import {
  task_list,
  task_mark_as_finished,
  task_mark_as_not_finished,
  task_delete,
} from '@next-shared/lib/graphql/task.graphql';

const TaskItem = ({ task }) => {
  const [stateModalUpdate, setStateModalUpdate] = useState(false);

  //#region Mutations
  const [taskMarkFinishedMutation] = useMutation(task_mark_as_finished, {
    refetchQueries: [task_list],
  });

  const [taskMarkAsNotFinishedMutation] = useMutation(
    task_mark_as_not_finished,
    {
      onCompleted: data => {
        toast.success('Tarea marcada como pendiente')
      },
      refetchQueries:[task_list],
      onError: (error: ApolloError) => {
        toast.error(error.message || 'No se pudo marcar como pendinte')
      }
    }
  );

  const [taskDeleteMutation] = useMutation(task_delete, {
    refetchQueries: [task_list],
  });
  //#endregion Mutations

  //#region Functions
  const taskMarkAsFinished = async () => {
    try {
      const { data } = await taskMarkFinishedMutation({
        variables: {
          taskId: task._id,
        },
      });

      toast.success('Tarea finalizada');
    } catch (error) {
      toast.success(error);
    }
  };

  const taskMarkAsNotFinished = async () => {
    try {
      const { data } = await taskMarkAsNotFinishedMutation({
        variables: {
          taskId: task._id,
        },
      });

      toast.success('Tarea marcada como pendiente');
    } catch (error) {
      toast.success(error.message);
    }
  };

  const taskDelete = async () => {
    try {
      const { data } = await taskDeleteMutation({
        variables: {
          taskId: task._id,
        },
      });
      toast.success('Tarea eliminada');
    } catch (error) {
      toast.error('Ha habido un error');
    }
  };
  //#endregion Functions

  return (
    <>
      <Modal
        state={stateModalUpdate}
        setState={setStateModalUpdate}
        title={`Modificar tarea`}
        showHeader={true}
      >
        <TaskUpdateForm setState={setStateModalUpdate} task={task} />
      </Modal>

      <div
        className={`overflow-hidden relative p-3 flex items-center justify-between ${
          task.is_finish ? 'dark:bg-gray-700 bg-gray-300' : 'dark:bg-gray-900 bg-gray-100'
        }  rounded-md shadow-lg ${
          task.is_finish
            ? 'border-l-4 border-green-500'
            : 'border-l-4 border-yellow-500'
        }`}
      >
        <div className="flex items-center">
          <TaskFinishButton
            isFinished={task.is_finish}
            markTaskFinish={taskMarkAsFinished}
            markTaskNotFinish={taskMarkAsNotFinished}
          />
          <div className="ml-1">
            {!task.is_finish ? (
              <>
                <p className="dark:text-gray-200 text-gray-800 font-medium text-lg">{task.title}</p>
                <p className="dark:text-gray-400 text-gray-700 text-md">{task.description}</p>
              </>
            ) : (
              <>
                <p className="dark:text-gray-400 text-gray-400 text-lg line-through">
                  {task.title}
                </p>
                <p className="dark:text-gray-400 text-gray-400 text-md line-through">
                  {task.description}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="">
          <div className="">
            <button
              onClick={() => setStateModalUpdate(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 w-8 h-8 mx-1"
            >
              <PencilIcon />
            </button>
            <button
              onClick={taskDelete}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 w-8 h-8 mx-1"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
