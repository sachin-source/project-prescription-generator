
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import styles from "../styles/patient.module.css"



export default function Patients() {
  const [isVisitsPage, setIsVisitsPage] = useState(false);
  // useEffect(()=>{
  //   setIsVisitsPage(false);
  // }, [])
  return (
    // <table></table>
    <div className='patients-page-container' >
      
    { isVisitsPage ? (<span>dosage</span>): (<table className={styles['customers']}>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Disease</th>
        <th>Contact</th>
        <th>Prescriptions</th>
      </tr>
      <tr>
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
      </tr>
    </table>)}
    
    </div>
  )
}