import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const Useremail = localStorage.getItem("mail");

  const logoutHandler = () => {
    authCtx.logout();
  };

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <header className={classes.header}>
      {authCtx.isLoggedIn && (
        <Link to="/expense">
          <div className={classes.logo}>+ Add Expense</div>
        </Link>
      )}
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}

          {!isLoggedIn && (
            <li>
              <Link to="/auth">Sign Up</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <span style={{ color: "yellow", fontSize: "1.5em" }}>
                {Useremail}
              </span>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/forgot">Change Passowrd</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
