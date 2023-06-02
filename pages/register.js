import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from "../styles/Register.module.css"

export default function Home() {

  const [patientDetails, setpatientDetails] = useState({});
  const [isPriscriptionPage, setisPriscriptionPage] = useState(false);
  const [isPrescriptionSubmitted, setisPrescriptionSubmitted] = useState(false);
  const [prescriptionDetails, setprescriptionDetails] = useState([{}]);
  const [patientList, setpatientList] = useState([]);
  // const [intakeRoutine, setIntakeRoutine] = useState(undefined)

  const deletePrescription = (i) => {
    const temp = [...prescriptionDetails];
    temp.splice(i, 1);
    setprescriptionDetails(temp);
  }
  
  useEffect(()=>{
    fetch('http://localhost:3005/patient/names', {
      headers: {
        'Content-Type': 'application/json',
        token : localStorage.getItem('token')
      },
    }).then((d) => d.json())
    .then((d) => {
      setpatientList(d?.names)
    })
  }, [])

  const reset = () => {
    setpatientDetails({});
    setisPriscriptionPage(false);
    setisPrescriptionSubmitted(false);
    setprescriptionDetails([{}])
  }
  const submita = () => {}

  const onPrescriptionUpdate = (e, index) => {
    // prescriptiondetails
    const temp = [...prescriptionDetails];
    temp[index] = temp[index] || {};
    temp[index][e.target.name] = e.target.value;
    setprescriptionDetails(temp)
  }
  let prescriptionListTemp = [];
  const onInputChange = (event) => {

    const updatedValue = { [event.currentTarget.name]: event.currentTarget.value }
    setpatientDetails(patientInfo => ({
      ...patientInfo,
      ...updatedValue
    }))
  }

  const [prescriptions, setprescriptions] = useState([]);

  const submit = () => {
    setisPrescriptionSubmitted(true)

    fetch('http://localhost:3005/prescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token : localStorage.getItem('token')
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

  String.prototype.replaceAt=function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}

const getIntakeRoutinegen = (i) => {
  const currentRoutinegen = prescriptionDetails[i]?.intakeRoutine || "000"
  const currentRoutinegenValues = currentRoutinegen.trim().split('')
  const routineGen = ['M', 'A', 'N'];
  return currentRoutinegenValues.map((v, n) => {
    return { active : Boolean(+v), value : routineGen[n] }
  })
}

  const intakeRoutineChange = (e, i) => {
    // console.log(e, i, e.target.innerText)
    const temp = [...prescriptionDetails];
    temp[i] = temp[i] || {};
    temp[i].intakeRoutine = temp[i].intakeRoutine || "000"
    const RoutineGen = "MAN";
    const routineIndex = RoutineGen.indexOf(e.target.innerText)
    temp[i].intakeRoutine = temp[i].intakeRoutine.replaceAt(routineIndex, !Boolean(+temp[i].intakeRoutine[routineIndex]) ? '1' :'0' )
    // console.log(temp, !Boolean(+temp[i].intakeRoutine[routineIndex]) ? '1' :'0')
    setprescriptionDetails(temp)

  }

  return (
    <div>
      <Head>
        <title>Patient registration</title>
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
        {isPrescriptionSubmitted ? (<div  className='inprogress'>
          <h1>Your prescription is submitted!</h1>
          <span onClick={reset}>click to enter new prescription</span>
        </div>) : (
          <div className={styles["patient-details-section"]}>
            <div className="heading-container">
              <h2><span onClick={() => { setisPriscriptionPage(false) }}>Patient details</span></h2>
            </div>
            {isPriscriptionPage ? (<div className="patient-details">
              {/* {prescriptionListTemp} */}
              {
                prescriptionDetails.map((a, i) => (
                  <div className={[styles["prescription-container"]]} >
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="name" className="name-label">Medicine name</label>
                      <input type="text" placeholder={'medicine'} value={a.name} onChange={(e) => onPrescriptionUpdate(e, i)} onBlur={(e) => onPrescriptionUpdate(e, i)} name="name" id="name" className="name" list='medicineList' autoComplete="off" />
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
                      <input type="text" value={a.dosage} placeholder={'100mg'} onBlur={(e) => onPrescriptionUpdate(e, i)} name="dosage" id="dosage" className="dosage" autoComplete="off" />
                    </div>
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="intakeRoutine" className="intakeRoutine-label">Intake routine</label>
                      {/* <select className="prescription-name" value={a.intakeRoutine} name='intakeRoutine' onChange={(e) => onPrescriptionUpdate(e, i)}>
                        <option default selected>select</option>
                        <option ><input type='checkbox' id='1time' name='1time' /> <label htmlFor='1time'>1 time</label></option>
                        <option ><input type='checkbox' id='2times' name='2times' /> <label htmlFor='2times'>2 times</label></option>
                        <option ><input type='checkbox' id='3times' name='3times' /> <label htmlFor='3times'>3 times</label></option>
                      </select> */}
                      <div className={[styles["intakeRoutineContainer"]]}>
                        {/* <span onClick={(e) => intakeRoutineChange(e, i)} className='sdf' >M</span>
                        <span onClick={(e) => intakeRoutineChange(e, i)}>N</span> */}
                        {
                          getIntakeRoutinegen(i).map((data, j) => (
                            <span className={data?.active ? styles["active-intakeRoutine"] : styles["inactive-intakeRoutine"] } onClick={(e) => intakeRoutineChange(e, i)}>{data.value}</span>
                          ))
                        }
                      </div>
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
                <input type="text" onBlur={onInputChange} name="name" id="name" className="name" autoComplete="off" list='patientList' />
                <datalist id="patientList">
                        {patientList?.map((p, i) => <option key={i} value={p.name} ></option>)}
                      </datalist>
              </div>
              <div className={[styles["patientAge-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="age" className="age-label">patient age</label>
                <input type="number" onBlur={onInputChange} name="age" id="age" className="age" autoComplete="off" />
              </div>
              <div className={[styles["patientDisease-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="disease" className="disease-label">disease</label>
                <input type="text" onBlur={onInputChange} name="disease" id="disease" className="disease" autoComplete="off" />
              </div>
              <div className={[styles["patient-number-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="contactNumber" className="contactNumber-label">contact number</label>
                <input type="number" onBlur={onInputChange} name="contactNumber" id="contactNumber" className="contactNumber" autoComplete="off" />
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
