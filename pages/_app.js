import { useRouter } from 'next/router';
import { userService } from '../services';

import { useState, useEffect } from 'react';

import "../styles/globals.css"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    setUser(userService.userValue);
    const publicPaths = ['/account/login', '/account/register'];
    const path = url.split('?')[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/account/login',
        query: { returnUrl: router.asPath }
      });
    } else if( userService.userValue && publicPaths.includes(path) ){
      router.push(router?.query?.returnUrl || '/')
      setAuthorized(true);
    } else {
      setAuthorized(true);
    }
  }

  useEffect(() => {
    authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        // router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeStart', authCheck);

        // on route change complete - run auth check 
        // router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
  }, [])

  return (
    <>
    <Navbar authorized={authorized} />
      <Component {...pageProps} />
    <Footer />
    </>
  )
}

export default MyApp
