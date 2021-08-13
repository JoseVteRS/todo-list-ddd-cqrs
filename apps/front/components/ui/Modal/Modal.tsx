import CloseIcon from "../Icons/icon-close"

const Modal = ({
  children,
  state,
  setState,
  title = 'Crear una tarea',
  showHeader,
}) => {
  return (
    <>
      {state && (
        <div className="overlay">
          <div className="modal-component">
            {showHeader && (
              <div className="modal-header">
                <h3 className='title'>{title}</h3>
              </div>
            )}

            <button
              className="button-modal__close bg-gray-200 hover:bg-gray-300 flex justify-center items-center "
              onClick={() => setState(false)}
            >
              <CloseIcon className='h-4 w-4' />
            </button>

            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
