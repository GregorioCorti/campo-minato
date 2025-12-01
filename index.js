let currentLevel;
let functionActiv = 1;

const ElementBomb = {
  box: 0,
  bomb: 1,
  flag: 2,
};

// dropdown
const menu = document.getElementById("menu");
menu.addEventListener("click", () => {
  menu.classList.toggle("active");
});

//menu option
const optionMenu = document.getElementById("option-menu");
const toggle = document.getElementById("toggler");
optionMenu.addEventListener("click", () => {
  optionMenu.classList.toggle("active");
  toggle.classList.toggle("show");
});

//menu difficulty
const dropdownWrapper = document.getElementById("wrapper");

//variabile accessibile
let posizione;
let posizion1;

// score
let scoreWin = document.getElementById("scoreWin");
let score = document.getElementById("score");
let numScore = 0;

// matrice
const allLevels = [
  { name: "easy", nBox: 100, bomb: 15, colonne: 10, righe: 10 },

  { name: "medium", nBox: 70, bomb: 17, colonne: 10, righe: 7 },
  { name: "hard", nBox: 50, bomb: 20, colonne: 10, righe: 5 },
];

// timer
let intervallo;
let secondi = 0;
let timer = document.getElementById("lcdTimer");

let isTimerCalled = false;

function timerDspaly() {
  intervallo = setInterval(() => {
    secondi++;
    timer.textContent = secondi;
    if (secondi == 600) {
      clearInterval(intervallo);
      let losePage = document.getElementById("lose");
      losePage.classList.add("show");
      timer.textContent = "CI HAI MESSO TROPPO!!";
      Time.textContent = "CI HAI MESSO TROPPO!!";
    }
  }, 1000);
  isTimerCalled = true;
}

viber = document.getElementById("vibe");

// stampa Time

let Time = document.getElementById("Time");
let timeWin = document.getElementById("timeWin");

function stopTimer() {
  clearInterval(intervallo);

  let TotTime = secondi;
  Time.innerText = TotTime + " sec.";
  timeWin.innerText = TotTime + " sec.";
}

function lvlEasy() {
  numScore = 0;

  currentLevel = 0;
  const lvlEasy = allLevels[0];

  creaGrigliahtml(lvlEasy.righe, lvlEasy.colonne);

  grid(lvlEasy.righe, lvlEasy.colonne, lvlEasy.bomb);

  document.getElementById("txt-diff").innerText = lvlEasy.name;

  let numeroBombe = document.getElementById("numBomb");
  numeroBombe.innerText = lvlEasy.bomb;
}

//win page

let winPage = document.getElementById("win");
// dom matrice
function creaGrigliahtml(rows, cols, verifica, boxInt) {
  verifica = rows * cols;

  const wrapper = document.getElementById("containerMain");

  wrapper.style.display = "grid";
  wrapper.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  wrapper.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  wrapper.style.gap = ".7rem";

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wrapperBox = document.createElement("div");
      const box = document.createElement("div");
      box.classList.add("box", "lcd-box");
      box.setAttribute("data-riga", r);
      box.setAttribute("data-colonna", c);
      wrapper.appendChild(wrapperBox);
      wrapperBox.appendChild(box);

      
      if (verifica > boxInt) {
        verifica--;

        box.remove();
      }

      if (verifica < boxInt) {
        verifica++;
        const wrapperBox = document.createElement("div");
        const box = document.createElement("div");
        box.classList.add("box", "lcd-box");
        box.setAttribute("data-riga", r);
        box.setAttribute("data-colonna", c);
        wrapper.appendChild(wrapperBox);
        wrapperBox.appendChild(box);
      }

      box.addEventListener("click", () => {
        box.classList.toggle("show");

        //fa partire il timer una sola volta
        if (!isTimerCalled) {
          timerDspaly();
        }
      });

      box.addEventListener("click", () => {
        box.classList.remove("flag");
        posizione = [
          box.getAttribute("data-riga"),
          box.getAttribute("data-colonna"),
        ];

        let riga = posizione[0];
        let colonna = posizione[1];
        let boxSelezionato = posizion1[riga][colonna];

        if (boxSelezionato == 1) {
          box.classList.add("bomb");
        }
      });

      box.addEventListener("click", () => {
        numScore++;
        score.innerText = numScore;
        scoreWin.innerText = numScore;
        if (numScore == 15) {
          winPage.classList.toggle("show");
          stopTimer();
        }

        if (box.classList.contains("bomb")) {
          score.innerText = numScore - 1;
          losePage.classList.add("show");
          if (losePage.classList.contains("show")) {
            toggle.classList.remove("show");
          }
          stopTimer();
          viber.classList.toggle("show");
        } else {
          viber.classList.remove("show");
        }

        // impedisce l'apertura della pagina winPage
        if (
          box.classList.contains("bomb") &&
          losePage.classList.contains("show")
        ) {
          winPage.classList.remove("show");
        }
      });
    }
  }

  let grid = Array.from({ length: rows }, () => Array(cols).fill(0));
}

