import React from 'react';
import './Cards.css';
import { Card } from 'antd';
import BlurOnTwoToneIcon from '@mui/icons-material/BlurOnTwoTone';


function Cards() {
  return (
    <div className='cards'>
      <h1>Key Features</h1>
      <div className='container feature_list'>
        <div className='container feature'>
          <ul className=''>
            <li className='d-flex'>
            <BlurOnTwoToneIcon/>
             <p>Spread the Word to Save Lives</p> 
            </li>
            <li className='d-flex'>
            <BlurOnTwoToneIcon/>
             <p>Help us in saving lives by adopting a thalassemic patient</p> 
            </li>
            <li className='d-flex'>
            <BlurOnTwoToneIcon/>
             <p>Ready to donate blood to save lives</p> 
            </li>
            <li className='d-flex'>
            <BlurOnTwoToneIcon/>
             <p>Need blood or need a sponsor</p> 
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
