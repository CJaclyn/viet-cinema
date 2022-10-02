import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      Copyright 2022 Viet Cinema{' · '}
      <Link href='/faq'>
        <a>FAQ</a>
      </Link>
    </footer>
  );
}
