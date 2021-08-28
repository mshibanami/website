import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { TextFormat, TextToHtmlConverter } from './text-to-html-converter'

export function getSortedItems(itemType: ItemType) {
    const dir = ItemType.directoryOf(itemType)
    const fileNames = fs.readdirSync(dir)
    const allItems = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(dir, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        return {
            id,
            ...(matterResult.data as Item)
        }
    })
    return allItems.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1
    })
}

export function getAllItemIds(itemType: ItemType) {
    const fileNames = fs.readdirSync(ItemType.directoryOf(itemType))
    return fileNames.map(fileName => {
        return fileName.replace(/\.md$/, '')
    })
}

export async function getItem(id: string, itemType: ItemType): Promise<Item> {
    const postsDirectory = ItemType.directoryOf(itemType);
    const fileNames = fs.readdirSync(postsDirectory)
    const fileName = fileNames.filter((fileName) => fileName.includes(id))[0];
    const extension = fileName.split('.').at(-1);
    const fileFormat = TextFormat.fromExtension(extension);
    const fullPath = path.join(ItemType.directoryOf(itemType), `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const contentHtml = await new TextToHtmlConverter().convert(matterResult.content, fileFormat);
    return {
        id,
        contentHtml,
        fileFormat,
        ...(matterResult.data as Item)
    }

    return null;
}

export function convertTextToHtml(text: String, contentFormat: TextFormat): TextFormat {
    switch (contentFormat) {
        case TextFormat.Markdown:
            return TextFormat.Markdown;
        case TextFormat.AsciiDoc:
            return;
    }
}

export type Item = {
    id: string
    fileFormat: TextFormat
    createdAt: string
    title: string
    language: string
    contentHtml: string
    description: string
    thumbnailPath: string
}

export enum ItemType {
    BlogPost,
    Project,
}

export namespace ItemType {
    export function directoryOf(itemType: ItemType): string {
        switch (itemType) {
            case ItemType.BlogPost:
                return path.join(process.cwd(), 'blog')
            case ItemType.Project:
                return path.join(process.cwd(), 'projects')
        }
    }
}
