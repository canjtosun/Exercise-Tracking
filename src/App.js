import { useState } from "react";
import Table from "./Table";
import axios from "axios";
import Header from "./Header";


function App() {
  const [fullbody, setFullbody] = useState([]);
  const [day, setDay] = useState(0);
  const [isShowing, setIsShowing] = useState(false);
  const [something, setSomething] = useState([]);

  const openTable = () => setIsShowing(true);
  const closeTable = () => setIsShowing(false);

  //get data with axios
  const getData = async () => {
    await axios
      .get("http://localhost:4200/exercises/")
      .then((response) => {
        setFullbody(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getData();

  const dayFilter = (day) => {
    const filteredList = [];
    for (let x of fullbody.filter((x) => x.day === day)) {
      filteredList.push(...x.typesOfExercises);
    }
    openTable();
    setSomething(filteredList);
    setDay(day);
  };

  return (
    <div className="App ">
      <Header/>
      {!isShowing && <h3>Select Day</h3>}
      <div className="card">
        {!isShowing &&
          fullbody.map((y) => {
            return (
              <div className="button-next" key={y.day}>
                <img
                  className="card-img-top"
                  src="https://darebee.com/images/workouts/muscles/upperbody-workout.jpg"
                  alt="Upper Body Pic"
                />
                {!isShowing && (
                  <button
                    className="day-button"
                    onClick={() => dayFilter(y.day)}
                  >
                    DAY {y.day}
                  </button>
                )}
              </div>
            );
          })}
      </div>
      {isShowing && (
        <Table onInfo={something} day={day} onCloseTable={closeTable} />
      )}
    </div>
  );
}

export default App;
