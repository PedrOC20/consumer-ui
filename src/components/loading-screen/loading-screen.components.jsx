import { LoadingContainer, LoadingSpinner } from './loading-screen.styles';

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <p>Processing...</p>
    </LoadingContainer>
  );
};

export default LoadingScreen;