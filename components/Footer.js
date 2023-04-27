import React from 'react'
import styles from "../styles/Footer.module.css"
function Footer() {
  return (
    <div className={styles.footer} style={{textAlign:'right'}} >All Rights Reserved</div>
    // <div className={styles.footer} >Created By <span className='primary' >&nbsp;Sachin M&nbsp;</span> | All Rights Reserved</div>
  )
}

export default Footer