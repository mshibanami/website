import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.scss'
import { getSortedItems, Item, ItemType } from '../../lib/item'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Consts from '../../lib/consts'

export default function Projects({ allItems }: { allItems: Item[] }) {
    return (
        <Layout>
            <Head>
                <title>Projects - {Consts.SITE_TITLE}</title>
            </Head>
            <h1>Projects</h1>
            <div className="flex flex-col gap-10">
                {allItems.map((item) => (
                    <ProjectTile item={item} key={item.id} />
                ))}
            </div>
        </Layout >
    )
}

function ProjectTile({ item }: { item: Item }) {
    return (
        <Link href={`/projects/${item.id}`}>
            <a className="hover:no-underline">
                <div className={`${utilStyles.tileColor} p-5 rounded-2xl light:shadow-2xl flex flex-col sm:flex-row gap-5`}>
                    <img
                        className="dynamic-bg-gray-500 rounded-xl bg-center object-cover h-auto w-auto min-w-0"
                        src={item.thumbnailPath}
                        width={240}
                        height={176}
                        alt="Thumbnail" />
                    <div className="flex flex-1 flex-col gap-5 p-1 justify-center">
                        <h2 className="my-0">
                            {item.title}
                        </h2>
                        <p className="dynamic-text-gray-600 text-sm text-base line-clamp-3">
                            {item.description}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const allItems = getSortedItems(ItemType.Project)
    return {
        props: {
            allItems: allItems
        }
    }
}
