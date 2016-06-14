
/* global $ */
/* global _ */


// globals
var isLeftDown = false
var isRightDown = false
var isMiddleDown = false
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
    $('#toggle-borders').click(function() {
        $('#sketchpad td').toggleClass('square-border')
        // $('#sketchpad td').css('border', '1px white solid')
    })
    
    $('#clear').click(function() {
        // $('#sketchpad td').removeClass
        $('#sketchpad td').css('background-color', 'white')
    })
    
    $('#new-button').click(function() {
        numSquaresAcross = prompt('Please enter a new skethpad size (no greater than 100):', numSquaresAcross)
        debugPrint(numSquaresAcross)
        if (numSquaresAcross) {
            createNewSketchpad() 
        }
        
    })
    
    // $('#color-button').click(function() {
    //     genRandomColor()
    // })
}



function colorSquare(event) {
    // debugPrint('color square called')
    
    
    if (event.type == 'mousedown') {
        // debugPrint('update buttons')
        // debugPrint(event)
        checkForMouseButtonsDown(event)
    }
    else{
        debugPrint(event)
        debugPrint(event.which)
    }
    
    if (isLeftDown) { 
        // color or darken square
        
        
        // get current color
        var oldColor = $(this).css('background-color')
        // debugPrint(typeof(oldColor))
        
        
        if (oldColor == 'rgb(255, 255, 255)') {
            // debugPrint('white')    
            $(this).css({'background-color': genRandomColor()})
        }
        else {
            // not white, darken it
            var oldColors = oldColor.match(/[\d]+/g)
            for (var i in oldColors) {
                var newNumber = parseInt(oldColors[i]) - amountToDarkenEachPass
                oldColors[i] = Math.max(0, newNumber)
            }
            var newColors = 'rgb('+ oldColors[0] +', '+ oldColors[1] +', '+ oldColors[2] +')'
            
            // debugPrint(newColors)
            $(this).css({'background-color': newColors})
        }
        
    } 
    else if (isMiddleDown) {
        // lighten/erase
        $(this).css('background-color', 'white')
    }
    
    // debugPrint('done w/ color square')
}

function checkForMouseButtonsDown(event) {
    // debugPrint('down: '+event.which)
    if (event.which == 1) {
        isLeftDown = true    
    }
    if (event.which == 2) {
        isMiddleDown = true    
    }
    if (event.which == 3) {
        isRightDown = true    
    }
}

function handleMouseButtons() {
    
    $('#sketchpad').mousedown(function() {
        // prevent drag and drop in the sketchpad
        // debugPrint('prevent dnd')
        event.preventDefault()
    })
    
    
    $(document).mousedown(checkForMouseButtonsDown)
    $(document).mouseup(function(event) {
        // debugPrint('up: '+event.which)
        if (event.which == 1) {
            isLeftDown = false    
        }
        if (event.which == 2) {
            isMiddleDown = false    
        }
        if (event.which == 3) {
            isRightDown = false    
        }
    })
    // $(document).contextmenu(function() {
    //     // prevent context menu
    //     event.preventDefault()
    //     debugPrint('prevent context menu')
    // })
    
    
}

function debugPrint(obj) {
    // var debugArea = $('#debug-area')
    debugArea.text(debugPrintLineNumber.toString() + ': ' + obj)
    console.log(obj)
    debugPrintLineNumber++
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
    
    // watch for mouse
    squares.mouseover(colorSquare)
    squares.mousedown(colorSquare)
}










