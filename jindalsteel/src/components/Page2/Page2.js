import React, { useState, useEffect } from 'react'
// import './page2.css';
import '.././Page1/page1.css'
import Jindalbg from '../../assests/jindalbg.webp'
import axios from 'axios'

const Page2 = () => {

  const vari = [
    { 'var': 'Methanol Flow',
      'name':'MethanolFlow'
     },
    { 'var': 'Cooling Water Inlet Temperature',
      'name':'CoolingWaterInletTemperature' 
    },
    { 'var': 'Cooling Water Flow' ,
      'name':'CoolingWaterFlow'
    },
    { 'var': 'PropOutTemperature' ,
      'name':'PropOutTemperature'
    },
    { 'var': 'Raw Gas Flow' ,
      'name':'RawGasFlow'
    },
  ]

  const [inputValues, setInputValues] = useState(
    // vari.reduce((acc, item) => {
    //   acc[item.var] = '';
    //   return acc;
    // }, {})
    {
      'MethanolFlow':null,
      'CoolingWaterInletTemperature':null,
      'CoolingWaterFlow':null,
      'PropOutTemperature':null,
      'RawGasFlow':null,
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
    const log_methanol_flow = await Math.log(inputValues.MethanolFlow)
    const log_cws_temp = await Math.log(inputValues.CoolingWaterInletTemperature)
    const log_cw_flow = await Math.log(inputValues.CoolingWaterFlow)
    const log_raw_gas_flow = await Math.log(inputValues.RawGasFlow)
    const log_prop_out = await Math.log(inputValues.PropOutTemperature)
    const log_predicted_dis_press = await (data.dis.a * Math.log(data.dis.k1) + data.dis.b * log_methanol_flow + data.dis.d * log_cws_temp + data.dis.e * log_cw_flow + data.dis.c * log_raw_gas_flow + data.dis.f * log_prop_out)
    const predicted_dis_press = await Math.exp(log_predicted_dis_press)
    const corrected_dis_press=predicted_dis_press-0.25
    setResult(corrected_dis_press);
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
        <p className='pg1-head'>Pressure Discharge Calculator</p>
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
          <div className='result'>Predicted Discharge Pressure: {result ? (result) : "Check your values"}</div>
        )}
      </div>
    </>
  )
}

export default Page2