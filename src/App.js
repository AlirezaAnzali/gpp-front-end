import './App.scss';
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import NewPlanForm from './components/NewPlanForm/NewPlanForm';
import WorkoutDetails from "./pages/WorkoutDetails/WorkoutDetails";
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";
import SignInModal from './components/SignInModal/SignInModal';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(sessionStorage.getItem("token"))
  );
  
  const [showSignInModal, setShowSignInModal] = useState(false);
  const handleSignInClick = () => {
    setShowSignInModal(true);
  };
   const handleCloseModal = () => {
    setShowSignInModal(false);
  };


  return (
    <Router>
        {showSignInModal && !isLoggedIn && (
          <div className="overlay" onClick={handleCloseModal}></div>
        )}
        <div className="modal-wrapper">
          {showSignInModal && !isLoggedIn && (
            <SignInModal
              setIsLoggedIn={setIsLoggedIn}
              handleCloseModal={handleCloseModal}
            />
          )}
        </div>
        <Header
          isLoggedIn={isLoggedIn}
          handleSignInClick={handleSignInClick}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                showSignInModal={showSignInModal}
              />
            }
          />
          <Route
            path="/user-profile"
            element={<Profile isLoggedIn={isLoggedIn} />}
          />
          <Route path="/user-profile/edit" element={<EditProfile />} />
          <Route path="/new-plan" element={<NewPlanForm />} />
          <Route path="/workout-plan" element={<WorkoutDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