// console matrice
function grid(row, cols, totalBombs) {
  let grid = [];

  for (let r = 0; r < row; r++) {
    let rowArr = Array(cols).fill(0);
    grid.push(rowArr);
  }

  let cells = [];
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ r, c });
    }
  }

  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  for (let i = 0; i < totalBombs; i++) {
    const { r, c } = cells[i];
    grid[r][c] = 1;
  }

  posizion1 = grid;

  return grid;
}

let img = document.getElementById("ciao");
let btn = document.getElementById("provaa");
let start = document.getElementById("dpNone");

//creo DropDown
function creoDropDown() {
  dropdownWrapper.innerText = "";
  for (let i = 0; i < allLevels.length; i++) {
    const dwElement = document.createElement("div");
    dwElement.classList.add("dw-element");

    const divWrapper = document.createElement("div");
    divWrapper.classList.add("dc");
    divWrapper.setAttribute("data-difficulty", allLevels[i].name); //mette l'attributo

    //mette il nome delle difficoltà
    const navElement = document.createElement("p");
    navElement.classList.add("crimson-text-bold");
    navElement.innerText = allLevels[i].name;

    divWrapper.addEventListener("click", function () {
      divWrapper.classList.toggle("show");

      clearInterval(intervallo);
      secondi = 0;
      timer.textContent = secondi;
      isTimerCalled = false;

      currentLevel = i;

      const wrapperMain = document.getElementById("containerMain");
      wrapperMain.innerHTML = "";

      numScore = 0;
      score.innerText = 0;

      creaGrigliahtml(
        allLevels[i].righe,
        allLevels[i].colonne,
        allLevels[i].bomb
      );

      grid(allLevels[i].righe, allLevels[i].colonne, allLevels[i].bomb);

      let diff = document.getElementById("txt-diff");
      diff.innerText = allLevels[i].name;

      let numeroBombe = document.getElementById("numBomb");
      numeroBombe.innerText = allLevels[i].bomb;
    });

    dropdownWrapper.appendChild(dwElement);
    dwElement.appendChild(divWrapper);
    divWrapper.appendChild(navElement);
  }
}

//richiama le funzioni
function callgrid() {
  btn.addEventListener("click", function () {
    //fa apparire il tasto option
    start.classList.toggle("show");
    if (start.classList.contains("show")) {
      optionMenu.classList.remove("remove");
    }

    lvlEasy();
  });
}

//fa scomparire il tasto option nel menu start
if (!start.classList.contains("show")) {
  optionMenu.classList.toggle("remove");
}
creoDropDown();

callgrid();

function reloadLevel() {
  let verifica;
  functionActiv = 2;
  const lvl = allLevels[currentLevel];

  const wrapperMain = document.getElementById("containerMain");
  wrapperMain.innerHTML = "";

  numScore = 0;
  score.innerText = 0;

  grid(lvl.righe, lvl.colonne, lvl.bomb);
  creaGrigliahtml(lvl.righe, lvl.colonne);

  document.getElementById("txt-diff").innerText = lvl.name;
  document.getElementById("numBomb").innerText = lvl.bomb;
}

//btn play again
let losePage = document.getElementById("lose");
let btnPlay = document.getElementById("playAgais");
let btnWin = document.getElementById("btn-play-again");

