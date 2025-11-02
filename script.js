const chapters = [
  {num:1, title:"Εισαγωγή στην ΤΝ", questions:35},
  {num:2, title:"Τεχνολογίες 4ης Βιομηχανικής Επανάστασης", questions:40},
  {num:3, title:"Δεδομένα και ΤΝ", questions:35},
  {num:4, title:"Θεωρητικά Θεμέλια ΤΝ", questions:30},
  {num:5, title:"Μηχανική Μάθηση", questions:40},
  {num:6, title:"Βαθιά Μάθηση και Νευρωνικά Δίκτυα", questions:40},
  {num:7, title:"Επεξεργασία Φυσικής Γλώσσας", questions:30},
  {num:8, title:"Ενισχυτική Μάθηση", questions:35},
  {num:9, title:"Ρομποτική και ΤΝ", questions:25},
  {num:10, title:"Ηθική και Ευθύνη στην ΤΝ", questions:30},
  {num:11, title:"Big Data και ΤΝ", questions:30},
  {num:12, title:"Υπολογιστική Όραση", questions:25},
  {num:13, title:"Διαλογική ΤΝ και Chatbots", questions:25},
  {num:14, title:"Μέλλον της ΤΝ", questions:30},
  {num:15, title:"Υλοποίηση Συστημάτων ΤΝ", questions:50}
];

window.onload = () => {
  const container = document.getElementById('chapters-container');

  chapters.forEach(ch => {
    const lastScore = localStorage.getItem(`chapter${ch.num}_score`) || "—";

    const card = document.createElement('div');
    card.className = 'chapter-card';
    card.onclick = () => startQuiz(ch.num);

    card.innerHTML = `
      <div class="chapter-number">Κεφάλαιο ${ch.num}</div>
      <div class="chapter-title">${ch.title}</div>
      <div class="chapter-info">
        <span class="questions-count">📝 ${ch.questions} ερωτήσεις</span>
        <span class="last-score">${lastScore}</span>
      </div>
    `;

    container.appendChild(card);
  });
};

function startQuiz(num) {
  window.location = `quiz.html?chapter=${num}`;
}
