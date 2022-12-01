

var apiBaseAddressToCall = "http://localhost:5077";

function startGame(){
     $.ajax({
        url: apiBaseAddressToCall + "/startGame",
        cache: false,
        type: "GET",
        success: function(response) {
            document.getElementById('playerGuid').value = response;
            document.getElementById('playButton').disabled = false;
            document.getElementById('revealSolution').disabled = false;
            document.getElementById('solution').innerText = '';
            document.getElementById('answer').innerText = ''; 
            document.getElementById('yourGuess').value ='';              
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
            let answerText = "Wrong answer"
            if (response==true){
                answerText = "CORRECT! Press Start Game for a new match";
                document.getElementById('playButton').disabled = true;
                document.getElementById('revealSolution').disabled = true;
            }
            document.getElementById('answer').innerText = answerText;
        },
        error: function(xhr) {
            alert(xhr.responseText);
        }
    });
}

function revealSolution(){

    let guid = document.getElementById('playerGuid').value;

    $.ajax({
        url: apiBaseAddressToCall + "/revealSolution",
        data: { 
            "guid": guid, 
        },
        cache: false,
        type: "GET",
        success: function(response) {
            document.getElementById('solution').innerText = response;
        },
        error: function(xhr) {
            alert(xhr.responseText);
        }
    });
}