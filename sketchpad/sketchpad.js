
/* global $ */
/* global _ */


// globals
// var isLeftDown = false
// var isRightDown = false
// var isMiddleDown = false
var debugArea = null
var maxSizeAcross = 512
var numSquaresAcross = 16
var amountToDarkenEachPass = 16
var debugPrintLineNumber = 0


// basically the MAIN function
$(document).ready(function() {
    
    // set up debugging
    debugArea = $('#debug-area')
    debugPrint('dom ready')
    
    
    // mouse click checker
    handleMouseButtons()
    
    
    // create new sketchpad
    createNewSketchpad()
    
    
    
    
    initButtons()
})

function genRandomColor() {
    var max = 0x01 + 0xffffff
    var color = Math.floor(Math.random() * max)
    color = color.toString(16)
    while (color.length < 6) {
        color = '0'+color
    }
    color = '#' + color
    // debugPrint(color)
    return color
}

function initButtons() {
    $('#borders-button').click(function() {
        $('#sketchpad td').toggleClass('square-border')
        // $('#sketchpad td').css('border', '1px white solid')
    })
    
    $('#clear-button').click(function() {
        // $('#sketchpad td').removeClass
        setSquareColor($('#sketchpad td'), 'white')
    })
    
    $('#new-button').click(function() {
        var userInput = prompt('Please enter a new sketchpad size (no greater than 100):', numSquaresAcross)
        userInput = parseInt(userInput)
        
        if (userInput) {
            
            if (userInput > 100) {
                userInput = 100
            }
            else if (userInput < 1) {
                userInput = 1
            }
            
            debugPrint('parsed input: ' + userInput)
            
            numSquaresAcross = userInput
            createNewSketchpad() 
        }
        
    })
    
    
    
}

function getSelectedColor() {
    var selectedColor = $('#color-select').val()
    // debugPrint(selectedColor)
    if (selectedColor == 'random') {
        return genRandomColor()
    }
    else {
        return selectedColor
    }
}

function colorSquare(event) {
    // debugPrint('color square called')
    
    
    if (event.which == 1) { 
        // left button down
        // color or darken square
        
        
        // get current color
        var oldColor = $(this).css('background-color')
        // debugPrint(typeof(oldColor))
        
        var isOverwriteChecked = $('#overwrite-checkbox').prop('checked')
        if (oldColor == 'rgb(255, 255, 255)' || isOverwriteChecked) {
            // debugPrint('was white')
            
            setSquareColor($(this), getSelectedColor())
        }
        else {
            // not white, darken it (or not)
            var isDarkenChecked = $('#darken-checkbox').prop('checked')
            if (!isDarkenChecked) {
                return
            }
            
            var oldColors = oldColor.match(/[\d]+/g)
            for (var i in oldColors) {
                var newNumber = parseInt(oldColors[i]) - amountToDarkenEachPass
                oldColors[i] = Math.max(0, newNumber)
            }
            var newColors = 'rgb('+ oldColors[0] +', '+ oldColors[1] +', '+ oldColors[2] +')'
            
            setSquareColor($(this), newColors)
        }
        
    } 
    else if (event.which == 2) {
        // middle button down
        // lighten/erase
        
        setSquareColor($(this), 'white')
    }
    
    // debugPrint('done w/ color square')
}

function setSquareColor(jQueryObj, color) {
    jQueryObj.css('background-color', color)
    debugPrint(color)
}


function handleMouseButtons() {
    
    // prevent drag and drop in the sketchpad
    $('#sketchpad').mousedown(function() {
        // debugPrint('prevent dnd')
        event.preventDefault()
    })
    
    
    
    
    // prevent context menu
    // $(document).contextmenu(function() {
    //     event.preventDefault()
    //     debugPrint('prevent context menu')
    // })
    
    
}




function createNewSketchpad() {
    
    
    // remove old table
    $('table').remove()
    
    // add empty new one
    var newTable = $('<table></table>')
    $('#sketchpad').append(newTable)
    newTable = $('table')
    
    // add squares
    for (var row in _.range(numSquaresAcross)) {
        var newRow = $('<tr></tr>')
        newTable.append(newRow)
        
        for (var col in _.range(numSquaresAcross)) {
            var newSquare = $('<td></td>')
            newRow.append(newSquare)    
        }
    }
    
    // get squares
    var squares = $('#sketchpad td')
    
    // set size of squares
    var pixelsPerSquare = Math.floor(maxSizeAcross/numSquaresAcross)
    squares.css({'width': pixelsPerSquare, 'height': pixelsPerSquare})
    
    // turn on borders?
    squares.addClass('square-border')
    
    // watch for mouse click/movement
    squares.mouseover(colorSquare)
    squares.mousedown(colorSquare)
}


function debugPrint(obj) {
    // var debugArea = $('#debug-area')
    debugArea.text(debugPrintLineNumber.toString() + ': ' + obj)
    console.log(obj)
    debugPrintLineNumber++
}







