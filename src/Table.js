import axios from "axios";
import { useState } from "react";
import AddWorkout from "./AddWorkout";

const Table = (props) => {
  const [list, setList] = useState(props.onInfo);
  const [completedList, setCompletedList] = useState([]);
  const [isShowing, setIsShowing] = useState(false);

  const openForm = () => setIsShowing(true);
  const closeForm = () => setIsShowing(false);

  const listToCompletedList = (id) => {
    const newList = [];
    const newCompleted = [...completedList];

    for (const ele of list) {
      if (ele._id === id && !newCompleted.includes(ele)) {
        newCompleted.push(ele);
        continue;
      }
      newList.push(ele);
    }
    setList(newList);
    setCompletedList(newCompleted);
  };

  const completedListToList = (id) => {
    const newCompleted = [];
    const newList = [...list];

    for (const ele of completedList) {
      if (ele._id === id && !newList.includes(ele)) {
        newList.push(ele);
        continue;
      }
      newCompleted.push(ele);
    }
    setList(newList);
    setCompletedList(newCompleted);
  };

  const addElementToList = (element) => {
    axios
      .post("http://localhost:4200/exercises", {
        info: element,
        day: props.day,
      })
      .then(console.log("added"));
    const newList = [...list, { ...element }];
    setList(newList);
  };

  const deleteElementFromList = (element) => {
    axios
      .post("http://localhost:4200/exercises/delete", {
        ...element,
        day: props.day,
      })
      .then(console.log("deleted"));
    const newList = list.filter((ele) => {
      return !(
        ele.name === element.name &&
        ele.sets === element.sets &&
        ele.reps === element.reps
      );
    });
    setList(newList);
  };

  return (
    <div>
      {!isShowing && list.length !== 0 && (
        <h3>Click the workout once you completed</h3>
      )}
      {!isShowing && list.length === 0 && (
        <h3>Nice job! You finished your workout today!</h3>
      )}
      {list.length > 0 && (
        <table className="table table-hover table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Sets</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((x) => {
                return (
                  <tr className="clickable-row" key={x._id}>
                    <td onClick={() => listToCompletedList(x._id)}>{x.name}</td>
                    <td onClick={() => listToCompletedList(x._id)}>{x.sets}</td>
                    <td onClick={() => listToCompletedList(x._id)}>{x.reps}</td>
                    <td onClick={() => deleteElementFromList(x)}>Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      {completedList.length > 0 && (
        <div>
          <div>
            <h3 className="completed-style">Completed</h3>
            <p className="completed-style">click the workout if you accidentally added in completed list</p>
          </div>
          <table className="table table-hover table-responsive">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Sets</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {completedList.map((x) => {
                return (
                  <tr
                    className="clickable-row"
                    key={x._id}
                    onClick={() => completedListToList(x._id)}
                  >
                    <td>{x.name}</td>
                    <td>{x.sets}</td>
                    <td>{x.reps}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <button className="btn btn-outline-danger" onClick={props.onCloseTable}>
        Go Back
      </button>
      {!isShowing && (
        <button className="btn btn-outline-success" onClick={openForm}>
          Add New Workout
        </button>
      )}
      {isShowing && (
        <AddWorkout
          onCLoseFormAndButtons={closeForm}
          onOpenFormAndButtons={openForm}
          sendToAddWorkout={addElementToList}
        />
      )}
    </div>
  );
};

export default Table;
