let openCards = [], countMoves = 0, paired = 0, cardList = $('li.card i').toArray();

function restart() {
  $('.restart').click(function() {
    location.reload();
  });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Check if all cards have been matched
function cardClicked() {
  // Event for start timer counter once
  $('.deck').one( "click", function() {
    let start = new Date;
    let ticker = setInterval(clock, 1000);
    function clock() {
      $('.timer').text(Math.round((new Date - start) / 1000, 0) + " sec");
    };
    // Event listener
    $('.deck').on('click', 'li', function(e) {
      // Tracking moves
      countMoves++;
      // Check card status before comparing them
      if ($(e.target).hasClass('open')) {
        alert('The selected card is already open, please choose another one');
      } else if ($(e.target).hasClass('match')) {
        alert('The selected card is matched already');
      } else {
        // If card was uncover
        $(e.target).addClass('open show');
        cardSymbol = $(e.target).html();
        // Function to compare cards symbols
        function evalCards() {
          let elementContainer = $('li.open');
          $('.deck li').removeClass('nomatch');
          if (openCards.length == 0) {
            openCards.push(cardSymbol);
          } else {
            openCards.push(cardSymbol);
            if (openCards[0] == openCards[1]) {
              elementContainer.removeClass('open show');
              elementContainer.addClass('match');
              openCards = [];
              paired++;
              if (paired == 8) {
                $('body').prepend('<div class="final-score"><ul class="stars"><h5>Cool! You have finish in <div class="elapsed"></div></h5><li class="one"><i class="fa fa-star-o"></i></li><li class="two"><i class="fa fa-star-o"></i></li><li class="three"><i class="fa fa-star-o"></i></li><div class="moves"></div><div class="restart">Play again <i class="fa fa-repeat"></ul></div>');
                $('.elapsed').text(Math.round((new Date - start) / 1000, 0) + ' seconds');
                clearInterval(ticker);
                restart();
              }
            } else {
              elementContainer.removeClass('open show');
              elementContainer.addClass('nomatch');
              openCards = [];
            }
          }
        }
        evalCards();
      }
      // Function to print moves and assign rating
      function turnProcessor() {
        if (countMoves > 0) {
          $('.moves').empty();
          $('.moves').text(countMoves);
        };
        switch (true) {
          case 0:
            break;
          case (countMoves >= 1 && countMoves <= 16):
            $('.one').empty();
            $('.two').empty();
            $('.three').empty();
            $('.one').append('<i class="fa fa-star"></i>');
            $('.two').append('<i class="fa fa-star"></i>');
            $('.three').append('<i class="fa fa-star"></i>')
            break;
          case (countMoves >= 17 && countMoves <= 30):
            $('.one').empty();
            $('.two').empty();
            $('.three').empty();
            $('.one').append('<i class="fa fa-star"></i>');
            $('.two').append('<i class="fa fa-star"></i>');
            $('.three').append('<i class="fa fa-star-o"></i>')
            break;
          case (countMoves >= 31):
            $('.one').empty();
            $('.two').empty();
            $('.three').empty();
            $('.one').append('<i class="fa fa-star"></i>');
            $('.two').append('<i class="fa fa-star-o"></i>');
            $('.three').append('<i class="fa fa-star-o"></i>')
            break;
        }
      }
      turnProcessor();
    });
  });
  // Event listener for stop propagation
  $('.deck li').on('click', 'i', function(e) {
    event.stopPropagation();
  });
}

// Function to put a random deck
function newOrder() {
  $('li.card').find('i').remove();
  $('.deck li').each(function(index) {
    $(this).html(cardList[index]);
  });
}

restart();
cardList = shuffle(cardList);
newOrder();
cardClicked();
