import { useState } from "react";

const topics = [
  {
    id: "state-vs-stateless",
    title: "Stateful vs Stateless",
    emoji: "🔄",
    content: [
      { heading: "1. Definition", stateful: "Holds and manages its own internal state using `remember` or `mutableStateOf`", stateless: "Has no internal state — all data is passed in via parameters" },
      { heading: "2. Reusability", stateful: "Less reusable — tightly coupled to its own data logic", stateless: "Highly reusable — works with any data you pass to it" },
      { heading: "3. Testability", stateful: "Harder to test because state is internal and hidden", stateless: "Easy to test — just pass different inputs and verify output" },
      { heading: "4. Responsibility", stateful: "Manages WHAT data to show AND how to display it", stateless: "Only responsible for HOW to display data" },
      { heading: "5. Example", stateful: "`var count by remember { mutableStateOf(0) }` lives inside the composable", stateless: "Receives `count: Int` and `onIncrement: () -> Unit` as parameters" },
    ]
  },
  {
    id: "imagebitmap-vs-imagevector",
    title: "ImageBitmap vs ImageVector",
    emoji: "🖼️",
    content: [
      { heading: "1. Format", a: "Raster-based — made of pixels (PNG, JPG)", b: "Vector-based — made of mathematical paths (SVG-like)" },
      { heading: "2. Scaling", a: "Loses quality when scaled up (pixelates)", b: "Scales perfectly at any size without quality loss" },
      { heading: "3. File Size", a: "Larger file sizes, especially for high-res images", b: "Much smaller file sizes for simple icons and shapes" },
      { heading: "4. Use Case", a: "Photos, complex images, camera output", b: "Icons, logos, simple illustrations — anything from Material Icons" },
      { heading: "5. Performance", a: "Faster to render for complex images", b: "Can be slower for very complex vector paths" },
    ],
    labels: ["ImageBitmap", "ImageVector"]
  },
  {
    id: "state-hoisting",
    title: "State Hoisting",
    emoji: "⬆️",
    single: true,
    content: `State hoisting is the pattern of moving state UP from a child composable to its parent, making the child stateless.

Instead of a composable owning its state, the parent:
  • Holds the state value
  • Passes it DOWN as a parameter
  • Passes an event callback UP to modify it

BEFORE hoisting (stateful child):
──────────────────────────────
@Composable
fun NameInput() {
    var name by remember { mutableStateOf("") }
    TextField(value = name, onValueChange = { name = it })
}

AFTER hoisting (stateless child):
──────────────────────────────
@Composable
fun NameInput(name: String, onNameChange: (String) -> Unit) {
    TextField(value = name, onValueChange = onNameChange)
}

// Parent controls state:
var name by remember { mutableStateOf("") }
NameInput(name = name, onNameChange = { name = it })

WHY it matters:
  ✅ Single source of truth
  ✅ Multiple composables can share the same state
  ✅ State can be saved/restored at a higher level
  ✅ Child becomes reusable and testable`
  },
  {
    id: "kotlin-vs-java",
    title: "Kotlin vs Java",
    emoji: "⚔️",
    content: [
      { heading: "1. Null Safety", a: "NullPointerException is common — no built-in null safety", b: "Null safety built-in: String? vs String — compiler enforces it" },
      { heading: "2. Verbosity", a: "Very verbose — getters, setters, constructors are all manual", b: "Concise — data classes, default params, destructuring built-in" },
      { heading: "3. Coroutines", a: "Uses threads or RxJava for async — complex and boilerplate-heavy", b: "Native coroutines for async — suspend functions are simple & readable" },
      { heading: "4. Extension Functions", a: "Cannot add functions to existing classes without inheritance", b: "Extension functions let you add methods to any class cleanly" },
      { heading: "5. Interoperability", a: "100% compatible with Kotlin — existing Java code runs fine", b: "100% interoperable with Java — can use all Java libraries" },
    ],
    labels: ["Java", "Kotlin"]
  },
  {
    id: "xml-vs-compose",
    title: "XML vs Jetpack Compose",
    emoji: "🆚",
    content: [
      { heading: "1. Language", a: "Separate XML files + Java/Kotlin logic — two languages", b: "Pure Kotlin — UI and logic in the same place" },
      { heading: "2. UI Updates", a: "Manual — `view.text = ...`, `view.visibility = ...`", b: "Reactive — UI auto-updates when state changes" },
      { heading: "3. Boilerplate", a: "Heavy — ViewBinding, inflate(), findViewByID()", b: "Minimal — just write composable functions" },
      { heading: "4. Preview", a: "Visual layout editor with drag-and-drop", b: "`@Preview` annotation — live preview in Android Studio" },
      { heading: "5. Reusability", a: "Custom views are complex to create and reuse", b: "Any `@Composable` function is instantly reusable" },
    ],
    labels: ["XML", "Jetpack Compose"]
  },
  {
    id: "val-vs-var",
    title: "val vs var",
    emoji: "📦",
    single: true,
    content: `val — Immutable (read-only reference)
────────────────────────────────
val name = "Android"
name = "iOS"  // ❌ ERROR — cannot reassign

- Like Java's final
- Cannot be reassigned after initialization
- Use for constants and values that don't change
- Preferred by default — promotes safer, cleaner code

var — Mutable (read-write reference)
────────────────────────────────
var score = 0
score = 10  // ✅ OK

- Can be reassigned freely
- Use only when value NEEDS to change over time
- Common in state management: var count by remember { mutableStateOf(0) }

⚠️ Important nuance:
val list = mutableListOf(1, 2, 3)
list.add(4)  // ✅ OK — the LIST contents can change
list = mutableListOf()  // ❌ ERROR — the REFERENCE cannot change

Rule of thumb: Start with val. Only switch to var when you must.`
  },
  {
    id: "phases",
    title: "Composition, Layout & Drawing",
    emoji: "🎨",
    single: true,
    content: `Jetpack Compose renders UI in 3 phases every frame:

1. COMPOSITION 🧠
────────────────
What: Compose runs your @Composable functions to determine WHAT UI to show
When: Triggered when state changes
Output: A tree of UI elements (Composition tree)
Example: Text("Hello") creates a Text node in the tree

2. LAYOUT 📐
────────────────
What: Compose measures each element and decides WHERE to place it
When: After Composition phase
Process: Parent measures children → assigns positions
Key rule: Each node is measured only ONCE (efficient!)
Example: Column decides how to stack its children vertically

3. DRAWING 🖌️
────────────────
What: Compose renders pixels to the screen using Canvas
When: After Layout phase
Result: What you actually SEE on screen
Example: Text draws its characters, Box draws its background color

Flow Summary:
State Changes → Composition → Layout → Drawing → Screen
                    ↑ recomposition only reruns what changed`
  },
  {
    id: "components",
    title: "UI Components",
    emoji: "🧩",
    components: true
  }
];

