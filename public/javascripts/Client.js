$(document).ready(function() {
    $('#Log-in').click(function(event) {
        event.preventDefault();
        var URL = $("#myform").attr("action");
        var payload = $("[name=myform]").serializeArray();
        var test = {username:"Steve",pass:"123"};
        $.ajax({
                url: URL,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(payload),
        success: function(data, textStatus, jqXHR)
        {
            window.location.replace("/user");
        },
        error: function (data, textStatus, jqXHR)
        {
            if(data.responseText==="Bad Input")
                $("#result").html(data.responseText+'<img  src="/stylesheets/img/stop.gif" alt="" width="240" height="130">');
            else
                $("#result").html("<p>User not found/Password is incorrect</p>");
        }
    });
});

});
