//general objective:


//STEP ONE
//1 a) have user select ingredients from a list(?) or to fill in the parameters to be used as cross reference.
//1 b) have user select either Available Time or Easy-Med-Hard
//2) use key words and time/skill specification to cross reference yummly app using API Call of Search Recipes for matches
//3) use API Call of Get Recipe to return recipes that match the User's criteria

//STEP TWO
//1) cross reference with the Barnivore API to provide a vegan alcohol option based on user selection of Beer, Wine or Liquor

//STEP THREE
//1) find nearby Vegan restaurants using the FourSquare API using Explore for local options


// http://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=cfec60ec11e2efaa7f513383b9940b85&your _search_parameters
var yummlyInfo = {};

yummlyInfo.apiKey = 'cfec60ec11e2efaa7f513383b9940b85';
yummlyInfo.idKey = 'ac5ae063';
yummlyInfo.apiUrl = 'http://api.yummly.com/v1/api/recipes';
http://api.yummly.com/v1/api/metadata/diet?_app_id=ac5ae063&_app_key=cfec60ec11e2efaa7f513383b9940b85

$(function(){
	// yummlyInfo.getRecipe();
	yummlyInfo.init();
});

var recipeArray = [];

yummlyInfo.getRecipe = function() {
	console.log(yummlyInfo.diet +','+ yummlyInfo.llowedIngredient +','+ yummlyInfo.course +','+ yummlyInfo.allergy )
	$.ajax({
		url: yummlyInfo.apiUrl,
		method: 'GET',
		dataType: 'jsonp',
		traditional: true, 
		data: {
			_app_id: yummlyInfo.idKey,
			_app_key: yummlyInfo.apiKey,
			'allowedDiet[]': yummlyInfo.diet,
			'allowedIngredient[]': yummlyInfo.allowedIngredient,
			'allowedCourse[]': yummlyInfo.course,
			'allowedAllergy[]': yummlyInfo.allergy,
			maxTotalTimeInSeconds: yummlyInfo.time
			
		}
	}).then(function(recipeResponse){
		yummlyInfo.selectAnother(recipeResponse.matches);
		recipeArray = recipeResponse.matches
	});

}

yummlyInfo.selectAnother = function(choiceFromRecipeArray) {
	var randomNumberFromArray = Math.floor(Math.random() * choiceFromRecipeArray.length);
	var res = choiceFromRecipeArray[randomNumberFromArray];
	yummlyInfo.displayInfo(res);

}

yummlyInfo.displayInfo = function(recipeDisplay) {

		var recipeImage = recipeDisplay.imageUrlsBySize[90]
		var newRecipeImage = recipeImage.replace(/90/, '250');
		$('#recipeResponse').empty();
		$('#recipeResponse').removeClass('hidden').addClass('visible');
		$('#selectAnother').removeClass('hidden').addClass('visible');
		$('#recipeResponse').append('<h1>' + recipeDisplay.recipeName + '</h1>');
		$('#recipeResponse').append('<img src=' + newRecipeImage + '>');
		// $('#recipeResponse').append('<ul>').append('<li>' + recipeDisplay.ingredients.join('</li><li>'));
		$('#recipeResponse').append('<a href="http://www.yummly.com/recipe/' + recipeDisplay.id + '" target = "_blank">Find the recipe here!</a>')
		
	
}


// .append('<ul>')
//store user choice somewhere
// pass user choice param through getRecipe function


yummlyInfo.getFormValues = function() {
	yummlyInfo.diet = $('#diet').val();
	yummlyInfo.allergy = $('input[type=checkbox]:checked').val();
	yummlyInfo.course = $('#course').val();
	yummlyInfo.userTime = $('#time').val();
	yummlyInfo.allowedIngredient = $('#allowedIngredient').val();
	yummlyInfo.getRecipe();
	console.log(yummlyInfo.diet, yummlyInfo.allergy, yummlyInfo.course, yummlyInfo.userTime, yummlyInfo.allowedIngredient);
}

yummlyInfo.init = function(){
	yummlyInfo.addEventListener();	
};



yummlyInfo.addEventListener = function(){
	$('#veganChoice').submit(function(event){
		event.preventDefault();
		yummlyInfo.getFormValues();
		 $('html, body').animate({scrollTop: $("#recipeResponse").offset().top}, 2000);
	});
	$('#refresh').click(function(event){
		yummlyInfo.selectAnother(recipeArray);
		$('html, body').animate({scrollTop: $("#recipeResponse").offset().top}, 2000);
	});
};
