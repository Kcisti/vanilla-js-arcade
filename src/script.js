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

const gameSkins = [
    { color: '#d4d4d4', scolor: '#3a3a3a' }, // 0
    { color: '#00e5ff', scolor: '#008b9e' }, // 100
    { color: '#2979ff', scolor: '#0043bd' }, // 200
    { color: '#651fff', scolor: '#3b00ab' }, // 300
    { color: '#f50057', scolor: '#960035' }, // 400
    { color: '#ff1744', scolor: '#9e0024' }, // 500
    { color: '#ff9100', scolor: '#9e5a00' }, // 600
    { color: '#ffea00', scolor: '#9e9100' }, // 700
    { color: '#76ff03', scolor: '#429e00' }, // 800
    { color: '#00e676', scolor: '#008b46' }  // 900
];

const gameMusic = new Audio('src/track.mp3'); 
gameMusic.loop = true; 

let selectedSkinIndex = parseInt(localStorage.getItem('cubeSkinIndex')) || 0;

function buildSkinSelector() {
    const maxScore = parseInt(localStorage.getItem('cubeMaxScore') || 0);
    const unlockedLevels = Math.min(9, Math.floor(maxScore / 100)); 

    if (selectedSkinIndex > unlockedLevels) {
        selectedSkinIndex = unlockedLevels;
    }
    
    const skinContainer = document.getElementById('skinSelector');
    if (!skinContainer) return;
    skinContainer.innerHTML = ''; 

    for (let i = 0; i <= unlockedLevels; i++) {
        const btn = document.createElement('div');
        btn.className = 'skin-btn';
        btn.style.backgroundColor = gameSkins[i].color;
        btn.style.color = gameSkins[i].color;

        if (i === selectedSkinIndex) {
            btn.classList.add('selected');
            updateCubeColor(i);
        }

        btn.addEventListener('click', () => {
            document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSkinIndex = i; 

            localStorage.setItem('cubeSkinIndex', selectedSkinIndex);

            updateCubeColor(i);
            
            if ("vibrate" in navigator) navigator.vibrate(20); 
        });

        skinContainer.appendChild(btn);
    }
}

function updateCubeColor(index) {
    const cube = document.querySelector('.cube');
    if(cube) {
        cube.style.setProperty('--cubeColor', gameSkins[index].color);
        cube.style.setProperty('--scubeColor', gameSkins[index].scolor);
    }
}

buildSkinSelector();

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
DOM.gameButtRight.addEventListener('touchstart', (e) => { e.preventDefault(); isMovingRight = true; });
DOM.gameButtRight.addEventListener('touchend', (e) => { e.preventDefault(); isMovingRight = false; });

DOM.gameButtLeft.addEventListener('mousedown', () => (isMovingLeft = true));
DOM.gameButtLeft.addEventListener('mouseup', () => (isMovingLeft = false));
DOM.gameButtLeft.addEventListener('touchstart', (e) => { e.preventDefault(); isMovingLeft = true; });
DOM.gameButtLeft.addEventListener('touchend', (e) => { e.preventDefault(); isMovingLeft = false; });

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
  let currentLevelColor = gameSkins[selectedSkinIndex].color;
  let blockSpeed = 0.5;
  
  let lastLevelReached = 0; 

  DOM.score.innerText = "000000";
  DOM.score.style.color = currentLevelColor;
  DOM.game.style.borderColor = currentLevelColor;
  DOM.character.style.backgroundColor = currentLevelColor;
  DOM.game_ui.style.color = currentLevelColor;
  
  if(DOM.gameButtLeft && DOM.gameButtRight) {
      DOM.gameButtLeft.style.color = currentLevelColor;
      DOM.gameButtRight.style.color = currentLevelColor;
  }

  let trailInterval = setInterval(() => {
    const charTop = window.getComputedStyle(DOM.character).getPropertyValue('top');
    const charLeft = window.getComputedStyle(DOM.character).getPropertyValue('left');
    
    const trail = document.createElement('div');
    trail.setAttribute('class', 'trail');
    trail.style.top = charTop;
    trail.style.left = charLeft;
    trail.style.backgroundColor = currentLevelColor; 
    
    DOM.game.appendChild(trail);

    setTimeout(() => {
      trail.remove();
    }, 400);
  }, 40);

  function updateGameColors(newColor) {
      currentLevelColor = newColor;
      DOM.character.style.backgroundColor = currentLevelColor;
      DOM.game_ui.style.color = currentLevelColor;
      DOM.score.style.color = currentLevelColor;
      DOM.game.style.borderColor = currentLevelColor;

      DOM.gameButtLeft.style.color = currentLevelColor;
      DOM.gameButtRight.style.color = currentLevelColor;

      const activeBlocks = document.querySelectorAll('.block');
      activeBlocks.forEach(block => {
          block.style.backgroundColor = currentLevelColor;
      });

      DOM.score.classList.remove('level-up-anim'); 
      void DOM.score.offsetWidth; 
      DOM.score.classList.add('level-up-anim');

      if ("vibrate" in navigator) {
          navigator.vibrate(80);
      }
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

      if ("vibrate" in navigator) {
          navigator.vibrate(200);
      }

      gameMusic.pause();

      alert(`Game Lost. Score: ${counter - 9}`);
      clearInterval(trailInterval);
      clearInterval(blocks);
      location.reload();
    }
    
    if (counter - 9 == 1000) {
      const currentScore = counter - 9;
      const bestScore = parseInt(localStorage.getItem('cubeMaxScore') || 0);
      
      if (currentScore > bestScore) {
          localStorage.setItem('cubeMaxScore', currentScore);
      }

      if ("vibrate" in navigator) {
        navigator.vibrate([150, 50, 150, 50, 300]);
      }

      gameMusic.pause();

      alert(`Game Win. Score: ${counter - 9}`);
      clearInterval(trailInterval);
      clearInterval(blocks);
      location.reload();
    }

    const score = counter - 9;
    
    let currentLevelIndex = Math.floor(score / 100);

    if (currentLevelIndex > lastLevelReached && currentLevelIndex <= 9) {
        
        blockSpeed = 0.5 + (currentLevelIndex * 0.1); 
        let displayColorIndex = Math.max(currentLevelIndex, selectedSkinIndex);
        
        updateGameColors(gameSkins[displayColorIndex].color);
        
        gameMusic.playbackRate = 1.0 + (currentLevelIndex * 0.15);

        lastLevelReached = currentLevelIndex;
    }

    for (let i = 0; i < currentBlocks.length; i++) {
      const current = currentBlocks[i];
      const iblock = document.getElementById(`block${current}`);
      const ihole = document.getElementById(`hole${current}`);

      if (!iblock || !ihole) continue; 

      const iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'));
      const iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue('left'));

      iblock.style.top = `${iblockTop - blockSpeed}px`;
      ihole.style.top = `${iblockTop - blockSpeed}px`;

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
      DOM.character.style.top = `${characterTop - blockSpeed}px`;
    }
  }, 1);

  gameLoop(); 
}

function startGame(){
  DOM.home.style.display = 'none';
  DOM.game.style.display = 'block';
  DOM.game_ui.style.display = 'flex'; 
  if(window.innerWidth<600){
    DOM.game_buttons.style.display = 'block';
  }

  if(window.innerWidth>850){
    DOM.game_ui.style.width = '50%';
    DOM.game_ui.style.marginLeft = '25%';
    DOM.game.style.width = '50%';
    DOM.game.style.marginLeft = '25%';
  }
  
  gameMusic.playbackRate = 1.0; 
  gameMusic.play().catch(e => console.log("Errore audio:", e));

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