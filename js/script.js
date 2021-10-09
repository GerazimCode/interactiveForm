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

// this part takes care of the form validation...