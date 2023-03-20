
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
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
  useEffect(()=>{
    fetch('http://localhost:3005/patient').then((a) => a.json()).then((data) => {
      data.status && setpatientsData(data.patients)
    })
  }, [])
  return (
    // <table></table>
    <div className='patients-page-container' >
      
    { isVisitsPage ? (<></>): (<table className={styles['customers']}>
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
        <td>&#8595;</td>
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