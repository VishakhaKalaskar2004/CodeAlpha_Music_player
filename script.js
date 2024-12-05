const songs = [
  {
    title: "Dekha hain ek khwab",
    src: "songs/dekha_hai_ek_khwab.mp3",
    artist: "Artist 1"
  },
  {
    title: "Chandani meri chandini",
    src: "songs/chandani_meri_chandini.mp3",
    artist: "Artist 2"
  },
  {
    title: "Aankh hain bhari bhari",
    src: "songs/aankh_hai_bhari_bhari.mp3",
    artist: "Artist 3"
  },
  {
    title: "Dil deewana",
    src: "songs/dil_deewana.mp3",
    artist: "Artist 4"
  },
  {
    title: "Dil ne dil se kya kaha",
    src: "songs/dil_ne_dil_se_kya_kaha.mp3",
    artist: "Artist 5"
  },
  {
    title: "Gori hai kalaiya",
    src: "songs/gori_hai_kalaiya.mp3",
    artist: "Artist 6"
  },
  {
    title: "Hum tumhe itna pyaar karenge",
    src: "songs/hum_tumhe_itna_pyaar_karenge.mp3",
    artist: "Artist 7"
  },
  {
    title: "Mein tere ishq mein.",
    src: "songs/mein_tere_ishq_mein.mp3",
    artist: "Artist 8"
  },
];

let currentIndex = 0;
let autoPlayTimeout;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progress = document.getElementById("progress");
const songList = document.getElementById("song-list");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");
const volumeControl = document.getElementById("volume");

// Populate song list
function populateSongList() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.dataset.index = index;

    li.addEventListener("click", () => {
      currentIndex = index;
      loadSong(currentIndex);
      playSong();
    });

    songList.appendChild(li);
  });
}

// Highlight active song in the library
function highlightActiveSong() {
  const items = document.querySelectorAll("#song-list li");
  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Load song details
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  highlightActiveSong(); // Highlight the clicked song in the playlist

  // Update the duration display
  audio.addEventListener('loadedmetadata', () => {
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    durationDisplay.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
  });
}

// Play song
function playSong() {
  audio.play();
  playButton.style.display = "none";
  pauseButton.style.display = "inline-block";
}

// Pause song
function pauseSong() {
  audio.pause();
  playButton.style.display = "inline-block";
  pauseButton.style.display = "none";
}

// Previous song
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
}

// Next song
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
}

// Update progress bar and time display
audio.addEventListener("timeupdate", () => {
  // Update progress
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;

  // Update current time display
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
});

// Handle volume change
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value / 100;
});

// Handle progress bar input
progress.addEventListener("input", () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// When the song ends, go to next song automatically
audio.addEventListener("ended", nextSong);

populateSongList();
loadSong(currentIndex);

// Add event listeners to prev and next buttons
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

// Add event listeners to play and pause buttons
playButton.addEventListener('click', () => {
  playSong();
});

pauseButton.addEventListener('click', () => {
  pauseSong();
});
