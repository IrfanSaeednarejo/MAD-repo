import { useState } from "react";
import { useNavigate } from "react-router-dom";

const G = {
  bg: "#0D1117",        
  panel: "#161B22",    
  card: "#1C2128",     
  border: "#30363D",    
  amber:    "#F59E0B",
  teal:     "#2DD4BF",

  accent: "#3B82F6",    
  accentDim: "#2563EB",
  accentGlow: "#3B82F633",

  yellow: "#FACC15",
  blue: "#60A5FA",
  purple: "#A78BFA",
  red: "#F87171",
  orange: "#FB923C",

  text: "#E6EDF3",   
  muted: "#8B949E",   
  faint: "#21262D",   
};
const sections = [
  { id: "overview", icon: "⚡", label: "Compose vs XML" },
  { id: "paradigm", icon: "🔄", label: "Declarative Paradigm" },
  { id: "phases", icon: "🎯", label: "Three Phases" },
  { id: "lesson1", icon: "🧩", label: "Basic Components" },
  { id: "lesson2", icon: "📐", label: "Layouts" },
  { id: "lesson3", icon: "🏗️", label: "Important Composables" },
];

const Code = ({ code }) => (
  <pre style={{
    background: "#070D07", border: `1px solid ${G.border}`,
    borderLeft: `3px solid ${G.accent}`, borderRadius: 6,
    padding: "14px 16px", margin: "12px 0", overflowX: "auto",
    fontSize: 12, lineHeight: 1.75, color: "#A8D8A8",
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    whiteSpace: "pre-wrap", wordBreak: "break-word"
  }}>
    <code>{code}</code>
  </pre>
);

const Badge = ({ label, color = G.accent }) => (
  <span style={{
    fontSize: 10, padding: "2px 8px", borderRadius: 3,
    border: `1px solid ${color}55`, color, background: `${color}15`,
    letterSpacing: "0.8px", textTransform: "uppercase", fontWeight: 600,
    fontFamily: "monospace"
  }}>{label}</span>
);

const Note = ({ children, type = "tip" }) => {
  const colors = { tip: G.accent, warn: G.yellow, info: G.blue };
  const icons = { tip: "💡", warn: "⚠️", info: "ℹ️" };
  const c = colors[type];
  return (
    <div style={{
      background: `${c}10`, border: `1px solid ${c}30`,
      borderLeft: `3px solid ${c}`, borderRadius: 6,
      padding: "12px 14px", margin: "14px 0",
      fontSize: 13, color: G.text, lineHeight: 1.65
    }}>
      <span style={{ marginRight: 8 }}>{icons[type]}</span>{children}
    </div>
  );
};

const SectionHeader = ({ title, subtitle, badge }) => (
  <div style={{ marginBottom: 28 }}>
    {badge && <div style={{ marginBottom: 8 }}><Badge label={badge} /></div>}
    <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: G.text, letterSpacing: "-0.5px", fontFamily: "'Georgia', serif" }}>{title}</h2>
    {subtitle && <p style={{ margin: 0, fontSize: 14, color: G.muted, lineHeight: 1.6 }}>{subtitle}</p>}
  </div>
);

const Divider = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 20px" }}>
    <div style={{ flex: 1, height: 1, background: G.border }} />
    {label && <span style={{ fontSize: 11, color: G.muted, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "monospace" }}>{label}</span>}
    <div style={{ flex: 1, height: 1, background: G.border }} />
  </div>
);


