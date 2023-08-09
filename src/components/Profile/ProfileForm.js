import { useContext, useEffect, useRef, useState } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import axios from "axios";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [userData, setUserData] = useState(null); // new state

  const expenses = localStorage.getItem('exp')

  const Useremail = localStorage.getItem("mail");
  const ChangesEMail = Useremail.replace("@", "").replace(".", "");

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const dobInputRef = useRef();

  useEffect(() => {
    axios
      .get(
        `https://expense-tracker-dacdc-default-rtdb.firebaseio.com/user/${ChangesEMail}.json`
      )
      .then((response) => {
        const userData = response.data;
        setUserData(userData); // set user data to the new state
        setName(userData.name);
        setCity(userData.city);
        setDob(userData.dob);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(userData);
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredDob = dobInputRef.current.value;
  
    if (userData === null) {
      // If userData is null, use axios.post() to create a new user profile
      axios
        .post(
          `https://expense-tracker-dacdc-default-rtdb.firebaseio.com/user/${ChangesEMail}.json`,
          { name: enteredName, city: enteredCity, dob: enteredDob }
        )
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // If userData is not null, use axios.put() to update the existing user profile
      axios
        .put(
          `https://expense-tracker-dacdc-default-rtdb.firebaseio.com/user/${ChangesEMail}/${Object.keys(userData)[0]}.json`,
          { name: enteredName, city: enteredCity, dob: enteredDob }
        )
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  

  return (
    <div>
      <h1 style={{ fontSize: "34px", marginBottom: "10px",backgroundColor: 'yellow', padding: "25px" }}>
            Total expenses: {expenses}
          </h1>
      {userData && (
        <div
          style={{ margin: "10px", padding: "10px", backgroundColor: 'green' }}
        >
        
          <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
            Name: {Object.values(userData)[0].name}
          </h1>
          <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
            City: {Object.values(userData)[0].city}
          </h1>
          <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
            Date of Birth: {Object.values(userData)[0].dob}
          </h1>
        </div>
      )}

      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <h1>Update Profile</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            ref={nameInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            ref={cityInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            ref={dobInputRef}
          />
        </div>
        <div className={classes.action}>
          <button>Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
