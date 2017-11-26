console.log('Testing the upload script');

$( document ).ready(function() {

  //Dom Query
  var titleInput = $('#title');
  var descriptionInput = $('#description');
  var postLocation = $('#location');

  //Store doc ID after upload - to be used when full form is submitted
  //(Doc upload and form submit do not happen in lockstep)
  var docId;


  /***** Document Upload code *****/
  $('.upload-btn').on('click',() => {
      $('#upload-input').click();
      $('.progress-bar').text('0%');
      $('.progress-bar').width('0%');
  });

  $('#upload-input').on('change', function() {

    const files = $(this).get(0).files;

    if (files.length > 0){
      // create a FormData object which will be sent as the data payload in the
      // AJAX request
      const formData = new FormData();

      // loop through all the selected files and add them to the formData object
      for (let i = 0; i < files.length; i++) {
        let file = files[i];

        // add the files to formData object for the data payload
        formData.append('uploads[]', file, file.name);
      }

      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
          console.log('upload successful!\n' + data);
          docId = JSON.parse(data).id;
          console.log(docId);
        },
        xhr: function() {
          // create an XMLHttpRequest
          const xhr = new XMLHttpRequest();

          // listen to the 'progress' event
          xhr.upload.addEventListener('progress', function(evt) {

            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              let percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);

              // update the Bootstrap progress bar with the new percentage
              $('.progress-bar').text(percentComplete + '%');
              $('.progress-bar').width(percentComplete + '%');

              // once the upload reaches 100%, set the progress bar text to done
              if (percentComplete === 100) {
                $('.progress-bar').html('Done');
              }

            }

          }, false);

          return xhr;
        }
      });

    }
  }); //End Document Upload code


  // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
      event.preventDefault();

      // Constructing a newPost object to hand to the database
      var newPost = {
        title: titleInput.val().trim(),
        description: descriptionInput.val().trim(),
        DocumentId: docId,
        location: postLocation.val().trim()
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
      //console.log(response);
      //window.location.href = "/post/2";
    });
  }

  $('#post-form').on('submit', handleFormSubmit);

});
