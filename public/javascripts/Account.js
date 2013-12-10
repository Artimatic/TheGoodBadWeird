/**
 * Created by ChenCheng on 12/8/13.
 */

$(document).ready(function(){

    var param;
    var dataA = [];
    var dataB = [];
    $results=$('#results');

    var html = "<h2>Your Surveys</h2>";
    $results.html(html);

    $("#log-in").html('<li><a href="#">Account</a><ol><li><a href="#">Logout</a></li></ol></li>');

        $.get('/acc', param, function(data1){
            dataA = JSON.parse(data1);
            //dataB = JSON.parse(data2);
            for(var i=0; i<dataA.length; i++){
               var str = unpackData(dataA[i])
                html+='<a id="selectSurvey" href="/SurveyForm/'+str[1]+' class="btn btn-xs btn-default">'+str[0]+'</a><br>';
            }
            $("#results").html(html);
        });

});

var unpackData = function(input){
    if(input!==undefined||input===null){
        var str = input;
        var res = str.split("|"); //Split by delimiter
        return res;
    }
    return undefined;
}
