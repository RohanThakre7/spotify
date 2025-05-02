// Sample Data
const songs = [
  {
    id: 1,
    title: "Save Your Tears",
    artist: "The Weeknd",
    duration: "3:35",
    cover: "wd1.jpg",
    audio: "",
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:20",
    cover: "/images/artists/wd.png",
    audio: "",
  },
  {
    id: 3,
    title: "Stay",
    artist: "Justin Bieber",
    duration: "2:21",
    cover: "jb.jpg",
    audio: "",
  },
  {
    id: 4,
    title: "Heat Waves",
    artist: "Glass Animals",
    duration: "3:59",
    cover: "Heat-Waves.jpg",
    audio: "",
  },
  {
    id: 5,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    duration: "2:58",
    cover: "OR.jpg",
    audio: "",
  },
];

const playlists = [
  {
    id: 1,
    name: "Today's Top Hits",
    cover: "play1.jpeg",
    description: "The biggest hits right now.",
  },
  {
    id: 2,
    name: "RapCaviar",
    cover: "play2.jpg",
    description: "New rap music.",
  },
  {
    id: 3,
    name: "All Out 2010s",
    cover: "play3.webp",
    description: "The biggest songs of the 2010s.",
  },
];

// DOM Elements
const playBtn = document.querySelector(".play-btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const shuffleBtn = document.querySelector(".shuffle-btn");
const repeatBtn = document.querySelector(".repeat-btn");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const currentTimeEl = document.querySelector(".current-time");
const totalTimeEl = document.querySelector(".total-time");
const volumeBtn = document.querySelector(".volume-btn");
const volumeSlider = document.querySelector(".volume-slider");
const volumeProgress = document.querySelector(".volume-progress");
const trackName = document.querySelector(".track-name");
const artistName = document.querySelector(".artist-name");
const currentAlbumArt = document.querySelector(".current-album-art");
const likeBtn = document.querySelector(".like-btn");
const upgradeBtn = document.querySelector(".upgrade-btn");
const modal = document.getElementById("subscriptionModal");
const closeModal = document.querySelector(".close");

// Player State
let isPlaying = false;
let currentSongIndex = 0;
let isShuffled = false;
let isRepeating = false;
let volume = 0.7;

// Initialize Featured Content
function initializeFeaturedContent() {
  const featuredGrid = document.querySelector(".featured-grid");
  playlists.forEach((playlist) => {
    const featuredItem = document.createElement("div");
    featuredItem.className = "featured-item";
    featuredItem.innerHTML = `
            <img src="${playlist.cover}" alt="${playlist.name}">
            <div class="playlist-info">
                <h3>${playlist.name}</h3>
                <p>${playlist.description}</p>
            </div>
        `;
    featuredGrid.appendChild(featuredItem);
  });
}

// Initialize Album Grids
function initializeAlbumGrids() {
  const recentlyPlayed = document.querySelector(".recently-played .album-grid");
  const madeForYou = document.querySelector(".made-for-you .album-grid");

  songs.forEach((song) => {
    const albumCard = createAlbumCard(song);
    recentlyPlayed.appendChild(albumCard.cloneNode(true));
    madeForYou.appendChild(albumCard.cloneNode(true));
  });
}

function createAlbumCard(song) {
  const card = document.createElement("div");
  card.className = "album-card";
  card.innerHTML = `
        <img src="${song.cover}" alt="${song.title}">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
    `;
  card.addEventListener("click", () => playSong(songs.indexOf(song)));
  return card;
}

// Player Controls
function togglePlay() {
  isPlaying = !isPlaying;
  playBtn.innerHTML = isPlaying
    ? '<i class="fas fa-pause"></i>'
    : '<i class="fas fa-play"></i>';
  updatePlayerInfo();
}

function playSong(index) {
  currentSongIndex = index;
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  updatePlayerInfo();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
}

function updatePlayerInfo() {
  const currentSong = songs[currentSongIndex];
  trackName.textContent = currentSong.title;
  artistName.textContent = currentSong.artist;
  currentAlbumArt.src = currentSong.cover;
  totalTimeEl.textContent = currentSong.duration;
}

// Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Update time displays
  currentTimeEl.textContent = formatTime(currentTime);
  totalTimeEl.textContent = formatTime(duration);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Volume Controls
function toggleMute() {
  const isMuted = volume === 0;
  volume = isMuted ? 0.7 : 0;
  updateVolumeUI();
}

function setVolume(e) {
  const rect = volumeSlider.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  volume = Math.max(0, Math.min(1, clickX / rect.width));
  updateVolumeUI();
}

function updateVolumeUI() {
  volumeProgress.style.width = `${volume * 100}%`;
  volumeBtn.innerHTML =
    volume === 0
      ? '<i class="fas fa-volume-mute"></i>'
      : '<i class="fas fa-volume-up"></i>';
}

// Utility Functions
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Like Button
function toggleLike() {
  const icon = likeBtn.querySelector("i");
  icon.classList.toggle("far");
  icon.classList.toggle("fas");
}

// Subscription Modal
function showSubscriptionModal() {
  modal.style.display = "block";
}

function closeSubscriptionModal() {
  modal.style.display = "none";
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
shuffleBtn.addEventListener("click", () => {
  isShuffled = !isShuffled;
  shuffleBtn.classList.toggle("active");
});
repeatBtn.addEventListener("click", () => {
  isRepeating = !isRepeating;
  repeatBtn.classList.toggle("active");
});
progressContainer.addEventListener("click", setProgress);
volumeBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("click", setVolume);
likeBtn.addEventListener("click", toggleLike);
upgradeBtn.addEventListener("click", showSubscriptionModal);
closeModal.addEventListener("click", closeSubscriptionModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeSubscriptionModal();
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeFeaturedContent();
  initializeAlbumGrids();
  updatePlayerInfo();
  updateVolumeUI();
});

// Keyboard Controls
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Space":
      e.preventDefault();
      togglePlay();
      break;
    case "ArrowRight":
      nextSong();
      break;
    case "ArrowLeft":
      prevSong();
      break;
    case "ArrowUp":
      volume = Math.min(1, volume + 0.1);
      updateVolumeUI();
      break;
    case "ArrowDown":
      volume = Math.max(0, volume - 0.1);
      updateVolumeUI();
      break;
  }
});
// Add these functions to your existing script.js

