const week = ["日","月","火","水","木","金","土",];
const today = new Date();
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

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
    var year = date.getFullYear();
    var month = date.getMonth();
    document.querySelector('#header').innerHTML = year +"年" + (month +1)+ "月";

    var calendar = createProcess(year,month);
    document.querySelector('#calendar').innerHTML = calendar;
}

function createProcess(year,month) {
    var calendar = "<table><tr class='day0fWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    var count = 0;
    var startDay0fWeek = new Date(year, month, 1).getDay();
    var endDate = new Date(year, month +1, 0).getDate();
    var lastMonthEndDate = new Date(year, month, 0).getDate();
    var row = Math.ceil((startDay0fWeek + endDate) / week.length);

    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDay0fWeek) {
                calendar +="<td class='disabled'>" + (lastMonthEndDate - startDay0fWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                count++;
                calendar +="<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                count++;
                if(year == today.getFullYear()
                   && month == (today.getMonth())
                   && count == today.getDate()) {
                    calendar += "<td class='today'>" + count + "</td>";
                } else {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>"
    }
    return calendar;
}