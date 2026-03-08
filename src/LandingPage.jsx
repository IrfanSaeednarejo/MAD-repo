import { Link } from "react-router-dom";

const G = {
  bg: "#0D1117",
  panel: "#161B22",
  card: "#1C2128",
  border: "#30363D",
  text: "#E6EDF3",
  muted: "#8B949E",
  blue: "#60A5FA",
  blueBg: "#60A5FA20",
  teal: "#2DD4BF",
  tealBg: "#2DD4BF20",
  amber: "#F59E0B",
  amberBg: "#F59E0B20",
  violet: "#A78BFA",
  violetBg: "#A78BFA20",
};

const lectures = [
  {
    path: "/Lecture02",
    title: "Lecture 02",
    subtitle: "Introduction to Jetpack Compose",
    color: G.blue,
    bg: G.blueBg,
  },
  {
    path: "/Lecture03",
    title: "Lecture 03",
    subtitle: "State Management",
    color: G.teal,
    bg: G.tealBg,
  },
  {
    path: "/Lecture04",
    title: "Lecture 04",
    subtitle: "Navigation",
    color: G.amber,
    bg: G.amberBg,
  },
];

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(circle at top right, ${G.violetBg}, ${G.bg} 45%)`,
        color: G.text,
        fontFamily: "'Trebuchet MS', Tahoma, sans-serif",
        padding: "28px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          border: `1px solid ${G.border}`,
          borderRadius: 16,
          background: G.panel,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <header
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${G.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: G.muted,
                fontFamily: "monospace",
              }}
            >
              Android � Kotlin � Jetpack Compose
            </div>
            <h1 style={{ margin: "8px 0 0", fontSize: 22 }}>Lecture Series</h1>
          </div>
          <span
            style={{
              fontSize: 12,
              color: G.violet,
              border: `1px solid ${G.violet}55`,
              background: G.violetBg,
              borderRadius: 999,
              padding: "5px 12px",
              fontFamily: "monospace",
            }}
          >
            Landing Page
          </span>
        </header>

        <main style={{ padding: 24 }}>
          <p style={{ color: G.muted, marginTop: 0, lineHeight: 1.6 }}>
            Choose a lecture to open the guide. Routing is now configured with dedicated paths for each module.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginTop: 16,
            }}
          >
            {lectures.map((lecture) => (
              <Link
                key={lecture.path}
                to={lecture.path}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  background: G.card,
                  border: `1px solid ${G.border}`,
                  borderRadius: 12,
                  padding: "16px 14px",
                  display: "block",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    fontSize: 11,
                    color: lecture.color,
                    border: `1px solid ${lecture.color}55`,
                    background: lecture.bg,
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontFamily: "monospace",
                  }}
                >
                  Route: {lecture.path}
                </div>
                <h2
                  style={{
                    margin: "10px 0 6px",
                    fontSize: 18,
                    color: lecture.color,
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {lecture.title}
                </h2>
                <p style={{ margin: 0, color: G.muted, fontSize: 13 }}>{lecture.subtitle}</p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