function createAlbumCard(song) {
  const card = document.createElement("div");
  card.className = "album-card";
  card.innerHTML = `
        <img src="${song.cover}" alt="${song.title}">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
    `;

  card.addEventListener("click", (e) => {
    const isPlayButton =
      e.clientX >= card.offsetWidth - 60 && e.clientY >= card.offsetHeight - 60;

    if (isPlayButton) {
      // Handle play button click
      const wasPlaying = card.classList.contains("playing");
      // Remove playing class from all cards
      document.querySelectorAll(".album-card, .featured-item").forEach((c) => {
        c.classList.remove("playing");
      });

      if (!wasPlaying) {
        card.classList.add("playing");
        playSong(songs.indexOf(song));
      } else {
        pauseSong();
      }
    }
  });

  return card;
}

function createFeaturedItem(playlist) {
  const item = document.createElement("div");
  item.className = "featured-item";
  item.innerHTML = `
        <img src="${playlist.cover}" alt="${playlist.name}">
        <div class="playlist-info">
            <h3>${playlist.name}</h3>
            <p>${playlist.description}</p>
        </div>
    `;

  item.addEventListener("click", (e) => {
    const isPlayButton =
      e.clientX >= item.offsetWidth - 50 && e.clientY >= item.offsetHeight - 50;

    if (isPlayButton) {
      // Handle play button click
      const wasPlaying = item.classList.contains("playing");
      // Remove playing class from all items
      document.querySelectorAll(".album-card, .featured-item").forEach((c) => {
        c.classList.remove("playing");
      });

      if (!wasPlaying) {
        item.classList.add("playing");
        // Play the first song from the playlist
        playPlaylist(playlist);
      } else {
        pauseSong();
      }
    }
  });

  return item;
}

function pauseSong() {
  isPlaying = false;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  // Add your audio pause logic here
}

function playPlaylist(playlist) {
  // Add your playlist playing logic here
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  // For now, just update the UI
  updatePlayerInfo();
}
