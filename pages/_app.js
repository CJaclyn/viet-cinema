import '../styles/globals.css';
import '../styles/nav.css';
import '../styles/footer.css';
import '../styles/card.css';
import '../styles/home.css';
import '../styles/movies.css';
import '../styles/movie.css';
import '../styles/infoBox.css';
import '../styles/infoBoxImage.css';
import '../styles/links.css';
import '../styles/search.css';
import '../styles/watchlist.css';
import Nav from '../components/Nav';
import Footer from '../Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      disable: 'mobile',
      //once: true
    });
    AOS.refresh();
  });

  return (
    <>
        <Nav />
        <Component {...pageProps} />
        <Footer />
    </>
  );
}

export default MyApp;
