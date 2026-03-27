# Language Quiz — Desktop App

A native desktop app (Mac & Windows) wrapping all your language quiz HTML files,
built with Electron. Opens with a launcher menu to pick any quiz.

---

## What's included

```
language-quiz-app/
├── main.js          ← Electron main process (window management)
├── launcher.html    ← Home screen with buttons for every quiz
├── package.json     ← Dependencies and build config
├── icons/           ← App icons (you can replace with your own)
│   ├── icon.icns    ← Mac icon
│   ├── icon.ico     ← Windows icon
│   └── icon.png     ← Source PNG (512×512 or larger)
└── quizzes/         ← All your quiz HTML files
    ├── spanish_quiz_300.html
    ├── spanish_sentences_300.html
    ├── french_quiz_300.html
    ├── german_quiz_300.html
    ├── italian_quiz_300.html
    ├── norwegian_quiz_300.html
    ├── norwegian_sentences_300.html
    └── russian_quiz_300.html
```

---

## Step 1 — Install Node.js

Download and install from https://nodejs.org (LTS version recommended).
Verify it worked by opening Terminal (Mac) or Command Prompt (Windows) and typing:

    node --version
    npm --version

---

## Step 2 — Install dependencies

Open Terminal / Command Prompt, navigate to this folder, and run:

    npm install

This downloads Electron and electron-builder into a `node_modules` folder (takes ~2 minutes).

---

## Step 3 — Run in development (test it first)

    npm start

This opens the app immediately without building an installer.
Click any quiz button to open it in its own window.

---

## Step 4 — Build a distributable

### Mac (.dmg installer — works on Intel and Apple Silicon)

Run this on a Mac:

    npm run build:mac

Output: `dist/Language Quiz-1.0.0.dmg`
Double-click the .dmg to install like any Mac app.

### Windows (.exe installer)

Run this on a Windows machine:

    npm run build:win

Output: `dist/Language Quiz Setup 1.0.0.exe`
Double-click to install with a standard Windows installer.

### Build both at once (Mac only — cross-compiling Windows from Mac requires extra setup)

    npm run build:all

---

## Step 5 — Add your own icon (optional)

Replace the placeholder files in the `icons/` folder:

- `icon.png` — any square PNG, 512×512 pixels or larger
- `icon.icns` — Mac format (convert from PNG with: `sips -s format icns icon.png --out icon.icns`)
- `icon.ico` — Windows format (use https://convertio.co/png-ico/ or similar)

---

## Adding more quizzes

1. Copy any new quiz HTML file into the `quizzes/` folder
2. Add a button for it in `launcher.html` following the existing pattern:

```html
<button class="quiz-btn" onclick="open('your_new_quiz.html', 'Quiz Title')">
  <span class="flag">🇩🇪</span>
  <div class="info">
    <span class="lang">Language Name</span>
    <span class="type">Description</span>
  </div>
</button>
```

---

## Notes on speech synthesis

The 🔊 pronunciation feature uses your operating system's text-to-speech voices.
On Mac, System Preferences → Accessibility → Spoken Content → System Voice shows
what voices are installed. Additional language voices can be downloaded there.
On Windows, Settings → Time & Language → Speech → Manage voices.

---

## Troubleshooting

**"electron is not recognized"** — Make sure Node.js installed correctly and reopen Terminal.

**App won't open on Mac ("unidentified developer")** — Right-click the .app → Open → Open anyway.
Or go to System Preferences → Security & Privacy → Allow anyway.
(This happens because the app isn't signed with an Apple Developer certificate.)

**Speech not working** — Make sure the relevant language voice pack is installed on your OS.

**White screen on launch** — Run `npm start` in Terminal to see any error messages.
