# 🎂 The Birthday Adventure — Interactive Birthday Website

A custom, romantic, playful, and interactive personal website created as a special birthday journey.

---

## 🌟 Features Overview

- **Mobile First Design**: Optimized for 360px+ smartphone screens with smooth animations, warm romantic colors, and touch-friendly buttons.
- **Global Music System**:
  - Soft background music during site exploration with smooth volume fade transitions.
  - Special **Happy Birthday Song** for the final surprise.
  - Floating music controller (`🎵 Music ON` / `🔇 Music OFF` & volume slider).
  - **Embedded Web Audio API Synthesizer Fallback**: Gentle lofi ambient chords & music-box birthday song play automatically even before custom MP3 files are placed!
- **Interactive Chapter Journey**:
  1. **Chapter 01 — Mission Briefing & Intro**: Detection loader ("Checking cuteness & happiness... 100%").
  2. **Chapter 02 — Love Verification**: Playful security verification with funny wrong-answer feedbacks and royal privilege badges.
  3. **Chapter 03 — Relationship Quiz**: 6 custom memory questions with encouraging feedback, scoring, and the *Relationship Historian* achievement (100/100 score).
  4. **Chapter 04 — Your Next Chapter (Wish Box)**: Interactive form collecting 3 wishes, personal goals, shared adventure, dream gift, and destination, with automatic local draft saving and Google Apps Script integration.
  5. **Chapter 05 — Our Memories**: Polaroid gallery with tilted polaroids, handwritten captions, and full-screen Lightbox viewer.
  6. **Chapter 06 — Love Letter**: Wax seal envelope opening animation, gentle typewriter effect, and heartfelt personal message.
  7. **Chapter 07 — Official Digital Certificate**: Dynamic graduation certificate with recipient name, date, score, and **📸 SAVE CERTIFICATE AS IMAGE (PNG)** download feature using HTML Canvas.
  8. **Chapter 08 — Final Birthday Surprise**: Dramatic 3-2-1 countdown, confetti explosion, birthday song transition, interactive cake with blowable candles, personalized wishes, and replay feature.
- **3 Secret Easter Eggs**:
  - 🐱 *"Don't click this"* button with a playful message.
  - 💖 Clicking the heart logo 5 times unlocks a secret love note.
  - ⚠️ *"Test Security Protocol"* triggers a humorous "Too much cuteness detected" overload modal.

---

## 🚀 Quick Start (Running Locally)

1. Clone or open this repository in your terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL in your smartphone or desktop browser:
   ```text
   http://localhost:5173/
   ```

---

## ⚙️ How to Customize Personal Content

All personal content is centralized in `src/data/birthdayConfig.js`, `src/data/questions.js`, and `src/data/memories.js`.

### 1. Edit Names, Dates, & Messages
Open [src/data/birthdayConfig.js](file:///d:/project%20my%20gf/src/data/birthdayConfig.js) to edit:
- `recipientName`: Your partner's name.
- `senderName`: Your name.
- `birthdayDate`: Birthdate (e.g., `"04 Oktober 2026"`).
- `verification`: Custom funny questions and answers.
- `letter`: Personal paragraphs for the love letter.
- `finalSurprise`: Custom closing birthday wishes.

### 2. Add Your Own Photos
1. Put your photos inside `public/photos/`:
   - `photo01.jpg`
   - `photo02.jpg`
   - `photo03.jpg`
   - `photo04.jpg`
2. Open [src/data/memories.js](file:///d:/project%20my%20gf/src/data/memories.js) to customize the captions, years, locations, and personal notes.

### 3. Add Custom Music (MP3)
1. Add your audio files into `public/music/`:
   - `background.mp3`: Romantic background instrumental.
   - `happy-birthday.mp3`: Happy Birthday track for the grand finale.
*(Note: If no MP3 files are added, the website automatically uses the built-in Web Audio API romantic synth synthesizer so audio always works!)*

### 4. Edit Relationship Quiz Questions
Open [src/data/questions.js](file:///d:/project%20my%20gf/src/data/questions.js) to add or edit questions, multiple choices, and funny feedback remarks.

---

## 📊 Google Sheets & Email Submission Setup

The website uses Google Apps Script as a secure, serverless backend to receive wishes from Chapter 04 and forward them to Google Sheets & your email without exposing credentials.

### Step-by-Step Instructions:

1. Create a new Google Spreadsheet at [https://sheets.google.com](https://sheets.google.com).
2. Go to **Extensions > Apps Script** (**Ekstensi > Apps Script**).
3. Copy the entire contents of [google-apps-script/Code.gs](file:///d:/project%20my%20gf/google-apps-script/Code.gs) into the Apps Script editor.
4. Replace `EMAIL_RECIPIENT` at the top of the script with your own email address.
5. Click **Save** (disk icon).
6. Click **Deploy > New deployment** (**Terapkan > Penerapan baru**).
7. Under "Select type" (gear icon), select **Web app**.
8. Set the settings:
   - **Description**: Birthday Wishes Endpoint
   - **Execute as**: Me (`your-email@gmail.com`)
   - **Who has access**: **Anyone** *(Penting agar website static bisa mengirim data tanpa login Google)*
9. Click **Deploy** and grant permissions if prompted.
10. Copy the generated **Web App URL** (ending with `/exec`).
11. Paste this URL into `src/data/birthdayConfig.js`:
    ```javascript
    googleAppsScriptUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
    ```

---

## 🌐 Deploying the Website

You can deploy this static website for free on Vercel, Netlify, or GitHub Pages.

### Option A: Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework preset will automatically detect **Vite**.
5. Click **Deploy**. Your custom domain/link is ready!

### Option B: Netlify
1. Run `npm run build`.
2. Drag and drop the `dist/` folder into Netlify Drop ([app.netlify.com/drop](https://app.netlify.com/drop)) or connect your GitHub repository.

---

## 📂 Project Structure

```text
birthday-adventure/
│
├── public/
│   ├── music/
│   │   ├── background.mp3
│   │   └── happy-birthday.mp3
│   ├── photos/
│   │   ├── photo01.jpg
│   │   ├── photo02.jpg
│   │   ├── photo03.jpg
│   │   └── photo04.jpg
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── Landing.jsx          # Chapter 01 & Intro loading
│   │   ├── Verification.jsx     # Chapter 02 Love verification
│   │   ├── Quiz.jsx             # Chapter 03 Relationship memories
│   │   ├── WishForm.jsx         # Chapter 04 Wish box & Google integration
│   │   ├── Gallery.jsx          # Chapter 05 Polaroid & Lightbox
│   │   ├── LoveLetter.jsx       # Chapter 06 Personal letter
│   │   ├── Certificate.jsx      # Chapter 07 Dynamic canvas certificate
│   │   ├── FinalSurprise.jsx    # Chapter 08 Countdown, cake & confetti
│   │   ├── MusicController.jsx  # Floating audio & volume controller
│   │   ├── ProgressBar.jsx      # Top progress tracking
│   │   └── EasterEggsModal.jsx  # 3 Easter egg modals
│   │
│   ├── data/
│   │   ├── birthdayConfig.js    # Central personal configuration
│   │   ├── questions.js         # Quiz questions & feedbacks
│   │   └── memories.js          # Photo gallery items & notes
│   │
│   ├── utils/
│   │   └── audioManager.js      # Dual MP3 & Web Audio API synthesizer
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css               # Romantic pastel design system
│
├── google-apps-script/
│   └── Code.gs                  # Google Sheets & Email script
├── package.json
└── README.md
```

---

Crafted with all the love in the universe. ❤️
