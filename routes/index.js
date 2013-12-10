var online =new Array();
var user ="";
var mysql = require('mysql');
var exclusiveSurvey = false;
/*
* meant to provide template for survey route
*/
function survey_template(req){

    var id = parseInt(req.params.IDNum);
    var questions = new Array();
    var options = new Array();
    var title;
    var description;
    exclusiveSurvey = false;
    var theLogVal = "";
    //Configures the variables for each different survey
    switch(id){

        case 1:
            title = 'Generic Class Survey';

            description = 'What did you think of the class?';

            questions.push('Did you enjoy the class?');
            questions.push('How many hours did you spend studying?');
            questions.push('How much did you learn?');
            questions.push('What grade do you expect to get?');
            questions.push('Is Tim Richards the coolest?');

            options.push(['Yes','No']);
            options.push(['5','10','15','20+']);
            options.push(['Not much','A bit','A lot']);
            options.push(['A','B','C','D or lower']);
            options.push(['Yes','Yes']);
            break;
        case 2:
            title = 'Departmental Tour';

            description = 'Thank you for taking a tour of the School of Computer Science! Please take some time to fill out this survey.';

            questions.push('Are you a male or female?');
            questions.push('How old will you be if you attend the School of Computer Science in the Fall?');
            questions.push('How did you find out about the tour?');
            questions.push('How was the length of the tour?');
            questions.push('Do you think you will be attending the School of Computer Science after this tour?');

            options.push(['Male', 'Female']);
            options.push(['18','19','20','21+']);
            options.push(['UMass CS Website', 'University Tour', 'Friend', 'Other']);
            options.push(['Long','Just Right','Short']);
            options.push(['Yes','No','Undecided']);
            break;
        case 3:
           //space for 3rd survey
            break;
        case 4:
            //space for 4th survey
            break;
        default:
            theLogVal = sanitizeLogin(req.params.IDNum);
            if(theLogVal === null||theLogVal===undefined) return;
            else{
                exclusiveSurvey=true;
            }
            return theLogVal;


    }
if(exclusiveSurvey){
    /*
  var jsonObj = fetchDesc(theLogVal);
    if(jsonObj===undefined||jsonObj ===null) return jsonObj;
    else{
        fetchSurvey(10);
    }
    */

}else{
    var jsonObj = {
        title: title,
        description: description,
        questions: questions,
        options: options
    }

    return jsonObj;
}
}
//Queries a database for a description using log value
function fetchDesc(theLogVal){
    //Queries database for a query that will get the exclusive survey...QUERY INCEPTION DUNDUNDUN
    connection.query("SELECT u.descr FROM users_in_session AS u WHERE u.logVal='"+theLogVal+"';", function(err, rows){
        if(err) throw err;
        if(rows[0]!==undefined&&rows[0]!==null&&rows[0].descr!==null&&rows[0].descr!==undefined){
            console.log("PERFORMING QUERY: " + rows[0].descr);
            var sid=rows[0].descr;
            var json = fetchSurvey(sid);
            return json;
        }
    });
}
//Queries database for a Survey using sid
function fetchSurvey(sid){
    var questions = new Array();
    var options = new Array();
    var title;
    var description;
    connection2.query("SELECT s.sname, s.instructions, q.questions_hash FROM surveys AS s, surveyQuestions AS q WHERE s.sid="+sid+" AND s.sid = q.sid;", function(err, rows){
        if(err) throw err;
        if(rows[0]!==undefined&&rows[0]!==null&&rows[0].sname!==null&&rows[0].sname!==undefined)
            if(rows[0]!==undefined&&rows[0]!==null&&rows[0].instructions!==null&&rows[0].instructions!==undefined)
                if(rows[0]!==undefined&&rows[0]!==null&&rows[0].questions_hash!==null&&rows[0].questions_hash!==undefined){
                    title= rows[0].sname;
                    description = rows[0].instructions;

                    questions.push(rows[0].questions_hash);
                    questions.push('Filler');
                    questions.push('Filler');
                    questions.push('Filler');
                    questions.push('Filler');

                    options.push(['Yes','No']);
                    options.push(['Filler']);
                    options.push(['Filler']);
                    options.push(['Filler']);
                    options.push(['Filler']);


                }
        console.log("SENDING "+title+description+questions+options);
        var jsonObj = {
            title: title,
            description: description,
            questions: questions,
            options: options
        }
        return jsonObj;
    });
}
/*
 * meant to provide template for results route. not totally functional.
 */
