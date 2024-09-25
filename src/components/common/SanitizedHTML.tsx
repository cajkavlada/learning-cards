import sanitizeHtml from "sanitize-html";

export function SanitizedHTML({
  html,
  ...props
}: { html: string } & React.HTMLProps<HTMLDivElement>) {
  const sanitizedHTML = sanitizeHtml(html);

  return <div {...props} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
}
