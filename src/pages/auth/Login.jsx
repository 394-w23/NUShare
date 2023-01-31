import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcAutomotive } from "react-icons/fc";
import { signInWithGoogle } from "../../utils/firebase";
import { useProfile } from "../../utils/userProfile";

const Login = () => {
  const [user] = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const SignInButton = () => (
    <button
      className="ml-5 p-2 w-75 btn btn-light login-button"
      onClick={signInWithGoogle}
    >
      SIGN IN
    </button>
  );

  return (
    <div className="login-container">
      <div className="login-image-container">
        <div>
          <img src="logo.png" alt="logo" />
        </div>
      </div>
      <div className="login-info-container">
        <div>
          <h1 className="login-title" data-cy="login-title">
            Welcome to NUShare <FcAutomotive size={42} />
          </h1>

          <p className="login-info">
            NUShare allows students to coordinate rides from/to the airport for
            moving in and out of campus. Students can fill in their intended
            time of ride, and NUShare will let you group with other students who
            need a ride at similar times.
          </p>
          <p className="login-info">
            <span>Find your ride partner with NUShare, Sign In now!</span>
          </p>
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
