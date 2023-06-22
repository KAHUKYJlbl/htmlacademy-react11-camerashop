type ModalProps = {
  children: JSX.Element;
}

export function Modal ({children}: ModalProps): JSX.Element {
  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay">
        </div>

        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
}
