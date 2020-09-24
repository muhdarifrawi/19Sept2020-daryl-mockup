
document.getElementById("calculate").setAttribute("onclick","calculate()");
document.getElementById("returns").setAttribute("onchange","check()");
document.getElementById("returnsValue").innerText = "6%";

function check(){
    let returns = document.getElementById("returns").value;
    document.getElementById("returnsValue").innerText = returns + "%";
    console.log(returns);
}


function calculate(){
    let notification = document.getElementById("notification");
    let periods = document.getElementsByName("period");
    for(i=0;i<periods.length;i++){
        if(periods[i].checked){
            period = periods[i].value;
        }
    }
    let investYears = document.getElementById("investYears").value; 
    let mthContribute = document.getElementById("mthContribute").value; 
    let returns = document.getElementById("returns").value;
    
    console.log(returns);
    if (period=="" || mthContribute=="" || investYears==""){
        notification.innerHTML = "<h3>Please fill all fields</h3>"    
    }
    else if(investYears < 1 || investYears > 99){
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
