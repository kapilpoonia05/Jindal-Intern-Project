import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Logo from '../../assests/logo.png';
import Jindalbg from '../../assests/jindalbg.webp'

const Home = () => {

  const navigate = useNavigate();

  const handleRedirect1 = () => {
    navigate('/methanol-flow-calculator');
  };
  const handleRedirect2 = () => {
    navigate('/discharge-pressure-calculator');
  };

  return (
    <>
    <img className='bg bg-home' src={Jindalbg} />
    <div className='home'>
      <div className='home-top'>
        <div className='home-head'>Refrigeration Load Analysis</div>
        <img className='logo' src={Logo} />
      </div>
      <div className='btns'>
        <button className='btn1' onClick={handleRedirect1}>Methanol Flow</button>
        <button className='btn1' onClick={handleRedirect2}>Discharge Pressure</button>
      </div>
    </div>
    </>
  )
}

export default Home