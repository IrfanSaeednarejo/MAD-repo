import { useState } from "react";

const components = [
  {
    name: "Surface",
    color: "#4FC3F7",
    icon: "◻",
    tagline: "Foundation container with Material properties",
    what: "Surface is the base building block in Compose. It applies background color, shape (rounded corners), border, and elevation (drop shadow) automatically respecting the current Material theme.",
    when: "Use Surface when you need a styled container — a panel, a card background, any region that needs visual separation from its parent.",
    variants: ["Surface", "ElevatedSurface"],
    props: [
      { name: "modifier", type: "Modifier", desc: "Size, padding, click handling" },
      { name: "shape", type: "Shape", desc: "RoundedCornerShape, CircleShape, etc." },
      { name: "color", type: "Color", desc: "Background fill color" },
      { name: "tonalElevation", type: "Dp", desc: "Elevation tint (Material 3)" },
      { name: "shadowElevation", type: "Dp", desc: "Drop shadow depth" },
      { name: "border", type: "BorderStroke?", desc: "Optional outline border" },
    ],
    code: `// Basic Surface
Surface(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    shape = RoundedCornerShape(16.dp),
    color = MaterialTheme.colorScheme.surfaceVariant,
    tonalElevation = 4.dp,
    shadowElevation = 8.dp
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Surface Title", style = MaterialTheme.typography.titleMedium)
        Text("Content inside the surface.", style = MaterialTheme.typography.bodyMedium)
    }
}

// Clickable Surface (acts like a button)
Surface(
    onClick = { /* handle click */ },
    shape = RoundedCornerShape(12.dp),
    color = MaterialTheme.colorScheme.primary
) {
    Text("Tap me", modifier = Modifier.padding(12.dp, 8.dp))
}`,
    preview: "surface"
  },
  {
    name: "Scaffold",
    color: "#CE93D8",
    icon: "⬜",
    tagline: "Full-screen Material layout with slots",
    what: "Scaffold provides the overall screen structure. It has named 'slots' for TopAppBar, BottomBar, FAB, Snackbar host, and a main content area — all properly spaced and layered automatically.",
    when: "Use Scaffold as the root composable for every screen in your app. It ensures FABs, bars, and snackbars don't overlap your content.",
    variants: ["Scaffold"],
    props: [
      { name: "topBar", type: "@Composable () -> Unit", desc: "Slot for TopAppBar" },
      { name: "bottomBar", type: "@Composable () -> Unit", desc: "Slot for BottomAppBar" },
      { name: "floatingActionButton", type: "@Composable () -> Unit", desc: "FAB slot — auto-positioned" },
      { name: "snackbarHost", type: "@Composable () -> Unit", desc: "SnackbarHost slot" },
      { name: "content", type: "@Composable (PaddingValues) -> Unit", desc: "Main content — receives padding" },
    ],
    code: `val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

Scaffold(
    topBar = {
        TopAppBar(
            title = { Text("My Screen") },
            navigationIcon = {
                IconButton(onClick = { navController.popBackStack() }) {
                    Icon(Icons.Default.ArrowBack, "Back")
                }
            }
        )
    },
    bottomBar = {
        NavigationBar {
            NavigationBarItem(icon = { Icon(Icons.Default.Home, "Home") },
                label = { Text("Home") }, selected = true, onClick = {})
            NavigationBarItem(icon = { Icon(Icons.Default.Search, "Search") },
                label = { Text("Search") }, selected = false, onClick = {})
        }
    },
    floatingActionButton = {
        FloatingActionButton(onClick = {
            scope.launch { snackbarHostState.showSnackbar("Item added!") }
        }) {
            Icon(Icons.Default.Add, "Add")
        }
    },
    snackbarHost = { SnackbarHost(snackbarHostState) }
) { paddingValues ->
    // IMPORTANT: Always use paddingValues to avoid content being hidden behind bars
    LazyColumn(modifier = Modifier.padding(paddingValues)) {
        items(myList) { item -> ItemRow(item) }
    }
}`,
    preview: "scaffold"
  },
  {
    name: "TopAppBar & BottomAppBar",
    color: "#80CBC4",
    icon: "━",
    tagline: "Navigation bars for screen identity",
    what: "TopAppBar sits at the top — shows screen title, back navigation, and action icons. BottomAppBar lives at the bottom for navigation destinations. Material 3 has 4 TopAppBar variants based on scroll behavior.",
    when: "TopAppBar: every screen with a title or navigation. BottomAppBar: apps with 3–5 top-level destinations.",
    variants: ["TopAppBar", "CenterAlignedTopAppBar", "MediumTopAppBar", "LargeTopAppBar", "BottomAppBar"],
    props: [
      { name: "title", type: "@Composable () -> Unit", desc: "The screen title composable" },
      { name: "navigationIcon", type: "@Composable () -> Unit", desc: "Leading icon (back, menu)" },
      { name: "actions", type: "@Composable RowScope.() -> Unit", desc: "Trailing action icons" },
      { name: "scrollBehavior", type: "TopAppBarScrollBehavior?", desc: "Collapse on scroll behavior" },
      { name: "colors", type: "TopAppBarColors", desc: "Container and title colors" },
    ],
    code: `// --- TOP APP BAR ---
val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

// Large variant — collapses on scroll
LargeTopAppBar(
    title = { Text("Inbox") },
    navigationIcon = {
        IconButton(onClick = { openDrawer() }) {
            Icon(Icons.Default.Menu, "Menu")
        }
    },
    actions = {
        IconButton(onClick = { openSearch() }) {
            Icon(Icons.Default.Search, "Search")
        }
        IconButton(onClick = { openMore() }) {
            Icon(Icons.Default.MoreVert, "More")
        }
    },
    scrollBehavior = scrollBehavior
)

// Center aligned — for simple screens
CenterAlignedTopAppBar(
    title = { Text("Details") },
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(Icons.Default.ArrowBack, "Back")
        }
    }
)

// --- BOTTOM APP BAR ---
BottomAppBar(
    actions = {
        IconButton(onClick = {}) { Icon(Icons.Default.Home, "Home") }
        IconButton(onClick = {}) { Icon(Icons.Default.Favorite, "Liked") }
        IconButton(onClick = {}) { Icon(Icons.Default.Person, "Profile") }
    },
    floatingActionButton = {
        FloatingActionButton(onClick = { addNew() }) {
            Icon(Icons.Default.Add, "Add")
        }
    }
)`,
    preview: "appbar"
  },
  {
    name: "FloatingActionButton",
    color: "#FFAB91",
    icon: "＋",
    tagline: "The primary action of a screen",
    what: "FAB represents the most important action on a screen. It floats above the content at a fixed position. Material 3 offers 4 sizes: Small, Regular, Large, and Extended (with text label).",
    when: "Use for ONE primary action per screen (Add, Compose, Share). Never have more than one FAB. Use ExtendedFAB when the action label helps clarity.",
    variants: ["FloatingActionButton", "SmallFloatingActionButton", "LargeFloatingActionButton", "ExtendedFloatingActionButton"],
    props: [
      { name: "onClick", type: "() -> Unit", desc: "Action to perform on tap" },
      { name: "containerColor", type: "Color", desc: "Background color of the FAB" },
      { name: "contentColor", type: "Color", desc: "Icon/text color inside FAB" },
      { name: "shape", type: "Shape", desc: "Default is large rounded corner" },
      { name: "elevation", type: "FloatingActionButtonElevation", desc: "Shadow depth" },
      { name: "text", type: "@Composable () -> Unit", desc: "ExtendedFAB only — label text" },
    ],
    code: `// Standard FAB
FloatingActionButton(
    onClick = { viewModel.addItem() },
    containerColor = MaterialTheme.colorScheme.primaryContainer,
    contentColor = MaterialTheme.colorScheme.onPrimaryContainer
) {
    Icon(Icons.Default.Add, contentDescription = "Add item")
}

// Extended FAB — shows icon + text label
// Auto-collapses to icon-only on scroll using 'expanded'
val listState = rememberLazyListState()
val isScrolled by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 0 }
}

ExtendedFloatingActionButton(
    onClick = { compose() },
    expanded = !isScrolled,   // collapses when scrolling down
    icon = { Icon(Icons.Default.Edit, "Compose") },
    text = { Text("Compose") }
)

// Small FAB — for secondary actions
SmallFloatingActionButton(onClick = { shareContent() }) {
    Icon(Icons.Default.Share, "Share")
}

// Large FAB — for prominent single-action screens
LargeFloatingActionButton(onClick = { capturePhoto() }) {
    Icon(Icons.Default.CameraAlt, "Camera", modifier = Modifier.size(36.dp))
}`,
    preview: "fab"
  },
  {
    name: "Card",
    color: "#FFF176",
    icon: "▭",
    tagline: "Container for grouped related content",
    what: "Card groups related information into a contained, elevated surface. Material 3 has 3 variants — Elevated (shadow), Filled (tinted background), Outlined (border, no shadow). Cards can be static or clickable.",
    when: "Use for list items, articles, product tiles, profile summaries — any grouped chunk of content that should feel like a single unit.",
    variants: ["Card", "ElevatedCard", "OutlinedCard"],
    props: [
      { name: "onClick", type: "() -> Unit?", desc: "Makes card tappable with ripple" },
      { name: "modifier", type: "Modifier", desc: "Size, padding, constraints" },
      { name: "shape", type: "Shape", desc: "Corner rounding" },
      { name: "colors", type: "CardColors", desc: "Container and content colors" },
      { name: "elevation", type: "CardElevation", desc: "Shadow depth" },
      { name: "border", type: "BorderStroke?", desc: "For OutlinedCard" },
    ],
    code: `// Clickable ElevatedCard (e.g., news article tile)
ElevatedCard(
    onClick = { openArticle(article.id) },
    modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 16.dp, vertical = 8.dp),
    elevation = CardDefaults.elevatedCardElevation(defaultElevation = 6.dp)
) {
    Column {
        // Hero image
        AsyncImage(
            model = article.imageUrl,
            contentDescription = null,
            modifier = Modifier.fillMaxWidth().height(180.dp),
            contentScale = ContentScale.Crop
        )
        Column(modifier = Modifier.padding(16.dp)) {
            Text(article.category, style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.primary)
            Spacer(Modifier.height(4.dp))
            Text(article.title, style = MaterialTheme.typography.titleMedium,
                maxLines = 2, overflow = TextOverflow.Ellipsis)
            Spacer(Modifier.height(8.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(article.author, style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
                Spacer(Modifier.weight(1f))
                Text(article.date, style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}

// OutlinedCard (e.g., settings option)
OutlinedCard(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
    ListItem(
        headlineContent = { Text("Notifications") },
        supportingContent = { Text("Manage your notification preferences") },
        leadingContent = { Icon(Icons.Default.Notifications, null) },
        trailingContent = { Icon(Icons.Default.ChevronRight, null) }
    )
}`,
    preview: "card"
  },
  {
    name: "Chip",
    color: "#A5D6A7",
    icon: "◯",
    tagline: "Compact interactive tags and filters",
    what: "Chips are small interactive elements. Material 3 has 4 types: AssistChip (contextual actions), FilterChip (toggleable categories), InputChip (user-entered values with delete), SuggestionChip (AI/app suggestions).",
    when: "AssistChip: quick actions related to content. FilterChip: category filters (e.g., All / Photos / Videos). InputChip: tags entered by user (email recipients). SuggestionChip: smart reply options.",
    variants: ["AssistChip", "FilterChip", "InputChip", "SuggestionChip"],
    props: [
      { name: "onClick", type: "() -> Unit", desc: "Tap handler" },
      { name: "label", type: "@Composable () -> Unit", desc: "Chip text content" },
      { name: "selected", type: "Boolean", desc: "FilterChip only — toggle state" },
      { name: "leadingIcon", type: "@Composable (() -> Unit)?", desc: "Icon before label" },
      { name: "trailingIcon", type: "@Composable (() -> Unit)?", desc: "Icon after — often X for InputChip" },
      { name: "enabled", type: "Boolean", desc: "Greyed-out disabled state" },
    ],
    code: `// FilterChip — category selection (toggleable)
val filters = listOf("All", "Photos", "Videos", "Documents")
var selectedFilter by remember { mutableStateOf("All") }

LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    items(filters) { filter ->
        FilterChip(
            selected = selectedFilter == filter,
            onClick = { selectedFilter = filter },
            label = { Text(filter) },
            leadingIcon = if (selectedFilter == filter) {
                { Icon(Icons.Default.Check, null, Modifier.size(16.dp)) }
            } else null
        )
    }
}

// InputChip — email recipient tags
var recipients by remember { mutableStateOf(listOf("alice@mail.com", "bob@mail.com")) }

FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    recipients.forEach { email ->
        InputChip(
            selected = false,
            onClick = { },
            label = { Text(email) },
            leadingIcon = { Icon(Icons.Default.Person, null, Modifier.size(16.dp)) },
            trailingIcon = {
                IconButton(onClick = { recipients = recipients - email },
                    modifier = Modifier.size(18.dp)) {
                    Icon(Icons.Default.Close, "Remove", Modifier.size(14.dp))
                }
            }
        )
    }
}

// AssistChip — quick action suggestions
AssistChip(
    onClick = { shareLocation() },
    label = { Text("Share Location") },
    leadingIcon = { Icon(Icons.Default.LocationOn, null, Modifier.size(16.dp)) }
)`,
    preview: "chip"
  },
  {
    name: "Dialog",
    color: "#EF9A9A",
    icon: "▣",
    tagline: "Modal interruption requiring user decision",
    what: "Dialogs are modal windows that pause the UI and demand attention. AlertDialog is for confirmations/warnings. Dialog (basic) gives full control of content. They block background interaction until dismissed.",
    when: "Use sparingly — only when the action is irreversible (Delete, Sign out) or critical info needs acknowledgment. Avoid for non-critical notifications (use Snackbar instead).",
    variants: ["AlertDialog", "Dialog (custom content)"],
    props: [
      { name: "onDismissRequest", type: "() -> Unit", desc: "Called when tapping outside or back" },
      { name: "title", type: "@Composable (() -> Unit)?", desc: "Bold header text" },
      { name: "text", type: "@Composable (() -> Unit)?", desc: "Body/supporting text" },
      { name: "confirmButton", type: "@Composable () -> Unit", desc: "Primary action (Delete, OK)" },
      { name: "dismissButton", type: "@Composable (() -> Unit)?", desc: "Cancel/secondary action" },
      { name: "icon", type: "@Composable (() -> Unit)?", desc: "Icon above title (optional)" },
    ],
    code: `// AlertDialog — confirmation dialog
var showDeleteDialog by remember { mutableStateOf(false) }

Button(onClick = { showDeleteDialog = true }) { Text("Delete Account") }

if (showDeleteDialog) {
    AlertDialog(
        onDismissRequest = { showDeleteDialog = false },
        icon = { Icon(Icons.Default.Warning, null, tint = MaterialTheme.colorScheme.error) },
        title = { Text("Delete Account?") },
        text = {
            Text("This action is permanent and cannot be undone. All your data will be removed.")
        },
        confirmButton = {
            Button(
                onClick = {
                    viewModel.deleteAccount()
                    showDeleteDialog = false
                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.error
                )
            ) { Text("Delete") }
        },
        dismissButton = {
            TextButton(onClick = { showDeleteDialog = false }) { Text("Cancel") }
        }
    )
}

// Custom Dialog — e.g., color picker
var showColorPicker by remember { mutableStateOf(false) }

if (showColorPicker) {
    Dialog(onDismissRequest = { showColorPicker = false }) {
        Surface(shape = RoundedCornerShape(28.dp), tonalElevation = 6.dp) {
            Column(modifier = Modifier.padding(24.dp)) {
                Text("Choose Color", style = MaterialTheme.typography.headlineSmall)
                Spacer(Modifier.height(16.dp))
                ColorPickerGrid(onColorSelected = { color ->
                    applyColor(color)
                    showColorPicker = false
                })
            }
        }
    }
}`,
    preview: "dialog"
  },
  {
    name: "Snackbar",
    color: "#BCAAA4",
    icon: "▬",
    tagline: "Brief, non-blocking feedback messages",
    what: "Snackbars appear at the bottom of the screen for short-lived messages. They auto-dismiss after a few seconds and can have one optional action (like Undo). They do NOT block interaction with the rest of the screen.",
    when: "Use for feedback after actions: 'Message sent', 'Item deleted — Undo', 'No internet connection'. Prefer over dialogs when the message is informational, not requiring a decision.",
    variants: ["Snackbar", "SnackbarHost", "SnackbarHostState"],
    props: [
      { name: "snackbarData", type: "SnackbarData", desc: "Data provided by SnackbarHost" },
      { name: "actionOnNewLine", type: "Boolean", desc: "Action button on separate line" },
      { name: "shape", type: "Shape", desc: "Container shape" },
      { name: "containerColor", type: "Color", desc: "Background color" },
      { name: "contentColor", type: "Color", desc: "Message text color" },
      { name: "actionColor", type: "Color", desc: "Action label color" },
    ],
    code: `// Step 1: Create SnackbarHostState — holds snackbar state
val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

// Step 2: Pass to Scaffold's snackbarHost slot
Scaffold(
    snackbarHost = {
        SnackbarHost(hostState = snackbarHostState) { data ->
            // Optional: customize appearance
            Snackbar(
                snackbarData = data,
                containerColor = MaterialTheme.colorScheme.inverseSurface,
                contentColor = MaterialTheme.colorScheme.inverseOnSurface,
                actionColor = MaterialTheme.colorScheme.inversePrimary
            )
        }
    }
) { padding ->
    Column(modifier = Modifier.padding(padding)) {

        // Simple message
        Button(onClick = {
            scope.launch {
                snackbarHostState.showSnackbar("Profile updated!")
            }
        }) { Text("Save Profile") }

        // With Undo action
        Button(onClick = {
            scope.launch {
                val result = snackbarHostState.showSnackbar(
                    message = "Item deleted",
                    actionLabel = "Undo",
                    duration = SnackbarDuration.Short
                )
                if (result == SnackbarResult.ActionPerformed) {
                    viewModel.undoDelete()   // User tapped Undo
                }
                // SnackbarResult.Dismissed → user ignored it
            }
        }) { Text("Delete Item") }
    }
}`,
    preview: "snackbar"
  }
];

