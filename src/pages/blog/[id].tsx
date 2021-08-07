import Layout from '../../components/layout'
import { getAllItemIds, getItem, Item, ItemType } from '../../lib/item'
import Head from 'next/head'
import Date from '../../components/date'
import markdownStyles from '../../styles/markdown.module.scss'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function BlogPost({ item }: { item: Item }) {
  return (
    <Layout>
      <Head>
        <title>{item.title}</title>
      </Head>
      <article className={markdownStyles.markdown}>
        <h1>{item.title}</h1>
        <div className="dynamic-text-gray-500">
          <Date dateString={item.createdAt} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = getAllItemIds(ItemType.BlogPost)

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
    ItemType.BlogPost)
  return {
    props: {
      item
    }
  }
}
