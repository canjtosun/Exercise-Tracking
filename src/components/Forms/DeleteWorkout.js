import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";

const DeleteModal = (props) => {
  return (
    <div>
      <Modal
        show={props.onOpenFormAndButtons}
        onHide={props.onCloseFormAndButtons}
      >
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => {props.onCallbackDelete(); props.onCloseFormAndButtons();}}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={props.onCloseFormAndButtons}
          >
            Cancel
          </button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DeleteModal;
