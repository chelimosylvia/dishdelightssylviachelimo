document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".input");
    const title = document.querySelector(".title");
    const info = document.querySelector(".info");
    const img = document.querySelector(".img");
    const ingredientsOutput = document.querySelector(".ingredients");

  
    const showMealInfo = (meal) => {
      const { strMeal, strMealThumb, strInstructions } = meal;
      title.textContent = strMeal;
      img.style.backgroundImage = `url(${strMealThumb})`;
      info.textContent = strInstructions;
  
      const ingredients = Array.from({ length: 20 }, (_, i) => ({
        ingredient: meal[`strIngredient${i + 1}`],
        measure: meal[`strMeasure${i + 1}`],
      })).filter((ing) => ing.ingredient);
  
      ingredientsOutput.innerHTML = `<span>${ingredients.map(({ ingredient, measure }) => `<li class="ing">${ingredient} - ${measure}</li>`).join("")}</span>`;
    };
  
    const showAlert = () => {
      alert("Meal not found :(");
      clearUI();
    };
  
    const showLoadingIndicator = () => {
      
    };
  
    const hideLoadingIndicator = () => {
    };
  
    const clearUI = () => {
      title.textContent = "";
      img.style.backgroundImage = "none";
      info.textContent = "";
      ingredientsOutput.innerHTML = "";
    };
  
    const fetchMealData = async (val) => {
      showLoadingIndicator();
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
        const { meals } = await res.json();
        return meals || [];
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      } finally {
        hideLoadingIndicator();
      }
    };
  
    const searchMeal = async (e) => {
      e.preventDefault();
      const val = input.value.trim();
  
      if (val) {
        const meals = await fetchMealData(val);
        meals.length === 0 ? showAlert() : meals.forEach(showMealInfo);
      } else {
        alert("Please try searching for a meal :)");
        clearUI();
      }
    };
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then(response => response.json())
    .then(data => {
        const meals = data.meals;
        const userList = document.getElementById('user-list');

        // Loop through the meals and create list items
        meals.forEach(meal => {
            const listItem = document.createElement('li');
            listItem.classList.add('meal', 'item');

            // Create HTML structure for the meal details
            listItem.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <p>Category: ${meal.strCategory}</p>
                <p>Area: ${meal.strArea}</p>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width: 250px;>
                <a href="${meal.strYoutube}" target="_blank">Watch Recipe</a>
                <a href="${meal.strSource}" target="_blank">Source</a>
            `;

            // Append the list item to the user list
            userList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

    document.querySelector("form").addEventListener("submit", searchMeal);
    document.querySelector(".magnifier").addEventListener("click", searchMeal); 
  });
  