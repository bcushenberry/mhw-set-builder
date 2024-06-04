import { skillsList  } from "./SkillList.mjs"
import { selectedRank } from "./RadioValue.mjs"

// const messageElement = document.getElementById("message");
const armorListElement = document.getElementById("armorList");

export const rankElement = document.getElementById("rank")
export let armorList = [];

/* ========== API Call ========== */

const armorURL = new URL("https://mhw-db.com/armor");
armorURL.searchParams.set("p", JSON.stringify({
        type: true,
        rank: true,
        rarity: true,
        defense: true,
//        resistances: true,
        name: true,
        slots: true,
        skills: true,
//        armorSet: true,
//        crafting: true,
}));


/* Get a list of all armor pieces from the API using an async function */
export const getArmorList = async () => {
    showLoadingIndicator();
    try {
        const response = await fetch(armorURL);
        armorList = await response.json();
    }
    catch (error) {
        console.error("Failed to load armor list:", error);        
    }
    finally {
        hideLoadingIndicator();
    }
};

/* ========== Armor List Display - All ========== */

/* A function to display all the armor pieces and their skills */
const displayArmorList = (armors) => {
    armors.forEach((armor) => {
        if (selectedRank === armor.rank) {
            let armorPiece = document.createElement("dt");
            let armorSkills = document.createElement("dd");

            armorPiece.textContent = armor.name;

            /* Since a single armor piece can have multiple skills, we need to create a list for each piece and add its skills to it. */
            armor.skills.forEach((skill) => {
                let armorSkillsList = document.createElement("li");
        
                /* We need to check if there are multiple skillName objects in the skills array (i.e. if skillName itself is an array) and if so, add all skills to the list */ 
                if (Array.isArray(skill.skillName)) {
                    skill.skillName.forEach((name) => {
                        armorSkillsList.value = name;                
                        armorSkillsList.textContent = name;
                        armorSkills.appendChild(armorSkillsList);
                    });
                } 
                
                /* Otherwise, we just add the skill name to the list */
                else {
                    armorSkillsList.value = skill.skillName;
                    armorSkillsList.textContent = skill.skillName;
                    armorSkills.appendChild(armorSkillsList);
                }
            });
        
            /* Now we add all the armor pieces and their skills to the armor list */
            document.querySelector("#armorList").append(armorPiece);
            document.querySelector("#armorList").append(armorSkills);
    }
});
};

/* ========== Armor List Display - Filtered ========== */

/* Display any armor piece that matches the skill selected in the drop-down menu. */
export const displayMatchingArmor = (armors) => {
    reset();

    let filter = document.getElementById("skillsList").value;

    /* It's better for the user experience if there's a message saying that there's no armor with the skill they selected. */
    let noMatchMessage = document.createElement("p");
    noMatchMessage.innerHTML = `<br>There are no pieces in this rank with that skill.`;

    /* To avoid making a huge switch statement or a long list of names and checking each one individually, I've created a filterArmor object to store filters */
    let filterArmor = {};

    /* We then loop through each skill in the skill list to create and store filters in the filterArmor object */
    skillsList.forEach((skill) => {
        filterArmor[skill.name] = (armors) => {
            displayArmorList(armors.filter(armor => armor.skills.some(s => s.skillName === skill.name)));
        };
    });
    
    /* Now we check to see if the currently selected skillList.value matches one of our filters, and if it does, the page displays all armor pieces in that filter */
    if (filterArmor[filter]) {
        filterArmor[filter](armors);
//        messageElement.textContent = `Lookin' to add ${filter} to your build, eh? A fine choice!`;
        if (armorListElement.children.length === 0) {
            armorListElement.appendChild(noMatchMessage);
        }
    }
    
    else if (filter === "all"){
        displayArmorList(armors);
//        messageElement.textContent = `Can't decide, eh? Feel free to browse until you find a skill you want.`;
    }

    else {
        reset();
    } 
};

/* ========== Supplementary Functions ========== */

function reset() {
    armorListElement.innerHTML = "";
//    messageElement.innerHTML = "";
}

function showLoadingIndicator() {
    loadingIndicator.style.display = 'block';
};

function hideLoadingIndicator() {
    loadingIndicator.style.display = 'none';
};