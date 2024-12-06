const $startButton = document.getElementById("start-button");
$startButton.addEventListener("click", changeVisibility);

function changeVisibility() {
  const $startScreen = document.getElementById("start-screen");
  const $coffeeScreen = document.getElementById("coffee-screen");

  $startScreen.classList.toggle("invisible");
  $coffeeScreen.classList.toggle("invisible");

  const $appContainer = document.getElementById("app-container");
  $appContainer.classList.remove("center-container");
}

const coffeeTypes = [];

async function getCoffeeInfo() {
  try {
    const response = await fetch("https://api.sampleapis.com/coffee/hot");
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }
    const data = await response.json();
    coffeeTypes.push(...data);
    displayCoffeeTitles();
    showCoffeeDetails();
  } catch (e) {
    console.error("Błąd: ", e);
    const $errorMessage = document.createElement("p");
    $errorMessage.innerText = "Coś poszło nie tak! Spróbuj ponownie później.";

    const $coffeeList = document.getElementById("coffee-list");
    $coffeeList.appendChild($errorMessage);
  }
}

getCoffeeInfo();

const $coffeeSelect = document.getElementById("coffee-select");

function displayCoffeeTitles() {
  coffeeTypes.forEach((coffee) => {
    const coffeeOption = document.createElement("option");
    coffeeOption.value = coffee.title;
    coffeeOption.text = coffee.title;

    $coffeeSelect.appendChild(coffeeOption);
  });
}

$coffeeSelect.addEventListener("change", showCoffeeDetails);

function showCoffeeDetails() {
  const $coffeeInfoDiv = document.getElementById("coffee-details");
  $coffeeInfoDiv.innerHTML = "";

  const selectedCoffeeTitle = $coffeeSelect.value;
  const selectedCoffee = coffeeTypes.find(
    (coffee) => coffee.title === selectedCoffeeTitle
  );

  $coffeeInfoDiv.innerHTML = `
 <h2>${selectedCoffeeTitle}</h2>
    <img class="coffee-image" 
    src="${selectedCoffee.image}" 
    alt="${selectedCoffeeTitle}">
    <p>${selectedCoffee.description}</p>
    <h3>Ingredients:</h3>
    <ul>
      ${selectedCoffee.ingredients
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join("")}
    </ul>
  `;
}
