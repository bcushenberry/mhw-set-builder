import { getSkills } from "./SkillList.mjs";
import { getArmorList, displayMatchingArmor, armorList } from "./ArmorList.mjs";

import { displayBuild } from "./BuildList.mjs";

document.onload = displayBuild();

document.getElementById("skillsList").addEventListener("change", () => {
  displayMatchingArmor(armorList);
});

getSkills();
getArmorList();
