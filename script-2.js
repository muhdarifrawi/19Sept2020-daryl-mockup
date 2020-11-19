document.getElementById("calculate").setAttribute("onclick","calculate()");
document.getElementById("returns").setAttribute("onchange","returns()");
// sets initial returns display to 6%
document.getElementById("returnsValue").innerText = "6%";

function returns(){
    let returns = document.getElementById("returns").value;
    // changes the returns display as per slider's value
    document.getElementById("returnsValue").innerText = returns + "%";
}

function calculate(){
   
    // get years of investment 
    let investYears = document.getElementById("investYears").value;
    // get monthly contributions
    let mthContribute = document.getElementById("mthContribute").value;
    // check on the welcome bonus
    welcomeBonus(mthContribute);

}

function welcomeBonus(mthContribute){
    let periods = document.getElementsByName("period");
    let period = 0;
    for(i=0;i<periods.length;i++){
        if(periods[i].checked){
            period = parseInt(periods[i].value);
        }
    }
    if (mthContribute < 1000 && period == 10){
        console.log("10%");
    }
    else if (mthContribute >= 1000 && period == 10){
        console.log("40%");
    }
    else if (mthContribute < 800 && period == 20){
        console.log("30%");
    }
    else if (mthContribute >= 800 && period == 20){
        console.log("60%");
    }
    else{
        console.log("welcomeBonus unexpected error");
    }
}
