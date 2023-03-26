import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.scss'
import Link from 'next/link'
import Date from '../../components/date'
import { GetStaticProps } from 'next'
import Consts from '../../lib/consts'
import { getSortedItems, Item, ItemType } from '../../lib/item'

export default function Blog({ allItems }: { allItems: Item[] }) {
    return (
        <Layout>
            <Head>
                <title>Blog - {Consts.SITE_TITLE}</title>
            </Head>
            <h1>Blog</h1>
            <ul className={utilStyles.list}>
                {allItems.map((item) => (
                    <li className={utilStyles.listItem} key={item.id}>
                        <h3>
                            <Link href={`/blog/${item.id}`}>
                                {item.title}
                            </Link>
                        </h3>
                        <p className="dynamic-text-gray-500">
                            <Date dateString={item.createdAt} />
                        </p>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const allItems = await getSortedItems(ItemType.BlogPost)
    return {
        props: {
            allItems
        }
    }
}
