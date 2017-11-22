var bg_audio = new Audio('audio/bg.mp3');
var err_audio = new Audio('audio/error.mp3');
var suc_audio = new Audio('audio/success.mp3');
var yes_audio = new Audio('audio/yes.mp3');
var ohno_audio = new Audio('audio/OHNO.mp3');
bg_audio.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);
bg_audio.play();
if (bg_audio.muted == false) {
  document.getElementById('mute').textContent = 'Mute';
} else {
  document.getElementById('mute').textContent = 'Unmute';
}

function enableMute() {
  if (bg_audio.muted === false) {
    document.getElementById('mute').textContent = 'Unmute';
    bg_audio.muted = true;
  } else {
    document.getElementById('mute').textContent = 'Mute';
    bg_audio.muted = false;
  }
}

function auth(email, password) {
  var isSuccessful = true
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
    on();
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      err_audio.play();
      bg_audio.muted = true;
      error_on();
    } else {
      err_audio.play();
      bg_audio.play();
      error_on();
    }
  });
}
$("#check").on('keyup', function(e) {
  if (e.which == 13) {
    var password = document.getElementById("check").value;
    var email = "abc@abc.com";
    if (password.length > 0) {
      auth(email, password);
    } else {
      error_on();
    }
  }
});

function check() {
  var password = document.getElementById("check").value;
  var email = "abc@abc.com";
  if (password.length > 0) {
    auth(email, password);
  } else {
    error_on();
  }
}

function error_on() {
  ohno_audio.play();
  err_audio.play();
  bg_audio.pause();
  bg_audio.currentTime = 0;
  document.getElementById("error").style.display = "block";
  document.getElementById("check").style.display = "none";
  document.getElementById("mute").style.display = "none";
  document.getElementById("sent").style.display = "none";
}

function error_off() {
  bg_audio.play();
  bg_audio.muted = false;
  err_audio.pause();
  ohno_audio.pause();
  err_audio.currentTime = 0;
  document.getElementById('check').value = '';
  document.getElementById("error").style.display = "none";
  document.getElementById("check").style.display = "block";
  document.getElementById("mute").style.display = "block";
  document.getElementById("sent").style.display = "block";
}

function on() {
  yes_audio.play();
  // suc_audio.play();
  bg_audio.pause();
  bg_audio.currentTime = 0;
  document.getElementById("success").style.display = "block";
  document.getElementById("check").style.display = "none";
  document.getElementById("mute").style.display = "none";
  document.getElementById("sent").style.display = "none";
}

function off() {
  bg_audio.play();
  bg_audio.muted = false;
  suc_audio.pause();
  yes_audio.pause();
  suc_audio.currentTime = 0;
  document.getElementById('check').value = '';
  document.getElementById("success").style.display = "none";
  document.getElementById("check").style.display = "block";
  document.getElementById("mute").style.display = "block";
  document.getElementById("sent").style.display = "block";
}
var targ = $('#myBtn'); 
var stageH = $(window).height() - targ.height();
var stageW = $(window).width() - targ.width();
var runAway = function() {

  var top = Math.random() * stageH + 'px';
  var left = Math.random() * stageW + 'px';

  targ.css({
    top: top,
    left: left
  });
}
$(document).ready(function() {
  targ.mouseover(runAway);
  targ.mousemove(runAway);
});