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
  
    document.querySelector("form").addEventListener("submit", searchMeal);
    document.querySelector(".magnifier").addEventListener("click", searchMeal);
  });
  