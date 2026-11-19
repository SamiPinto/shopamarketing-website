import Image from "next/image";
import Link from "next/link";
import { ThankYouBody } from "./ThankYouBody";

export function ThankYouPage() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-night text-white">
      <div className="night-atmos" />
      <div className="night-grid" />
      <div className="grain" />
      <div className="snow" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6">
        <Link href="/ooh-offer" aria-label="Shopa Marketing home">
          <Image src="/lp/ooh/logo-christmas.webp" alt="Shopa Marketing" width={600} height={241} className="logo-lift h-12 w-auto" />
        </Link>
      </div>
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 items-center px-4 pb-24 sm:px-6">
        <ThankYouBody />
      </div>
    </main>
  );
}
