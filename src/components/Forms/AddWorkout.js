import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import './Forms.css'

const AddWorkout = (props) => {
  const [name, setName] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  const addWorkout = (event) => {
    event.preventDefault();
    const objWorkout = { name: name, sets: sets, reps: reps };
    props.sendToAddWorkout(objWorkout);
    props.onCLoseFormAndButtons();
  };

  return (
    <div>
      <Modal
        show={props.onOpenFormAndButtons}
        onHide={props.onCLoseFormAndButtons}
      >
        <ModalHeader>
          <ModalTitle>Add New Workout</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={addWorkout}>
            <div className="form-group">
              <label>Workout Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(x) => setName(x.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Sets</label>
              <input
                type="number"
                required
                value={sets}
                onChange={(x) => setSets(x.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Reps</label>
              <input
                type="number"
                required
                value={reps}
                onChange={(x) => setReps(x.target.value)}
              />
            </div>
            <div className="button-div">
              <button type="submit" className="btn btn-outline-success">
                Add
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

export default AddWorkout;