function results_template(req){
    var id = parseInt(req.params.IDNum);
    var questions = new Array();
    var options = new Array();
    var title;

    //Configures the variables for each different survey
    switch(id){
        case 1:
            title = 'Generic Class Survey Results';

            questions.push('Did you enjoy the class?');
            questions.push('How many hours did you spend studying?');
            questions.push('How much did you learn?');
            questions.push('What grade do you expect to get?');
            questions.push('Is Tim Richards the coolest?');

            options.push(['Yes','No']);
            options.push(['5','10','15','20+']);
            options.push(['Not much','A bit','A lot']);
            options.push(['A','B','C','D or lower']);
            options.push(['Yes','Yes']);
            break;
        case 2:
            title = 'Departmental Tour Results';

            questions.push('Are you a male or female?');
            questions.push('How old will you be if you attend the School of Computer Science in the Fall?');
            questions.push('How did you find out about the tour?');
            questions.push('How was the length of the tour?');
            questions.push('Do you think you will be attending the School of Computer Science after this tour?');

            options.push(['Male', 'Female']);
            options.push(['18','19','20','21+']);
            options.push(['UMass CS Website', 'University Tour', 'Friend', 'Other']);
            options.push(['Long','Just Right','Short']);
            options.push(['Yes','No','Undecided']);

            break;
        case 3:
            //option for 3rd survey
            break;
        case 4:
            //option for 4th survey
            break;
    }

    var jsonObj = {
        title: title,
        questions: questions,
        options: options
    }

    return jsonObj;
}

exports.index = function(req, res){
	res.render('HomePage', { title: 'UMass CS Surveys'});
};

//Serve the survey
exports.surveyForm = function(req, res){

    var surveyObj = survey_template(req);
    console.log("Sending: "+JSON.stringify(surveyObj));
    //Returns the answers
	var q1 = sanitizeSurveyData(req.query.q1);
	var q2 = sanitizeSurveyData(req.query.q2);
	var q3 = sanitizeSurveyData(req.query.q3);
    var q4 = sanitizeSurveyData(req.query.q4);
    var q5 = sanitizeSurveyData(req.query.q5);

	//If we dont have all the answers.
	if(q1 === undefined || q2 === undefined || q3 === undefined || q4 === undefined || q5 === undefined){
        if(exclusiveSurvey){
        //Queries database for a query that will get the exclusive survey...QUERY INCEPTION DUNDUNDUN
        connection.query("SELECT u.descr FROM users_in_session AS u WHERE u.logVal='"+surveyObj+"';", function(err, rows){
            if(err) throw err;
            if(rows[0]!==undefined&&rows[0]!==null&&rows[0].descr!==null&&rows[0].descr!==undefined){
                console.log("PERFORMING QUERY: " + rows[0].descr);
                var sid=rows[0].descr;

                var questions = new Array();
                var options = new Array();
                var title;
                var description;
                connection2.query("SELECT s.sname, s.instructions, q.questions_hash FROM surveys AS s, surveyQuestions AS q WHERE s.sid="+sid+" AND s.sid = q.sid;", function(err, rows){
                    if(err) throw err;
                    if(rows[0]!==undefined&&rows[0]!==null&&rows[0].sname!==null&&rows[0].sname!==undefined)
                        if(rows[0]!==undefined&&rows[0]!==null&&rows[0].instructions!==null&&rows[0].instructions!==undefined)
                            if(rows[0]!==undefined&&rows[0]!==null&&rows[0].questions_hash!==null&&rows[0].questions_hash!==undefined){
                                title= rows[0].sname;
                                description = rows[0].instructions;

                                questions.push(rows[0].questions_hash);
                                questions.push('Filler');
                                questions.push('Filler');
                                questions.push('Filler');
                                questions.push('Filler');

                                options.push(['Yes','No']);
                                options.push(['Filler']);
                                options.push(['Filler']);
                                options.push(['Filler']);
                                options.push(['Filler']);


                            }
                    console.log("SENDING "+title+description+questions+options);
                    var jsonObj = {
                        title: title,
                        description: description,
                        questions: questions,
                        options: options
                    }
                    res.render('SurveyForm', jsonObj);
                });
                //console.log("SENDING "+title+description+questions+options);
                //console.log("SENDING "+JSON.stringify(json));

            }
        });
        }
        else{
        res.render('SurveyForm', surveyObj);
        }
	}else{
        console.log("Logged Answers: " + q1 +","+ q2 +","+ q3+","+ q4+","+ q5);
        connection.query("insert into departmentalTours(user_name, student, ans1, ans2, ans3, ans4, ans5) value('anon', true, '"+q1+"', '"+q2+"','"+q3+"','"+q4+"','"+q5+"');");
        res.redirect('/');
	}
};
exports.exclusiveSurvey = function(req, res){
    var surveyObj = survey_template(req);
};
exports.surveyResults = function(req, res){
    var resultObj = results_template(req);
    res.render('SurveyResults', resultObj);
};


