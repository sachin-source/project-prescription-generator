import React, { useState, useEffect } from 'react'

import styles from "../styles/Navbar.module.css"

const APP_TITLE = "ERX"
function Navbar({ authorized }) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    setisLoggedIn(localStorage.getItem('user'))
  }, [])
  
  return (
    <div className={styles["navbar-container"]}>
        <div className={styles["logo-container"]}>
            <h2 >{APP_TITLE.split("").map((element, i) => (
                <span key={i}>{element}</span>
            ))}</h2>
            {/* <span className="navbar-logo-description">Tech-scription</span> */}
        </div>
        {
          isLoggedIn ? (<div className={styles["navbar-elements-container"]}>
          <div className={styles["navbar-element"]}>new</div>
          <div className={styles["navbar-element"]}>patients</div>
          <div className={styles["navbar-element"]}>prescriptions</div>
          <div className={styles["navbar-element"]}>archieves</div>
      </div>) : (<></>)
        }
        
    </div>
  )
}

export default Navbar