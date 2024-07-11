import React from 'react'
import './page2.css';
import Jindalbg from '../../assests/jindalbg.webp'                                                       

const vari = [
  { 'var': 'Methanol Flow' },
  { 'var': 'Cooling Water Inlet Temperature' },
  { 'var': 'Cooling Water Flow' },
  { 'var': 'Prop Out Temperature' },
  { 'var': 'Raw Gas Flow' },
]

const Page2 = () => {
  return (
    <>
    <img className='bg' src={Jindalbg} />
      <div className='pg-1'>
      <p className='pg1-head'>Discharge Pressure Calculator</p>
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

export default Page2