const componentData = [
  { name: "Surface", color: "#4A90D9", desc: "A foundational container that applies Material Design properties — background color, shape, elevation (shadow), and border. Think of it as a styled Box that automatically handles light/dark theme.", code: `Surface(\n  modifier = Modifier.padding(8.dp),\n  shape = RoundedCornerShape(12.dp),\n  tonalElevation = 4.dp\n) { Text("Inside Surface") }` },
  { name: "Scaffold", color: "#7B68EE", desc: "The screen-level layout scaffold for Material Design. Provides slots for TopBar, BottomBar, FAB, Snackbar, and the main content — all properly positioned automatically.", code: `Scaffold(\n  topBar = { TopAppBar(...) },\n  floatingActionButton = { FAB() },\n  bottomBar = { BottomBar() }\n) { padding ->\n  Content(Modifier.padding(padding))\n}` },
  { name: "AppBar (Top/Bottom)", color: "#20B2AA", desc: "TopAppBar: Shows title, navigation icon, and action icons at the top of the screen. BottomAppBar: Navigation bar at the bottom. Both follow Material 3 guidelines.", code: `TopAppBar(\n  title = { Text("My App") },\n  navigationIcon = { BackButton() },\n  actions = { SearchIcon() }\n)` },
  { name: "FloatingActionButton", color: "#FF6B6B", desc: "The primary action button that 'floats' over content. FAB = single action. ExtendedFAB = FAB with a text label. SmallFAB / LargeFAB for size variants.", code: `FloatingActionButton(\n  onClick = { addItem() }\n) {\n  Icon(Icons.Default.Add, "Add")\n}` },
  { name: "Card", color: "#FFA500", desc: "A Material container with elevation and rounded corners, used to group related content. Use ElevatedCard, FilledCard, or OutlinedCard for variants.", code: `Card(\n  modifier = Modifier.fillMaxWidth(),\n  elevation = CardDefaults.cardElevation(4.dp)\n) {\n  Text("Card Content")\n}` },
  { name: "Chip", color: "#32CD32", desc: "A compact interactive element for filters, tags, or choices. Types: AssistChip (suggestions), FilterChip (toggleable), InputChip (user input tags), SuggestionChip.", code: `FilterChip(\n  selected = isSelected,\n  onClick = { toggle() },\n  label = { Text("Kotlin") }\n)` },
  { name: "Dialog", color: "#FF69B4", desc: "A modal popup for important interactions needing user confirmation. AlertDialog is most common — has title, text, confirm/dismiss buttons. Blocks interaction with background.", code: `AlertDialog(\n  onDismissRequest = { close() },\n  title = { Text("Delete?") },\n  confirmButton = {\n    Button(onClick={confirm()}) { Text("Yes") }\n  }\n)` },
  { name: "Snackbar", color: "#9370DB", desc: "A brief message at the bottom of the screen for feedback (e.g., 'Saved!' or 'Undo delete'). Non-blocking, auto-dismisses. Managed via SnackbarHostState inside Scaffold.", code: `val snackbarHostState = remember { SnackbarHostState() }\nscope.launch {\n  snackbarHostState.showSnackbar(\n    "Item deleted",\n    actionLabel = "Undo"\n  )\n}` },
];

