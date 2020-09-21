const progressBar = document.querySelector(".fill");
let audios = document.getElementsByClassName("audio");
let nowPlaying = document.getElementById("now-playing");
let songName = Array.from(document.querySelectorAll(".song-name"));
let songs = Array.from(document.querySelectorAll(".song"));
let playBtn = document.querySelector(".play-pause");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");
let appendSec = document.getElementById("sec");
let appendMin = document.getElementById("min");

let currentSong = 0;
let audio = new Audio();

// play the song
function playSong () {
    audio.src = audios[currentSong].src;
    audio.play();
}

// toggle the play - pause button
playBtn.addEventListener("click", togglePlayPause);
function togglePlayPause () {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fa fa-pause">'
    }
    else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa fa-play">'
    }
}

audio.addEventListener("timeupdate", function () {
    let position = audio.currentTime / audio.duration;
    progressBar.style.width = position * 100 + "%";

    // convert the duration of song into real time with progressbar
    convertTime();
    function convertTime(seconds) {
        seconds = Math.round(audio.currentTime);
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        if (sec < 10) {
            appendSec.innerHTML = "0" + sec;
        } else {
            appendSec.innerHTML = sec;
        }
        if (min < 10) {
            appendMin.innerHTML = "0" + min;
        } else {
            appendMin.innerHTML = min;
        }
    }
})


// click to play the next song
nextBtn.addEventListener("click", function () {
    currentSong ++;
    console.log(currentSong);
    playBtn.innerHTML = '<i class="fa fa-pause">';
    if (currentSong === audios.length) {
        currentSong = 0;
    }
    playSong();
    togglePlayPause();
    changeName();
})
// click to play the previous song
backBtn.addEventListener("click", function () {
    currentSong --;
    playBtn.innerHTML = '<i class="fa fa-play">';
    if (currentSong < 0) {
        currentSong = audios.length - 1;
    }
    playSong();
    togglePlayPause();
    changeName();
})


// change the name of the song whenever user click a new song, next or back button
function changeName () {
    nowPlaying.innerHTML = songName[currentSong].innerHTML;
}

// whenever user click a song ---> play it
songs.forEach(song => song.addEventListener("click", function () {
    playSong();
    togglePlayPause();
    changeName();
}))