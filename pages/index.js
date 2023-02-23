import Head from 'next/head'
import { useState } from 'react'

import styles from "../styles/Index.module.css"

export default function Home() {

  const [patientDetails, setpatientDetails] = useState({})
  const onInputChange = (event) => {
    console.log(event.currentTarget.name, event.currentTarget.value)

    const updatedValue = { [event.currentTarget.name] : event.currentTarget.value }
    setpatientDetails(patientInfo => ({
      ...patientInfo,
      ...updatedValue
    }))
  }

  const submit = () => {
    console.log(patientDetails)
  }

  return (
    <>
    default page
    </>
  )
}
