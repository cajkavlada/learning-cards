import DOMPurify from "dompurify";

export function SanitizedHTML({
  html,
  ...props
}: { html: string } & React.HTMLProps<HTMLDivElement>) {
  const sanitizedHTML = DOMPurify.sanitize(html);

  return <div {...props} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
}
