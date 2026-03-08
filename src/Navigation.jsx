import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const G = {
  bg:        "#0D1117",   
  panel:     "#111827",   // deep panel
  card:      "#161B22",   // card surface
  border:    "#21262D",   // github style border
  faint:     "#1F2933",   // subtle surfaces
  
  text:      "#E6EDF3",   // github main text
  muted:     "#8B949E",   // muted text
  slate:     "#94A3B8",

  code:      "#7EE787",   // neon green code text
  codeBg:    "#0F1A12",   // dark greenish code block

  // accent palette (Lazarev-inspired neon accents)
  green:     "#4ADE80",
  greenBg:   "#4ADE8020",

  blue:      "#60A5FA",
  blueBg:    "#60A5FA20",

  violet:    "#C084FC",
  violetBg:  "#C084FC20",

  amber:     "#FCD34D",
  amberBg:   "#FCD34D20",

  rose:      "#FB7185",
  roseBg:    "#FB718520",

  teal:      "#2DD4BF",
  tealBg:    "#2DD4BF20",
};

const sections = [
  { id: "intents",      icon: "📨", label: "Intents" },
  { id: "explicit",     icon: "🎯", label: "Explicit Intents" },
  { id: "implicit",     icon: "🌐", label: "Implicit Intents" },
  { id: "navoverview",  icon: "🗺️", label: "Navigation Overview" },
  { id: "setup",        icon: "⚙️", label: "Step 1 – Setup" },
  { id: "navcontroller",icon: "🕹️", label: "Step 2 – NavController" },
  { id: "navhost",      icon: "🏠", label: "Steps 3 & 4 – NavHost" },
  { id: "navigate",     icon: "➡️", label: "Step 5 – Navigate" },
  { id: "args",         icon: "📦", label: "Passing Arguments" },
];

