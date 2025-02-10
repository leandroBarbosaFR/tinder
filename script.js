const politicians = [];
let voterKeywords = [];
let matchedPoliticians = [];
let userRole = "";

// Random politician images
const randomImages = [
  "https://source.unsplash.com/random/300×300",
  "https://source.unsplash.com/random/300×300",
  "https://source.unsplash.com/random/300×300",
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
    // Clear the inputs for the next politician
    document.getElementById("name").value = '';
    document.getElementById("description").value = '';
    showSignupOptions();  // Reset to signup screen after adding a politician
  } else {
    voterKeywords = keywords;
    matchedPoliticians = [];
    document.getElementById("form-container").style.display = "none";
    document.getElementById("swipe-container").style.display = "block";
    generatePoliticianCards();
  }
});

// Generate politician cards randomly
function generatePoliticianCards() {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  // Shuffle politicians to show them randomly
  shufflePoliticians();

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

// Shuffle politicians randomly
function shufflePoliticians() {
  for (let i = politicians.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [politicians[i], politicians[j]] = [politicians[j], politicians[i]]; // Swap
  }
}

// Swipe functionality
function setupSwipe(card, politician) {
  let startX = 0, isDragging = false;

  // Handling mouse down (desktop)
  card.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  // Handling touch start (mobile)
  card.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  // Handling mouse move (desktop)
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const moveX = e.clientX - startX;
    card.style.transform = `translateX(${moveX}px) rotate(${moveX / 10}deg)`;
  });

  // Handling touch move (mobile)
  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const moveX = e.touches[0].clientX - startX;
    card.style.transform = `translateX(${moveX}px) rotate(${moveX / 10}deg)`;
  });

  // Handling mouse up (desktop)
  document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.clientX;

    // If swiped right and it's a match
    if (endX - startX > 100) {
      if (politician.keywords.some(keyword => voterKeywords.includes(keyword))) {
        matchedPoliticians.push(politician.name);
        alert(`✅ Matched with ${politician.name}!`);
      }
      card.classList.add("swipe-right");
    } else if (endX - startX < -100) {
      // If swiped left and it's a match
      if (politician.keywords.some(keyword => voterKeywords.includes(keyword))) {
        matchedPoliticians.push(politician.name);
        alert(`✅ Matched with ${politician.name}!`);
      }
      card.classList.add("swipe-left");
    } else {
      // Reset card position if not swiped enough
      card.style.transform = "";
    }

    // Wait for the animation to finish, then remove the card and show the next one
    setTimeout(() => {
      card.remove();
      // If there are no cards left, reshuffle and create new ones
      if (document.getElementsByClassName("card").length === 0) {
        shufflePoliticians();
        generatePoliticianCards();
      }
    }, 300); // Timing for the swipe animation
  });

  // Handling touch end (mobile)
  document.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;

    // If swiped right and it's a match
    if (endX - startX > 100) {
      if (politician.keywords.some(keyword => voterKeywords.includes(keyword))) {
        matchedPoliticians.push(politician.name);
        alert(`✅ Matched with ${politician.name}!`);
      }
      card.classList.add("swipe-right");
    } else if (endX - startX < -100) {
      // If swiped left and it's a match
      if (politician.keywords.some(keyword => voterKeywords.includes(keyword))) {
        matchedPoliticians.push(politician.name);
        alert(`✅ Matched with ${politician.name}!`);
      }
      card.classList.add("swipe-left");
    } else {
      // Reset card position if not swiped enough
      card.style.transform = "";
    }

    // Wait for the animation to finish, then remove the card and show the next one
    setTimeout(() => {
      card.remove();
      // If there are no cards left, reshuffle and create new ones
      if (document.getElementsByClassName("card").length === 0) {
        shufflePoliticians();
        generatePoliticianCards();
      }
    }, 300); // Timing for the swipe animation
  });
}
