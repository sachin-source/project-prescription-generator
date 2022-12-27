import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login Page</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className='patient-details-container' >
        <div className="patient-details">
          <div className="patient-detail-field full-screen">
            <label htmlFor="name">Name :</label>
            <input type="text" id="name" name='name' />
          </div>
          <div className="patient-detail-field half-screen">
            <label htmlFor="phone">phone :</label>
            <input type="text" id="phone" name='phone' />
            </div>
        </div>
      </main>
    </div>
  )
}
