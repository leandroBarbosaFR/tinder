
const seedDB = {
  politicians: [
    { name: "Alice", description: "Focus on education and healthcare", keywords: ["education", "healthcare"] },
    { name: "Bob", description: "Improving infrastructure and jobs", keywords: ["infrastructure", "jobs"] }
  ],
  voters: []
};

document.getElementById('profile-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const role = document.getElementById('role').value;
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  // Generate keywords from description (simple split logic for demo)
  const keywords = description.toLowerCase().split(/\s+/).filter(word => word.length > 3);

  if (role === "politician") {
    seedDB.politicians.push({ name, description, keywords });
  } else if (role === "voter") {
    const voter = { name, description, keywords };
    seedDB.voters.push(voter);

    // Find matches for the voter
    const matches = seedDB.politicians.filter(politician =>
      politician.keywords.some(keyword => voter.keywords.includes(keyword))
    );

    // Display matches
    const matchesContainer = document.getElementById('matches-container');
    const matchesList = document.getElementById('matches-list');
    matchesList.innerHTML = "";

    if (matches.length > 0) {
      matches.forEach(match => {
        const li = document.createElement('li');
        li.textContent = `Match: ${match.name} - ${match.description}`;
        matchesList.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = "No matches found.";
      matchesList.appendChild(li);
    }

    matchesContainer.style.display = "block";
  }

  // Reset the form
  e.target.reset();
});
