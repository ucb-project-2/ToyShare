
$( document ).ready(function() {

  //Dom Query
  var itemName = $('#item-name');
  var posterName = $('#poster-name');
  var posterEmail = $('#poster-email');
  var description = $('#description');
  var postLocation = $('#location');
  var $uploadBtn = $('#upload-btn');
  var $uploadInput = $('#upload-input');

  //Store doc ID after upload - to be used when full form is submitted
  //(Doc upload and form submit do not happen in lockstep)
  var docId;


 $uploadInput.on('change', function() {
   $uploadBtn.click();
 });

  /***** Document Upload code *****/

  $('#uploadForm').on('submit',( function (event) {
   event.preventDefault();
   $.ajax({
      url: "/upload",
      type: "POST",
      data:  new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: successHandler,
      error: function(error){
         console.log(error);
      }
   });
}));

function successHandler(data) {
  docId = JSON.parse(data).id;
  console.log(docId);
}


  // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
      event.preventDefault();

      // Constructing a newPost object to hand to the database
      var newPost = {
        item: itemName.val().trim(),
        posterName: posterName.val().trim(),
        posterEmail: posterEmail.val().trim(),
        description: description.val().trim(),
        DocumentId: docId,
        location: postLocation.val().trim(),
        borrowed: false
      };
      console.log(`\nNew Post Object: ${newPost}`);
      submitPost(newPost);
    }

      //If we're updating a post run updatePost to update a post
      //Otherwise run submitPost to create a whole new post
    //   if (updating) {
    //     newPost.id = postId;
    //     updatePost(newPost);
    //   }
    //   else {
    //     submitPost(newPost);
    //   }
    // }


  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post('/api/post', post, function(response) {
      console.log(response);
      if (response.result == 'redirect') {
        //redirecting to success page page from here.
        window.location.replace(response.url);
      }
    });
  }

  $('#post-form').on('submit', handleFormSubmit);


});
