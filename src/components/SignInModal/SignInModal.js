import { useState } from "react";
import * as Components from "./Components";
import "./SignInModal.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080";
const signupUrl = `${baseUrl}/signup`;
const loginUrl = `${baseUrl}/login`;


function SignInModal({ handleCloseModal, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [signIn, toggle] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);
    
  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;

    if (!email || !name || !password) {
      alert("Please fill in all fields");
      return;
    }

    axios
      .post(signupUrl, { name, email, password })
      .then((response) => {
        console.log(response.data);
        alert("You signed up successfully!");
        setIsSignedUp(true);
        // Perform login after successful signup
        axios
          .post(loginUrl, { email, password })
          .then((loginResponse) => {
            console.log(loginResponse.data);
            const token = loginResponse.data.token;
            sessionStorage.setItem("token", token);
            setIsLoggedIn(true);
            navigate("/user-profile");
          })
          .catch((loginError) => {
            alert(loginError.response.data.error.message);
          });
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 400) {
          alert("This email is already signed up. Please sign in.");
        } else {
          alert("Something went wrong. Please try again later.");
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      alert("Please provide an email and password");
      return;
    }
    axios
      .post(loginUrl, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        const token = response.data.token;
        sessionStorage.setItem("token", token);
        setIsLoggedIn(true);
        alert("You signed in successfully!");
        navigate("/user-profile");
      })
      .catch((error) => {
        alert(error.response.data.error.message);
      });
  };


  return (
    <Components.Container>
      <button className="exit-button" onClick={handleCloseModal}>
        X
      </button>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignup}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input name="name" type="text" placeholder="Name" />
          <Components.Input name="email" type="email" placeholder="Email" />
          <Components.Input
            name="password"
            type="password"
            placeholder="Password"
          />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLogin}>
          <Components.Title>Access Account</Components.Title>
          <Components.Input name="email" type="email" placeholder="Email" />
          <Components.Input
            name="password"
            type="password"
            placeholder="Password"
          />
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please sign in with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Let's get you started on your fitness journey today!
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default SignInModal;
