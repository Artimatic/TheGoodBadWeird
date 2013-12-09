var answers = new Array();
function collect (){
    $(document).ready(function(){
        //This extracts the values out of the form according to JQuery documentation

        var q1 = $('input:radio[name=q1]:checked').val();
        answers.push(q1);
        var q2 = $('input:radio[name=q2]:checked').val();
        answers.push(q2);
        var q3 = $('input:radio[name=q3]:checked').val();
        answers.push(q3);
        var q4 = $('input:radio[name=q4]:checked').val();
        answers.push(q4);
        var q5 = $('input:radio[name=q5]:checked').val();
        answers.push(q5);

        if(validate()===true){
            alert("Thank you. You will now be redirected to our Home Page")
        }
    });
}
//move through the answers array and check if any value is undefined. If it is, prompt the user to fill in the missing answers. 
var validate = function(){

    for (var i=0; i<answers.length; i++){
        if(answers[i] === undefined ){
            alert("Please fill out all the questions.")
            return false;
        } //end if
    }//end for
    return true;

}//endValidateNew