import { useState } from 'react';
import styled from 'styled-components';
import logo from '../../Images/RopstamCars_Logo2.png';
import signin from '../../Images/signin.jpg';
import { Button, CircularProgress } from '@mui/material';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInUser } from '../../Services/marketplaceSlice';
import { useDispatch } from 'react-redux';

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [wait, setWait] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Required*')
      .matches(
        /^[A-Za-z][A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'Invalid Email Format'
      ),
    password: yup.string().required('Required*'),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setWait(true);
    dispatch(signInUser(data))
      .unwrap()
      .then(() => {
        setWait(false);
        navigate('/DashboardPage');
      })
      .catch((rejectedValueOrSerializedError) => {
        setWait(false);
        console.log(rejectedValueOrSerializedError);
      });
  };

  return (
    <Container>
      <div className='box__signinform'>
        <img
          src={logo}
          className='logo'
          alt='Logo of ropstam cars'
          onClick={() => navigate('/')}
        />

        <h1 className='form__title'>Welcome Back</h1>

        <form className='signin__form' onSubmit={handleSubmit(onSubmit)}>
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

          <div className='box__input'>
            <input
              id='password'
              className='input__value'
              type='password'
              {...register('password')}
              placeholder='Password'
            />
            <LockOutlinedIcon className='input__icon' />
          </div>
          <div className='box__errorandshowpassword'>
            <p className='input__passworderror'>
              {formState.errors.password?.message}
            </p>

            <p className='wrapper__showpassword'>
              <input
                className='input__showpassword'
                type='checkbox'
                onClick={() => {
                  let x = document.getElementById('password');
                  if (x.type === 'password') {
                    x.type = 'text';
                  } else {
                    x.type = 'password';
                  }
                }}
              />
              Show Password
            </p>
          </div>

          <Button className='submit__btn' type='submit'>
            {wait ? <CircularProgress className='waiting' /> : 'Sign In'}
          </Button>

          <p className='signin__accounthelp'>
            Don't have an account?
            <span
              className='accounthelp__link'
              onClick={() => {
                navigate('/SignUpPage');
              }}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </Container>
  );
}

export default SignInPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${signin});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .box__signinform {
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

  .box__errorandshowpassword {
    width: 98%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
  }

  .input__passworderror {
    font-size: 1.3rem;
    color: #f71d1d;
  }

  .wrapper__showpassword {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: #fff;
  }

  .input__showpassword {
    cursor: pointer;
    margin-right: 0.5rem;
  }

  .input__showpassword:checked {
    cursor: pointer;
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

  .signin__accounthelp {
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
`;
