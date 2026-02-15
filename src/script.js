const DOM = {
    login: document.querySelector('.login'),
    home: document.querySelector('.home'),
    maxScoreDisplay: document.querySelector('#maxScore'),
    home_button: document.querySelector('.home_button'),
    game: document.querySelector('.game'),
    game_ui: document.querySelector('.game-ui'), 
    game_buttons: document.querySelector('.game_buttons'),
    block: document.querySelector('.block'),
    hole: document.querySelector('.hole'),
    character: document.querySelector('#character'),
    score: document.querySelector('#score'),
    gameButtRight: document.querySelector('#gameButtonRight'),
    gameButtLeft: document.querySelector('#gameButtonLeft'),
};


const savedMaxScore = localStorage.getItem('cubeMaxScore') || 0;
DOM.maxScoreDisplay.innerText = `MAX SCORE: ${savedMaxScore.toString().padStart(6, '0')}`;

DOM.home.style.display = 'none';
DOM.game.style.display = 'none';
DOM.game_ui.style.display = 'none'; 
DOM.game_buttons.style.display = 'none';

const characterSpeed = 4;
let isMovingRight = false;
let isMovingLeft = false;
const xLimitRight = 300;
const xLimitLeft = 10;

function moveCharacter(direction) {
  const currentLeft = parseInt(window.getComputedStyle(DOM.character).left, 10) || 0;
  if (direction === 'right' && currentLeft < xLimitRight) {
    DOM.character.style.left = `${currentLeft + characterSpeed}px`;
  } else if (direction === 'left' && currentLeft > xLimitLeft) {
    DOM.character.style.left = `${currentLeft - characterSpeed}px`;
  }
}

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

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') isMovingRight = true;
  if (event.key === 'ArrowLeft') isMovingLeft = true;
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowRight') isMovingRight = false;
  if (event.key === 'ArrowLeft') isMovingLeft = false;
});

function gameLoop() {
  if (isMovingRight) moveCharacter('right');
  if (isMovingLeft) moveCharacter('left');
  requestAnimationFrame(gameLoop);
}

function playGame() {
  let counter = 0;
  let currentBlocks = [];
  let blocks;
  let currentLevelColor = '#d4d4d4'; 

  DOM.score.innerText = "000000";
  DOM.score.style.color = currentLevelColor;
  DOM.game.style.borderColor = currentLevelColor;

  function updateGameColors(newColor) {
      currentLevelColor = newColor;
      DOM.character.style.backgroundColor = currentLevelColor;
      DOM.game_ui.style.color = currentLevelColor;
      DOM.game.style.borderColor = currentLevelColor;
      const activeBlocks = document.querySelectorAll('.block');
      activeBlocks.forEach(block => {
          block.style.backgroundColor = currentLevelColor;
      });
  }

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
      block.style.backgroundColor = currentLevelColor;

      DOM.game.appendChild(block);
      DOM.game.appendChild(hole);
      currentBlocks.push(counter);
      counter++;

      let currentScore = counter - 9;
      if (currentScore < 0) currentScore = 0;
      DOM.score.innerText = currentScore.toString().padStart(6, '0');
    }

    const characterTop = parseInt(window.getComputedStyle(DOM.character).getPropertyValue('top'));
    const characterLeft = parseInt(window.getComputedStyle(DOM.character).getPropertyValue('left'));
    let drop = 0;

    if (characterTop <= 0) {
      const currentScore = counter - 9;
      const bestScore = parseInt(localStorage.getItem('cubeMaxScore') || 0);
      
      if (currentScore > bestScore) {
          localStorage.setItem('cubeMaxScore', currentScore);
      }

      alert(`Game Lost. Score: ${counter - 9}`);
      clearInterval(blocks);
      location.reload();
    }
    if (counter - 9 == 1000) {
      const currentScore = counter - 9;
      const bestScore = parseInt(localStorage.getItem('cubeMaxScore') || 0);
      
      if (currentScore > bestScore) {
          localStorage.setItem('cubeMaxScore', currentScore);
      }

      alert(`Game Win. Score: ${counter - 9}`);
      clearInterval(blocks);
      location.reload();
    }

    const score = counter - 9;
    if (score == 250) updateGameColors('#b70202');
    if (score == 500) updateGameColors('#76ff61');
    if (score == 750) updateGameColors('#2426cc');
    if (score == 900) updateGameColors('#6d24cc');

    for (let i = 0; i < currentBlocks.length; i++) {
      const current = currentBlocks[i];
      const iblock = document.getElementById(`block${current}`);
      const ihole = document.getElementById(`hole${current}`);

      if (!iblock || !ihole) continue; 

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

  gameLoop(); 
}

function startGame(){
  DOM.home.style.display = 'none';
  DOM.game.style.display = 'block';
  DOM.game_ui.style.display = 'flex'; 
  DOM.game_buttons.style.display = 'block';
  playGame();
}

setTimeout(() => {
  DOM.login.style.animation = 'slowdisappearance 2s ease-in-out';
}, 2000);

setTimeout(() => {
  DOM.login.style.display = 'none';
  DOM.home.style.display = 'flex';
}, 4000);

DOM.home_button.addEventListener('click', startGame);