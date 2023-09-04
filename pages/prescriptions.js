import React, { useState, useEffect } from 'react'
import { apiEndPoint } from '../services/http.service';

export default function Prescriptions() {
  const [file, setFile] = useState(undefined);

  const upload  = () => {
    const data = new FormData();
    data.append("file", file);
    fetch(`${apiEndPoint}prescription/upload`, { method: "POST", body: data, headers : { token : localStorage.getItem("token") } })
    .then((response) => {
      console.log(response)
    })
  }

  const onChange  = (e) => {
    setFile(e.target.files[0])
  }

  return (
      // <div  className='inprogress'>
      //   <h2>This page is in progress</h2>
      // </div>
    <div className='prescription-upload-container' >
      <label htmlFor='prescription-file' >upload the excel file here</label>
      <input type='file' id='prescription-file' name='prescription-file' onChange={onChange} hidden/>
      <button onClick={upload} >upload</button>
    </div>
  )
}

