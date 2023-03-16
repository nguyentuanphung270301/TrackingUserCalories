import logo from './logo.svg';
import './App.css';
import { ToastContainer } from "react-toastify"
import CssBaseline from "@mui/material/CssBaseline";
import LoginForm from './components/common/LoginForm';
import GetUser from './components/common/GetUser';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from './components/layout/MainLayout'
import routes from './routes/routes';
import PageWrapper from './components/common/PageWrapper';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) => (
              route.index ? (
                <Route
                  index
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              )
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