function OverviewSection() {
  const rows = [
    ["Paradigm", "Imperative (mutate view objects)", "Declarative (describe UI as state)", G.accent],
    ["Language", "XML markup + Java/Kotlin", "100% Kotlin", G.blue],
    ["UI Updates", "Manual — call .setText(), .setVisibility()", "Automatic recomposition on state change", G.yellow],
    ["Flexibility", "Static layouts, harder to make dynamic UI", "Dynamic components, no limits", G.accent],
    ["Learning Curve", "Shallow — huge docs history", "Moderate — new paradigm to internalize", G.orange],
    ["Performance", "Can bottleneck on complex nested views", "Optimized — only recomposes what changed", G.purple],
    ["Reactivity", "Manual listeners and observers needed", "Built-in — state drives UI automatically", G.accent],
    ["Tooling", "Mature, vast documentation", "Evolving fast, excellent Android Studio support", G.blue],
    ["Compatibility", "Seamless with legacy apps", "Interops with XML via ComposeView / AndroidView", G.yellow],
    ["Best For", "Small projects, legacy maintenance", "All project sizes, especially complex UIs", G.accent],
  ];
  return (
    <div>
      <SectionHeader title="Jetpack Compose vs XML Views" badge="Lecture 2 · Overview"
        subtitle="Understanding WHY Compose exists and what mental models to leave behind." />
      <Note type="info">You're an experienced dev — the key shift here is from <strong>mutating objects</strong> to <strong>describing state</strong>. Think React, but for native Android.</Note>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {["Dimension", "XML (Old)", "Jetpack Compose (New)", ""].map((h, i) => (
                <th key={i} style={{ padding: "10px 14px", textAlign: "left", background: G.card, color: G.muted, fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", borderBottom: `1px solid ${G.border}`, fontFamily: "monospace" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([dim, old, neo, c], i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${G.faint}`, background: i % 2 === 0 ? "transparent" : "#0D120D" }}>
                <td style={{ padding: "10px 14px", color: c, fontWeight: 600, fontSize: 12, fontFamily: "monospace" }}>{dim}</td>
                <td style={{ padding: "10px 14px", color: G.muted, lineHeight: 1.5 }}>{old}</td>
                <td style={{ padding: "10px 14px", color: G.text, lineHeight: 1.5 }}>{neo}</td>
                <td style={{ padding: "6px 10px" }}><span style={{ color: G.accent, fontSize: 14 }}>✓</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Divider label="Core concept" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { title: "XML: Imperative", color: G.red, code: `// Create view → find it → mutate it
val tv = findViewById<TextView>(R.id.myText)
tv.text = "Hello"
tv.visibility = View.VISIBLE
// Then update it later... manually
tv.text = "Updated!"` },
          { title: "Compose: Declarative", color: G.accent, code: `// Just describe what it should look like
// based on current state
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
    // State changes → auto re-rendered
}` }
        ].map(({ title, color, code }) => (
          <div key={title}>
            <div style={{ fontSize: 12, color, fontWeight: 700, marginBottom: 4, fontFamily: "monospace" }}>{title}</div>
            <Code code={code} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ParadigmSection() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "State exists", desc: "Your app holds state (e.g. a list of messages, a counter, a user object).", color: G.blue, icon: "🗄️" },
    { label: "Composable reads state", desc: "A @Composable function reads that state and builds a description of the UI tree.", color: G.accent, icon: "👁️" },
    { label: "UI is displayed", desc: "Compose renders the described UI to the screen for the user to see.", color: G.purple, icon: "🖥️" },
    { label: "User interacts", desc: "User clicks, swipes, types — events are raised (onClick, onValueChange, etc.).", color: G.orange, icon: "👆" },
    { label: "State mutates", desc: "Your app logic updates state in response. This triggers recomposition.", color: G.yellow, icon: "✏️" },
    { label: "Recomposition", desc: "The composable function is called AGAIN with the new state. Only changed nodes recompose.", color: G.accent, icon: "🔄" },
  ];
  return (
    <div>
      <SectionHeader title="Declarative Paradigm Shift" badge="Lecture 2 · Core Concept"
        subtitle="The single most important mental model change. Get this right and everything else follows." />
      <Note type="tip">In XML, you <em>imperatively describe HOW to change</em> the UI. In Compose, you <em>declaratively describe WHAT the UI looks like</em> given current state. The runtime figures out what changed.</Note>
      <div style={{ fontSize: 13, color: G.muted, marginBottom: 16 }}>Click each step to walk through the Compose reactive loop ↓</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "8px 14px", borderRadius: 6, cursor: "pointer",
            border: `1px solid ${step === i ? s.color : G.border}`,
            background: step === i ? `${s.color}18` : "transparent",
            color: step === i ? s.color : G.muted,
            fontSize: 12, fontFamily: "monospace", transition: "all 0.2s"
          }}>
            {s.icon} {i + 1}. {s.label}
          </button>
        ))}
      </div>
      <div style={{ background: `${steps[step].color}12`, border: `1px solid ${steps[step].color}40`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>{steps[step].icon}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: steps[step].color, fontFamily: "'Georgia', serif", marginBottom: 8 }}>{steps[step].label}</div>
        <div style={{ fontSize: 14, color: G.text, lineHeight: 1.7 }}>{steps[step].desc}</div>
      </div>
      <Divider label="Key Rules for Composable Functions" />
      {[
        ["Annotated with @Composable", "Every composable function MUST have this annotation. It tells the Compose compiler to track this function for recomposition.", G.accent],
        ["No return value needed", "Composables emit UI, they don't return widgets. The function body IS the UI description.", G.blue],
        ["Idempotent & side-effect free", "Calling a composable multiple times with the same args must produce the same UI. No side effects in the function body.", G.yellow],
        ["Fast to call", "Composables may be called very frequently (on every frame during animation). Keep them cheap — no I/O, no heavy computation.", G.orange],
      ].map(([title, desc, c]) => (
        <div key={title} style={{ display: "flex", gap: 14, marginBottom: 14, padding: "12px 14px", background: G.card, borderRadius: 6, border: `1px solid ${G.border}` }}>
          <div style={{ width: 4, borderRadius: 2, background: c, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: c, marginBottom: 4, fontFamily: "monospace" }}>{title}</div>
            <div style={{ fontSize: 13, color: G.muted, lineHeight: 1.6 }}>{desc}</div>
          </div>
        </div>
      ))}
      <Divider label="Code example" />
      <Code code={`@Composable
fun MessageCard(name: String) {
    // Just describe the UI — no mutations
    Text(text = "Hello $name!")
}

// Calling it with different args → different UI
// MessageCard("Alice") → shows "Hello Alice!"
// MessageCard("Bob")   → shows "Hello Bob!"
// No .setText() calls, no widget refs needed`} />
    </div>
  );
}

