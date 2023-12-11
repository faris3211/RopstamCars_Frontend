import styled from 'styled-components';
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
  return (
    <Container>
      <p className='copyright__text'>
        Copyright <CopyrightIcon className='copyright__icon' /> 2023 , Ropstam Cars Inc.
      </p>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #073d7e;
  padding: 1.5rem;

  .copyright__text {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    color: #fff;
  }

  .copyright__icon {
    font-size: 1.8rem;
    margin-right: 1rem;
    margin-left: 0.5rem;
  }
`;
