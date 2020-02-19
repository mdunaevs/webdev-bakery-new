// *** FORM VALIDATION FOR PLACE AN ORDER PAGE *** //

// Checks if a number character has been pressed
function isInputNumber(evt){
    var ch = String.fromCharCode(evt.which);
    if(!(/[0-9]/.test(ch))){
        evt.preventDefault();
    }
}

// Checks if the information the user entered is valid
function enteredValidPersonalInfo(){
    // Boolean flag which becomes false if any of the user inputs is invalid
    var nextPage = true;

    // Checks to make sure user entered at least one character for name
    var nameVal =  document.getElementById("fullname").value;
    if(nameVal.length < 1){
        //alert("Enter your full name!");
        nextPage = false;
    }

    // Checks to make sure user entered at least one character for address
    var addressVal =  document.getElementById("address").value;
    if(addressVal.length < 1){
        //alert("Not a valid billing address!");
        nextPage = false;
    }

    // Checks to make sure user entered at 5-digit zip code
    var zipcode =  document.getElementById("zipcode").value;
    if(zipcode.length != 5){
        //alert("Not a valid Zip Code!");
        nextPage = false;
    }

    // Checks to make sure user entered the @ symobl and at least one character
    // after the @ symbol
    var emailA = document.getElementById("email").value;
    var at = emailA.indexOf("@");
    var afterAt = emailA.substring(at + 1, emailA.length);
    if (at == -1 || afterAt.length == 0) {
        //alert("Not a valid e-mail!");
        nextPage = false;
    }

    // Checks to make sure user entered a 10-digit phone number
    var phoneVal = document.getElementById("phone").value;
    if(phoneVal.length != 10){
        //alert("Not a valid phone number!");
        nextPage = false;
    }

    // If the user entered all valid information we unlock the next tab
    if(nextPage){
        $( "#tabs" ).tabs({
            disabled: [ 2 ],
            event: "mouseover"
        });
    }
}

// Once the user click on the next page button for the valid pie information tab,
// unlcok the last tab
function enteredValidPieInfo(){
  $( "#tabs" ).tabs({
      disabled: [],
      event: "mouseover"
  });
}


// *** HELP ME CHOOSE PAGE *** //

var responseArr;
// When user clicks the start button, the intro page is hidden and the first
// question is displayed
function clickStartSurvey(){
    //$("#help-me-choose-intro").css("visibility", "hidden");
    $("#help-me-choose-intro").css("display","none");
    $("#theCake").css("display","none");
    $("#survey").css("display","inline");
    //$("#survey").css("visibility", "visible");
    responseArr = [null, null, null, null, null];
    reactToOption("#question_1");
    lightUpCurrent("#question_1");
}

// Displays the current id's question and hides the others
function reactToOption(id){
    var questionIDs = ["#question_1", "#question_2", "#question_3", "#question_4", "#question_5"];
    lightUpCompleted();
    var index;
    for(index = 0; index < questionIDs.length; index ++){
        currID = questionIDs[index];
        if(currID != id){
            $(currID).css("display","none");
        } else{
            $(currID).css("display", "inline");
            lightUpCurrent(currID);
        }
    }
}

// Calculates which progress indicator to make light green, meaning the user
// is currently on that question
function lightUpCurrent(id){
    // var index;
    // for(index = 0; index < responseArr.length; index ++){
    //   if (("question_"+(index+1)) != id) {
    //     var rgb = $("a#option_"+(index + 1)+".circle").css("background-color").match(/\d+/g);
    //     var hex = '#'+ Number(rgb[0]).toString(16) + Number(rgb[1]).toString(16) + Number(rgb[2]).toString(16);
    //       if(hex == "#00FF00"){
    //           $("a#option_"+(index + 1)+".circle").css("background-color", "gray");
    //       }
    //   }
    // }
    questionNum = id.substring(id.length-1, id.length);
    $("a#option_"+questionNum+".circle").css("background-color", "#00FF00");
}

// Lights up the progress bar based on whether the response array has a non-Null
// value, meaning the user selected an answer.
function lightUpCompleted(){
    var index;
    for(index = 0; index < responseArr.length; index ++){
        if(responseArr[index] != null){
            $("a#option_"+(index + 1)+".circle").css("background-color", "green");
        }
    }
}

// Checks if the response array has a null. A null would indicate that the user
// has not yet completed the survey.
function hasNull(){
    var index;
    for (index = 0; index < responseArr.length; index ++){
        if(responseArr[index] == null){
            return true;
        }
    }
    return false;
}

