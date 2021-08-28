import Head from 'next/head'
import utilStyles from '../styles/utils.module.scss'
import Navbar from './navbar'
import Consts from '../lib/consts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import GoogleAnalytics from './google-analytics'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className="flex flex-col min-h-full">
      <Head>
        <GoogleAnalytics />
        <link href="/images/favicon-196.png" rel="shortcut icon" type="image/png" />
        <link href="/images/favicon-196.png" rel="shortcut icon" sizes="196x196" />
        <link href="/images/favicon-196.png" rel="apple-touch-icon" />
        <meta
          name="description"
          content={Consts.PAGE_DESCRIPTION}
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            Consts.SITE_TITLE
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={Consts.SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {!home &&
        <header className="header-2">
          <Navbar />
        </header>
      }
      <main className="container mx-auto flex-1 max-w-3xl px-5">
        {home &&
          <div className="flex flex-col items-center mt-20">
            <HomeTopContent />
          </div>
        }
        {children}
      </main>
      <footer>
        <div className="justify-center content-center">
          <SNSLinks />
        </div>
        <p className="text-center">{Consts.COPYRIGHT}</p>
      </footer>
    </div>
  )
}

function HomeTopContent() {
  return (
    <>
      <img
        src="/images/profile.jpg"
        className="rounded-full"
        height={144}
        width={144}
        alt="Profile photo"
      />
      <h1 className="mb-2">{Consts.SITE_TITLE}</h1>
      <p className="mb-3">@{Consts.AUTHOR_ACCOUNT_ID}</p>
    </>
  )
}

function SNSLinks() {
  return (
    <div className={`${utilStyles.snsLinks}`}>
      <a href={Consts.TWITTER_URL}><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
      <a href={Consts.GITHUB_URL}><FontAwesomeIcon icon={faGithub} size="2x" /></a>
      <a href={Consts.LINKEDIN_URL}> <FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
    </div>
  )
}
