const musicContainer = document.getElementById('music-container');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');
const author = document.getElementById('author');

const songs = ['Color White', 'Pariah' ];
const singers = ['Parvaaz', 'Steven Wilson, Ninet Tayeb'];

let songIndex = 1;

loadSong(songs[songIndex]);

function loadSong(song){
    title.innerText = song;
    author.innerText = singers[songIndex];
    audio.src = `audios/${song}.mp3`;
    cover.src = `imgs/${song}.jpg`;
}
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}
function prevSong(){
    songIndex = 1 - songIndex;
    loadSong(songs[songIndex]);
    audio.play();
}
function nextSong(){
    songIndex = 1 - songIndex;
    loadSong(songs[songIndex]);
    audio.play();
}
function updateProgress(e){
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX/width) * duration;
}

playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);