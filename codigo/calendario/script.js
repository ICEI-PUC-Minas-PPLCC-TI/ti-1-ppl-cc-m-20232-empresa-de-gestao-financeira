const monthSelect = document.getElementById("month-select");
const calendarBody = document.getElementById("calendar-body");
const expenseSelect = document.getElementById("expense-select");
const expenseDescription = document.getElementById("expense-description");
const expenseAmount = document.getElementById("expense-amount");
const addExpenseButton = document.getElementById("add-expense");
const totalExpensesElement = document.getElementById("total-expenses");

let selectedYear = new Date().getFullYear();
let expenses = {};

function generateCalendar(year, month) {
    calendarBody.innerHTML = '';
    
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const currentMonth = startDate.getMonth();

    const numDaysInMonth = endDate.getDate();
    const firstDayOfWeek = startDate.getDay();
    
    let currentDate = new Date(startDate);
    currentDate.setDate(1 - firstDayOfWeek); // Início da semana

    for (let i = 0; i < 6; i++) { // 6 semanas no máximo
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) { // 7 dias por semana
            const cell = document.createElement('td');
            const date = currentDate.getDate();
            
            if (currentDate.getMonth() !== currentMonth) {
                cell.textContent = ''; // Não pertence a este mês
            } else {
                cell.textContent = date;
                const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${date}`;
            
                if (expenses[dateKey]) {
                    const expenseInfo = document.createElement('div');
                    expenseInfo.className = 'expense-info';
                    for (const expense of expenses[dateKey]) {
                        const expenseItem = document.createElement('div');
                        expenseItem.style.backgroundColor = getExpenseColor(expense.type);
                        expenseItem.textContent = `${expense.type}: R$ ${expense.amount.toFixed(2)}`;
                        expenseInfo.appendChild(expenseItem);
                    }
                    cell.appendChild(expenseInfo);
                }
                
                cell.dataset.date = dateKey;
                cell.dataset.expenseType = 'empty';
                cell.classList.add('selectable');
                cell.addEventListener('click', () => addExpense(dateKey));
            }

            row.appendChild(cell);
            currentDate.setDate(date + 1);
        }

        calendarBody.appendChild(row);

        if (currentDate.getMonth() !== currentMonth || currentDate.getDate() > numDaysInMonth) {
            break; // Fim do mês
        }
    }

    updateTotalExpenses();
}

function addExpense(dateKey) {
    const type = expenseSelect.value;
    const description = expenseDescription.value;
    const amount = parseFloat(expenseAmount.value);

    if (!expenses[dateKey]) {
        expenses[dateKey] = [];
    }
    expenses[dateKey].push({ type, description, amount });

    generateCalendar(selectedYear, monthSelect.value);
}

function updateTotalExpenses() {
    let total = 0;
    for (const date in expenses) {
        for (const expense of expenses[date]) {
            total += expense.amount;
        }
    }
    totalExpensesElement.textContent = `Total gasto este mês: R$ ${total.toFixed(2)}`;
}

function getExpenseColor(expenseType) {
    switch (expenseType) {
        case "lazer":
            return "blue";
        case "medico":
            return "red";
        case "comida":
            return "green";
        case "automovel":
            return "orange";
        case "casa":
            return "purple";
        default:
            return null;
    }
}
function updateTotalExpenses() {
    let total = 0;
    let lazerTotal = 0;
    let medicoTotal = 0;
    let comidaTotal = 0;
    let automovelTotal = 0;
    let casaTotal = 0;

    for (const date in expenses) {
        for (const expense of expenses[date]) {
            total += expense.amount;
            switch (expense.type) {
                case "lazer":
                    lazerTotal += expense.amount;
                    break;
                case "medico":
                    medicoTotal += expense.amount;
                    break;
                case "comida":
                    comidaTotal += expense.amount;
                    break;
                case "automovel":
                    automovelTotal += expense.amount;
                    break;
                case "casa":
                    casaTotal += expense.amount;
                    break;
            }
        }
    }

    totalExpensesElement.textContent = `Total gasto este mês: R$ ${total.toFixed(2)}`;
    document.getElementById("lazer-total").textContent = `Lazer: R$ ${lazerTotal.toFixed(2)}`;
    document.getElementById("medico-total").textContent = `Médico: R$ ${medicoTotal.toFixed(2)}`;
    document.getElementById("comida-total").textContent = `Comida: R$ ${comidaTotal.toFixed(2)}`;
    document.getElementById("automovel-total").textContent = `Automóvel: R$ ${automovelTotal.toFixed(2)}`;
    document.getElementById("casa-total").textContent = `Casa: R$ ${casaTotal.toFixed(2)}`;
}

monthSelect.addEventListener('change', () => {
    generateCalendar(selectedYear, monthSelect.value);
});

addExpenseButton.addEventListener('click', () => {
    const selectedDate = new Date(selectedYear, monthSelect.value, 1);
    addExpense(`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`);
});

generateCalendar(selectedYear, monthSelect.value);