exports.login = function(req, res){
	res.render('Login', {title: 'Login'});
};
exports.auth = function(req, res){
    //Checks input
    var username = sanitizeLogin(req.body[0].value);
    var password = sanitizeLogin(req.body[1].value);
    if(checkLogin(req.body[0].value)){
        console.log("Bad Input Detected");
        res.send(500, 'Bad Input');
        //res.send({jqXHR: true, textStatus:"Unable to Process Your Request", errorThrown: true});
    }
    else if(username===null||password===null){
        res.send(500, 'Fill in all fields');
    }
    else{
        //Queries database for user and password
    connection.query("SELECT u.id FROM users AS u WHERE u.accName='"+username+"' AND u.passHash='"+password+"';", function(err, rows){
        if(err) throw err;
        if(rows[0]!==undefined&&rows[0]!==null&&rows[0].id!==null&&rows[0].id!==undefined){
            online.push(rows[0].id);
            console.log("User " + rows[0].id+" logged in");
            user=rows[0].id;
            res.redirect('/');
        }
        else{
            console.log("Attempted login:"+username+'/'+password);
            res.send(500, 'Incorrect Username/Password');
        }
    });
    }
    console.log(username);
    console.log(password);
};

function loggedIn(){
    return true;
}
exports.loggedin = function(req, res){
    if(!loggedIn()) res.render('HomePage', { title: 'UMass Computer Science'});

    //Current date, to place a log of user login time (used for timeouts when user login time > current time+10)
    var currentdate = new Date();
    var datetime = currentdate.getFullYear()+"-"+(currentdate.getMonth()+1)+"-"+(currentdate.getDate()+1)+" "+ + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    var userSurveys = new Array();
    var surveyIds = new Array();
    var surveysJson;
    //Log value points to a query that is stored in the database
    var logVals = new Array();
    //Find the user's surveys
    connection.query("select s.sname, us.sid from surveys s, user_surveys_in_session us where us.sid = s.sid and us.id='"+user+"'; ", function(err, rows){
        if(err) throw err;
        for(var i = 0; i<rows.length; i++){
            console.log(rows[i].sname);
            console.log(rows[i].sid);
            userSurveys.push(rows[i].sname);
            surveyIds.push(rows[i].sid);
        }
        connection2 = mysql.createConnection({
            host: HOST,
            port: PORT,
            user: MYSQL_USER,
            password: MYSQL_PASS,
        });

        connection2.connect();
        connection2.query('use ' + DATABASE);

        console.log("Entries in results: " + userSurveys.join());

        //Stores each potential query in the database so that a query may be fetched using a query... Query inception
        for(var j = 0; j<rows.length; j++){
            console.log("Add "+surveyIds[j]);
            //var html = "select u.descr from users_in_session u where u.logVal =";
            var html = surveyIds[j];
            var logVal = Math.floor((Math.random()*1000000)+1);
            logVals.push(logVal);
            console.log("Current user "+parseInt(user));
            var num = parseInt(user);

            connection2.query("insert into users_in_session(id, logTime, descr, logVal) values ("+num+",'"+datetime+"','"+surveyIds[j]+"','"+logVal+"');", function(err, rows){

                if(err) throw err;
            });

                //"insert into users_in_session(id, logTime, descr, logVal) values ("+user+","+datetime+","+savedQuery+","+logVaL+")";
        }
        var package = new Array();
        for(var k=0; k<userSurveys.length; k++){
            package.push(userSurveys[k]+"|"+logVals[k]);
        }
        console.log("Packaging "+userSurveys.join());
        surveysJson = JSON.stringify(userSurveys);
        var logJson = JSON.stringify(logVals);
        var bigPackage = JSON.stringify(package);
        console.log("Sending "+surveysJson);
        console.log("Sending "+logJson);
        //res.render('LoggedIn', { title: 'Your Surveys'});
        res.send(bigPackage);
    });

}
exports.user =function(req,res){
    res.render('LoggedIn', { title: 'Your Surveys'});
}
exports.placeHolder = function(req, res){
    res.render('PlaceholderView', { title: 'Loggin In...'});
}
//Check if restricted symbols are being used. Return true if they are in the input
var checkLogin = function(input){
    if(input===undefined||input===null) return true;
    var regex= new RegExp(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/);
    return regex.test(input);
}

//Picks out only letters and numbers from the input
var sanitizeLogin = function(input){
    if(input===undefined||input===null) return null;
    var regex = new RegExp(/\w+[0-9]*/);   // sanitize input
    var result = input.match(regex);
    if(result) return result[0];
    else return null;
}


var sanitizeSurveyData = function(input){
    if(input!==undefined||input===null){
        var regex = new RegExp(/[abcde]{1}[0-9]{1}/);   // sanitize input
        if(regex.test(input)){
            return input;
        }
        else
            return 0;
    }
    return undefined;
}


//MYSQL
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';         // This is the name of an admin account on your MySQL server.
var MYSQL_PASS = 'Austin3:16';     // This is the password of that account.
var DATABASE = 'surveyappdb';    // This is the name of the database

connection = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

connection.connect();
connection.query('use ' + DATABASE);
connection2 = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

connection2.connect();
connection2.query('use ' + DATABASE);