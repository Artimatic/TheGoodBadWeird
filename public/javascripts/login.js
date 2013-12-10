/**
 * Created by ChenCheng on 12/10/13.
 */
window.loggedIn = false;
function setLoggedIn(){
    window.loggedIn = true;
}
function checkLogin(){
    return window.loggedIn;
}
$(document).ready(function() {
    if(window.loggedIn){
        //$("#log-in").html('<li><a href="/user">Account</a>');
        $("#log-in").html('<li><a href="#">Account</a><ol><li><a href="/SurveyResults/1">Your Surveys</a></li><li><a href="#">Your Info</a></li><li><a href="#">Logout</a></li></ol></li>');
    }
    else if(!window.loggedIn){
        $("#log-in").html('<li><a href="/Login">Login</a>');
    }
    $('#Log-in').click(function(event) {
        event.preventDefault();
        var URL = $("#myform").attr("action");
        var payload = $("[name=myform]").serializeArray();
        var test = {username:"Steve",pass:"123"};
        //Sends the user input and
        $.ajax({
            url: URL,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function(data, textStatus, jqXHR)
            {
                setLoggedIn();
                $("#result").html("<p>Logging in...</p>");
                $("#log-in").html('<li><a href="#">Account</a><ol><li><a href="/SurveyResults/1">Your Surveys</a></li><li><a href="#">Your Info</a></li><li><a href="#">Logout</a></li></ol></li>');

                window.location.replace("/user");
                //$("#log-in").html('<li><a href="/user">Account</a>');
            },
            error: function (data, textStatus, jqXHR)
            {
                if(data.responseText==="Bad Input")
                    $("#result").html(data.responseText+'<img  src="/stylesheets/img/stop.gif" alt="" width="240" height="130">');
                else if(data.responseText==="Incorrect Username/Password")
                    $("#result").html("<p>User/Password not found</p>");
                else if(data.responseText==="Fill in all fields")
                    $("#result").html("<p>Fill in all fields</p>");
            }
        });
    });

});
