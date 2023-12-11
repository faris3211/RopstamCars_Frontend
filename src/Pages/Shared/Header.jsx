import styled from 'styled-components';
import logo from '../../Images/RopstamCars_Logo2.png';
import { Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CategoryIcon from '@mui/icons-material/Category';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../Services/marketplaceSlice';

function Header({ pageName }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container>
      <img src={logo} className='logo' />

      <nav className='box__navlinks'>
        {pageName === 'DashboardPage' && (
          <>
            <Button
              className='navlink'
              onClick={() => navigate('/CarCategoriesPage')}
            >
              <CategoryIcon className='navlink__icon' />
              Car Categories
            </Button>

            <Button className='navlink' onClick={() => navigate('/CarsPage')}>
              <DriveEtaIcon className='navlink__icon' />
              Cars
            </Button>
          </>
        )}

        {pageName === 'CarCategoriesPage' && (
          <>
            <Button
              className='navlink'
              onClick={() => navigate('/DashboardPage')}
            >
              <DashboardIcon className='navlink__icon' />
              Dashboard
            </Button>

            <Button className='navlink' onClick={() => navigate('/CarsPage')}>
              <DriveEtaIcon className='navlink__icon' />
              Cars
            </Button>
          </>
        )}

        {pageName === 'CarsPage' && (
          <>
            <Button
              className='navlink'
              onClick={() => navigate('/DashboardPage')}
            >
              <DashboardIcon className='navlink__icon' />
              Dashboard
            </Button>

            <Button
              className='navlink'
              onClick={() => navigate('/CarCategoriesPage')}
            >
              <CategoryIcon className='navlink__icon' />
              Car Categories
            </Button>
          </>
        )}

        <Button
          className='navlink signout__btn'
          onClick={() => {
            navigate('/');
            dispatch(signOut());
          }}
        >
          <ExitToAppIcon className='navlink__icon' />
          Sign Out
        </Button>
      </nav>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #073d7e;
  padding: 0.8rem 2rem;

  .logo {
    width: 17rem;
  }

  .navlink {
    text-transform: none;
    font-size: 1.8rem;
    color: #fff;
    border: 2px solid #1c8d91;
    border-radius: 5px;
    padding: 0rem 2rem;
    margin-left: 1rem;
  }

  .navlink__icon {
    font-size: 2rem;
    margin-right: 1rem;
  }

  .signout__btn {
    background-color: #1c8d91;
  }
`;
