import { useState } from 'react';
import styled from 'styled-components';
import { Button, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editCarCategory } from '../../Services/marketplaceSlice';

const schema = yup.object().shape({
  carCategory: yup.string().required('Required*'),
});

function UpdateCarCategory({ carCategory, setUpdateCarCategory }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.marketplace);

  const [oldNameOfCarCategory, setOldNameOfCarCategory] = useState(
    carCategory.toUpperCase()
  );
  const [newNameOfCarCategory, setNewNameOfCarCategory] = useState(
    carCategory.toUpperCase()
  );
  const [wait, setWait] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit() {
    if (oldNameOfCarCategory !== newNameOfCarCategory.toUpperCase()) {
      setWait(true);

      dispatch(
        editCarCategory({
          userId: user._id,
          oldNameOfCarCategory,
          newNameOfCarCategory,
        })
      )
        .unwrap()
        .then(() => {
          setWait(false);
          setUpdateCarCategory(false);
        })
        .catch((rejectedValueOrSerializedError) => {
          setWait(false);
          console.log(rejectedValueOrSerializedError);
        });
    } else {
      setUpdateCarCategory(false);
    }
  }

  return (
    <Container>
      <div className='box__updatecarcategoryform'>
        <div className='box__formtitleandclosebtn'>
          <h1 className='formtitle'>Update Car Category</h1>

          <IconButton
            className='close__btn'
            onClick={() => setUpdateCarCategory(false)}
          >
            <CloseIcon className='close__icon' />
          </IconButton>
        </div>
        <form
          className='updatecarcategory__form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className='input__value'
            type='text'
            {...register('carCategory')}
            value={newNameOfCarCategory}
            onChange={(e) => setNewNameOfCarCategory(e.target.value)}
          />

          <p className='input__error'>
            {formState.errors.carCategory?.message}
          </p>

          <Button className='submit__btn' type='submit'>
            {wait ? <CircularProgress className='waiting' /> : 'Update'}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default UpdateCarCategory;

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

  .box__updatecarcategoryform {
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

  .updatecarcategory__form {
    background-color: #fff;
    padding: 1.5rem;
  }

  .input__value {
    cursor: pointer;
    width: 38rem;
    height: 4.5rem;
    font-size: 1.8rem;
    color: #202020;
    background-color: #f9fbfc;
    border: 1px solid #b2b4b4;
    border-radius: 5px;
    padding-left: 1rem;
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
    width: 100%;
    height: 4rem;
    text-transform: none;
    font-size: 1.6rem;
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
`;
