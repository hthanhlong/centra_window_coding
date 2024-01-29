import { Layout } from "./layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="m-auto max-w-[1440px]">
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
