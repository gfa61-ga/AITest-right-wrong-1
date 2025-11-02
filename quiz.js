const params = new URLSearchParams(window.location.search);
const chapter = params.get('chapter');
const quizContainer = document.getElementById('quiz-container');
const results = document.getElementById('results');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress');

document.getElementById('chapter-title').innerText = `Κεφάλαιο ${chapter}`;

let questions = [];

fetch(`data/chapter_${chapter}_questions.json`)
  .then(r => r.json())
  .then(d => {
    questions = d;
    displayQuestions();
    updateProgress();
  })
  .catch(err => {
    quizContainer.innerHTML = '<p style="color:red; text-align:center;">Σφάλμα φόρτωσης ερωτήσεων. Ελέγξτε ότι το αρχείο JSON υπάρχει στον φάκελο data/</p>';
    console.error('Error:', err);
  });

function displayQuestions() {
  quizContainer.innerHTML = '';
  questions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <p><strong>${i + 1}.</strong> ${q.question}</p>
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
}

submitBtn.onclick = () => {
  let score = 0;
  let html = '<h2>📊 Αποτελέσματα</h2>';
  html += '<table><thead><tr><th>#</th><th>Ερώτηση</th><th>Η Απάντησή σας ήταν</th><th>Σωστή Απάντηση</th></tr></thead><tbody>';

  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name='q${i}']:checked`);

    let userAnswer = null;
    if (selected) {
      userAnswer = (selected.value === 'true');
    }

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
      userAnswerText = userAnswer ? 'Σωστή' : 'Λάθος';

      if (isCorrect) {
        resultClass = 'correct';
        correctInfo = '✓';
        score++;
      } else {
        resultClass = 'incorrect';
        const correctAnswerText = correctAnswer ? 'Σωστή' : 'Λάθος';
        correctInfo = q.right_answer ? `<strong>${correctAnswerText}</strong><br><em>${q.right_answer}</em>` : `<strong>${correctAnswerText}</strong>`;
      }
    }

    html += `<tr>
      <td>${i + 1}</td>
      <td>${q.question}</td>
      <td class="${resultClass}">${userAnswerText}</td>
      <td>${correctInfo}</td>
    </tr>`;
  });

  html += '</tbody></table>';

  const percentage = Math.round((score / questions.length) * 100);
  html = `<div class="score-display">Συνολικό Σκορ: ${score}/${questions.length} (${percentage}%)</div>` + html;

  localStorage.setItem(`chapter${chapter}_score`, `${percentage}%`);
  const historyKey = `chapter${chapter}_history`;
  const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  history.push({ date: new Date().toLocaleString('el-GR'), score: percentage });
  localStorage.setItem(historyKey, JSON.stringify(history));

  html += '<div class="history-section"><h3>📈 Ιστορικό Προσπαθειών</h3><ul>';
  history.forEach(h => html += `<li>${h.date} — ${h.score}%</li>`);
  html += '</ul></div>';

  results.innerHTML = html;
  results.classList.remove('hidden');
  submitBtn.disabled = true;
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};
