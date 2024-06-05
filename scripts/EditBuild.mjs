let helm;
let chest;
let arms;
let waist;
let legs;
let charm;

// TODO: Make this more elegant / less redundant
export function createAddButton() {
    let addButton = document.createElement("button");
    addButton.setAttribute("class", "buttons")
    addButton.textContent = " + ";
    return(addButton)
}

export function createRemoveButton() {
    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "buttons")
    removeButton.textContent = " - ";
    return(removeButton)
}

