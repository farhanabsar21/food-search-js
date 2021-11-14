const search = document.getElementById("search")
const submit = document.getElementById("submit")
const random = document.getElementById("random")
const mealsEl = document.getElementById("meals")
const resultHeading = document.getElementById("result-heading")
const singleMealEl = document.getElementById("single-meal")

// functions
const searchMeal = e => {
    e.preventDefault()

    // clear single meal
    singleMealEl.innerHTML = ""

    // get search term
    let term = search.value
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2>Search result for "${term}": </h2>`
                if(data.meals === null){
                    resultHeading.innerHTML = `<h2>No Item Available. Try again..</h2>`
                }else{
                    mealsEl.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealId="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `).join("")
                }
            })
            // clear search box 
            search.value = ""
    } else{
        alert("Please type a food name")
    }
}

// events
submit.addEventListener("submit", searchMeal)