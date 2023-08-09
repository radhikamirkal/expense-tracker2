import ProfileForm from './ForgotPasswordForm';
import classes from './ForgotPasswordProfile.module.css';

const ForgotPasswordProfile = () => {
  return (
    <section className={classes.profile}>
      <h2>Change your password</h2>
      <ProfileForm />
    </section>
  );
};

export default ForgotPasswordProfile;