function PhasesSection() {
  const [active, setActive] = useState(0);
  const phases = [
    {
      num: "01", name: "Composition", color: G.accent, icon: "🧩",
      desc: "The Compose runtime EXECUTES your composable functions and builds a UI tree (a description of every element). This tree contains all the info needed for the next phases.",
      steps: ["Compose runtime calls your @Composable functions", "Functions call other composables (Text, Row, Column…)", "A UI tree of layout nodes is produced", "Tree holds: element type, parameters, children"],
      code: `// Your composables describe the tree:
@Composable
fun ProfileCard(user: User) {
    Row {                        // layout node
        Image(user.avatar)       // leaf node
        Column {                 // layout node
            Text(user.name)      // leaf node
            Text(user.bio)       // leaf node
        }
    }
}
// ↑ produces a tree:
// Row → [Image, Column → [Text, Text]]`
    },
    {
      num: "02", name: "Layout", color: G.blue, icon: "📐",
      desc: "Using the UI tree from Composition, Compose measures and places every element in 2D space. This is a 3-step traversal: measure children → decide own size → place children.",
      steps: ["Traverse tree top-to-bottom", "Each node measures its children first", "Node decides its own size based on measurements", "Each child is placed at an x,y coordinate"],
      code: `// At the end of Layout, every node has:
// 1. A width and height (in pixels)
// 2. An x,y coordinate for where to draw

// Compose layout is 1-pass (unlike View system
// which can measure multiple times).
// This is why layout is fast and predictable.

// Example constraint flow:
// Parent says: "you have max 300dp width"
// Column says: "I'll be as wide as my widest child"
// Text measures: "I need 240dp for this string"`
    },
    {
      num: "03", name: "Drawing", color: G.purple, icon: "🎨",
      desc: "Compose traverses the tree top-to-bottom AGAIN. Each node draws itself onto a Canvas (which maps to the device screen). Drawing order matters — children draw on top of parents.",
      steps: ["Traverse tree top-to-bottom again", "Each node draws onto a Canvas", "Row draws its background", "Image draws itself, Column draws itself", "Text nodes draw their content last"],
      code: `// Drawing order (back to front):
// 1. Row background (if any)
// 2. Image
// 3. Column background (if any)
// 4. First Text
// 5. Second Text

// This is why children always appear
// on top of parents visually.

// Canvas is typically the device screen,
// but can be offscreen (for screenshots, etc.)`
    },
  ];

  const statePhases = [
    { label: "State changes", color: G.yellow, note: "e.g. counter++ or list updated" },
    { label: "Composition", color: G.accent, note: "Re-runs affected composables only" },
    { label: "Layout", color: G.blue, note: "Re-measures only changed subtrees" },
    { label: "Drawing", color: G.purple, note: "Re-draws only changed nodes" },
  ];

  return (
    <div>
      <SectionHeader title="The Three Phases of a Frame" badge="Lecture 2 · Internals"
        subtitle="Every frame Compose renders goes through these three phases in order. Understanding this explains recomposition, performance, and why modifier order matters." />
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {phases.map((p, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            flex: 1, padding: "14px 10px", borderRadius: 8, cursor: "pointer",
            border: `1px solid ${active === i ? p.color : G.border}`,
            background: active === i ? `${p.color}15` : G.card,
            transition: "all 0.2s", textAlign: "center"
          }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
            <div style={{ fontSize: 11, color: active === i ? p.color : G.muted, fontFamily: "monospace", letterSpacing: "1px", textTransform: "uppercase" }}>Phase {p.num}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: active === i ? p.color : G.muted, marginTop: 4 }}>{p.name}</div>
          </button>
        ))}
      </div>
      <div style={{ background: `${phases[active].color}10`, border: `1px solid ${phases[active].color}35`, borderRadius: 10, padding: "20px 22px", marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: phases[active].color, marginBottom: 10, fontFamily: "'Georgia', serif" }}>
          {phases[active].icon} Phase {phases[active].num}: {phases[active].name}
        </div>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: G.text, lineHeight: 1.7 }}>{phases[active].desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {phases[active].steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 12px", background: "#060D06", borderRadius: 6, fontSize: 12, color: G.muted, flex: "1 1 200px" }}>
              <span style={{ color: phases[active].color, fontWeight: 700, fontFamily: "monospace", flexShrink: 0 }}>{i + 1}.</span>
              <span style={{ lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>
        <Code code={phases[active].code} />
      </div>
      <Divider label="What happens during a state change?" />
      <Note type="tip">Compose is smart — it only re-runs the phases that are ACTUALLY affected by a state change, not the entire tree.</Note>
      <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", padding: "8px 0" }}>
        {statePhases.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ padding: "12px 16px", background: `${p.color}18`, border: `1px solid ${p.color}40`, borderRadius: 8, textAlign: "center", minWidth: 100 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: p.color, fontFamily: "monospace" }}>{p.label}</div>
              <div style={{ fontSize: 10, color: G.muted, marginTop: 4, lineHeight: 1.4 }}>{p.note}</div>
            </div>
            {i < statePhases.length - 1 && <div style={{ color: G.muted, fontSize: 18, padding: "0 6px", flexShrink: 0 }}>→</div>}
          </div>
        ))}
      </div>
      <Note type="warn">
        <strong>Optimized State reads:</strong> If only the Drawing phase reads a state value (e.g. a color animation), Compose can skip Composition and Layout entirely — jumping straight to Drawing. This is why animations are so performant in Compose.
      </Note>
    </div>
  );
}

