const DOM = {
    login: document.querySelector('.login'),

    home: document.querySelector('.home'),
    home_button: document.querySelector('.home_button'),

    game: document.querySelector('.game'),
    game_buttons: document.querySelector('.game_buttons'),
    character: document.querySelector('#character'),
  
    gameButtRight: document.querySelector('#gameButtonRight'),
    gameButtLeft: document.querySelector('#gameButtonLeft'),
};

DOM.home.style.display = 'none';
DOM.game.style.display = 'none';
DOM.game_buttons.style.display = 'none';

const characterSpeed = 4; // Velocità di movimento in pixel
let isMovingRight = false;
let isMovingLeft = false;
const xLimitRight = 300;
const xLimitLeft = 10;

// Funzione per gestire il movimento del personaggio
function moveCharacter(direction) {
  const currentLeft = parseInt(window.getComputedStyle(DOM.character).left, 10) || 0;
  if (direction === 'right' && currentLeft < xLimitRight) {
    DOM.character.style.left = `${currentLeft + characterSpeed}px`;
  } else if (direction === 'left' && currentLeft > xLimitLeft) {
    DOM.character.style.left = `${currentLeft - characterSpeed}px`;
  }
}

// Eventi per i pulsanti di movimento
DOM.gameButtRight.addEventListener('mousedown', () => (isMovingRight = true));
DOM.gameButtRight.addEventListener('mouseup', () => (isMovingRight = false));
DOM.gameButtRight.addEventListener('touchstart', (e) => {
  e.preventDefault();
  isMovingRight = true;
});
DOM.gameButtRight.addEventListener('touchend', (e) => {
  e.preventDefault();
  isMovingRight = false;
});

DOM.gameButtLeft.addEventListener('mousedown', () => (isMovingLeft = true));
DOM.gameButtLeft.addEventListener('mouseup', () => (isMovingLeft = false));
DOM.gameButtLeft.addEventListener('touchstart', (e) => {
  e.preventDefault();
  isMovingLeft = true;
});
DOM.gameButtLeft.addEventListener('touchend', (e) => {
  e.preventDefault();
  isMovingLeft = false;
});

// Movimento con tastiera
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') isMovingRight = true;
  if (event.key === 'ArrowLeft') isMovingLeft = true;
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowRight') isMovingRight = false;
  if (event.key === 'ArrowLeft') isMovingLeft = false;
});

// Ciclo per aggiornare il movimento
function gameLoop() {
  if (isMovingRight) moveCharacter('right');
  if (isMovingLeft) moveCharacter('left');
  requestAnimationFrame(gameLoop);
}

// Inizializzazione del gioco
function playGame() {

  // Variabili del gioco
  let counter = 0;
  let currentBlocks = [];
  let blocks;

  // Generazione dei blocchi e gestione del gioco
  blocks = setInterval(() => {
    const blockLast = document.getElementById(`block${counter - 1}`);
    const holeLast = document.getElementById(`hole${counter - 1}`);

    let blockLastTop = 0;
    if (blockLast) {
      blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue('top'));
    }

    if (blockLastTop < 400 || counter === 0) {
      const block = document.createElement('div');
      const hole = document.createElement('div');
      block.setAttribute('class', 'block');
      hole.setAttribute('class', 'hole');
      block.setAttribute('id', `block${counter}`);
      hole.setAttribute('id', `hole${counter}`);
      block.style.top = `${blockLastTop + 100}px`;
      hole.style.top = `${blockLastTop + 100}px`;
      hole.style.left = `${Math.floor(Math.random() * 290)}px`;

      DOM.game.appendChild(block);
      DOM.game.appendChild(hole);
      currentBlocks.push(counter);
      counter++;
    }

    const characterTop = parseInt(window.getComputedStyle(DOM.character).getPropertyValue('top'));
    const characterLeft = parseInt(window.getComputedStyle(DOM.character).getPropertyValue('left'));
    let drop = 0;

    if (characterTop <= 0) {
      alert(`Game Lost. Score: ${counter - 9}`);
      clearInterval(blocks);
      location.reload();
    }
    if (counter - 9 == 1000) {
      alert(`Game Win. Score: ${counter - 9}`);
      clearInterval(blocks);
      location.reload();
    }
    if (counter - 9 == 250) {
      DOM.character.style.backgroundColor = '#b70202';
    }
    if (counter - 9 == 500) {
      DOM.character.style.backgroundColor = '#76ff61';
    }
    if (counter - 9 == 750) {
      DOM.character.style.backgroundColor = '#2426cc';
    }
    if (counter - 9 == 900) {
      DOM.character.style.backgroundColor = '#6d24cc';
    }

    for (let i = 0; i < currentBlocks.length; i++) {
      const current = currentBlocks[i];
      const iblock = document.getElementById(`block${current}`);
      const ihole = document.getElementById(`hole${current}`);

      const iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'));
      const iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue('left'));

      iblock.style.top = `${iblockTop - 0.5}px`;
      ihole.style.top = `${iblockTop - 0.5}px`;

      if (iblockTop < -20) {
        currentBlocks.shift();
        iblock.remove();
        ihole.remove();
      }

      if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
        drop++;
        if (iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft) {
          drop = 0;
        }
      }
    }

    if (drop === 0) {
      if (characterTop < 480) {
        DOM.character.style.top = `${characterTop + 2}px`;
      }
    } else {
      DOM.character.style.top = `${characterTop - 0.5}px`;
    }
  }, 1);

  gameLoop(); // Avvia il ciclo principale
}

function startGame(){
  DOM.game.style.display = 'block';
  DOM.game_buttons.style.display = 'block';
  playGame();
}

// Preparazione schermata iniziale
setTimeout(() => {
  DOM.login.style.animation = 'slowdisappearance 2s ease-in-out';
}, 2000);

setTimeout(() => {
  DOM.login.style.display = 'none';
  DOM.home.style.display = 'block';
}, 4000);

DOM.home_button.addEventListener('click', startGame);
