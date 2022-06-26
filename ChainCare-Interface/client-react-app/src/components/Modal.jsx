import React, { useRef } from "react";
import { MdClose } from "react-icons/md";
import ReactDOM from "react-dom";

import "../styles/modal.css";

function Modal({ showModal, setShowModal, children, ...restProps }) {
  const modalRef = useRef();

  function closeModel(e) {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  }

  const lockBody = () => {
    if (showModal) {
      document.body.style.position = "fixed";
      document.body.style.position = "static";
    } else {
      document.body.style.position = "static";
    }
  };

  const renderState = (
    <>
      {showModal ? (
        <>
          {lockBody()}
          <div
            className="myModal-background"
            onClick={closeModel}
            ref={modalRef}
          >
            <div className="myModal-container" >
              {children}
              <MdClose
                className="myModel-close-button "
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </div>
          </div>
        </>
      ) : (
        lockBody()
      )}
    </>
  );

  return ReactDOM.createPortal(renderState, document.getElementById("modal"));
}

export default Modal;