// ── SHARED PRIMITIVES ─────────────────────────────────────────────────────────
const Code = ({ code }) => (
  <pre style={{
    background: G.codeBg, border: `1px solid ${G.border}`,
    borderLeft: `3px solid ${G.green}`, borderRadius: 6,
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
    info: { bg: G.blueBg,   border: G.blue,   icon: "ℹ️" },
    good: { bg: G.greenBg,  border: G.green,  icon: "✅" },
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

const Badge = ({ label, color = G.green }) => (
  <span style={{
    fontSize: 10, padding: "2px 10px", borderRadius: 20,
    border: `1px solid ${color}50`, color,
    background: `${color}12`, letterSpacing: "0.8px",
    textTransform: "uppercase", fontWeight: 700,
    fontFamily: "'Fira Code', monospace",
  }}>{label}</span>
);

const SectionHeader = ({ title, subtitle, badge }) => (
  <div style={{ marginBottom: 26, borderBottom: `1px solid ${G.faint}`, paddingBottom: 20 }}>
    {badge && <div style={{ marginBottom: 10 }}><Badge label={badge} /></div>}
    <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: G.text, letterSpacing: "-0.5px", fontFamily: "'Georgia','Cambria',serif" }}>{title}</h2>
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

const StepBadge = ({ n, color }) => (
  <div style={{
    width: 30, height: 30, borderRadius: "50%",
    background: `${color}18`, border: `1.5px solid ${color}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 800, color, flexShrink: 0,
    fontFamily: "'Fira Code', monospace",
  }}>{n}</div>
);

// ── SECTIONS ──────────────────────────────────────────────────────────────────

function IntentsSection() {
  return (
    <div>
      <SectionHeader
        title="Intents — The Android Messaging System"
        badge="Lecture 4 · Foundations"
        subtitle="Before Compose Navigation existed, everything moved between screens via Intents. Understanding them is still essential — Implicit Intents remain the way to open the camera, browser, maps, and other apps." />

      <div style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 12, padding: "20px 22px", marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: G.blue, fontFamily: "'Georgia', serif", marginBottom: 10 }}>What is an Intent?</div>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: G.text, lineHeight: 1.7 }}>
          An Intent is an abstract description of an operation to be performed. It's the "glue" between Android components — Activities, Services, and Broadcast Receivers. Think of it as a message you pass to the Android OS saying <em>"I want to do X"</em>.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { icon: "🚀", label: "Launch Activities", desc: "Open another screen in your app or another app entirely", color: G.blue },
            { icon: "📡", label: "Send Broadcasts", desc: "Notify other parts of the system about an event", color: G.violet },
            { icon: "⚙️", label: "Start Services", desc: "Kick off background work (download, music, sync)", color: G.teal },
          ].map(({ icon, label, desc, color }) => (
            <div key={label} style={{ background: `${color}08`, border: `1px solid ${color}25`, borderRadius: 8, padding: "14px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "'Fira Code', monospace", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 11, color: G.muted, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider label="Intent structure" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { field: "action", type: "String", desc: "What to do — ACTION_VIEW, ACTION_DIAL, ACTION_SEND, ACTION_MAIN", example: "Intent.ACTION_VIEW", color: G.blue },
          { field: "data", type: "Uri", desc: "What to operate on — a URL, a contact URI, a phone number", example: "Uri.parse(\"tel:+1234\")", color: G.green },
          { field: "extras", type: "Bundle", desc: "Additional key-value data passed to the target component", example: "putExtra(\"key\", value)", color: G.amber },
          { field: "component", type: "ComponentName", desc: "Explicit target class — only for Explicit Intents", example: "DetailActivity::class.java", color: G.violet },
          { field: "category", type: "String", desc: "Additional metadata — CATEGORY_BROWSABLE, CATEGORY_LAUNCHER", example: "Intent.CATEGORY_DEFAULT", color: G.teal },
          { field: "flags", type: "Int", desc: "Control back stack behaviour — FLAG_ACTIVITY_NEW_TASK etc.", example: "FLAG_ACTIVITY_CLEAR_TOP", color: G.rose },
        ].map(({ field, type, desc, example, color }) => (
          <div key={field} style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "'Fira Code', monospace" }}>{field}</span>
              <span style={{ fontSize: 10, color: G.muted, background: G.faint, padding: "1px 6px", borderRadius: 3, fontFamily: "monospace" }}>{type}</span>
            </div>
            <div style={{ fontSize: 12, color: G.muted, lineHeight: 1.5, marginBottom: 6 }}>{desc}</div>
            <code style={{ fontSize: 10, color, fontFamily: "monospace" }}>{example}</code>
          </div>
        ))}
      </div>

      <Divider label="Two types of intents" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[
          { type: "Explicit Intent", icon: "🎯", color: G.blue, desc: "You specify exactly which Activity class to open. Used for navigating within YOUR own app.", when: ["Navigate to DetailActivity", "Open SettingsActivity", "Start a background Service you wrote"] },
          { type: "Implicit Intent", icon: "🌐", color: G.green, desc: "You describe WHAT you want to do. Android finds the right app/component from all apps installed on the device.", when: ["Open a URL in a browser", "Dial a phone number", "Share text to any app", "Open the camera"] },
        ].map(({ type, icon, color, desc, when }) => (
          <div key={type} style={{ background: `${color}08`, border: `1.5px solid ${color}30`, borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color, fontFamily: "'Georgia', serif", marginBottom: 8 }}>{type}</div>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: G.text, lineHeight: 1.6 }}>{desc}</p>
            <div style={{ fontSize: 11, color: G.muted, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Use when</div>
            {when.map(w => <div key={w} style={{ fontSize: 12, color: G.slate, padding: "3px 0" }}>• {w}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExplicitSection() {
  const [tab, setTab] = useState("launch");
  return (
    <div>
      <SectionHeader
        title="Explicit Intents"
        badge="Lecture 4 · Intents"
        subtitle="Used to navigate between Activities within your own app. You name the exact destination class — no ambiguity." />

      <Note type="info">In modern Android, you mostly use <strong>Jetpack Navigation</strong> inside a single Activity to navigate between screens. But Explicit Intents are still needed to launch separate Activities (e.g. a settings Activity, or an Activity in another module).</Note>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["launch","🚀","Launch Activity"],["data","📤","Pass Data"],["result","📥","Receive Data"]].map(([id,icon,label]) => (
          <Pill key={id} label={`${icon} ${label}`} active={tab===id} color={G.blue} onClick={() => setTab(id)} />
        ))}
      </div>

      {tab === "launch" && (
        <div>
          <div style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 10, padding: "18px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: G.blue, fontFamily: "monospace", marginBottom: 10 }}>Pattern: create Intent → startActivity</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              {["Create Intent(context, TargetActivity::class.java)", "→", "Optionally putExtra(key, value)", "→", "Call startActivity(intent)"].map((s, i) => s === "→"
                ? <span key={i} style={{ color: G.muted, fontSize: 16 }}>→</span>
                : <div key={i} style={{ background: `${G.blue}10`, border: `1px solid ${G.blue}25`, borderRadius: 6, padding: "6px 12px", fontSize: 11, color: G.blue, fontFamily: "monospace" }}>{s}</div>
              )}
            </div>
          </div>
          <Code code={`// Inside a Composable — launch a new Activity
@Composable
fun HomeScreen() {
    val context = LocalContext.current

    Button(onClick = {
        val intent = Intent(context, DetailActivity::class.java)
        context.startActivity(intent)
    }) {
        Text("Open Detail")
    }
}

// Note: In modern single-Activity apps, prefer NavController.navigate()
// Use explicit intents for truly separate Activities (Settings, Login, etc.)`} />
        </div>
      )}

      {tab === "data" && (
        <div>
          <Note type="tip">Use <code>putExtra(key, value)</code> to pass primitives and Strings. For complex objects, use <code>@Parcelize</code> data classes with <code>putExtra(key, parcelableObj)</code>.</Note>
          <Code code={`// Sending Activity — pack data into the intent
val intent = Intent(context, ProfileActivity::class.java).apply {
    putExtra("USER_ID", "user_abc_123")          // String
    putExtra("USER_AGE", 28)                      // Int
    putExtra("IS_PREMIUM", true)                  // Boolean
    putExtra("SCORE", 98.5f)                      // Float
}
context.startActivity(intent)

// ---

// Sending a Parcelable object (add kotlin-parcelize plugin)
@Parcelize
data class UserProfile(
    val id: String,
    val name: String,
    val avatarUrl: String
) : Parcelable

val intent = Intent(context, DetailActivity::class.java).apply {
    putExtra("USER_PROFILE", UserProfile("1", "Alice", "https://..."))
}
context.startActivity(intent)`} />
        </div>
      )}

      {tab === "result" && (
        <div>
          <Note type="info">In the destination Activity (or Composable), use <code>intent.getIntent()</code> to read back whatever was packed into the intent.</Note>
          <Code code={`// Receiving Activity — unpack extras from getIntent()
class DetailActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Retrieve extras — always provide a default!
        val userId  = intent.getStringExtra("USER_ID") ?: ""
        val age     = intent.getIntExtra("USER_AGE", 0)
        val premium = intent.getBooleanExtra("IS_PREMIUM", false)

        // Parcelable
        val profile = intent.getParcelableExtra<UserProfile>("USER_PROFILE")

        setContent {
            DetailScreen(userId = userId, isPremium = premium)
        }
    }
}

// --- Getting result back (modern API — replaces startActivityForResult)
val launcher = rememberLauncherForActivityResult(
    contract = ActivityResultContracts.StartActivityForResult()
) { result ->
    if (result.resultCode == Activity.RESULT_OK) {
        val pickedData = result.data?.getStringExtra("RESULT_KEY")
        // handle result
    }
}

// Launch it:
Button(onClick = {
    val intent = Intent(context, PickerActivity::class.java)
    launcher.launch(intent)
}) { Text("Pick something") }`} />
        </div>
      )}
    </div>
  );
}

function ImplicitSection() {
  const [tab, setTab] = useState("overview");
  const examples = [
    { label: "Open URL", color: G.blue, code: `val intent = Intent(Intent.ACTION_VIEW,
    Uri.parse("https://developer.android.com"))
context.startActivity(intent)` },
    { label: "Dial Number", color: G.green, code: `val intent = Intent(Intent.ACTION_DIAL,
    Uri.parse("tel:+1234567890"))
context.startActivity(intent)` },
    { label: "Send Email", color: G.amber, code: `val intent = Intent(Intent.ACTION_SEND).apply {
    type = "text/plain"
    putExtra(Intent.EXTRA_EMAIL, arrayOf("hi@example.com"))
    putExtra(Intent.EXTRA_SUBJECT, "Hello!")
    putExtra(Intent.EXTRA_TEXT, "Email body here")
}
context.startActivity(Intent.createChooser(intent, "Send via"))` },
    { label: "Share Text", color: G.violet, code: `val intent = Intent(Intent.ACTION_SEND).apply {
    type = "text/plain"
    putExtra(Intent.EXTRA_TEXT, "Check this out!")
}
context.startActivity(Intent.createChooser(intent, "Share with"))` },
  ];
  return (
    <div>
      <SectionHeader
        title="Implicit Intents"
        badge="Lecture 4 · Intents"
        subtitle="Let the OS find the right app. You describe the action + data; Android matches it against installed apps' intent filters and presents choices if multiple match." />

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[["overview","📋","How it works"],["examples","💡","Common examples"],["camera","📷","Camera permission"]].map(([id,icon,label]) => (
          <Pill key={id} label={`${icon} ${label}`} active={tab===id} color={G.green} onClick={() => setTab(id)} />
        ))}
      </div>

      {tab === "overview" && (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {[
              { n:1, color: G.blue,   label: "Your app fires implicit intent", desc: "You set action + data (e.g. ACTION_VIEW + a URL). No target class named." },
              { n:2, color: G.green,  label: "Android scans intent filters",   desc: "The OS reads every installed app's AndroidManifest.xml to find components whose <intent-filter> matches your action + data." },
              { n:3, color: G.amber,  label: "One match → opens directly",     desc: "If exactly one app handles it, Android opens it immediately." },
              { n:4, color: G.violet, label: "Multiple matches → chooser dialog", desc: "If several apps match (e.g. multiple browsers), Android shows a 'Open with' sheet for the user to pick." },
            ].map(({ n, color, label, desc }) => (
              <div key={n} style={{ display: "flex", gap: 14, padding: "14px 16px", background: G.panel, border: `1px solid ${G.border}`, borderRadius: 8 }}>
                <StepBadge n={n} color={color} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "monospace", marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 12, color: G.muted, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Note type="warn">Always check if something can handle your intent with <code>intent.resolveActivity(packageManager) != null</code> before calling <code>startActivity()</code> — otherwise you'll get a crash if no app is installed.</Note>
          <Code code={`// Safety check before starting
val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://example.com"))
if (intent.resolveActivity(packageManager) != null) {
    startActivity(intent)
} else {
    // No browser installed — show error
}`} />
        </div>
      )}

      {tab === "examples" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {examples.map(({ label, color, code }) => (
              <div key={label} style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 10, overflow: "hidden" }}>
                <div style={{ padding: "10px 14px", background: `${color}10`, borderBottom: `1px solid ${G.border}` }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "monospace" }}>{label}</span>
                </div>
                <div style={{ padding: "0 12px 8px" }}><Code code={code} /></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "camera" && (
        <div>
          <Note type="info">Camera access requires both a <strong>Manifest declaration</strong> and a <strong>runtime permission request</strong>. In Compose, use <code>rememberLauncherForActivityResult</code> for both.</Note>
          <Divider label="1 — Manifest" />
          <Code code={`<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="true" />`} />
          <Divider label="2 — Request permission at runtime" />
          <Code code={`@Composable
fun CameraButton() {
    val context = LocalContext.current

    // Launcher for PERMISSION request
    val permissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) openCamera(context)
        else showRationale(context)
    }

    // Launcher for CAMERA result (captures photo)
    val cameraLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.TakePicturePreview()
    ) { bitmap ->
        // bitmap is the captured photo thumbnail (Bitmap?)
        bitmap?.let { displayPhoto(it) }
    }

    Button(onClick = {
        when {
            ContextCompat.checkSelfPermission(
                context, Manifest.permission.CAMERA
            ) == PackageManager.PERMISSION_GRANTED -> {
                // Already granted → open camera
                cameraLauncher.launch(null)
            }
            else -> {
                // Not granted → request it
                permissionLauncher.launch(Manifest.permission.CAMERA)
            }
        }
    }) {
        Text("Take Photo")
    }
}`} />
          <Note type="tip"><code>rememberLauncherForActivityResult</code> is the modern replacement for <code>startActivityForResult</code> in Compose. It handles the Activity result lifecycle correctly even across recompositions.</Note>
        </div>
      )}
    </div>
  );
}

function NavOverviewSection() {
  const [active, setActive] = useState(0);
  const parts = [
    {
      title: "Navigation Graph", icon: "🗺️", color: G.blue,
      desc: "A resource (or in Compose, a Kotlin DSL) that defines ALL destinations in your app and the possible paths between them. Think of it as the app's 'sitemap'.",
      analogy: "Like a city map — every location and every road is defined in one place.",
      details: ["Defines all screens (destinations)", "Defines all possible routes between them", "Can define deep links (external URLs that open specific screens)", "Supports nested graphs for feature modules"],
    },
    {
      title: "NavHost", icon: "🖼️", color: G.green,
      desc: "A composable that acts as a container — it displays the current destination's UI. As the user navigates, NavHost swaps in the appropriate composable.",
      analogy: "Like a picture frame — the frame stays fixed, but the picture inside changes.",
      details: ["Single composable in your layout", "Hosts the current destination's composable", "Connects to NavController for updates", "Handles enter/exit transitions"],
    },
    {
      title: "NavController", icon: "🕹️", color: G.violet,
      desc: "A Kotlin object that tracks WHERE the user is in the navigation graph. You call navigate(), popBackStack(), navigateUp() on it to move between screens.",
      analogy: "Like a GPS — it tracks your current location and routes you to your next destination.",
      details: ["Created once with rememberNavController()", "Tracks current position (back stack)", "Call navigate(route) to go somewhere", "Call popBackStack() to go back"],
    },
  ];
  const p = parts[active];
  return (
    <div>
      <SectionHeader
        title="Navigation Component — Overview"
        badge="Lecture 4 · Navigation"
        subtitle="Jetpack Navigation for Compose replaces multi-Activity apps with a single Activity that swaps composable 'screens'. Three parts work together." />

      <Note type="info">Modern Android apps use a <strong>single Activity</strong> pattern. One Activity, many composable screens, all connected by the Navigation component. No more <code>startActivity()</code> for internal navigation.</Note>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {parts.map((part, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            flex: 1, padding: "14px 10px", borderRadius: 10, cursor: "pointer",
            border: `1.5px solid ${active === i ? part.color : G.border}`,
            background: active === i ? `${part.color}10` : G.panel,
            textAlign: "center", transition: "all 0.18s", outline: "none",
          }}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>{part.icon}</div>
            <div style={{ fontSize: 11, color: active === i ? part.color : G.muted, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "monospace", fontWeight: active === i ? 700 : 400 }}>{part.title}</div>
          </button>
        ))}
      </div>

      <div style={{ background: `${p.color}08`, border: `1.5px solid ${p.color}30`, borderRadius: 10, padding: "20px 22px", marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: p.color, fontFamily: "'Georgia', serif", marginBottom: 10 }}>{p.icon} {p.title}</div>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: G.text, lineHeight: 1.7 }}>{p.desc}</p>
        <div style={{ background: `${p.color}12`, border: `1px solid ${p.color}25`, borderRadius: 6, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: p.color, fontStyle: "italic" }}>
          💬 Analogy: {p.analogy}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {p.details.map(d => (
            <div key={d} style={{ display: "flex", gap: 8, fontSize: 12, color: G.slate, alignItems: "flex-start" }}>
              <span style={{ color: p.color, flexShrink: 0 }}>•</span>{d}
            </div>
          ))}
        </div>
      </div>

      <Divider label="How the three parts connect" />
      <div style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 10, padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", gap: 8, flexWrap: "wrap" }}>
          {[
            { label: "NavGraph", sub: "defines destinations\n& routes", color: G.blue, icon: "🗺️" },
            { arrow: "informs" },
            { label: "NavHost", sub: "renders current\ndestination UI", color: G.green, icon: "🖼️" },
            { arrow: "reads" },
            { label: "NavController", sub: "tracks position,\nhandles navigate()", color: G.violet, icon: "🕹️" },
          ].map((item, i) => item.arrow
            ? <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{ fontSize: 18, color: G.muted }}>→</div>
                <div style={{ fontSize: 10, color: G.muted, fontFamily: "monospace" }}>{item.arrow}</div>
              </div>
            : <div key={i} style={{ textAlign: "center", padding: "12px 16px", background: `${item.color}10`, border: `1px solid ${item.color}30`, borderRadius: 8 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: "monospace", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 10, color: G.muted, whiteSpace: "pre-line", lineHeight: 1.4 }}>{item.sub}</div>
              </div>
          )}
        </div>
      </div>

      <Divider label="Compose Navigation benefits" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {[
          ["🎬", "Animations & transitions", "Standardized enter/exit animations between screens"],
          ["🔗", "Deep linking", "External URLs open specific screens directly"],
          ["🧭", "UI patterns", "Bottom nav, drawers, tab bars with minimal boilerplate"],
          ["🔒", "Type safety", "Compile-time checked routes (Navigation 2.8+)"],
          ["📱", "ViewModel scoping", "Share a ViewModel across all destinations in a sub-graph"],
          ["⬅️", "Back/Up handling", "Correct behaviour by default — no manual stack management"],
        ].map(([icon, title, desc]) => (
          <div key={title} style={{ display: "flex", gap: 12, padding: "12px 14px", background: G.card, border: `1px solid ${G.faint}`, borderRadius: 8 }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: G.slate, marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 11, color: G.muted, lineHeight: 1.4 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetupSection() {
  return (
    <div>
      <SectionHeader
        title="Step 1 — Setup & Dependencies"
        badge="Lecture 4 · Step 1 of 5"
        subtitle="Add the Navigation Compose dependency to your build file. One dependency unlocks NavController, NavHost, and all the navigation DSL." />

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { n: "1", label: "Add dependency", color: G.green },
          { n: "2", label: "Sync Gradle", color: G.blue },
          { n: "3", label: "Use Navigation APIs", color: G.violet },
        ].map(({ n, label, color }) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StepBadge n={n} color={color} />
            <span style={{ fontSize: 13, color: G.slate, fontFamily: "monospace" }}>{label}</span>
            {n !== "3" && <span style={{ color: G.muted, fontSize: 16 }}>→</span>}
          </div>
        ))}
      </div>

      <Divider label="build.gradle.kts (app module)" />
      <Code code={`// Modern approach — use the version catalog (libs.versions.toml)
dependencies {
    implementation(libs.androidx.navigation.compose)
}

// Or add directly:
dependencies {
    implementation("androidx.navigation:navigation-compose:2.8.0")
}`} />

      <Divider label="libs.versions.toml (recommended)" />
      <Code code={`# gradle/libs.versions.toml
[versions]
navigationCompose = "2.8.0"

[libraries]
androidx-navigation-compose = {
    group = "androidx.navigation",
    name = "navigation-compose",
    version.ref = "navigationCompose"
}`} />

      <Note type="tip">
        Use Navigation <strong>2.8+</strong> — it introduced type-safe routes with <code>@Serializable</code> data classes, catching navigation bugs at compile time instead of runtime. Always prefer this over string-based routes.
      </Note>

      <Divider label="Also add serialization (for type-safe routes)" />
      <Code code={`# libs.versions.toml
[versions]
kotlinxSerialization = "1.7.0"

[plugins]
kotlinx-serialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin" }

# ---
# build.gradle.kts (app)
plugins {
    alias(libs.plugins.kotlinx.serialization)
}

dependencies {
    implementation(libs.kotlinx.serialization.json)
    implementation(libs.androidx.navigation.compose)
}`} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
        {[
          { title: "What you get", color: G.green, items: ["NavController (rememberNavController)", "NavHost composable", "Type-safe navigation DSL", "Deep link support", "Animated transitions API"] },
          { title: "What you don't need", color: G.rose, items: ["Multiple Activity declarations in Manifest", "startActivity() for internal navigation", "String-based route literals (with 2.8+)", "Manual fragment transactions", "Manual back stack management"] },
        ].map(({ title, color, items }) => (
          <div key={title} style={{ background: `${color}08`, border: `1px solid ${color}25`, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "monospace", marginBottom: 10 }}>{title}</div>
            {items.map(i => <div key={i} style={{ fontSize: 12, color: G.slate, padding: "3px 0", lineHeight: 1.4 }}>• {i}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavControllerSection() {
  return (
    <div>
      <SectionHeader
        title="Step 2 — Create NavController"
        badge="Lecture 4 · Step 2 of 5"
        subtitle="NavController is the brain of navigation. Create it once at the top of your composable tree with rememberNavController() and pass it down." />

      <Note type="warn"><strong>Create NavController ONCE</strong> — at the root composable level. Never create it inside a screen composable. It must outlive the screens it controls.</Note>

      <Code code={`// ✅ CORRECT — create at root, pass down
@Composable
fun App() {
    // Created once, survives recomposition via remember
    val navController = rememberNavController()

    AppNavHost(navController = navController)
}

// ❌ WRONG — never create inside a screen
@Composable
fun HomeScreen() {
    val navController = rememberNavController() // don't do this!
}`} />

      <Divider label="What NavController gives you" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { method: "navigate(route)", desc: "Go to a new destination. Pushes it onto the back stack.", color: G.green },
          { method: "popBackStack()", desc: "Go back to the previous destination. Like pressing the back button.", color: G.blue },
          { method: "navigateUp()", desc: "Navigate up in the hierarchy (similar to back, respects nav graph structure).", color: G.violet },
          { method: "currentBackStackEntry", desc: "The current destination's back stack entry — for reading args.", color: G.amber },
          { method: "popBackStack(route, inclusive)", desc: "Pop back to a specific destination, optionally removing it too.", color: G.teal },
          { method: "navigate(route) { launchSingleTop = true }", desc: "Avoid duplicate destinations on the back stack (important for bottom nav tabs).", color: G.rose },
        ].map(({ method, desc, color }) => (
          <div key={method} style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color, fontFamily: "'Fira Code', monospace", marginBottom: 4 }}>navController.{method}</div>
            <div style={{ fontSize: 12, color: G.muted, lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>

      <Divider label="The back stack" />
      <div style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 10, padding: "18px 20px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: G.blue, fontFamily: "monospace", marginBottom: 14 }}>How the back stack grows and shrinks</div>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
          {[
            { screens: ["Home"], action: "Initial state", color: G.green },
            { screens: ["Home","List"], action: "navigate(ListRoute)", color: G.blue },
            { screens: ["Home","List","Detail"], action: "navigate(DetailRoute)", color: G.violet },
            { screens: ["Home","List"], action: "popBackStack()", color: G.amber },
          ].map(({ screens, action, color }, i) => (
            <div key={i} style={{ flex: 1, minWidth: 100 }}>
              <div style={{ fontSize: 10, color: G.muted, fontFamily: "monospace", marginBottom: 6, textAlign: "center" }}>{action}</div>
              <div style={{ display: "flex", flexDirection: "column-reverse", gap: 3, alignItems: "center" }}>
                {screens.map((s, j) => (
                  <div key={s} style={{
                    padding: "6px 10px", width: "100%", textAlign: "center",
                    background: j === screens.length - 1 ? `${color}18` : G.faint,
                    border: `1px solid ${j === screens.length - 1 ? color : G.border}`,
                    borderRadius: 5, fontSize: 11, fontFamily: "monospace",
                    color: j === screens.length - 1 ? color : G.muted,
                    fontWeight: j === screens.length - 1 ? 700 : 400,
                  }}>{s}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: G.muted, textAlign: "center" }}>← Highlighted = currently shown screen</div>
      </div>
    </div>
  );
}

function NavHostSection() {
  const [tab, setTab] = useState("screens");
  return (
    <div>
      <SectionHeader
        title="Steps 3 & 4 — Screens + NavHost"
        badge="Lecture 4 · Steps 3 & 4 of 5"
        subtitle="Step 3: create a composable for each screen. Step 4: wire them together inside a NavHost using type-safe routes." />

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[["screens","🖼️","Step 3: Screen composables"],["routes","🗺️","Define Routes"],["navhost","🏠","Step 4: NavHost"]].map(([id,icon,label]) => (
          <Pill key={id} label={`${icon} ${label}`} active={tab===id} color={G.violet} onClick={() => setTab(id)} />
        ))}
      </div>

      {tab === "screens" && (
        <div>
          <Note type="tip">Each "screen" is just a regular <code>@Composable</code> function. It doesn't know anything about navigation — it receives data as parameters and emits events via callbacks.</Note>
          <Code code={`// Home screen — stateless, knows nothing about navigation
@Composable
fun HomeScreen(
    onNavigateToList: () -> Unit,       // event: user wants to go to list
    onNavigateToProfile: () -> Unit,    // event: user wants to go to profile
    viewModel: HomeViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("Home", style = MaterialTheme.typography.headlineMedium)
        Button(onClick = onNavigateToList)    { Text("Go to List") }
        Button(onClick = onNavigateToProfile) { Text("My Profile") }
    }
}

// List screen
@Composable
fun ListScreen(
    onItemClick: (itemId: String) -> Unit,
    onBack: () -> Unit,
    viewModel: ListViewModel = hiltViewModel()
) { /* ... */ }

// Detail screen
@Composable
fun DetailScreen(
    itemId: String,             // data passed via route parameter
    onBack: () -> Unit
) { /* ... */ }`} />
        </div>
      )}

      {tab === "routes" && (
        <div>
          <Note type="good">Navigation 2.8+ uses <code>@Serializable</code> data classes as routes. This is <strong>type-safe</strong> — route parameters are checked at compile time, not runtime.</Note>
          <Code code={`// Define routes as @Serializable objects/classes
// Add: implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.0")

// Object for screens with NO parameters
@Serializable object HomeRoute
@Serializable object ListRoute
@Serializable object SettingsRoute

// Data class for screens WITH parameters
@Serializable data class DetailRoute(val itemId: String)
@Serializable data class ProfileRoute(val userId: String, val showEdit: Boolean = false)

// Compare to old string-based approach (avoid this):
// navController.navigate("detail/\$itemId")  ← typo-prone, no type checking
// navController.navigate("detail/\${item.id}")

// vs type-safe (preferred):
// navController.navigate(DetailRoute(itemId = item.id))  ← compile-time checked ✓`} />
        </div>
      )}

      {tab === "navhost" && (
        <div>
          <Code code={`// Your main App composable — wires everything together
@Composable
fun AppNavHost(
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = HomeRoute    // first screen shown
    ) {

        // Register each destination
        composable<HomeRoute> {
            HomeScreen(
                onNavigateToList    = { navController.navigate(ListRoute) },
                onNavigateToProfile = { navController.navigate(ProfileRoute("me")) }
            )
        }

        composable<ListRoute> {
            ListScreen(
                onItemClick = { id -> navController.navigate(DetailRoute(id)) },
                onBack      = { navController.popBackStack() }
            )
        }

        composable<DetailRoute> { backStackEntry ->
            // Extract the typed route object
            val route = backStackEntry.toRoute<DetailRoute>()
            DetailScreen(
                itemId = route.itemId,
                onBack = { navController.popBackStack() }
            )
        }

        composable<ProfileRoute> { backStackEntry ->
            val route = backStackEntry.toRoute<ProfileRoute>()
            ProfileScreen(
                userId   = route.userId,
                showEdit = route.showEdit,
                onBack   = { navController.popBackStack() }
            )
        }
    }
}`} />
          <Note type="tip">
            Notice how <strong>navigation logic lives in NavHost</strong>, not inside the screen composables. Screens just call callbacks — they never call <code>navController.navigate()</code> directly. This keeps screens reusable and testable.
          </Note>
        </div>
      )}
    </div>
  );
}

function NavigateSection() {
  const [tab, setTab] = useState("basic");
  return (
    <div>
      <SectionHeader
        title="Step 5 — Handling Navigation"
        badge="Lecture 4 · Step 5 of 5"
        subtitle="Use NavController to move between destinations. Understand back stack options to avoid common bugs like duplicate screens or broken back behaviour." />

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[["basic","➡️","Basic navigate"],["options","⚙️","Back stack options"],["bottomnav","📱","Bottom nav"],["deeplink","🔗","Deep links"]].map(([id,icon,label]) => (
          <Pill key={id} label={`${icon} ${label}`} active={tab===id} color={G.amber} onClick={() => setTab(id)} />
        ))}
      </div>

      {tab === "basic" && (
        <div>
          <Code code={`// Basic navigation — push a new destination onto the stack
navController.navigate(DetailRoute(itemId = "abc123"))

// Go back — pop the current destination off the stack
navController.popBackStack()

// Navigate up (respects graph hierarchy — preferred over popBackStack for Up button)
navController.navigateUp()

// Pop back to a specific destination (inclusive = also remove that destination)
navController.popBackStack(route = HomeRoute, inclusive = false)
// inclusive = true would remove HomeRoute too

// Navigate and clear everything up to a route (e.g. after login)
navController.navigate(HomeRoute) {
    popUpTo(LoginRoute) { inclusive = true }
}`} />
          <Note type="info">
            Use <strong>popBackStack()</strong> for a "Back" button behaviour. Use <strong>navigateUp()</strong> for a "Up arrow" (←) in the top app bar. They're usually the same, but navigateUp() respects parent graphs.
          </Note>
        </div>
      )}

      {tab === "options" && (
        <div>
          <Note type="warn">These options prevent the most common navigation bugs — especially important for bottom navigation bars where tapping the same tab repeatedly could stack duplicates.</Note>
          <Code code={`// Navigate with options using the NavOptions DSL
navController.navigate(HomeRoute) {

    // Pop everything up to (not including) HomeRoute before navigating
    // Use for bottom nav — go "back to root" of a tab
    popUpTo(HomeRoute) {
        saveState = true     // save scroll/state of popped screens
    }

    // Don't create a duplicate of HomeRoute if it's already on top
    launchSingleTop = true

    // Restore saved state when navigating to a previously visited tab
    restoreState = true
}

// Common bottom nav helper — navigate to a tab properly
fun NavController.navigateToTab(route: Any) {
    navigate(route) {
        popUpTo(graph.findStartDestination().id) {
            saveState = true
        }
        launchSingleTop = true
        restoreState = true
    }
}`} />
          <Divider label="Option quick reference" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              ["launchSingleTop = true", "Don't add duplicate if destination is already on top", G.green],
              ["popUpTo(route)", "Clear back stack up to (not including) this route", G.blue],
              ["popUpTo { inclusive = true }", "Clear back stack including this route", G.violet],
              ["saveState = true", "Save state of screens being popped (pair with restoreState)", G.amber],
              ["restoreState = true", "Restore previously saved state when revisiting", G.teal],
              ["popUpTo(graph.startDestination)", "Used in bottom nav to reset to start of graph", G.rose],
            ].map(([opt, desc, color]) => (
              <div key={opt} style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color, fontFamily: "monospace", marginBottom: 4 }}>{opt}</div>
                <div style={{ fontSize: 11, color: G.muted, lineHeight: 1.4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "bottomnav" && (
        <div>
          <Code code={`// Full bottom navigation implementation
@Serializable object HomeRoute
@Serializable object SearchRoute
@Serializable object ProfileRoute

@Composable
fun MainScreen() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination

    Scaffold(
        bottomBar = {
            NavigationBar {
                listOf(
                    Triple(HomeRoute,   "Home",    Icons.Default.Home),
                    Triple(SearchRoute, "Search",  Icons.Default.Search),
                    Triple(ProfileRoute,"Profile", Icons.Default.Person),
                ).forEach { (route, label, icon) ->
                    NavigationBarItem(
                        icon = { Icon(icon, label) },
                        label = { Text(label) },
                        selected = currentDestination?.hasRoute(route::class) == true,
                        onClick = {
                            navController.navigate(route) {
                                popUpTo(navController.graph.findStartDestination().id) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                }
            }
        }
    ) { padding ->
        NavHost(navController, HomeRoute, Modifier.padding(padding)) {
            composable<HomeRoute>    { HomeScreen() }
            composable<SearchRoute>  { SearchScreen() }
            composable<ProfileRoute> { ProfileScreen() }
        }
    }
}`} />
        </div>
      )}

      {tab === "deeplink" && (
        <div>
          <Note type="info">Deep links let an external URL open a specific screen. e.g. <code>myapp://detail/abc123</code> opens DetailScreen with <code>itemId = "abc123"</code>.</Note>
          <Code code={`// 1. Register deep link in AndroidManifest.xml
// <activity android:name=".MainActivity">
//   <intent-filter>
//     <action android:name="android.intent.action.VIEW" />
//     <category android:name="android.intent.category.DEFAULT" />
//     <category android:name="android.intent.category.BROWSABLE" />
//     <data android:scheme="myapp" android:host="detail" />
//   </intent-filter>
// </activity>

// 2. Add deepLinks to your composable destination
composable<DetailRoute>(
    deepLinks = listOf(
        navDeepLink<DetailRoute>(basePath = "myapp://detail")
    )
) { backStackEntry ->
    val route = backStackEntry.toRoute<DetailRoute>()
    DetailScreen(itemId = route.itemId, onBack = { navController.popBackStack() })
}

// Now a link like myapp://detail?itemId=abc123
// will open DetailScreen with itemId = "abc123" directly`} />
        </div>
      )}
    </div>
  );
}

function ArgsSection() {
  return (
    <div>
      <SectionHeader
        title="Passing & Receiving Arguments"
        badge="Lecture 4 · Arguments"
        subtitle="With type-safe Navigation 2.8+, arguments are fields on your @Serializable route data class — no more string parsing or nullable bundle extractions." />

      <Note type="good">Type-safe routes are the biggest quality-of-life improvement in modern Compose Navigation. Arguments are Kotlin fields — null safety, type checking, and IDE autocomplete all work.</Note>

      <Divider label="Complete example — passing and receiving" />
      <Code code={`// ── 1. Define the route with typed parameters ──────────────────────────────
@Serializable
data class ProductDetailRoute(
    val productId: String,
    val fromCategory: String,          // required String
    val showReviews: Boolean = false,  // optional with default
    val previewPage: Int = 0,          // optional with default
)

// ── 2. Navigate and pass arguments ──────────────────────────────────────────
// In the calling composable or NavHost:
navController.navigate(
    ProductDetailRoute(
        productId    = "prod_42",
        fromCategory = "Electronics",
        showReviews  = true
        // previewPage uses default: 0
    )
)

// ── 3. Register destination in NavHost ──────────────────────────────────────
composable<ProductDetailRoute> { backStackEntry ->

    // Extract the typed route — no bundle parsing, no string splitting!
    val route: ProductDetailRoute = backStackEntry.toRoute()

    ProductDetailScreen(
        productId    = route.productId,       // String ✓
        fromCategory = route.fromCategory,    // String ✓
        showReviews  = route.showReviews,     // Boolean ✓
        previewPage  = route.previewPage,     // Int ✓
        onBack       = { navController.popBackStack() }
    )
}

// ── 4. The screen composable ─────────────────────────────────────────────────
@Composable
fun ProductDetailScreen(
    productId: String,
    fromCategory: String,
    showReviews: Boolean,
    previewPage: Int,
    onBack: () -> Unit,
    viewModel: ProductDetailViewModel = hiltViewModel()
) {
    // Pass productId to ViewModel for data loading
    LaunchedEffect(productId) { viewModel.load(productId) }
    // render UI...
}`} />

      <Divider label="Supported argument types" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          ["String", "Any text value", G.green, true],
          ["Int", "32-bit integer", G.blue, true],
          ["Long", "64-bit integer", G.violet, true],
          ["Boolean", "true / false", G.amber, true],
          ["Float", "Floating point", G.teal, true],
          ["@Serializable class", "Nested objects", G.rose, true],
          ["List<String>", "Collections", G.green, true],
          ["nullable T?", "Optional values", G.blue, true],
          ["Enum", "via serialization", G.violet, true],
        ].map(([type, desc, color, supported]) => (
          <div key={type} style={{ padding: "10px 12px", background: G.panel, border: `1px solid ${G.border}`, borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "monospace", marginBottom: 3 }}>{type}</div>
            <div style={{ fontSize: 11, color: G.muted }}>{desc}</div>
          </div>
        ))}
      </div>

      <Divider label="Nested @Serializable objects as arguments" />
      <Code code={`// Pass complex objects as route parameters
@Serializable
data class FilterConfig(
    val query: String = "",
    val minPrice: Float = 0f,
    val maxPrice: Float = 9999f,
    val sortBy: String = "name"
)

@Serializable
data class SearchResultsRoute(
    val filter: FilterConfig,   // nested Serializable ✓
    val page: Int = 1
)

// Navigate:
navController.navigate(
    SearchResultsRoute(
        filter = FilterConfig(query = "laptop", minPrice = 500f),
        page = 1
    )
)`} />

      <Note type="warn">
        Avoid passing large data objects as route arguments. Instead, pass an <strong>ID</strong> (e.g. <code>productId: String</code>) and load the full object in the destination's ViewModel. Routes are serialized into URLs internally — they should stay small.
      </Note>

      <Divider label="Full navigation flow summary" />
      <div style={{ background: G.panel, border: `1px solid ${G.border}`, borderRadius: 12, padding: "20px 22px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: G.slate, fontFamily: "monospace", marginBottom: 16 }}>5-step checklist to implement navigation</div>
        {[
          ["Add dependency", "navigation-compose + kotlinx-serialization in build.gradle.kts", G.green],
          ["Define routes", "@Serializable objects (no args) or data classes (with args)", G.blue],
          ["Create screen composables", "Stateless composables that accept data and emit event callbacks", G.violet],
          ["Build NavHost", "Register all composable<Route> destinations, connect to navController", G.amber],
          ["Call navController.navigate()", "From the NavHost callbacks — never from inside screen composables", G.teal],
        ].map(([title, desc, color], i) => (
          <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12, padding: "12px 14px", background: G.card, border: `1px solid ${G.faint}`, borderRadius: 8 }}>
            <StepBadge n={i + 1} color={color} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "monospace", marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: G.muted, lineHeight: 1.5 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function Lecture4Guide() {
  const [active, setActive] = useState("intents");
  const navigate = useNavigate();

  const render = () => {
    switch (active) {
      case "intents":       return <IntentsSection />;
      case "explicit":      return <ExplicitSection />;
      case "implicit":      return <ImplicitSection />;
      case "navoverview":   return <NavOverviewSection />;
      case "setup":         return <SetupSection />;
      case "navcontroller": return <NavControllerSection />;
      case "navhost":       return <NavHostSection />;
      case "navigate":      return <NavigateSection />;
      case "args":          return <ArgsSection />;
    }
  };

  const groups = [
    { label: "Intents", ids: ["intents","explicit","implicit"] },
    { label: "Navigation", ids: ["navoverview","setup","navcontroller","navhost","navigate","args"] },
  ];

  return (
    <div style={{ background: G.bg, minHeight: "100vh", fontFamily: "'Trebuchet MS', Tahoma, sans-serif", color: G.text, display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ background: G.panel, borderBottom: `1px solid ${G.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: G.greenBg, border: `1.5px solid ${G.green}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🧭</div>
        <div>
          <div style={{ fontSize: 10, color: G.muted, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "monospace" }}>Android · Kotlin · Jetpack Compose</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: G.text, letterSpacing: "-0.3px" }}>Lecture 4 — Jetpack Compose Navigation</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span onClick={()=>navigate("/Lecture03")}style={{ cursor: "pointer", fontSize: 11, background: G.amberBg, color: G.amber, border: `1px solid ${G.amber}30`, padding: "3px 10px", borderRadius: 20, fontFamily: "monospace" }}>← L3: State Mgmt</span>
          <span onClick={()=>navigate("/Lecture04")}style={{ cursor: "pointer", fontSize: 11, background: G.blueBg, color: G.blue, border: `1px solid ${G.blue}30`, padding: "3px 10px", borderRadius: 20, fontFamily: "monospace" }}>Series complete ✓</span>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <div style={{ width: 210, flexShrink: 0, background: G.panel, borderRight: `1px solid ${G.border}`, padding: "16px 0", overflowY: "auto" }}>
          {groups.map(({ label, ids }) => (
            <div key={label}>
              <div style={{ fontSize: 9, color: G.muted, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "monospace", padding: "10px 20px 6px" }}>{label}</div>
              {ids.map(id => {
                const s = sections.find(s => s.id === id);
                return (
                  <button key={id} onClick={() => setActive(id)} style={{
                    width: "100%", border: "none", cursor: "pointer",
                    padding: "10px 20px", textAlign: "left",
                    borderLeft: `3px solid ${active === id ? G.green : "transparent"}`,
                    background: active === id ? G.greenBg : "transparent",
                    transition: "all 0.15s", outline: "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 14 }}>{s.icon}</span>
                      <span style={{ fontSize: 12, color: active === id ? G.green : G.muted, fontWeight: active === id ? 700 : 400, fontFamily: "'Fira Code', monospace" }}>{s.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}

          {/* Quick reference */}
          <div style={{ margin: "20px 14px 0", padding: "14px", background: G.card, border: `1px solid ${G.border}`, borderRadius: 10 }}>
            <div style={{ fontSize: 10, color: G.muted, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Quick Ref</div>
            {[
              ["rememberNavController()", "Create once at root", G.green],
              ["NavHost { }", "Registers all screens", G.blue],
              ["navigate(Route)", "Go to a screen", G.violet],
              ["popBackStack()", "Go back", G.amber],
              ["@Serializable", "Type-safe routes", G.teal],
            ].map(([key, val, c]) => (
              <div key={key} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: c, fontWeight: 700 }}>{key}</div>
                <div style={{ fontSize: 10, color: G.muted }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px", maxWidth: 860 }}>
          {render()}
        </div>
      </div>
    </div>
  );
}