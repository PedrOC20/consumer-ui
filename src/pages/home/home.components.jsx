import axios from 'axios';
import Button from '../../components/button/button.component';
import { HomeContainer } from './home.styles';
import ProductSearch from '../../components/product-search/product-search.component';
import LoadingScreen from '../../components/loading-screen/loading-screen.components';
import { useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true)
    axios.post("http://localhost:3001/process_file")
    .then( res => {
      setLoading(false)
      console.log(res)
    })
    .catch( () => {
      setLoading(false)
      console.log('Message not sent')
    })
  }

  return (
    <HomeContainer>
      <Button centered onClick={ handleSubmit }>Start Processing JSON</Button>
      <ProductSearch />
      {loading && <LoadingScreen />}
    </HomeContainer>
  )
};

export default Home;