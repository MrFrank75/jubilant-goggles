

var apiBaseAddressToCall = "https://livio-guessomatic-server.azurewebsites.net";
var bearerToken = ""

function getToken(){
    $.ajax({
        url: "/.auth/me",
        cache: false,
        type: "GET",
        success: function(response) {
            bearerToken = response[0].access_token;
        },
        error: function(xhr) {
            console.error(xhr);
            console.error(xhr.responseText);
        }
    });
}

function startGame(){
    console.log("Bearer token is:" + bearerToken);
     $.ajax({
        url: apiBaseAddressToCall + "/startGame",
        cache: false,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Bearer', bearerToken);
        },
        success: function(response) {
            document.getElementById('playerGuid').value = response;
            document.getElementById('playButton').disabled = false;
            document.getElementById('revealSolution').disabled = false;
            document.getElementById('solution').innerText = '';
            document.getElementById('answer').innerText = ''; 
            document.getElementById('yourGuess').value ='';              
        },
        error: function(xhr) {
            console.log(xhr.responseText);
        }
    });

}

function tryYourLuck(){

    let guid = document.getElementById('playerGuid').value;
    let guess = document.getElementById('yourGuess').value;
    document.getElementById('answer').innerText = "Guessing...";

    $.ajax({
        url: apiBaseAddressToCall + "/tryYourLuck",
        data: { 
            "guid": guid, 
            "guess": guess 
        },
        cache: false,
        type: "GET",
        success: function(response) {
            let answerText = "0"
            if (response==0){
                answerText = "CORRECT! Press Start Game for a new match";
                document.getElementById('playButton').disabled = true;
                document.getElementById('revealSolution').disabled = true;
            }
            if (response==1){
                answerText = "Your number is greater than the solution...";
            }
            if (response==-1){
                answerText = "Your number is smaller than the solution...";
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

//set a global variable with the token
getToken();