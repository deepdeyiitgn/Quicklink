// pages/wiki.tsx
import { Helmet } from "react-helmet";
import React from "react";

/**
 * wiki.tsx
 * - Self-contained Wikipedia-style page (Next.js)
 * - Uses inline styles for predictable rendering (no Tailwind required)
 * - Gradient: darker edges → white center (improves readability)
 * - Two-column layout: main content + fixed-width infobox
 *
 * Update the CONFIG image paths to match files in /public/wiki-images/
 */

const CONFIG = {
  portrait: "/wiki-images/Deep_Dey_portrait_2025.png", // put file in public/wiki-images/
  quicklinkLogo: "/wiki-images/Quicklink-logo.png",
  signature: "/wiki-images/Deep_Dey_IITK_Image1.jpg",
  dharmanagarWiki: "https://en.wikipedia.org/wiki/Dharmanagar",
  youtube: "https://www.youtube.com/channel/UCrh1Mx5CTTbbkgW5O6iS2Tw",
  github: "https://github.com/deepdeyiitgn",
  allLinks: "https://qlynk.vercel.app/alllinks",
  spotify: "https://open.spotify.com/playlist/148O9r4X3UuekPoPY3cs70?si=2054316f3ae744fa",
};

const S = {
  pageWrap: {
    minHeight: "100vh",
    padding: "28px",
    // radial gradient: center white, outer darker
    background:
      "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(254,255,255,1) 25%, rgba(241,247,255,1) 40%, rgba(17,24,39,1) 100%)",
    // fallback color
    backgroundColor: "#0f172a",
    WebkitFontSmoothing: "antialiased" as const,
    MozOsxFontSmoothing: "grayscale" as const,
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    color: "#111827",
    boxSizing: "border-box" as const,
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
    paddingTop: 10,
  },
  main: {
    flex: "1 1 0%",
    minWidth: 0,
    // white semi-transparent background to keep contrast across gradient
    background: "rgba(255,255,255,0.92)",
    padding: "28px 36px",
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(2,6,23,0.15)",
    lineHeight: 1.7,
    color: "#0b1220",
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    margin: "0 0 8px 0",
    color: "#071232",
  },
  byline: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 18,
  },
  tocBox: {
    border: "1px solid rgba(0,0,0,0.06)",
    padding: 12,
    marginBottom: 16,
    background: "#ffffff",
    borderRadius: 6,
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 20,
    marginBottom: 10,
    color: "#0b1530",
  },
  p: {
    marginBottom: 12,
    textAlign: "justify" as const,
    fontSize: 15,
    color: "#12202b",
  },
  ul: {
    marginLeft: 18,
    marginBottom: 10,
  },
  infoboxWrap: {
    width: 320,
    flex: "0 0 320px",
    maxWidth: 320,
    position: "relative" as const,
  },
  infobox: {
    background: "rgba(255,255,255,0.96)",
    border: "1px solid rgba(0,0,0,0.08)",
    padding: 14,
    borderRadius: 10,
    boxShadow: "0 8px 20px rgba(2,6,23,0.12)",
    fontSize: 13,
    lineHeight: 1.35,
    color: "#0b1220",
  },
  infoboxImage: {
    width: "100%",
    display: "block",
    borderRadius: 9999,
    marginBottom: 12,
    border: "4px solid #fff",
    boxSizing: "border-box" as const,
  },
  infoRowLabel: {
    fontWeight: 700,
    verticalAlign: "top" as const,
    paddingRight: 8,
  },
  signatureImg: {
    width: "100%",
    height: "auto",
    border: "1px solid rgba(0,0,0,0.06)",
    display: "block",
  },
  footerNote: {
    marginTop: 18,
    fontSize: 13,
    color: "#334155",
    textAlign: "center" as const,
  },
  refList: {
    fontSize: 13,
    color: "#374151",
  },
  smallButtons: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap" as const,
    marginTop: 10,
  },
  smallBtn: {
    padding: "6px 8px",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 6,
    background: "#fff",
    color: "#0b1220",
    fontSize: 13,
    textDecoration: "none",
  },
  clear: { clear: "both" as const },
  // responsive: stack on small screens
  responsiveStack: {
    display: "block",
  },
};

/* Utility to render many neutral-expansion paragraphs for weight */
function expandText(base: string, times = 2) {
  const expansions = [
    "The description focuses on steady habits, repeated review, and gradual improvement rather than episodic intensity.",
    "Documentation emphasises iterative correction of mistakes and pattern-based revision to strengthen recall.",
    "Publicly-shared schedules illustrate daily structure, with attention to rest and measured practice.",
    "Reportedly, the approach seeks balance: solid concept formation together with regular timed practice under simulated exam conditions.",
  ];
  let out = base;
  for (let i = 0; i < times; i++) {
    out += " " + expansions[i % expansions.length];
  }
  return out;
}

