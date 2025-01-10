/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Home, SignIn } from "../../pages";

//import MainLayout from "./Main";

const PrivateRouteAdmin = ({ component }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { userProfile } = useContext(AuthContext);
  console.log("PrivateRouteAdmin -> isLoggedIn", isLoggedIn);
  console.log("PrivateRouteAdmin -> userProfile.roles", userProfile.roles);


  if (isLoggedIn && userProfile.roles === "admin") {
    // Redirect to login page or any other public route
    return component;
  } else if (isLoggedIn) {
    return <Home />
  }
  // return <Navigate to="/login" replace />;
  return <SignIn />;

  // Render the child component or outlet
};

export default PrivateRouteAdmin;
