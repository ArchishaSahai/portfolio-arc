import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { poems } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return poems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const poem = poems.find((p) => p.slug === slug);
  return poem ? { title: `${poem.title}, Archisha Sahai`, description: poem.teaser } : {};
}

export default async function PoemPage({ params }: Props) {
  const { slug } = await params;
  const i = poems.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const poem = poems[i];
  const next = poems[(i + 1) % poems.length];

  return (
    <>
      <Nav />
      <main className="poem">
        <Link href="/#writing" className="poem-back">
          All writing
        </Link>
        <h1 className="poem-heading">{poem.title}</h1>
        <div className="poem-verse">
          {poem.lines.map((line, n) => (
            <p key={n}>{line}</p>
          ))}
        </div>
        <blockquote className="poem-closing">{poem.closing}</blockquote>
        <p className="poem-next">
          Next poem: <Link href={`/writing/${next.slug}`}>{next.title}</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
