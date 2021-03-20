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
  // add do-it event
  form.addEventListener("submit", addDoIt);
  // remove do-it event
  doItList.addEventListener("click", removeDoIt);
  // clear do-it event
  clearBtn.addEventListener("click", clearDoItList);
  // filter do-it events
  filter.addEventListener("keyup", filterDoItList);
}

// add do it
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
  // clear input
  doItInput.value = "";

  e.preventDefault();
}

// remove do-it
function removeDoIt(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearDoItList() {
  while (doItList.firstChild) {
    doItList.removeChild(doItList.firstChild);
  }
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
