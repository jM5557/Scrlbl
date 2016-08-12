$(document).ready(function(){
	//Default parent element for buttons and text-field. Adjust as desired
	var parent = "body";

	//Builds the text field and navigation buttons if they do not already exist in the page
	if($("#scrlbl_btn_left, #scrlbl_btn_right, #scrlbl_txt").length == 0)
		$(parent).append('<div id = "scrlbl_wrapper"><button id = "scrlbl_btn_left">&lsaquo;</button><span title = "" id = "scrlbl_txt"></span><button id = "scrlbl_btn_right">&rsaquo;</button></div>');

	//Default object array. Replace this array with your desired list of objects
	var objectArr = ["Cat", "Dog", "Bird", "Ferret", "Tyrannosaurus rex", "Micropachycephalosaurus"];

	//Default starting point in array
	var pos = 0;

	//Default text value in text container is the first element of the object array, null if array is empty
	//(objectArr.length > 0) ? $('#scrlbl_txt').html(objectArr[0]) : "Null";
	var defaultText = (objectArr.length > 0) ? objectArr[0] : "Null";
	$('#scrlbl_txt').html(defaultText);

	//@returns {Number} The current pointer position stored in the global variable pos
	function getCurrentPos()
	{
		return pos;
	}

	//@param {string} direction - The direction which the pointer moves through the array
	function scroll(direction)
	{
		var currPointer = getCurrentPos();
		var beforePointer = currPointer - 1;
		var afterPointer = currPointer + 1;

		//Cleaner version of nested if-conditional commented below
		(direction == "left") ? ((beforePointer < 0) ? pos = objectArr.length - 1 : pos--) 
			: ((afterPointer > objectArr.length - 1) ? pos = 0 : pos++);

		/*
		if(direction == "left")
		{
			if(beforePointer < 0)
				pos = objectArr.length - 1;
			else
				pos--;
		}

		else
		{
			if(afterPointer > objectArr.length - 1)
				pos = 0;
			else
				pos++;
		}
		*/

		$('#scrlbl_txt').html(objectArr[pos]);
	}

	// Disable function
	jQuery.fn.extend({
	    disable: function(state) {
	        return this.each(function() {
	            this.disabled = state;
	        });
	    }
	});

	if(objectArr.length <= 1)
		$('#scrlbl_btn_left, #scrlbl_btn_right').disable(true);
	else
	{
		//Left & Right Button click functionality
		$('#scrlbl_btn_left').click(function(){
			scroll("left");
		});

		$('#scrlbl_btn_right').click(function(){
			scroll("right");
		});
	}

    $('#scrlbl_txt').on("mouseover", function(){
    	if(objectArr[pos].length > 18)
			$('#scrlbl_wrapper').append('<p class = "scrlbl_tooltip">' + objectArr[pos] + '</p>');
    });
    $('#scrlbl_txt').on("mouseout", function(){
    	$('#scrlbl_wrapper').children("p").remove();
    });
});
