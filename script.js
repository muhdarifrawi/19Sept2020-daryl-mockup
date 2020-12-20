document.getElementById("calculate").setAttribute("onclick","inputValidation()");

function inputValidation(){
    // get years of investment 
    let investYears = document.getElementById("investYears").value;
    // get monthly contributions
    let mthContribute = document.getElementById("mthContribute").value;
    // get age
    let age = document.getElementById("age").value;
    // get display
    let display = document.getElementById("display-values");
    if(age < 21){
        display.innerHTML = `<h3>You must be above 21 to apply for this investment</h3>`
        return console.log("invest value error");
    }
    else if(investYears > 99 || investYears == ""){
        display.innerHTML = `<h3>Please enter years to invest from 1 to 99 years</h3>`
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

function placeCommas(value){
    valueToString = String(value);
    let decimal = valueToString.slice(-3,-2);
    // if decimal - 
    if (decimal == "."){
        if (valueToString.length>9){
            return valueToString.slice(0,-9)+","+valueToString.slice(-9,-6)+","+valueToString.slice(-6);
        }
        else if (valueToString.length>6){
            return valueToString.slice(0,-6)+","+valueToString.slice(-6);
        }
    }
    // if no decimal
    else{
        if (valueToString.length>6){
            return valueToString.slice(0,-6)+","+valueToString.slice(-6,-3)+","+valueToString.slice(-3);
        }
        else if (valueToString.length>3){
            return valueToString.slice(0,-3)+","+valueToString.slice(-3);
        }
    }
}

function displayValues(yearly1High,yearly2High,yearly1Low,yearly2Low,mC){
    if(document.getElementsByTagName("table").length==0){
        document.getElementById("display-values").innerHTML = "<table></table>";
    }

    let age = document.getElementById("age").value;
    let display = `
    <tr>
        <th></th>
        <th>Age</th>
        <th>Total Commitment</th>
        <th>10 Year Horizon</th>
        <th>Dividend</th>
        <th>20 Year Horizon</th>
        <th>Dividend</th>
    </tr>
    `;
    
    
    for(i in yearly1High){
        let yearlyValue1High=yearly1High[i].toFixed(2);
        let yearlyValue2High=yearly2High[i].toFixed(2);
        let yearlyValue1Low=yearly1Low[i].toFixed(2);
        let yearlyValue2Low=yearly2Low[i].toFixed(2);
        // HIGH RETURNS = 1.12
        let dividend1High = ((yearly1High[i]*1.12)/12).toFixed(2);
        let dividend2High = ((yearly2High[i]*1.12)/12).toFixed(2);
        // LOW RETURNS = 1.04
        let dividend1Low = ((yearly1Low[i]*1.04)/12).toFixed(2);
        let dividend2Low = ((yearly2Low[i]*1.04)/12).toFixed(2);
        let totalCommitment = (parseInt(i)+1)*(mC*12);

        // place commas
        yearlyValue1High = placeCommas(yearlyValue1High);
        yearlyValue2High = placeCommas(yearlyValue2High);
        yearlyValue1Low = placeCommas(yearlyValue1Low);
        yearlyValue2Low = placeCommas(yearlyValue2Low);
        dividend1High = placeCommas(dividend1High);
        dividend2High = placeCommas(dividend2High);
        dividend1Low = placeCommas(dividend1Low);
        dividend2Low = placeCommas(dividend2Low);
        totalCommitment = placeCommas(totalCommitment);

        display += `
        <tr  class="info" id="locate">
            <td class="year">Year ${parseInt(i)+1}</td>      
            <td>${parseInt(i)+parseInt(age)}</td>
            <td class="money">$${totalCommitment}</td>      
            <td class="money ten">$${yearlyValue1Low} - $${yearlyValue1High}</td>
            <td class="money">$${dividend1Low} - $${dividend1High}</td>     
            <td class="money">$${yearlyValue2Low} - $${yearlyValue2High}</td>      
            <td class="money">$${dividend2Low} - $${dividend2High}</td>
        </tr>
        `;
    }
    document.getElementsByTagName("table")[0].innerHTML = display;
}

// mC is month contribute
// iY is investYears
function calculate(iY,mC){
    let yearly1High = [];
    let yearly2High = [];
    let totalInvested1High = 0;
    let totalInvested2High = 0;
    let yearly1Low = [];
    let yearly2Low = [];
    let totalInvested1Low = 0;
    let totalInvested2Low = 0;
    for (count=1;count<=iY;count++){
        if (count==1){
            totalInvested1High = (mC*12) * welcomeBonus(mC)[0] * 0.975 * 1.12;
            totalInvested2High = (mC*12) * welcomeBonus(mC)[1] * 0.975 * 1.12;
            yearly1High.push(totalInvested1High);
            yearly2High.push(totalInvested2High);

            totalInvested1Low = (mC*12) * welcomeBonus(mC)[0] * 0.975 * 1.04;
            totalInvested2Low = (mC*12) * welcomeBonus(mC)[1] * 0.975 * 1.04;
            yearly1Low.push(totalInvested1Low);
            yearly2Low.push(totalInvested2Low);
        }
        else if (count<=10){
            totalInvested1High = (yearly1High[count-2]+(mC*12)) * 0.975 * 1.12;
            totalInvested2High = (yearly2High[count-2]+(mC*12)) * 0.975 * 1.12;
            yearly1High.push(totalInvested1High);
            yearly2High.push(totalInvested2High);

            totalInvested1Low = (yearly1Low[count-2]+(mC*12)) * 0.975 * 1.04;
            totalInvested2Low = (yearly2Low[count-2]+(mC*12)) * 0.975 * 1.04;
            yearly1Low.push(totalInvested1Low);
            yearly2Low.push(totalInvested2Low);
        }
        else{
            totalInvested1High = yearly1High[count-2] * 0.996 * 1.12;
            totalInvested2High = yearly2High[count-2] * 0.996 * 1.12;
            yearly1High.push(totalInvested1High);
            yearly2High.push(totalInvested2High);

            totalInvested1Low = yearly1Low[count-2] * 0.996 * 1.04;
            totalInvested2Low = (yearly2Low[count-2]+(mC*12)) * 0.996 * 1.04;
            yearly1Low.push(totalInvested1Low);
            yearly2Low.push(totalInvested2Low);
        }
    }

    displayValues(yearly1High,yearly2High,yearly1Low,yearly2Low,mC);
    
}


