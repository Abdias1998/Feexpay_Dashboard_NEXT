import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '../features/store';
import '@fontsource/inter';
import '@fontsource/poppins';
import '@fontsource/roboto';
import '@fontsource/merriweather';
import '../styles/globals.css';
import '../styles/nprogress.css'; // Importez les styles
import NProgress from 'nprogress';
import Router from 'next/router';

// Activez NProgress lors du changement de route
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({
  // showSpinner: false, // Désactiver le spinner
  // speed: 500,         // Durée d'animation
  minimum: 0.5,       // Position minimale de démarrage
});
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp; 