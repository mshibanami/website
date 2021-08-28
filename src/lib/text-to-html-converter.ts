import remarkPrism from 'remark-prism'
import remarkGfm from 'remark-gfm'
import remark from 'remark'
import remarkHtml from 'remark-html'
import Asciidoctor from 'asciidoctor'


export class TextToHtmlConverter {
    async convert(text: string, textFormat: TextFormat): Promise<string> {
        switch (textFormat) {
            case TextFormat.Markdown:
                return await this.convertMarkdown(text);
            case TextFormat.AsciiDoc:
                return this.convertAsciiDoc(text);
        }
    }

    async convertMarkdown(text: string): Promise<string> {
        const processedContent = await remark()
            .use(remarkHtml)
            .use(remarkPrism)
            .use(remarkGfm)
            .process(text);
        return processedContent.toString();
    }

    convertAsciiDoc(text: string): string {
        const asciidoctor = Asciidoctor();
        const html = asciidoctor.convert(text);
        return html.toString();
    }
}

export enum TextFormat {
    Markdown,
    AsciiDoc,
}

export namespace TextFormat {
    export function fromExtension(extension: String): TextFormat {
        switch (extension) {
            case 'md':
            case 'markdown':
                return TextFormat.Markdown;
            case 'asciidoc':
            case 'adoc':
                return TextFormat.AsciiDoc;
        }
    }
}
