
$(document).ready(function() {
    if(window.loggedIn){
        //$("#log-in").html('<li><a href="/user">Account</a>');
        $("#log-in").html('<li><a href="#">Account</a><ol><li><a href="/SurveyResults/1">Your Surveys</a></li><li><a href="#">Your Info</a></li><li><a href="#">Logout</a></li></ol></li>');
    }
    else if(!window.loggedIn){
        $("#log-in").html('<li><a href="/Login">Login</a>');
    }

});
