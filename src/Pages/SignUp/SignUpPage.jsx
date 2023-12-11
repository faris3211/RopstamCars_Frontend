import { useState } from 'react';
import styled from 'styled-components';
import logo from '../../Images/RopstamCars_Logo2.png';
import signup from '../../Images/signup.jpg';
import { Button, CircularProgress } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signUpUser } from '../../Services/marketplaceSlice';
import { useDispatch } from 'react-redux';

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [wait, setWait] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('Required*'),
    email: yup
      .string()
      .required('Required*')
      .matches(
        /^[A-Za-z][A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'Invalid Email Format'
      ),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setWait(true);
    dispatch(signUpUser(data))
      .unwrap()
      .then(() => {
        setWait(false);
        setShowSuccess(true);
      })
      .catch((rejectedValueOrSerializedError) => {
        setWait(false);
        console.log(rejectedValueOrSerializedError);
      });
  };

  return (
    <Container>
      {showSuccess && (
        <div class='box__notification'>
          <img
            src={logo}
            className='logo'
            alt='Logo of ropstam cars'
            onClick={() => navigate('/')}
          />

          <p className='notification__msg1'>
            We've sent login credentials to your email address.
          </p>
          <p className='notification__msg2'>
            Please check your inbox and follow the instructions to log in.
          </p>

          <Button
            className='submit__btn'
            onClick={() => navigate('/SignInPage')}
          >
            Sign In
          </Button>
        </div>
      )}

      {!showSuccess && (
        <div className='box__signupform'>
          <img
            src={logo}
            className='logo'
            alt='Logo of ropstam cars'
            onClick={() => navigate('/')}
          />

          <h1 className='form__title'>Create Account</h1>

          <form className='signup__form' onSubmit={handleSubmit(onSubmit)}>
            <div className='box__input'>
              <input
                className='input__value'
                type='text'
                {...register('name')}
                placeholder='Full Name'
              />
              <PersonOutlineOutlinedIcon className='input__icon' />
            </div>
            <p className='input__error'>{formState.errors.name?.message}</p>

            <div className='box__input'>
              <input
                className='input__value'
                type='text'
                {...register('email')}
                placeholder='Email'
              />
              <AlternateEmailOutlinedIcon className='input__icon' />
            </div>
            <p className='input__error'>{formState.errors.email?.message}</p>

            <Button className='submit__btn' type='submit'>
              {wait ? <CircularProgress className='waiting' /> : 'Sign Up'}
            </Button>

            <p className='signup__accounthelp'>
              Already have an account?
              <span
                className='accounthelp__link'
                onClick={() => {
                  navigate('/SignInPage');
                }}
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      )}
    </Container>
  );
}

export default SignUpPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${signup});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .box__signupform,
  .box__notification {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 5rem;
  }

  .logo {
    cursor: pointer;
    width: 27rem;
  }

  .form__title {
    font-size: 2.5rem;
    font-weight: 500;
    color: #f0ed31;
    margin-top: 1rem;
  }

  .box__input {
    width: 38rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #f9fbfc;
    border: 2px solid #b2b4b4;
    border-radius: 5px;
    margin-top: 1rem;
  }

  .input__value {
    cursor: pointer;
    width: 90%;
    height: 4.5rem;
    font-size: 1.8rem;
    color: #202020;
    background-color: transparent;
    border: none;
  }

  input:focus {
    cursor: text;
    outline: none !important;
  }

  .input__icon {
    font-size: 2.5rem;
    color: #073d7e;
  }

  .input__error {
    width: 98%;
    font-size: 1.3rem;
    color: #f71d1d;
    margin-top: 0.5rem;
  }

  .submit__btn {
    width: 38rem;
    height: 4rem;
    text-transform: none;
    font-size: 1.8rem;
    color: #fff;
    background-color: #073d7e;
    &:hover {
      background-color: #073d7e;
    }
    margin-top: 1rem;
  }

  .waiting {
    width: 2rem !important;
    height: 2rem !important;
    color: #fff;
  }

  .signup__accounthelp {
    font-size: 1.6rem;
    color: #ccc8c8;
    text-align: center;
    margin-top: 1rem;
  }

  .accounthelp__link {
    cursor: pointer;
    font-size: 1.8rem;
    font-weight: 500;
    color: #ccc8c8;
    border-bottom: 1px solid #f71d1d;
    margin-left: 1rem;
  }

  .notification__msg1,
  .notification__msg2 {
    font-size: 2rem;
    font-weight: 500;
    color: #f0ed31;
    margin: 0.3rem 0rem;
  }

  .notification__msg1 {
    margin-top: 1rem;
  }
`;
