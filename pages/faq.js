import FaqCard from '../components/FaqCard';
import PageHead from '../components/PageHead';

export default function faq() {
  return (
    <div className='page'>
      <PageHead title='FAQ | Viet Cinema' description='Viet Cinema FAQ' />
      <main>
        <h1>FAQ</h1>
        <FaqCard
          faqLabel='Are there English subs?'
          faqContent='A lot of the movies have English subs. English subs are less common 
            with shows.'
        />
        <FaqCard
          faqLabel='Why aren&lsquo;t there a lot of shows and movies listed?'
          faqContent='Because this website is only ran by one person, I only include shows 
            and movies are worth adding.'
        />
        <FaqCard
          faqLabel='Why did my watchlist disappear?'
          faqContent='Your watchlist is stored on the local storage of your browser. 
            If you clear the local storage, you&lsquo;ll delete your watchlist. Because
            your watchlist is saved on the local storage of your browser, if you switch 
            browsers, your watchlist won&lsquo;t transfer over.'
        />
        <FaqCard
          faqLabel='Why are there no links on some shows and movies?'
          faqContent='Because there are no legal/safe websites streaming that show or movie.'
        />
        <FaqCard
          faqLabel='Why is there Chinese on here? Isn&lsquo;t this a Vietnamese website?'
          faqContent='It isn&lsquo;t Chinese. It is Vietnamese chữ Nôm and some Hán từ for 
            Sino-Vietnamese words.'
        />
        <h2>Other Information</h2>
        <ul>
          <li>
            Most of the Netflix links are from Netflix Vietnam. You have to use
            a VPN to watch those movies.
          </li>
          <li>
            Tubi, Viki, Roku, and Pops are free and legal streaming websites.
          </li>
          <li>
            VieOn is region locked to Vietnam. Watching movies or shows on there
            require a VPN.
          </li>
        </ul>
      </main>
    </div>
  );
}
