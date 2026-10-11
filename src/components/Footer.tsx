import { links } from "@/lib/content";
import RevealEmail from "./RevealEmail";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <h2 className="footer-title">Let&rsquo;s talk.</h2>
      <p className="footer-text">
        About a partnership, a product, or a poem. My inbox is open.
      </p>
      <ul className="footer-links">
        <li>
          <RevealEmail />
        </li>
        <li>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
      </ul>
      <p className="footer-small">Archisha Sahai, {new Date().getFullYear()}</p>
    </footer>
  );
}
