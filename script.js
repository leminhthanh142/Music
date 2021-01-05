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
let title = document.querySelector("title");
let songContainer = document.querySelector(".song-container");
let bar = document.querySelector(".bar");
let volume = document.querySelector(".volume input");
console.log(volume)

let currentSong = 0;
let audio = new Audio();


// play the song
function playSong () {
    audio.src = audios[currentSong].src;
    audio.play();
}

const changeVolume = () => {
    console.log(volume.value);
    audio.volume = volume.value / 100;
}

volume.addEventListener("change", changeVolume);
volume.addEventListener("mousemove", changeVolume);

// change the name of the song whenever user click a new song, next or back button
function changeName () {
    nowPlaying.innerHTML = songName[currentSong].innerHTML;
    title.innerHTML = songName[currentSong].innerHTML;
}


// whenever user click a song ---> play it
songs.forEach((song, index) => {
    song.addEventListener("click", function () {
        currentSong = index;
        playBtn.innerHTML = '<i class="fa fa-pause">';
        playSong();
        changeName();
    })
})


// auto play next song when the previous has ended
audio.addEventListener("ended", function () {
    currentSong++;
    playSong();
    changeName();
})


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


// convert the duration of song into real time with progressbar
audio.addEventListener("timeupdate", function () {

    let position = audio.currentTime / audio.duration;
    progressBar.style.width = position * 100 + "%";

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
    playBtn.innerHTML = '<i class="fa fa-pause">';
    if (currentSong === audios.length) {
        currentSong = 0;
    }
    playSong();
    changeName();
})


// click to play the previous song
backBtn.addEventListener("click", function () {
    currentSong --;
    playBtn.innerHTML = '<i class="fa fa-pause">';
    if (currentSong < 0) {
        currentSong = audios.length - 1;
    }
    playSong();
    changeName();
})

let flag = false;
const toggleMenu = () => {
    flag = !flag;
    if (flag === true) {
        bar.style.transform = "rotate(180deg)";
        songContainer.style.left = "0";
    }
    else {
        bar.style.transform = "rotate(0deg)";
        songContainer.style.left = "-100%";
    }
}