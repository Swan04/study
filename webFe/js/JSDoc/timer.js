/**
 * @author Administrator
 */


function closeCalender(){
	var timerCalender = document.getElementById("dateText");
	timerCalender.innerHTML = "";
	
}

function drawCalender(sYear,sMonth){
	var newDate;
	if(arguments[0] == null || arguments[1] == null){
		newDate = new Date();
	}
	else {
		newDate = new Date(sYear,sMonth - 1);
	}
	var date_year = newDate.getFullYear();
	var date_month = newDate.getMonth() + 1;
	var date_today = newDate.getDay();
	var date_day = newDate.getDay();
	
	var nextMonth = date_month + 1;
	var nextYear = date_year;
	var prevMonth = date_month - 1;
	var prevYear = date_year;
	if(sMonth == 12){
		nextMonth = 1;
		nextYear = date_year + 1;
	}
	if(sMonth == 1){
		prevMonth = 12;
		prevYear = date_year - 1;
	}
	var calenderTable = "";
	calenderTable += '<table width="150" border="0"' + 'cellpadding="0" cellspacing="1"' + 'style="background-color:#0066FF;text-align:center;">';
	calenderTable += '<tr style="background-color:#339999;">';
}
