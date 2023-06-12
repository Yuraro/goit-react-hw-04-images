import { useEffect, useCallback } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

const Modal = ({ onClose, imgSrc, alt }) => {
    const handleKeyDown = useCallback((e) => {
        if (e.code === 'Escape') onClose();
    }, [onClose]);

    const handleOverlayClick = useCallback((e) => {
        if (e.target === e.currentTarget) onClose();
    }, [onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <Overlay onClick={handleOverlayClick}>
            <ModalWindow>
                <img src={imgSrc} alt={alt} />
            </ModalWindow>
        </Overlay>
    );
};

export default Modal;
