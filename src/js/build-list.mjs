import { getLocalStorage, setLocalStorage } from "./edit-build.mjs";  

// Display the build stored in localStorage
export const displayBuild = () => {
    const armorSlots = ["head", "chest", "gloves", "waist", "legs"];

    armorSlots.forEach(slot => {
        const slotData = getLocalStorage(slot);
        const slotElement = document.getElementById(slot);
        const armorNameElement = slotElement.querySelector(".armor-name");
        const armorSkillsElement = slotElement.querySelector(".armor-skills");
    
        // Clear previous content in armor details
        armorNameElement.textContent = "";
        armorSkillsElement.textContent = "";
    
        if (slotData && slotData.length > 0) {
            armorNameElement.textContent = slotData[0];
            slotData[1].forEach(skill => {
                armorSkillsElement.textContent = `${skill.skillName} Lv. ${skill.level}`;
            });

        } else {
            armorSkillsElement.textContent = `(Nothing added yet)`;
        }
    });
};

// Update a specific armor piece in localStorage
export const updateBuild = (key, data) => {
    setLocalStorage(key, data);
    displayBuild();
};