import Link from 'next/link';
import PageHead from '../components/PageHead';

export default function Custom404() {
  return (
    <div className='page page-404'>
      <PageHead title='404 | Viet Cinema' description='Viet Cinema 404 page' />
      <main>
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link href='/'>
          <a className='button'>Return Home</a>
        </Link>
      </main>
    </div>
  );
}
