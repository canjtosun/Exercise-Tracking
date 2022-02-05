import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import UpperLower from "./components/UpperLower/UpperLower";
import axios from "axios";
import FiveDaysAdvanceBB from "./components/FiveDaysAdvanceBB/FiveDaysAdvanceBB";

function App() {
  const [allExercises, setAllExercises] = useState([]);
  const [isUpperLowerShowing, setIsUpperLowerShowing] = useState(false);
  const [isFiveDaysAdvanceBBShowing, setIsFiveDaysAdvanceBBShowing] =
    useState(false);

  const showUpperLowerOnly = (name) => {
    if (name.startsWith("U")) {
      setIsUpperLowerShowing(true);
      setIsFiveDaysAdvanceBBShowing(false);
    }
  };

  const showFiveDaysOnly = (name) => {
    if (name.startsWith("5")) {
      setIsUpperLowerShowing(false);
      setIsFiveDaysAdvanceBBShowing(true);
    }
  };

  const closeAll = () => {
    setIsUpperLowerShowing(false);
    setIsFiveDaysAdvanceBBShowing(false);
  };

  const getData = async () => {
    await axios
      .get("http://localhost:4200/allexercises")
      .then((response) => {
        setAllExercises(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {allExercises.map((x) => {
          return (
            <div key={x._id}>
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  showUpperLowerOnly(x.name);
                  showFiveDaysOnly(x.name);
                }}
              >
                Open {x.name}
              </button>
            </div>
          );
        })}
      </div>

      {isUpperLowerShowing && <UpperLower />}
      {isFiveDaysAdvanceBBShowing && <FiveDaysAdvanceBB />}
      {(isFiveDaysAdvanceBBShowing || isUpperLowerShowing) && <button type="button" className="btn btn-danger" onClick={closeAll}>Close All</button>}
    </div>
  );
}

export default App;
