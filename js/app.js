(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty(); //div with id listings

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
function Movie(id,poster,title,year){
this.id = id;
this.poster=poster;
this.title=title;
this.year=year;
}
var $form=$("button");
$form.on('click',function(e){
  e.preventDefault();
  var $searchvalue= $("#search")[0].value;
  $('#search').val('');
  if($searchvalue===''){
    alert('Please enter a movie title')
  }
  let xhr=$.getJSON('https://omdb-api.now.sh/?s='+$searchvalue)
  xhr.done(function(data){
    console.log(data);
    for(let i=0;i<data.Search.length;i++){
     let id=data.Search[i].imdbID
     let poster=data.Search[i].Poster
     let title=data.Search[i].Title
     let year=data.Search[i].Year
     let mobject= new Movie(id,poster,title,year)
     movies.push(mobject);
    }
    renderMovies(movies);
  })
 });

  // ADD YOUR CODE HERe
})();
