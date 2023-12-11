import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';
import { PieChart } from '@mui/x-charts/PieChart';
import { IconButton } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardDetails } from '../../Services/marketplaceSlice';

function DashboardPage() {
  const dispatch = useDispatch();

  const { user, systemTotalCarsByCategory, myTotalCarsByCategory } =
    useSelector((state) => state.marketplace);

  const [loading, setLoading] = useState('idle');

  useEffect(() => {
    setLoading('loading');
    dispatch(fetchDashboardDetails(user._id))
      .unwrap()
      .then(() => {
        setLoading('success');
      })
      .catch((rejectedValueOrSerializedError) => {
        setLoading('error');
        console.log(rejectedValueOrSerializedError);
      });
  }, []);

  return (
    <Container>
      <Header pageName='DashboardPage' />

      {loading === 'idle' && <Loading />}

      {loading === 'loading' && <Loading />}

      {loading === 'success' && (
        <div className='container__totalCarsbycategory'>
          <div className='box__systemtotalcarspiechart'>
            <h2 className='piecharttitle'>System Total Cars</h2>

            {systemTotalCarsByCategory.length > 0 ? (
              <PieChart
                series={[
                  {
                    innerRadius: 30,
                    outerRadius: 120,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: 'gray',
                    },
                    data: systemTotalCarsByCategory,
                  },
                ]}
                height={300}
              />
            ) : (
              <div className='box__nodatafound'>
                <IconButton className='wrapper__nodataicon'>
                  <DescriptionIcon className='nodata__icon' />
                </IconButton>
                <p className='nodata__headline'>No Cars Found!</p>
                <p className='nodata__subheadline'>
                  No cars are registered yet in the system
                </p>
              </div>
            )}
          </div>
          <div className='box__mytotalcarspiechart'>
            <h2 className='piecharttitle'>My Total Cars</h2>

            {myTotalCarsByCategory.length > 0 ? (
              <PieChart
                series={[
                  {
                    innerRadius: 30,
                    outerRadius: 120,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: 'gray',
                    },
                    data: myTotalCarsByCategory,
                  },
                ]}
                height={300}
              />
            ) : (
              <div className='box__nodatafound'>
                <IconButton className='wrapper__nodataicon'>
                  <DescriptionIcon className='nodata__icon' />
                </IconButton>
                <p className='nodata__headline'>No Cars Found!</p>
                <p className='nodata__subheadline'>
                  Add new to see your registered cars
                </p>
              </div>
            )}
          </div>
        </div>
      )}

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

export default DashboardPage;

const Container = styled.div`
  width: 100%;

  .container__totalCarsbycategory {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  .piecharttitle {
    font-size: 2rem;
    font-weight: 500;
    color: #073d7e;
    border-bottom: 2px solid #1c8d91;
    border-bottom-right-radius: 8px;
    padding: 1.5rem;
  }

  .box__systemtotalcarspiechart,
  .box__mytotalcarspiechart {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid #073d7e;
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
`;
