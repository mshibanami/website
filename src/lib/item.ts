import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { TextFormat, TextToHtmlConverter } from './text-to-html-converter'

const fileExtensionRegex = /\.[0-9a-z]+$/;

export async function getSortedItems(itemType: ItemType): Promise<Item[]> {
    const dir = ItemType.fileDirectoryOf(itemType)
    const fileNames = fs.readdirSync(dir)
    const allItems = await Promise.all(fileNames.map(async fileName => {
        const id = fileName.replace(fileExtensionRegex, '')
        return await getItem(id, itemType)
    }))
    return allItems.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1
    })
}

export function getAllItemIds(itemType: ItemType) {
    const fileNames = fs.readdirSync(ItemType.fileDirectoryOf(itemType))
    return fileNames.map(fileName => {
        return fileName.replace(fileExtensionRegex, '')
    })
}

export async function getItem(id: string, itemType: ItemType): Promise<Item> {
    const postsDirectory = ItemType.fileDirectoryOf(itemType);
    const fileNames = fs.readdirSync(postsDirectory)
    const fileName = fileNames.filter((fileName) => fileName.includes(id))[0];
    const extension = fileName.split('.').at(-1);
    const textFormat = TextFormat.fromExtension(extension);
    const sourceFilePath = path.join(ItemType.fileDirectoryOf(itemType), fileName)
    const outputPath = ItemType.outputPathOf(itemType) + '/' + id;
    const fileContent = fs.readFileSync(sourceFilePath, 'utf8')
    const matterResult = matter(fileContent)
    const contentHtml = await new TextToHtmlConverter().convert(matterResult.content, textFormat);
    return {
        id,
        contentHtml,
        textFormat,
        sourceFileAbsolutePath: sourceFilePath,
        outputPath,
        ...(matterResult.data as Item)
    }
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
    sourceFileAbsolutePath: string
    outputPath: string
    textFormat: TextFormat
    createdAt: string
    title: string
    language: string
    contentHtml: string
    description: string
    thumbnailPath: string
    redirectDestination: string
}

export enum ItemType {
    BlogPost,
    Project,
}

export namespace ItemType {
    export function fileDirectoryOf(itemType: ItemType): string {
        return path.join(process.cwd(), outputPathOf(itemType))
    }

    export function outputPathOf(itemType: ItemType): string {
        switch (itemType) {
            case ItemType.BlogPost:
                return 'blog'
            case ItemType.Project:
                return 'projects'
        }
    }
}
