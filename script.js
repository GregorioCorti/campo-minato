// // post dei dati
// function PostData() {
//   const axios = require("axios");
//   const https = require("https");

//   const agent = new https.Agent({
//     rejectUnauthorized: false, //ignora il certificato autofirmato
//   });

//   const user = {
//     name: "name1",
//     age: 50,
//     win: false,
//     level: 2,
//   };

//   axios.post("https://localhost:7197/api/Games", user, { httpsAgent: agent });
// }

// // get dei dati
// function GetData() {
//   const axios = require("axios");
//   const https = require("https");

//   const agent = new https.Agent({
//     rejectUnauthorized: false,
//   });

//}

//prebde i dati in input
let porva = false;
const dati1 = document.querySelectorAll(".Dati1");
const data = {};

dati1.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name1 = formData.get("nameuser");
    const age1 = formData.get("ageuser");
    // verifiche da fare
    if (age1 >= 100) {
      alert("Errore: inserire in'età valida");
      return;
    }

    let boxName = document.querySelectorAll(".name");
    console.log(name1, " ", age1);

    // seleziono i dati
    data.name = name1;
    data.age = age1;
    // data.level = numLevel;
    data.level = numLevel;

    //chiamo il server
    axios
      .post("https://localhost:7197/api/Games", data)

      .then(function (response) {
        console.log("Dati inviati con successo:", response.data);
        alert("Dati inviati!");
        porva = true;
      })
      .catch(function (error) {
        console.error("Errore nell'invio dei dati:", error);
        alert("Errore: inseire tuttii dati");
        porva = false;
      });

    //svuoto casella input

    let boxAge = document.querySelectorAll(".age");
    boxName.forEach((box) => (box.value = ""));
    boxAge.forEach((box) => (box.value = ""));
  });
});

btnPlay.addEventListener("click", () => {
  if (porva == true) {
    losePage.classList.remove("show");
    porva = false;
    imgTop.classList.remove("dispNon");
  } else {
    alert("ERRORE: inserire i dati prima di giocare ancora.");
    losePage.classList.add("show");
  }
});

btnWin.addEventListener("click", () => {
  table();
});
btnWin.addEventListener("click", () => {
  if (porva == true) {
    winPage.classList.remove("show");
    porva = false;
    imgTop.classList.remove("dispNon");
  } else {
    alert("ERRORE: inserire i dati prima di giocare ancora.");
    winPage.classList.add("show");
  }
});

//crea DropDown
let txtdw = [
  { name: "Top 5" },
  { name: "elenco giocatori" },
  { name: "elenco partite" },
];

for (let i = 0; i < txtdw.length; i++) {
  const DWELEMENT = document.getElementById("dw");
  const DWELE = document.createElement("div");
  DWELE.classList.add("dw_Element");
  DWELE.setAttribute("data-table", txtdw[i].name); //mette l'attributo
  DWELE.innerHTML = txtdw[i].name;
  DWELEMENT.appendChild(DWELE);
}

const tableWrapper = document.getElementById("table-wrapper");
const pannello = document.getElementById("pannello");
const imgTop = document.getElementById("img-top");
const DWELEMENT = document.getElementById("dw");

// metto show la tabella
imgTop.addEventListener("click", () => {
  DWELEMENT.classList.toggle("show");
  pannello.classList.toggle("show");

  if (!DWELEMENT.classList.contains("show")) {
    pannello.classList.remove("show");
    tableWrapper.classList.remove("show");
  }
});

// // metto show la tabella
DWELEMENT.addEventListener("click", () => {
  pannello.classList.toggle("show");
  tableWrapper.classList.toggle("show");
});

const elementt = document.querySelectorAll(".dw_Element");

elementt.forEach((SingleElement) => {
  SingleElement.addEventListener("click", () => {
    pannello.classList.toggle("show");
  });
});

let PrimoElemento = elementt[0];
PrimoElemento.addEventListener("click", () => {
  axios.get("https://localhost:7197/api/Players/besttop5").then((response) => {
    console.log(response.data);
    let elementTop = [
      { name: "id" },
      { name: "top" },
      { name: "player" },
      { name: "totWin" },
    ];

    const Table = document.getElementById("tabella");
    Table.innerHTML = "";
    const trn1 = document.createElement("tr");
    Table.appendChild(trn1);

    for (let i = 0; i < elementTop.length; i++) {
      let th = document.createElement("th");
      th.innerText = elementTop[i].name;
      trn1.appendChild(th);
    }

    for (let d = 0; d < response.data.length; d++) {
      const trn2 = document.createElement("tr");
      trn2.classList.add("column");

      Table.appendChild(trn2);
      let td0 = document.createElement("td");
      trn2.appendChild(td0);

      td0.innerHTML = response.data[d].id;

      // aggiugne la top
      let td = document.createElement("td");
      td.classList.add("fontt");
      trn2.appendChild(td);
      let topp = response.data[d].top;
      td.innerHTML = topp;

      // aggiugne il nome
      let td1 = document.createElement("td");
      td.classList.add("fontt");
      trn2.appendChild(td1);
      let nameTable = response.data[d].name;
      td1.innerHTML = nameTable;

      // aggiugne il nome
      let td2 = document.createElement("td");
      td.classList.add("fontt");
      trn2.appendChild(td2);
      let totWin = response.data[d].totWin;
      td2.innerHTML = totWin;
    }
  });
});

