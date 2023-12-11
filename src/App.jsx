import logo from './Images/RopstamCars_Logo2.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import ProtectRoute from './Pages/Shared/ProtectRoute';

import HomePage from './Pages/Home/HomePage';
import SignInPage from './Pages/SignIn/SignInPage';
import SignUpPage from './Pages/SignUp/SignUpPage';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import CarCategoriesPage from './Pages/CarCategories/CarCategoriesPage';
import CarsPage from './Pages/Cars/CarsPage';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  });

  return (
    <>
      <section className='responsivenotsupported__fallback'>
        <img
          className='notsupported__logo'
          src={logo}
          alt='Logo of ropstam cars'
        />
        <p className='notsupported__headline'>
          This web app is not supported in devices with screen width lower than
          1000px and higher than 2000px !
        </p>
      </section>
      <section className='responsivesupported__content'>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/SignInPage' element={<SignInPage />} />
              <Route path='/SignUpPage' element={<SignUpPage />} />
              <Route
                path='/DashboardPage'
                element={
                  <ProtectRoute>
                    <DashboardPage />
                  </ProtectRoute>
                }
              />
              <Route
                path='/CarCategoriesPage'
                element={
                  <ProtectRoute>
                    <CarCategoriesPage />
                  </ProtectRoute>
                }
              />
              <Route
                path='/CarsPage'
                element={
                  <ProtectRoute>
                    <CarsPage />
                  </ProtectRoute>
                }
              />
            </Routes>
          </ThemeProvider>
          <ToastContainer />
        </BrowserRouter>
      </section>
    </>
  );
}

export default App;
