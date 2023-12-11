import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';
import CreateCar from './CreateCar';
import DeleteCar from './DeleteCar';
import UpdateCar from './UpdateCar';
import { IconButton, Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCarsByUser,
  fetchCarCategories,
} from '../../Services/marketplaceSlice';

function CarsPage() {
  const dispatch = useDispatch();

  const { user, cars } = useSelector((state) => state.marketplace);

  const [loading, setLoading] = useState('idle');
  const [car, setCar] = useState({});
  const [createCar, setCreateCar] = useState(false);
  const [updateCar, setUpdateCar] = useState(false);
  const [deleteCar, setDeleteCar] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const carsPerPage = 5;
  const pagesVisited = pageNumber * carsPerPage;
  const pageCount = Math.ceil(cars.length / carsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setLoading('loading');
    dispatch(fetchCarsByUser(user._id))
      .unwrap()
      .then(() => {
        dispatch(fetchCarCategories(user._id))
          .unwrap()
          .then(() => {
            setLoading('success');
          })
          .catch((rejectedValueOrSerializedError) => {
            setLoading('error');
            console.log(rejectedValueOrSerializedError);
          });
      })
      .catch((rejectedValueOrSerializedError) => {
        setLoading('error');
        console.log(rejectedValueOrSerializedError);
      });
  }, []);

  return (
    <Container>
      <Header pageName='CarsPage' />

      {loading === 'idle' && <Loading />}

      {loading === 'loading' && <Loading />}

      {loading === 'success' && (
        <div className='container__carstable'>
          <div className='box__tabletitleandaddnewbtn'>
            <h1 className='tabletitle'>My Registered Cars</h1>
            <Button
              className='addnew__btn'
              onClick={() => {
                setCreateCar(true);
              }}
            >
              <AddIcon className='btn__icon' /> Add New
            </Button>
          </div>

          {cars.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>SR.</th>
                    <th>MAKE</th>
                    <th>MODEL</th>
                    <th>VARIANT</th>
                    <th>CATEGORY</th>
                    <th>COLOR</th>
                    <th>REGISTRATION N0.</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {cars
                    .slice(pagesVisited, pagesVisited + carsPerPage)
                    .map((car, index) => {
                      return (
                        <tr key={`car${index + 1}`}>
                          <td>{index + 1}</td>
                          <td>{car.make.toUpperCase()}</td>
                          <td>{car.model.toUpperCase()}</td>
                          <td>{car.variant.toUpperCase()}</td>
                          <td>{car.category.toUpperCase()}</td>
                          <td>{car.color.toUpperCase()}</td>
                          <td>{car.registrationNumber}</td>
                          <td>
                            <Button
                              className='edit__btn'
                              onClick={() => {
                                setCar(car);
                                setUpdateCar(true);
                              }}
                            >
                              <EditIcon className='btn__icon' /> Edit
                            </Button>{' '}
                            <Button
                              className='delete__btn'
                              onClick={() => {
                                setCar(car);
                                setDeleteCar(true);
                              }}
                            >
                              <DeleteIcon className='btn__icon' /> Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'paginationBttns'}
                previousLinkClassName={'previousBttn'}
                nextLinkClassName={'nextBttn'}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
              />
            </>
          ) : (
            <div className='box__nodatafound'>
              <IconButton className='wrapper__nodataicon'>
                <DescriptionIcon className='nodata__icon' />
              </IconButton>
              <p className='nodata__headline'>No Cars Found!</p>
              <p className='nodata__subheadline'>Add new to see cars</p>
            </div>
          )}
        </div>
      )}

      {createCar && <CreateCar setCreateCar={setCreateCar} />}

      {updateCar && <UpdateCar car={car} setUpdateCar={setUpdateCar} />}

      {deleteCar && <DeleteCar car={car} setDeleteCar={setDeleteCar} />}

      {loading === 'error' && (
        <div className='box__error'>
          <IconButton className='wrapper__erroricon'>
            <PriorityHighIcon className='error__icon' />
          </IconButton>
          <p className='error__headline'>Something Went Wrong!</p>
          <p className='error__subheadline'>Try refreshing page.</p>
        </div>
      )}

      <Footer />
    </Container>
  );
}

export default CarsPage;

const Container = styled.div`
  width: 100%;

  .container__carstable {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem;
  }

  .box__tabletitleandaddnewbtn {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .tabletitle {
    font-size: 2rem;
    font-weight: 500;
  }

  table {
    width: 100%;
    overflow: scroll;
  }

  table,
  th,
  td {
    border: 1px solid white;
    border-collapse: collapse;
    border-radius: 5px;
  }

  th {
    font-size: 1.5rem;
    color: #fff;
    text-align: center;
    padding: 1.5rem 1rem;
    background-color: #073d7e;
  }

  td {
    font-size: 1.5rem;
    color: #fff;
    text-align: center;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .addnew__btn {
    width: 12rem;
    font-size: 1.3rem;
    color: #fff;
    background-color: #46b92a;
    &:hover {
      background-color: #46b92a;
    }
  }

  .edit__btn {
    width: 10rem;
    font-size: 1.3rem;
    color: #fff;
    margin: 0rem 1rem;
    background-color: #1c8d91;
    &:hover {
      background-color: #1c8d91;
    }
    margin: 0rem 1rem;
  }

  .delete__btn {
    width: 10rem;
    font-size: 1.3rem;
    color: #fff;
    background-color: #f56464;
    &:hover {
      background-color: #f56464;
    }
    margin: 0rem 1rem;
  }

  .btn__icon {
    font-size: 2rem;
    margin-right: 1rem;
  }

  .box__nodatafound {
    width: 100%;
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .box__error {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .wrapper__nodataicon {
    cursor: default;
    background-color: #15b8bf;
    &:hover {
      background-color: #15b8bf;
    }
    padding: 2rem;
    margin-bottom: 1rem;
  }

  .wrapper__erroricon {
    cursor: default;
    background-color: #f56464;
    &:hover {
      background-color: #f56464;
    }
    padding: 2rem;
    margin-top: -15%;
    margin-bottom: 1rem;
  }

  .nodata__icon,
  .error__icon {
    font-size: 6rem;
    color: #fff;
  }

  .nodata__headline,
  .error__headline {
    font-size: 2.2rem;
    font-weight: 600;
  }

  .nodata__subheadline,
  .error__subheadline {
    font-size: 1.6rem;
  }

  .paginationBttns {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 4rem 0rem;
  }

  .paginationBttns a {
    cursor: pointer;
    font-size: 1.4rem;
    color: #073d7e;
    border-radius: 5px;
    margin: 0rem 0.5rem;
    padding: 1rem 1.5rem;
  }

  .paginationActive a {
    cursor: pointer;
    color: white;
    background-color: #073d7e;
  }

  .paginationDisabled a {
    cursor: not-allowed;
    color: grey;
    background-color: whitesmoke;
  }
`;
