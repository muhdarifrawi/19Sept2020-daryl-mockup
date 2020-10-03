
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
    // console.log("calc success")
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
    
    // console.log(period);
    if(yearly.length!=0){
        yearly = [];
    }
    if(investYears < period || investYears > 99){
        notification.innerHTML = `<h3>Please enter years to invest from ${period} to 99 years</h3>`
        return console.log("invest value error")
    }
    else if(period == 10 && mthContribute < 300){
        notification.innerHTML = "<h3>Please enter a minimum value of 300 for monthly contributions</h3>" 
        return console.log("invest value error")
    }
    else if(period == 20 && mthContribute < 200){
        notification.innerHTML = "<h3>Please enter a minimum value of 300 for monthly contributions</h3>" 
        return console.log("invest value error")
    }
    else{
        returns = (returns/100) + 1;
        let yrContribute = mthContribute * 12;
        let platformCost = yrContribute*0.975;
        firstYear(yrContribute,period,returns,platformCost);
        nthYear(investYears,yrContribute,period,returns,platformCost);
        // showReturns();
        visualData(yrContribute,investYears);
        console.log(yearly);
        
    }
}

function firstYear(yrContribute, period, returns, platformCost){
    console.log("success");
    
    let welcomeBonus = 0;
    // console.log("returns conversion:", returns);
    if(period == 10){
        if (yrContribute >= 3600 && yrContribute < 120000){
            welcomeBonus = yrContribute * 1.10;
            let totalCost = (yrContribute+welcomeBonus)-platformCost;
            let fyReturns = totalCost*returns;
            console.log("case 1", yrContribute, welcomeBonus, platformCost, fyReturns);
            fyReturns = Number((fyReturns).toFixed(2));
            yearly.push(fyReturns);
            return;
        }
        else if (yrContribute >= 120000){
            welcomeBonus = yrContribute * 1.40;
            let totalCost = (yrContribute+welcomeBonus)-platformCost;
            let fyReturns = totalCost*returns;
            console.log("case 2", yrContribute, welcomeBonus, platformCost, fyReturns);
            fyReturns = Number((fyReturns).toFixed(2));
            yearly.push(fyReturns);
            return;
        }
        else{
            console.log("yearly contribute error");
        }
    }
    else if(period == 20){
        if (yrContribute >= 2400 && yrContribute < 9600){
            welcomeBonus = yrContribute * 1.30;
            let totalCost = (yrContribute+welcomeBonus)-platformCost;
            let fyReturns = totalCost*returns;
            console.log("case 3", yrContribute, welcomeBonus, platformCost, fyReturns);
            fyReturns = Number((fyReturns).toFixed(2));
            yearly.push(fyReturns);
            return;
        }
        else if (yrContribute >= 9600){
            welcomeBonus = yrContribute * 1.60;
            let totalCost = (yrContribute+welcomeBonus)-platformCost;
            let fyReturns = totalCost*returns;
            console.log("case 4", yrContribute, welcomeBonus, platformCost, fyReturns);
            fyReturns = Number((fyReturns).toFixed(2));
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

function nthYear(investYears,yrContribute,period,returns,platformCost){
    let nth = investYears-1;
    for(i=0;i<period-1;i++){
        let totalCost = (yrContribute + yearly[i])-platformCost;
        let nthReturns = totalCost*returns;
        nthReturns = Number((nthReturns).toFixed(3));
        console.log("year",i+2, yrContribute, yearly[i], platformCost, nthReturns, totalCost, "part a");
        yearly.push(nthReturns);
    }
    for(i=period-1;i<nth;i++){
        let revisedPlatformCost = yrContribute*0.996;
        let totalCost = (yrContribute + yearly[i])-revisedPlatformCost;
        let nthReturns = totalCost*returns;
        nthReturns = Number((nthReturns).toFixed(3));
        console.log("year",i+2, yrContribute, yearly[i], platformCost, nthReturns, totalCost, "part b");
        yearly.push(nthReturns);
    }

}

function showReturns(){
    display = ``;
        for(i in yearly){
            x = yearly[i].toString();
            if(x.slice(x.length-4,x.length-3)=="."){
                console.log("slice success");
                x = x.slice(0,x.length-1);
                yearResult = `<h3>Year ${parseInt(i)+1}: $${x}</h3>`;
                display += yearResult;
            }
            else if(x.slice(x.length-2,x.length-1)=="."){
                x = x + "0";
                yearResult = `<h3>Year ${parseInt(i)+1}: $${x}</h3>`;
                display += yearResult;
            }
            else{
                yearResult = `<h3>Year ${parseInt(i)+1}: $${x}</h3>`;
                display += yearResult;
            }
            
        }
        notification.innerHTML = display;
}

function visualData(yrContribute,investYears){
    let sumAll = function sumAll(accumulator,currentValue){return accumulator + currentValue};
    let totalReturns = yearly.reduce(sumAll); 
    totalReturns = Number((totalReturns).toFixed(2));
    let totalInvested = yrContribute * investYears;
    totalInvested = Number((totalInvested).toFixed(2));
    let totalReturnOfInvestment = totalReturns - totalInvested;
    totalReturnOfInvestment = Number((totalReturnOfInvestment).toFixed(2));
    let percentageOfGrowth = (totalReturns/totalInvested)
    percentageOfGrowth = Number((percentageOfGrowth).toFixed(2));

    display = `
        <h3>Total Returns:</h3>
        <p>$${totalReturns}</p>
        <h3>Total Invested:</h3>
        <p>$${totalInvested}</p>
        <h3>Total Returns of Investment:</h3>
        <p>$${totalReturnOfInvestment}</p>
        <h3>Percentage of Growth:</h3>
        <p>${percentageOfGrowth}%</p>
    `
    notification.innerHTML = display;
}
