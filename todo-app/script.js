const form = document.querySelector(".app__add-item__form"),
  inputText = document.querySelector('input[type="text"]'),
  list = document.querySelector(".app__main__list"),
  deleteItemBtn = document.querySelector(".list__item__delete"),
  listOptions = document.querySelector(".list__options"),
  filters = document.querySelector(".app__filters"),
  clearCompletedBtn = document.querySelector(".main__list__clear"),
  filterBtns = document.querySelectorAll(".app__filters__button");

let id = 0,
  listItemsCounter = 0;

//adds a new list item to the main app list and updates the listItemscounter
function addListItem(e) {
  e.preventDefault();
  const newItemText = inputText.value;
  if (newItemText == "") return;
  const newListItem = document.createElement("li");
  newListItem.classList.add("main__list__item", "active");
  newListItem.setAttribute("draggable", true);
  newListItem.innerHTML = `
  <label for="checkbox-${id}" class="custom-checkbox">
    <input type="checkbox" name="checkbox-${id}" id="checkbox-${id}" />
    <span class="custom-checkmark">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
        <path
          fill="none"
          stroke="#FFF"
          stroke-width="2"
          d="M1 4.304L3.696 7l6-6"
        />
      </svg>
    </span>
    <span class="list__item__text">${newItemText}</span>
  </label>
  <button class="list__item__delete">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
      <path
        fill="#494C6B"
        fill-rule="evenodd"
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      />
    </svg>
  </button>
`;
  newListItem.addEventListener("dragstart", dragStart);
  newListItem.addEventListener("dragend", dragEnd);

  list.appendChild(newListItem);
  inputText.value = "";
  id += 1;
  listItemsCounter += 1;

  setListOptionsCounter();
}

//updates the listItemCounter according to deleting/adding/completing a task.
//displays the list options and list filters only when there are list items.
function setListOptionsCounter() {
  const listOptionsCounter = listOptions.querySelector(".main__list__counter");
  listOptionsCounter.innerText = `${listItemsCounter} items left`;
  if (listItemsCounter > 0) {
    [filters, listOptions].forEach((ele) =>
      ele.classList.contains("show") ? "" : ele.classList.add("show")
    );
  } else if (listItemsCounter === 0 && getAllListItems().length === 0) {
    [filters, listOptions].forEach((ele) => ele.classList.remove("show"));
  }
}

//deletes list item and updates the listItemsCounter
function deleteListItem(e) {
  if (e.target.classList.contains("list__item__delete")) {
    const listItem = e.target.parentElement;
    if (!listItem.classList.contains("completed")) {
      listItemsCounter -= 1;
    }
    list.removeChild(listItem);
    setListOptionsCounter();
  }
}

//gets all the items in the main app list
function getAllListItems() {
  return [...list.querySelectorAll(".main__list__item")];
}

//gets only the 'completed'(inactive) items in the main app list
function getCompletedItems() {
  const checkedItems = [...list.querySelectorAll(".completed")];
  return checkedItems;
}

//gets only the 'active'(uncompleted) items in the main app list
function getActiveItems() {
  const activeItems = [...list.querySelectorAll(".active")];
  return activeItems;
}

//deletes only the completed list items and updates the listItemsCounter
function clearCompletedItems() {
  const checkedItems = getCompletedItems();
  if (checkedItems.length !== getAllListItems().length) {
    [...filterBtns][0].click();
  }
  checkedItems.forEach((item) => list.removeChild(item));
  setListOptionsCounter();
}

//adds a class of 'completed' to the list item
function setCompleted(e) {
  const target = e.target;
  const listItem = target.parentElement.parentElement;
  listItem.classList.toggle("completed");
  listItem.classList.toggle("active");
  listItem.classList.contains("completed")
    ? (listItemsCounter -= 1)
    : (listItemsCounter += 1);
  setListOptionsCounter();
}

//filters the visibility of the list items according to the pressed button: all/completed/active.
function filterList() {
  let itemsToShow, itemsToHide;
  filterBtns.forEach((btn) => btn.classList.remove("filter-selected"));
  this.classList.add("filter-selected");
  if (this.classList.contains("btn--all")) {
    itemsToShow = getAllListItems();
    itemsToShow.forEach((item) => item.classList.remove("hide"));
  } else if (this.classList.contains("btn--active")) {
    itemsToShow = getActiveItems();
    if (itemsToShow.length === 0) {
      //there are 0 active list items
      [...filterBtns][0].click();
    } else {
      itemsToShow.forEach((item) => item.classList.remove("hide"));
      itemsToHide = getCompletedItems();
      itemsToHide.forEach((item) => item.classList.add("hide"));
    }
  } else {
    itemsToShow = getCompletedItems();
    if (itemsToShow.length === 0) {
      //there are 0 completed list items
      [...filterBtns][0].click();
    } else {
      itemsToShow.forEach((item) => item.classList.remove("hide"));
      itemsToHide = getActiveItems();
      itemsToHide.forEach((item) => item.classList.add("hide"));
    }
  }
}

// =============================================
// =            drag and drop features            =
// =============================================
let dragElement;
function dragStart(e) {
  dragElement = this;
  this.classList.add("dragging");
}
function dragEnd(e) {
  this.classList.remove("dragging");
}
function dragOver(e) {
  e.preventDefault();
  const dropBeforeElement = getDropPosition(this, e.clientY);
  dropBeforeElement
    ? this.insertBefore(dragElement, dropBeforeElement)
    : this.appendChild(dragElement);
}
//calculating the drop position: getting the element closets to the mouse position and returns it to the dragOver function
function getDropPosition(container, y) {
  const listItems = [...container.querySelectorAll("li:not(dragging)")];
  return listItems.reduce(
    (closets, listItem) => {
      const { top, height } = listItem.getBoundingClientRect();
      const offset = y - top - height / 2;

      if (offset < 0 && offset > closets.offset) {
        return { offset: offset, element: listItem };
      } else {
        return closets;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
//event listeners
form.addEventListener("submit", addListItem);
list.addEventListener("click", deleteListItem);
clearCompletedBtn.addEventListener("click", clearCompletedItems);
filterBtns.forEach((btn) => btn.addEventListener("click", filterList));
list.addEventListener("change", setCompleted);

//drag and drop events
list.addEventListener("dragover", dragOver);
