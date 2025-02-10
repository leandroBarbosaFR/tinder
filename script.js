const politicians = [];
let voterKeywords = [];
let matchedPoliticians = [];
let userRole = "";

// Random politician images
const randomImages = [
  "https://source.unsplash.com/300x300/?business",
  "https://source.unsplash.com/300x300/?person",
  "https://source.unsplash.com/300x300/?leader",
];

// Show signup options
function showSignupOptions() {
  document.getElementById("role-selection").style.display = "block";
  document.getElementById("form-container").style.display = "none";
  document.getElementById("swipe-container").style.display = "none";
}

// Handle signup button clicks
document.getElementById("signup-voter").addEventListener("click", () => {
  userRole = "voter";
  document.getElementById("role-selection").style.display = "none";
  document.getElementById("form-container").style.display = "block";
});

document.getElementById("signup-politician").addEventListener("click", () => {
  userRole = "politician";
  document.getElementById("role-selection").style.display = "none";
  document.getElementById("form-container").style.display = "block";
});

// Handle form submission
document.getElementById("profile-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const keywords = description.toLowerCase().split(/\s+/).filter(word => word.length > 3);

  if (userRole === "politician") {
    politicians.push({ name, description, keywords });
    alert(`Politician ${name} added!`);
    showSignupOptions();  // Reset to signup screen after adding a politician
  } else {
    voterKeywords = keywords;
    matchedPoliticians = [];
    document.getElementById("form-container").style.display = "none";
    document.getElementById("swipe-container").style.display = "block";
    generatePoliticianCards();
  }
});

// Generate politician cards
function generatePoliticianCards() {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  politicians.forEach((politician, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${randomImages[index % randomImages.length]}" alt="Politician">
      <h3>${politician.name}</h3>
      <p>${politician.description}</p>
    `;
    card.dataset.index = index;
    container.appendChild(card);
    setupSwipe(card, politician);
  });
}

// Swipe functionality
function setupSwipe(card, politician) {
  let startX = 0, isDragging = false;

  card.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const moveX = e.clientX - startX;
    card.style.transform = `translateX(${moveX}px) rotate(${moveX / 10}deg)`;
  });

  document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.clientX;

    if (endX - startX > 100) {
      if (politician.keywords.some(keyword => voterKeywords.includes(keyword))) {
        matchedPoliticians.push(politician.name);
        alert(`✅ Matched with ${politician.name}!`);
      }
      card.classList.add("swipe-right");
    } else if (endX - startX < -100) {
      card.classList.add("swipe-left");
    } else {
      card.style.transform = "";
    }
  });
}
