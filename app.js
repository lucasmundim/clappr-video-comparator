var stick = 0;

function set_video(container, video_src) {
  var player = new Clappr.Player({
    source: video_src,
    chromeless: true,
    mute: true,
    height: 480,
    width: 854
  });
  player.attachTo(container[0]);
  return player;
}

function set_left() {
  var video = $('#leftsel').val();
  if (window.player_left) {
    window.player_left.load(video);
  } else {
    window.player_left = set_video($('#player-left'), video);
  }
}

function set_right() {
  var video = $('#rightsel').val();
  if (window.player_right) {
    window.player_right.load(video);
  } else {
    window.player_right = set_video($('#player-right'), video);
  }
}

function set_file() {
  populateSelect('#rightsel', videos[$('#filesel').val()]);
  populateSelect('#leftsel', videos[$('#filesel').val()]);
  set_right();
  set_left();
}

function movesplit(event) {
  if (!stick) {
    $("#player-left").width(event.offsetX);
  }
  return false;
}

function sticksplit(event) {
  stick = !stick;
  if (!stick) {
    movesplit(event);
  }
}

function populateSelect(selector, items) {
  var select = $(selector);
  select.find('option').remove();
  $.each(items, function(key, value) {
    select.append('<option value=' + value + '>' + value.replace('data/',
        '') +
      '</option>');
  });
}

// Player controls
$('#controls-play').on('click', function() {
  window.player_left.play();
  window.player_right.play();
});
$('#controls-pause').on('click', function() {
  window.player_left.pause();
  window.player_right.pause();
});
$('#controls-stop').on('click', function() {
  window.player_left.stop();
  window.player_right.stop();
});

// input listeners
$('#filesel').on('change', function() {
  set_file();
});
$('#leftsel').on('change', function() {
  set_left();
});
$('#rightsel').on('change', function() {
  set_right();
});

$(document).ready(function() {
  populateSelect('#filesel', Object.keys(videos));

  set_file();

  $('.magic-container')
    .on("mousemove", movesplit)
    .on("touchstart", movesplit)
    .on("touchmove", movesplit)
    .on("click", sticksplit);
});
