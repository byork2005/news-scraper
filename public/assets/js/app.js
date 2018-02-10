
// Delete saved article after confirm message.

$(document).on('click', '.delete-btn', function() {
  const thisArticleId = $(this).attr('data-id');
  const sure = confirm('Are you sure want to delete?');
  if (sure === true) {
    $.ajax({
      method: 'DELETE',
      url: '/delete',
      data: {
        id: thisArticleId
      }
    }).then(location.reload())
  }
})

// Save button. Checks if article has been saved once on this scrape.
$(document).on('click', '.save-btn', function() {
  if($(this).text() === 'Save') {
    $.ajax({
      method: 'POST',
      url: '/save',
      data: {
        title: $(this).attr('data-title'),
        link: $(this).attr('data-link')
      }
    })
  }
  $(this).html('<i class="fas fa-star"></i>');
})

// Opens article Notes Modal and checks for saved notes
$(document).on('click', '.notes-btn', function() {
  const id = $(this).attr('data-id');
  $.ajax({
    method: 'GET',
    url: '/saved/' + id
  }).done(function(data) {
    // const panelDiv = $('<div class="panel panel-default">')
    // const panelBodyDiv = $('<div class="panel-body">')
    const formButton = $(`<button type="submit" class="btn btn-success note-save" data-id="${id}">`)
    formButton.text("Save Note")
    $('#note-form').append(formButton);
  })
  $('#myModal').modal();
})

// Saves Notes
// $(document).on('click', '.note-save', function() {

//   const id = $(this).attr('data-id');
//   $.ajax({
//     method: 'POST',
//     url: '/note/' + id
//   })
// })

$(document).on('click', '.note-save', function() {
  // Empty the notes from the note section
  // $("#note-body").empty();
  // Save the id from the p tag
  const id = $(this).attr('data-id');

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/note/" + id
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#note-body").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#note-body").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#note-body").append("<textarea id='bodyinput' name='body'></textarea>");

      $('#note-body').r
      // A button to submit a new note, with the id of the article saved to it
      $("#note-body").append("<button data-id='" + data._id + "' class='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});






// $(document).ready(function() {
//   $('#myBtn').click(function() {
//     $('#myModal').modal();
//   });
// });
