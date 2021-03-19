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
