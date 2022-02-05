import axios from "axios";
import { useState } from "react";
import AddWorkout from "../Forms/AddWorkout";
import DeleteModal from "../Forms/DeleteWorkout";


const trashIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-trash"
    viewBox="0 0 16 16"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    />
  </svg>
);

const FiveDaysAdvanceBBTable = (props) => {
  const [list, setList] = useState(props.onInfo);
  const [completedList, setCompletedList] = useState([]);
  const [isShowingDelete, setIsShowingDelete] = useState(false);
  const [callbackDelete, setCallbackDelete] = useState(() => () => {});
  const [isShowing, setIsShowing] = useState(false);

  const openForm = () => setIsShowing(true);
  const closeForm = () => setIsShowing(false);

  const openDeleteForm = () => setIsShowingDelete(true);
  const closeDeleteForm = () => setIsShowingDelete(false);

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
      .post("http://localhost:4200/fivedaysadvancebbs/", {
        info: element,
        day: props.day,
      })
      .then((res) => {
        const newList = res.data;
        setList(newList);
      });
  };

  const deleteElementFromList = (element) => {
    axios
      .post("http://localhost:4200/fivedaysadvancebb/delete", {
        ...element,
        day: props.day,
      })
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
                    <td onClick={() => {setCallbackDelete(() => () => deleteElementFromList(x)); openDeleteForm();}}>
                      {trashIcon}
                    </td>
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
            <p className="completed-style">
              click the workout if you accidentally added in completed list
            </p>
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
      {!isShowing && (
        <button className="btn btn-outline-success" onClick={openForm}>
          Add New Workout
        </button>
      )}
      <button className="btn btn-outline-danger" onClick={props.onCloseTable}>
        Go Back
      </button>
      
      {isShowing && (
        <AddWorkout
          onCLoseFormAndButtons={closeForm}
          onOpenFormAndButtons={openForm}
          sendToAddWorkout={addElementToList}
        />
      )}
      {isShowingDelete && (
        <DeleteModal
          onCloseFormAndButtons={closeDeleteForm}
          onOpenFormAndButtons={openDeleteForm}
          onCallbackDelete={callbackDelete}
        />
      )}
    </div>
  );
};

export default FiveDaysAdvanceBBTable;

