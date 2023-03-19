import Head from 'next/head'
import { useState } from 'react'
import styles from "../styles/Register.module.css"

export default function Home() {

  const [patientDetails, setpatientDetails] = useState({});
  const [isPriscriptionPage, setisPriscriptionPage] = useState(false);
  const [isPrescriptionSubmitted, setisPrescriptionSubmitted] = useState(false);
  const [prescriptionDetails, setprescriptionDetails] = useState([{}]);

  const deletePrescription = (i) => {
    const temp = [...prescriptionDetails];
    console.table(temp);
    console.log(i)
    temp.splice(i, 1);
    console.table(temp);
    setprescriptionDetails(temp);
  }

  const submita = () => {}

  const onPrescriptionUpdate = (e, index) => {
    // prescriptiondetails
    console.log(e, index)
    const temp = [...prescriptionDetails];
    temp[index] = temp[index] || {};
    temp[index][e.target.name] = e.target.value;
    setprescriptionDetails(temp)
  }
  let prescriptionListTemp = [];
  const onInputChange = (event) => {
    console.log(event.currentTarget.name, event.currentTarget.value)

    const updatedValue = { [event.currentTarget.name]: event.currentTarget.value }
    setpatientDetails(patientInfo => ({
      ...patientInfo,
      ...updatedValue
    }))
  }

  const [prescriptions, setprescriptions] = useState([]);

  const submit = () => {
    console.table(patientDetails);
    console.table(prescriptionDetails)
    setisPrescriptionSubmitted(true)




    fetch('http://localhost:3005/prescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...patientDetails, prescriptionDetails : prescriptionDetails}),
    }).then((d) => {
      console.log(d)
    })
  }

  const gotoPrescriptionPage = () => {
    setisPriscriptionPage(true);
  }

  const onPrescriptionChange = (e, i) => {
    console.log()
  }

  return (
    <div>
      <Head>
        <title>Login Page</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      {/* 
Patient details
	1. Patient name
	2. Age
	3. Disease / Symptoms ?
	4. Phone number
	5. Appointment details
	6. Appointment date
	7. 
*/}

      <main className={styles["patient-details-container"]} >
        {isPrescriptionSubmitted ? (<>
          <h1>Your prescription is submitted!</h1>
        </>) : (
          <div className={styles["patient-details-section"]}>
            <div className="heading-container">
              <h2 onClick={() => { setisPriscriptionPage(false) }}>Patient details</h2>
            </div>
            {isPriscriptionPage ? (<div className="patient-details">
              {/* {prescriptionListTemp} */}
              {
                prescriptionDetails.map((a, i) => (
                  <div className={[styles["prescription-container"]]} >
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="name" className="name-label">Medicine name</label>
                      <input type="text" placeholder={'medicine'} value={a.name} onChange={(e) => onPrescriptionUpdate(e, i)} onBlur={(e) => onPrescriptionUpdate(e, i)} name="name" id="name" className="name" list='medicineList' />
                      <datalist id="medicineList">
                        <option value="DOLO 350"></option>
                        <option value="B complex"></option>
                        <option value="paracetamol"></option>
                      </datalist>
                      {/* <select className="prescription-name">
                <option default selected>select</option>
                <option >DOLO 350</option>
                <option >B complex</option>
                <option >paracetamol</option>
              </select> */}
                    </div>
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="dosage" className="dosage-label">Dosage</label>
                      <input type="text" value={a.dosage} placeholder={'100mg'} onBlur={(e) => onPrescriptionUpdate(e, i)} name="dosage" id="dosage" className="dosage" />
                    </div>
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="intakeRoutine" className="intakeRoutine-label">Intake routine</label>
                      <select className="prescription-name" value={a.intakeRoutine} name='intakeRoutine' onChange={(e) => onPrescriptionUpdate(e, i)}>
                        <option default selected>select</option>
                        <option ><input type='checkbox' id='1time' name='1time' /> <label htmlFor='1time'>1 time</label></option>
                        <option ><input type='checkbox' id='2times' name='2times' /> <label htmlFor='2times'>2 times</label></option>
                        <option ><input type='checkbox' id='3times' name='3times' /> <label htmlFor='3times'>3 times</label></option>
                      </select>
                    </div>
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="intakePattern" className="intakePattern-label">Intake pattern</label>
                      <select className="prescription-name" name='intakePattern' value={a.intakePattern} onChange={(e) => onPrescriptionUpdate(e, i)}>
                        <option default selected>After Meals</option>
                        <option >Before Meals</option>
                        <option >Anytime</option>
                      </select>
                    </div>
                    <div className={[styles["prescription-delete-container"]]} onClick={()=>deletePrescription(i)} >&times;</div>
                  </div>
                ))
              }
              <span className={[styles['add-new-prescription']]} onClick={() => setprescriptionDetails([...prescriptionDetails, ...[{}]])} >&#43;</span>
              <span className={[styles['space']]} ></span>
            </div>) : (<div className="patient-details">
              <div className={[styles["patientName-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="name" className="patientName-label">patient name</label>
                <input type="text" onBlur={onInputChange} name="name" id="name" className="name" />
              </div>
              <div className={[styles["patientAge-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="age" className="age-label">patient age</label>
                <input type="number" onBlur={onInputChange} name="age" id="age" className="age" />
              </div>
              <div className={[styles["patientDisease-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="disease" className="disease-label">disease</label>
                <input type="text" onBlur={onInputChange} name="disease" id="disease" className="disease" />
              </div>
              <div className={[styles["patient-number-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="contactNumber" className="contactNumber-label">contact number</label>
                <input type="number" onBlur={onInputChange} name="contactNumber" id="contactNumber" className="contactNumber" />
              </div>
              <div className={[styles["patient-appointment-date-and-submit-container"]]}>
                <div className={[styles["patientAppointmentDetails-container"]].join(" ")}>
                  <label htmlFor="appointmentDetails" className="appointmentDetails-label">appointment details</label>
                  <textarea rows={3} onBlur={onInputChange} type="text" name="appointmentDetails" id="appointmentDetails" className="appointmentDetails" />
                </div>
                <div className={[styles["patientAppointmentDate-container"], styles["patient-detail-container"]].join(" ")}>
                  <label htmlFor="appointmentDate" className="appointmentDate-label">appointment date</label>
                  <input type="date" onBlur={onInputChange} name="appointmentDate" id="appointmentDate" className="appointmentDate" />
                </div>
              </div>
              <div className="patient-prescription-container">

              </div>
            </div>)}
            <div className={styles["patient-details-submit"]} >
              <button onClick={submit} disabled={!isPriscriptionPage}>submit</button>
              <button onClick={gotoPrescriptionPage} disabled={isPriscriptionPage}>Add prescriptions</button>
            </div>
          </div>)}
      </main>
    </div>
  )
}
