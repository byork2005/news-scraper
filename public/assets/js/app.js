// Save Article. Checks if already in db, than saves to db.
function saveArticle() {
  $.ajax({
    method: 'GET',
    url: '/saved',
    data: {
      success(saved) {
      console.log('saved: ', saved)
      // if(saved) {
      //   saved.forEach(element => {
      //     if(saved.link !== $(this).attr('data-link')) {
      //       $.ajax({
      //         method: 'POST',
      //         url: '/save',
      //         data: {
      //           title: $(this).attr('data-title'),
      //           link: $(this).attr('data-link')
      //         }
      //       });
      //     }
      //   });
      // }
    }}
  })
  $(this).html('<i class="fas fa-star"></i>');
}

// Delete saved article after confirm message.
function deleteArticle(id) {
  let sure = confirm('Are you sure want to delete?');
  if (sure === true) {
    $.ajax({
      method: 'DELETE',
      url: '/delete',
      data: {
        id: id
      }
    });
  }
}






$(document).ready(function() {
  $('#myBtn').click(function() {
    $('#myModal').modal();
  });
});
