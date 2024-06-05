const skillsListElement = document.getElementById("skillsList");
export let skillsList = [];

/* ========== API Call ========== */

// Use "p" to specify which fields to grab from the API
const skillUrl = new URL("https://mhw-db.com/skills");
skillUrl.searchParams.set("p", JSON.stringify({
    name: true,
}));

// Get a list of all skills from the API using an async function
export const getSkills = async () => {
    try {
        const response = await fetch(skillUrl);
        skillsList = await response.json();
        displaySkills(skillsList);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load skill list:", error);        
    }
};

/* ========== Drop-down Menu ========== */

// Add each skill name to the pull-down menu
const displaySkills = (skills) => {
    skills.forEach((skill) =>
    {
        let listOption = document.createElement("option");
        listOption.value = skill.name;
        listOption.textContent = skill.name;
        skillsListElement.appendChild(listOption);        
    });
};