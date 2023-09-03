
$(window).ready(()=>{
    $(".loading").fadeOut(2000,()=>{
        searchByName([]) 
    $("body").css("overflow-y","scroll")
   
    });
});

   function closeSide(){
    $(".semoon").slideUp(800)
        let boxWidth = $(".options .optionSide").outerWidth();
         $(".options").animate({
            left: -boxWidth
        }, 1500)

       
        $(".open-close-icon").addClass("fa-align-justify");
        $(".open-close-icon").removeClass("fa-x");
     
        

}
closeSide();

   function openSide(){
    $(".semoon").slideDown(1000)
        $(".options").animate({
            left:0
        }, 700);
      
        $(".open-close-icon").removeClass("fa-align-justify");
        $(".open-close-icon").addClass("fa-x");
    
    }
        $(".options .nav-header .open-close-icon").click(() => {
            if ($(".options").css("left") === "0px") {
        closeSide();
        
            } else {
        openSide();
    }
})


function searchInput(){
    closeSide();
    $(".search-input").slideDown(700);
    content.innerHTML=""
}

function searchInputClose(){
    $(".search-input").hide();
}

function openContact(){
    content.innerHTML=""
$('.form').slideDown(2000);
closeSide()
// content.innerHTML=""
}
function closeContact(){
    $(".form").hide();
}




// $('.options .nav-header .open-close-icon').click(function(){
//     let potion=$('.options').offset().left
//     let boxWidth=$('.optionSide').outerWidth()
//     if(potion===0){
//         $('.options').css({left:`-${boxWidth}`,transition:'all 1s'})
//     }else{
//     $('.options').css({left:`0px`,transition:'all 1s'})
//     }
// })





// start ===============  The function of categories and meals and details  ====================

let content = document.querySelector(".content");

async function getCategories() {
    let responses = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    responses = await responses.json()
    // console.log(responses.meals);
    displayCategories(responses.categories)
    // searchInputClose()
    closeSide();
}
function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 py-3">
                <div onclick="mealsCategories('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    content.innerHTML = cartoona;
}
async function mealsCategories(cate) {
    let responses = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`);
    responses = await responses.json();
    console.log(responses.meals);
    displayMealsCate(responses.meals.slice(0, 20));
    searchInputClose()
  
}
function displayMealsCate(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 gy-4">
                <div onclick="getCategoriesDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h4>${arr[i].strMeal}</h4>
                    </div>
                </div>
        </div>
        `
    }

    content.innerHTML = cartoona;
}


async function getCategoriesDetails(details) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`)
        response = await response.json()
        console.log(details);
        console.log(response.meals[0]);
    displayCategoriesDetails(response.meals[0])
    searchInputClose()
   
}
function displayCategoriesDetails(arr){
   let cartoona='';
    // for (let i = 0; i < arr.length; i++) {
        cartoona+=`
        
        <div class="col-md-4 pt-5">
        <img class="w-100 rounded-3" src="${arr.strMealThumb}"
            alt="">
            <h2>${arr.strMeal}</h2>
    </div>
    <div class="col-md-8 pt-5">
        <h2>Instructions</h2>
        <p>${arr.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${arr.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${arr.strCategory}</h3>
        <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1"> ${arr.strMeasure1}</li>
            <li class="alert alert-info m-2 p-1"> ${arr.strMeasure2}</li>
            <li class="alert alert-info m-2 p-1"> ${arr.strMeasure3}</li>
            <li class="alert alert-info m-2 p-1"> ${arr.strMeasure4}</li>
            <li class="alert alert-info m-2 p-1"> ${arr.strMeasure5}</li>
            <li class="alert alert-info m-2 p-1"> ${arr.strMeasure6}</li>
            <li class="alert alert-info m-2 p-1"> ${arr.strIngredient1}</li>
            <li class="alert alert-info m-2 p-1">${arr.strIngredient2}</li>
            <li class="alert alert-info m-2 p-1">${arr.strIngredient3}</li>
            <li class="alert alert-info m-2 p-1">${arr.strIngredient4}</li>
            <li class="alert alert-info m-2 p-1">${arr.strIngredient5}</li>
            <li class="alert alert-info m-2 p-1">${arr.strIngredient6}</li>
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap ">
            <li class="alert alert-info m-2 p-1 ">  ${arr.strTags}</li>
        </ul>

        <a target="_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`
        
    // }
    content.innerHTML = cartoona;
    }








// End ====================The function of categories and meals and details=========================


// start ===============  The function of Area and meals and details  ====================

async function getArea() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
     // console.log(response.meals);
    displayArea(response.meals)
    closeSide()
    searchInputClose()
  
}
function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 py-4">
                <div onclick="mealsArea('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    content.innerHTML = cartoona
}
async function mealsArea(area) {
    let responses = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    responses = await responses.json();
    console.log(responses.meals);
    displayMealsArea(responses.meals.slice(0, 20));
    searchInputClose()
    
}
function displayMealsArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 gy-4">
                <div onclick="getCategoriesDetails('${arr[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h4>${arr[i].strMeal}</h4>
                    </div>
                </div>
        </div>
        `
    }

    content.innerHTML = cartoona;
}

// End ====================The function of Area and meals and details=========================

// Start ====================The function of Ingredients and meals and details=========================

async function getIngredients() {
    let respones = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respones = await respones.json()
    displayIngredients(respones.meals.slice(0, 20))
    closeSide()
    searchInputClose()
  
}
function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 py-4">
                <div onclick="getMealsIngredients('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.slice(0,20)}</p>
                </div>
        </div>
        `
    }

   content.innerHTML = cartoona
}
async function getMealsIngredients(ingred) {
    let responses = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`)
    responses = await responses.json();
    console.log(responses.meals);
    displayMealsIngredients(responses.meals.slice(0, 20));
    searchInputClose()
 
}
function displayMealsIngredients(arr){
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 gy-4">
                <div onclick="getCategoriesDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h4>${arr[i].strMeal}</h4>
                    </div>
                </div>
        </div>
        `
    }
    content.innerHTML = cartoona;
}


