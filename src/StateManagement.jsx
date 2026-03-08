import { useState } from "react";
import { useNavigate } from "react-router-dom";

const G = {
  bg:       "#0D1117",   
  panel:    "#161B22",  
  card:     "#1C2128",  
  border:   "#30363D",
  borderMd: "#484F58",

  teal:     "#2DD4BF",
  tealDim:  "#14B8A6",
  tealBg:   "#2DD4BF12",

  amber:    "#F59E0B",
  amberBg:  "#F59E0B14",

  rose:     "#F43F5E",
  roseBg:   "#F43F5E14",

  indigo:   "#818CF8",
  indigoBg: "#818CF814",

  emerald:  "#34D399",
  emeraldBg:"#34D39914",

  slate:    "#94A3B8",
  muted:    "#8B949E",
  faint:    "#21262D",

  text:     "#E6EDF3",

  code:     "#7EE787",
  codeBg:   "#161B22",
};
const sections = [
  { id: "whatisstate",  icon: "📦", label: "What is State?" },
  { id: "events",       icon: "⚡", label: "Events & Loop" },
  { id: "remember",     icon: "🧠", label: "remember API" },
  { id: "mutablestate", icon: "🔀", label: "Mutable State" },
  { id: "lifecycle",    icon: "♻️", label: "Activity Lifecycle" },
  { id: "saveable",     icon: "💾", label: "rememberSaveable" },
  { id: "hoisting",     icon: "🏗️", label: "State Hoisting" },
];

const Code = ({ code }) => (
  <pre style={{
    background: G.codeBg, border: `1px solid ${G.border}`,
    borderLeft: `3px solid ${G.teal}`, borderRadius: 6,
    padding: "14px 16px", margin: "12px 0", overflowX: "auto",
    fontSize: 12, lineHeight: 1.8, color: G.code,
    fontFamily: "'Fira Code','Cascadia Code','Consolas',monospace",
    whiteSpace: "pre-wrap", wordBreak: "break-word",
  }}><code>{code}</code></pre>
);

