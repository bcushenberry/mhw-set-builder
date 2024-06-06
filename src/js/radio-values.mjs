import { displayMatchingArmor, armorList } from "./armor-list.mjs";

export let selectedRank = "low";

document.getElementById("rank").addEventListener("click", function(selection){
    if (selection.target.type === "radio"){
        selectedRank = selection.target.value;
        displayMatchingArmor(armorList);
    }
});