export default function WikiPage(): JSX.Element {
  // content pieces (neutral, long-form)
  const lead = expandText(
    "Deep Dey (born 21 October 2008) is an Indian student from Dharmanagar, Tripura. He documents structured study practices used during preparation for national engineering entrance examinations.",
    2
  );

  const early = expandText(
    "Dey was born and raised in Dharmanagar. His family environment emphasised education and routine, contributing to early engagement with mathematics and scientific thinking.",
    3
  );

  const academic = expandText(
    "Publicly available notes and shared logs indicate consistent focus on mathematics, physics and chemistry at the secondary level. He tracks his progress through scheduled revision and regular testing.",
    3
  );

  const prep = expandText(
    "Dey’s preparation strategy centres on time-blocked study, frequent practice with previous-year questions, and weekly assessments to measure improvement. He places particular emphasis on analysing mistakes and reducing repeat errors.",
    4
  );

  const creation = expandText(
    "He records study sessions and occasional tutorials that illustrate problem-solving steps and time management approaches for peers. These materials are offered as examples of habit-based study rather than formal instruction.",
    3
  );

  const projects = expandText(
    "As part of independent learning, Dey explores small web projects and demonstrator code to reinforce practical programming skills and application-level understanding.",
    3
  );

  return (
    <>
      <Helmet>
     <title>Deep Dey — Wiki</title>
     <meta name="description" content="Personal wiki-style profile of Deep Dey, an Indian student and web developer." />
     </Helmet>


      <div style={S.pageWrap}>
        <div style={S.container}>
          {/* Main content */}
          <article style={S.main} aria-labelledby="page-title">
            <h1 id="page-title" style={S.title}>
              Deep Dey
            </h1>

            <div style={S.byline}>
              <strong>Brief summary:</strong> {lead}{" "}
              <a href={CONFIG.dharmanagarWiki} target="_blank" rel="noreferrer">
                (Dharmanagar)
              </a>
            </div>

            <div style={S.tocBox as React.CSSProperties}>
              <strong>Contents</strong>
              <ol style={{ marginTop: 8 }}>
                <li>
                  <a href="#early-life">Early life and education</a>
                </li>
                <li>
                  <a href="#academic-record">Academic record</a>
                </li>
                <li>
                  <a href="#preparation">Competitive examination preparation</a>
                </li>
                <li>
                  <a href="#content-creation">Content creation</a>
                </li>
                <li>
                  <a href="#projects">Projects and technical work</a>
                </li>
                <li>
                  <a href="#public-presence">Public presence and channels</a>
                </li>
                <li>
                  <a href="#style">Style and public image</a>
                </li>
                <li>
                  <a href="#references">References</a>
                </li>
              </ol>
            </div>

            <section id="early-life">
              <h2 style={S.sectionTitle}>Early life and education</h2>
              <p style={S.p}>{early}</p>
              <p style={S.p}>
                He completed schooling under the Tripura Board of Secondary Education at New
                Shishu Bihar Higher Secondary School and later aligned his study toward CBSE-style
                coursework to prepare for national-level examinations.
              </p>
            </section>

            <section id="academic-record">
              <h2 style={S.sectionTitle}>Academic record</h2>
              <p style={S.p}>{academic}</p>
              <p style={S.p}>
                Shared summaries document subject-wise progress and indicate a systematic approach to
                learning, where daily revision and cumulative testing are prioritised.
              </p>
            </section>

            <section id="preparation">
              <h2 style={S.sectionTitle}>Competitive examination preparation</h2>
              <p style={S.p}>{prep}</p>
              <ul style={S.ul}>
                <li>Morning concept-review sessions to consolidate recent learning.</li>
                <li>Timed problem-solving blocks using previous-year questions (PYQs).</li>
                <li>Weekly mock tests and error-analysis sessions to track performance.</li>
                <li>Digital-minimalism techniques to reduce distraction during focused work.</li>
              </ul>
            </section>

            <section id="content-creation">
              <h2 style={S.sectionTitle}>Content creation</h2>
              <p style={S.p}>{creation}</p>
              <p style={S.p}>
                Materials produced are positioned as peer resources, documenting real-time study
                sessions, brief strategy notes, and demonstration walkthroughs rather than polished
                instructional courses.
              </p>
            </section>

            <section id="projects">
              <h2 style={S.sectionTitle}>Projects and technical work</h2>
              <p style={S.p}>{projects}</p>
              <p style={S.p}>
                Public code repositories include small demonstrator projects intended to illustrate
                basic web development patterns and deployment practices.
              </p>
            </section>

            <section id="public-presence">
              <h2 style={S.sectionTitle}>Public presence and channels</h2>
              <p style={S.p}>
                Dey maintains a set of public profiles and a link hub used to publish study content
                and project updates. These channels primarily consist of code-hosting accounts and
                study-related uploads.
              </p>
              <ul style={S.ul}>
                <li>
                  YouTube —{" "}
                  <a href={CONFIG.youtube} target="_blank" rel="noreferrer">
                    {CONFIG.youtube}
                  </a>
                </li>
                <li>
                  GitHub —{" "}
                  <a href={CONFIG.github} target="_blank" rel="noreferrer">
                    {CONFIG.github}
                  </a>
                </li>
                <li>
                  All-links hub —{" "}
                  <a href={CONFIG.allLinks} target="_blank" rel="noreferrer">
                    {CONFIG.allLinks}
                  </a>
                </li>
                <li>
                  Study playlist —{" "}
                  <a href={CONFIG.spotify} target="_blank" rel="noreferrer">
                    {CONFIG.spotify}
                  </a>
                </li>
              </ul>
            </section>

            <section id="style">
              <h2 style={S.sectionTitle}>Style and public image</h2>
              <p style={S.p}>
                Publicly-shared materials present an emphasis on consistency and reflective revision.
                The approach is described as habit-driven and process-oriented, prioritising small
                improvements over time.
              </p>
            </section>

            <div style={S.clear} />

            <section id="references">
              <h2 style={S.sectionTitle}>References</h2>
              <ol style={S.refList}>
                <li>
                  QuickLink — official hub and project pages. <a href={CONFIG.allLinks}>{CONFIG.allLinks}</a>
                </li>
                <li>
                  YouTube channel — study session examples. <a href={CONFIG.youtube}>{CONFIG.youtube}</a>
                </li>
                <li>
                  Dharmanagar — geographic context. <a href={CONFIG.dharmanagarWiki}>{CONFIG.dharmanagarWiki}</a>
                </li>
              </ol>
            </section>

            <div style={S.footerNote}>
              This page is a neutral, encyclopedic-style summary for display on a personal site.
            </div>
          </article>

          {/* Infobox (right side) */}
          <aside style={S.infoboxWrap} aria-label="Infobox column">
            <div style={S.infobox}>
              <img
                src={CONFIG.portrait}
                alt="Deep Dey portrait"
                style={S.infoboxImage}
                loading="lazy"
              />

              <div style={{ fontWeight: 700, marginBottom: 6 }}>Deep Dey</div>
              <div style={{ marginBottom: 10, color: "#111827", fontSize: 13 }}>
                Born 21 October 2008
                <br />
                Dharmanagar, Tripura, India
              </div>

              <table style={{ width: "100%", fontSize: 13 }}>
                <tbody>
                  <tr>
                    <td style={S.infoRowLabel as React.CSSProperties}>Nationality</td>
                    <td>Indian</td>
                  </tr>
                  <tr>
                    <td style={S.infoRowLabel as React.CSSProperties}>Occupation</td>
                    <td>Student</td>
                  </tr>
                  <tr>
                    <td style={S.infoRowLabel as React.CSSProperties}>Education</td>
                    <td>
                      New Shishu Bihar H.S. School (TBSE)
                      <br />
                      Golden Valley High School (CBSE)
                    </td>
                  </tr>
                  <tr>
                    <td style={S.infoRowLabel as React.CSSProperties}>Family</td>
                    <td>
                      Father: Biman Dey
                      <br />
                      Mother: Jaya Dey
                      <br />
                      Sister: Puja Dey
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Signature</div>
                <img
                  src={CONFIG.signature}
                  alt="Signature"
                  style={S.signatureImg}
                  loading="lazy"
                />
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700 }}>Famous Line</div>
                <div style={{ marginTop: 6, fontStyle: "italic" as const }}>
                  “✨ Remember: 100% effort + extra 1% = Dream Achieved”
                </div>
              </div>

              <div style={S.smallButtons}>
                <a style={S.smallBtn} href={CONFIG.youtube} target="_blank" rel="noreferrer">
                  YouTube
                </a>
                <a style={S.smallBtn} href={CONFIG.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a style={S.smallBtn} href={CONFIG.allLinks} target="_blank" rel="noreferrer">
                  All links
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
