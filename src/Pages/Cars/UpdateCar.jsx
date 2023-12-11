import { useState } from 'react';
import styled from 'styled-components';
import { Button, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { editCar } from '../../Services/marketplaceSlice';

const schema = yup.object().shape({
  make: yup.string().required('Required*'),
  model: yup.string().required('Required*'),
  variant: yup.string().required('Required*'),
  color: yup.string().required('Required*'),
  registrationNumber: yup.string().required('Required*'),
});

function UpdateCar({ car, setUpdateCar }) {
  const dispatch = useDispatch();

  const [make, setMake] = useState(car.make.toUpperCase());
  const [model, setModel] = useState(car.model.toUpperCase());
  const [variant, setVariant] = useState(car.variant.toUpperCase());
  const [color, setColor] = useState(car.color.toUpperCase());
  const [registrationNumber, setRegistrationNumber] = useState(
    car.registrationNumber
  );
  const [wait, setWait] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit() {
    if (
      car.make.toUpperCase() !== make.toUpperCase() ||
      car.model.toUpperCase() !== model.toUpperCase() ||
      car.variant.toUpperCase() !== variant.toUpperCase() ||
      car.color.toUpperCase() !== color.toUpperCase() ||
      car.registrationNumber !== registrationNumber
    ) {
      setWait(true);

      dispatch(
        editCar({
          carId: car._id,
          update: { make, model, variant, color, registrationNumber },
        })
      )
        .unwrap()
        .then(() => {
          setWait(false);
          setUpdateCar(false);
        })
        .catch((rejectedValueOrSerializedError) => {
          setWait(false);
          console.log(rejectedValueOrSerializedError);
        });
    } else {
      setUpdateCar(false);
    }
  }

  return (
    <Container>
      <div className='box__updatecarform'>
        <div className='box__formtitleandclosebtn'>
          <h1 className='formtitle'>Update Car</h1>

          <IconButton
            className='close__btn'
            onClick={() => setUpdateCar(false)}
          >
            <CloseIcon className='close__icon' />
          </IconButton>
        </div>
        <form className='updatecar__form' onSubmit={handleSubmit(onSubmit)}>
          <p className='input__label'>Car Specifications</p>
          <input
            className='input__value'
            type='text'
            {...register('make')}
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
          <p className='input__error'>{formState.errors.make?.message}</p>

          <input
            className='input__value'
            type='text'
            {...register('model')}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <p className='input__error'>{formState.errors.model?.message}</p>

          <input
            className='input__value'
            type='text'
            {...register('variant')}
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          />
          <p className='input__error'>{formState.errors.variant?.message}</p>

          <input
            className='input__value'
            type='text'
            {...register('color')}
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <p className='input__error'>{formState.errors.color?.message}</p>

          <input
            className='input__value'
            type='text'
            {...register('registrationNumber')}
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
          <p className='input__error'>
            {formState.errors.registrationNumber?.message}
          </p>

          <Button className='submit__btn' type='submit'>
            {wait ? <CircularProgress className='waiting' /> : 'Update'}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default UpdateCar;

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

  .box__updatecarform {
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

  .updatecar__form {
    background-color: #fff;
    padding: 1.5rem;
  }

  .input__label {
    font-size: 1.6rem;
    font-weight: 400;
    color: #374151;
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
    margin-top: 1rem;
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
