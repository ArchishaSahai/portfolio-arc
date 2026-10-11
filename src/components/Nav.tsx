import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <Link href="/" className="nav-mark" aria-label="Archisha Sahai, home">
        A.S.
      </Link>
      <div className="nav-links">
        <Link href="/#work">Work</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#writing">Writing</Link>
        <Link href="/#contact">Contact</Link>
      </div>
    </nav>
  );
}
