import styled from 'styled-components';
import logo from '../../Images/RopstamCars_Logo2.png';
import home from '../../Images/home.jpg';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className='box__homebtns'>
        <img src={logo} className="logo" alt="Logo of ropstam cars" />
        <Button className='signup__btn' onClick={()=> navigate('/SignUpPage')}>Sign Up</Button>
        <Button className='signin__btn' onClick={()=> navigate('/SignInPage')}>Sign In</Button>
      </div>
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${home});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .box__homebtns {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 5rem;
  }

  .logo {
    width: 27rem;
  }

  .signup__btn,
  .signin__btn {
    width: 20rem;
    height: 4rem;
    font-size: 2rem;
    font-weight: 400;
    color: #fff;
    text-transform: none;
    background-color: #073d7e;
    &:hover {
      background-color: #073d7e;
    }
    margin: 1rem;
  }
`;
