import AppRoutes from "../src/routes/AppRoutes"; // adjust the path if needed
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import ''
import "./index.css";
function App() {
  return (
    <>
      <AppRoutes />
 <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
