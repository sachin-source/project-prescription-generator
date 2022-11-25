import React from 'react'

import styles from "../styles/Navbar.module.css"

const APP_TITLE = "ERX"
function Navbar() {
  return (
    <div className={styles["navbar-container"]}>
        <div className={styles["logo-container"]}>
            <h2 >{APP_TITLE.split("").map((element) => (
                <span>{element}</span>
            ))}</h2>
            <span className="navbar-logo-description">Tech-scription</span>
        </div>
        <div className={styles["navbar-elements-container"]}>
            <div className="navbar-element">new</div>
            <div className="navbar-element">patients</div>
            <div className="navbar-element">prescriptions</div>
            <div className="navbar-element">archieves</div>
        </div>
    </div>
  )
}

export default Navbar