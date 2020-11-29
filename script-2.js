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

// function to display the values
// function displayValues(yearly){
//     let display = ``;
    
//     for(i in yearly){
//         // console.log(each.toFixed(2));
//         display += `<p>Year ${parseInt(i)+1} ${yearly[i].toFixed(2)}</p>`;
//     }
//     document.getElementById("display-values").innerHTML = display;
// }

function displayValues(yearly1,yearly2){
    let display = `
    <tr>
        <th></th>
        <th>10 Year Policy</th>
        <th>20 Year Policy</th>
    </tr>
    `;
    
    for(i in yearly1){
        // console.log(yearly1[0].toFixed(2).slice(-3,-2));
        let decimal = yearly1[0].toFixed(2).slice(-3,-2);
        let yearlyValue1=yearly1[i].toFixed(2);
        let yearlyValue2=yearly2[i].toFixed(2);
        
        if(decimal=="."){
            yearlyValue1 = yearlyValue1.slice(0,-6)+","+yearlyValue1.slice(-6);
            yearlyValue2 = yearlyValue2.slice(0,-6)+","+yearlyValue2.slice(-6);
        };
        display += `
        <tr  class="info">
            <td class="year">Year ${parseInt(i)+1}</td>      
            <td class="money">$${yearlyValue1}</td>     
            <td class="money">$${yearlyValue2}</td>      
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
    
    displayValues(yearly1,yearly2);
    
}


