
import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer} from 'react-toastify';
import GlobalStyles from "./styles/globalStyles";

import Routes from './routes/routes.js';
import { BrowserRouter } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent/>
      <Routes/>
      <ToastContainer/>
      <GlobalStyles/>
    </BrowserRouter>
  );
}

export default App;
