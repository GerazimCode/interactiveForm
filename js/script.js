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