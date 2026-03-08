import { useState, useEffect, useRef } from "react";

// ─── ROUTER (state-based, mirrors react-router-dom API) ───────────────────────
function useRouter() {
  const [route, setRoute] = useState("/");
  const navigate = (path) => { setRoute(path); window.scrollTo(0, 0); };
  return { route, navigate };
}

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  ink:      "#0E1A0E",
  forest:   "#0A3622",
  mid:      "#1B5E38",
  sage:     "#4A8C6A",
  mist:     "#D6EAE0",
  cream:    "#F8F4EE",
  parchment:"#EEE8DC",
  gold:     "#B5822A",
  goldLight:"#E8C97A",
  white:    "#FFFFFF",
  muted:    "#6B7A6B",
  faint:    "#E4DDD2",
  codeBg:   "#F0F5F1",
  codeText: "#0E2A18",
  border:   "#D8D0C4",
};

const font = { display: "'Georgia', 'Cambria', 'Times New Roman', serif", mono: "'Fira Code', 'Cascadia Code', 'Consolas', monospace", body: "'Trebuchet MS', 'Lucida Grande', Tahoma, sans-serif" };

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const Code = ({ code }) => (
  <pre style={{ background: T.codeBg, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.mid}`, borderRadius: 6, padding: "13px 15px", margin: "10px 0", overflowX: "auto", fontSize: 11.5, lineHeight: 1.8, color: T.codeText, fontFamily: font.mono, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
    <code>{code}</code>
  </pre>
);
const Note = ({ children, type = "tip" }) => {
  const map = { tip: [T.mid, "💡"], warn: [T.gold, "⚠️"], info: ["#1D4ED8", "ℹ️"], good: [T.forest, "✅"] };
  const [c, icon] = map[type];
  return <div style={{ background: `${c}0D`, border: `1px solid ${c}35`, borderLeft: `3px solid ${c}`, borderRadius: 6, padding: "11px 14px", margin: "12px 0", fontSize: 13, color: T.ink, lineHeight: 1.65, fontFamily: font.body }}><span style={{ marginRight: 8 }}>{icon}</span>{children}</div>;
};
const Divider = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0 16px" }}>
    <div style={{ flex: 1, height: 1, background: T.faint }} />
    {label && <span style={{ fontSize: 10, color: T.muted, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: font.mono, whiteSpace: "nowrap" }}>{label}</span>}
    <div style={{ flex: 1, height: 1, background: T.faint }} />
  </div>
);
const Pill = ({ label, active, color, onClick }) => (
  <button onClick={onClick} style={{ padding: "6px 15px", borderRadius: 20, cursor: "pointer", border: `1.5px solid ${active ? color : T.border}`, background: active ? `${color}12` : T.white, color: active ? color : T.muted, fontSize: 12, fontFamily: font.mono, fontWeight: active ? 700 : 400, transition: "all 0.18s", outline: "none" }}>{label}</button>
);

// ─── LECTURE SHELLS ───────────────────────────────────────────────────────────
function LectureShell({ title, icon, subtitle, sections, renderSection, color, onBack }) {
  const [active, setActive] = useState(sections[0].id);
  return (
    <div style={{ background: T.cream, minHeight: "100vh", fontFamily: font.body, color: T.ink, display: "flex", flexDirection: "column" }}>
      <div style={{ background: T.white, borderBottom: `1px solid ${T.border}`, padding: "12px 24px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <button onClick={onBack} style={{ background: `${color}12`, border: `1.5px solid ${color}30`, color, borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontFamily: font.mono, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>← Back</button>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}12`, border: `1.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 10, color: T.muted, letterSpacing: "2px", textTransform: "uppercase", fontFamily: font.mono }}>Android · Kotlin · Jetpack Compose</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: T.ink, letterSpacing: "-0.3px", fontFamily: font.display }}>{title}</div>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: 200, flexShrink: 0, background: T.white, borderRight: `1px solid ${T.border}`, padding: "16px 0", overflowY: "auto" }}>
          {sections.map(({ id, icon: si, label }) => (
            <button key={id} onClick={() => setActive(id)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "10px 18px", textAlign: "left", borderLeft: `3px solid ${active === id ? color : "transparent"}`, background: active === id ? `${color}0F` : "transparent", transition: "all 0.15s", outline: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ fontSize: 13 }}>{si}</span>
                <span style={{ fontSize: 11.5, color: active === id ? color : T.muted, fontWeight: active === id ? 700 : 400, fontFamily: font.mono }}>{label}</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "30px 34px", maxWidth: 820 }}>
          {renderSection(active)}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LECTURE 2 — JETPACK COMPOSE BASICS
// ══════════════════════════════════════════════════════════════════════════════
const L2_SECTIONS = [
  { id: "overview",  icon: "⚡", label: "Compose vs XML" },
  { id: "paradigm",  icon: "🔄", label: "Declarative Paradigm" },
  { id: "phases",    icon: "🎯", label: "Three Phases" },
  { id: "components",icon: "🧩", label: "Basic Components" },
  { id: "layouts",   icon: "📐", label: "Layouts" },
  { id: "composables",icon: "🏗️",label: "Key Composables" },
];

function L2Section({ id }) {
  const SH = ({ title, badge, subtitle }) => (
    <div style={{ marginBottom: 22, borderBottom: `1px solid ${T.faint}`, paddingBottom: 18 }}>
      {badge && <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, border: `1px solid ${T.mid}50`, color: T.mid, background: `${T.mid}10`, letterSpacing: "0.8px", textTransform: "uppercase", fontWeight: 700, fontFamily: font.mono }}>{badge}</span>}
      <h2 style={{ margin: "8px 0 6px", fontSize: 21, fontWeight: 800, color: T.ink, letterSpacing: "-0.4px", fontFamily: font.display }}>{title}</h2>
      {subtitle && <p style={{ margin: 0, fontSize: 13.5, color: T.muted, lineHeight: 1.65, fontFamily: font.body }}>{subtitle}</p>}
    </div>
  );

  if (id === "overview") return (
    <div>
      <SH title="Jetpack Compose vs XML Views" badge="Lecture 2 · Overview" subtitle="The fundamental shift from imperative mutation to declarative description." />
      <Note type="info">You're an experienced dev — the key shift is from <strong>mutating objects</strong> to <strong>describing state</strong>. Think React, but for native Android.</Note>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead><tr>{["Dimension","XML","Jetpack Compose"].map(h => <th key={h} style={{ padding: "9px 13px", textAlign: "left", background: T.parchment, color: T.muted, fontSize: 10.5, letterSpacing: "1px", textTransform: "uppercase", borderBottom: `1px solid ${T.border}`, fontFamily: font.mono }}>{h}</th>)}</tr></thead>
          <tbody>{[
            ["Paradigm","Imperative — mutate view objects","Declarative — describe UI as state"],
            ["Language","XML + Java/Kotlin","100% Kotlin"],
            ["UI Updates","Manual .setText(), .setVisibility()","Automatic recomposition"],
            ["Reactivity","Manual listeners needed","Built-in state observation"],
            ["Performance","Can bottleneck on complex UIs","Optimized smart recomposition"],
            ["Testing","Needs Espresso + device","ComposeTestRule, unit testable"],
          ].map(([d,o,n], i) => (
            <tr key={d} style={{ borderBottom: `1px solid ${T.faint}`, background: i%2===0?"transparent":T.parchment+"55" }}>
              <td style={{ padding: "9px 13px", color: T.mid, fontWeight: 700, fontFamily: font.mono, fontSize: 11.5 }}>{d}</td>
              <td style={{ padding: "9px 13px", color: T.muted }}>{o}</td>
              <td style={{ padding: "9px 13px", color: T.ink, fontWeight: 600 }}>{n}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <Divider label="side by side" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div><div style={{ fontSize: 11.5, fontWeight: 700, color: "#BE123C", fontFamily: font.mono, marginBottom: 4 }}>❌ XML Imperative</div><Code code={`// find view → mutate it
val tv = findViewById<TextView>(id)
tv.text = "Hello"
tv.visibility = View.VISIBLE
// update later... manually
tv.text = "Updated!"`} /></div>
        <div><div style={{ fontSize: 11.5, fontWeight: 700, color: T.mid, fontFamily: font.mono, marginBottom: 4 }}>✅ Compose Declarative</div><Code code={`// just describe what it looks like
@Composable
fun Greeting(name: String) {
    Text(text = "Hello \$name!")
    // state changes → auto re-renders
}`} /></div>
      </div>
    </div>
  );

  if (id === "paradigm") return (
    <div>
      <SH title="Declarative Paradigm" badge="Lecture 2 · Core Concept" subtitle="Every UI update in Compose follows the same reactive loop." />
      <Note type="tip">Change state → Compose detects it → only affected composables recompose. You never call 'redraw'. The runtime handles it.</Note>
      {[{n:1,c:T.mid,t:"State exists",d:"App holds state: a list, counter, user object. State is the single source of truth."},{n:2,c:"#1D4ED8",t:"Composable reads state",d:"A @Composable function reads that state and describes the UI. It's called during initial composition."},{n:3,c:T.gold,t:"User interacts",d:"onClick, onValueChange etc. fire. The event handler mutates state."},{n:4,c:"#7C3AED",t:"Recomposition",d:"Compose detects the state change and calls the composable AGAIN with new data. Only changed nodes recompose."}].map(({n,c,t,d}) => (
        <div key={n} style={{ display: "flex", gap: 14, marginBottom: 12, padding: "13px 15px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${c}15`, border: `1.5px solid ${c}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: c, flexShrink: 0, fontFamily: font.mono }}>{n}</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 700, color: c, fontFamily: font.mono, marginBottom: 3 }}>{t}</div><div style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.6 }}>{d}</div></div>
        </div>
      ))}
      <Code code={`@Composable
fun MessageCard(name: String) {
    // Describe the UI — no mutations
    Text(text = "Hello \$name!")
}
// Same function, different args → different UI
// No .setText() needed`} />
    </div>
  );

  if (id === "phases") return (
    <div>
      <SH title="Three Phases of a Frame" badge="Lecture 2 · Internals" subtitle="Every frame Compose renders goes through Composition → Layout → Drawing in sequence." />
      {[
        {n:"01",icon:"🧩",c:T.mid,name:"Composition",desc:"Runtime executes @Composable functions and builds a UI tree of layout nodes. This is your 'description' of the UI."},
        {n:"02",icon:"📐",c:"#1D4ED8",name:"Layout",desc:"UI tree is traversed. Each node measures children → decides own size → places children at x,y coordinates. Single-pass = fast."},
        {n:"03",icon:"🎨",c:"#7C3AED",name:"Drawing",desc:"Tree traversed again top-to-bottom. Each node draws itself onto a Canvas. Children draw on top of parents."},
      ].map(({n,icon,c,name,desc}) => (
        <div key={n} style={{ marginBottom: 14, background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${c}` }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 22 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 10, color: c, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: font.mono, marginBottom: 3 }}>Phase {n}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: c, fontFamily: font.display, marginBottom: 6 }}>{name}</div>
              <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.65 }}>{desc}</div>
            </div>
          </div>
        </div>
      ))}
      <Note type="warn">Modifier <strong>order matters</strong> because it determines which phase each modifier affects. <code>padding().background()</code> ≠ <code>background().padding()</code>.</Note>
    </div>
  );

  if (id === "components") return (
    <div>
      <SH title="Basic Components" badge="Lesson 1" subtitle="Text, Buttons, Images, Icons — the atoms of every Compose UI." />
      {[
        {name:"Text",color:T.mid,code:`Text(
    text = "Hello World",
    style = MaterialTheme.typography.headlineMedium,
    fontWeight = FontWeight.Bold,
    maxLines = 2,
    overflow = TextOverflow.Ellipsis
)`},
        {name:"Button (5 types)",color:"#1D4ED8",code:`Button(onClick = { })        { Text("Filled") }
OutlinedButton(onClick = { }) { Text("Outlined") }
TextButton(onClick = { })     { Text("Text") }
ElevatedButton(onClick = { }) { Text("Elevated") }
FilledTonalButton(onClick = { }) { Text("Tonal") }`},
        {name:"Image",color:"#7C3AED",code:`Image(
    painter = painterResource(R.drawable.photo),
    contentDescription = "Avatar",
    modifier = Modifier.size(64.dp).clip(CircleShape),
    contentScale = ContentScale.Crop
)
// Remote:
AsyncImage(model = url, contentDescription = null)`},
        {name:"Icon",color:T.gold,code:`Icon(
    imageVector = Icons.Default.Home,
    contentDescription = "Home",
    modifier = Modifier.size(24.dp),
    tint = MaterialTheme.colorScheme.primary
)`},
      ].map(({name,color,code}) => (
        <div key={name} style={{ marginBottom: 14, background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "9px 14px", background: `${color}10`, borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color, fontFamily: font.mono }}>{name}</span>
          </div>
          <div style={{ padding: "0 12px 6px" }}><Code code={code} /></div>
        </div>
      ))}
    </div>
  );

  if (id === "layouts") return (
    <div>
      <SH title="Layouts" badge="Lesson 2" subtitle="Column, Row, Box, LazyColumn — plus Modifiers." />
      <Note type="warn"><strong>Modifier ORDER matters!</strong> <code>Modifier.padding(16.dp).background(Blue)</code> ≠ <code>Modifier.background(Blue).padding(16.dp)</code> — they produce different results visually.</Note>
      {[
        {name:"Column",c:T.mid,desc:"Vertical stack",code:`Column(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalAlignment = Alignment.CenterHorizontally) { Text("A"); Text("B"); Text("C") }`},
        {name:"Row",c:"#1D4ED8",desc:"Horizontal stack",code:`Row(horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) { Text("Left"); Text("Right") }`},
        {name:"Box",c:"#7C3AED",desc:"Overlay / Z-stack",code:`Box(contentAlignment = Alignment.Center) { Image(painter, null, Modifier.fillMaxSize()); Text("Overlay", color = Color.White) }`},
        {name:"LazyColumn",c:T.gold,desc:"Efficient list (like RecyclerView)",code:`LazyColumn(contentPadding = PaddingValues(16.dp)) { items(list, key = { it.id }) { item -> ItemRow(item) } }`},
      ].map(({name,c,desc,code}) => (
        <div key={name} style={{ marginBottom: 12, background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "9px 14px", background: `${c}0F`, borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: c, fontFamily: font.mono }}>{name}</span>
            <span style={{ fontSize: 11, color: T.muted }}>{desc}</span>
          </div>
          <div style={{ padding: "0 12px 6px" }}><Code code={code} /></div>
        </div>
      ))}
    </div>
  );

  if (id === "composables") return (
    <div>
      <SH title="Key Composables" badge="Lesson 3" subtitle="Scaffold, Surface, Card, FAB, Chip, Dialog — building complete screens." />
      <Code code={`// Full screen structure with Scaffold
@Composable
fun HomeScreen() {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Home") }) },
        floatingActionButton = {
            FloatingActionButton(onClick = { }) {
                Icon(Icons.Default.Add, "Add")
            }
        }
    ) { padding ->
        LazyColumn(modifier = Modifier.padding(padding)) {
            items(list) { item ->
                Card(
                    modifier = Modifier.fillMaxWidth().padding(8.dp),
                    onClick = { navigate(item.id) }
                ) {
                    Text(item.title, Modifier.padding(16.dp))
                }
            }
        }
    }
}`} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[["Surface","Wraps content with bg, elevation, shape",T.mid],["Scaffold","Wires TopBar+FAB+content+insets","#1D4ED8"],["Card","Material container, click support","#7C3AED"],["FloatingActionButton","Primary action, 4 size variants",T.gold],["Chip","Tags: Assist/Filter/Input/Suggestion",T.sage],["AlertDialog","Modal confirm/input dialogs","#BE123C"]].map(([n,d,c]) => (
          <div key={n} style={{ padding: "11px 13px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: c, fontFamily: font.mono, marginBottom: 3 }}>{n}</div>
            <div style={{ fontSize: 11.5, color: T.muted, lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
  return null;
}

// ══════════════════════════════════════════════════════════════════════════════
// LECTURE 3 — STATE MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════
const L3_SECTIONS = [
  { id: "whatisstate",  icon: "📦", label: "What is State?" },
  { id: "remember",     icon: "🧠", label: "remember API" },
  { id: "mutablestate", icon: "🔀", label: "Mutable State" },
  { id: "lifecycle",    icon: "♻️", label: "Activity Lifecycle" },
  { id: "saveable",     icon: "💾", label: "rememberSaveable" },
  { id: "hoisting",     icon: "🏗️", label: "State Hoisting" },
];

function L3Section({ id }) {
  const SH = ({ title, badge, subtitle }) => (
    <div style={{ marginBottom: 22, borderBottom: `1px solid ${T.faint}`, paddingBottom: 18 }}>
      {badge && <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, border: `1px solid #1D4ED850`, color: "#1D4ED8", background: "#1D4ED810", letterSpacing: "0.8px", textTransform: "uppercase", fontWeight: 700, fontFamily: font.mono }}>{badge}</span>}
      <h2 style={{ margin: "8px 0 6px", fontSize: 21, fontWeight: 800, color: T.ink, letterSpacing: "-0.4px", fontFamily: font.display }}>{title}</h2>
      {subtitle && <p style={{ margin: 0, fontSize: 13.5, color: T.muted, lineHeight: 1.65 }}>{subtitle}</p>}
    </div>
  );
  const blue = "#1D4ED8";

  if (id === "whatisstate") return (
    <div>
      <SH title="What is State?" badge="Lecture 3 · Foundations" subtitle="Any value that can change over time. The UI is always a function of state." />
      <Note type="info">In Compose, <strong>UI = f(state)</strong>. Change the state → Compose automatically re-renders. You never manually call "update the text view".</Note>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {[["💬","Chat messages","New message arrives → list updates",blue],["🖼️","Profile photo","User uploads new avatar → image updates",T.gold],["📜","Scroll position","User scrolls → position value changes","#7C3AED"],["🔢","Counter","Button tap → integer increments",T.mid]].map(([i,t,d,c]) => (
          <div key={t} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, padding: "13px 15px", display: "flex", gap: 12 }}>
            <span style={{ fontSize: 22 }}>{i}</span>
            <div><div style={{ fontSize: 12.5, fontWeight: 700, color: c, fontFamily: font.mono, marginBottom: 3 }}>{t}</div><div style={{ fontSize: 12, color: T.muted, lineHeight: 1.4 }}>{d}</div></div>
          </div>
        ))}
      </div>
      <Code code={`// ❌ Plain variable — Compose never sees it change
var count = 0
Button(onClick = { count++ }) { Text("Count: \$count") }  // always shows 0

// ✅ mutableStateOf — Compose watches this, triggers recomposition
var count by remember { mutableStateOf(0) }
Button(onClick = { count++ }) { Text("Count: \$count") }  // updates! ✓`} />
    </div>
  );

  if (id === "remember") return (
    <div>
      <SH title="The remember API" badge="Lecture 3 · Memory" subtitle="Stores a value across recompositions — without it, variables reset to their initial value every time the composable re-runs." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: "#BE123C0A", border: "1px solid #BE123C25", borderRadius: 9, padding: "14px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#BE123C", fontFamily: font.mono, marginBottom: 8 }}>❌ Without remember</div>
          <Code code={`var count by mutableStateOf(0)
// Re-initialized to 0 every
// recomposition → stuck at 0`} />
        </div>
        <div style={{ background: `${T.mid}0A`, border: `1px solid ${T.mid}25`, borderRadius: 9, padding: "14px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.mid, fontFamily: font.mono, marginBottom: 8 }}>✅ With remember</div>
          <Code code={`var count by remember {
    mutableStateOf(0)
}
// Stored in Composition ✓
// Survives recomposition ✓`} />
        </div>
      </div>
      <Divider label="remember variants" />
      <Code code={`// No key — computed once forever
val result = remember { expensiveComputation() }

// With key — recomputed when userId changes
val greeting = remember(userId) { "Hi, \${loadName(userId)}" }

// CoroutineScope for launching in event handlers
val scope = rememberCoroutineScope()
Button(onClick = { scope.launch { repo.save(data) } }) { Text("Save") }`} />
    </div>
  );

  if (id === "mutablestate") return (
    <div>
      <SH title="Three Syntax Forms of MutableState" badge="Lecture 3 · State Declaration" subtitle="All equivalent at runtime. Choose based on readability." />
      {[
        {label:"val + .value (explicit)",color:T.mid,code:`val count = remember { mutableStateOf(0) }
// read: count.value   write: count.value++`},
        {label:"var by (delegate) ← recommended",color:blue,code:`var count by remember { mutableStateOf(0) }
// read: count   write: count++
// Feels like a plain Kotlin variable`},
        {label:"val (destructured pair)",color:T.gold,code:`val (count, setCount) = remember { mutableStateOf(0) }
// read: count   write: setCount(count + 1)`},
      ].map(({label,color,code}) => (
        <div key={label} style={{ marginBottom: 12, background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, overflow: "hidden" }}>
          <div style={{ padding: "9px 13px", background: `${color}0F`, borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color, fontFamily: font.mono }}>{label}</span>
          </div>
          <div style={{ padding: "0 12px 6px" }}><Code code={code} /></div>
        </div>
      ))}
      <Note type="tip">Also use <code>mutableStateListOf()</code> for reactive lists — structural changes (add/remove) trigger recomposition automatically.</Note>
    </div>
  );

  if (id === "lifecycle") return (
    <div>
      <SH title="Activity Lifecycle" badge="Lecture 3 · Lifecycle" subtitle="Compose lives inside an Activity. Configuration changes destroy & recreate it — wiping remember{} state." />
      <Note type="warn"><strong>Rotation wipes remember!</strong> Android calls onDestroy() then onCreate() on rotation. All remember state is gone. Use rememberSaveable to survive this.</Note>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {[
          ["onCreate()","Activity created. setContent{} goes here. Build your Compose tree.",T.mid],
          ["onStart()","Visible but not interactive. StateFlows begin collection.",blue],
          ["onResume()","Foreground & interactive. collectAsStateWithLifecycle() active.","#059669"],
          ["onPause()","Partially obscured. collectAsStateWithLifecycle() pauses.",T.gold],
          ["onStop()","Completely hidden. Release heavy resources.","#D97706"],
          ["onDestroy()","⚠️ Activity destroyed. remember{} LOST. Triggered by rotation!","#BE123C"],
        ].map(([name,desc,c]) => (
          <div key={name} style={{ display: "flex", gap: 14, padding: "11px 14px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 7, borderLeft: `3px solid ${c}` }}>
            <code style={{ fontSize: 11.5, fontWeight: 700, color: c, fontFamily: font.mono, minWidth: 115, flexShrink: 0 }}>{name}</code>
            <span style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.5 }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (id === "saveable") return (
    <div>
      <SH title="rememberSaveable" badge="Lecture 3 · Persistence" subtitle="Survives recompositions AND configuration changes (rotation, dark mode, language switch)." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          {label:"var x = 0",c:"#BE123C",ok:[],fail:["Recomposition","Rotation","Process death"]},
          {label:"remember { }",c:T.gold,ok:["Recomposition ✓"],fail:["Rotation ✗","Process death ✗"]},
          {label:"rememberSaveable",c:T.mid,ok:["Recomposition ✓","Rotation ✓","Process death ✓"],fail:[]},
        ].map(({label,c,ok,fail}) => (
          <div key={label} style={{ background: T.white, border: `1.5px solid ${c}30`, borderRadius: 9, padding: "13px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: c, fontFamily: font.mono, marginBottom: 8 }}>{label}</div>
            {ok.map(o => <div key={o} style={{ fontSize: 11, color: T.mid, padding: "2px 0" }}>✓ {o}</div>)}
            {fail.map(f => <div key={f} style={{ fontSize: 11, color: "#BE123C", padding: "2px 0" }}>✗ {f}</div>)}
          </div>
        ))}
      </div>
      <Code code={`// Drop-in replacement for remember
var count by rememberSaveable { mutableStateOf(0) }
var name  by rememberSaveable { mutableStateOf("") }

// Saved to Bundle automatically for primitives + @Parcelize classes
// Survives rotation, language change, dark/light mode toggle`} />
    </div>
  );

  if (id === "hoisting") return (
    <div>
      <SH title="State Hoisting" badge="Lecture 3 · Architecture" subtitle="Move state up to a common ancestor. Composables become stateless, reusable, and testable." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div style={{ background: "#BE123C0A", border: "1px solid #BE123C25", borderRadius: 9, padding: "14px 16px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#BE123C", fontFamily: font.display, marginBottom: 8 }}>🔒 Stateful (avoid)</div>
          <Code code={`@Composable
fun Counter() {
    var count by remember {
        mutableStateOf(0)
    }
    Button(onClick = {count++}){
        Text("Count: \$count")
    }
}
// Hard to test, reuse, share`} />
        </div>
        <div style={{ background: `${T.mid}0A`, border: `1px solid ${T.mid}25`, borderRadius: 9, padding: "14px 16px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: T.mid, fontFamily: font.display, marginBottom: 8 }}>🧊 Stateless (preferred)</div>
          <Code code={`@Composable
fun Counter(
    count: Int,
    onIncrement: () -> Unit
) {
    Button(onClick = onIncrement){
        Text("Count: \$count")
    }
}
// Testable, reusable, flexible`} />
        </div>
      </div>
      <Note type="tip">The pattern: replace state with two params — <code>value: T</code> (read) and <code>onValueChange: (T) → Unit</code> (write). State lives in the parent (or ViewModel).</Note>
      <Code code={`// ViewModel owns the state — survives rotation
@HiltViewModel
class CounterViewModel @Inject constructor() : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()
    fun increment() { _count.value++ }
}

// Screen is fully stateless
@Composable
fun CounterScreen(viewModel: CounterViewModel = hiltViewModel()) {
    val count by viewModel.count.collectAsStateWithLifecycle()
    Counter(count = count, onIncrement = viewModel::increment)
}`} />
    </div>
  );
  return null;
}

// ══════════════════════════════════════════════════════════════════════════════
// LECTURE 4 — NAVIGATION
// ══════════════════════════════════════════════════════════════════════════════
const L4_SECTIONS = [
  { id: "intents",   icon: "📨", label: "Intents" },
  { id: "explicit",  icon: "🎯", label: "Explicit Intents" },
  { id: "implicit",  icon: "🌐", label: "Implicit Intents" },
  { id: "overview",  icon: "🗺️", label: "Nav Overview" },
  { id: "setup",     icon: "⚙️", label: "Step 1 – Setup" },
  { id: "navhost",   icon: "🏠", label: "Steps 2–4 NavHost" },
  { id: "navigate",  icon: "➡️", label: "Step 5 – Navigate" },
  { id: "args",      icon: "📦", label: "Arguments" },
];

const SH = ({ title, badge, subtitle }) => (
  <div style={{ marginBottom: 22, borderBottom: `1px solid ${T.faint}`, paddingBottom: 18 }}>
    {badge && <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, border: `1px solid ${T.gold}50`, color: T.gold, background: `${T.gold}10`, letterSpacing: "0.8px", textTransform: "uppercase", fontWeight: 700, fontFamily: font.mono }}>{badge}</span>}
    {subtitle && <p style={{ margin: 0, fontSize: 13.5, color: T.muted, lineHeight: 1.65 }}>{subtitle}</p>}
  </div>
);

function L4Section({ id }) {
  const violet = "#6D28D9";

  if (id === "intents") return (
    <div>
      <SH title="Intents — Android Messaging" badge="Lecture 4 · Foundations" subtitle="The system for communicating between Android components. Still essential for opening external apps." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          {t:"Explicit Intent",icon:"🎯",c:T.gold,desc:"You name the exact destination class. Used for internal navigation between your own Activities.",use:["Navigate to DetailActivity","Open SettingsActivity","Start your own Service"]},
          {t:"Implicit Intent",icon:"🌐",c:T.mid,desc:"You describe what you want to do. Android finds the right installed app.",use:["Open URL in browser","Dial a phone number","Share text/image","Open camera"]},
        ].map(({t,icon,c,desc,use}) => (
          <div key={t} style={{ background: `${c}08`, border: `1.5px solid ${c}30`, borderRadius: 9, padding: "15px 17px" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: c, fontFamily: font.display, marginBottom: 7 }}>{t}</div>
            <p style={{ margin: "0 0 10px", fontSize: 12.5, color: T.muted, lineHeight: 1.6 }}>{desc}</p>
            {use.map(u => <div key={u} style={{ fontSize: 12, color: T.slate, padding: "2px 0" }}>• {u}</div>)}
          </div>
        ))}
      </div>
      <Code code={`// Intent structure
val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://example.com"))
// action: what to do
// data:   what to operate on (Uri)
// extras: additional key-value data (putExtra)
// component: explicit target class (Explicit only)`} />
    </div>
  );

  if (id === "explicit") return (
    <div>
      <SH title="Explicit Intents" badge="Lecture 4 · Intents" subtitle="Launch a specific Activity class — for navigation within your own app." />
      <Code code={`// Launch another Activity
@Composable
fun HomeScreen() {
    val context = LocalContext.current
    Button(onClick = {
        val intent = Intent(context, DetailActivity::class.java)
        intent.putExtra("ITEM_ID", "item_42")
        context.startActivity(intent)
    }) { Text("Open Detail") }
}

// Receive data in destination Activity
class DetailActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val itemId = intent.getStringExtra("ITEM_ID") ?: ""
        setContent { DetailScreen(itemId) }
    }
}

// Modern: get result back (replaces startActivityForResult)
val launcher = rememberLauncherForActivityResult(
    ActivityResultContracts.StartActivityForResult()
) { result ->
    if (result.resultCode == Activity.RESULT_OK) {
        val data = result.data?.getStringExtra("RESULT")
    }
}`} />
    </div>
  );

  if (id === "implicit") return (
    <div>
      <SH title="Implicit Intents" badge="Lecture 4 · Intents" subtitle="Let the OS route to the right app. Always check resolveActivity first to avoid crashes." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          ["Open URL","#1D4ED8",`Intent(ACTION_VIEW, Uri.parse("https://example.com"))`],
          ["Dial number",T.mid,`Intent(ACTION_DIAL, Uri.parse("tel:+1234567890"))`],
          ["Share text",violet,`Intent(ACTION_SEND).apply { type = "text/plain"; putExtra(EXTRA_TEXT, "text") }`],
          ["Camera",T.gold,`rememberLauncherForActivityResult(TakePicturePreview()) { bitmap -> }`],
        ].map(([label,c,code]) => (
          <div key={label} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "7px 12px", background: `${c}0F`, borderBottom: `1px solid ${T.border}` }}><span style={{ fontSize: 11.5, fontWeight: 700, color: c, fontFamily: font.mono }}>{label}</span></div>
            <div style={{ padding: "0 10px 4px" }}><Code code={code} /></div>
          </div>
        ))}
      </div>
      <Note type="warn">Always check <code>intent.resolveActivity(packageManager) != null</code> before calling startActivity — crash if no app handles it.</Note>
    </div>
  );

  if (id === "overview") return (
    <div>
      <SH title="Navigation Component Overview" badge="Lecture 4 · Navigation" subtitle="Single-Activity pattern: one Activity, many composable screens connected by Jetpack Navigation." />
      <Note type="info">Modern Android apps use a <strong>single Activity</strong>. One Activity, many composable screens, all wired by Navigation Compose. No more startActivity() for internal navigation.</Note>
      {[
        {icon:"🗺️",c:T.gold,name:"Navigation Graph",desc:"Defines ALL destinations and possible paths. In Compose, this is a Kotlin DSL inside NavHost — no XML needed."},
        {icon:"🖼️",c:T.mid,name:"NavHost",desc:"A composable that acts as a container. Swaps in the current destination's composable as the user navigates. Like a picture frame — frame stays, picture changes."},
        {icon:"🕹️",c:violet,name:"NavController",desc:"Kotlin object tracking current position (back stack). Call navigate(route) to push, popBackStack() to pop. Created once at root with rememberNavController()."},
      ].map(({icon,c,name,desc}) => (
        <div key={name} style={{ marginBottom: 12, display: "flex", gap: 14, padding: "14px 16px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, borderLeft: `4px solid ${c}` }}>
          <span style={{ fontSize: 24 }}>{icon}</span>
          <div><div style={{ fontSize: 13.5, fontWeight: 800, color: c, fontFamily: font.display, marginBottom: 5 }}>{name}</div><div style={{ fontSize: 13, color: T.muted, lineHeight: 1.65 }}>{desc}</div></div>
        </div>
      ))}
    </div>
  );

  if (id === "setup") return (
    <div>
      <SH title="Step 1 — Setup" badge="Lecture 4 · Step 1 of 5" subtitle="Add dependencies. Use Navigation 2.8+ for type-safe routes." />
      <Code code={`// build.gradle.kts
dependencies {
    implementation(libs.androidx.navigation.compose) // 2.8+
    implementation(libs.kotlinx.serialization.json)
}

plugins {
    alias(libs.plugins.kotlinx.serialization)
}`} />
      <Note type="good">Navigation 2.8+ with <code>@Serializable</code> routes catches navigation bugs at <strong>compile time</strong>, not runtime. Always use this over string-based routes.</Note>
      <Divider label="What you get vs don't need" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: `${T.mid}08`, border: `1px solid ${T.mid}25`, borderRadius: 8, padding: "12px 14px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.mid, fontFamily: font.mono, marginBottom: 8 }}>You get</div>
          {["NavController + NavHost","Type-safe navigation DSL","Deep link support","Animated transitions","ViewModel scoping per graph"].map(i => <div key={i} style={{ fontSize: 12, color: T.slate, padding: "2px 0" }}>✓ {i}</div>)}
        </div>
        <div style={{ background: "#BE123C0A", border: "1px solid #BE123C25", borderRadius: 8, padding: "12px 14px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#BE123C", fontFamily: font.mono, marginBottom: 8 }}>No longer needed</div>
          {["Multiple Activities for screens","startActivity() internally","String route literals","Manual back stack","Fragment transactions"].map(i => <div key={i} style={{ fontSize: 12, color: T.muted, padding: "2px 0" }}>✗ {i}</div>)}
        </div>
      </div>
    </div>
  );

  if (id === "navhost") return (
    <div>
      <SH title="Steps 2–4 — NavController & NavHost" badge="Lecture 4 · Steps 2–4 of 5" subtitle="Create NavController once at root. Define @Serializable routes. Wire all screens inside NavHost." />
      <Code code={`// Step 2 — Create NavController ONCE at root
@Composable
fun App() {
    val navController = rememberNavController()  // ✓ once at root
    AppNavHost(navController)
}

// Step 3 — Define type-safe routes
@Serializable object HomeRoute
@Serializable object ListRoute
@Serializable data class DetailRoute(val itemId: String)

// Step 4 — Build NavHost with all destinations
@Composable
fun AppNavHost(navController: NavHostController) {
    NavHost(navController, startDestination = HomeRoute) {

        composable<HomeRoute> {
            HomeScreen(
                onGoToList = { navController.navigate(ListRoute) }
            )
        }

        composable<ListRoute> {
            ListScreen(
                onItemClick = { id -> navController.navigate(DetailRoute(id)) },
                onBack = { navController.popBackStack() }
            )
        }

        composable<DetailRoute> { entry ->
            val route = entry.toRoute<DetailRoute>()
            DetailScreen(itemId = route.itemId, onBack = { navController.popBackStack() })
        }
    }
}`} />
    </div>
  );

  if (id === "navigate") return (
    <div>
      <SH title="Step 5 — Navigating" badge="Lecture 4 · Step 5 of 5" subtitle="Call navigate(), popBackStack(), and use NavOptions to control back stack behaviour." />
      <Code code={`// Basic navigation
navController.navigate(DetailRoute("abc"))   // push to back stack
navController.popBackStack()                 // go back
navController.navigateUp()                   // go up (preferred for Up arrows)

// NavOptions — prevent duplicate screens (critical for bottom nav!)
navController.navigate(HomeRoute) {
    popUpTo(HomeRoute) { saveState = true }
    launchSingleTop = true
    restoreState = true
}

// Pop back to specific destination
navController.popBackStack(route = HomeRoute, inclusive = false)

// Navigate and clear entire back stack (e.g. after login)
navController.navigate(HomeRoute) {
    popUpTo(LoginRoute) { inclusive = true }
}`} />
      <Note type="warn"><code>launchSingleTop = true</code> prevents stacking duplicate screens — <strong>always use this for bottom navigation tabs</strong>.</Note>
    </div>
  );

  if (id === "args") return (
    <div>
      <SH title="Passing Arguments" badge="Lecture 4 · Arguments" subtitle="With type-safe routes, arguments are Kotlin fields on @Serializable data classes — no string parsing." />
      <Code code={`// Define route with typed parameters
@Serializable
data class ProductRoute(
    val productId: String,
    val category: String,
    val showReviews: Boolean = false,   // optional with default
    val page: Int = 1,
)

// Navigate — compile-time checked ✓
navController.navigate(ProductRoute(
    productId = "prod_42",
    category = "Electronics",
    showReviews = true
))

// Receive in NavHost
composable<ProductRoute> { entry ->
    val route = entry.toRoute<ProductRoute>()
    ProductScreen(
        productId   = route.productId,    // String ✓
        category    = route.category,     // String ✓
        showReviews = route.showReviews,  // Boolean ✓
        page        = route.page          // Int ✓
    )
}`} />
      <Note type="tip"><strong>Golden rule:</strong> Pass IDs, not objects. Routes are serialized to URLs internally — keep them small. Load full data in the destination's ViewModel using the ID.</Note>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
        {["String","Int","Long","Boolean","Float","@Serializable class","List<T>","nullable T?","Enum"].map(t => (
          <span key={t} style={{ fontSize: 11, padding: "3px 9px", background: `${violet}12`, color: violet, border: `1px solid ${violet}30`, borderRadius: 4, fontFamily: font.mono }}>{t}</span>
        ))}
      </div>
    </div>
  );
  return null;
}

// ══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════════════════════════════════
function LandingPage({ navigate }) {
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const lectures = [
    {
      route: "/lecture2",
      num: "02",
      title: "Jetpack Compose",
      subtitle: "UI Fundamentals",
      desc: "Master the declarative UI paradigm, the three rendering phases, and build complete interfaces with text, buttons, images, layouts, and Material 3 components.",
      topics: ["Compose vs XML — paradigm shift","Composition → Layout → Drawing","Text, Buttons, Images, Icons","Column, Row, Box, LazyColumn","Modifiers & ordering rules","Scaffold, Cards, Dialogs, FAB"],
      color: T.mid,
      accent: "#2D8F5E",
      icon: "🎨",
      tag: "Foundation",
    },
    {
      route: "/lecture3",
      num: "03",
      title: "State Management",
      subtitle: "Reactive Data Layer",
      desc: "Understand how state drives UI in Compose, master the remember API, survive configuration changes, and architect screens with proper state hoisting and ViewModel integration.",
      topics: ["State as the single source of truth","Event → State → UI reactive loop","remember vs rememberSaveable","Three mutableState syntax forms","Activity lifecycle & rotation","State Hoisting & ViewModel pattern"],
      color: "#1D4ED8",
      accent: "#2563EB",
      icon: "🧠",
      tag: "Architecture",
    },
    {
      route: "/lecture4",
      num: "04",
      title: "Navigation",
      subtitle: "In-App Routing",
      desc: "Navigate between screens with type-safe Jetpack Navigation, handle explicit and implicit intents, implement bottom navigation, deep links, and pass arguments safely.",
      topics: ["Explicit vs Implicit Intents","Single-Activity navigation model","NavController + NavHost setup","@Serializable type-safe routes","Back stack & NavOptions control","Passing arguments between screens"],
      color: T.gold,
      accent: "#C9953A",
      icon: "🧭",
      tag: "Navigation",
    },
  ];

  const stats = [
    { n: "3", label: "Core lectures" },
    { n: "20+", label: "Interactive topics" },
    { n: "60+", label: "Code samples" },
    { n: "100%", label: "Kotlin & Compose" },
  ];

  return (
    <div style={{ background: T.cream, minHeight: "100vh", fontFamily: font.body, color: T.ink, overflowX: "hidden" }}>

      {/* ── NAV BAR ── */}
      <nav style={{ background: T.forest, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: T.goldLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📱</div>
          <span style={{ fontSize: 15, fontWeight: 800, color: T.white, fontFamily: font.display, letterSpacing: "-0.3px" }}>Android Dev</span>
          <span style={{ fontSize: 11, color: T.goldLight, fontFamily: font.mono, background: `${T.goldLight}20`, padding: "2px 8px", borderRadius: 4, letterSpacing: "1px" }}>COURSE</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {lectures.map(l => (
            <button key={l.num} onClick={() => navigate(l.route)} style={{ padding: "6px 14px", borderRadius: 6, cursor: "pointer", background: "transparent", border: `1px solid ${T.white}30`, color: `${T.white}CC`, fontSize: 11.5, fontFamily: font.mono, transition: "all 0.18s" }}
              onMouseEnter={e => { e.target.style.background = `${T.goldLight}20`; e.target.style.color = T.goldLight; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = `${T.white}CC`; }}>
              L{l.num}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(160deg, ${T.forest} 0%, #0E2E1C 55%, #1A3A20 100%)`, padding: "90px 40px 80px", position: "relative", overflow: "hidden" }}>
        {/* background texture dots */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(${T.white} 1px, transparent 1px)`, backgroundSize: "28px 28px", pointerEvents: "none" }} />
        {/* gold accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)` }} />

        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ height: 1, width: 40, background: T.gold }} />
            <span style={{ fontSize: 11, color: T.goldLight, letterSpacing: "3px", textTransform: "uppercase", fontFamily: font.mono }}>Professional Development Series</span>
          </div>

          <h1 style={{ margin: "0 0 20px", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: T.white, fontFamily: font.display, lineHeight: 1.1, letterSpacing: "-1.5px" }}>
            Mobile Application<br />
            <span style={{ color: T.goldLight }}>Development</span> with<br />
            <span style={{ fontStyle: "italic" }}>Jetpack Compose</span>
          </h1>

          <p style={{ margin: "0 0 32px", fontSize: "clamp(14px, 2vw, 17px)", color: `${T.white}CC`, lineHeight: 1.8, maxWidth: 580, fontFamily: font.body }}>
            A comprehensive, production-grade curriculum for experienced developers transitioning to Android. Master Kotlin, Jetpack Compose, and the modern Android architecture — from first composable to shipping on the Play Store.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
            {["Kotlin-first","Material 3","Architecture Components","Type-safe Navigation","ViewModel + StateFlow"].map(tag => (
              <span key={tag} style={{ fontSize: 11.5, padding: "5px 12px", borderRadius: 20, border: `1px solid ${T.white}25`, color: `${T.white}CC`, fontFamily: font.mono }}>{tag}</span>
            ))}
          </div>

          {/* stats row */}
          <div style={{ display: "flex", gap: 0, borderTop: `1px solid ${T.white}15` }}>
            {stats.map(({ n, label }, i) => (
              <div key={n} style={{ flex: 1, paddingTop: 24, paddingRight: 24, borderRight: i < stats.length - 1 ? `1px solid ${T.white}10` : "none" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: T.goldLight, fontFamily: font.display, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11.5, color: `${T.white}80`, marginTop: 4, fontFamily: font.body }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN ── */}
      <section style={{ padding: "64px 40px", background: T.white, borderBottom: `1px solid ${T.faint}` }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: 10, color: T.gold, letterSpacing: "3px", textTransform: "uppercase", fontFamily: font.mono, marginBottom: 6 }}>Why this course</div>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: T.ink, fontFamily: font.display, letterSpacing: "-0.5px" }}>Built for developers, not beginners</h2>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "⚡", title: "Zero fluff", desc: "Assumes you already know programming. Skips 'what is a variable' — jumps straight into Android-specific patterns and production code.", color: T.mid },
              { icon: "📐", title: "Mental models first", desc: "Every concept explained with analogies, diagrams, and 'why this matters' context — not just API documentation copy-paste.", color: "#1D4ED8" },
              { icon: "🏗️", title: "Production patterns", desc: "State hoisting, ViewModel integration, type-safe navigation, testing — the architecture patterns used in real Android codebases.", color: T.gold },
              { icon: "🎯", title: "Hands-on code", desc: "60+ code samples covering every API with real-world use cases, common pitfalls, and the 'right way' clearly highlighted.", color: "#7C3AED" },
              { icon: "🔄", title: "Reactive mindset", desc: "Compose is React for Android. If you know React, Vue, or SwiftUI — we draw direct parallels to accelerate your mental model.", color: T.sage },
              { icon: "🚀", title: "Ship-ready", desc: "From first composable to signed AAB, the course covers the full loop including testing, profiling, and releasing to the Play Store.", color: T.forest },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} style={{ padding: "18px 20px", background: T.cream, border: `1px solid ${T.faint}`, borderRadius: 10 }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 13.5, fontWeight: 800, color, fontFamily: font.display, marginBottom: 7 }}>{title}</div>
                <div style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LECTURE CARDS ── */}
      <section style={{ padding: "72px 40px", background: T.cream }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 10, color: T.gold, letterSpacing: "3px", textTransform: "uppercase", fontFamily: font.mono, marginBottom: 10 }}>Course Curriculum</div>
            <h2 style={{ margin: "0 0 14px", fontSize: 30, fontWeight: 900, color: T.ink, fontFamily: font.display, letterSpacing: "-0.6px" }}>Three Deep-Dive Lectures</h2>
            <p style={{ margin: "0 auto", fontSize: 15, color: T.muted, maxWidth: 480, lineHeight: 1.7 }}>Each lecture is an interactive visual guide — click any topic in the sidebar to explore it with explanations, code samples, and key takeaways.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {lectures.map((lec, i) => {
              const isHov = hovered === i;
              return (
                <div key={lec.num}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ background: T.white, border: `1.5px solid ${isHov ? lec.color : T.border}`, borderRadius: 14, overflow: "hidden", transition: "all 0.25s", transform: isHov ? "translateY(-2px)" : "none", boxShadow: isHov ? `0 12px 40px ${lec.color}18` : "0 2px 8px rgba(0,0,0,0.05)" }}
                >
                  <div style={{ display: "flex", gap: 0 }}>
                    {/* Left accent strip */}
                    <div style={{ width: 5, background: `linear-gradient(180deg, ${lec.color}, ${lec.accent})`, flexShrink: 0 }} />

                    {/* Card body */}
                    <div style={{ flex: 1, padding: "28px 30px" }}>
                      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                        {/* Left info */}
                        <div style={{ flex: 2, minWidth: 220 }}>
                          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                            <span style={{ fontSize: 28 }}>{lec.icon}</span>
                            <div>
                              <div style={{ fontSize: 10, color: lec.color, letterSpacing: "2px", textTransform: "uppercase", fontFamily: font.mono, fontWeight: 700 }}>Lecture {lec.num} · {lec.tag}</div>
                              <div style={{ fontSize: 20, fontWeight: 900, color: T.ink, fontFamily: font.display, letterSpacing: "-0.4px", lineHeight: 1.2 }}>{lec.title}</div>
                              <div style={{ fontSize: 13, color: T.muted, fontStyle: "italic", marginTop: 2 }}>{lec.subtitle}</div>
                            </div>
                          </div>
                          <p style={{ margin: "0 0 18px", fontSize: 13.5, color: T.muted, lineHeight: 1.75 }}>{lec.desc}</p>
                          <button
                            onClick={() => navigate(lec.route)}
                            style={{
                              padding: "11px 26px", borderRadius: 8, cursor: "pointer",
                              background: isHov ? lec.color : `${lec.color}12`,
                              border: `1.5px solid ${lec.color}`,
                              color: isHov ? T.white : lec.color,
                              fontSize: 13, fontWeight: 700, fontFamily: font.mono,
                              letterSpacing: "0.5px", transition: "all 0.22s",
                              display: "flex", alignItems: "center", gap: 8
                            }}>
                            Open Lecture {lec.num} <span style={{ fontSize: 16 }}>→</span>
                          </button>
                        </div>

                        {/* Topic list */}
                        <div style={{ flex: 1, minWidth: 200, background: T.cream, borderRadius: 10, padding: "16px 18px", border: `1px solid ${T.faint}` }}>
                          <div style={{ fontSize: 10, color: T.muted, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: font.mono, marginBottom: 12 }}>Topics covered</div>
                          {lec.topics.map((topic, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "5px 0", borderBottom: j < lec.topics.length - 1 ? `1px solid ${T.faint}` : "none" }}>
                              <div style={{ width: 16, height: 16, borderRadius: "50%", background: `${lec.color}15`, border: `1px solid ${lec.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: lec.color, flexShrink: 0, marginTop: 2, fontWeight: 800, fontFamily: font.mono }}>{j + 1}</div>
                              <span style={{ fontSize: 12, color: T.slate, lineHeight: 1.5 }}>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding: "56px 40px", background: T.parchment, borderTop: `1px solid ${T.faint}` }}>
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: T.gold, letterSpacing: "3px", textTransform: "uppercase", fontFamily: font.mono, marginBottom: 10 }}>Technology Stack</div>
          <h3 style={{ margin: "0 0 28px", fontSize: 20, fontWeight: 800, color: T.ink, fontFamily: font.display }}>Everything you'll be working with</h3>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {[["Kotlin","#7C3AED"],["Jetpack Compose","#15803D"],["Material 3","#1D4ED8"],["ViewModel","#0F766E"],["StateFlow + Flow","#B45309"],["Hilt DI","#BE123C"],["Room","#059669"],["Navigation","#6D28D9"],["Coroutines","#1D4ED8"],["Gradle KTS","#374151"]].map(([name, color]) => (
              <div key={name} style={{ padding: "8px 16px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 20, fontSize: 12.5, color, fontFamily: font.mono, fontWeight: 700 }}>{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: T.forest, padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 18 }}>📱</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.white, fontFamily: font.display }}>Android Dev Course</div>
            <div style={{ fontSize: 11, color: `${T.white}60`, fontFamily: font.mono }}>Kotlin · Jetpack Compose · Material 3</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {lectures.map(l => (
            <button key={l.num} onClick={() => navigate(l.route)} style={{ padding: "7px 16px", borderRadius: 7, cursor: "pointer", background: `${T.goldLight}15`, border: `1px solid ${T.goldLight}30`, color: T.goldLight, fontSize: 12, fontFamily: font.mono, transition: "all 0.18s" }}>
              Lecture {l.num}: {l.title}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP ROOT — CLIENT-SIDE ROUTER
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const { route, navigate } = useRouter();

  if (route === "/lecture2") return (
    <LectureShell
      title="Lecture 2 — Jetpack Compose Basics"
      icon="🎨" color={T.mid}
      subtitle="Declarative UI, three phases, layouts and components"
      sections={L2_SECTIONS}
      renderSection={(id) => <L2Section id={id} />}
      onBack={() => navigate("/")}
    />
  );

  if (route === "/lecture3") return (
    <LectureShell
      title="Lecture 3 — State Management"
      icon="🧠" color="#1D4ED8"
      subtitle="remember, mutableState, lifecycle, hoisting"
      sections={L3_SECTIONS}
      renderSection={(id) => <L3Section id={id} />}
      onBack={() => navigate("/")}
    />
  );

  if (route === "/lecture4") return (
    <LectureShell
      title="Lecture 4 — Navigation"
      icon="🧭" color={T.gold}
      subtitle="Intents, NavController, NavHost, type-safe routes"
      sections={L4_SECTIONS}
      renderSection={(id) => <L4Section id={id} />}
      onBack={() => navigate("/")}
    />
  );

  return <LandingPage navigate={navigate} />;
}