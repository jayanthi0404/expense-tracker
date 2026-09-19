let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];
// Add expense

let expenseForm = document.getElementById("expenseForm");

if(expenseForm){
    expenseForm.addEventListener("submit", function(event){
        event.preventDefault();
        let description = document.getElementById("description").value;
        let amount = document.getElementById("amount").value;
        let category = document.getElementById("category").value; 
        let date = document.getElementById("date").value;

        let expense = {
                id : Date.now(),
                description : description,
                amount : Number(amount),
                category : category,
                date : date
        };

        expenses.push(expense);
        history.push(expense);
        localStorage.setItem("expenses",JSON.stringify(expenses));
        localStorage.setItem("history",JSON.stringify(history));
        window.location.href = "index.html";
        
    });
}

//cancel
function goBack(){
    window.location.href = "index.html";
}

//ADD extra SALARY
function addSalary() {
    let extra = prompt("Enter your extra salary:");

    if (extra !== null && extra !== "") {

        extra = Number(extra);
        let oldExtra = Number(localStorage.getItem("extra"))||0;
        let totalExtra = oldExtra + extra;
        
        localStorage.setItem("extra", totalExtra);
    }
    if(expenseBody){
        displayExpenses();
    }
}

//SALARY
function salary() {

    let salary = prompt("Enter your monthly salary:");

    if (salary !== null && salary !== "") {

        salary = Number(salary);

        localStorage.setItem("salary", salary);
    }
    if(expenseBody){
        displayExpenses();
    }
}


//history
let historyBody = document.getElementById("historyBody");
let nrows = document.getElementById("nrows");
if(historyBody){
    displayHistory();
}
function displayHistory(){
    historyBody.innerHTML = "";
    history.forEach((expense,index) => {
        
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index+1}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
        `;
        historyBody.appendChild(row);
    });
    nrows.innerHTML= history.length;

}


//display expences

let expenseBody = document.getElementById("expensebody");
let rows = document.getElementById("rows");
if(expenseBody){
    displayExpenses();
}

function displayExpenses(){
    expenseBody.innerHTML = "";
    let total = 0;
    let salary = Number(localStorage.getItem("salary")) || 0;
    let extra = Number(localStorage.getItem("extra")) || 0;
    
    totalIncome=salary + extra;
    

    document.getElementById("total-income").innerText = "Rs. " + totalIncome;

    document.getElementById("monthly-salary").innerText = "Rs. " + salary;

    document.getElementById("extra-income").innerText = "Rs. " + extra;    

    expenses.forEach((expense,index) => {
        total += expense.amount;
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index+1}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td>
                <button onClick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;
        expenseBody.appendChild(row);
    });
    rows.innerHTML = expenses.length;

    document.getElementById("total-expenses").innerText = "RS. "+ total;
    let balance = totalIncome - total;
    document.getElementById("balance").innerText = "RS. "+ balance;
    document.getElementById("extra-income").innerText = "RS. "+ extra;
    document.querySelector(".expense-table>h3").innerText = "Total rows: "+ expense.length;
    
}

//delete

function deleteExpense(id){
    if (confirm("Are you sure you want to delete this expense?")) {

        expenses = expenses.filter((expense) => {
            return expense.id !== id;
        });

        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );

        if(expenseBody){
            displayExpenses();
        }
    }
}

