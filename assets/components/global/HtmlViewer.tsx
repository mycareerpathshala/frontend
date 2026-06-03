export default function HtmlViewer({ content, tailwindClass }: { content: string; tailwindClass?: string }) {
    if (!content) return null;
    return <div className={`${tailwindClass} --dynamic-markdown-content`} dangerouslySetInnerHTML={{ __html: content }} />;
}
