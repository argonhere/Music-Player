const musicContainer = document.getElementById('music-container');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const point = document.getElementById('point');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');
const author = document.getElementById('author');

const songs = ['Color White', 'Pariah', 'Laude Lag Gaye' ];
const singers = ['Parvaaz', 'Steven Wilson, Ninet Tayeb', 'BCS Ragasur'];

const cTime = document.getElementById('current-time');
const tTime = document.getElementById('total-time');

let songIndex = 1;

loadSong(songs[songIndex]);

function loadSong(song){
    cTime.innerText = "0:00";
    tTime.innerText = "0:00";
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
    if(songIndex==0) songIndex = 2;
    else songIndex--;
    loadSong(songs[songIndex]);
    musicContainer.classList.add('play');
    audio.play();
    
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
}
function nextSong(){
    if(songIndex==2) songIndex = 0;
    else songIndex++;
    loadSong(songs[songIndex]);
    musicContainer.classList.add('play');
    audio.play();

    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
}
function updateProgress(e){
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;

    cTime.innerText = `${Math.floor(currentTime/60)}:${twoDig(Math.floor(currentTime%60))}`;
    tTime.innerText = `${Math.floor(duration/60)}:${twoDig(Math.floor(duration%60))}`;
}
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX/width) * duration;
}
function twoDig(n){
    return n > 9 ? "" + n: "0" + n;
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