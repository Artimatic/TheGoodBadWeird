// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

function drawChart(question_number, answers){
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Answer');
    data.addColumn('number', 'Amount');

    var chart_rows;
    var chart_title;
    var chart_id;

    //Gets the case for rendering each chart. Unfortunately only the first survey is implemented.
    switch(question_number){
        case 1:
            chart_rows = ['Yes','No'];
            chart_title = 'Did you enjoy the class?';
            chart_id = 'chart1';
            break;
        case 2:
            chart_rows = ['5','10','15','20+'];
            chart_title = 'How many hours did you spend studying?';
            chart_id = 'chart2';
            break;
        case 3:
            chart_rows = ['Not much','A bit','A lot'];
            chart_title = 'How much did you learn?';
            chart_id = 'chart3';
            break;
        case 4:
            chart_rows = ['A','B','C','D or lower'];
            chart_title = 'What grade do you expect to get?';
            chart_id = 'chart4';
            break;
        case 5:
            chart_rows = ['Yes','Yes'];
            chart_title = 'Is Tim Richards the coolest?';
            chart_id = 'chart5';
            break;
    }

    // Add data to the chart
    function get_pairs(){
        var pairs = new Array();
        for(var i = 0; i < chart_rows.length; i++){
            pairs.push([chart_rows[i], answers[i]]);
        }
        return pairs;
    }
    data.addRows(get_pairs());

    // Set chart options
    var options = { 'title':chart_title,
        'width':600,
        'height':450,
        'is3D': true,
        'pieHole': 0.4};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById(chart_id));
    chart.draw(data, options);
}

function query(){

    var socket = io.connect();

    socket.on('stats', function (data) {
        console.log('Received Stats');

        var question_number = data.QuestionNumber;
        var answers = [data.Answer1, data.Answer2, data.Answer3, data.Answer4];
        console.log(answers[0]);
        console.log(answers[1]);
        console.log(answers[2]);
        console.log(answers[3]);

        drawChart(question_number, answers);
    });
};

$(document).ready(function(){
    query();
});