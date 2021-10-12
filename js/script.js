// making the name field the focus when the page first loads.
let nameField = document.getElementById("name");
nameField.focus();

// following code hides the other job roles and shows it only when other is selected
let jobRole = document.querySelector("#title");
let otherJob = document.querySelector("#other-job-role");
// hides the other job element by default upon reload
otherJob.style.display = "none";

jobRole.addEventListener("change", (e)=>{
    let target = e.target;
    if(target.value === "other"){
        otherJob.style.display = "block";
    }else{
        otherJob.style.display = "none";
    }
})

// takes care of the T-Shirt part of the form
let design = document.querySelector("#design");
let color = document.querySelector("#color");
let optionChild = color.children;

color.disabled = true;

design.addEventListener("change", (e) =>{
    color.disabled = false;
// loop over the option element children of the the Color select element
    for(let i=0;i<optionChild.length;i++){
        let value = e.target.value;
        let dataTheme = optionChild[i].getAttribute("data-theme");

        if(value === dataTheme){
            optionChild[i].hidden = false;
            optionChild[i].selected = true;
        }else{
            optionChild[i].hidden = true;
            optionChild[i].selected = false;
        }
    }
})

// this part of the code takes care of the functionality of the register part of the form.
let activities = document.querySelector("#activities");
let cost = document.querySelector("#activities-cost");
// stores the cost of the activities
let totalCost = 0;

activities.addEventListener("change", (e)=>{
    // stores the value of the data-cost attribute of the element.
    let dataCost = e.target.getAttribute("data-cost");
    dataCost = parseInt(dataCost);
    // condition to check if the checkbox is checked and update accordingly
    if(e.target.checked === true){
        totalCost+=dataCost;
    }else{
        totalCost-=dataCost;
    }
    cost.innerHTML = `Total: $${totalCost}`;
})

// this part takes care of the payment method section of the form
let payment = document.querySelector("#payment");
let creditCard = document.querySelector("#credit-card");
let paypal = document.querySelector("#paypal");
let bitcoin = document.querySelector("#bitcoin");
// hide the paypal and bitcoin initially
paypal.style.display = "none";
bitcoin.style.display = "none";

// makes the field selected visible and hides the ones that were not selected
payment.addEventListener("change", (e)=>{
    if(payment[1].selected === true){
        creditCard.style.display = "block";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    }else if(payment[2].selected === true){
        creditCard.style.display = "none";
        paypal.style.display = "block";
        bitcoin.style.display = "none";
    }else if(payment[3].selected === true){
        creditCard.style.display = "none";
        paypal.style.display = "none";
        bitcoin.style.display = "block";
    }
})

// this part takes care of the whole form validation...

let emailField = document.querySelector("#email");
let cardNumber = document.querySelector("#cc-num");
let zipCode = document.querySelector("#zip");
let cvv = document.querySelector("#cvv");
let mainForm = document.querySelector("form");
// the following line gets all the input elements with type checkbox
let allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
let activitiesBox = document.getElementById("activities-box");

// test regex variables for each form field, simple regex for each field.
let nameRegex = /^\D\w+$/;
let cardNumberRegex = /^\d{13,16}$/;
let emailRegex = /^\w+\.?\w+@\w+\.\w+\.?\w+$/;
let zipCodeRegex = /^\d{5}$/;
let cvvRegex = /^\d{3}$/;

// these variables access the error messages of the form or the hint in order to hide and show them.
let nameMessage = document.getElementById("name-hint");
let emailMessage = document.getElementById("email-hint");
let activitiesMessage = document.getElementById("activities-hint");
let creditCardMessage = document.getElementById("cc-hint");
let zipMessage = document.getElementById("zip-hint");
let cvvMessage = document.getElementById("cvv-hint");

// validates the entire form when submitted
mainForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    // name validation
    let nameFieldValue = nameField.value;
    let nameTestResult = nameRegex.test(nameFieldValue); 
    if (nameTestResult === false){
        e.preventDefault()
        nameField.parentNode.classList.add("not-valid");
        nameField.parentNode.classList.remove("valid");
        nameMessage.style.display ="block";
    } else{
        nameField.parentNode.classList.add("valid");
        nameField.parentNode.classList.remove("not-valid");
        nameMessage.style.display = "none";
    }
    // email validatiion
    let emailTestResult = emailRegex.test(emailField.value);
    if(emailTestResult === false){
        e.preventDefault()
        emailField.parentNode.classList.add("not-valid");
        emailField.parentNode.classList.remove("valid");
        emailMessage.style.display ="block";
    }else{
        emailField.parentNode.classList.add("valid");
        emailField.parentNode.classList.remove("not-valid");
        emailMessage.style.display = "none";
    }
    // activities validation, atleast one activity must be selected otherwise throw an error.

    // loop through the input element array to see if one was checked or not
    let isChecked = "false";
    for(let i=0; i<allCheckboxes.length; i++){
        if(allCheckboxes[i].checked === true){
            isChecked = "true";
            break;
        }
    }
    if(isChecked === "false"){
        e.preventDefault()
        activities.classList.add("not-valid");
        activities.classList.remove("valid");
        activitiesMessage.style.display = "block";
    } else {
        activities.classList.remove("not-valid");
        activities.classList.add("valid");
        activitiesMessage.style.display = "none";
    }

    // credit card validation, this works only if credit card is the selected payment option
    // makes sure we selected the credit card opiton only
    if(payment[1].selected === true){
        // validates card number
        if(cardNumberRegex.test(cardNumber.value)=== false){
            e.preventDefault();
            cardNumber.parentNode.classList.add("not-valid");
            cardNumber.parentNode.classList.remove("valid");
            creditCardMessage.style.display = "block";
        } else{
            cardNumber.parentNode.classList.remove("not-valid");
            cardNumber.parentNode.classList.add("valid");
            creditCardMessage.style.display = "none";
        }
        // validates zip code
        if(zipCodeRegex.test(zipCode.value)=== false){
            e.preventDefault();
            zipCode.parentNode.classList.add("not-valid");
            zipCode.parentNode.classList.remove("valid");
            zipMessage.style.display = "block";
        } else{
            zipCode.parentNode.classList.remove("not-valid");
            zipCode.parentNode.classList.add("valid");
            zipMessage.style.display = "none";
        }
        // validates cvv of the card
        if(cvvRegex.test(cvv.value)=== false){
            e.preventDefault();
            cvv.parentNode.classList.add("not-valid");
            cvv.parentNode.classList.remove("valid");
            cvvMessage.style.display = "block";
        } else{
            cvv.parentNode.classList.remove("not-valid");
            cvv.parentNode.classList.add("valid");
            cvvMessage.style.display = "none";
        }
    }
    
})
// accessibility 
// let allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

// loop over the activities checkbox
for(let i=0; i<allCheckboxes.length; i++){
    // make each activity listen for focus and blur event
    allCheckboxes[i].addEventListener("focus", (e)=>{
        e.target.parentNode.classList.add("focus");
    })

    allCheckboxes[i].addEventListener("blur", (e)=>{
        e.target.parentNode.classList.remove("focus");
    })
}

// next -> exceed mark below
