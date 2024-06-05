import { updateBuild } from "./BuildList.mjs";

// TODO: Make the Add/RemoveButton functions more elegant / less redundant
// Create the add button to add an item to your build (localstorage)
export function createAddButton(key, data) {
    let addButton = document.createElement("button");
    addButton.setAttribute("class", "buttons")
    addButton.textContent = " + ";
    addButton.addEventListener("touchend", (event) => {
      event.preventDefault(); 
      setLocalStorage(key, data);
      updateBuild(key, data);
    });

    addButton.addEventListener("click", () => {
      setLocalStorage(key, data)
      updateBuild(key, data);
    });

    return(addButton)
}

// Create the remove button to remove an item from your build (localstorage)
export function createRemoveButton(key) {
    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "buttons")
    removeButton.textContent = " - ";
    removeButton.addEventListener("touchend", (event) => {
      event.preventDefault(); 
      setLocalStorage(key, "");
    });
    
    removeButton.addEventListener("click", () => {
      setLocalStorage(key, "")
      updateBuild(key, [])
    });
    
    return(removeButton)
}

// Get and set localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}