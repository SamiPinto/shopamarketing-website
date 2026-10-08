// Renders one JSON-LD <script> as a schema.org @graph.
// Pass an array of schema nodes (built with the helpers in lib/schema.ts);
// they are wrapped in a single @graph so related nodes connect by @id.

export default function JsonLd({ graph }: { graph: object[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
