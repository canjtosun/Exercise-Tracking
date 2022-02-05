import { useEffect, useState } from "react";
import UpperLowerTable from "./UpperLowerTable";
import axios from "axios";
import Card from "../Card/Card";
import './UpperLower.css'

const UpperLower = (props) => {
  const [fullbody, setFullbody] = useState([]);
  const [day, setDay] = useState(0);
  const [isShowing, setIsShowing] = useState(false);
  const [something, setSomething] = useState([]);

  const openTable = () => setIsShowing(true);
  const closeTable = () => setIsShowing(false);

  //get data with axios
  const getData = async () => {
    await axios
      .get("http://localhost:4200/upperlowers")
      .then((response) => {
        setFullbody(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dayFilter = (day) => {
    const filteredList = [];
    for (let x of fullbody.filter((x) => x.day === day)) {
      filteredList.push(...x.typesOfExercises);
    }
    openTable();
    setSomething(filteredList);
    setDay(day);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App ">
      {!isShowing && <h3>Select Day</h3>}
      <div>
        {!isShowing &&
          fullbody.map((y) => {
            return (
              <Card className="button-next" key={y.day}>
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
              </Card>
            );
          })}
      </div>
      {isShowing && (
        <UpperLowerTable
          onInfo={something}
          day={day}
          onCloseTable={closeTable}
        />
      )}
    </div>
  );
};

export default UpperLower;
