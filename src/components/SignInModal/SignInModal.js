import { useState } from "react";
import * as Components from "./Components";
import "./SignInModal.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/api-utils";

const baseUrl = BASE_URL;
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
      toast("Please fill in all fields", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#4b4b4b",
          color: "#E5E5E5",
        },
      });
      return;
    }

    axios
      .post(signupUrl, { name, email, password })
      .then((response) => {
        toast.success("You signed up successfully!", {
          style: {
            borderRadius: "10px",
            background: "#4b4b4b",
            color: "#E5E5E5",
          },
        });
        setIsSignedUp(true);
        // Perform login after successful signup
        axios
          .post(loginUrl, { email, password })
          .then((loginResponse) => {
            const token = loginResponse.data.token;
            sessionStorage.setItem("token", token);
            setIsLoggedIn(true);
            navigate("/user-profile");
          })
          .catch((loginError) => {
            toast.error(loginError.response.data.error.message, {
              style: {
                borderRadius: "10px",
                background: "#4b4b4b",
                color: "#E5E5E5",
              },
            });
          });
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 400) {
          toast("This email is already signed up. Please sign in.", {
            icon: "⚠️",
            style: {
              borderRadius: "10px",
              background: "#4b4b4b",
              color: "#E5E5E5",
            },
          });
        } else {
          toast.error("Something went wrong. Please try again later.", {
            style: {
              borderRadius: "10px",
              background: "#4b4b4b",
              color: "#E5E5E5",
            },
          });
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      toast("Please provide an email and password", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#4b4b4b",
          color: "#E5E5E5",
        }
      });
      return;
    }
    axios
      .post(loginUrl, {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        sessionStorage.setItem("token", token);
        setIsLoggedIn(true);
        toast.success("You signed in successfully!", {
          style: {
            borderRadius: "10px",
            background: "#4b4b4b",
            color: "#E5E5E5",
          },
        });
        navigate("/user-profile");
      })
      .catch((error) => {
        toast.error(error.response.data.error.message, {
          style: {
            borderRadius: "10px",
            background: "#4b4b4b",
            color: "#E5E5E5",
          },
        });
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
