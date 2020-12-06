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
    // get age
    let age = document.getElementById("age").value;
    // get display
    let display = document.getElementById("display-values");
    if(investYears > 99){
        display.innerHTML = `<h3>Please enter years to invest from 1 to 99 years</h3>`
        return console.log("invest value error");
    }
    if(age < 21){
        display.innerHTML = `<h3>You must be above 21 to apply for this investment</h3>`
        return console.log("invest value error");
    }
    else if(mthContribute < 200){
        display.innerHTML = "<h3>Please enter a minimum value of 200 for monthly contributions</h3>" 
        return console.log("invest value error");
    }
    else{
        console.log("input validation pass");
        calculate(investYears,mthContribute);
    }
}

// check on the welcome bonus
// welcomeBonus(mC);

function welcomeBonus(mC){
    let rates =[];
    if (mC < 1000){
        console.log("10%");
        // return 1.1;
        rates.push(1.1);
    }
    else if (mC >= 1000){
        console.log("40%");
        // return 1.4;
        rates.push(1.4);
    }
    else{
        console.log("welcomeBonus unexpected error");
    }
    if (mC < 800){
        console.log("30%");
        // return 1.3;
        rates.push(1.3);
    }
    else if (mC >= 800){
        console.log("60%");
        // return 1.6;
        rates.push(1.6);
    }
    else{
        console.log("welcomeBonus unexpected error");
    }
    console.log(rates);
    return rates;
}

function displayValues(yearly1,yearly2,mC){
    if(document.getElementsByTagName("table").length==0){
        document.getElementById("display-values").innerHTML = "<table></table>";
    }

    let age = document.getElementById("age").value;
    let display = `
    <tr>
        <th></th>
        <th>Age</th>
        <th>Total Commitment</th>
        <th>10 Year Policy</th>
        <th>Dividend</th>
        <th>20 Year Policy</th>
        <th>Dividend</th>
    </tr>
    `;
    
    
    for(i in yearly1){
        // console.log(yearly1[0].toFixed(2).slice(-3,-2));
        let decimal = yearly1[0].toFixed(2).slice(-3,-2);
        let yearlyValue1=yearly1[i].toFixed(2);
        let yearlyValue2=yearly2[i].toFixed(2);
        let dividend1 = ((yearly1[i]*(returns()/100))/12).toFixed(2);
        let dividend2 = ((yearly2[i]*(returns()/100))/12).toFixed(2);
        let totalCommitment = (parseInt(i)+1)*(mC*12);
        console.log(String(totalCommitment).length);

        if(decimal=="." && yearlyValue1.length > 6){
            yearlyValue1 = yearlyValue1.slice(0,-6)+","+yearlyValue1.slice(-6);
            yearlyValue2 = yearlyValue2.slice(0,-6)+","+yearlyValue2.slice(-6);
        };
        if(decimal=="." && dividend1.length > 6){
            dividend1 = dividend1.slice(0,-6)+","+dividend1.slice(-6);
            dividend2 = dividend2.slice(0,-6)+","+dividend2.slice(-6);
        };
        if(String(totalCommitment).length > 6 ){
            totalCommitment = String(totalCommitment).slice(0,-4)+","+String(totalCommitment).slice(0,-3)+","+String(totalCommitment).slice(-3)
        }
        else if(String(totalCommitment).length > 3 ){
            totalCommitment = String(totalCommitment).slice(0,-3)+","+String(totalCommitment).slice(-3)
        };
        
        display += `
        <tr  class="info">
            <td class="year">Year ${parseInt(i)+1}</td>      
            <td>${parseInt(i)+parseInt(age)}</td>
            <td class="money">$${totalCommitment}</td>      
            <td class="money">$${yearlyValue1}</td>
            <td class="money">$${dividend1}</td>     
            <td class="money">$${yearlyValue2}</td>      
            <td class="money">$${dividend2}</td>
        </tr>
        `;
    }
    document.getElementsByTagName("table")[0].innerHTML = display;
}

// mC is month contribute
// iY is investYears
function calculate(iY,mC){
    let yearly1 = [];
    let yearly2 = [];
    let totalInvested1 = 0;
    let totalInvested2 = 0;
    for (count=1;count<=iY;count++){
        if (count==1){
            totalInvested1 = (mC*12) * welcomeBonus(mC)[0] * 0.975 * (returns()/100+1);
            totalInvested2 = (mC*12) * welcomeBonus(mC)[1] * 0.975 * (returns()/100+1);
            yearly1.push(totalInvested1);
            yearly2.push(totalInvested2);
            // console.log(`year ${count}`,totalInvested.toFixed(2));
        }
        else if (count<=10){
            totalInvested1 = (yearly1[count-2]+(mC*12)) * 0.975 * (returns()/100+1);
            totalInvested2 = (yearly2[count-2]+(mC*12)) * 0.975 * (returns()/100+1);
            yearly1.push(totalInvested1);
            yearly2.push(totalInvested2);
            // console.log(`year ${count}`,totalInvested.toFixed(2));
        }
        else{
            totalInvested1 = (yearly1[count-2]+(mC*12)) * 0.996 * (returns()/100+1);
            totalInvested2 = (yearly2[count-2]+(mC*12)) * 0.996 * (returns()/100+1);
            yearly1.push(totalInvested1);
            yearly2.push(totalInvested2);
            // console.log(`year ${count}`,totalInvested.toFixed(2));
        }
    }
    
    displayValues(yearly1,yearly2,mC);
    
}