function Lesson1Section() {
  const [tab, setTab] = useState("text");
  const tabs = [
    { id: "text", label: "Text", icon: "T" },
    { id: "button", label: "Buttons", icon: "⬡" },
    { id: "image", label: "Images", icon: "🖼" },
    { id: "icon", label: "Icons", icon: "★" },
  ];
  const content = {
    text: {
      title: "Text Composable",
      desc: "The most fundamental composable. Renders styled text with full Material3 typography support.",
      params: [
        ["text", "String", "The string to display"],
        ["modifier", "Modifier", "Size, padding, click handling..."],
        ["color", "Color", "Text color (default: MaterialTheme.colorScheme.onBackground)"],
        ["fontSize", "TextUnit", "e.g. 16.sp or 24.sp"],
        ["fontWeight", "FontWeight", "Bold, SemiBold, Light, etc."],
        ["fontStyle", "FontStyle", "Normal or Italic"],
        ["textAlign", "TextAlign", "Start, Center, End, Justify"],
        ["maxLines", "Int", "Truncate with ellipsis after N lines"],
        ["style", "TextStyle", "Use MaterialTheme.typography.bodyLarge etc."],
      ],
      code: `// Simple text
Text(text = "Hello World!")

// Styled text
Text(
    text = "Welcome back, Alice",
    fontSize = 20.sp,
    fontWeight = FontWeight.Bold,
    color = MaterialTheme.colorScheme.primary
)

// Material typography system (preferred)
Text(
    text = "Headline",
    style = MaterialTheme.typography.headlineMedium
)
Text(
    text = "Body paragraph...",
    style = MaterialTheme.typography.bodyMedium,
    maxLines = 3,
    overflow = TextOverflow.Ellipsis
)

// Multiple styles in one text (AnnotatedString)
Text(
    buildAnnotatedString {
        withStyle(SpanStyle(color = Color.Green)) { append("Hello ") }
        withStyle(SpanStyle(fontWeight = FontWeight.Bold)) { append("World") }
    }
)`
    },
    button: {
      title: "Button Types (Material 3)",
      desc: "5 button types in Material 3, each for different emphasis levels.",
      params: [
        ["onClick", "() -> Unit", "Called when user presses the button"],
        ["enabled", "Boolean", "false = greyed out, non-interactive"],
        ["colors", "ButtonColors", "Customize container + content colors"],
        ["contentPadding", "PaddingValues", "Internal padding inside button"],
        ["modifier", "Modifier", "External sizing and layout"],
      ],
      code: `// 1. Filled (highest emphasis — primary action)
Button(onClick = { /* primary action */ }) {
    Text("Save")
}

// 2. Outlined (medium emphasis)
OutlinedButton(onClick = { /* secondary */ }) {
    Text("Cancel")
}

// 3. Text (lowest emphasis)
TextButton(onClick = { /* tertiary */ }) {
    Text("Learn more")
}

// 4. Elevated
ElevatedButton(onClick = { }) {
    Text("Open")
}

// 5. Filled Tonal
FilledTonalButton(onClick = { }) {
    Text("Share")
}

// Button with icon
Button(onClick = { }) {
    Icon(Icons.Default.Add, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("Add Item")
}

// Disabled button
Button(onClick = { }, enabled = false) {
    Text("Unavailable")
}`
    },
    image: {
      title: "Images in Compose",
      desc: "Two types: ImageBitmap (raster — PNG/JPEG/WEBP) and ImageVector (scalable SVG-like). Use painterResource for both.",
      params: [
        ["painter", "Painter", "Use painterResource() for local assets"],
        ["contentDescription", "String?", "Accessibility label — null if decorative"],
        ["contentScale", "ContentScale", "Crop, Fit, FillBounds, Inside..."],
        ["modifier", "Modifier", "Size, clip, padding, etc."],
        ["colorFilter", "ColorFilter?", "Tint, matrix transforms"],
        ["alignment", "Alignment", "Where to align within bounds"],
      ],
      code: `// Local asset (from res/drawable)
Image(
    painter = painterResource(R.drawable.my_photo),
    contentDescription = "Profile photo",
    modifier = Modifier.size(80.dp),
    contentScale = ContentScale.Crop
)

// Clip to circle shape
Image(
    painter = painterResource(R.drawable.avatar),
    contentDescription = null,
    modifier = Modifier
        .size(64.dp)
        .clip(CircleShape)
)

// Tint an icon/image
Image(
    painter = painterResource(R.drawable.ic_star),
    contentDescription = null,
    colorFilter = ColorFilter.tint(
        color = Color.Yellow,
        blendMode = BlendMode.SrcIn
    )
)

// Load from internet (add coil dependency)
AsyncImage(
    model = "https://example.com/photo.jpg",
    contentDescription = "Remote image",
    modifier = Modifier.fillMaxWidth(),
    contentScale = ContentScale.Crop
)`
    },
    icon: {
      title: "Material Icons",
      desc: "Icon composable renders single-color Material Design icons. Uses the built-in Icons object — no SVG imports needed for standard icons.",
      params: [
        ["imageVector", "ImageVector", "Icons.Default.*, Icons.Outlined.*, Icons.Filled.*"],
        ["contentDescription", "String?", "Accessibility — null if decorative"],
        ["modifier", "Modifier", "Usually Modifier.size(24.dp)"],
        ["tint", "Color", "Icon color (default: LocalContentColor)"],
      ],
      code: `// Standard Material icon
Icon(
    imageVector = Icons.Default.Home,
    contentDescription = "Home",
    tint = MaterialTheme.colorScheme.primary
)

// Different style variants
Icon(Icons.Outlined.Settings, "Settings")
Icon(Icons.Filled.Favorite, "Liked")
Icon(Icons.Rounded.Search, "Search")
Icon(Icons.Sharp.Close, "Close")
Icon(Icons.TwoTone.Star, "Star")

// Custom sized icon
Icon(
    imageVector = Icons.Default.Add,
    contentDescription = "Add",
    modifier = Modifier.size(32.dp),
    tint = Color.White
)

// Note: add the extended icons library in build.gradle.kts:
// implementation(libs.androidx.material.icons.extended)`
    }
  };
  const c = content[tab];
  return (
    <div>
      <SectionHeader title="Lesson 1: Basic Components" badge="Lesson 1" subtitle="Text, Buttons, Images, and Icons — the atoms of every Compose UI." />
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 18px", borderRadius: 6, cursor: "pointer",
            border: `1px solid ${tab === t.id ? G.accent : G.border}`,
            background: tab === t.id ? G.accentGlow : "transparent",
            color: tab === t.id ? G.accent : G.muted,
            fontSize: 13, fontFamily: "monospace", transition: "all 0.2s"
          }}>{t.icon} {t.label}</button>
        ))}
      </div>
      <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 10, padding: "20px 22px" }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: G.text, fontFamily: "'Georgia', serif" }}>{c.title}</h3>
        <p style={{ margin: "0 0 18px", fontSize: 13, color: G.muted, lineHeight: 1.6 }}>{c.desc}</p>
        <div style={{ fontSize: 11, color: G.accent, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Parameters</div>
        <div style={{ marginBottom: 16 }}>
          {c.params.map(([name, type, desc]) => (
            <div key={name} style={{ display: "flex", gap: 0, fontSize: 12, padding: "6px 0", borderBottom: `1px solid ${G.faint}`, flexWrap: "wrap" }}>
              <span style={{ color: G.accent, fontFamily: "monospace", width: 140, flexShrink: 0 }}>{name}</span>
              <span style={{ color: G.purple, fontFamily: "monospace", width: 130, flexShrink: 0 }}>{type}</span>
              <span style={{ color: G.muted, flex: 1 }}>{desc}</span>
            </div>
          ))}
        </div>
        <Code code={c.code} />
      </div>
    </div>
  );
}

