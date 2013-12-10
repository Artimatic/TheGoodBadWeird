/**
 * Created by ChenCheng on 12/8/13.
 */

$(document).ready(function(){

    var param;
    var dataA = [];
    $results=$('#results');

    var html = "<h2>Your Surveys</h2>";
    $results.html(html);

    $("#log-in").html('<li><a href="#">Account</a><ol><li><a href="#">Logout</a></li></ol></li>');

        $.get('/acc', param, function(data){
            dataA = JSON.parse(data);
            for(var i=0; i<dataA.length; i++)
                html+='<a id="selectSurvey" href="#" class="btn btn-xs btn-default">'+dataA[i]+'</a><br>';
            $("#results").html(html);
        });

});