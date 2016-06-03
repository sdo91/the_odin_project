
/* global _ */










// PROBLEM 1

// var text1 = document.querySelector('#p1-text')
var button1 = document.querySelector('#p1-button')
var answer1 = document.querySelector('#p1-answer')
var input1 = document.querySelector('#p1-input')

button1.onclick = function () {
    updateAnswer(p1, input1, answer1, button1)    
}




function updateAnswer(func, input, answer, button) {
    
    var defaultText = 'Answer:'
    
    if (answer.textContent === defaultText) {
        var param = parseInt(input.value)
        answer.textContent = 'Answer: ' + func(param)
        button.textContent = 'Hide'
    }
    else {
        answer.textContent = defaultText
        button.textContent = 'Solve'
    }
    
    
}


function p1(maxVal) {
    var sum = 0
    // var maxVal = 1000
    for (var i of _.range(maxVal)) {
        if (i % 3 === 0 || i % 5 === 0) {
            sum += i
        }
    }
    return sum
}









// PROBLEM 2


// var text2 = document.querySelector('#p2-text')
var button2 = document.querySelector('#p2-button')
var answer2 = document.querySelector('#p2-answer')
var input2 = document.querySelector('#p2-input')

// /*global testObject*/
// answer2.textContent = testObject.name


button2.onclick = function() {
    updateAnswer(p2, input2, answer2, button2)
}



function p2(maxVal) {
    var fib1 = 1
    var fib2 = 1
    // var maxVal = 4000000
    var sum = 0
    while (fib1 <= maxVal) {
        // add to sum if even
        if (fib1 % 2 === 0) {
            sum += fib1
        }
        // advance sequence
        var nextFib = fib1 + fib2
        fib1 = fib2
        fib2 = nextFib
    }
    return sum
}

















// PROBLEM 3


// var text3 = document.getElementById('p3-text')
var button3 = document.getElementById('p3-button')
var answer3 = document.getElementById('p3-answer')
var input3 = document.getElementById('p3-input')



button3.onclick = function() {
    updateAnswer(p3, input3, answer3, button3)
}

function p3(targetNum) {
    
    var root = Math.sqrt(targetNum)
    
    // read file
    var textfile = readLocalFile('primes_6Digits.txt')
    var lines = textfile.split('\n')
    
    // create set with all 6 digit primes
    var primeSet = new Set()
    for (var i in lines) {
        var tokens = lines[i].split(',')
        for (var j in tokens) {
            primeSet.add(parseInt(tokens[j]))
        }
    }
    
    // iterate thru primes
    var largestPrimeFactor = 0
    for (var primeNumber of primeSet) {
        if (primeNumber > root) {
            break // we're done
        }
        if (targetNum % primeNumber === 0) {
            largestPrimeFactor = primeNumber
        }
    }
    
    
    return largestPrimeFactor
}



function readLocalFile(filename) {
    var request = new XMLHttpRequest();
    request.open("GET", filename, false);
    request.send(null);
    return request.responseText;
} 



















// RESET BUTTON



var reset_button = document.getElementById('reset-button')

reset_button.onclick = function() {
    input1.value = 1000
    input2.value = 4000000
    input3.value = 600851475143
}





