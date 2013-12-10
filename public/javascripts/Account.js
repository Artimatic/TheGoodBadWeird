/**
 * Created by ChenCheng on 12/8/13.
 */

$(document).ready(function(){
    $("#log-in").html('<li><a href="#">Account</a><ol><li><a href="/SurveyResults/1">Your Surveys</a></li><li><a href="#">Your Info</a></li><li><a href="#">Logout</a></li></ol></li>');

    var param;
        var dataA = [];
        var tmp;
            $results=$('#results');
            $.get('/new', param, function(data){
                var selectedItem = false;
                var selected;
                var selected2
                var num1;
                var num2;
                $results.html(data);

                dataA = JSON.parse(data);
                $('#zero').text(dataA[0]).data("actNum",dataA[0]);
                $('#one').text(dataA[1]).data("actNum",dataA[1]);
                $('#two').text(dataA[2]).data("actNum",dataA[2]);
                $('#three').text(dataA[3]).data("actNum",dataA[3]);
                $('#four').text(dataA[4]).data("actNum",dataA[4]);
                $('#five').text(dataA[5]).data("actNum",dataA[5]);
                $('#six').text(dataA[6]).data("actNum",dataA[6]);
                $('#seven').text(dataA[7]).data("actNum",dataA[7]);
                $('#eight').text(dataA[8]).data("actNum",dataA[8]);
                $('#nine').text(dataA[9]).data("actNum",dataA[9]);
                $('#ten').text(dataA[10]).data("actNum",dataA[10]);

                $('box').click(function(){
                    if(!selected){
                        selected = this;
                        $(selected).animate({
                            backgroundColor: "#aa0000",
                            top: "100",
                            color: "#fff"
                        }, 500 );
                        selectedItem = true;
                        num1 = $(selected).data("actNum");
                    }
                    else if(selected){

                        num2 = $(this).data("actNum");
                        var curr = this;
                        selectedItem = !selectedItem;
                        $(curr).animate({
                            backgroundColor: "#aa0000",
                            top: "100",
                            color: "#fff"
                        }, 500 );
                        $(selected).animate({
                            backgroundColor: "black",
                            bottom: "100",
                            color: "white"
                        }, 500 );

                        $(curr).animate({
                            backgroundColor: "black",
                            bottom: "100",
                            color: "white"
                        }, 500 );

                        var socket = io.connect();
                        socket.on('news', function (data) {
                            console.log(data);
                            socket.send('YOU DONE FUCKED UP NOW');
                            console.log(num1,num2);
                            socket.emit(num1, num2);
                            io.sockets.in('room').send('Hello, Room!');
                        });

                        $(selected).text(num2);
                        $(curr).text(num1);
                        $(selected).data("actNum", num2);
                        $(curr).data("actNum", num1)
                        $(selected).load(selected);
                        $(curr).load(this);
                        selectedItem = false;
                        selected = undefined;
                        if($('#zero').data("actNum") == 0)
                            if($('#one').data("actNum") ==1)
                                if($('#two').data("actNum")==2)
                                    if($('#three').data("actNum")==3)
                                        if($('#four').data("actNum")==4)
                                            if($('#five').data("actNum")==5)
                                                if($('#six').data("actNum")==6)
                                                    if($('#seven').data("actNum")==7)
                                                        if($('#eight').data("actNum")==8)
                                                            if($('#nine').data("actNum")==9)
                                                                if($('#ten').data("actNum")==10){
                                                                    alert("You've Won!")
                                                                    location.reload();
                                                                }
                    }


                });
                /*
                 if(data instanceof Array){
                 $results.html(dataTemplate({resultsArray:data}));
                 } else {
                 $results.html(data);
                 };
                 */
            });



});