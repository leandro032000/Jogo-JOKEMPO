// Mapeamento dos símbolos e regras do jogo
const choices = {
  pedra: { icon: '✊', beats: 'tesoura' },
  papel: { icon: '✋', beats: 'pedra' },
  tesoura: { icon: '✌️', beats: 'papel' }
};

// Variáveis de estado
let playerScore = 0;
let computerScore = 0;

// Seleção dos elementos do DOM
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const resultEl = document.getElementById('result');
const optionButtons = document.querySelectorAll('.btn-option');
const resetButton = document.getElementById('btn-reset');

// Função principal de jogada
function play(playerSelection) {
  const optionsKeys = Object.keys(choices);
  const computerSelection = optionsKeys[Math.floor(Math.random() * optionsKeys.length)];

  // Atualiza os ícones na tela
  playerChoiceEl.textContent = choices[playerSelection].icon;
  computerChoiceEl.textContent = choices[computerSelection].icon;

  // Aplica animação nos elementos
  triggerAnimation(playerChoiceEl);
  triggerAnimation(computerChoiceEl);

  // Lógica de determinação do vencedor
  if (playerSelection === computerSelection) {
    resultEl.textContent = 'Empate!';
    resultEl.style.color = '#eccc68';
  } else if (choices[playerSelection].beats === computerSelection) {
    resultEl.textContent = 'Você Ganhou! 🎉';
    resultEl.style.color = '#2ed573';
    playerScore++;
    playerScoreEl.textContent = playerScore;
  } else {
    resultEl.textContent = 'Você Perdeu! ❌';
    resultEl.style.color = '#ff4757';
    computerScore++;
    computerScoreEl.textContent = computerScore;
  }
}

// Adiciona efeito visual de animação
function triggerAnimation(element) {
  element.classList.remove('shake');
  void element.offsetWidth; // Força o reflow para reiniciar a animação CSS
  element.classList.add('shake');
}

// Função para reiniciar o jogo
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  playerChoiceEl.textContent = '❓';
  computerChoiceEl.textContent = '❓';
  resultEl.textContent = 'Escolha uma opção para jogar!';
  resultEl.style.color = '#eccc68';
}

// Event Listeners
optionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const choice = button.getAttribute('data-choice');
    play(choice);
  });
});

resetButton.addEventListener('click', resetGame);

