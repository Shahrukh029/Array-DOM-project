const main = document.getElementById("main");
const addUsrBtn = document.getElementById("add-user");

const doubleBtn = document.getElementById("add-marks");

const showToppers = document.getElementById("show-toppers");

const sortBtn = document.getElementById("sort");

const calculateAvgBtn = document.getElementById("calculate-avg");

const table = document.querySelector("table");
let data = [];

async function getRandomStudent() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    marks: Math.floor(Math.random() * 100),
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateUI();
}
function addExtraMarks() {
  data = data.map((student) => {
    return { ...student, marks: student.marks + 5 };
  });
  updateUI();
}

function sortByHighest() {
  data.sort((student, tempStudent) => {
    if (student.marks > tempStudent.marks) {
      return -1;
    } else if (student.marks < tempStudent.marks) {
      return 1;
    }
  });
  updateUI();
}
function showMarksAbove() {
  var limit = parseInt(prompt("Enter the Marks"));
  data = data.filter((student) => {
    if (student.marks >= limit) {
      return { ...student };
    }
  });
  updateUI();
}

function calculateTotalMarks() {
  const total = data.reduce((sum, student) => (sum += student.marks), 0);
  const h3 = document.createElement("h3");
  h3.innerHTML = `<h3>Total Marks <strong>${total}</strong></h3 >`;

  main.appendChild(h3);
}
function updateUI(studentData = data) {
  const tableBody = document.getElementById("tableData");
  let datahtml = "";
  for (let student of studentData) {
    datahtml += `<tr><td>${student.name}</td><td>${student.marks}</td></tr>`;
  }
  console.log(datahtml);

  tableBody.innerHTML = datahtml;
}

addUsrBtn.addEventListener("click", getRandomStudent);

doubleBtn.addEventListener("click", addExtraMarks);

sortBtn.addEventListener("click", sortByHighest);
showToppers.addEventListener("click", showMarksAbove);

calculateAvgBtn.addEventListener("click", calculateTotalMarks);
