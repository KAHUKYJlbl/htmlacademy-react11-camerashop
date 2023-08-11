import { useEffect, useRef } from 'react';
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import useClickOutside from '../../../lib/hooks/use-click-outside';

ReactModal.setAppElement('#body');

type ModalProps = {
  children: JSX.Element;
  onClose: () => void;
}

export function CustomModal ({children, onClose}: ModalProps): JSX.Element {
  const ref = useRef(null);
  useClickOutside(ref, onClose);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  });

  return (
    <Modal
      isOpen
      onRequestClose={onClose}
      style={{
        overlay: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        content: {
          position: 'absolute',
          border: 'none',
          background: '#fff0',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'
        }
      }}
    >
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={() => onClose}>
          </div>

          <div className="modal__content" ref={ref}>
            {children}
          </div>
        </div>
      </div>
    </Modal>
  );
}
