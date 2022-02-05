import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";

const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

    //send user to header as object
  const addUser = (event, newUser) => {
    event.preventDefault();
    const newUserObject = {firstName: firstName, lastName:lastName, dateOfBirth:dateOfBirth}
    props.onAddUser(newUserObject);
    props.onCLoseFormAndButtons();
    
  }

  return (
    <div>
      <Modal
        show={props.onOpenFormAndButtons}
        onHide={props.onCLoseFormAndButtons}
      >
        <ModalHeader>
          <ModalTitle>Please fill the form</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={addUser}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(x) => setFirstName(x.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(x) => setLastName(x.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                required
                value={dateOfBirth}
                onChange={(x) => setDateOfBirth(x.target.value)}
              />
            </div>
            <div className="button-div">
              <button type="submit" className="btn btn-outline-success">
                Sign Up
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={props.onCLoseFormAndButtons}
              >
                Cancel
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SignUp;
