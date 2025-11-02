# 🤖 AI Tests Application

Modern UI Test Platform for Artificial Intelligence Chapters

## 🚀 Quick Start (IMPORTANT!)

### ⚠️ CORS Error Fix

If you get a **strict-origin-when-cross-origin error**, use the provided CORS server:

```bash
python cors_server.py
```

Then open: **http://localhost:8000**

### Other Options

#### Option 2: Python HTTP Server
```bash
python -m http.server 8000
```

#### Option 3: Node.js http-server
```bash
npm install -g http-server
http-server -p 8000 -c-1
```

#### Option 4: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

---

## 📁 Setup Instructions

### 1. Extract the ZIP file

### 2. Add JSON Files
Place your question files in the `data/` folder:

```
ai-tests-modern-final/
├── index.html
├── quiz.html
├── style.css
├── script.js
├── quiz.js
├── cors_server.py         ← RUN THIS
├── README.md
└── data/
    ├── chapter_1_questions.json
    ├── chapter_2_questions.json
    └── ... (up to chapter_15)
```

### 3. Run the Server

```bash
python cors_server.py
```

### 4. Open Browser

Visit: **http://localhost:8000**

---

## ✅ Features

- ✨ Modern gradient UI (purple/blue theme)
- 📱 Fully responsive (mobile, tablet, desktop)
- 📊 Progress bar during quiz
- ✅ Real-time score calculation
- 📈 Score history with localStorage
- 🎨 Smooth animations and hover effects
- 🎯 Card-based chapter selection

---

## 🌐 Deploy to GitHub Pages

1. Create GitHub repository
2. Push all files
3. Go to Settings → Pages
4. Deploy from `main` branch
5. Access at: `https://yourusername.github.io/repo-name`

---

## 📝 JSON Format

Each file (`data/chapter_1_questions.json` to `data/chapter_15_questions.json`) should contain:

```json
[
  {
    "question": "Your question here?",
    "answer": true,
    "chapter_number": 1,
    "right_answer": "Explanation for wrong answers (optional)"
  },
  {
    "question": "Another question?",
    "answer": false,
    "chapter_number": 1,
    "right_answer": "Why this is the correct answer"
  }
]
```

---

## ❌ Troubleshooting

### JSON Files Not Loading
- [ ] Check file names: `chapter_1_questions.json` to `chapter_15_questions.json`
- [ ] Ensure files are in `data/` folder
- [ ] Open browser F12 → Console to see errors
- [ ] Reload page (Ctrl+F5 for hard refresh)

### CORS Error Still Appears
- Use `python cors_server.py` instead
- Or use Live Server extension in VS Code

### Port 8000 Already in Use
```bash
python -m http.server 8001
```

### Blank Page or White Screen
1. Check console for errors (F12)
2. Ensure all HTML/CSS/JS files are in root folder
3. Ensure `data/` folder exists with JSON files

---

## 🎨 Customization

Edit `style.css` to change:
- Gradient colors (lines 38-39): `#667eea`, `#764ba2`
- Font family and sizes
- Card styling and shadows
- Button appearance
- Animations and transitions

---

## 📧 Issues?

Check the browser console (F12) for error messages that help identify the problem.

Good luck with your tests! 🎓
