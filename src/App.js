import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import ExpenseForm from "./components/Expenseform/ExpenseForm";
import { useContext } from "react";
import ForgotPasswordProfile from "./components/forgotPassword/ForgotPasswordProfile";

function App() {
  const authCtx = useContext(AuthContext);


  return (
    
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/expense" exact>
            {authCtx.isLoggedIn && (<ExpenseForm />)}
          </Route>

          {!authCtx.isLoggedIn && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}

          <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile/>}
            {!authCtx.isLoggedIn && <Redirect to="/auth" /> }
          </Route>

          <Route path="/forgot">
          {authCtx.isLoggedIn && <ForgotPasswordProfile/>}
            {!authCtx.isLoggedIn && <Redirect to="/auth" /> }
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
   
  );
}

export default App;
