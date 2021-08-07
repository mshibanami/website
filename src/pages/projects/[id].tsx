import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import markdownStyles from '../../styles/markdown.module.scss'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllItemIds, getItem, Item, ItemType } from '../../lib/item'

export default function Project({ item }: { item: Item }) {
  return (
    <Layout>
      <Head>
        <title>{item.title}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css"></link>
      </Head>
      <article className={markdownStyles.markdown}>
        <h1 className="text-center">{item.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = getAllItemIds(ItemType.Project)

  let paths = []
  for (const id of ids) {
    paths.push({
      params: {
        id: id
      },
    })
  }
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const item = await getItem(
    params.id as string,
    ItemType.Project)
  return {
    props: {
      item
    }
  }
}
