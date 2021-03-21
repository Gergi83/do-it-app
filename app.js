const cc = console.log;

// define UI vars
const form = document.querySelector("#item-form");
const doItList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-do-it-list");
const filter = document.querySelector("#filter");
const doItInput = document.querySelector("#do-it-item");

// load event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getDoItList);
  // add do-it event
  form.addEventListener("submit", addDoIt);
  // remove do-it event
  doItList.addEventListener("click", removeDoIt);
  // clear do-it event
  clearBtn.addEventListener("click", clearDoItList);
  // filter do-it events
  filter.addEventListener("keyup", filterDoItList);
}

// get do-it list from local storage
function getDoItList() {
  let doIts;
  if (localStorage.getItem("doIts") === null) {
    doIts = [];
  } else {
    doIts = JSON.parse(localStorage.getItem("doIts"));
  }
  doIts.forEach(function (doIt) {
    // create li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // create text node and append it to li
    li.appendChild(document.createTextNode(doIt));
    // create new link element
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    // append li to ul
    doItList.appendChild(li);
  });
}

// add do-it
function addDoIt(e) {
  if (doItInput.value === "") {
    alert("Add what needs to be done");
  }

  // create li element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  // create text node and append it to li
  li.appendChild(document.createTextNode(doItInput.value));
  // create new link element
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);
  // append li to ul
  doItList.appendChild(li);
  // store in local storage
  storeDoItInLocalStorage(doItInput.value);
  // clear input
  doItInput.value = "";

  e.preventDefault();
}

// store do-it in local storage
function storeDoItInLocalStorage(doIt) {
  let doIts;
  if (localStorage.getItem("doIts") === null) {
    doIts = [];
  } else {
    doIts = JSON.parse(localStorage.getItem("doIts"));
  }
  doIts.push(doIt);
  localStorage.setItem("doIts", JSON.stringify(doIts));
}

// remove do-it
function removeDoIt(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      // remove do-it form local storage
      removeDoItFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove do-it form local storage
function removeDoItFromLocalStorage(doItItem) {
  let doIts;
  if (localStorage.getItem("doIts") === null) {
    doIts = [];
  } else {
    doIts = JSON.parse(localStorage.getItem("doIts"));
  }
  doIts.forEach(function (doIt, index) {
    if (doItItem.textContent === doIt) {
      doIts.splice(index, 1);
    }
  });
  localStorage.setItem("doIts", JSON.stringify(doIts));
}

// clear do-it list
function clearDoItList() {
  while (doItList.firstChild) {
    doItList.removeChild(doItList.firstChild);
  }
  // clear do-it list from local storage
  clearDoItsFromLocalStorage();
}

// clear do-it list from local storage
function clearDoItsFromLocalStorage() {
  localStorage.clear();
}

// filter do-it list
function filterDoItList(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (doIt) {
    const item = doIt.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      doIt.style.display = "block";
    } else {
      doIt.style.display = "none";
    }
  });
}
