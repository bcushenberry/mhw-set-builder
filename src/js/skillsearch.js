import { getSkills } from "./SkillList.mjs";
import { getArmorList, displayMatchingArmor, armorList, rankElement } from "./ArmorList.mjs";

document.getElementById("skillsList").addEventListener("change", () => {
    displayMatchingArmor(armorList);
});

getSkills();
getArmorList();