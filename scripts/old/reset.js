const armorListElement = document.getElementById("armorList");
export const messageElement = document.getElementById("message");

/* Create a function that resets the armor list and message */
export const reset = function () {
    armorListElement.innerHTML = "";
    messageElement.textContent = "";
};