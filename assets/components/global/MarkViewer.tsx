import { marked } from 'marked';

export default function MarkViewer({ content, tailwindClass }: { content: string; tailwindClass?: string }) {
    if (!content) return null;
    const html = marked.parse(content);

    return <div className={`${tailwindClass} --dynamic-markdown-content`} dangerouslySetInnerHTML={{ __html: html }} />;
}
