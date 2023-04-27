import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import styles from "../styles/Navbar.module.css"

const APP_TITLE = "ERX"
function Navbar({ authorized }) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    setisLoggedIn(localStorage.getItem('user'))
  }, [authorized])

  const logout = () => {
    localStorage.clear();
    location.replace('/account/login')
  }
  
  return (
    <div className={styles["navbar-container"]}>
        <div className={styles["logo-container"]}>
            <Link href="/">
            <h2 >{APP_TITLE.split("").map((element, i) => (
                <span key={i}>{element}</span>
            ))}</h2></Link>
            {/* <span className="navbar-logo-description">Tech-scription</span> */}
        </div>
        {
          isLoggedIn ? (<div className={styles["navbar-elements-container"]}>
          <div className={styles["navbar-element"]}>
            <Link href="/register" >new</Link>
          </div>
          <div className={styles["navbar-element"]}>
            <Link href="/patients" >patients</Link>
          </div>
          <div className={styles["navbar-element"]}>
            <Link href="/prescriptions" >prescriptions</Link>
          </div>
          <div className={styles["navbar-element"]}>
            <span style={{cursor:'pointer'}} onClick={logout} >logout</span>
          </div>
      </div>) : (<></>)
        }
        
    </div>
  )
}

export default Navbar