function Lesson2Section() {
  const [view, setView] = useState("layouts");
  return (
    <div>
      <SectionHeader title="Lesson 2: Layouts" badge="Lesson 2"
        subtitle="Column, Row, Box, ConstraintLayout — plus alignment, arrangement, and the critical Modifier system." />
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[["layouts","📦","Core Layouts"],["alignment","🎯","Alignment & Arrangement"],["modifiers","🔧","Modifiers"]].map(([id,icon,label]) => (
          <button key={id} onClick={() => setView(id)} style={{
            padding: "8px 18px", borderRadius: 6, cursor: "pointer",
            border: `1px solid ${view === id ? G.yellow : G.border}`,
            background: view === id ? `${G.yellow}18` : "transparent",
            color: view === id ? G.yellow : G.muted,
            fontSize: 13, fontFamily: "monospace", transition: "all 0.2s"
          }}>{icon} {label}</button>
        ))}
      </div>

      {view === "layouts" && (
        <div>
          <Note type="info">UI elements are hierarchical — composables call other composables. The three core layout containers are Column, Row, and Box.</Note>
          {[
            { name: "Column", color: G.accent, desc: "Stacks children vertically (top-to-bottom). Like a vertical LinearLayout.", code: `Column(
    modifier = Modifier.fillMaxWidth().padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    horizontalAlignment = Alignment.CenterHorizontally
) {
    Text("First")
    Text("Second")
    Text("Third")
}` },
            { name: "Row", color: G.blue, desc: "Stacks children horizontally (left-to-right). Like a horizontal LinearLayout.", code: `Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceBetween,
    verticalAlignment = Alignment.CenterVertically
) {
    Text("Left")
    Text("Center")
    Text("Right")
}` },
            { name: "Box", color: G.purple, desc: "Overlays children on top of each other (Z-axis stacking). Last child is on top.", code: `Box(
    modifier = Modifier.size(200.dp),
    contentAlignment = Alignment.Center
) {
    // Background layer
    Image(painterResource(R.drawable.bg), null,
          modifier = Modifier.fillMaxSize(),
          contentScale = ContentScale.Crop)
    // Foreground layer (on top)
    Text("Overlay Text", color = Color.White)
}` },
            { name: "LazyColumn", color: G.orange, desc: "Like RecyclerView — only renders visible items. Use for lists. key= for stable identity.", code: `LazyColumn(
    contentPadding = PaddingValues(16.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    // Single item
    item { HeaderCard() }

    // Multiple items from list
    items(
        items = myList,
        key = { it.id }   // stable identity for animations
    ) { item ->
        ItemRow(item)
    }
}` },
          ].map(({ name, color, desc, code }) => (
            <div key={name} style={{ marginBottom: 20, border: `1px solid ${G.border}`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ padding: "12px 18px", background: `${color}14`, borderBottom: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 800, color, fontFamily: "monospace" }}>{name}</span>
                <span style={{ fontSize: 12, color: G.muted }}>{desc}</span>
              </div>
              <div style={{ padding: "0 16px 8px" }}><Code code={code} /></div>
            </div>
          ))}
        </div>
      )}

      {view === "alignment" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G.accent, fontFamily: "monospace", marginBottom: 10 }}>Row → verticalAlignment</div>
              {["Top","CenterVertically","Bottom"].map(a => (
                <div key={a} style={{ padding: "6px 10px", margin: "4px 0", background: G.bg, borderRadius: 4, fontSize: 12, color: G.muted, fontFamily: "monospace" }}>Alignment.<span style={{ color: G.accent }}>{a}</span></div>
              ))}
            </div>
            <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G.blue, fontFamily: "monospace", marginBottom: 10 }}>Column → horizontalAlignment</div>
              {["Start","CenterHorizontally","End"].map(a => (
                <div key={a} style={{ padding: "6px 10px", margin: "4px 0", background: G.bg, borderRadius: 4, fontSize: 12, color: G.muted, fontFamily: "monospace" }}>Alignment.<span style={{ color: G.blue }}>{a}</span></div>
              ))}
            </div>
          </div>
          <Divider label="Arrangement (spacing in main axis)" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
            {[
              ["Start", "items at start", G.accent],
              ["End", "items at end", G.accent],
              ["Center", "items centered", G.accent],
              ["SpaceEvenly", "equal space everywhere", G.yellow],
              ["SpaceAround", "half space at edges", G.yellow],
              ["SpaceBetween", "no space at edges", G.yellow],
              ["spacedBy(8.dp)", "fixed gap between each", G.blue],
            ].map(([name, desc, c]) => (
              <div key={name} style={{ padding: "10px 12px", background: G.card, border: `1px solid ${G.border}`, borderRadius: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c, fontFamily: "monospace", marginBottom: 4 }}>Arrangement.{name}</div>
                <div style={{ fontSize: 11, color: G.muted }}>{desc}</div>
              </div>
            ))}
          </div>
          <Divider label="Box alignment (9-grid)" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, maxWidth: 280, margin: "0 auto 20px" }}>
            {["TopStart","TopCenter","TopEnd","CenterStart","Center","CenterEnd","BottomStart","BottomCenter","BottomEnd"].map(a => (
              <div key={a} style={{ padding: "8px 4px", background: G.card, border: `1px solid ${G.border}`, borderRadius: 4, textAlign: "center", fontSize: 10, color: G.muted, fontFamily: "monospace" }}>{a}</div>
            ))}
          </div>
          <Code code={`// Set alignment inside Box using align modifier
Box(modifier = Modifier.size(200.dp)) {
    Text("TopStart",    Modifier.align(Alignment.TopStart))
    Text("Center",      Modifier.align(Alignment.Center))
    Text("BottomEnd",   Modifier.align(Alignment.BottomEnd))
}`} />
        </div>
      )}

      {view === "modifiers" && (
        <div>
          <Note type="warn"><strong>⚠️ Modifier ORDER matters!</strong> Each modifier wraps the previous one. Padding before background ≠ padding after background.</Note>
          <Code code={`// Order example — these produce DIFFERENT results:

// Padding INSIDE the background:
Box(Modifier.background(Color.Blue).padding(16.dp))
// → Blue box fills full size, content has padding inside

// Padding OUTSIDE the background:
Box(Modifier.padding(16.dp).background(Color.Blue))
// → 16dp transparent gap, then blue background fills rest`} />
          <Divider label="Common modifiers" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { name: "fillMaxWidth()", desc: "Stretch to full available width", group: "Size" },
              { name: "fillMaxHeight()", desc: "Stretch to full available height", group: "Size" },
              { name: "fillMaxSize()", desc: "Fill all available space", group: "Size" },
              { name: "size(dp)", desc: "Fixed width and height", group: "Size" },
              { name: "width / height(dp)", desc: "Set one dimension only", group: "Size" },
              { name: "wrapContentSize()", desc: "Shrink to content size", group: "Size" },
              { name: "padding(dp)", desc: "Add space inside composable", group: "Spacing" },
              { name: "offset(x, y)", desc: "Shift position without affecting layout", group: "Spacing" },
              { name: "background(color)", desc: "Set background color or brush", group: "Visual" },
              { name: "clip(shape)", desc: "Clip to RoundedCornerShape, CircleShape, etc.", group: "Visual" },
              { name: "border(width, color)", desc: "Draw a border", group: "Visual" },
              { name: "alpha(0f..1f)", desc: "Control opacity", group: "Visual" },
              { name: "clickable { }", desc: "Make element respond to taps", group: "Interaction" },
              { name: "scrollable / verticalScroll", desc: "Add scroll behavior", group: "Interaction" },
              { name: "draggable / swipeable", desc: "Gesture handling", group: "Interaction" },
              { name: "testTag()", desc: "Tag for UI tests", group: "Testing" },
            ].map(({ name, desc, group }) => {
              const gc = { Size: G.accent, Spacing: G.blue, Visual: G.purple, Interaction: G.orange, Testing: G.yellow }[group];
              return (
                <div key={name} style={{ padding: "10px 12px", background: G.card, border: `1px solid ${G.border}`, borderRadius: 6 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 9, padding: "2px 6px", background: `${gc}20`, color: gc, borderRadius: 3, fontFamily: "monospace", flexShrink: 0, marginTop: 1 }}>{group}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: G.accent, fontFamily: "monospace" }}>Modifier.{name}</div>
                      <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Lesson3Section() {
  const [active, setActive] = useState("surface");
  const items = [
    { id: "surface", label: "Surface", icon: "▭" },
    { id: "scaffold", label: "Scaffold", icon: "🏗" },
    { id: "appbar", label: "App Bars", icon: "≡" },
    { id: "fab", label: "FAB", icon: "⊕" },
    { id: "card", label: "Card", icon: "▣" },
    { id: "chip", label: "Chip", icon: "◈" },
    { id: "dialog", label: "Dialog", icon: "⚠" },
  ];

  const content = {
    surface: {
      title: "Surface", color: G.accent,
      desc: "The foundational container composable. Wrap any content in Surface to get background color, elevation (shadow), shape, and border for 'free'.",
      params: [["color","Background color"],["elevation","Adds drop shadow"],["shape","RoundedCornerShape, CircleShape..."],["border","Border stroke"],["contentColor","Color inherited by child content"],["onClick","Makes it clickable (like a card)"]],
      code: `Surface(
    modifier = Modifier.fillMaxWidth().padding(16.dp),
    color = MaterialTheme.colorScheme.surface,
    tonalElevation = 4.dp,
    shape = RoundedCornerShape(12.dp)
) {
    Text(
        text = "Hello from Surface",
        modifier = Modifier.padding(16.dp)
    )
}

// Clickable Surface (basic card pattern)
Surface(
    onClick = { /* handle click */ },
    shape = RoundedCornerShape(8.dp),
    color = MaterialTheme.colorScheme.primaryContainer
) {
    Text("Tap me", Modifier.padding(12.dp))
}`
    },
    scaffold: {
      title: "Scaffold", color: G.blue,
      desc: "The top-level screen structure. Scaffold wires together a TopAppBar, BottomBar, FAB, and content — and handles the insets/padding automatically.",
      params: [["topBar","Composable for top app bar"],["bottomBar","Composable for bottom navigation"],["floatingActionButton","FAB positioned over content"],["snackbarHost","For showing snackbars"],["content","Main screen content (receives PaddingValues)"]],
      code: `@Composable
fun HomeScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Home") })
        },
        bottomBar = {
            NavigationBar { /* tabs */ }
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { }) {
                Icon(Icons.Default.Add, "Add")
            }
        }
    ) { innerPadding ->
        // IMPORTANT: always apply innerPadding to content
        // so it doesn't hide behind bars
        LazyColumn(
            modifier = Modifier.padding(innerPadding)
        ) {
            // list items...
        }
    }
}`
    },
    appbar: {
      title: "Top App Bars", color: G.yellow,
      desc: "4 variants: TopAppBar, CenterAlignedTopAppBar, MediumTopAppBar, LargeTopAppBar. All share the same core parameters.",
      params: [["title","Text shown in app bar"],["navigationIcon","Back arrow / hamburger menu"],["actions","Icons in top-right area"],["scrollBehavior","Pin, collapse, or exit on scroll"],["colors","Customize bar + scroll colors"]],
      code: `// Standard TopAppBar
TopAppBar(
    title = { Text("My App") },
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(Icons.Default.ArrowBack, "Back")
        }
    },
    actions = {
        IconButton(onClick = { }) {
            Icon(Icons.Default.Search, "Search")
        }
        IconButton(onClick = { }) {
            Icon(Icons.Default.MoreVert, "More")
        }
    }
)

// Center aligned variant
CenterAlignedTopAppBar(
    title = { Text("Centered Title") }
)

// Collapsible (large) — works with scrollBehavior
val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()
LargeTopAppBar(
    title = { Text("Large Title") },
    scrollBehavior = scrollBehavior
)`
    },
    fab: {
      title: "Floating Action Button", color: G.orange,
      desc: "4 types: FAB, SmallFAB, LargeFAB, ExtendedFAB. Always positioned in Scaffold's floatingActionButton slot.",
      params: [["onClick","Primary action handler"],["containerColor","FAB background color"],["contentColor","Icon color inside FAB"]],
      code: `// Standard FAB
FloatingActionButton(onClick = { createNew() }) {
    Icon(Icons.Default.Add, "Create")
}

// Small FAB
SmallFloatingActionButton(onClick = { }) {
    Icon(Icons.Default.Edit, "Edit")
}

// Large FAB
LargeFloatingActionButton(onClick = { }) {
    Icon(Icons.Default.Add, "Add")
}

// Extended FAB (text + icon)
ExtendedFloatingActionButton(
    onClick = { },
    icon = { Icon(Icons.Default.Add, null) },
    text = { Text("New Post") },
    // Can collapse when scrolling:
    expanded = !listState.isScrollInProgress
)`
    },
    card: {
      title: "Card", color: G.purple,
      desc: "Material Design container for a coherent piece of content. 3 variants: Card (elevated), OutlinedCard, ElevatedCard.",
      params: [["elevation","CardDefaults.cardElevation(defaultElevation = 4.dp)"],["colors","CardDefaults.cardColors(containerColor = ...)"],["enabled","false = disabled appearance"],["onClick","Makes the card clickable"],["shape","RoundedCornerShape(12.dp)"]],
      code: `// Standard elevated card
Card(
    modifier = Modifier.fillMaxWidth().padding(8.dp),
    elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
    shape = RoundedCornerShape(12.dp),
    onClick = { /* navigate to detail */ }
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Card Title", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("Card body text...", style = MaterialTheme.typography.bodyMedium)
    }
}

// Outlined card
OutlinedCard(modifier = Modifier.fillMaxWidth()) {
    Text("Outlined", Modifier.padding(16.dp))
}

// Filled tonal card
ElevatedCard { Text("Elevated", Modifier.padding(16.dp)) }`
    },
    chip: {
      title: "Chip", color: G.accent,
      desc: "4 types: AssistChip, FilterChip, InputChip, SuggestionChip. Compact interactive elements for tags, filters, and user selections.",
      params: [["label","Text shown on chip"],["leadingIcon","Icon on the left"],["trailingIcon","Icon on the right (often X for removal)"],["onClick","Tap handler"],["selected","For FilterChip — shows checkmark when true"]],
      code: `// AssistChip — guides user during task
AssistChip(
    onClick = { openCalendar() },
    label = { Text("Add to calendar") },
    leadingIcon = { Icon(Icons.Default.Event, null) }
)

// FilterChip — toggle to filter content
var selected by remember { mutableStateOf(false) }
FilterChip(
    selected = selected,
    onClick = { selected = !selected },
    label = { Text("Favorites") },
    leadingIcon = if (selected) {
        { Icon(Icons.Default.Check, null) }
    } else null
)

// InputChip — represents user input (e.g. tag)
InputChip(
    selected = false,
    onClick = { removeTag("Kotlin") },
    label = { Text("Kotlin") },
    trailingIcon = { Icon(Icons.Default.Close, "Remove") }
)

// SuggestionChip — AI/autocomplete suggestions
SuggestionChip(
    onClick = { applyTag("Android") },
    label = { Text("Android") }
)`
    },
    dialog: {
      title: "AlertDialog", color: G.red,
      desc: "Modal popup for confirmations, user input, or selection. Blocks interaction with the content behind it.",
      params: [["title","Text at top of dialog"],["text","Main body content"],["icon","Graphic at top"],["onDismissRequest","Called when user dismisses (tap outside, back)"],["dismissButton","Cancel button composable"],["confirmButton","Confirm/OK button composable"]],
      code: `var showDialog by remember { mutableStateOf(false) }

if (showDialog) {
    AlertDialog(
        onDismissRequest = { showDialog = false },
        icon = {
            Icon(Icons.Default.Delete, null,
                 tint = MaterialTheme.colorScheme.error)
        },
        title = { Text("Delete file?") },
        text = {
            Text("This action cannot be undone. The file will be permanently deleted.")
        },
        confirmButton = {
            Button(
                onClick = {
                    deleteFile()
                    showDialog = false
                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.error
                )
            ) { Text("Delete") }
        },
        dismissButton = {
            TextButton(onClick = { showDialog = false }) {
                Text("Cancel")
            }
        }
    )
}`
    }
  };

  const c = content[active];
  return (
    <div>
      <SectionHeader title="Lesson 3: Important Composables" badge="Lesson 3"
        subtitle="The building blocks of complete screens: Surface, Scaffold, App Bars, FAB, Card, Chip, Dialog." />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 22 }}>
        {items.map(({ id, label, icon }) => (
          <button key={id} onClick={() => setActive(id)} style={{
            padding: "8px 14px", borderRadius: 6, cursor: "pointer",
            border: `1px solid ${active === id ? content[id].color : G.border}`,
            background: active === id ? `${content[id].color}18` : "transparent",
            color: active === id ? content[id].color : G.muted,
            fontSize: 12, fontFamily: "monospace", transition: "all 0.2s"
          }}>{icon} {label}</button>
        ))}
      </div>
      <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 10, padding: "20px 22px" }}>
        <div style={{ marginBottom: 14 }}>
          <Badge label="composable" color={c.color} />
          <h3 style={{ margin: "10px 0 6px", fontSize: 17, fontWeight: 800, color: c.color, fontFamily: "'Georgia', serif" }}>{c.title}</h3>
          <p style={{ margin: 0, fontSize: 13, color: G.muted, lineHeight: 1.6 }}>{c.desc}</p>
        </div>
        <div style={{ fontSize: 11, color: G.accent, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Key Parameters</div>
        <div style={{ marginBottom: 16 }}>
          {c.params.map(([name, desc]) => (
            <div key={name} style={{ display: "flex", gap: 12, fontSize: 12, padding: "6px 0", borderBottom: `1px solid ${G.faint}` }}>
              <span style={{ color: c.color, fontFamily: "monospace", minWidth: 150, flexShrink: 0 }}>{name}</span>
              <span style={{ color: G.muted }}>{desc}</span>
            </div>
          ))}
        </div>
        <Code code={c.code} />
      </div>
    </div>
  );
}


