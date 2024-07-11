import React, { useState, useEffect } from 'react'
import './page1.css';
import Jindalbg from '../../assests/jindalbg.webp'
import axios from 'axios'

const Page1 = () => {

  const vari = [
    { 'var': 'Raw Gas Flow',
      'name':'RawGasFlow'
     },
    { 'var': 'Raw Gas Temperature',
      'name':'RawGasTemperature' 
    },
    { 'var': 'CO₂ In' ,
      'name':'CO2In'
    },
    { 'var': 'CO₂ Out' ,
      'name':'CO2Out'
    },
    { 'var': 'Methanol Temperature' ,
      'name':'MethanolTemperature'
    },
  ]

  const [inputValues, setInputValues] = useState(
    // vari.reduce((acc, item) => {
    //   acc[item.var] = '';
    //   return acc;
    // }, {})
    {
      'RawGasFlow':null,
      'RawGasTemperature':null,
      'CO2In':null,
      'CO2Out':null,
      'MethanolTemperature':null,
    }
  );

  const [data,setData] = useState({});
  const [error, setError] = useState(null);
  const [isresult, setIsResult] = useState(false);
  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/data');
        setData(res.data);
        console.log(res.data); // Log the fetched data
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const checkForNullValues = (obj) => {
      return Object.values(obj).some(value => value === null);
    };
    const handleCheck = () => {
      if (!checkForNullValues(inputValues)) {
        setShow(true);
      }
    };
    handleCheck();
  }, [inputValues]);

  const Page1Calc = async () => {
    console.log(inputValues);
    const log_rawgasflow = await Math.log(inputValues.RawGasFlow);
    const log_rawtemp = await Math.log(inputValues.RawGasTemperature);
    const log_co2_diff = await Math.log(inputValues.CO2In - inputValues.CO2Out);
    const log_co2in = await Math.log(inputValues.CO2In);
    const log_methanoltemp = await Math.log(inputValues.MethanolTemperature);
    const log_predicted_M = await ((data.meth.a * Math.log(data.meth.k1)) + (data.meth.b * log_rawgasflow) + (data.meth.c * log_rawtemp) + (data.meth.d * log_co2_diff) + (data.meth.e * log_co2in) + (data.meth.f * log_methanoltemp) );
    const predicted_M = await Math.exp(log_predicted_M);
    setResult(0.936275*predicted_M);
    setIsResult(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <>
      <img className='bg' src={Jindalbg} />
      <div className='pg-1'>
        <p className='pg1-head'>Methanol Flow Calculator</p>
        <div className='pg-1-calc'>
          {vari.map((val,index) => {
            return (
              <div key={index} className='pg-1-input'>
                {val.var}
                <input
                  key={index}
                  className='input-var'
                  type='number'
                  required
                  name={val.name}
                  value={inputValues[val.name]}
                  onChange={handleChange}
                />
              </div>
            )
          })}
        </div>
        {!isresult ? 
        (show && (<button
          onClick={Page1Calc}
          className='cal-btn'>
          Calculate
        </button>)):
        (
          <div className='result'>Predicted Methanol Flow: {result ? (result) : "Check your values"}</div>
        )}
      </div>
    </>
  )
}

export default Page1