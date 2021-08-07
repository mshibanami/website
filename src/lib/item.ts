import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import convertMarkdownToHtml from './markdown'

function directory(itemType: ItemType) {
    switch (itemType) {
        case ItemType.BlogPost:
            return path.join(process.cwd(), 'blog')
        case ItemType.Project:
            return path.join(process.cwd(), 'projects')
    }
}

export function getSortedItems(itemType: ItemType) {
    const dir = directory(itemType)
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
    const fileNames = fs.readdirSync(directory(itemType))
    return fileNames.map(fileName => {
        return fileName.replace(/\.md$/, '')
    })
}

export async function getItem(id: string, itemType: ItemType) {
    const fullPath = path.join(directory(itemType), `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const contentHtml = await convertMarkdownToHtml(matterResult.content)
    return {
        id,
        contentHtml,
        ...(matterResult.data as Item)
    }
}

export type Item = {
    id: string
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
