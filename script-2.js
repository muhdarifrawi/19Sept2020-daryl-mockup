document.getElementById("calculate").setAttribute("onclick","inputValidation()");
document.getElementById("returns").setAttribute("onchange","returns()");
// sets initial returns display to 6%
document.getElementById("returnsValue").innerText = "6%";

function returns(){
    let returns = document.getElementById("returns").value;
    // changes the returns display as per slider's value
    document.getElementById("returnsValue").innerText = returns + "%";
}

function checkPeriod(){
    // checks the investment policy, 10yrs or 20yrs
    let periods = document.getElementsByName("period");
    let period = 0;
    for(i=0;i<periods.length;i++){
        if(periods[i].checked){
            period = parseInt(periods[i].value);
        }
    }
    return period;
}

function inputValidation(){
    // get years of investment 
    let investYears = document.getElementById("investYears").value;
    // get monthly contributions
    let mthContribute = document.getElementById("mthContribute").value;
    if(investYears < checkPeriod() || investYears > 99){
        notification.innerHTML = `<h3>Please enter years to invest from ${checkPeriod()} to 99 years</h3>`
        return console.log("invest value error")
    }
    else if(checkPeriod() == 10 && mthContribute < 300){
        notification.innerHTML = "<h3>Please enter a minimum value of 300 for monthly contributions</h3>" 
        return console.log("invest value error")
    }
    else if(checkPeriod() == 20 && mthContribute < 200){
        notification.innerHTML = "<h3>Please enter a minimum value of 300 for monthly contributions</h3>" 
        return console.log("invest value error")
    }
    else{
        console.log("input validation pass");
        calculate(investYears,mthContribute);
    }
}

// mC is month contribute
// iY is investYears
function calculate(iY,mC){
   
    
    
    // check on the welcome bonus
    welcomeBonus(mC);

}

function welcomeBonus(mC){
    if (mC < 1000 && checkPeriod() == 10){
        console.log("10%");
    }
    else if (mC >= 1000 && checkPeriod() == 10){
        console.log("40%");
    }
    else if (mC < 800 && checkPeriod() == 20){
        console.log("30%");
    }
    else if (mC >= 800 && checkPeriod() == 20){
        console.log("60%");
    }
    else{
        console.log("welcomeBonus unexpected error");
    }
}
