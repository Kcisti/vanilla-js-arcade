# 🔲 Cube Fall Arcade

> A fast-paced "Fall Down" style arcade game built with Vanilla JavaScript.
> Originally started as a learning experiment 7 years ago, refactored into a responsive, feature-rich web app.

![Language](https://img.shields.io/badge/Language-Vanilla%20JS-yellow.svg)
![Style](https://img.shields.io/badge/Style-Retro%20Arcade-purple.svg)
![Status](https://img.shields.io/badge/Status-Playable-green.svg)

## 🎮 The Game
The goal is simple: survive as long as possible and reach 1000 points.
Control the cube to fall through the holes in the rising platforms. If you hit the top of the screen, it's Game Over.

### ✨ Key Features
* **10 Progressive Levels:** The game dynamically increases in speed and changes color palette every 100 points, ranging from a calm Gray to a frantic Emerald Green.
* **Unlockable Skins:** Reaching new score milestones unlocks new permanent colors for your cube. Equip your favorite skin from the Home Menu!
* **Dynamic Audio:** The game soundtrack dynamically speeds up (`playbackRate`) as you progress through the levels, increasing the tension.
* **Juicy Visual Effects:** Includes a smooth blurry motion trail for the character, screen shake on level-ups, and pulsating UI elements.
* **Haptic Feedback:** Native device vibration integration (Android) for menu clicks, level-ups, game overs, and victories.
* **Persistent Progression:** High scores and equipped skins are automatically saved in the browser using `localStorage`.

### 🕹️ Controls (Cross-Platform)
* 💻 **Desktop:** Use `Left Arrow` and `Right Arrow` keys.
* 📱 **Mobile:** Touch controls (Left/Right side of the screen) or dedicated on-screen buttons.

## 🛠️ Technical Details
This project represents a journey into understanding the **DOM** and **Game Loops**.
Unlike modern canvas-based games, this engine runs on pure DOM manipulation, calculating collisions and movement via absolute positioning and coordinate tracking.

**Tech Stack:**
* **Core:** Vanilla JavaScript (ES6).
* **Storage:** `localStorage` API for game state persistency.
* **Hardware API:** `Navigator.vibrate()` for haptic feedback.
* **Media:** HTML5 Audio API for dynamic pitch/speed manipulation.
* **Styling:** CSS3 with custom keyframe animations, CSS variables, and responsive units (`rem`).

## 🚀 How to Run
You can play it directly in your browser without any build tools:

1. Clone the repository.
2. **Important:** Add an audio file named `track.mp3` inside the `src/` folder for the dynamic music to work.
3. Open `index.html` in any modern web browser.
4. Click **START**.

## 📱 Compatibility & Installation

Because this game relies on native web APIs, the experience varies slightly depending on your device and operating system.

### 🍏 iOS (iPhone / iPad)
Apple strictly restricts the Web Vibration API on Safari, so **haptic feedback will not work on iOS devices**. However, you can still install the game natively to play it in full-screen mode without the browser UI!
* **How to install on iOS:** Open the game link in **Safari** -> Tap the **Share** button (square with an arrow) -> Scroll down and select **"Add to Home Screen"**.

### 🤖 Android
The game is fully supported on Android browsers (Chrome, Edge, Firefox) and takes full advantage of the **Vibration API** for immersive haptic feedback during level-ups and game overs.
* **How to install on Android:** You can either download the APK from the [Releases] tab, or open the web link in Chrome and select **"Add to Home screen"** from the browser menu.

### 💻 Desktop (PC / Mac)
The game is fully playable using keyboard controls (`Left/Right Arrows`). Naturally, physical vibration is not supported on desktop hardware, but visual screen-shake effects remain active to guarantee the "game juice".

## 👨‍💻 Author
**Kcisti** - *Developer & CS Student*