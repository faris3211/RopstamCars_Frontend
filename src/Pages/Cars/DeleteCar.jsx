import { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Button, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeCar } from '../../Services/marketplaceSlice';

function DeleteCar({ car, setDeleteCar }) {
  const dispatch = useDispatch();

  const [wait, setWait] = useState(false);

  function handleDelete(e) {
    e.preventDefault();
    setWait(true);
    dispatch(removeCar(car._id))
      .unwrap()
      .then(() => {
        setWait(false);
        setDeleteCar(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        setWait(false);
        console.log(rejectedValueOrSerializedError);
      });
  }

  return (
    <Container>
      <div className='box__deletecarform'>
        <div className='box__formtitleandclosebtn'>
          <h1 className='formtitle'>Delete Car</h1>

          <IconButton
            className='close__btn'
            onClick={() => setDeleteCar(false)}
          >
            <CloseIcon className='close__icon' />
          </IconButton>
        </div>
        <form className='deletcar__form' onSubmit={handleDelete}>
          <p className='input__label'>
            Are you sure you want to delete this car?
          </p>
          <Button className='submit__btn' type='submit'>
            {wait ? <CircularProgress className='waiting' /> : 'Delete'}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default DeleteCar;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);

  .box__deletecarform {
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
  }

  .box__formtitleandclosebtn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 1.5rem;
  }

  .formtitle {
    font-size: 2rem;
    font-weight: 500;
    color: #073d7e;
  }

  .close__btn {
    background-color: lightgray;
    &:hover {
      background-color: lightgray;
    }
  }

  .close__icon {
    font-size: 2.5rem;
    color: #151515;
  }

  .deletcar__form {
    background-color: #fff;
    padding: 1.5rem;
  }

  .input__label {
    font-size: 1.6rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 1rem;
  }

  .submit__btn {
    cursor: pointer;
    width: 100%;
    height: 4rem;
    text-transform: none;
    font-size: 1.6rem;
    color: white;
    background-color: #d0342c;
    &:hover {
      background-color: #d0342c;
    }
    margin-top: 1rem;
  }

  .waiting {
    width: 2rem !important;
    height: 2rem !important;
    color: #fff;
  }
`;
