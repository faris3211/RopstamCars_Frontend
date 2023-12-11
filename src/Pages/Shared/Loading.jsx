import styled from 'styled-components';

function Loading() {
  return (
    <Wrapper>
      <div className='page__loading'></div>
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .page__loading {
    width: 50px;
    height: 50px;
    border: 4px solid;
    border-color: #15b8bf transparent #15b8bf transparent;
    border-radius: 50%;
    margin-top: -15%;
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