export default function Lecture2Guide() {
  const [active, setActive] = useState("overview");
  const navigate = useNavigate();
  const renderSection = () => {
    switch (active) {
      case "overview": return <OverviewSection />;
      case "paradigm": return <ParadigmSection />;
      case "phases": return <PhasesSection />;
      case "lesson1": return <Lesson1Section />;
      case "lesson2": return <Lesson2Section />;
      case "lesson3": return <Lesson3Section />;
    }
  };
  return (
    <div style={{ background: G.bg, minHeight: "100vh", fontFamily: "'Trebuchet MS', Tahoma, sans-serif", color: G.text, display: "flex", flexDirection: "column" }}>
      <div style={{ background: G.panel, borderBottom: `1px solid ${G.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: G.accentGlow, border: `1px solid ${G.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
        <div>
          <div style={{ fontSize: 11, color: G.muted, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "monospace" }}>Android · Kotlin · Jetpack</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: G.text, letterSpacing: "-0.3px" }}>Lecture 2 — Introduction to Jetpack Compose</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <span style={{ cursor: "pointer",fontSize: 11, background: G.amberBg, color: G.amber, border: `1px solid ${G.amber}30`, padding: "3px 10px", borderRadius: 20, fontFamily: "monospace" }}>Series Begins →</span>
          <span onClick={()=>navigate("/Lecture03")} style={{ cursor: "pointer", fontSize: 11, background: G.tealBg, color: G.teal, border: `1px solid ${G.teal}30`, padding: "3px 10px", borderRadius: 20, fontFamily: "monospace" }}>Lecture 3: State Management →</span>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: 200, flexShrink: 0, background: G.panel, borderRight: `1px solid ${G.border}`, padding: "16px 0" }}>
          {sections.map(({ id, icon, label }) => (
            <button key={id} onClick={() => setActive(id)} style={{
              width: "100%", border: "none", cursor: "pointer",
              padding: "11px 18px", textAlign: "left",
              borderLeft: `3px solid ${active === id ? G.accent : "transparent"}`,
              background: active === id ? G.accentGlow : "transparent",
              transition: "all 0.15s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                <span style={{ fontSize: 12, color: active === id ? G.accent : G.muted, fontWeight: active === id ? 700 : 400, fontFamily: "monospace" }}>{label}</span>
              </div>
            </button>
          ))}
          <div style={{ margin: "20px 16px 10px", padding: "12px", background: G.card, border: `1px solid ${G.border}`, borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: G.muted, letterSpacing: "1px", marginBottom: 6, textTransform: "uppercase" }}>Next Lectures</div>
            {["Lecture 3: State Mgmt", "Lecture 4: Navigation"].map(l => (
              <div key={l} style={{ fontSize: 11, padding: "4px 0", borderBottom: `1px solid ${G.faint}`, color: "#2A402A" }}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px", maxWidth: 860 }}>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}