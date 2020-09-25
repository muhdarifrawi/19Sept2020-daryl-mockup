
document.getElementById("calculate").setAttribute("onclick","calculate()");
document.getElementById("returns").setAttribute("onchange","check()");
document.getElementById("returnsValue").innerText = "6%";

function check(){
    let returns = document.getElementById("returns").value;
    document.getElementById("returnsValue").innerText = returns + "%";
    console.log(returns);
}

let yearly = [];

function calculate(){
    console.log("calc success")
    let notification = document.getElementById("notification");
    let periods = document.getElementsByName("period");
    let period = 0;
    for(i=0;i<periods.length;i++){
        if(periods[i].checked){
            period = parseInt(periods[i].value);
        }
    }
    let investYears = document.getElementById("investYears").value; 
    let mthContribute = document.getElementById("mthContribute").value; 
    let returns = document.getElementById("returns").value;
    
    console.log(period);
    if(yearly.length!=0){
        yearly = [];
    }
    if(investYears < period || investYears > 99){
        notification.innerHTML = `<h3>Please enter years to invest from ${period} to 99 years</h3>`
        return console.log("invest value error")
    }
    else if(mthContribute < 300){
        notification.innerHTML = "<h3>Please enter a minimum value of 300 for monthly contributions</h3>" 
        return console.log("invest value error")
    }
    else{
        returns = (returns/100) + 1;
        let yrContribute = mthContribute * 12
        firstYear(yrContribute,period,returns);
        // console.log(amount);
        nthYear(investYears,yrContribute,period,returns);
        notification.innerHTML = `<h3>${yearly[0]}</h3>`
        console.log(yearly);   
    }
}

function firstYear(yrContribute, period, returns){
    console.log("success");
    
    let welcomeBonus = 0;
    // console.log("returns conversion:", returns);
    if(period == 10){
        if (yrContribute >= 3600 && yrContribute < 120000){
            welcomeBonus = 1.10;
            let fyReturns = yrContribute*welcomeBonus*0.975*returns;
            console.log(fyReturns, welcomeBonus);
            yearly.push(fyReturns);
            return;
        }
        else if (yrContribute >= 120000){
            welcomeBonus = 1.40;
            let fyReturns = yrContribute*welcomeBonus*0.975*returns;
            // console.log(fyReturns, welcomeBonus);
            yearly.push(fyReturns);
            return;
        }
        else{
            console.log("yearly contribute error");
        }
    }
    else if(period == 20){
        if (yrContribute > 2400 && yrContribute < 96000){
            welcomeBonus = 1.30;
            let fyReturns = yrContribute*welcomeBonus*0.975*returns;
            // console.log(fyReturns, welcomeBonus);
            yearly.push(fyReturns);
            return;
        }
        else if (yrContribute >= 96000){
            welcomeBonus = 1.60;
            let fyReturns = yrContribute*welcomeBonus*0.975*returns;
            // console.log(fyReturns, welcomeBonus);
            yearly.push(fyReturns);
            return;
        }
        else{
            console.log("yearly contribute error");
        }
    }
    else{
        console.log("unexpected error");
    }
}

function nthYear(investYears,yrContribute,returns){
    let nth = investYears-1;
    for(i=0;i<nth;i++){
        let nthReturns = yearly[i]*yrContribute*0.975*returns;
        yearly.push(nthReturns);
    }

}

