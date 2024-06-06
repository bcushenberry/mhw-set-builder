import { getSkills } from "./skill-list.mjs";
import { getArmorList, displayMatchingArmor, armorList } from "./armor-list.mjs";

import { displayBuild } from "./build-list.mjs";

document.onload = displayBuild();

document.getElementById("skillsList").addEventListener("change", () => {
  displayMatchingArmor(armorList);
});

getSkills();
getArmorList();
