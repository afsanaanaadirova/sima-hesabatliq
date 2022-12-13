import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";

import { openModal, closeModal } from "../../../core/store/modal-slice";
import "./modal.scss";

const ModalComponent = ({ forDelete, children, handlerClose }) => {
  const dispatch = useDispatch();
  const showmodal = useSelector((state) => state.modal.showModal);

  const isOpenModal = () => {
    dispatch(openModal());
  };
  const isCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <Modal isOpen={showmodal} toggle={isOpenModal}>
        <ModalHeader
          className="modal__header"
          toggle={isCloseModal}
          onClick={handlerClose}
        ></ModalHeader>
        <ModalBody>
          {forDelete === true ? <div>{children}</div> : <>{children}</>}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalComponent;
