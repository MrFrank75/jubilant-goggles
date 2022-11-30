// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var apiBaseAddressToCall = "http://localhost:5077";

function startGame(){
     $.ajax({
        url: apiBaseAddressToCall + "/startGame",
        cache: false,
        type: "GET",
        success: function(response) {
            document.getElementById('playerGuid').value = response;
            document.getElementById('playButton').disabled = false;
        },
        error: function(xhr) {
            alert(xhr.responseText);
        }
    });

}

function tryYourLuck(){

    let guid = document.getElementById('playerGuid').value;
    let guess = document.getElementById('yourGuess').value;

    $.ajax({
        url: apiBaseAddressToCall + "/tryYourLuck",
        data: { 
            "guid": guid, 
            "guess": guess 
        },
        cache: false,
        type: "GET",
        success: function(response) {
            alert(response);
        },
        error: function(xhr) {
            alert(xhr.responseText);
        }
    });
}