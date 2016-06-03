


/*global $*/



// $('input').focus(function() {
//     $('#search-box-div').addClass("searchbox-focus");
// });

// $('input').blur(function() {
//     $('#search-box-div').removeClass("searchbox-focus");
// });




$('#search-box-div').focusin(function() {
    $('#search-box-div').addClass("searchbox-focus");
});

$('#search-box-div').focusout(function() {
    $('#search-box-div').removeClass("searchbox-focus");
});