// End ====================The function of Ingredients and meals and details=========================



async function searchByName(sear) {
    content.innerHTML="";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${sear}`)
    response = await response.json()
   displayMeals(response.meals)
 
}
async function searchByLetter(sear) {
    content.innerHTML="";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${sear}`)
    response = await response.json()
    displayMeals(response.meals) 
}
function displayMeals(arr){
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 gy-4">
                <div onclick="getCategoriesDetails('${arr[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h4>${arr[i].strMeal}</h4>
                    </div>
                </div>
        </div>
        `
    }
    content.innerHTML = cartoona;
    // content.innerHTML = "";

}





let inputName=document.querySelector('.inputName');
function inputNameValidation(){
    let nameRegex=/^[A-Za-z]{3,}$/;
    let inputname=inputName.value;
        if(nameRegex.test(inputname)){
            document.querySelector('.alertName').classList.replace("d-block", "d-none")
        }else{
            document.querySelector('.alertName').classList.replace("d-none", "d-block") 
        }

}




let emailInput=document.querySelector('.inputEmail');
function inputEmailValidation(){
    let emailRegex=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3})$/;
    let inputEmail=emailInput.value;

        if(emailRegex.test(inputEmail)){

            document.querySelector('.alertEmail').classList.replace("d-block", "d-none")
        }else{
            document.querySelector('.alertEmail').classList.replace("d-none", "d-block") 
        }
       
}

let phone=document.querySelector('.phoneInput');

function inputPhoneValidation(){
    let phoneRegex=/^[0-9]{3}[0-9]{3}[0-9]{5,5}$/;
    let inputPhone=phone.value;
    if(phoneRegex.test(inputPhone)){
        document.querySelector('.alertPhone').classList.replace("d-block", "d-none")
    }else{
        document.querySelector('.alertPhone').classList.replace("d-none", "d-block") 
    }
  
}


let age=document.querySelector('.inputAge')
function inputAgeValidation(){
    let ageRegex=/^[0-9]{2,2}$/;
    let inputAge=age.value;
    if(ageRegex.test(inputAge)){
        document.querySelector('.alertAge').classList.replace("d-block", "d-none")
    }else{
        document.querySelector('.alertAge').classList.replace("d-none", "d-block") 
    }
 
}

let password=document.querySelector('.inputPassword')
function inputPasswordValidation(){
    let passwordRegex= /^[A-Za-z]\w{4,15}$/;
    let inputPassword=password.value;
    if(passwordRegex.test(inputPassword)){
        document.querySelector('.alertpassword').classList.replace("d-block", "d-none")
    }else{
        document.querySelector('.alertpassword').classList.replace("d-none", "d-block") 
    }
  
}

let confirmPassword=document.querySelector('.inputConfirmPassword')
function inputConfirmPasswordValidation(){
 
    if(password.value===confirmPassword.value){

        document.querySelector('.alertConfirmPassword').classList.replace("d-block", "d-none")

    }else{
    
        document.querySelector('.alertConfirmPassword').classList.replace("d-none", "d-block")
      
    }
   
}


let submit=document.querySelector('.submit');

    function inpName(){
        if(inputNameValidation()&&inputEmailValidation()&&
        inputPhoneValidation()&&inputAgeValidation()&&
        inputPasswordValidation()&&inputConfirmPasswordValidation()
      )
        {
            submit.removeAttribute("disabled",true)
         
    }else{
        submit.disabled= "true";
    }
    }
   
 