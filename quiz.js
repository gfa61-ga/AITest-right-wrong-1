const params = new URLSearchParams(window.location.search);
const chapter = params.get('chapter');
const randomCount = params.get('random');
const random20Chapter = params.get('random20');
const quizContainer = document.getElementById('quiz-container');
const results = document.getElementById('results');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress');
const progressText = document.getElementById('progress-text');

let questions = [];

window.onload = async () => {
  if (chapter) {
    document.getElementById('chapter-title').innerText = `Κεφάλαιο ${chapter}`;
    await loadChapterQuestions(parseInt(chapter));
  } else if (randomCount) {
    document.getElementById('chapter-title').innerText = `🎲 ${randomCount} Τυχαίες Ερωτήσεις`;
    await loadRandomQuestions(parseInt(randomCount));
  } else if (random20Chapter) {
    document.getElementById('chapter-title').innerText = `🎯 20 Τυχαίες - Κεφάλαιο ${random20Chapter}`;
    await load20RandomFromChapter(parseInt(random20Chapter));
  }
};

async function loadChapterQuestions(chapterNum) {
  try {
    const response = await fetch(`data/chapter_${chapterNum}_questions.json`);
    questions = await response.json();
    displayQuestions();
    updateProgress();
  } catch (err) {
    quizContainer.innerHTML = '<p style="color:red;">Σφάλμα φόρτωσης.</p>';
  }
}

async function load20RandomFromChapter(chapterNum) {
  try {
    const response = await fetch(`data/chapter_${chapterNum}_questions.json`);
    const allQuestions = await response.json();
    questions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 20);
    displayQuestions();
    updateProgress();
  } catch (err) {
    quizContainer.innerHTML = '<p style="color:red;">Σφάλμα φόρτωσης.</p>';
  }
}

async function loadRandomQuestions(count) {
  try {
    let allQuestions = [];
    for (let i = 1; i <= 15; i++) {
      const response = await fetch(`data/chapter_${i}_questions.json`);
      const chapterQuestions = await response.json();
      allQuestions = allQuestions.concat(chapterQuestions.map(q => ({...q, chapter: i})));
    }

    let selectedQuestions = [];
    if (count === 60) {
      const totalQuestions = 480;
      for (let i = 1; i <= 15; i++) {
        const chapterQuestions = allQuestions.filter(q => q.chapter === i);
        const neededCount = Math.round((chapterQuestions.length / totalQuestions) * count);
        const shuffled = [...chapterQuestions].sort(() => Math.random() - 0.5);
        selectedQuestions = selectedQuestions.concat(shuffled.slice(0, neededCount));
      }
      while (selectedQuestions.length < count) {
        const randomChapter = Math.floor(Math.random() * 15) + 1;
        const chapterQ = allQuestions.filter(q => q.chapter === randomChapter);
        selectedQuestions.push(chapterQ[Math.floor(Math.random() * chapterQ.length)]);
      }
      questions = selectedQuestions.slice(0, count).sort(() => Math.random() - 0.5);
    }

    displayQuestions();
    updateProgress();
  } catch (err) {
    quizContainer.innerHTML = '<p style="color:red;">Σφάλμα φόρτωσης.</p>';
  }
}

function displayQuestions() {
  quizContainer.innerHTML = '';
  questions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';
    const chapterInfo = q.chapter ? ` (Κεφ. ${q.chapter})` : '';
    div.innerHTML = `
      <p><strong>${i + 1}.</strong> ${q.question}${chapterInfo}</p>
      <label><input type="radio" name="q${i}" value="true" onchange="updateProgress()"> Σωστό</label>
      <label><input type="radio" name="q${i}" value="false" onchange="updateProgress()"> Λάθος</label>
    `;
    quizContainer.appendChild(div);
  });
}

function updateProgress() {
  let answered = 0;
  questions.forEach((q, i) => {
    if (document.querySelector(`input[name='q${i}']:checked`)) {
      answered++;
    }
  });
  const percentage = (answered / questions.length) * 100;
  progressBar.style.width = percentage + '%';
  progressText.innerText = `${answered} / ${questions.length}`;
}

submitBtn.onclick = () => {
  let score = 0;
  let tableHtml = '<table><thead><tr><th>#</th><th>Ερώτηση</th><th>Κεφ.</th><th>Απάντηση</th><th>Σωστή</th></tr></thead><tbody>';
  let cardsHtml = '<div class="results-card-view">';

  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name='q${i}']:checked`);
    let userAnswer = null;
    if (selected) userAnswer = (selected.value === 'true');

    const correctAnswer = q.answer;
    let isCorrect = false;
    let resultClass = '';
    let userAnswerText = '';
    let correctInfo = '';

    if (userAnswer === null) {
      isCorrect = false;
      resultClass = 'incorrect';
      userAnswerText = 'Δεν απαντήθηκε';
      correctInfo = '—';
    } else {
      isCorrect = (userAnswer === correctAnswer);
      userAnswerText = userAnswer ? 'Σωστό' : 'Λάθος';
      if (isCorrect) {
        resultClass = 'correct';
        correctInfo = correctAnswer==true ?'✓' : q.right_answer;
        score++;
      } else {
        resultClass = 'incorrect';
        const correctAnswerText = correctAnswer ? 'Σωστό' : 'Λάθος';
        correctInfo = q.right_answer ? `${correctAnswerText}<br><em>${q.right_answer}</em>` : correctAnswerText;
      }
    }

    const chapter = q.chapter || '—';

    // Table HTML
    tableHtml += `<tr><td>${i + 1}</td><td>${q.question}</td><td>${chapter}</td><td class="${resultClass}">${userAnswerText}</td><td>${correctInfo}</td></tr>`;

    // Card HTML
    cardsHtml += `
      <div class="result-card">
        <div class="result-card-header">
          <span class="result-card-num">#${i + 1}</span>
          <span class="result-card-chapter">Κεφ. ${chapter}</span>
        </div>
        <div class="result-card-question">${q.question}</div>
        <div class="result-card-row">
          <span class="result-card-label">Η απάντηση σας:</span>
          <span class="result-card-value ${resultClass}">${userAnswerText}</span>
        </div>
        <div class="result-card-row">
          <span class="result-card-label">Σωστή απάντηση:</span>
          <span class="result-card-value">${correctInfo.replace(/<br>/g, ' - ').replace(/<em>/g, '').replace(/<\/em>/g, '')}</span>
        </div>
      </div>
    `;
  });

  tableHtml += '</tbody></table>';
  cardsHtml += '</div>';

  const percentage = Math.round((score / questions.length) * 100);
  const scoreDisplay = `<div class="score-display">Σκορ: ${score}/${questions.length} (${percentage}%)</div>`;

  let html = '<h2>📊 Αποτελέσματα</h2>';
  html += scoreDisplay;
  html += '<div class="results-table-wrapper">' + tableHtml + '</div>';
  html += cardsHtml;

  results.innerHTML = html;
  results.classList.remove('hidden');
  submitBtn.disabled = true;
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};