const Note = ({ children, type = "tip" }) => {
  const map = {
    tip:  { bg: G.tealBg,   border: G.teal,   icon: "💡" },
    warn: { bg: G.amberBg,  border: G.amber,  icon: "⚠️" },
    info: { bg: G.indigoBg, border: G.indigo, icon: "ℹ️" },
    good: { bg: G.emeraldBg,border: G.emerald,icon: "✅" },
    bad:  { bg: G.roseBg,   border: G.rose,   icon: "❌" },
  };
  const s = map[type];
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}40`,
      borderLeft: `3px solid ${s.border}`,
      borderRadius: 6, padding: "11px 14px", margin: "14px 0",
      fontSize: 13, color: G.text, lineHeight: 1.65,
    }}>
      <span style={{ marginRight: 8 }}>{s.icon}</span>{children}
    </div>
  );
};

const Badge = ({ label, color = G.teal }) => (
  <span style={{
    fontSize: 10, padding: "2px 9px", borderRadius: 20,
    border: `1px solid ${color}50`, color,
    background: `${color}12`, letterSpacing: "0.8px",
    textTransform: "uppercase", fontWeight: 700,
    fontFamily: "'Fira Code', monospace",
  }}>{label}</span>
);

const Tag = ({ label, color }) => (
  <span style={{
    fontSize: 10, padding: "2px 8px", borderRadius: 4,
    background: `${color}15`, color,
    fontFamily: "monospace", fontWeight: 600,
  }}>{label}</span>
);

const SectionHeader = ({ title, subtitle, badge }) => (
  <div style={{ marginBottom: 26, borderBottom: `1px solid ${G.faint}`, paddingBottom: 20 }}>
    {badge && <div style={{ marginBottom: 10 }}><Badge label={badge} /></div>}
    <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: G.text, letterSpacing: "-0.5px", fontFamily: "'Georgia', 'Cambria', serif" }}>{title}</h2>
    {subtitle && <p style={{ margin: 0, fontSize: 14, color: G.muted, lineHeight: 1.65 }}>{subtitle}</p>}
  </div>
);

const Divider = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 18px" }}>
    <div style={{ flex: 1, height: 1, background: G.faint }} />
    {label && <span style={{ fontSize: 10, color: G.muted, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "monospace", whiteSpace: "nowrap" }}>{label}</span>}
    <div style={{ flex: 1, height: 1, background: G.faint }} />
  </div>
);

const Pill = ({ label, active, color, onClick }) => (
  <button onClick={onClick} style={{
    padding: "7px 16px", borderRadius: 20, cursor: "pointer",
    border: `1.5px solid ${active ? color : G.border}`,
    background: active ? `${color}12` : G.panel,
    color: active ? color : G.muted,
    fontSize: 12, fontFamily: "'Fira Code', monospace",
    fontWeight: active ? 700 : 400, transition: "all 0.18s",
    outline: "none",
  }}>{label}</button>
);


function WhatIsStateSection() {
  const examples = [
    { icon: "💬", title: "Chat messages", desc: "The list of messages in a conversation — changes every time a new message arrives.", color: G.teal },
    { icon: "🖼️", title: "Profile photo", desc: "The current user's avatar URL — changes when they upload a new photo.", color: G.indigo },
    { icon: "📜", title: "Scroll position", desc: "How far down a list the user has scrolled — changes on every scroll event.", color: G.amber },
    { icon: "🔢", title: "Counter value", desc: "A simple integer that increments on button tap — the simplest state example.", color: G.emerald },
    { icon: "✅", title: "Checkbox state", desc: "Whether a checkbox is checked or not — a Boolean that drives UI appearance.", color: G.rose },
    { icon: "🗄️", title: "Database rows", desc: "The result of a Room query — changes whenever the underlying data is modified.", color: G.teal },
  ];
  return (
    <div>
      <SectionHeader title="What is State in Compose?"
        badge="Lecture 3 · Foundations"
        subtitle="State is any value that can change over time. It's the broadest possible definition — from a simple Boolean to an entire database." />
      <Note type="info">
        In Compose, <strong>UI is a function of state</strong>. Change the state → Compose automatically re-renders the affected parts of the UI. You never manually call "update the text view".
      </Note>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}>
        {examples.map(({ icon, title, desc, color }) => (
          <div key={title} style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 10, padding: "14px 16px", display: "flex", gap: 14 }}>
            <div style={{ fontSize: 26, flexShrink: 0, lineHeight: 1 }}>{icon}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 4, fontFamily: "'Fira Code', monospace" }}>{title}</div>
              <div style={{ fontSize: 12, color: G.muted, lineHeight: 1.5 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
      <Divider label="The core mental model" />
      <div style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 10, padding: "20px 22px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: G.teal, marginBottom: 16, fontFamily: "'Fira Code', monospace" }}>UI = f(state) — always, everywhere</div>
        <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
          {[
            { label: "State changes", sub: "any value mutates", color: G.amber },
            { label: "→", color: G.muted, sub: "" },
            { label: "Recomposition", sub: "composable re-runs", color: G.teal },
            { label: "→", color: G.muted, sub: "" },
            { label: "New UI", sub: "screen updates", color: G.indigo },
          ].map(({ label, sub, color }, i) => (
            label === "→"
              ? <div key={i} style={{ fontSize: 20, color: G.muted, padding: "0 8px" }}>→</div>
              : <div key={i} style={{ background: `${color}12`, border: `1px solid ${color}30`, borderRadius: 8, padding: "12px 18px", textAlign: "center", flex: 1, minWidth: 100 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color }}>{label}</div>
                  <div style={{ fontSize: 10, color: G.muted, marginTop: 3 }}>{sub}</div>
                </div>
          ))}
        </div>
      </div>
      <Divider label="Without state — what breaks?" />
      <Code code={`// ❌ NO STATE — clicking the button does nothing visible
@Composable
fun BrokenCounter() {
    var count = 0  // plain Kotlin variable — Compose doesn't track this!
    Button(onClick = { count++ }) {  // count increments in memory...
        Text("You've clicked \$count times")  // ...but UI never redraws
    }
}
// Why? Compose has no idea 'count' changed.
// It only redraws when it detects a STATE change via mutableStateOf.`} />
      <Note type="warn">
        A regular Kotlin variable (<code>var count = 0</code>) is invisible to the Compose runtime. Only values wrapped in <strong>mutableStateOf</strong> trigger recomposition when they change.
      </Note>
    </div>
  );
}

