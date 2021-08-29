import Consts from "./consts";
import { getSortedItems, ItemType } from './item';
import { Feed } from 'feed'
import fs from 'fs'

async function generateRssFeed() {
    if (process.env.NODE_ENV === 'development') {
        return;
    }
    const maxNumberOfFeedItems = 20;
    const baseUrl = Consts.BASE_URL;
    const date = new Date();
    const author = {
        name: Consts.AUTHOR_NAME,
        email: Consts.AUTHOR_EMAIL,
        link: Consts.TWITTER_URL,
    };

    const feed = new Feed({
        title: Consts.AUTHOR_NAME,
        description: Consts.PAGE_DESCRIPTION,
        id: baseUrl,
        link: baseUrl,
        copyright: Consts.COPYRIGHT,
        updated: date,
        feedLinks: {
            atom: baseUrl + '/updates.atom'
        },
        author
    });

    const blogPosts = await getSortedItems(ItemType.BlogPost);
    const projects = await getSortedItems(ItemType.Project);
    const items = blogPosts
        .concat(projects)
        .sort((a, b) => {
            return a.createdAt < b.createdAt ? 1 : -1
        })
        .slice(0, maxNumberOfFeedItems);

    for (const item of items) {
        const url = baseUrl + '/' + item.outputPath;
        feed.addItem({
            title: item.title,
            id: url,
            link: url,
            description: item.description,
            content: item.contentHtml,
            date: new Date(item.createdAt)
        });
    }

    fs.writeFileSync('./public/updates.atom', feed.atom1());
}

export default generateRssFeed;
