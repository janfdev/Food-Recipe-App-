const searchBtn = document.getElementById("searchBtn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");

// Event Listener
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);

// Get meal list that matches with the ingredient
function getMealList() {
  let searchInputText = document.getElementById("searchInput").value.trim();

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      const notFound = document.getElementById("notFound");

      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
          <div class="max-w-full px-4 py-3 bg-white rounded-md shadow-lg dark:bg-gray-800" data-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" class="rounded-lg object-cover" alt="">
            <div>
              <h1 class="mt-2 text-lg font-semibold text-gray-800 dark:text-white">${meal.strMeal}</h1>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Odio eligendi similique exercitationem optio libero vitae accusamus cupiditate laborum eos.</p>
            </div>
            <div class="py-5">
              <a href="#" class="bg-indigo-500 text-white font-semibold py-2 px-5 rounded-full recipe-btn">Get Recipe</a>
            </div>
          </div>
          `;
        });

        notFound.classList.add("hidden");
      } else {
        notFound.classList.remove("hidden");
      }

      mealList.innerHTML = html;
    });
}

// Event handler ketika tombol "Get Recipe" diklik
function getMealRecipe(e) {
  e.preventDefault();

  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// Membuat dan menampilkan modal
function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
    <div class="fixed inset-0 z-50 flex items-center justify-center overflow-scroll no-scrollbar">
      <div
        class="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 lg:max-w-xl max-w-md md:max-w-lg sm:max-w-md"
        role="alert">
        <div class="flex flex-col items-center gap-4 text-center">
          <h2 class="font-semibold sm:text-lg lg:text-3xl uppercase">${meal.strMeal}</h2>
          <span class="text-center bg-indigo-500 text-white text-sm px-5 py-2 rounded-full">${meal.strCategory}</span>
          <img src="${meal.strMealThumb}" class="w-20 h-20 object-cover rounded-full" alt="">
        </div>

        <p class="mt-4 text-gray-500">${meal.strInstructions}</p>

        <div class="mt-6 flex flex-row justify-between">
          <a class="mt-2 inline-block w-full rounded-lg bg-red-500 px-7 py-3 text-center text-sm font-semibold text-white sm:mt-0 sm:w-auto"
            href="#" id="cancelButton">
            Cancel
          </a>
          <a class="inline-block w-full rounded-lg bg-indigo-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
            href="${meal.strYoutube}">
            Watch Videos
          </a>
        </div>
      </div>
    </div>
  `;

  mealDetailsContent.innerHTML = html;
  mealDetailsContent.classList.remove("hidden");

  // Event listener untuk tombol cancel
  document.getElementById("cancelButton").addEventListener("click", () => {
    mealDetailsContent.classList.add("hidden");
  });
}

// Register

// Login
