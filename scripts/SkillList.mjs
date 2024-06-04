const skillsListElement = document.getElementById("skillsList");
export let skillsList = [];

/* ========== API Call ========== */

const skillUrl = new URL("https://mhw-db.com/skills");
skillUrl.searchParams.set("p", JSON.stringify({
    name: true,
}));

// Get a list of all skills from the API using an async function
export const getSkills = async () => {
    const response = await fetch(skillUrl);
    skillsList = await response.json();
    displaySkills(skillsList);
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