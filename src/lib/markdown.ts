import remarkPrism from 'remark-prism'
import remarkGfm from 'remark-gfm'
import remark from 'remark'
import remarkHtml from 'remark-html'

export default async function convertMarkdownToHtml(markdownText: string): Promise<string> {
    const processedContent = await remark()
        .use(remarkHtml)
        .use(remarkPrism)
        .use(remarkGfm)
        .process(markdownText);
    return processedContent.toString();
}