function PhoneFrame({ children, darkBg = false }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
      <div style={{ width: 240, background: "#1a1a2e", borderRadius: 36, padding: "10px", boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 0 0 1px #333" }}>
        {/* Notch */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
          <div style={{ width: 60, height: 6, background: "#111", borderRadius: 3 }} />
        </div>
        <div style={{ background: darkBg ? "#121212" : "#f5f5f5", borderRadius: 24, overflow: "hidden", minHeight: 380, position: "relative" }}>
          {children}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          <div style={{ width: 40, height: 4, background: "#333", borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

function SurfacePreview() {
  return (
    <PhoneFrame>
      <div style={{ padding: 12, fontFamily: "sans-serif", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ background: "#e8eaf6", borderRadius: 16, padding: 14, boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1a237e", marginBottom: 4 }}>Surface Title</div>
          <div style={{ fontSize: 11, color: "#3949ab" }}>Content inside the surface with tonalElevation = 4.dp and shadow.</div>
        </div>
        <div style={{ background: "#7c4dff", borderRadius: 12, padding: "8px 14px", display: "inline-flex", alignSelf: "flex-start", boxShadow: "0 4px 12px rgba(124,77,255,0.4)" }}>
          <div style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>Tap me</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 14, border: "1px solid #ddd" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>Outlined Surface</div>
          <div style={{ fontSize: 10, color: "#666", marginTop: 3 }}>border = BorderStroke(1.dp, Color.LightGray)</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)", borderRadius: 20, padding: 14, boxShadow: "0 8px 24px rgba(0,150,136,0.2)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#00695c" }}>🌟 Elevated Surface</div>
          <div style={{ fontSize: 10, color: "#00796b", marginTop: 3 }}>shadowElevation = 8.dp gives this floating feel</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScaffoldPreview() {
  const [tab, setTab] = useState(0);
  return (
    <PhoneFrame darkBg>
      <div style={{ fontFamily: "sans-serif", height: 380, display: "flex", flexDirection: "column", background: "#1e1e2e" }}>
        {/* TopBar */}
        <div style={{ background: "#2d2d44", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 16 }}>☰</div>
          <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: "#e0e0ff" }}>My App</div>
          <div style={{ fontSize: 14 }}>🔍</div>
          <div style={{ fontSize: 14 }}>⋮</div>
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: 12, overflow: "hidden" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: "#2a2a3e", borderRadius: 10, padding: "10px 12px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: `hsl(${i * 80}, 60%, 50%)`, borderRadius: 8 }} />
              <div>
                <div style={{ fontSize: 12, color: "#ddd", fontWeight: 600 }}>List Item {i}</div>
                <div style={{ fontSize: 10, color: "#888" }}>Supporting text here</div>
              </div>
            </div>
          ))}
        </div>
        {/* FAB */}
        <div style={{ position: "absolute", bottom: 60, right: 14, width: 44, height: 44, background: "#7c4dff", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(124,77,255,0.5)", fontSize: 22, color: "#fff" }}>+</div>
        {/* BottomBar */}
        <div style={{ background: "#2d2d44", display: "flex", justifyContent: "space-around", padding: "8px 0" }}>
          {["🏠", "🔍", "❤️", "👤"].map((icon, i) => (
            <div key={i} onClick={() => setTab(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer" }}>
              <div style={{ fontSize: 16, opacity: tab === i ? 1 : 0.4 }}>{icon}</div>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: tab === i ? "#7c4dff" : "transparent" }} />
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function AppBarPreview() {
  return (
    <PhoneFrame darkBg>
      <div style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", gap: 8, background: "#121212", height: 380 }}>
        {/* Large TopAppBar */}
        <div style={{ background: "#1e1e2e" }}>
          <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 16 }}>☰</div>
            <div style={{ display: "flex", gap: 12, fontSize: 14 }}>🔍 ⋮</div>
          </div>
          <div style={{ padding: "0 16px 14px", fontSize: 22, fontWeight: 800, color: "#e0e0ff" }}>Inbox</div>
          <div style={{ fontSize: 9, color: "#7c4dff", padding: "0 16px 8px", letterSpacing: 1 }}>LargeTopAppBar — collapses on scroll</div>
        </div>
        {/* Center aligned */}
        <div style={{ background: "#1a2a1a", padding: "10px 14px", display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: 14 }}>←</div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 14, fontWeight: 700, color: "#a5d6a7" }}>CenterAligned</div>
          <div style={{ fontSize: 14 }}>⋮</div>
        </div>
        {/* Bottom Nav */}
        <div style={{ marginTop: "auto", background: "#1e1e2e", display: "flex", justifyContent: "space-around", padding: "10px 0", borderTop: "1px solid #333" }}>
          {[["🏠","Home"],["❤️","Liked"],["👤","Profile"]].map(([icon, label], i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ fontSize: 18, filter: i === 0 ? "none" : "opacity(0.4)" }}>{icon}</div>
              <div style={{ fontSize: 9, color: i === 0 ? "#7c4dff" : "#666" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function FabPreview() {
  const [extended, setExtended] = useState(true);
  return (
    <PhoneFrame darkBg>
      <div style={{ fontFamily: "sans-serif", background: "#121212", height: 380, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
        {/* Extended FAB */}
        <div>
          <div style={{ fontSize: 9, color: "#888", textAlign: "center", marginBottom: 6 }}>ExtendedFAB — tap to toggle</div>
          <div onClick={() => setExtended(!extended)} style={{ background: "#7c4dff", borderRadius: extended ? 16 : 28, padding: extended ? "12px 20px" : "14px", display: "flex", alignItems: "center", gap: extended ? 8 : 0, cursor: "pointer", transition: "all 0.3s", boxShadow: "0 6px 20px rgba(124,77,255,0.5)", width: "fit-content", margin: "0 auto" }}>
            <span style={{ fontSize: 18 }}>✏️</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", overflow: "hidden", maxWidth: extended ? 80 : 0, transition: "max-width 0.3s", whiteSpace: "nowrap" }}>Compose</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {/* Small FAB */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ background: "#ff6090", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 4px 12px rgba(255,96,144,0.4)" }}>↑</div>
            <div style={{ fontSize: 9, color: "#888" }}>Small</div>
          </div>
          {/* Regular FAB */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ background: "#7c4dff", borderRadius: 16, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 6px 18px rgba(124,77,255,0.5)" }}>+</div>
            <div style={{ fontSize: 9, color: "#888" }}>Regular</div>
          </div>
          {/* Large FAB */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ background: "#00bcd4", borderRadius: 20, width: 68, height: 68, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, boxShadow: "0 6px 20px rgba(0,188,212,0.5)" }}>📷</div>
            <div style={{ fontSize: 9, color: "#888" }}>Large</div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function CardPreview() {
  return (
    <PhoneFrame>
      <div style={{ fontFamily: "sans-serif", padding: 10, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* ElevatedCard */}
        <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
          <div style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", height: 70, display: "flex", alignItems: "flex-end", padding: "8px 10px" }}>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 6, padding: "2px 8px", fontSize: 9, color: "#fff" }}>TECHNOLOGY</div>
          </div>
          <div style={{ padding: "10px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#111", lineHeight: 1.3 }}>Jetpack Compose reaches stable 2.0</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <div style={{ fontSize: 9, color: "#888" }}>by Jane Doe</div>
              <div style={{ fontSize: 9, color: "#888" }}>Mar 10</div>
            </div>
          </div>
        </div>
        {/* OutlinedCard */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #ddd", padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 20 }}>🔔</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>Notifications</div>
            <div style={{ fontSize: 10, color: "#777" }}>Manage preferences</div>
          </div>
          <div style={{ fontSize: 14, color: "#999" }}>›</div>
        </div>
        {/* FilledCard */}
        <div style={{ background: "#e8f5e9", borderRadius: 12, padding: "10px 12px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2e7d32" }}>✅ FilledCard</div>
          <div style={{ fontSize: 10, color: "#388e3c", marginTop: 2 }}>Uses tonal background color</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ChipPreview() {
  const [selected, setSelected] = useState("All");
  const [tags, setTags] = useState(["alice@m.co", "bob@m.co"]);
  const filters = ["All", "Photos", "Videos", "Docs"];
  return (
    <PhoneFrame>
      <div style={{ fontFamily: "sans-serif", padding: 14, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <div style={{ fontSize: 9, color: "#666", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>FilterChip</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {filters.map(f => (
              <div key={f} onClick={() => setSelected(f)} style={{ padding: "4px 10px", borderRadius: 20, background: selected === f ? "#7c4dff" : "#ede7f6", color: selected === f ? "#fff" : "#5e35b1", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                {selected === f && <span style={{ fontSize: 9 }}>✓</span>}{f}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: "#666", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>InputChip (tap × to remove)</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {tags.map(t => (
              <div key={t} style={{ padding: "4px 8px", borderRadius: 20, background: "#e8eaf6", border: "1px solid #9fa8da", fontSize: 10, display: "flex", alignItems: "center", gap: 4 }}>
                👤 {t} <span onClick={() => setTags(tags.filter(x => x !== t))} style={{ cursor: "pointer", color: "#7986cb", fontWeight: 700 }}>×</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: "#666", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>AssistChip</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["📍 Location", "📅 Add Date"].map(chip => (
              <div key={chip} style={{ padding: "4px 10px", borderRadius: 20, border: "1px solid #ccc", background: "#fff", fontSize: 10, color: "#333" }}>{chip}</div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: "#666", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>SuggestionChip</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Thanks!", "On my way 👋", "👍 Sounds good"].map(s => (
              <div key={s} style={{ padding: "4px 10px", borderRadius: 20, border: "1px solid #b39ddb", background: "#ede7f6", fontSize: 10, color: "#512da8" }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function DialogPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PhoneFrame darkBg>
      <div style={{ fontFamily: "sans-serif", background: "#121212", height: 380, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, position: "relative" }}>
        <div style={{ fontSize: 11, color: "#888" }}>Tap to trigger dialog:</div>
        <div onClick={() => setOpen(true)} style={{ background: "#cf6679", borderRadius: 8, padding: "10px 20px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Delete Account</div>
        {open && (
          <>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
            <div style={{ position: "absolute", background: "#2d2d44", borderRadius: 24, padding: 24, width: 190, boxShadow: "0 24px 60px rgba(0,0,0,0.6)", zIndex: 10 }}>
              <div style={{ textAlign: "center", fontSize: 24, marginBottom: 8 }}>⚠️</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", textAlign: "center", marginBottom: 10 }}>Delete Account?</div>
              <div style={{ fontSize: 11, color: "#aaa", textAlign: "center", lineHeight: 1.5, marginBottom: 18 }}>This action is permanent and cannot be undone.</div>
              <div onClick={() => setOpen(false)} style={{ background: "#cf6679", borderRadius: 50, padding: "9px", textAlign: "center", color: "#fff", fontWeight: 700, fontSize: 12, marginBottom: 8, cursor: "pointer" }}>Delete</div>
              <div onClick={() => setOpen(false)} style={{ textAlign: "center", color: "#7c4dff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Cancel</div>
            </div>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}

function SnackbarPreview() {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const show = (m) => { setMsg(m); setVisible(true); setTimeout(() => setVisible(false), 3000); };
  return (
    <PhoneFrame darkBg>
      <div style={{ fontFamily: "sans-serif", background: "#121212", height: 380, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, position: "relative" }}>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Tap to show Snackbar:</div>
        <div onClick={() => show("Profile updated! ✅")} style={{ background: "#4caf50", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Save Profile</div>
        <div onClick={() => show("Item deleted")} style={{ background: "#f44336", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Delete Item</div>
        <div onClick={() => show("No internet connection 📵")} style={{ background: "#ff9800", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Go Offline</div>
        {visible && (
          <div style={{ position: "absolute", bottom: 16, left: 10, right: 10, background: "#323232", borderRadius: 8, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 6px 24px rgba(0,0,0,0.6)", animation: "fadeIn 0.2s ease" }}>
            <div style={{ fontSize: 11, color: "#fff" }}>{msg}</div>
            {msg.includes("deleted") && <div onClick={() => setVisible(false)} style={{ fontSize: 11, color: "#bb86fc", fontWeight: 700, cursor: "pointer" }}>UNDO</div>}
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

const previewMap = { surface: SurfacePreview, scaffold: ScaffoldPreview, appbar: AppBarPreview, fab: FabPreview, card: CardPreview, chip: ChipPreview, dialog: DialogPreview, snackbar: SnackbarPreview };

export default function App() {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState("preview");
  const comp = components[active];
  const Preview = previewMap[comp.preview];

  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: "#080810", minHeight: "100vh", color: "#e0e0e0", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: none; } }
        pre { font-family: 'JetBrains Mono', 'Courier New', monospace !important; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0d0d1e, #1a0f2e)", padding: "16px 20px", borderBottom: "1px solid #1e1e3e" }}>
        <div style={{ fontSize: 10, color: "#7b68ee", letterSpacing: 4, textTransform: "uppercase" }}>Jetpack Compose</div>
        <div style={{ fontSize: 22, fontWeight: 900, background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>UI Components — Code & Preview</div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "calc(100vh - 72px)" }}>
        {/* Sidebar */}
        <div style={{ width: 180, background: "#0a0a14", borderRight: "1px solid #1a1a2e", overflowY: "auto", flexShrink: 0 }}>
          {components.map((c, i) => (
            <button key={i} onClick={() => { setActive(i); setTab("preview"); }}
              style={{ width: "100%", textAlign: "left", padding: "11px 14px", background: active === i ? "#12121e" : "transparent", border: "none", borderLeft: active === i ? `3px solid ${c.color}` : "3px solid transparent", color: active === i ? c.color : "#666", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s", lineHeight: 1.3 }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {/* Component Header */}
          <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #1a1a2e", background: "#0c0c18" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 22 }}>{comp.icon}</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: comp.color }}>{comp.name}</span>
            </div>
            <div style={{ fontSize: 12, color: "#888", fontStyle: "italic" }}>{comp.tagline}</div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #1a1a2e", background: "#0a0a14" }}>
            {["preview", "about", "props", "code"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding: "10px 16px", background: "transparent", border: "none", borderBottom: tab === t ? `2px solid ${comp.color}` : "2px solid transparent", color: tab === t ? comp.color : "#555", cursor: "pointer", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, transition: "all 0.15s" }}>
                {t}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: "8px 20px 20px", flex: 1 }}>
            {tab === "preview" && (
              <div style={{ animation: "fadeIn 0.2s ease" }}>
                <div style={{ fontSize: 10, color: "#555", textAlign: "center", marginTop: 8, marginBottom: 4, textTransform: "uppercase", letterSpacing: 2 }}>Live UI Preview</div>
                <Preview />
                <div style={{ background: "#0f0f1c", border: `1px solid ${comp.color}33`, borderRadius: 10, padding: "12px 16px", marginTop: 8 }}>
                  <div style={{ fontSize: 10, color: comp.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>💡 When to use</div>
                  <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.7 }}>{comp.when}</div>
                </div>
              </div>
            )}

            {tab === "about" && (
              <div style={{ animation: "fadeIn 0.2s ease", marginTop: 16 }}>
                <div style={{ background: "#0f0f1c", border: `1px solid ${comp.color}44`, borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: comp.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>What is it?</div>
                  <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>{comp.what}</div>
                </div>
                <div style={{ background: "#0f0f1c", border: "1px solid #2a2a3e", borderRadius: 12, padding: "14px 18px", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "#7b68ee", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Variants</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {comp.variants.map(v => (
                      <div key={v} style={{ background: "#1a1a2e", border: `1px solid ${comp.color}55`, borderRadius: 8, padding: "4px 10px", fontSize: 11, color: comp.color, fontFamily: "'JetBrains Mono', monospace" }}>{v}</div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#0f0f1c", border: "1px solid #1e1e2e", borderRadius: 12, padding: "14px 18px" }}>
                  <div style={{ fontSize: 11, color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>💡 When to use</div>
                  <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>{comp.when}</div>
                </div>
              </div>
            )}

            {tab === "props" && (
              <div style={{ animation: "fadeIn 0.2s ease", marginTop: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {comp.props.map((p, i) => (
                    <div key={i} style={{ background: "#0f0f1c", border: "1px solid #1e1e2e", borderRadius: 10, padding: "10px 14px", display: "grid", gridTemplateColumns: "120px 140px 1fr", gap: 10, alignItems: "center" }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: comp.color, fontWeight: 700 }}>{p.name}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#888", background: "#0a0a14", padding: "2px 6px", borderRadius: 4 }}>{p.type}</div>
                      <div style={{ fontSize: 11, color: "#bbb", lineHeight: 1.5 }}>{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "code" && (
              <div style={{ animation: "fadeIn 0.2s ease", marginTop: 12 }}>
                <div style={{ background: "#07070f", border: `1px solid ${comp.color}33`, borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ background: "#0f0f1c", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #1a1a2e" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
                    <div style={{ marginLeft: 8, fontSize: 10, color: "#555" }}>{comp.name}.kt</div>
                  </div>
                  <pre style={{ margin: 0, padding: "16px", fontSize: 11, lineHeight: 1.8, color: "#86efac", overflowX: "auto", whiteSpace: "pre-wrap" }}>{comp.code}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}