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