function EventsSection() {
  const [step, setStep] = useState(0);
  const loop = [
    { icon: "👆", title: "Event occurs", color: G.rose,
      desc: "Something happens — the user taps a button, a network response arrives, a sensor fires, a timer triggers. Events come from both inside and outside the app.",
      examples: ["Button click (onClick)", "Text input (onValueChange)", "Network response callback", "Sensor reading update", "Timer / coroutine completion"] },
    { icon: "✏️", title: "Update State", color: G.amber,
      desc: "An event handler (usually in a ViewModel or a composable callback) responds to the event by changing state. The state is the single source of truth.",
      examples: ["count++", "messages.add(newMsg)", "_uiState.value = Success(data)", "isLoading = false", "selectedTab = newTab"] },
    { icon: "🖥️", title: "Display State", color: G.teal,
      desc: "Compose detects the state change and recomposes only the composables that read that state. The UI reflects the new state automatically.",
      examples: ["Text re-renders with new count", "LazyColumn shows new message", "Loading spinner disappears", "New tab content is shown", "Error message appears"] },
  ];
  return (
    <div>
      <SectionHeader title="Events & the State Loop" badge="Lecture 3 · Core Loop"
        subtitle="Every UI interaction in Compose follows the same three-step loop: Event → Update State → Display State." />
      <div style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap" }}>
        {loop.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            flex: 1, minWidth: 120, padding: "14px 12px", borderRadius: 10, cursor: "pointer",
            border: `1.5px solid ${step === i ? s.color : G.border}`,
            background: step === i ? `${s.color}10` : G.panel,
            textAlign: "center", transition: "all 0.18s", outline: "none",
          }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 10, color: step === i ? s.color : G.muted, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "monospace" }}>Step {i + 1}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: step === i ? s.color : G.slate, marginTop: 3 }}>{s.title}</div>
          </button>
        ))}
      </div>
      <div style={{ background: `${loop[step].color}08`, border: `1.5px solid ${loop[step].color}30`, borderRadius: 10, padding: "20px 22px", marginBottom: 22 }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>{loop[step].icon}</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: loop[step].color, fontFamily: "'Georgia', serif", marginBottom: 8 }}>Step {step + 1}: {loop[step].title}</div>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: G.text, lineHeight: 1.7 }}>{loop[step].desc}</p>
        <div style={{ fontSize: 11, color: G.muted, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Examples</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {loop[step].examples.map(e => (
            <span key={e} style={{ fontSize: 11, padding: "4px 10px", background: `${loop[step].color}15`, color: loop[step].color, borderRadius: 4, fontFamily: "monospace" }}>{e}</span>
          ))}
        </div>
      </div>
      <Divider label="Full loop in code" />
      <Code code={`// The complete event → state → UI loop in one example:

@Composable
fun LikeButton(postId: String, viewModel: PostViewModel) {

    // 3. DISPLAY STATE — read state, UI updates automatically
    val isLiked by viewModel.likedPosts.collectAsStateWithLifecycle()

    Button(
        // 1. EVENT — user taps the button
        onClick = {
            // 2. UPDATE STATE — event handler mutates state
            viewModel.toggleLike(postId)
        }
    ) {
        Icon(
            imageVector = if (isLiked) Icons.Filled.Favorite
                          else Icons.Outlined.FavoriteBorder,
            contentDescription = "Like"
        )
    }
}`} />
      <Note type="tip">
        Notice how the composable <strong>never directly mutates UI</strong>. It reads state and passes events up. The ViewModel owns the state. This separation is the whole point.
      </Note>
    </div>
  );
}

