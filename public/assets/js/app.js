// Save Article
function saveArticle() {
  if ($(this).val() === 'Save') {
    $.ajax({
      method: 'POST',
      url: '/save',
      data: {
        title: $(this).attr('data-title'),
        link: $(this).attr('data-link')
      }
    });
    $(this).html('<i class="fas fa-star"></i>');
  }
}

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

function viewNotes(id) {}

$(document).ready(function() {
  $('#myBtn').click(function() {
    $('#myModal').modal();
  });
});
