

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
// let currentSong = 0;




// convert the real time into  progress - bar
song.forEach((song, index) => {
    song.addEventListener("click", function () {

        // change the button appearance when user click a song
        playBtn.innerHTML = '<i class="fa fa-pause">';


        // play the song
        function playSong () {
            audios[index].play();
        }
        playSong();

        // click to play next song
        nextBtn.addEventListener("click", function (){
            index++;
            console.log(audios[index]);
            console.log(index);
            playBtn.innerHTML = '<i class="fa fa-pause">'
            if (index > audios.length) {
                index = 0;
            }
            changeName();
            playSong();
        })


        // click to play previous song
        backBtn.addEventListener("click", function () {
            index--;
            console.log(index);
            playBtn.innerHTML = '<i class="fa fa-pause">'
            if (index < 0) {
                index = audios.length;
            }
            changeName();
            playSong();
        })

        // // toggle play and pause button
        // if (audios[index].paused) {
        //     audios[index].play();
        //     playBtn.innerHTML = '<i class="fa fa-pause">'
        // }
        // else {
        //     audios[index].pause();
        //     playBtn.innerHTML = '<i class="fa fa-play">'
        // }


        // change the name of song when user click
        function changeName () {
            nowPlaying.innerHTML = songName[index].innerHTML;
        }
        changeName();



        audios[index].addEventListener("timeupdate", function () {
            // convert the duration of song into real time with progressbar
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
