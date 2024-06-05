import { skillsList  } from "./SkillList.mjs"
import { selectedRank } from "./RadioValue.mjs"
import { createAddButton, createRemoveButton } from "./EditBuild.mjs";
import { armorListElement, resetArmorList, showLoadingIndicator, hideLoadingIndicator } from "./Utils.mjs";

export const rankElement = document.getElementById("rank")
export let armorList = [];

/* ========== API Call ========== */

// Use "p" to specify which fields to grab from the API
const armorURL = new URL("https://mhw-db.com/armor");
armorURL.searchParams.set("p", JSON.stringify({
        type: true,
        rank: true,
        rarity: true,
        defense: true,
//        resistances: true, <-- may be used later
        name: true,
        slots: true,
        skills: true,
//        armorSet: true, <-- may be used later
//        crafting: true, <-- may be used later
}));

export const getArmorList = async () => {
    showLoadingIndicator();
    try {
        const response = await fetch(armorURL);
        armorList = await response.json();
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load armor list:", error);        
    }
    finally {
        hideLoadingIndicator();
    }
};

/* ========== Armor List Display - All ========== */

// A function to display all the armor pieces and their skills
export const displayArmorList = (armors) => {
    armors.forEach((armor) => {
        if (selectedRank === armor.rank) {
            let armorPiece = document.createElement("dt");
            let armorSkills = document.createElement("dd");
            let armorButtons = document.createElement("div");

            armorPiece.textContent = armor.name;
            armorButtons.setAttribute("class", "armor-buttons");

            // Create a skill list for each armor piece & populate it
            armor.skills.forEach((skill) => {
                let armorSkillsList = document.createElement("li");
        
                // Check for multiple skillName objects in a skill array. If so, add them all to the skill list
                if (Array.isArray(skill.skillName)) {
                    skill.skillName.forEach((name, index) => {
                        let skillLevel = skill.level[index];
                        armorSkillsList.value = name;                
                        armorSkillsList.textContent = `${name} Lv. ${skillLevel}`;
                        armorSkills.appendChild(armorSkillsList);
                    });
                } 
                
                // Otherwise, just add the skill name to the list
                else {
                    armorSkillsList.value = skill.skillName;
                    armorSkillsList.textContent = `${skill.skillName} Lv. ${skill.level}`;
                    armorSkills.appendChild(armorSkillsList);
                }
            });
        
            // Add all the armor pieces and their skill lists to the armor list
            armorButtons.append(createRemoveButton(armor.type), createAddButton(armor.type, [armor.name, armor.skills]))
            armorListElement.append(armorButtons, armorPiece, armorSkills);
        }
    }
)};

/* ========== Armor List Display - Filtered ========== */

// Display any armor piece that matches the skill selected in the drop-down menu.
export const displayMatchingArmor = (matchingArmor) => {
    resetArmorList();

    let filter = document.getElementById("skillsList").value;

    /* Message when there's nothing with the selected skill. */
    let noMatchMessage = document.createElement("p");
    noMatchMessage.innerHTML = `<br>There are no pieces in this rank with that skill.`;

    // Create a filterArmor object to store filters (rather than using a giant switch statement or list)
    let filterArmor = {};

    // Loop through each skill in the skill list to create & store filters in filterArmor
    skillsList.forEach((skill) => {
        filterArmor[skill.name] = (armors) => {
            displayArmorList(armors.filter(armor => armor.skills.some(s => s.skillName === skill.name)));
        };
    });
    
    // Check to see if the current skillList.value matches a filter. If so, display all armor pieces in that filter
    if (filterArmor[filter]) {
        filterArmor[filter](matchingArmor);
        // Display message if no matches
        if (armorListElement.children.length === 0) {
            armorListElement.appendChild(noMatchMessage);
        }
    }
    
    else if (filter === "all"){
        displayArmorList(matchingArmor);
    }

    else {
        resetArmorList();
    } 
};