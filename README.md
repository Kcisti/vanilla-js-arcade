# 🔲 Cube Fall Arcade

> A fast-paced "Fall Down" style arcade game built with Vanilla JavaScript.
> Originally started as a learning experiment 7 years ago, refactored into a responsive web app.

![Language](https://img.shields.io/badge/Language-Vanilla%20JS-yellow.svg)
![Style](https://img.shields.io/badge/Style-Retro%20Arcade-purple.svg)
![Status](https://img.shields.io/badge/Status-Playable-green.svg)

## 🎮 The Game
The goal is simple: survive as long as possible.
Control the cube to fall through the holes in the rising platforms. If you hit the top of the screen, it's Game Over.

### Features
* **Dynamic Difficulty:** The character changes color as you progress (Red -> Green -> Blue -> Purple).
* **Cross-Platform Controls:**
    * 💻 **Desktop:** Use `Left Arrow` and `Right Arrow`.
    * 📱 **Mobile:** Touch controls (Left/Right side of screen).
* **Zero Dependencies:** Built entirely with native HTML5, CSS3, and JavaScript logic. No game engines used.

## 🛠️ Technical Details
This project represents my journey into understanding the **DOM** and **Game Loops**.
Unlike modern canvas-based games, this engine runs on pure DOM manipulation, calculating collisions and movement via absolute positioning and coordinate tracking.

**Tech Stack:**
* **Core:** JavaScript (ES6 features adapted for web).
* **Styling:** CSS3 with custom animations (`slowdisappearance`) and responsive units (`rem`).
* **Structure:** Semantic HTML5.

## 🚀 How to Run
You can play it directly in your browser:

https://kcisti.github.io/vanilla-js-arcade/

## 📱 Android Version
An APK build (wrapped via Apache Cordova/WebView) is available in the [Releases](https://github.com/Kcisti/cube-fall-js/releases) section.

## 👨‍💻 Author
**Kcisti** - *Developer & CS Student*