function RememberSection() {
  return (
    <div>
      <SectionHeader title="The remember API" badge="Lecture 3 · Memory"
        subtitle="Composable functions are called repeatedly during recomposition. remember lets you store a value in memory so it survives re-calls — without resetting every time." />
      <Note type="info">
        Without <code>remember</code>, every recomposition reinitializes your variables from scratch. <code>remember</code> stores a value during initial composition and <em>returns the same value</em> on every subsequent recomposition.
      </Note>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
        <div style={{ background: G.roseBg, border: `1px solid ${G.rose}30`, borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: G.rose, fontFamily: "monospace", marginBottom: 10 }}>❌ Without remember</div>
          <Code code={`@Composable
fun BrokenCounter() {
    // Re-initialized to 0
    // on EVERY recomposition!
    var count by mutableStateOf(0)

    Button(onClick = { count++ }) {
        Text("Count: \$count")
    }
}
// Result: button press triggers
// recomposition → count resets
// to 0 → you see 0 forever`} />
        </div>
        <div style={{ background: G.tealBg, border: `1px solid ${G.teal}30`, borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: G.teal, fontFamily: "monospace", marginBottom: 10 }}>✅ With remember</div>
          <Code code={`@Composable
fun WorkingCounter() {
    // Stored in Composition memory
    // Survives recomposition ✓
    var count by remember {
        mutableStateOf(0)
    }

    Button(onClick = { count++ }) {
        Text("Count: \$count")
    }
}
// Result: count persists
// across recompositions ✓`} />
        </div>
      </div>
      <Divider label="How remember works internally" />
      <div style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 10, padding: "18px 20px", marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 14, flexDirection: "column" }}>
          {[
            { label: "Initial Composition", color: G.teal, desc: "remember { mutableStateOf(0) } runs the lambda. The value 0 is computed and stored in the Composition tree at this node's position." },
            { label: "State Changes → Recomposition", color: G.amber, desc: "count++ fires. Compose schedules a recomposition. The composable function is called again from the top." },
            { label: "remember returns stored value", color: G.indigo, desc: "When remember is encountered again, it skips the lambda entirely. It returns the previously stored value (e.g. 1, 2, 3...) from the Composition." },
          ].map(({ label, color, desc }, i) => (
            <div key={i} style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${color}18`, border: `1.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "monospace", marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 13, color: G.muted, lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider label="remember with a calculation key" />
      <Code code={`// remember with NO key — computed once, never recomputed
val expensiveResult = remember { computeExpensiveThing() }

// remember with KEY — recomputed whenever 'userId' changes
val userGreeting = remember(userId) {
    "Welcome, \${loadUserName(userId)}!"
}

// remember with MULTIPLE keys
val formatted = remember(value, locale) {
    formatCurrency(value, locale)
}

// Practical: rememberCoroutineScope for launching coroutines in events
val scope = rememberCoroutineScope()
Button(onClick = {
    scope.launch { // safe to launch from onClick handler
        repository.save(data)
    }
}) { Text("Save") }`} />
    </div>
  );
}

function MutableStateSection() {
  const [syntax, setSyntax] = useState(0);
  const syntaxOptions = [
    {
      label: "mutableState (val)",
      title: "val mutableState = remember { mutableStateOf(0) }",
      desc: "Most explicit. You access value via .value. Verbose but crystal clear about what's happening.",
      code: `val countState = remember { mutableStateOf(0) }

// Read:  countState.value
// Write: countState.value = 5
// Or:    countState.value++

Button(onClick = { countState.value++ }) {
    Text("Count: \${countState.value}")
}

// ✓ Works great in most scenarios
// ✓ Easy to pass around (the State<T> object itself)
// ✗ Verbose — .value everywhere`,
      color: G.teal,
    },
    {
      label: "by delegate (var)",
      title: "var value by remember { mutableStateOf(0) }",
      desc: "Most idiomatic Kotlin. The 'by' keyword delegates property access to the State object. Reads/writes feel like plain variables.",
      code: `// Requires these imports:
// import androidx.compose.runtime.getValue
// import androidx.compose.runtime.setValue

var count by remember { mutableStateOf(0) }

// Read:  count          (no .value needed!)
// Write: count = 5
// Or:    count++

Button(onClick = { count++ }) {
    Text("Count: \$count")
}

// ✓ Cleanest, most Kotlin-idiomatic ← RECOMMENDED
// ✓ Feels like a normal variable
// ✗ Needs getValue/setValue imports`,
      color: G.indigo,
    },
    {
      label: "Destructured pair",
      title: "val (value, setValue) = remember { mutableStateOf(0) }",
      desc: "Destructures the State into a read-only value and a setter function. Useful when you want to explicitly separate reading from writing.",
      code: `val (count, setCount) = remember { mutableStateOf(0) }

// Read:  count         (just the Int)
// Write: setCount(5)   (call the lambda)

Button(onClick = { setCount(count + 1) }) {
    Text("Count: \$count")
}

// ✓ Explicit separation of read vs write
// ✓ Useful when passing setter as a callback
// ✓ Great for state hoisting patterns
// ✗ Can't use += or ++ operators`,
      color: G.amber,
    },
  ];
  const s = syntaxOptions[syntax];
  return (
    <div>
      <SectionHeader title="MutableState — Three Syntax Forms" badge="Lecture 3 · State Declaration"
        subtitle="All three are equivalent at runtime. Choose based on readability and use-case. The 'by' delegate form is the most common in production code." />
      <Note type="tip">
        <strong>Rule of thumb:</strong> Use <code>by remember &#123; mutableStateOf() &#125;</code> for local composable state. It reads like a plain variable, which makes the code cleaner.
      </Note>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {syntaxOptions.map((opt, i) => (
          <Pill key={i} label={opt.label} active={syntax === i} color={opt.color} onClick={() => setSyntax(i)} />
        ))}
      </div>
      <div style={{ background: G.panel, border: `1.5px solid ${s.color}30`, borderRadius: 10, padding: "18px 20px" }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: s.color, fontWeight: 700, marginBottom: 6, wordBreak: "break-all" }}>{s.title}</div>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: G.muted, lineHeight: 1.65 }}>{s.desc}</p>
        <Code code={s.code} />
      </div>
      <Divider label="Beyond Int — other State types" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {[
          ["Boolean", `var isExpanded by remember { mutableStateOf(false) }`, G.teal],
          ["String", `var name by remember { mutableStateOf("") }`, G.indigo],
          ["List", `var items by remember { mutableStateOf(listOf<String>()) }`, G.amber],
          ["Sealed/Data class", `var uiState: UiState by remember { mutableStateOf(UiState.Loading) }`, G.rose],
        ].map(([type, code, color]) => (
          <div key={type} style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, marginBottom: 6 }}><Tag label={type} color={color} /></div>
            <code style={{ fontSize: 11, color: G.code, fontFamily: "'Fira Code', monospace", lineHeight: 1.6, display: "block" }}>{code}</code>
          </div>
        ))}
      </div>
      <Divider label="mutableStateListOf — reactive lists" />
      <Code code={`// ⚠️ Problem: regular list mutation doesn't trigger recomposition
var items by remember { mutableStateOf(listOf("a", "b")) }
items = items + "c"   // works but creates a new list each time

// ✅ Better: mutableStateListOf — tracks structural changes
val items = remember { mutableStateListOf("a", "b") }
items.add("c")         // triggers recomposition automatically
items.remove("a")      // same
items[0] = "z"         // same

// Also available:
val map = remember { mutableStateMapOf<String, Int>() }`} />
    </div>
  );
}

