import React, { useState, useEffect } from 'react'

export default function Prescriptions() {

return (
    // <div  className='inprogress'>
    //   <h2>This page is in progress</h2>
    // </div>
    <div className='prescription-upload-container' >
      <label htmlFor='prescription-file' >upload the excel file here</label>
      <input type='file' id='prescription-file' name='prescription-file' hidden />
    </div>
)

}