btnPlay.addEventListener("click", () => {
  losePage.classList.remove("show");
  clearInterval(intervallo);
  secondi = 0;
  timer.textContent = secondi;
  isTimerCalled = false;

  reloadLevel(); // Ricarica il livello
  
});

btnWin.addEventListener("click", () => {
  winPage.classList.remove("show");

  reloadLevel();
  clearInterval(intervallo);
  secondi = 0;
  timer.textContent = secondi;
  isTimerCalled = false;
});

const dati = document.getElementById("invioDati");
dati.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(dati);
  let numBox = formData.get("numBox");
  let numBomb = formData.get("numBomb");
  let numBoxInt = parseInt(formData.get("numBox"), 10);
  let numBombInt = parseInt(formData.get("numBomb"), 10);

  //fa le verifiche per creare i box
  if (numBomb == "" || numBomb == "") {
    alert("ERRORE: devi inserire tutti i dati per giocare!!!");
  } else if (numBombInt > numBoxInt) {
    alert("ERRORE: le bombe devono essere minori dei box");
  } else if (numBoxInt >= numBombInt) {
    if (numBombInt < 10) {
      alert("ERRORE: il numero di bombe deve essere maggiore di 10!!");
    } else if (numBoxInt < 20) {
      alert("ERROR:devi inserire almeno 20 box");
    } else if (numBoxInt > 100) {
      alert("ERRORE: il limite di box è 100");
    } else {
      //radice quandrata
      let radiceQuadrata = Math.sqrt(numBoxInt);

      // approssima per eccesso e per difetto
      let numR = Math.floor(radiceQuadrata);
      let numC = Math.ceil(radiceQuadrata);
      let verifica;

      //stampa in console numbomb e numbox
      console.log("hai inserito ", numBoxInt, " box");
      console.log("hai inserito ", numBombInt, " bomb");

      // elimina i box
      const wrapperMain = document.getElementById("containerMain");
      wrapperMain.innerText = "";

      // mette ro score a 0
      numScore = 0;
      score.innerText = 0;

      // creo matrice
      creaGrigliahtml(numR, numC, verifica, numBoxInt);
      grid(numR, numC, numBomb);

      //stopppo il timer
      clearInterval(intervallo);
      secondi = 0;
      timer.textContent = secondi;
      isTimerCalled = false;
      let newLvl;

      newLvl = { name: "custom" };

      let cercaNome = allLevels.find((allLevels) => allLevels.name == "custom");

      if (!cercaNome) {
        newLvl.nBox = numBoxInt;
        newLvl.bomb = numBombInt;
        newLvl.colonne = numC;
        newLvl.righe = numR;
        allLevels.push(newLvl);
        console.log(allLevels);
    
      } else {
 
        const livelloDaAggiornare = allLevels.find(
          (livello) => livello.name === "custom"
        );

        // Controlliamo se l'oggetto è stato trovato
        if (livelloDaAggiornare) {
          // Aggiorna l'array
          livelloDaAggiornare.nBox = numBoxInt;
          livelloDaAggiornare.bomb = numBombInt;
          livelloDaAggiornare.colonne = numC;
          livelloDaAggiornare.righe = numR;
          console.log("Livello esistente aggiornato:", allLevels); 
        } 
        
      }
      creoDropDown();

      //ricarica il livello se perdi
      function reloadLevelCastom(numR, numC, verifica, numBoxInt, numBombInt) {
        const wrapper = document.getElementById("containerMain");
        wrapper.innerText = "";
        creaGrigliahtml(numR, numC, verifica, numBoxInt);
        grid(numR, numC, numBombInt);
      }
      btnPlay.addEventListener("click", ()=>{
      
      })
      

      // aggiorna bomb e difficulty
      document.getElementById("numBomb").innerText = numBomb;

      // Resetta il form
      dati.reset();
      toggle.classList.remove("show");
    
    }
  
  }

});


//animazione chiusura menu option
optionMenu.addEventListener("click", () => {
  if (!toggle.classList.contains("show")) {
    toggle.classList.add("show");

    const fadeOutAnimation = toggle.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 200,
    });
    fadeOutAnimation.onfinish = () => {
      toggle.classList.remove("show");
    };
  }
});
