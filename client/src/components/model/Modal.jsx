import React, { memo } from 'react';
import './Modal.css';

function Modal({ show, onClose, title, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content mx-3 rounded">
        <div className="row p-0 border-bottom items-content-center">
          <div className="col-11 p-2 fw-bolder">
            {title}
          </div>
          <div className="col-1 text-end"><button className='btn btn-sm btn-bg-none' onClick={onClose}>X</button></div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default memo(Modal);
