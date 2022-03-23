const week = ["日","月","火","水","木","金","土",];
const today = new Date();

let showDate = new Date(today.getFullYear(), today.getMonth(), 1);

window.onload = function () {
    showProcess(today, calendar);
}

function prev() {
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

function next() {
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

function showProcess(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    document.querySelector('#header').innerHTML = year +"年" + (month +1)+ "月";

    let calendar = createProcess(year,month);
    document.querySelector('#header').innerHTML = calendar;
}

function createProcess(year,month) {
    let calendar = "<table><tr class='day0fWeek'>";
    for (let i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    let count = 0;
    let startDay0fWeek = new Date(year, month, 1).getDay();
    let endDate = new Date(year, month +1, 0).getDay();
    let lastMonthEndDate = new Date(year, month, 0).getDay();
    let row = Math.ceil((startDay0fWeek + endDate) / week.length);

    for (let i = 0; i < row; i++) {
        calendar += "<tr>";
        for (let j = 0; j < week.length; j++) {
            if (i == 0 && j < startDay0fWeek) {
                calendar +="<td class='disabled'>" + (lastMonthEndDate - startDay0fWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                count++;
                calendar +="<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                count++;
                if(year == today.getFullYear() && month == today.getMonth() &&  count == today.getDate()) {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>"
    }
    return calendar;
}