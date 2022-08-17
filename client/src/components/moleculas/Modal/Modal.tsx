import React from 'react';
import iconX from '../images/x.svg';

import './Modal.component.css';

interface ModalProps {
  title: string;
  message?: string
  isOpen: boolean;
  onClose: () => void;
  children?: JSX.Element
  | JSX.Element[]
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children, message }) => {
  const outsideRef = React.useRef(null);

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  }

  return isOpen ? (
    <div className={'modal '}>
      <div
        ref={outsideRef}
        className={'modal__overlay '}
        onClick={handleCloseOnOverlay}
      />
      <div className={'modal__box max-w-xs bg-primary-200 shadow-lg'}>
        <button
          className={'modal__close'}
          onClick={onClose}
        >
          <img src={iconX} alt={'close'} />
        </button>
        <div className='flex flex-col gap-y-1'>
          <p className='text-3xl font-poppins text-secondary-100'>{title}</p>
          <p className='text-text-100 font-poppins font-extralight'>{message}</p>
        </div>
        <div className={'modal__content'}>
          {children}
        </div>
      </div>
    </div>
  ) : null;
};
