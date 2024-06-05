export const armorListElement = document.getElementById("armorList");
const loadingIndicator = document.getElementById("loadingIndicator");

/* ========== Supplementary Functions ========== */
export function resetArmorList() {
    armorListElement.innerHTML = "";
}

export function showLoadingIndicator() {
    loadingIndicator.style.display = "block";
};

export function hideLoadingIndicator() {
    loadingIndicator.style.display = "none";
};