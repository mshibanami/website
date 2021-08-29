import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Consts from '../lib/consts'
import Layout from '../components/layout'
import generateRssFeed from '../lib/rss'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{Consts.SITE_TITLE}</title>
      </Head>
      <ContentLinks />
    </Layout>
  )
}

function ContentLinks() {
  return (
    <section className="grid grid-cols gap-5 mt-10 place-items-center">
      {
        Consts.CONTENT_SECTIONS.map((section) => {
          return (
            <Link href={section.href} passHref key={section.href}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-40">
                {section.title}
              </button>
            </Link>
          )
        })
      }
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  generateRssFeed();
  return {
    props: {}
  }
}
