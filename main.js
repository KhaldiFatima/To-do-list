const addText = document.getElementById("add-text");
const addBtn = document.getElementById("add-btn");
const tasks = document.getElementsByClassName("tasks")[0];
const resetBtn = document.getElementById("rest-btn");
const saveBtn = document.getElementById("save-btn");

let arr = [];

addBtn.onclick = function () {
  if (addText.value !== "") {
    addarr(addText.value);
    addText.value = "";
  }
};

function addarr(text) {
  const task = {
    id: Date.now(),
    title: text,
    check: false,
  };

  arr.push(task);
  tasks.innerHTML = "";
  create(arr);
}

function create(arr) {
  arr.forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("task");
    div.appendChild(document.createTextNode(e.title));
    let button = document.createElement("button");
    button.classList.add("del");
    button.appendChild(document.createTextNode("Delete"));
    // button.innerHTML = `<i class="fa-regular fa-trash-can" style="color: #ff0000;"></i>`;
    div.appendChild(button);
    div.setAttribute("data-id", e.id);
    tasks.appendChild(div);
  });
}

function setLo(arr) {
  window.localStorage.setItem("tasks", JSON.stringify(arr));
}

function getLo() {
  JSON.parse(window.localStorage.getItem("tasks"));
  create(arr);
}

if (localStorage.getItem("tasks")) {
  arr = JSON.parse(localStorage.getItem("tasks"));
  getLo();
  arr.forEach((a) => {
    if (a.check) {
      document.querySelector(`[data-id="${a.id}"]`).className = "task done";
    }
  });
}

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    arr.forEach((a) => {
      if (a.id == e.target.getAttribute("data-id")) {
        a.check === false ? (a.check = true) : (a.check = false);
      }
    });
    setLo(arr);
  }

  if (e.target.classList.contains("del")) {
    arr = arr.filter(
      (a) => a.id != e.target.parentElement.getAttribute("data-id")
    );
    setLo(arr);
    e.target.parentElement.remove();
  }
});

resetBtn.addEventListener("click", function () {
  localStorage.clear();
  tasks.innerHTML = "";
});
