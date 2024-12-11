// Seletores
const hamburger = document.querySelector('.hamburger-lines');
const menu = document.querySelector('.main-left');
const autoz = document.querySelector('.main-right');
const playContainer = document.querySelector('.musicPLay');
const playPauseButton = document.querySelector('.controls button:nth-child(2)');
const progressBar = document.getElementById('progress-bar');
const progressThumb = document.getElementById('progress-thumb');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const volumeSlider = document.getElementById('volumeSlider');
const audioPlayer = document.getElementById("audioPlayer");

// Estado inicial
let isPlaying = false;
let currentTrackIndex = 0; // Índice da música atual    

// Array de músicas
const tracks = [
    {
        title: "Sweet Child O' Mine",
        translation: "Minha Doce Criança",
        artist: "Guns N' Roses",
        audio: "/src/sweetchildofmine.mp3",
        cover: "/src/img/Artistas/N roses.png"
    },
    {
        title: "Música 2",
        translation: "Tradução 2",
        artist: "Artista 2",
        audio: "/src/videoplayback (1).m4a",
        cover: "/src/img/Artistas/album2.png"
    },
    {
        title: "Música 3",
        translation: "Tradução 3",
        artist: "Artista 3",
        audio: "/src/videoplayback.m4a",
        cover: "/src/img/Artistas/album3.png"
    }
];

// Atualiza as informações na tela
function loadTrack(index) {
    const track = tracks[index];
    document.getElementById("songTitle").textContent = track.title;
    document.getElementById("songTranslation").textContent = track.translation;
    document.getElementById("songArtist").textContent = track.artist;
    document.getElementById("albumCover").src = track.cover;
    audioPlayer.src = track.audio;

    // Atualiza a duração total assim que a música carrega
    audioPlayer.addEventListener('loadedmetadata', () => {
        const totalMinutes = Math.floor(audioPlayer.duration / 60);
        const totalSeconds = Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0');
        totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds}`;
    });
}

// Funções de controle de música
function playPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.innerHTML = '&#9654;'; // Ícone de play
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = '&#10074;&#10074;'; // Ícone de pause
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Avança
    loadTrack(currentTrackIndex);
    playPauseButton.innerHTML = '&#10074;&#10074;'; // Ícone de pause
    isPlaying = true;
    audioPlayer.play();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Retrocede
    loadTrack(currentTrackIndex);
    playPauseButton.innerHTML = '&#10074;&#10074;'; // Ícone de pause
    isPlaying = true;
    audioPlayer.play();
}

// Atualiza o progresso da música
audioPlayer.addEventListener('timeupdate', () => {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressThumb.style.left = `${progressPercent}%`;

    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds}`;
});

// Controle de volume
volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
});

// Menu Toggle
hamburger.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
    autoz.classList.toggle('open');
    playContainer.classList.toggle('open2');
});

// Carrega a primeira música ao iniciar
loadTrack(currentTrackIndex);

// Eventos Play/Pause
playPauseButton.addEventListener('click', playPause);