let SecElemento = elementt[1];
SecElemento.addEventListener("click", () => {
  axios.get("https://localhost:7197/api/Players").then((response) => {
    console.log(response.data);

    let elementTop = [
      { name: "id" },
      { name: "player" },
      { name: "age" },
      { name: "Win" },
      { name: "Fail" },
      { name: "ScoreFail" },
      { name: "Scorewin" },
      { name: "TimeFail" },
      { name: "TimeWin" },
    ];

    const Table = document.getElementById("tabella");
    Table.innerHTML = "";
    const trn1 = document.createElement("tr");
    Table.appendChild(trn1);

    for (let i = 0; i < elementTop.length; i++) {
      let th = document.createElement("th");
      th.innerText = elementTop[i].name;
      trn1.appendChild(th);
    }

    for (let d = 0; d < response.data.length; d++) {
      const trn2 = document.createElement("tr");
      trn2.classList.add("column");

      Table.appendChild(trn2);
      let td0 = document.createElement("td");
      trn2.appendChild(td0);

      td0.innerHTML = response.data[d].id;

      // aggiugne il nome
      let td1 = document.createElement("td");
      td1.classList.add("fontt");
      trn2.appendChild(td1);
      let nameTable = response.data[d].name;
      td1.innerHTML = nameTable;

      // aggiugne la top
      let td = document.createElement("td");
      td.classList.add("fontt");
      trn2.appendChild(td);
      let agetab = response.data[d].age;
      td.innerHTML = agetab;

      // aggiugne tot win
      let td2 = document.createElement("td");
      td.classList.add("fontt");
      trn2.appendChild(td2);
      let totWin = response.data[d].totWin;
      td2.innerHTML = totWin;

      // aggiugne totfail
      let td3 = document.createElement("td");
      td3.classList.add("fontt");
      trn2.appendChild(td3);
      let totFail = response.data[d].totFail;
      td3.innerHTML = totFail;

      // aggiugne totScoreFail
      let td4 = document.createElement("td");
      td4.classList.add("fontt");
      trn2.appendChild(td4);
      let totScoreFail = response.data[d].totScoreFail;
      td4.innerHTML = totScoreFail;

      // aggiugne totScoreWin
      let td5 = document.createElement("td");
      td5.classList.add("fontt");
      trn2.appendChild(td5);
      let totScoreWin = response.data[d].totScoreWin;
      td5.innerHTML = totScoreWin;

      // aggiugne totScoreWin
      let td6 = document.createElement("td");
      td6.classList.add("fontt");
      trn2.appendChild(td6);
      let totTimeFail = response.data[d].totTimeFail;
      td6.innerHTML = totTimeFail;

      // aggiugne totScoreWin
      let td7 = document.createElement("td");
      td7.classList.add("fontt");
      trn2.appendChild(td7);
      let totTimeWin = response.data[d].totTimeWin;
      td7.innerHTML = totTimeWin;
    }
  });
});

let TerzElemento = elementt[2];
TerzElemento.addEventListener("click", () => {
  axios.get("https://localhost:7197/api/Games").then((response) => {
    console.log(response.data);
    let tablearc = [
      { name: "id" },
      { name: "Player" },
      { name: "Age" },
      { name: "Level" },
      { name: "win" },
      { name: "Date" },
      { name: "Score" },
      { name: "time" },
    ];

    const Table = document.getElementById("tabella");
    Table.innerHTML = "";

    const trn1 = document.createElement("tr");
    Table.appendChild(trn1);

    for (let i = 0; i < tablearc.length; i++) {
      let th = document.createElement("th");
      th.innerText = tablearc[i].name;
      trn1.appendChild(th);
    }
    for (let d = 0; d < response.data.length; d++) {
      const trn2 = document.createElement("tr");
      trn2.classList.add("column");

      Table.appendChild(trn2);
      let td0 = document.createElement("td");
      trn2.appendChild(td0);

      td0.innerHTML = response.data[d].id;

      // aggiugne il nome
      let td = document.createElement("td");
      td.classList.add("fontt");
      trn2.appendChild(td);
      let nameTable = response.data[d].player.name;
      let nameTable2 = response.data[d].player.name;
      td.innerHTML = nameTable;

      //aggiune l'età
      let td2 = document.createElement("td");
      td2.classList.add("fontt");
      trn2.appendChild(td2);
      let ageTable = response.data[d].player.age;
      td2.innerHTML = ageTable;

      //agiunge il livello
      let td3 = document.createElement("td");
      trn2.appendChild(td3);
      td3.classList.add("fontt");
      let levelTable = response.data[d].levels.levels;
      td3.innerHTML = levelTable;

      //aggiunge le win
      let td4 = document.createElement("td");
      td4.classList.add("fontt");
      trn2.appendChild(td4);
      let winTable = response.data[d].successed;
      if (winTable == false) {
        td4.innerHTML = "lose";
      } else {
        td4.innerHTML = "win";
      }

      // mette la data
      let td5 = document.createElement("td");
      trn2.appendChild(td5);
      td5.classList.add("fontt");
      let dateTable = response.data[d].date;
      const trueData = new Date(dateTable);
      const formatted = trueData.toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      td5.innerHTML = formatted;

      // metto lo score
      let td6 = document.createElement("td");
      td6.classList.add("fontt");
      trn2.appendChild(td6);
      let scoreTable = response.data[d].score;
      td6.innerHTML = scoreTable;

      // stampa il tempo
      let td7 = document.createElement("td");
      td7.classList.add("fontt");
      trn2.appendChild(td7);
      let timeTable = response.data[d].time;
      td7.innerHTML = timeTable + " sec.";
    }
  });
});
