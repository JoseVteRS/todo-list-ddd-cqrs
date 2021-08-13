import { useState } from 'react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import TaskCreateForm from '../components/Forms/task-create-form';
import TaskList from '../components/Tasks/task-list';
import PlusIcon from '../components/ui/Icons/icon-plus';
import Modal from '../components/ui/Modal/Modal';
import MainLayout from '../layouts/main-layout';

export const Index = () => {
  const [stateModalCreate, setStateModalCreate] = useState(false);

  return (
    <MainLayout>
      <Toaster position="top-right" />
      <Modal
        state={stateModalCreate}
        setState={setStateModalCreate}
        title="Crear una tarea"
        showHeader={true}
      >
        <TaskCreateForm setState={setStateModalCreate} />
      </Modal>
      <div className="shadow-md rounded-md p-3 flex items-center justify-between dark:bg-gray-900 bg-gray-200">
        <div>
          <h1 className="title">LISTA DE TAREAS</h1>
          <p className="dark:text-gray-300">
            Proyecto base para aprender DDD y CQRS
          </p>
        </div>

        <Link href="https://github.com/JoseVteRS/todo-list-ddd-cqrs">
          <a className="text-gray-500" target="_blank">
            Repositorio Github
          </a>
        </Link>
      </div>

      <p className="w-max bg-gray-50 rounded shodow-lg my-4 p-1 font-medium">
        {new Date().toLocaleString('es-ES', {
          timeZone: 'UTC',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </p>

      <section className="grid grid-cols-2">
        <div className="rounded-xl shadow-xl ">
          <TaskList />
        </div>
        <div className="ml-6">
          <button
            className="rounded-full shadow-md focus:shadow dark:bg-gray-400 bg-gray-200 text-gray-800 font-bold p-3 w-10 h-10 flex items-center justify-center"
            onClick={() => setStateModalCreate(true)}
          >
            <PlusIcon />
          </button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
