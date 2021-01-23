document.getElementById("calculate").setAttribute("onclick","inputValidation()");
document.getElementById("horizons").setAttribute("onchange","show()");
document.getElementById("returns").setAttribute("onchange","sliderCheck()");

function sliderCheck(){
    let returns = document.getElementById("returns").value;
    document.getElementById("returnsValue").innerText = returns + "%";
    return parseInt(returns)
}
sliderCheck()

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
        // console.log("10%");
        // return 1.1;
        rates.push(1.1);
    }
    else if (mC >= 1000){
        // console.log("40%");
        // return 1.4;
        rates.push(1.4);
    }
    else{
        console.log("welcomeBonus unexpected error");
    }
    if (mC < 800){
        // console.log("30%");
        // return 1.3;
        rates.push(1.3);
    }
    else if (mC >= 800){
        // console.log("60%");
        // return 1.6;
        rates.push(1.6);
    }
    else{
        console.log("welcomeBonus unexpected error");
    }
    // console.log(rates);
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
        else{
            return value
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
        else{
            return value
        }
    }
}

function show(){
    let horizons = document.getElementById("horizons").value;
    let headers = document.getElementsByTagName("th");
    console.log(horizons);
    if(horizons=="10"){
        // set ten years results visible
        headers[3].style.display = ""
        headers[4].style.display = ""
        for(each of document.getElementsByClassName("money ten")){
            each.style.display = "";
        }
        for(each of document.getElementsByClassName("money dione")){
            each.style.display = "";
        }
        // set twenty years results invisible
        headers[5].style.display = "none"
        headers[6].style.display = "none"
        for(each of document.getElementsByClassName("money twenty")){
            each.style.display = "none";
        }
        for(each of document.getElementsByClassName("money ditwo")){
            each.style.display = "none";
        }
        
    }
    else if(horizons=="20"){
        // set ten years results invisible
        headers[3].style.display = "none"
        headers[4].style.display = "none"
        for(each of document.getElementsByClassName("money ten")){
            each.style.display = "none";
        }
        for(each of document.getElementsByClassName("money dione")){
            each.style.display = "none";
        }
        //  set twenty years results invisible
        headers[5].style.display = ""
        headers[6].style.display = ""
        for(each of document.getElementsByClassName("money twenty")){
            each.style.display = "";
        }
        for(each of document.getElementsByClassName("money ditwo")){
            each.style.display = "";
        }
        
    }
    else{
        console.log("horizons selection error.");
    }
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
        <th>10 Year Horizon</th>
        <th>Dividend</th>
        <th>20 Year Horizon</th>
        <th>Dividend</th>
    </tr>
    `;
    
    
    for(i in yearly1){
        let yearlyValue1=yearly1[i].toFixed(2);
        let yearlyValue2=yearly2[i].toFixed(2);
        let dividend1 = ((yearly1[i]*0.12)/12).toFixed(2);
        let dividend2 = ((yearly2[i]*0.12)/12).toFixed(2);
        let totalCommitment = (parseInt(i)+1)*(mC*12);

        // place commas
        yearlyValue1 = placeCommas(yearlyValue1);
        yearlyValue2 = placeCommas(yearlyValue2);
        dividend1 = placeCommas(dividend1);
        dividend2 = placeCommas(dividend2);
        totalCommitment = placeCommas(totalCommitment);

        display += `
        <tr  class="info" id="locate">
            <td class="year">Year ${parseInt(i)+1}</td>      
            <td>${parseInt(i)+parseInt(age)}</td>
            <td class="money">$${totalCommitment}</td>      
            <td class="money ten">$${yearlyValue1}</td>
            <td class="money dione">$${dividend1}</td>     
            <td class="money twenty">$${yearlyValue2}</td>      
            <td class="money ditwo">$${dividend2}</td>
        </tr>
        `;
    }
    document.getElementsByTagName("table")[0].innerHTML = display;
    show();
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
            totalInvested1 = (mC*12) * welcomeBonus(mC)[0] * 0.975 * ((sliderCheck()*0.01)+1);
            totalInvested2 = (mC*12) * welcomeBonus(mC)[1] * 0.975 * ((sliderCheck()*0.01)+1);
            yearly1.push(totalInvested1);
            yearly2.push(totalInvested2);

        }
        else if (count<=10){
            totalInvested1 = (yearly1[count-2]+(mC*12)) * 0.975 * ((sliderCheck()*0.01)+1);
            totalInvested2 = (yearly2[count-2]+(mC*12)) * 0.975 * ((sliderCheck()*0.01)+1);
            yearly1.push(totalInvested1);
            yearly2.push(totalInvested2);

        }
        else{
            totalInvested1 = yearly1[count-2] * 0.996 * ((sliderCheck()*0.01)+1);
            totalInvested2 = yearly2[count-2] * 0.996 * ((sliderCheck()*0.01)+1);
            yearly1.push(totalInvested1);
            yearly2.push(totalInvested2);

        }
    }

    displayValues(yearly1,yearly2,mC);
    
}


