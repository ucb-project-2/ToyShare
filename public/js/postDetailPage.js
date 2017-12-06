$( document ).ready(function() {


  function updateToBorrowed() {
  	var dataID = this.dataset.id;
  	console.log(dataID);
    console.log("borrowed");
    $('#borrow-button').html("This Item Is Borrowed!!!")

    $.ajax({
    	url: "/posts/update",
    	method: "PUT",
    	data: {id: dataID}
    }).done(function(){
    	console.log("success")
    })
   }


  $('#borrow-button').on('click', updateToBorrowed);


});