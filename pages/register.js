import Head from 'next/head'
import { useState } from 'react'
import styles from "../styles/Register.module.css"

export default function Home() {

  const [patientDetails, setpatientDetails] = useState({});
  const [isPriscriptionPage, setisPriscriptionPage] = useState(false);
  const [isPrescriptionSubmitted, setisPrescriptionSubmitted] = useState(false);
  const [prescriptionList, setprescriptionList] = useState([1]);
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
    console.log(patientDetails)
    setisPrescriptionSubmitted(true)
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
            <h2 onClick={() => {setisPriscriptionPage(false)}}>Patient details</h2>
          </div>
          {isPriscriptionPage ? (<div className="patient-details">
            {/* {prescriptionListTemp} */}
            {
              prescriptionList.map((a, i) => (
                <div className={[styles["prescription-container"]]} >
            <div className={[styles["prescription-detail-container"]]} >
              <label htmlFor="patientName" className="patientName-label">Medicine name</label>
              <select className="prescription-name">
                <option default selected>select</option>
                <option >DOLO 350</option>
                <option >B complex</option>
                <option >paracetamol</option>
              </select>
            </div>
            <div className={[styles["prescription-detail-container"]]} >
              <label htmlFor="patientName" className="patientName-label">Dosage</label>
              <input type="text" placeholder={'100mg'} onBlur={onInputChange} name="patientName" id="patientName" className="patientName" />
            </div>
            <div className={[styles["prescription-detail-container"]]} >
              <label htmlFor="patientName" className="patientName-label">Intake routine</label>
              <select className="prescription-name">
                <option default selected>select</option>
                <option ><input type='checkbox' id='1time' name='1time'/> <label htmlFor='1time'>1 time</label></option>
                <option ><input type='checkbox' id='2times' name='2times'/> <label htmlFor='2times'>2 times</label></option>
                <option ><input type='checkbox' id='3times' name='3times'/> <label htmlFor='3times'>3 times</label></option>
              </select>
            </div>
            <div className={[styles["prescription-detail-container"]]} >
              <label htmlFor="patientName" className="patientName-label">Intake pattern</label>
              <select className="prescription-name">
                <option >Before Meals</option>
                <option default>After Meals</option>
                <option >Anytime</option>
              </select>
            </div>
            </div>
              ))
            }
            {/* <div className={[styles["prescription-container"]]} >
            <div className={[styles["prescription-detail-container"]]} >
              <label htmlFor="patientName" className="patientName-label">Medicine name</label>
              <select className="prescription-name">
                <option default selected>select</option>
                <option >DOLO 350</option>
                <option >B complex</option>
                <option >paracetamol</option>
              </select>
            </div>
            <div className={[styles["prescription-detail-container"]]} >
              <label htmlFor="patientName" className="patientName-label">Dosage</label>
              <input type="text" placeholder={'100mg'} onBlur={onInputChange} name="patientName" id="patientName" className="patientName" />
            </div>
            <div className={[styles["prescription-detail-container"]]} >
              <label htmlFor="patientName" className="patientName-label">Intake routine</label>
              <select className="prescription-name">
                <option default selected>select</option>
                <option ><input type='checkbox' id='1time' name='1time'/> <label htmlFor='1time'>1 time</label></option>
                <option ><input type='checkbox' id='2times' name='2times'/> <label htmlFor='2times'>2 times</label></option>
                <option ><input type='checkbox' id='3times' name='3times'/> <label htmlFor='3times'>3 times</label></option>
              </select>
            </div>
            <div className={[styles["prescription-detail-container"]]} >
              <label htmlFor="patientName" className="patientName-label">Intake pattern</label>
              <select className="prescription-name">
                <option >Before Meals</option>
                <option default>After Meals</option>
                <option >Anytime</option>
              </select>
            </div>
            </div> */}
            <span className={[styles['add-new-prescription']]} onClick={() => setprescriptionList([...prescriptionList, ...[1]])} >+</span>
            <span className={[styles['space']]} ></span>
          </div>) : (<div className="patient-details">
            <div className={[styles["patientName-container"], styles["patient-detail-container"]].join(" ")}>
              <label htmlFor="patientName" className="patientName-label">patient name</label>
              <input type="text" onBlur={onInputChange} name="patientName" id="patientName" className="patientName" />
            </div>
            <div className={[styles["patientAge-container"], styles["patient-detail-container"]].join(" ")}>
              <label htmlFor="patientAge" className="patientAge-label">patient age</label>
              <input type="number" onBlur={onInputChange} name="patientAge" id="patientAge" className="patientAge" />
            </div>
            <div className={[styles["patientDisease-container"], styles["patient-detail-container"]].join(" ")}>
              <label htmlFor="patientDisease" className="patientDisease-label">disease</label>
              <input type="text" onBlur={onInputChange} name="patientDisease" id="patientDisease" className="patientDisease" />
            </div>
            <div className={[styles["patient-number-container"], styles["patient-detail-container"]].join(" ")}>
              <label htmlFor="patientContactNumber" className="patientContactNumber-label">contact number</label>
              <input type="number" onBlur={onInputChange} name="patientContactNumber" id="patientContactNumber" className="patientContactNumber" />
            </div>
            <div className={[styles["patient-appointment-date-and-submit-container"]]}>
              <div className={[styles["patientAppointmentDetails-container"]].join(" ")}>
                <label htmlFor="patientAppointmentDetails" className="patientAppointmentDetails-label">appointment details</label>
                <textarea rows={3} onBlur={onInputChange} type="text" name="patientAppointmentDetails" id="patientAppointmentDetails" className="patientAppointmentDetails" />
              </div>
              <div className={[styles["patientAppointmentDate-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="patientAppointmentDate" className="patientAppointmentDate-label">appointment date</label>
                <input type="date" onBlur={onInputChange} name="patientAppointmentDate" id="patientAppointmentDate" className="patientAppointmentDate" />
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
