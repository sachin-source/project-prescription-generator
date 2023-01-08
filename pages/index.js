import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login Page</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

{/* 
Patient details
	1. Patient name
	2. Age
	3. Disease / Symptoms ?
	4. Phone number
	5. Appointment details
	6. Appointment date
	7. 
*/}

      <main className='patient-details-container' >
        <div className="heading-container">
          <h2>Patient details</h2>
        </div>
        <div className="patient-details">
          <div className="patient-name-container">
            <label htmlFor="patient-name" className="patient-name-label">patient name</label>
            <input type="text" name="patient-name" id="patient-name" className="patient-name" />
          </div>
          <div className="patient-age-container">
            <label htmlFor="patient-age" className="patient-age-label">patient age</label>
            <input type="number" name="patient-age" id="patient-age" className="patient-age" />
          </div>
          <div className="patient-disease-container">
            <label htmlFor="patient-disease" className="patient-disease-label">disease</label>
            <input type="text" name="patient-disease" id="patient-disease" className="patient-disease" />
          </div>
          <div className="patient-contact-number-container">
            <label htmlFor="patient-contact-number" className="patient-contact-number-label">contact number</label>
            <input type="number" name="patient-contact-number" id="patient-contact-number" className="patient-contact-number" />
          </div>
          <div className="patient-appointment-details-container">
            <label htmlFor="patient-appointment-details" className="patient-appointment-details-label">appointment details</label>
            <input type="text" name="patient-appointment-details" id="patient-appointment-details" className="patient-appointment-details" />
          </div>
          <div className="patient-appointment-date-container">
            <label htmlFor="patient-appointment-date" className="patient-appointment-date-label">appointment date</label>
            <input type="date" name="patient-appointment-date" id="patient-appointment-date" className="patient-appointment-date" />
          </div>
          <div className="patient-details-submit">
            <button>submit</button>
          </div>
        </div>
      </main>
    </div>
  )
}