// Based on the option the user selected, this function takes a tring represntation
// (for example if on question 1 the user selected option 3 the string represntation
// would be 1.3) and populates the response array with the value
function populateResponseArray(questionNum, responseNum){
    responseArr[questionNum - 1] = questionNum + "." +responseNum;
    // Makes the border around the selected option green
    $("#hollow-circle-" + questionNum + "" + responseNum).css("border-color", "green");
    // Checks if the response array is completed or not
    if(hasNull()){
        // If not completed, we light up the progress bar and move onto the next question
        lightUpCompleted();
        lightUpCurrent("#question_" + (questionNum + 1))
        reactToOption("#question_" + (questionNum + 1));
    } else{
        // If completed, the algorithm calculates and displays the best cake
        var theCake = calculateCake();
        displayCaculatedCake(theCake);
    }
}

// Numbers which represent question.option that is best suited for a cake
cakes = {
    "raspberry":["1.3", "1.4", "2.2", "3.1", "4.1", "4.3", "5.2"],
    "choco_choco":["1.1", "1.3", "1.4", "2.3", "3.1", "3.4", "4.1", "4.3", "5.3"],
    "apricot_tea": ["1.1", "1.4", "2.2", "3.3", "4.1", "5.2", "5.1"],
    "lavender_rose": ["1.3", "1.4", "2.3", "3.2", "3.4", "4.4", "5.1", "5.2", "5.4"],
    "rosemary_pecan": ["1.3", "1.4", "2.1", "3.3", "4.2", "5.1", "5.4"],
    "choco_almond": ["1.2", "1.1", "2.2", "3.2", "4.3", "5.3"],
    "eldeberry": ["1.3", "1.4", "2.3", "3.4", "4.2", "4.3", "5.2", "5.4"],
    "strawberry": ["1.1", "1.2", "2.1", "2.2", "3.2", "4.1", "4.4", "5.2", "5.3"]
}

// Links to where image of cake was found, with people's comments
comments = {
  "raspberry":"https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=aQSMQjtk6ndFvU0fWE-W3Q",
  "choco_choco":"https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=6IdhAbjxasFCND9vIklTTw",
  "apricot_tea":"https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=XtfVpxpZTae0MWgaP2gzGg",
  "lavender_rose": "https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=fkraG1aZwkONF7iLObsk1A",
  "rosemary_pecan": "https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=KWdNfjEhp1KuN2X3WVcY3w",
  "choco_almond": "https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=0Qu_3FOB6e-GGDJODHeH6A",
  "eldeberry": "https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=5EHv9wiImgxecvA8NatXYQ",
  "strawberry": "https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=R7vYu5F5p_Vje3mhA0OGLQ"
}

// In depth cake name
cake_name = {
  "raspberry":"Raspberry cake with chocolate buttercream",
  "choco_choco":"Chocolate with chocolate!",
  "apricot_tea":"Apricot vanilla tea cake",
  "lavender_rose": "Lavender rose with blackberry cream",
  "rosemary_pecan": "Rosemary and pecan cake",
  "choco_almond": "Vegan chocolate cake with almond buttercream",
  "eldeberry": "Elderberry cake with blackberries and creme.",
  "strawberry": "Strawberry cake"
}

// Algorithm that calculates which cake is best based on user answers
function calculateCake(){
    var maxEqual = 0;
    var maxCake = new Set([]);
    for(var cake in cakes){
        // Gets numbers from cakes
        cakeNumbers = cakes[cake];
        // Determines the intersection length between user responses and cake numbers
        intersection = cakeNumbers.filter(value => -1 !== responseArr.indexOf(value));
        // If a cake has a larger intersection value, add the cake into an empty
        if(intersection.length > maxEqual){
            maxEqual = intersection.length;
            maxCake = new Set([cake]);
        // If two cakes have the same intersection value, add the cake into a set with the others
        } else if(intersection.length == maxEqual){
            maxCake.add(cake);
        }
    }

    if (maxCake.length == 1){
        console.log(maxCake);
        ansCake = maxCake[0];
    // If there are multiple cakes with the same intersectin value at the end,
    // this randomly selects a cake from the set
    } else {
        console.log(maxCake);
        var arrCakes = Array.from(maxCake);
        var min = 0;
        var max = arrCakes.length-1;
        console.log(max);
        var randInd = Math.floor((Math.random() * max) + min);
        console.log(randInd);
        console.log(arrCakes);
        console.log(arrCakes[randInd]);
        ansCake = arrCakes[randInd];
    }
    if(ansCake == null || ansCake == ""){
        return "choco_choco";
    }else{
        return ansCake;
    }
}

// Displays the cake for help_me_choose page. The algorithm determines which cake is
// best based on user responses.
function displayCaculatedCake(theCake){
    $("#survey").css("display","none");
    var imageUrl = $("#theCake").css("background-image");
    imageUrl=imageUrl.replace('choco_choco',theCake);
    $("#theCake").css("background-image",imageUrl);
    $("#theCakeComment").attr("href", comments[theCake]);
    var cakeName = $("#theCakeComment").text();
    cakeName = cakeName+" "+cake_name[theCake];
    $("#theCakeComment").text(cakeName);
    $("#theCake").css("visibility", "visible");
    $("#theCake").css("display", "block");
    $("#theCake").css("height","35em");
}
