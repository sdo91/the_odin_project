
/* global $ */
/* global _ */


// globals
var isLeftDown = false
var isRightDown = false
var isMiddleDown = false
var debugArea = null
var maxSizeAcross = 512
var numSquaresAcross = 64


// basically the MAIN function
$(document).ready(function() {
    
    // set up debugging
    debugArea = $('#debug-area')
    debugPrint('dom ready')
    
    
    // mouse click checker
    trackMouseButtons()
    
    
    // create new table
    createTable()
    
    
    
    
    buttons()
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

function buttons() {
    $('#toggle-borders').click(function() {
        $('#sketchpad td').toggleClass('blackborder')
    })
    
    $('#clear').click(function() {
        $('#sketchpad td').removeClass('green')
    })
    
    $('#new-button').click(function() {
        numSquaresAcross = prompt('number of squares', 16)
        createTable()
    })
    
    $('#color-button').click(function() {
        genRandomColor()
    })
}

function watchSquares() {
    $('#sketchpad td').hover(colorSquare)
    
    function colorSquare() {
        if (!isMiddleDown) {
            // $(this).addClass('green')
            
            var oldColor = $(this).css('background-color')
            // debugPrint(typeof(oldColor))
            if (oldColor == 'rgb(255, 255, 255)') {
                // debugPrint('white')    
                $(this).css({'background-color': genRandomColor()})
            }
            else {
                // not white, darken
                var oldColors = oldColor.match(/[\d]+/g)
                for (var i in oldColors) {
                    var newNumber = parseInt(oldColors[i]) - 16
                    oldColors[i] = Math.max(0, newNumber)
                }
                var newColors = 'rgb('+ oldColors[0] +', '+ oldColors[1] +', '+ oldColors[2] +')'
                
                debugPrint(newColors)
                $(this).css({'background-color': newColors})
            }
            
        }
    }
}



function trackMouseButtons() {
    $(document).mousedown(function(event) {
        debugPrint('down: '+event.which)
        if (event.which == 1) {
            isLeftDown = true    
        }
        if (event.which == 2) {
            isMiddleDown = true    
        }
        if (event.which == 3) {
            isRightDown = true    
        }
    })
    $(document).mouseup(function(event) {
        debugPrint('up: '+event.which)
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
}

function debugPrint(obj) {
    // var debugArea = $('#debug-area')
    debugArea.text(obj)
}

function createTable() {
    
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
    
    // default border
    var squares = $('#sketchpad td')
    // squares.toggleClass('blackborder')
    var pixelsPerSquare = Math.floor(maxSizeAcross/numSquaresAcross)
    squares.css({'width': pixelsPerSquare, 'height': pixelsPerSquare})
    
    watchSquares()
}










