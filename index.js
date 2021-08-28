function reversedStr(str) {
    var charList = str.split('');
    var reversedCharList = charList.reverse('');
    var reversed = reversedCharList.join('');

    return reversed;
}

function isPalindrome(str) {
    reverse = reversedStr(str);
    return str === reverse;
}

function convertDateToStrings(date) {
    dateStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStr.day = '0' + date.day
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString()

    return dateStr;
}

function AllDateFormat(date) {
    var dateStr = convertDateToStrings(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalidromeForAllDateFormats(date) {
    var listOfDates = AllDateFormat(date);

    var flag = false;

    for (var i = 0; i < listOfDates.length; i++) {
        if (isPalindrome(listOfDates[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100===0) {
        return false;
    }
    if (year % 4===0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    day= date.day + 1;
    month = date.month;
    year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month===2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month ++;
            }
        }
    }
    else{
    if(day > daysInMonth[month - 1]){
        day= 1;
        month++;
    }
}
    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
      }
}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalidromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ ctr, nextDate]
}


const dateInput = document.querySelector("#input")
const checkButton = document.querySelector("#check-btn")
const output = document.querySelector("#output")


function clickHandler(){
    var bdayStr = dateInput.value;
    if(bdayStr!==''){
        var listOfDate = bdayStr.split('-')
        var date={
            day : Number(listOfDate[2]),
            month :Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        var isPalindrome = checkPalidromeForAllDateFormats(date);
        if(isPalindrome){
            output.innerText = "yay! your birthday is Palindrome"
        }else{
            var[ctr, nextDate] = getNextPalindromeDate(date);
            output.innerText = `The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!`
        }
    }
 }

checkButton.addEventListener('click', clickHandler)
