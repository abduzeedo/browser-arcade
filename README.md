# Browser Arcade

A portable-console interface for playing local game files in the browser, powered by EmulatorJS 4.2.3. No ROMs or BIOS files are included.

## Play

Click **LOAD ROM**, choose a file from your computer, select its console when automatic detection is unavailable, and click **INSERT & PLAY**. Click Start Game in the screen or press the console START button to boot.

Supports Genesis / Mega Drive, NES, SNES, Game Boy / Game Boy Color, Game Boy Advance, Master System, and Game Gear. ZIP and BIN files require manual console selection.

Use the directional pad or arrow keys; X, Z, and S correspond to B, A, and C; Enter is START and V is SELECT. On-screen controls work with mouse or touch. Click **KEYS** to rebind the console controls. Select a control, press a key, and the change saves automatically in browser storage. Duplicate assignments are rejected; Escape cancels a key change and RESTORE DEFAULTS resets the mapping. These bindings work with focus in the console or game screen. Additional per-system controls, save states, and display options are available in the emulator toolbar.

On phones and narrow screens, the console fits the dynamic viewport without page scrolling, the desktop background, outer margins, or casing shadow. iOS home-screen mode reserves the status-bar and home-indicator safe areas; the header compacts on shorter screens. Dialogs may scroll internally when necessary. The EmulatorJS credit remains inside the console.

Selected game files are read locally and passed to the emulator using a browser object URL. They are not uploaded to a server. Game files are not included in this repository or deployment.

The small toggle on the right of the top bar switches between dark and light themes. Dark is the initial theme; your choice is saved on the device.

## PWA, offline play, and feedback

Add the site to your home screen using Safari → Share → Add to Home Screen on iOS, or your browser's Install app option where available. The manifest launches the app in standalone mode and supplies regular, maskable, and Apple touch icons. If an existing home-screen shortcut keeps its old icon, remove that shortcut and add it again.

Open the app online once and wait for **Offline ready** in KEYS. The service worker caches the console and all bundled emulator cores (about 13 MB). The app can then launch and emulate local ROM files offline. ROMs are never put in the app cache or uploaded; select your local file each time. Browser storage eviction or clearing site data requires the software to download again. Save states are managed separately by EmulatorJS.

KEYS includes **Button sounds** and **Touch vibration** preferences, saved on the device. The interface synthesizes a quiet click with Web Audio after interaction; game audio remains under the emulator's own volume control. Short vibration pulses are enabled only when `navigator.vibrate` is supported. Safari/iOS does not expose that API, including in standalone mode; the option is disabled there. No simulated vibration workaround is used.

The service worker caches an explicit list of app assets. To change cached runtime files or icons, bump the `CACHE` version in `sw.js` and update `ASSETS` as needed. Updates wait until existing app windows close so a running game is not interrupted. App navigation checks the network first and falls back to the cached page.

The original generated icon and its built-in imagegen prompt are saved under `icons/`; favicon, Apple touch, and manifest PNG sizes are derived from that master.

## Local preview

From this directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/. Serve over HTTP rather than opening the HTML file directly.

## GitHub Pages

Publish the `main` branch from `/ (root)` under Settings → Pages → Deploy from a branch. The `.nojekyll` file serves the bundled files directly. No build step is required. All emulator assets use paths relative to the page so project URLs work.

The ROM exclusions in `.gitignore` are a safeguard. Always inspect staged files before pushing, and never commit ROMs or BIOS files.

## Bundled software

`data/` includes EmulatorJS 4.2.3 and the selected default and WebGL 1 fallback cores. Keep the bundled license and attribution files. See [upstream sources](data/SOURCES.md), [EmulatorJS license](data/LICENSE), and [upstream README](data/UPSTREAM-README.md).

The on-screen input bridge uses the pinned EmulatorJS controller API; verify it when upgrading EmulatorJS. Emulation and performance vary by device and browser.
