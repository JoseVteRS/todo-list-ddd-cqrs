import { useState } from 'react';
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
      <Toaster />
      <Modal
        state={stateModalCreate}
        setState={setStateModalCreate}
        title="Crear una tarea"
        mostrarHeader={true}
      >
        <TaskCreateForm setState={setStateModalCreate} />
      </Modal>

      <h2 className="title">TODO LIST</h2>
      <p className="dark:text-gray-300">Sample project to learn DDD and CQRS</p>
      <hr />
      <section className="grid grid-cols-2">
        <TaskList />
        <div>
          <h2 className="title">Insertar una tarea</h2>
          <button
            className="rounded-full dark:bg-gray-400 text-gray-800 font-bold p-3 w-10 h-10 flex items-center justify-center"
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
