let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue =  document.querySelector('.day-value');

    let money, time; 
                                                     // money == "" - для того, чтобы пользователь не смог оставить пустую строку
    
    expensesBtn.disabled = false;
    countBtn.disabled = false;
    optionalExpensesBtn.disabled = true;

    //  Начать расчет

    startBtn.addEventListener('click', function() {
        time = prompt('Введите дату в формате YYYY-MM-DD', '');
        money = +prompt("Ваш бюджет на месяц?", '');
    
        while(isNaN(money) || money == "" || money == null) {   // isNaN - возвращает true в том случае, когда там есть цифры
            money = prompt("Ваш бюджет на месяц?", '');        // money == null - для того, чтобы пользователь не смог нажать "отмена"
        }
        appData.budget = money; // полученные данные записываем в глобальный объект
        appData.timeData = time;
        budgetValue.textContent = money.toFixed(); // округлим до целого числа
        yearValue.value = new Date(Date.parse(time)).getFullYear(); // Время будет обработано через парс и количество м.с. прошедших с 1970. если есть инпут, то работаем через value
        monthValue.value = new Date(Date.parse(time)).getMonth() + 1; // Ставим 1 для отображения 12 месяцев, вместо 11
        dayValue.value = new Date(Date.parse(time)).getDate(); // getDate день текущего месяца
    });

    //  Обязательные расходы

    expensesBtn.addEventListener('click', function() {
        let sum = 0;    // сумма всех ценников

        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;  // 1. Проверка, того, что входящие данные будут строкой
            if ((typeof(a)) === 'string' && 
                (typeof(a)) != null && 
                (typeof(b)) != null  // 2. Будет проверять на отмену prompt. Если пользователь отменит действие, то оно уже не выполнится
                && a != '' && b != '' && a.length < 50)  {
                console.log("Успешно");
                appData.expenses[a] = b;
                sum += +b;  // += (прибавляем каждый раз (+b - для того чтобы получить число, а не строку))
            } else {
                console.log("Ошибка");
                i--;    // (i = i - 1;)
            }
        }
        expensesValue.textContent = sum;
    });

    // Необязательные расходы
    
    optionalExpensesBtn.addEventListener('click', function() {
        for (let i = 0; i < optionalExpensesItem.length; i++) {
            let opt = optionalExpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; // (+=) - для динамического формирования
        }
    });

    // Расчет дневного бюджета

    countBtn.addEventListener('click', function() {

        if (appData.budget != undefined) {// != - не равно 
            appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
            dayBudgetValue.textContent = appData.moneyPerDay;

            if(appData.moneyPerDay < 100) {
                levelValue.textContent = "Минимальный уровень достатка";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Среднее уровень достатка";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Высокий уровень достатка";
            } else {
                levelValue.textContent = "Произошла ошибка";
            } 
        }   else {
            dayBudgetValue.textContent = "Произошла ошибка";
        }
        
    });

    // Стать возможного дохода, вводятся через запятую

    incomeItem.addEventListener('input', function() {  // change - работает только при нажатии за пределами
        let items = incomeItem.value;
        appData.income = items.split(', '); // Ответ пользователя, который мы превращаем из строки в массив split()
        incomeValue.textContent = appData.income; // все значения появляются в дополнительном доходе
    });

    // Переключатель накоплений

    checkSavings.addEventListener('click', function() {
			if (appData.savings == true) {	// если стоит в true, то мы выключим галчку
				appData.savings = false;
			} else {
				appData.savings = true;
			}
		});
        
    //  Сумма накоплений    
    
	sumValue.addEventListener('input', function() {
		if (appData.savings == true) {
			let sum = +sumValue.value,		// + преобразование в число
				percent = +percentValue.value;

			appData.monthIncome = sum/100/12*percent;
			appData.yearIncome = sum/100*percent;

			monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
			yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
		}
    });
    
    //  Процент накоплений

	percentValue.addEventListener('input', function() {
		if (appData.savings == true) {
			let sum = +sumValue.value,		// + преобразование в число
				percent = +percentValue.value;

			appData.monthIncome = sum/100/12*percent;
			appData.yearIncome = sum/100*percent;

			monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
			yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
		}
	});

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false,          // методы объекта appData   
};

// for (let key in appData) { 
//     console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
// }