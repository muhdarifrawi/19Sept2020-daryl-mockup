document.getElementById("calculate").setAttribute("onclick","inputValidation()");
document.getElementById("returns").setAttribute("onchange","returns()");
// sets initial returns display to 6%
document.getElementById("returnsValue").innerText = "6%";

function returns(){
    let returns = document.getElementById("returns").value;
    // changes the returns display as per slider's value
    document.getElementById("returnsValue").innerText = returns + "%";
    return returns;
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
        return console.log("invest value error");
    }
    else if(checkPeriod() == 10 && mthContribute < 300){
        notification.innerHTML = "<h3>Please enter a minimum value of 300 for monthly contributions</h3>" 
        return console.log("invest value error");
    }
    else if(checkPeriod() == 20 && mthContribute < 200){
        notification.innerHTML = "<h3>Please enter a minimum value of 300 for monthly contributions</h3>" 
        return console.log("invest value error");
    }
    else{
        console.log("input validation pass");
        calculate(investYears,mthContribute);
    }
}

// mC is month contribute
// iY is investYears
function calculate(iY,mC){
    let yearly = [];
    let totalInvested = 0;
    for (count=1;count<=iY;count++){
        if (count==1){
            totalInvested = (mC*12) * welcomeBonus(mC) * 0.975 * (returns()/100+1);
            yearly.push(totalInvested);
            console.log(`year ${count}`,totalInvested.toFixed(2));
        }
        else if (count<=10){
            totalInvested = (yearly[count-2]+(mC*12)) * 0.975 * (returns()/100+1);
            yearly.push(totalInvested);
            console.log(`year ${count}`,totalInvested.toFixed(2));
        }
        else{
            totalInvested = (yearly[count-2]+(mC*12)) * 0.996 * (returns()/100+1);
            yearly.push(totalInvested);
            console.log(`year ${count}`,totalInvested.toFixed(2));
        }
    }
    
    
    // check on the welcome bonus
    // welcomeBonus(mC);

}

function welcomeBonus(mC){
    if (mC < 1000 && checkPeriod() == 10){
        console.log("10%");
        return 1.1;
    }
    else if (mC >= 1000 && checkPeriod() == 10){
        console.log("40%");
        return 1.4;
    }
    else if (mC < 800 && checkPeriod() == 20){
        console.log("30%");
        return 1.3;
    }
    else if (mC >= 800 && checkPeriod() == 20){
        console.log("60%");
        return 1.6;
    }
    else{
        console.log("welcomeBonus unexpected error");
    }
}
