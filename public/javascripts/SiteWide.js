/**
 * Created by ChenCheng on 12/9/13.
 */
function logIn()
{
    loggedIn=true;
}

//Actually not side wide. Only logged in users receive this script
//Timeout periods to determine if a user has logged out
function heartbeat(){
    setTimeout(function(){
        $.ajax({ url: "/thumpthump", cache: false,
            success: function(data){
                //Next beat
                heartbeat();
            }, dataType: "json"});
    }, 10000);//10secs
}
$(document).ready(function(){
    heartbeat();
});

