document.getElementById("calculate").setAttribute("onclick","calculate()");



function calculate(){
    let notification = document.getElementById("notification");
    let amount = document.getElementById("amount").value;
    let age = document.getElementById("age").value; 
    let invest = document.getElementById("invest").value; 
    // console.log(amount);
    // stringCheck(amount);
    if (amount=="" || age=="" || invest==""){
        notification.innerHTML = "<h3>Please fill all fields</h3>"    
    }
    else if(stringCheck(amount)=="error A"){
        notification.innerHTML = "<h3>Please enter in 0.00 format</h3>" 
    }
    else if(stringCheck(amount)=="error B"){
        notification.innerHTML = "<h3>Please enter a value</h3>" 
    }
    else if(invest < 1 || invest > 99){
        notification.innerHTML = "<h3>Please enter years to invest from 1 to 99 years</h3>" 
        console.log("invest value error")
    }
    else if(age < 21 || age > 99){
        notification.innerHTML = "<h3>Please enter age between 21 to 99</h3>" 
        console.log("age value error")
    }
    else{
        notification.innerHTML = `<h3>${amount}</h3>`   
    }
}

function stringCheck(amount){
    // console.log(amount)
    let passingCount = 0;
    let excessiveDots = 0;

    console.log(amount.slice(-3,-2));
    
    if(amount.slice(-3,-2) != "."){
        return "error A";
    }

    for (i=0;i<amount.length;i++){
        // console.log(amount[i]);
        
        for (j=0;j<=9;j++){
            if (amount[i] == String(j)){
                console.log(String(j), amount[i], passingCount);
                passingCount += 1;
                break;
            }
            else if (amount[i] == "."){
                excessiveDots += 1;
                passingCount += 1;
                break;
            }
        }
        
    }
    if(passingCount <= 3 || excessiveDots > 1 ){
        console.log("type error", passingCount, excessiveDots);
        return "error B";
    }
}
