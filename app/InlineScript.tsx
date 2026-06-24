// Runs as a real script in the server-rendered HTML (executes during parsing,
// before first paint), but renders as inert `text/plain` on the client so React
// doesn't warn about / try to render a <script> tag. Not a client component.
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
