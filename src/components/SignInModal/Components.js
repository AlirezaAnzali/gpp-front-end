import styled from "styled-components";

//  @media (max-width: 48rem) {};

export const Container = styled.div`
  background-color: #fca311;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
  @media (max-width: 48rem) {
    height: 678px;
    max-height: 100%;
    max-width: 300px;
  }
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  @media (max-width: 48rem) {
    width: 100%;
    height: 50%;
  }
  ${(props) =>
    props.signinIn !== true
      ? `
    transform: translateX(100%);
    @media (max-width: 48rem) {
      transform: translateY(100%);
    };
    opacity: 1;
    z-index: 5;
  `
      : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  @media (max-width: 48rem) {
    width: 100%;
    height: 50%;
  }
  ${(props) =>
    props.signinIn !== true
      ? `transform: translateX(100%);
     @media (max-width: 48rem) {
      transform: translateY(100%);
    };`
      : null}
`;

export const Form = styled.form`
  background-color: #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  font-size: 28px;
  @media (max-width: 48rem) {
    font-size: 1.5rem;
  }
`;

export const Input = styled.input`
  background-color: #ffffff;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  &:focus {
    border: 2px solid #fca311;
    outline: none;
  }
`;

export const Button = styled.button`
  border-radius: 4px;
  border: 1px solid #fca311;
  background-color: #fca311;
  cursor: pointer;
  color: #000000;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  margin: 8px 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &:hover {
    color: #ffffff;
    background-color: #000000;
    outline: none;
    border: 1px solid #000000;
  }
`;
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #14213d;
  color: #14213d;
  &:hover {
    color: #fca311;
    background-color: #14213d;
    outline: none;
    border: 1px solid #14213d;
  }
`;
export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 9;
  @media (max-width: 48rem) {
    top: 50%;
    left: 0;
    width: 100%;
    height: 50%;
  }
  ${(props) =>
    props.signinIn !== true
      ? `transform: translateX(-100%);
    @media (max-width: 48rem) {
      transform: translateY(-100%);
    };`
      : null}
`;

export const Overlay = styled.div`
  background: #fca311;
  background: -webkit-linear-gradient(to right, #fdb94b, #fca311);
  background: linear-gradient(to right, #fdb94b, #fca311);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #14213d;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  @media (max-width: 48rem) {
    left: 0;
    top: -100%;
    width: 100%;
    height: 200%;
    transform: translateY(0);
  }
  ${(props) =>
    props.signinIn !== true
      ? `transform: translateX(50%);
        @media (max-width: 48rem) {
            transform: translateY(50%);
          };`
      : null}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  @media (max-width: 48rem) {
    width: 100%;
    height: 50%;
    transform: translateY(0);
  }
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  @media (max-width: 48rem) {
    transform: translateY(-20%);
  }
  ${(props) =>
    props.signinIn !== true
      ? `transform: translateX(0);
        @media (max-width: 48rem) {
          transform: translateY(0);
        };`
      : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  @media (max-width: 48rem) {
    bottom: 0;
    transform: translateY(100%);
  }
  ${(props) =>
    props.signinIn !== true
      ? `transform: translateX(20%);
  @media (max-width: 48rem) {
    transform: translateY(80%);
  }`
      : null}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;
