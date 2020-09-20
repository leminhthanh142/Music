

const progressBar = document.querySelector(".fill");
let nowPlaying = document.getElementById("now-playing");
let songName = document.querySelectorAll(".song-name");
let audios = document.querySelectorAll(".audio");
let song = document.querySelectorAll(".song");
let playBtn = document.querySelector(".play-pause");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");
let appendSec = document.getElementById("sec");
let appendMin = document.getElementById("min");
let currentSong = 0;



// play the song
function playSong () {
    audios[currentSong].play();
}



// change the name of the song when user click a new song
function changeName () {
    songName.forEach((name, index) => {
        name.addEventListener("click", function () {
            nowPlaying.innerHTML = songName[index].innerHTML;
        })
    })
}



// toggle play and pause button
function playPause () {
    if (audios[currentSong].paused) {
        audios[currentSong].play();
        playBtn.innerHTML = '<i class="fa fa-pause">'
    }
    else {
        audios[currentSong].pause();
        playBtn.innerHTML = '<i class="fa fa-play">'
    }
}



// convert the real time into  progress - bar
song.forEach((song, index) => {
    song.addEventListener("click", function () {
        playBtn.innerHTML = '<i class="fa fa-pause">';
        changeName();
        audios[index].play();
        audios[index].addEventListener("timeupdate", function () {
            let position = audios[index].currentTime/audios[index].duration;
            progressBar.style.width = position * 100 + "%";
            convertTime();
            function convertTime(seconds) {
                seconds = Math.round(audios[index].currentTime);
                let min = Math.floor(seconds/60);
                let sec = seconds % 60;
                if (sec < 10) {
                    appendSec.innerHTML = "0" + sec;
                }
                else {
                    appendSec.innerHTML = sec;
                }
                if (min < 10) {
                    appendMin.innerHTML = "0" + min;
                }
                else {
                    appendMin.innerHTML = min;
                }
            }
        })
    })
})


// click to play next song
nextBtn.addEventListener("click", function (){
    currentSong++;
    playBtn.innerHTML = '<i class="fa fa-pause">'
    if (currentSong === audios.length - 1) {
        currentSong = -1;
    }
    changeName();
    playSong();
})


// click to play previous song
backBtn.addEventListener("click", function () {
    currentSong--;
    playBtn.innerHTML = '<i class="fa fa-pause">'
    if (currentSong < 0) {
        currentSong = audios.length;
    }
    changeName();
    playSong();
})
