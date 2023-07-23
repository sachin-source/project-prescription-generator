import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from "../styles/Register.module.css"

export default function Home() {

  const [patientDetails, setpatientDetails] = useState({});
  const [isPriscriptionPage, setisPriscriptionPage] = useState(false);
  const [isLastPage, setisLastPage] = useState(false);
  const [isPrescriptionSubmitted, setisPrescriptionSubmitted] = useState(false);
  const [prescriptionDetails, setprescriptionDetails] = useState([{}]);
  const [patientList, setpatientList] = useState([]);

  const deletePrescription = (i) => {
    const temp = [...prescriptionDetails];
    temp.splice(i, 1);
    setprescriptionDetails(temp);
  }

  useEffect(() => {
    fetch('http://localhost:3005/patient/names', {
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
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
  const submita = () => { }

  const onPrescriptionUpdate = (e, index) => {
    // prescriptiondetails
    const temp = [...prescriptionDetails];
    temp[index] = temp[index] || {};
    temp[index][e.target.name] = e.target.value;
    setprescriptionDetails(temp)
  }
  let prescriptionListTemp = [];
  const onInputChange = (event) => {

    const updatedValue = { [event.currentTarget.name || event.currentTarget.id]: event.currentTarget.value }
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
        token: localStorage.getItem('token')
      },
      body: JSON.stringify({ ...patientDetails, prescriptionDetails: prescriptionDetails }),
    }).then((d) => {
      console.log(d)
    })
  }

  const gotoPrescriptionPage = () => {
    setisPriscriptionPage(true);
    setisLastPage(false);
  }

  const gotoLastPage = () => {
    setisLastPage(true);
    setisPriscriptionPage(false);
  }

  const onPrescriptionChange = (e, i) => {
    console.log()
  }

  String.prototype.replaceAt = function (index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
  }

  const getIntakeRoutinegen = (i) => {
    const currentRoutinegen = prescriptionDetails[i]?.intakeRoutine || "000"
    const currentRoutinegenValues = currentRoutinegen.trim().split('')
    const routineGen = ['M', 'A', 'N'];
    return currentRoutinegenValues.map((v, n) => {
      return { active: Boolean(+v), value: routineGen[n] }
    })
  }

  const intakeRoutineChange = (e, i) => {
    // console.log(e, i, e.target.innerText)
    const temp = [...prescriptionDetails];
    temp[i] = temp[i] || {};
    temp[i].intakeRoutine = temp[i].intakeRoutine || "000"
    const RoutineGen = "MAN";
    const routineIndex = RoutineGen.indexOf(e.target.innerText)
    temp[i].intakeRoutine = temp[i].intakeRoutine.replaceAt(routineIndex, !Boolean(+temp[i].intakeRoutine[routineIndex]) ? '1' : '0')
    // console.log(temp, !Boolean(+temp[i].intakeRoutine[routineIndex]) ? '1' :'0')
    setprescriptionDetails(temp)

  }

  return (
    <div>
      <Head>
        <title>Patient registration</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles["patient-details-container"]} >
        { isPrescriptionSubmitted ? (<div className='inprogress'>
          <h1>Your prescription is submitted!</h1>
          <span onClick={reset}>click to enter new prescription</span>
        </div>) : (
          <div className={styles["patient-details-section"]}>
            <div className={styles['heading-container']}>
              <span hidden={!(isPriscriptionPage || isLastPage)} >Go to :</span>
              <span onClick={() => { setisPriscriptionPage(false) }} className={styles['page-change']} hidden={!(isPriscriptionPage || isLastPage)} > Patient details </span>
              <span hidden={!isLastPage} >/</span>
              <span className={styles['page-change']} hidden={!isLastPage} onClick={gotoPrescriptionPage} > Prescription details </span>
              <h2><span >{isLastPage ? 'Follow-up and Advises' : (!isPriscriptionPage ? 'Patient details' : 'Treatement')}</span></h2>
            </div>
            {
            isPriscriptionPage ? (<div className="patient-details">
              {
                prescriptionDetails.map((a, i) => (
                  <div className={[styles["prescription-container"]]} >
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="name" className="name-label" hidden={i} >Medicine name</label>
                      <input type="text" placeholder={'medicine'} value={a.name} onChange={(e) => onPrescriptionUpdate(e, i)} onBlur={(e) => onPrescriptionUpdate(e, i)} name="name" id="name" className="name" list='medicineList' autoComplete="off" />
                      <datalist id="medicineList">
                        <option value="DOLO 350"></option>
                        <option value="B complex"></option>
                        <option value="paracetamol"></option>
                      </datalist>
                    </div>
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="type" className="type-label" hidden={i} >Type</label>
                      <select className={styles["gender-dropdown"]} id='type' name='type' onChange={(e) => onPrescriptionUpdate(e, i)} >
                        <option disabled selected>Select</option>
                        <option>TAB</option>
                        <option>INJ</option>
                        <option>SYP</option>
                        <option>ONT</option>
                      </select>
                    </div>
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="intakeRoute" className="intakeRoute-label" hidden={i} >Intake Route</label>
                      <select className={styles["gender-dropdown"]} id='intakeRoute' name='intakeRoute' onChange={(e) => onPrescriptionUpdate(e, i)} >
                        <option disabled selected>Select</option>
                        <option>Oral Head</option>
                        <option>IV</option>
                        <option>IM</option>
                      </select>
                    </div>
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="dosage" className="dosage-label" hidden={i} >Dosage</label>
                      <input type="text" value={a.dosage} placeholder={'100mg'} onBlur={(e) => onPrescriptionUpdate(e, i)} name="dosage" id="dosage" className={styles.dosage} autoComplete="off" />
                    </div>
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="intakeRoutine" className="intakeRoutine-label" hidden={i} >Intake Routine</label>
                      <div className={[styles["intakeRoutineContainer"]]}>
                        {
                          getIntakeRoutinegen(i).map((data, j) => (
                            <span className={data?.active ? styles["active-intakeRoutine"] : styles["inactive-intakeRoutine"]} onClick={(e) => intakeRoutineChange(e, i)}>{data.value}</span>
                          ))
                        }
                      </div>
                    </div>
                    <div className={[styles["prescription-detail-container"]]} >
                      <label htmlFor="intakePattern" className="intakePattern-label" hidden={i} >Intake Pattern</label>
                      <select className="prescription-name" name='intakePattern' value={a.intakePattern} onChange={(e) => onPrescriptionUpdate(e, i)}>
                        <option default selected>After Meals</option>
                        <option >Before Meals</option>
                        <option >Anytime</option>
                      </select>
                    </div>
                    <div className={[styles["prescription-delete-container"]]} onClick={() => deletePrescription(i)} >&times;</div>
                  </div>
                ))
              }
              <span className={[styles['add-new-prescription']]} onClick={() => setprescriptionDetails([...prescriptionDetails, ...[{}]])} >&#43;</span>
              <span className={[styles['space']]} ></span>
            </div>) : ( isLastPage ? (<div className={styles['last-page']} >
              <div className={styles['follow-up-container']} >
                <label className='' >Follow up</label>
                <textarea rows={6} onBlur={onInputChange} name="followup" id="followup" />
              </div>
              <div className={styles['advises-container']} >
                <label className='' >Advises</label>
                <textarea rows={6} onBlur={onInputChange} name="advises" id="advises" />
              </div>
            </div>) : (<div className="patient-details">
              <div className={[styles["patientName-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="name" className="patientName-label">Patient name</label>
                <input type="text" onBlur={onInputChange} name="name" id="name" className="name" autoComplete="off" list='patientList' />
                <datalist id="patientList">
                  {patientList?.map((p, i) => <option key={i} value={p.name} ></option>)}
                </datalist>
              </div>
              <div className={[styles["patientAge-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="age" className="age-label">Patient age and Gender</label>
                <div className={styles["two-col"]} >
                  <input type="number" onBlur={onInputChange} name="age" id="age" className="age" autoComplete="off" />
                  <select className={styles["gender-dropdown"]} >
                    <option disabled selected>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </div>
              </div>
              <div className={[styles["patientDisease-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="diagnosis" className="disease-label">Diagnosis</label>
                <input type="text" onBlur={onInputChange} name="diagnosis" id="diagnosis" className="disease" autoComplete="off" />
              </div>
              <div className={[styles["patientemail-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="email" className="email-label">Email</label>
                <input type="email" onBlur={onInputChange} name="email" id="email" className="email" autoComplete="off" />
              </div>
              <div className={[styles["patient-number-container"], styles["patient-detail-container"]].join(" ")}>
                <label htmlFor="contactNumber" className="contactNumber-label">Contact number</label>
                <input type="number" onBlur={onInputChange} name="contactNumber" id="contactNumber" className="contactNumber" list='contactList' autoComplete="off" />
                <datalist id="contactList">
                  {patientList?.map((p, i) => <option key={i} value={p.contactNumber} ></option>)}
                </datalist>
              </div>
              <div className={[styles["patient-appointment-date-and-submit-container"]]}>
                <div className={[styles["patientAppointmentDetails-container"]].join(" ")}>
                  <label htmlFor="patientComplaint" className="appointmentDetails-label">Patient complaint</label>
                  <textarea rows={4} onBlur={onInputChange} type="text" name="patientComplaint" id="patientComplaint" className="appointmentDetails" />
                </div>
                <div className={styles['three-row']} >
                <div className={[styles["patientAppointmentDate-container"], styles["patient-detail-container"]].join(" ")}>
                  <label htmlFor="appointmentDate" className="appointmentDate-label">Appointment date</label>
                  <input type="date" onBlur={onInputChange} name="appointmentDate" id="appointmentDate" className="appointmentDate" />
                </div>
                <div className={[styles["patientBP-Temparature-container"], styles["patient-detail-container"]].join(" ")}>
                  <label className="BP-Temparature-label">BP and Temparature</label>
                  <div className={styles['bp-temparature']} >
                  <input type="text" onBlur={onInputChange} name="bp" id="bp" className="bp" placeholder='BP' />
                  <input type="text" onBlur={onInputChange} name="temparature" id="temparature" className="temparature" placeholder='temparature' />
                  </div>
                </div>
                </div>
              </div>
              <div className="patient-prescription-container">

              </div>
            </div>) )
            }
            <div className={styles["patient-details-submit"]} >
              {/* <button onClick={gotoPrescriptionPage} disabled={isPriscriptionPage}>Add prescriptions</button>
              <button onClick={gotoLastPage} disabled={isLastPage}>Go to last page</button> */}
              <button onClick={submit} >submit</button>
              <button onClick={isPriscriptionPage ? gotoLastPage : gotoPrescriptionPage } disabled={isLastPage} >Next</button>
            </div>
          </div>)}
      </main>
    </div>
  )
}
