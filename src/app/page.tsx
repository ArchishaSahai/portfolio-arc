import Link from "next/link";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TiltCard from "@/components/TiltCard";
import { community, education, featured, more, poems, skills, work, type Role } from "@/lib/content";

function Timeline({ items }: { items: Role[] }) {
  return (
    <ol className="timeline">
      {items.map((r) => (
        <li key={r.org + r.title} className={r.current ? "timeline-item is-current" : "timeline-item"}>
          <div className="timeline-when">{r.when}</div>
          <div>
            <h3 className="timeline-title">
              {r.title}, <span>{r.org}</span>
            </h3>
            {r.place && <p className="timeline-place">{r.place}</p>}
            <p className="timeline-note">{r.note}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <section id="about" className="section about">
          <p className="about-lead">
            I&rsquo;m Archisha. I studied computer science, but I&rsquo;ve never kept to one lane. I&rsquo;ve
            designed brands and apps, built AI tools, led a student chapter that ran a 400+ person
            contest, and written poetry the whole way through.
          </p>
          <div className="now">
            <h2 className="now-title">New chapter</h2>
            <p>
              I&rsquo;ve just joined <strong>ZAVO</strong> (formerly Valorant Consulting) as a Business Development
              Representative. After years of building products, I&rsquo;m learning the other half: understanding
              what clients need and starting the conversations that become partnerships.
            </p>
          </div>
        </section>

        <section id="work" className="section">
          <h2 className="section-title">Selected work</h2>
          <p className="section-intro">
            Things I&rsquo;ve imagined, designed and built, for people and with people.
          </p>
          <div className="stack">
            {featured.map((p, i) => (
              <TiltCard key={p.name} style={{ "--tint": p.tint, "--i": i } as React.CSSProperties}>
                <div className="card-head">
                  <p className="card-kind">{p.kind}</p>
                  <h3 className="card-name">{p.name}</h3>
                </div>
                <div className="card-body">
                  <p>{p.summary}</p>
                  <p className="card-role">{p.role}</p>
                  <ul className="card-skills" aria-label="Skills">
                    {p.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  {p.links.length > 0 && (
                    <p className="card-links">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                          {l.label}
                        </a>
                      ))}
                    </p>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>

          <h3 className="sub-title">More things I&rsquo;ve made</h3>
          <ul className="more">
            {more.map((p) => (
              <li key={p.name}>
                <h4>{p.name}</h4>
                <p>{p.summary}</p>
                {p.links.length > 0 && (
                  <p className="card-links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="experience" className="section">
          <h2 className="section-title">Experience</h2>
          <Timeline items={work} />

          <h3 className="sub-title">Clubs and community</h3>
          <Timeline items={community} />

          <h3 className="sub-title">Education</h3>
          <ol className="timeline">
            <li className="timeline-item">
              <div className="timeline-when">{education.when}</div>
              <div>
                <h3 className="timeline-title">
                  {education.degree}, <span>{education.school}</span>
                </h3>
                <p className="timeline-note">{education.note}</p>
              </div>
            </li>
          </ol>
        </section>

        <section id="skills" className="section">
          <h2 className="section-title">What I bring</h2>
          <div className="skills">
            {skills.map((g) => (
              <div key={g.group}>
                <h3 className="skills-group">{g.group}</h3>
                <ul>
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="writing" className="section">
          <h2 className="section-title">Writing</h2>
          <p className="section-intro">Poems about ambition, love and what both of them cost.</p>
          <ul className="poems">
            {poems.map((p) => (
              <li key={p.slug}>
                <Link href={`/writing/${p.slug}`} className="poem-link">
                  <span className="poem-title">{p.title}</span>
                  <span className="poem-teaser">{p.teaser}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
