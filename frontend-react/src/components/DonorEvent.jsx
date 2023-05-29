import React, { useState,useEffect } from 'react'
import {Table,Tag} from 'antd'


function DonorEvent() {

  const userID = localStorage.getItem("id");

const [donorData, setDonorData] = useState([])
  const getDonorEvent= async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/donor-events/${userID}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setDonorData(
        result.data.map(patient => ({
          name: patient.first_name.toUpperCase() +" "+ patient.last_name.toUpperCase(),
          blood_group: patient.blood_group.toUpperCase(),
          unit: patient.blood_unit,
          date: patient.donation_date,
          tags: [patient.event_status]
        }))
      );

    } catch (e) {
      console.log("error", e);
    }
  };



  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Patient Blood Group',
      dataIndex: 'blood_group',
      key: 'blood_group',
    },
    {
      title: 'Unit(s)',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: ' Event Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Event Status',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },

  ];
  
  const divStyle = {
    margin: 'auto',
    width: '50%',
    padding: '10px',
    marginTop: '100px',
};


useEffect(() => {
  getDonorEvent();  
 }, []);
  return (
    <>
    <div className='container' style={{marginTop:'30px'}}>
          <h2 style={{textAlign:'center'}}>YOUR EVENTS</h2>
    <div style={divStyle}>

    <Table   pagination={false} columns={columns} dataSource={donorData} />;
    </div>
    </div>
    
    </>
  )
}

export default DonorEvent