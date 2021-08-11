const Modal = ({
  children,
  state,
  setState,
  title = 'Crear una tarea',
  mostrarHeader,
}) => {
  return (
    <>
      {state && (
        <div className="overlay">
          <div className="modal-component">
            {mostrarHeader && (
              <div className="modal-header">
                <h3 className='title'>{title}</h3>
              </div>
            )}

            <div
              className="button-modal__close bg-gray-100"
              onClick={() => setState(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>

            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