function LifecycleSection() {
  const [phase, setPhase] = useState(0);
  const lifecycle = [
    { name: "onCreate()", color: G.teal, type: "create",
      desc: "Activity is being created for the first time. Initialize your UI (setContent), set up ViewModels, restore saved state.",
      compose: "setContent { } goes here. Your Compose tree is built.", doHere: ["setContent { }", "Initialize ViewModel", "Restore savedInstanceState"] },
    { name: "onStart()", color: G.indigo, type: "visible",
      desc: "Activity becomes visible to the user, but not yet interactive. UI is drawn but not in the foreground.",
      compose: "Compose UI is visible. StateFlows start being collected.", doHere: ["Resume lightweight updates", "Register broadcast receivers"] },
    { name: "onResume()", color: G.emerald, type: "foreground",
      desc: "Activity is in the foreground and interactive. The user can now interact with the app. This is the 'running' state.",
      compose: "collectAsStateWithLifecycle() is active. State updates reflected.", doHere: ["Camera, microphone access", "Start animations", "Resume timers"] },
    { name: "onPause()", color: G.amber, type: "background",
      desc: "Activity is partially obscured or going to background. Short operation only — don't do heavy work here.",
      compose: "collectAsStateWithLifecycle() pauses collection to save battery.", doHere: ["Pause animations", "Release camera/mic", "Commit unsaved changes"] },
    { name: "onStop()", color: G.rose, type: "hidden",
      desc: "Activity is completely hidden from the user. Safe to do heavier cleanup here.",
      compose: "Compose tree is still in memory but not drawing.", doHere: ["Release heavy resources", "Stop location updates", "Save data to DB"] },
    { name: "onDestroy()", color: "#6B21A8", type: "dead",
      desc: "Activity is being destroyed — either user finished it, or system is killing it for memory, or a CONFIG CHANGE happened (rotation!).",
      compose: "⚠️ remember{} state is LOST here. rememberSaveable survives if config change.", doHere: ["Final cleanup", "Cancel coroutines (ViewModel does this)", "Rotation triggers this!"] },
  ];
  const p = lifecycle[phase];
  return (
    <div>
      <SectionHeader title="Activity Lifecycle" badge="Lecture 3 · Lifecycle"
        subtitle="Compose lives inside an Activity. Understanding the lifecycle is critical because configuration changes (rotation, dark mode, language) destroy and recreate the Activity — wiping remember{} state." />
      <Note type="warn">
        <strong>The key insight for state:</strong> When the user rotates the screen, Android calls <code>onDestroy()</code> then <code>onCreate()</code>. All <code>remember&#123;&#125;</code> state is gone. You need <code>rememberSaveable</code> to survive this.
      </Note>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {lifecycle.map((l, i) => (
          <button key={i} onClick={() => setPhase(i)} style={{
            padding: "8px 14px", borderRadius: 20, cursor: "pointer",
            border: `1.5px solid ${phase === i ? l.color : G.border}`,
            background: phase === i ? `${l.color}12` : G.panel,
            color: phase === i ? l.color : G.muted,
            fontSize: 11, fontFamily: "'Fira Code', monospace", fontWeight: phase === i ? 700 : 400,
            transition: "all 0.18s", outline: "none",
          }}>{l.name}</button>
        ))}
      </div>
      <div style={{ background: `${p.color}08`, border: `1.5px solid ${p.color}30`, borderRadius: 10, padding: "18px 20px", marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 2, minWidth: 200 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: p.color, fontFamily: "'Fira Code', monospace", marginBottom: 8 }}>{p.name}</div>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: G.text, lineHeight: 1.7 }}>{p.desc}</p>
            <div style={{ fontSize: 11, color: G.muted, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Compose impact</div>
            <div style={{ fontSize: 12, color: p.color, fontFamily: "monospace", background: `${p.color}10`, padding: "8px 12px", borderRadius: 6 }}>{p.compose}</div>
          </div>
          <div style={{ flex: 1, minWidth: 160, background: G.panel, border: `1px solid ${G.border}`, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: G.muted, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Do here</div>
            {p.doHere.map(d => (
              <div key={d} style={{ fontSize: 12, color: G.slate, padding: "4px 0", borderBottom: `1px solid ${G.faint}`, lineHeight: 1.4 }}>• {d}</div>
            ))}
          </div>
        </div>
      </div>
      <Divider label="Lifecycle flow diagram" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        {lifecycle.map((l, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ padding: "8px 20px", background: `${l.color}15`, border: `1px solid ${l.color}40`, borderRadius: 20, fontSize: 12, color: l.color, fontFamily: "monospace", fontWeight: 700 }}>{l.name}</div>
            {i < lifecycle.length - 1 && <div style={{ fontSize: 14, color: G.muted, lineHeight: 1.4 }}>↓</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SaveableSection() {
  return (
    <div>
      <SectionHeader title="rememberSaveable" badge="Lecture 3 · Persistence"
        subtitle="remember survives recompositions. rememberSaveable goes further — it also survives configuration changes (rotation, dark mode toggle, language switch) and process death." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 22 }}>
        {[
          { label: "Plain variable", icon: "📝", survives: ["—"], dies: ["Recomposition", "Rotation", "Process death"], color: G.rose },
          { label: "remember { }", icon: "🧠", survives: ["Recomposition ✓"], dies: ["Rotation ✗", "Process death ✗"], color: G.amber },
          { label: "rememberSaveable", icon: "💾", survives: ["Recomposition ✓", "Rotation ✓", "Process death ✓"], dies: ["User exits app"], color: G.teal },
        ].map(({ label, icon, survives, dies, color }) => (
          <div key={label} style={{ background: G.panel, border: `1.5px solid ${color}30`, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color, fontFamily: "'Fira Code', monospace", marginBottom: 10 }}>{label}</div>
            {survives.filter(s => s !== "—").map(s => <div key={s} style={{ fontSize: 11, color: G.emerald, padding: "3px 0" }}>✓ {s}</div>)}
            {dies.map(d => <div key={d} style={{ fontSize: 11, color: G.rose, padding: "3px 0" }}>✗ {d}</div>)}
          </div>
        ))}
      </div>
      <Divider label="Usage" />
      <Code code={`// Drop-in replacement for remember
// Works automatically for primitives + types that implement Parcelable or @Parcelize

var count by rememberSaveable { mutableStateOf(0) }
var name by rememberSaveable { mutableStateOf("") }
var isChecked by rememberSaveable { mutableStateOf(false) }

// The value is saved to Bundle (same mechanism as onSaveInstanceState)
// and automatically restored on Activity recreation`} />
      <Divider label="Custom saver for non-Bundle types" />
      <Code code={`// For types that can't be auto-saved (e.g. your own data class without @Parcelize)
// you provide a custom Saver:

data class UserFilter(val query: String, val sortBy: String)

val UserFilterSaver = Saver<UserFilter, Bundle>(
    save = { filter ->
        Bundle().apply {
            putString("query", filter.query)
            putString("sortBy", filter.sortBy)
        }
    },
    restore = { bundle ->
        UserFilter(
            query = bundle.getString("query", ""),
            sortBy = bundle.getString("sortBy", "name")
        )
    }
)

// Use it:
var filter by rememberSaveable(stateSaver = UserFilterSaver) {
    mutableStateOf(UserFilter("", "name"))
}`} />
      <Note type="tip">
        For <code>@Parcelize</code> data classes, you don't need a custom saver — rememberSaveable handles them automatically. Add the <code>kotlin-parcelize</code> plugin to your Gradle and annotate: <code>@Parcelize data class Foo(...) : Parcelable</code>
      </Note>
      <Divider label="LazyListState — built-in saveable" />
      <Code code={`// Scroll position is automatically saved via rememberLazyListState
// (uses rememberSaveable internally)

@Composable
fun MyList(items: List<Item>) {
    val listState = rememberLazyListState()  // scroll position survives rotation!

    LazyColumn(state = listState) {
        items(items) { item -> ItemRow(item) }
    }
}

// Same for:
val scrollState = rememberScrollState()       // Column/Row scroll
val pagerState  = rememberPagerState()        // HorizontalPager
val drawerState = rememberDrawerState(DrawerValue.Closed)`} />
    </div>
  );
}

function HoistingSection() {
  const [view, setView] = useState("concept");
  return (
    <div>
      <SectionHeader title="State Hoisting" badge="Lecture 3 · Architecture"
        subtitle="The most important design pattern for Compose. Move state up to a common ancestor so composables become stateless, reusable, and testable." />
      <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
        {[["concept","💡","Concept"],["stateful","🔒","Stateful"],["stateless","🧊","Stateless"],["hoisted","⬆️","Hoisted"],["viewmodel","🏗️","ViewModel Pattern"]].map(([id, icon, label]) => (
          <Pill key={id} label={`${icon} ${label}`} active={view === id} color={G.teal} onClick={() => setView(id)} />
        ))}
      </div>

      {view === "concept" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            {[
              { title: "Stateful composable", color: G.rose, icon: "🔒", desc: "Owns state internally. Cannot be reused with different state. Harder to test — you can't inject fake state.", points: ["State lives inside the composable", "Hard to share state with siblings", "Caller can't control the state", "Hard to write unit tests"] },
              { title: "Stateless composable", color: G.teal, icon: "🧊", desc: "Owns no state. Receives current value and an event callback. Can be reused anywhere. Very easy to test.", points: ["Receives state as a parameter", "Emits events via callbacks", "Caller fully controls state", "Trivially unit testable"] },
            ].map(({ title, color, icon, desc, points }) => (
              <div key={title} style={{ background: `${color}08`, border: `1.5px solid ${color}30`, borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color, fontFamily: "'Georgia', serif", marginBottom: 8 }}>{title}</div>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: G.muted, lineHeight: 1.6 }}>{desc}</p>
                {points.map(p => <div key={p} style={{ fontSize: 12, color: G.slate, padding: "3px 0" }}>• {p}</div>)}
              </div>
            ))}
          </div>
          <Note type="tip">
            <strong>The pattern:</strong> Replace a state variable inside a composable with two parameters: <code>value: T</code> (current state to display) and <code>onValueChange: (T) → Unit</code> (event to request a change).
          </Note>
          <div style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G.teal, fontFamily: "monospace", marginBottom: 12 }}>Rules of state hoisting</div>
            {[
              ["Hoist to common ancestor", "If two composables need the same state, hoist it to their lowest common ancestor."],
              ["State goes down", "Pass state as parameters. Never let a child composable read parent state directly."],
              ["Events go up", "When child needs to change state, it calls a callback. Never let child mutate parent state directly."],
              ["Single source of truth", "State should live in exactly ONE place. Two copies of the same state will diverge."],
            ].map(([title, desc], i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, padding: "10px 12px", background: G.card, borderRadius: 6, border: `1px solid ${G.faint}` }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: G.tealBg, border: `1px solid ${G.teal}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: G.teal, flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: G.teal, fontFamily: "monospace", marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 12, color: G.muted, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "stateful" && (
        <div>
          <Note type="warn">A stateful composable that owns state internally. Works, but inflexible — can't be reused with different state sources.</Note>
          <Code code={`// ❌ STATEFUL — owns its own state
@Composable
fun StatefulWaterCounter() {
    // State lives HERE, inside the composable
    var count by remember { mutableStateOf(0) }

    Column {
        if (count > 0) {
            Text("You've had \$count glasses")
        }
        Button(
            onClick = { count++ },
            enabled = count < 10
        ) {
            Text("Add one")
        }
    }
}

// Problems with this approach:
// 1. You can't test this composable without clicking the button
// 2. A sibling composable can't read 'count'
// 3. A parent composable can't reset or override 'count'
// 4. You can't reuse this with count from a ViewModel`} />
        </div>
      )}

      {view === "stateless" && (
        <div>
          <Note type="good">A stateless composable that receives state as a parameter and emits events via callbacks. Fully reusable and testable.</Note>
          <Code code={`// ✅ STATELESS — no state owned internally
@Composable
fun StatelessWaterCounter(
    count: Int,                      // current state (passed in)
    onAddWater: () -> Unit,          // event (passed up)
) {
    Column {
        if (count > 0) {
            Text("You've had \$count glasses")
        }
        Button(
            onClick = onAddWater,   // just call the callback — don't own state
            enabled = count < 10
        ) {
            Text("Add one")
        }
    }
}

// Benefits:
// ✓ Preview it easily: StatelessWaterCounter(count = 3, onAddWater = {})
// ✓ Test it: call with any count value, verify UI
// ✓ Reuse it with different state sources (ViewModel, parent, test)
// ✓ Sibling can show count too — parent shares it with both`} />
        </div>
      )}

      {view === "hoisted" && (
        <div>
          <Note type="good">The parent composable holds the state and passes it down. It's the "stateful" wrapper around a stateless component.</Note>
          <Code code={`// The PARENT holds state and passes it down
@Composable
fun WaterCounterScreen() {

    // State lives here — single source of truth
    var count by rememberSaveable { mutableStateOf(0) }

    // Pass state DOWN, events UP
    StatelessWaterCounter(
        count = count,
        onAddWater = { count++ }    // parent handles the event
    )
}

// Now you can easily:
// 1. Share count with other composables at this level
// 2. Reset count from a "Reset" button also at this level
// 3. Save/restore count with rememberSaveable
// 4. Move count to ViewModel when screen grows in complexity

// Visual: state flow
//
//  WaterCounterScreen     ← owns state
//    │  count = 2         ← passes value down
//    │  onAdd = { }       ← passes callback down
//    ▼
//  StatelessWaterCounter  ← reads value, calls callback
//    │  shows "2 glasses"
//    │  button calls onAdd()`} />
        </div>
      )}

      {view === "viewmodel" && (
        <div>
          <Note type="info">In production apps, screen-level state belongs in a ViewModel. The ViewModel survives configuration changes. The Composable is always stateless — it just reads from the ViewModel and passes events to it.</Note>
          <Code code={`// ViewModel — single source of truth for the screen
@HiltViewModel
class WaterViewModel @Inject constructor() : ViewModel() {

    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun addWater() {
        if (_count.value < 10) _count.value++
    }

    fun reset() {
        _count.value = 0
    }
}

// Screen composable — fully stateless, just connects ViewModel to UI
@Composable
fun WaterScreen(viewModel: WaterViewModel = hiltViewModel()) {

    // Collect StateFlow as Compose State
    // collectAsStateWithLifecycle pauses collection when screen is off-screen
    val count by viewModel.count.collectAsStateWithLifecycle()

    // Pass state DOWN, events UP — same hoisting pattern, but ViewModel owns state
    Column {
        StatelessWaterCounter(
            count = count,
            onAddWater = viewModel::addWater
        )
        TextButton(onClick = viewModel::reset) {
            Text("Reset")
        }
    }
}

// Benefits of ViewModel ownership:
// ✓ Survives rotation (no rememberSaveable needed for business data)
// ✓ Single source of truth for entire screen
// ✓ Easily unit testable (no Compose needed to test ViewModel)
// ✓ Business logic separated from UI code`} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
            {[
              { title: "Use remember / rememberSaveable for…", color: G.teal, items: ["UI-only state (expanded, scrollPosition, isDialogOpen)", "Transient input state (text field being typed into)", "Animation state"] },
              { title: "Use ViewModel for…", color: G.indigo, items: ["Business data (user, messages, products)", "Loading / error / success state (UiState)", "Any state shared across multiple composables on a screen"] },
            ].map(({ title, color, items }) => (
              <div key={title} style={{ background: `${color}08`, border: `1px solid ${color}25`, borderRadius: 8, padding: "14px 16px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "monospace", marginBottom: 10 }}>{title}</div>
                {items.map(i => <div key={i} style={{ fontSize: 12, color: G.slate, padding: "4px 0", lineHeight: 1.4 }}>• {i}</div>)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function Lecture3Guide() {
  const [active, setActive] = useState("whatisstate");
  const navigate = useNavigate();

  const renderSection = () => {
    switch (active) {
      case "whatisstate":  return <WhatIsStateSection />;
      case "events":       return <EventsSection />;
      case "remember":     return <RememberSection />;
      case "mutablestate": return <MutableStateSection />;
      case "lifecycle":    return <LifecycleSection />;
      case "saveable":     return <SaveableSection />;
      case "hoisting":     return <HoistingSection />;
    }
  };

  return (
    <div style={{ background: G.bg, minHeight: "100vh", fontFamily: "'Trebuchet MS', Tahoma, sans-serif", color: G.text, display: "flex", flexDirection: "column" }}>
      <div style={{ background: G.panel, borderBottom: `1px solid ${G.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: G.tealBg, border: `1.5px solid ${G.teal}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🧠</div>
        <div>
          <div style={{ fontSize: 10, color: G.muted, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "monospace" }}>Android · Kotlin · Jetpack Compose</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: G.text, letterSpacing: "-0.3px" }}>Lecture 3 — Jetpack Compose State Management</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <span onClick={()=>navigate("/Lecture02")}style={{ cursor: "pointer",fontSize: 11, background: G.amberBg, color: G.amber, border: `1px solid ${G.amber}30`, padding: "3px 10px", borderRadius: 20, fontFamily: "monospace" }}>← Lecture 2: Compose Basics</span>
          <span onClick={()=>navigate("/Lecture04")}style={{ cursor: "pointer",fontSize: 11, background: G.tealBg, color: G.teal, border: `1px solid ${G.teal}30`, padding: "3px 10px", borderRadius: 20, fontFamily: "monospace" }}>Lecture 4: Navigation →</span>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: 210, flexShrink: 0, background: G.panel, borderRight: `1px solid ${G.border}`, padding: "20px 0" }}>
          {sections.map(({ id, icon, label }) => (
            <button key={id} onClick={() => setActive(id)} style={{
              width: "100%", background: active === id ? G.tealBg : "none", border: "none", cursor: "pointer",
              padding: "11px 20px", textAlign: "left",
              borderLeft: `3px solid ${active === id ? G.teal : "transparent"}`,
              transition: "all 0.15s", outline: "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 15 }}>{icon}</span>
                <span style={{ fontSize: 12, color: active === id ? G.teal : G.muted, fontWeight: active === id ? 700 : 400, fontFamily: "'Fira Code', monospace" }}>{label}</span>
              </div>
            </button>
          ))}
          <div style={{ margin: "24px 14px 0", padding: "14px", background: G.card, border: `1px solid ${G.border}`, borderRadius: 10 }}>
            <div style={{ fontSize: 10, color: G.muted, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Quick Reference</div>
            {[
              ["remember { }", "Survives recomposition", G.teal],
              ["rememberSaveable", "Survives rotation", G.indigo],
              ["mutableStateOf()", "Triggers recomposition", G.amber],
              ["State hoisting", "Move state up", G.emerald],
            ].map(([key, val, c]) => (
              <div key={key} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: c, fontWeight: 700 }}>{key}</div>
                <div style={{ fontSize: 10, color: G.muted }}>{val}</div>
              </div>
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