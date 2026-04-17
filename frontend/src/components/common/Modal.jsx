import { Fragment } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <Fragment>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-base-100 shadow-xl transition-all">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h3 className="text-lg font-bold">{title}</h3>
                            <button 
                                onClick={onClose}
                                className="btn btn-sm btn-circle btn-ghost"
                            >
                                ✕
                            </button>
                        </div>
                        
                        {/* Body */}
                        <div className="px-6 py-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Modal;