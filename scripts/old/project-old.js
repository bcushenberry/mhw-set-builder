/* Import global variables and the reset function */
import { skillsListElement, messageElement } from "./project-elements.js"
import { reset } from "./reset.js"

let skillsList = [];
let armorList = [];

/* ========== API Calls ========== */

/* Get a list of all skills from the API using an async function */
const getSkills = async () => {
    const response = await fetch("https://mhw-db.com/skills");
    skillsList = await response.json();
    displaySkills(skillsList);    
};

/* Get a list of all armor pieces from the API using an async function */
const getArmorList = async () => {
    const response = await fetch("https://mhw-db.com/armor");
    armorList = await response.json();
};

/* ========== Drop-down Menu ========== */

/* Add each skill name to the pull-down menu */
const displaySkills = (skills) => {
    skills.forEach((skill) =>
    {
        let listOption = document.createElement("option");
        listOption.value = skill.name;
        listOption.textContent = skill.name;
        skillsListElement.appendChild(listOption);        
    });
};

/* ========== Armor List ========== */

/* A function to display all the armor pieces and their skills */
const displayArmorList = function (armors){
    armors.forEach((armor) => {
    let armorPiece = document.createElement("dt");
    let armorSkills = document.createElement("dd");

    armorPiece.textContent = armor.name;

    /* Since a single armor piece can have multiple skills, we need to create a list for each piece and add its skills to it. */
    armor.skills.forEach((skill) => {
        let armorSkillsList = document.createElement("li");

        /* We need to check if there are multiple skillName objects in the skills array (i.e. if  skillName itself is an array) and if so, add all skills to the list */ 
        if (Array.isArray(skill.skillName)) 
        {
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
    document.querySelector('#armorList').append(armorPiece);
    document.querySelector('#armorList').append(armorSkills);
});
};

/* ========== Armor List Filtering ========== */

/* Display any armor piece that matches the skill selected in the drop-down menu. */
const displayMatchingArmor = (armors) => {
    reset();

    let filter = document.getElementById("skillsList").value;

    /* To avoid making a huge switch statement or a long list of names and checking each one individually, I've created a filterArmor object to store filters */
    let filterArmor = {};

    /* We then loop through each skill in the skill list to create and store filters in the filterArmor object */
    for (let i = 0; i < skillsList.length; i++) {
        let skillEntry = skillsList[i].name;
        filterArmor[skillEntry] = (armors) => {
            displayArmorList(armors.filter(armor => armor.skills.some(skill => skill.skillName === skillEntry)));
        };
    }
    
    /* Now we check to see if the currently selected skillList.value matches one of our filters, and if it does, the page displays all armor pieces in that filter */
    if (filterArmor[filter]) {
        filterArmor[filter](armors);
        let comment = `Lookin' to add ${filter} to your build, eh? A fine choice!`;
        messageElement.textContent = comment;
    }
    
    else if (filter === "all"){
        displayArmorList(armors);
        messageElement.textContent = `Can't decide, eh? Feel free to browse until you find a skill you want.`;
    }

    /* If there's no match, we clear the armor list. Note that some skills are not featured on any piece of armor - these are obtained in a different way in the game, so it's fine if they're blank here. */
    else {
        reset();
    }
            
};

document.getElementById("skillsList").addEventListener("change", () => {displayMatchingArmor(armorList)});

getSkills();
getArmorList();