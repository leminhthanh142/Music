
let nowPlaying = document.getElementById("now-playing");
let songName = document.querySelectorAll(".song-name");
let audio = document.querySelectorAll(".audio");
let song = document.querySelectorAll(".song")
let defaultSong = 0;
let playBtn = document.querySelector(".play-pause");
const progressBar = document.querySelector(".fill");
let appendSec = document.getElementById("sec");
let appendMin = document.getElementById("min");
let play = false;

function playPause () {
    play = !play;
    if (play === true) {
        audio[defaultSong].play();
        playBtn.innerHTML = '<i class="fa fa-pause">'
    } else {
        audio[defaultSong].pause();
        playBtn.innerHTML = '<i class="fa fa-play">'
    }
}


function playSong () {
    songName.forEach((song, index) => {
        song.addEventListener("click", function () {
            nowPlaying.innerHTML = songName[index].innerHTML;
        })
    })
    song.forEach((song, index) => {
        song.addEventListener("click", function () {
            defaultSong = index;
            audio[index].addEventListener("timeupdate", function () {
                let position = audio[index].currentTime/audio[index].duration;
                progressBar.style.width = position * 100 + "%";

                convertTime();

                function convertTime(seconds) {
                    seconds = Math.round(audio[index].currentTime);
                    console.log(seconds);
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
}
playSong();

