import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from "../styles/patient.module.css"

const dummyData = [
  { name : "Alfreds Futterkiste", age : "23", disease : "Typhoid", contact : "1231231231" },
  { name : "Berglunds snabbköp", age : "23", disease : "Typhoid", contact : "1231231231" },
  { name : "Centro comercial Moctezuma", age : "23", disease : "Typhoid", contact : "1231231231" },
  { name : "Ernst Handel", age : "23", disease : "Typhoid", contact : "1231231231" },
  { name : "Island Trading", age : "23", disease : "Typhoid", contact : "1231231231" },
  { name : "Königlich Essen", age : "23", disease : "Typhoid", contact : "1231231231" },
  { name : "Laughing Bacchus Winecellars", age : "23", disease : "Typhoid", contact : "1231231231" },
  { name : "Magazzini Alimentari Riuniti", age : "23", disease : "Typhoid", contact : "1231231231" },
  { name : "North/South", age : "23", disease : "Typhoid", contact : "1231231231" },
  { name : "Paris spécialités", age : "23", disease : "Typhoid", contact : "1231231231" },
];

export default function Patients() {
  const [isVisitsPage, setIsVisitsPage] = useState(false);
  const [patientsData, setpatientsData] = useState([{}]);
  const [activePatient, setActivePatient] = useState(undefined);
  const [visitsAndPrescriptions, setVisitsAndPrescriptions] = useState({});
  const [activeVisit, setActiveVisit] = useState(undefined);
  useEffect(()=>{
    fetch('http://localhost:3005/patient').then((a) => a.json()).then((data) => {
      data.status && setpatientsData(data.patients)
    })
  }, []);

  const backToPatientList = () => {
    setActiveVisit(undefined)
    setActivePatient(undefined)
    setVisitsAndPrescriptions({})
    setIsVisitsPage(false)
  }

  const setActivePatientDetails = (patientId="") => {
    setActivePatient(patientsData.find((patientData) => patientData._id == patientId));
    patientId && fetch('http://localhost:3005/visit?patientId=' + patientId).then((a) => a.json()).then((data) => {
      setVisitsAndPrescriptions(data)
      setIsVisitsPage(true)
      setActiveVisit(data.visits[0])
    })
  }
  return (
    // <table></table>
    <div className='patients-page-container' >
      <div className='breadcrumbs' > <Link href={'/'}> home </Link> {isVisitsPage ? (<span onClick={backToPatientList}> / patients </span>) : (<></>)} </div>
      <h3> { isVisitsPage ? ( activePatient.name + "'s Visit List") : 'Patient List' } </h3>
    { isVisitsPage ? (<>
      <div className={styles['visit-page-container']}>
        <div className={styles['visit-list-container']}>
          <table className={styles['custom-table']}>
            <thead>
              <tr>
                <th>Visit</th>
              </tr>
            </thead>
            <tbody>
          {
            visitsAndPrescriptions.visits.map((visit, i) => (
              <tr className={visit._id == activeVisit._id ? styles.active : ''} onClick={() => setActiveVisit(visit)}>
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
                    <td>{prescription?.dosage}</td>
                    <td>{prescription?.intakeRoutine}</td>
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
        <th>Disease</th>
        <th>Contact</th>
        <th>visits</th>
      </tr>
      </thead>
      <tbody>
      {patientsData.map((d, i) => (
        <tr key={i}>
        <td>{d?.name}</td>
        <td>{d?.age}</td>
        <td>{d?.disease}</td>
        <td>{d?.contactNumber}</td>
        <td className='clickable' onClick={() => setActivePatientDetails(d?._id)}>&#8595;</td>
      </tr>
      ))}
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