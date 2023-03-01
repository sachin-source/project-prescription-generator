import Head from 'next/head'
import { useState } from 'react'

import styles from "../styles/Register.module.css"

export default function Home() {

  const [patientDetails, setpatientDetails] = useState({})
  const onInputChange = (event) => {
    console.log(event.currentTarget.name, event.currentTarget.value)

    const updatedValue = { [event.currentTarget.name]: event.currentTarget.value }
    setpatientDetails(patientInfo => ({
      ...patientInfo,
      ...updatedValue
    }))
  }

  const submit = () => {
    console.log(patientDetails)
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
        <div className={styles["patient-details-section"]}>
          <div className="heading-container">
            <h2>Patient details</h2>
          </div>
          <div className="patient-details">
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
                <textarea rows={5} onBlur={onInputChange} type="text" name="patientAppointmentDetails" id="patientAppointmentDetails" className="patientAppointmentDetails" />
              </div>
              <div className={[styles["patientAppointmentDate-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="patientAppointmentDate" className="patientAppointmentDate-label">appointment date</label>
                <input type="date" onBlur={onInputChange} name="patientAppointmentDate" id="patientAppointmentDate" className="patientAppointmentDate" />
              </div>
            </div>
            <div className="patient-prescription-container">

            </div>
            <div className={styles["patient-details-submit"]} >
              <button onClick={submit}>submit</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
