export default function MarkViewerBlog({ content, tailwindClass }: { content: string; tailwindClass?: string }) {
    if (!content) return null;

    return (
        <div
            className={`blogContentHTML${tailwindClass ? ` ${tailwindClass}` : ''}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
