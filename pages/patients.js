import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from "../styles/patient.module.css"
import { apiEndPoint } from '../services/http.service';

export default function Patients() {
  const [isVisitsPage, setIsVisitsPage] = useState(false);
  const [activePatientsData, setactivePatientsData] = useState([{}]);
  const [allPatientsData, setallPatientsData] = useState([{}]);
  const [activePatient, setActivePatient] = useState(undefined);
  const [visitsAndPrescriptions, setVisitsAndPrescriptions] = useState({});
  const [activeVisit, setActiveVisit] = useState(undefined);
  useEffect(()=>{
    fetch(`${apiEndPoint}patient`).then((a) => a.json()).then((data) => {
      data.status && setactivePatientsData(data.patients);
      data.status && setallPatientsData(data.patients);
      
    })
  }, []);

  const copyPatientInfo = (d) => {
    localStorage.setItem('copiedPatientInfo', JSON.stringify(d))
  }

  const backToPatientList = () => {
    setActiveVisit(undefined)
    setActivePatient(undefined)
    setVisitsAndPrescriptions({})
    setIsVisitsPage(false)
  }

  const setActivePatientDetails = (patientId="") => {
    setActivePatient(activePatientsData.find((patientData) => patientData._id == patientId));
    patientId && fetch(`${apiEndPoint}visit?patientId=` + patientId).then((a) => a.json()).then((data) => {
      setVisitsAndPrescriptions(data)
      setIsVisitsPage(true)
      setActiveVisit(data.visits[0])
    })
  }
  const filterPatient = (e) => {
    const searchText = e.target.value
    const match = new RegExp(searchText, 'i')
    // console.log(visitsAndPrescriptions)
    const filteredData = allPatientsData.filter(a => match.test(a.name) || match.test(a.contactNumber))
    setactivePatientsData(filteredData)
  }
const getIntakeRoutinegen = (intakeRoutine) => {
  const standardRoutine = ["M", "A", "N"];
  return intakeRoutine.split("").map((i, j) => {
    return { active : Boolean(+i), value : standardRoutine[j] }
  })
}

  return (
    // <table></table>
    <div className='patients-page-container' >
      <div className='breadcrumbs' > <Link href={'/'}> home </Link> {isVisitsPage ? (<span onClick={backToPatientList}> / patients </span>) : (<></>)} </div>
      <div className={styles['space-between']} >
      <h3> { isVisitsPage ? ( activePatient.name + "'s Visit List") : 'Patient List' } </h3>
      <input type='search' placeholder='Search by patient name or contact number' onBlur={filterPatient} />
      </div>
    { isVisitsPage ? (<>
      <div className={styles['visit-page-container']}>
        <div className={styles['visit-list-container']}>
          <table className={styles['custom-table']}>
            <thead>
              <tr>
                <th>Diagnosis</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
          {
            visitsAndPrescriptions.visits.map((visit, i) => (
              <tr key={i} className={visit._id == activeVisit._id ? styles.active : ''} onClick={() => setActiveVisit(visit)}>
                <td> {visit?.diagnosis} </td>
                <td>
                  { visit._id != activeVisit._id ? ( <span> {visit.appointmentDate} </span> ) : ( <strong> {visit.appointmentDate} </strong> )}
                </td>
              </tr>
              ))
            }
            </tbody>
            </table>
        </div>
        <div className={styles['prescription-details-container']} >
          <table className={styles['custom-table']}>
            <thead>
              <tr>
                <th>Sl</th>
                <th>Prescription Name</th>
                <th>Type</th>
                <th>Intake Route</th>
                <th>Dosage</th>
                <th>Intake Routine</th>
                <th>Intake Pattern</th>
              </tr>
              </thead>
              <tbody>
          {
            visitsAndPrescriptions?.prescriptions.filter((prescription) => prescription.visitId == activeVisit._id).map((prescription, i) => (
                    <tr key={i}>
                    <td>{i+1}</td>
                    <td>{prescription?.name}</td>
                    <td>{prescription?.type}</td>
                    <td>{prescription?.intakeRoute}</td>
                    <td>{prescription?.dosage}</td>
                    <td>{isNaN(prescription?.intakeRoutine) ? (prescription?.intakeRoutine) : (
                      getIntakeRoutinegen(prescription?.intakeRoutine).map((data, j) => (
                        <span key={j} className={data?.active ? styles["active-intakeRoutine"] : styles["inactive-intakeRoutine"] }>{data.value}</span>
                      ))
                    )}</td>
                    <td>{prescription?.intakePattern}</td>
                  </tr>
                  ))
                }
                </tbody>  
          </table>
        </div>
      </div>
    </>): (<table className={styles['custom-table']}>
      <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Contact</th>
        <th>visits</th>
        <th>Copy</th>
      </tr>
      </thead>
      <tbody>
      {activePatientsData.length ? (activePatientsData.filter(d => d.name).map((d, i) => (
        <tr key={i}>
        <td>{d?.name}</td>
        <td>{d?.age}</td>
        <td>{d?.gender}</td>
        <td>{d?.contactNumber}</td>
        <td className='clickable' onClick={() => setActivePatientDetails(d?._id)}>&#8595;</td>
        <td onClick={() => copyPatientInfo(d)} >copy</td>
      </tr>
      ))) : (<span>No patient found!!!</span>)}
      </tbody>
      {/* <tr>
        <td>Alfreds Futterkiste</td>
        <td>23</td>
        <td>Typhoid</td>
        <td>1231231231</td>
        <td>&times;</td>
      </tr>
      <tr>
        <td>Berglunds snabbköp</td>
        <td>23</td>
        <td>Typhoid</td>
        <td>1231231231</td>
        <td>&times;</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>23</td>
        <td>Typhoid</td>
        <td>1231231231</td>
        <td>&times;</td>
      </tr>
      <tr>
        <td>Ernst Handel</td>
        <td>23</td>
        <td>Typhoid</td>
        <td>1231231231</td>
        <td>&times;</td>
      </tr>
      <tr>
        <td>Island Trading</td>
        <td>23</td>
        <td>Typhoid</td>
        <td>1231231231</td>
        <td>&times;</td>
      </tr>
      <tr>
        <td>Königlich Essen</td>
        <td>23</td>
        <td>Typhoid</td>
        <td>1231231231</td>
        <td>&times;</td>
      </tr>
      <tr>
        <td>Laughing Bacchus Winecellars</td>
        <td>23</td>
        <td>Typhoid</td>
        <td>1231231231</td>
        <td>&times;</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>23</td>
        <td>Typhoid</td>
        <td>1231231231</td>
        <td>&times;</td>
      </tr>
      <tr>
        <td>North/South</td>
        <td>23</td>
        <td>Typhoid</td>
        <td>1231231231</td>
        <td>&times;</td>
      </tr>
      <tr>
        <td>Paris spécialités</td>
        <td>23</td>
        <td>Typhoid</td>
        <td>1231231231</td>
        <td>&times;</td>
      </tr> */}
    </table>)}
    
    </div>
  )
}