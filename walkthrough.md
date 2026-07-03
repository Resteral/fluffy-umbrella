# Walkthrough: Tug Portal Web Application (Mobile Optimized)

I have built a premium, dark-cyber themed single-page web portal that combines **Tug Lobbies**, **Omegle Debate**, and an interactive **Developer Space** sandbox. The application has been fully optimized to look stunning and operate fluidly on both desktop monitors and mobile phone screens.

---

## 🌟 Responsive Mobile Design Optimizations
I have added dynamic viewport state listeners and media queries to ensure a native app-like experience on phones:
- **Automatic Layout Stacking**: Side-by-side grids (e.g. *Game Arena + Chat* or *Profile + Debate Feed*) stack vertically on screens under 768px wide.
- **Dynamic Scale Adjustments**: Hero titles, layout padding, button dimensions, and inputs automatically shrink to fit mobile viewports cleanly.
- **Mobile-Safe Sandbox Editor**: The Developer Space disables the "Split View" mode on phones (as split editors are unreadable on small screens) and defaults to full-screen code or preview tabs.
- **Responsive Header**: Nav labels are hidden on mobile, leaving clear and accessible icons for clean top navigation.

---

## 🕹️ Interactive Features Built

### 1. Tug Lobbies
An interactive, simulated multiplayer lobby browser where you compete in a physics-based "Tug-of-War":
- **Lobby browser**: Active/waiting rooms displaying live team scores and player capacities.
- **Simulated Multiplayer Environment**: Opponents pull the rope dynamically. The room's chat feed updates with spectators and competitors shouting support and banter.
- **Gameplay**: Choose to represent the **Blue Team (Left)** or **Red Team (Right)**, count down, and click **PULL** rapidly to slide the central flag marker into your scoring zone.

### 2. Omegle Debate
A matchmaking debate colosseum pairing you with random automated debaters on controversial topics:
- **Stance & Topic Selector**: Select whether you are **PRO** or **CON** on preloaded topics (e.g. *AI replacing engineers*, *Pineapple on pizza*, *Tabs vs Spaces*).
- **Matchmaking Scan**: A radar pulse screen looking for a remote opponent before transitioning to the colosseum.
- **Turn-based Debate**: Type your arguments. An automated opponent responds with highly contextual, humorous, and logically structured points.
- **Spectator Sentiment Meter**: A live gauge that swings back and forth based on the strength (length, logical keywords) of your arguments.

### 3. Developer Space
A drag-and-drop web builder and sandbox environment allowing developers to create, upload, and host their pages:
- **Presets Gallery**: Includes preloaded mock templates (e.g. *Neon Particle Matrix*, *Cyber Clock*) so you can see examples instantly.
- **HTML File Upload**: Drag-and-drop or select any `.html`/`.htm` file to extract its contents directly.
- **Live Code Editor**: Modify code inline using a full monospace editor screen.
- **Sandbox Preview**: Renders the code in a separate sandboxed iframe via secure Blob URLs.
- **Local Gallery**: Save your customized creations to your browser's `localStorage` so you can retrieve or delete them later.

---

## 🚀 How to Run Locally

To spin up the development server and test the platform:

1. Open your terminal in the `tug-portal` directory:
   ```bash
   cd tug-portal
   ```
2. Start the Vite dev server:
   ```bash
   npm run dev
   ```
3. Open the local address printed in the terminal (usually `http://localhost:5173`) in your browser.