export default function App() {
  const [active, setActive] = useState("state-vs-stateless");
  const [expandedComp, setExpandedComp] = useState(null);

  const topic = topics.find(t => t.id === active);

  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: "#0d0d14", minHeight: "100vh", color: "#e0e0e0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a0533, #0d1f3c)", padding: "28px 24px 20px", borderBottom: "1px solid #2a2a3e" }}>
        <div style={{ fontSize: 11, color: "#7b68ee", letterSpacing: 4, textTransform: "uppercase", marginBottom: 6 }}>Jetpack Compose & Kotlin</div>
        <div style={{ fontSize: 26, fontWeight: 900, background: "linear-gradient(90deg, #a78bfa, #60a5fa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Complete Study Guide
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 100px)" }}>
        {/* Sidebar */}
        <div style={{ width: 210, background: "#0a0a12", borderRight: "1px solid #1e1e2e", overflowY: "auto", flexShrink: 0 }}>
          {topics.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              style={{ width: "100%", textAlign: "left", padding: "12px 16px", background: active === t.id ? "#1a1a2e" : "transparent", border: "none", borderLeft: active === t.id ? "3px solid #7b68ee" : "3px solid transparent", color: active === t.id ? "#a78bfa" : "#888", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s" }}>
              <span>{t.emoji}</span>
              <span style={{ lineHeight: 1.3 }}>{t.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {topic && (
            <>
              <h2 style={{ margin: "0 0 20px", fontSize: 20, color: "#c4b5fd", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>{topic.emoji}</span> {topic.title}
              </h2>

              {/* Comparison Tables */}
              {topic.content && !topic.single && !topic.components && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Column headers */}
                  <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: 12 }}>
                    <div></div>
                    {(topic.labels || (topic.id === "state-vs-stateless" ? ["Stateful", "Stateless"] : ["A", "B"])).map((l, i) => (
                      <div key={i} style={{ background: i === 0 ? "#1a0f2e" : "#0f1a2e", border: `1px solid ${i === 0 ? "#7b68ee" : "#3b82f6"}`, borderRadius: 8, padding: "8px 14px", textAlign: "center", fontWeight: 700, color: i === 0 ? "#a78bfa" : "#60a5fa", fontSize: 13 }}>{l}</div>
                    ))}
                  </div>
                  {topic.content.map((row, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: 12, alignItems: "start" }}>
                      <div style={{ background: "#111120", border: "1px solid #2a2a3e", borderRadius: 8, padding: "10px 12px", fontSize: 11, color: "#7b68ee", fontWeight: 700 }}>{row.heading}</div>
                      <div style={{ background: "#13102a", border: "1px solid #3d2d6b", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#d4c8ff", lineHeight: 1.5 }}>{row.stateful || row.a}</div>
                      <div style={{ background: "#0f1827", border: "1px solid #1e3a5f", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#bfdbfe", lineHeight: 1.5 }}>{row.stateless || row.b}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Single content (code/explanation) */}
              {topic.single && (
                <pre style={{ background: "#0a0a14", border: "1px solid #2a2a3e", borderRadius: 12, padding: 20, fontSize: 12, lineHeight: 1.7, color: "#c4b5fd", whiteSpace: "pre-wrap", overflowX: "auto" }}>
                  {topic.content}
                </pre>
              )}

              {/* Components */}
              {topic.components && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {componentData.map((comp, i) => (
                    <div key={i} onClick={() => setExpandedComp(expandedComp === i ? null : i)}
                      style={{ background: "#0f0f1c", border: `1px solid ${expandedComp === i ? comp.color : "#2a2a3e"}`, borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "border 0.2s" }}>
                      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: comp.color, flexShrink: 0 }}></div>
                        <span style={{ fontWeight: 700, color: comp.color, fontSize: 14, flex: 1 }}>{comp.name}</span>
                        <span style={{ color: "#555", fontSize: 11 }}>{expandedComp === i ? "▲ close" : "▼ expand"}</span>
                      </div>
                      {expandedComp === i && (
                        <div style={{ padding: "0 18px 18px" }}>
                          <p style={{ color: "#b0b0c8", fontSize: 13, lineHeight: 1.65, margin: "0 0 14px" }}>{comp.desc}</p>
                          <pre style={{ background: "#07070f", border: "1px solid #1e1e2e", borderRadius: 8, padding: "12px 14px", fontSize: 11, color: "#86efac", margin: 0, overflowX: "auto" }}>{comp.code}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}