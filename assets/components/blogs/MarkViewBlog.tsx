export default function MarkViewerBlog({ content, tailwindClass }: { content: string; tailwindClass?: string }) {
    if (!content) return null;

    // Wrap bare <table> elements in a scroll container so we get overflow + rounded corners.
    // CKEditor wraps in <figure class="table">, TipTap outputs bare <table>.
    const processed = content
        .replace(/(<table[\s>])/g, '<div class="blog-table-scroll">$1')
        .replace(/<\/table>/g, '</table></div>');

    return (
        <div
            className={`blogContentHTML${tailwindClass ? ` ${tailwindClass}` : ''}`}
            dangerouslySetInnerHTML={{ __html: processed }}
        />
    );
}
