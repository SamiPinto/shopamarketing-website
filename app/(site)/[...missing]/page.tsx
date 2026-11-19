import { notFound } from "next/navigation";

// With several root layouts there is no app-level layout for Next's built-in 404, so
// unmatched URLs land here and 404 inside the main site's layout (navbar + footer).
export const dynamic = "force-static";

export default function CatchAll() {
  notFound();
}
