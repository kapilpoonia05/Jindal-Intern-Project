import React from 'react'
import './page1.css';
import Jindalbg from '../../assests/jindalbg.webp'                                                       

const vari = [
  { 'var': 'Raw Gas Flow' },
  { 'var': 'Raw Gas Temperature' },
  { 'var': 'CO₂ In' },
  { 'var': 'CO₂ Out' },
  { 'var': 'Methanol Temperature' },
]

const Page1 = () => {
  return (
    <>
    <img className='bg' src={Jindalbg} />
      <div className='pg-1'>
      <p className='pg1-head'>Methanol Flow Calculator</p>
      <div className='pg-1-calc'>
        {vari.map((val) => {
          return (
            <div className='pg-1-input'>
              {val.var}
              <input
                className='input-var'
                type='number'
                required
                name={val.var}
              />
            </div>
          )
        })}
      </div>
      <button className='cal-btn'>Calculate</button>
    </div>
    </>
  )
}

export default Page1