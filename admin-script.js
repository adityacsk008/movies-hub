<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Pages Site</title>
</head>
<body>
// CineHub Admin Dashboard - Complete JavaScript

// Initialize on page load
window.onload = function() {
    loadData();
    initializeDashboard();
    loadAllSections();
};

// Data Storage
let moviesData = [];
let seriesData = [];
let usersData = [];
let appSettings = {
    appName: 'CineHub',
    appLogo: '🎬',
    theme: 'dark',
    tmdbApiKey: ''
};

// Load data from localStorage
function loadData() {
    const savedMovies = localStorage.getItem('moviesData');
    const savedSeries = localStorage.getItem('seriesData');
    const savedUsers = localStorage.getItem('usersData');
    const savedSettings = localStorage.getItem('appSettings');
    
    if (savedMovies) moviesData = JSON.parse(savedMovies);
    if (savedSeries) seriesData = JSON.parse(savedSeries);
    if (savedUsers) usersData = JSON.parse(savedUsers);
    if (savedSettings) appSettings = JSON.parse(savedSettings);
    
    // Default data if empty
    if (moviesData.length === 0) {
        moviesData = [
            { id: 1, title: "RRR", genre: "Action, Drama", poster: "https://iili.io/F2ziUOJ.jpg", year: "2022", rating: "8.8", status: "Released", duration: "187 min", description: "A fearless revolutionary and an officer in the British force decide to join forces.", cast: "N.T. Rama Rao Jr., Ram Charan", director: "S.S. Rajamouli", videoUrl: "https://www.youtube.com/embed/GY4CDmUv1RI" },
            { id: 2, title: "Kalki 2898 AD", genre: "Action, Sci-Fi", poster: "https://iili.io/KXXLZ7V.jpg", year: "2024", rating: "8.5", status: "Released", duration: "180 min", description: "A modern-day avatar of Vishnu descends to Earth.", cast: "Prabhas, Deepika Padukone", director: "Nag Ashwin", videoUrl: "https://www.youtube.com/embed/example2" }
        ];
    }
    
    if (seriesData.length === 0) {
        seriesData = [
            { id: 1, title: "Mirzapur", genre: "Crime Thriller", poster: "https://iili.io/F27Hhgt.jpg", seasons: "3", episodes: "30", rating: "8.5", status: "Released", description: "A shocking incident ignites events in lawless Mirzapur.", cast: "Pankaj Tripathi, Ali Fazal" },
            { id: 2, title: "The Family Man", genre: "Spy Thriller", poster: "https://iili.io/F27HyrP.jpg", seasons: "2", episodes: "19", rating: "8.7", status: "Released", description: "A middle-class man works for a special cell.", cast: "Manoj Bajpayee, Samantha" }
        ];
    }
    
    if (usersData.length === 0) {
        usersData = [
            { id: 1, name: "Rahul Sharma", email: "rahul@example.com", status: "active", subscription: "Premium", joinDate: "2024-01-15" },
            { id: 2, name: "Priya Singh", email: "priya@example.com", status: "active", subscription: "VIP", joinDate: "2024-01-20" },
            { id: 3, name: "Amit Kumar", email: "amit@example.com", status: "blocked", subscription: "Free", joinDate: "2024-02-10" }
        ];
    }
    
    saveData();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('moviesData', JSON.stringify(moviesData));
    localStorage.setItem('seriesData', JSON.stringify(seriesData));
    localStorage.setItem('usersData', JSON.stringify(usersData));
    localStorage.setItem('appSettings', JSON.stringify(appSettings));
}

// Initialize Dashboard
function initializeDashboard() {
    updateStats();
    loadRecentUploads();
}

// Update Stats
function updateStats() {
    document.getElementById('totalMovies').textContent = moviesData.length;
    document.getElementById('totalSeries').textContent = seriesData.length;
    document.getElementById('activeUsers').textContent = usersData.filter(u => u.status === 'active').length;
}

// Load Recent Uploads
function loadRecentUploads() {
    const container = document.getElementById('recentUploads');
    const recent = moviesData.slice(-5).reverse();
    
    container.innerHTML = recent.map(movie => `
        <div class="upload-card" onclick="viewMovieDetails(${movie.id})">
            <img src="${movie.poster}" alt="${movie.title}" class="upload-poster" onerror="this.src='https://via.placeholder.com/200x280?text=No+Image'">
            <div class="upload-info">
                <div class="upload-title">${movie.title}</div>
                <div class="upload-meta">
                    <span>${movie.year}</span>
                    <span>⭐ ${movie.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Navigation
function showSection(section) {
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    event.target.closest('.nav-link').classList.add('active');
    
    // Update page heading
    const headings = {
        dashboard: 'Dashboard',
        movies: 'Movies Management',
        series: 'Series Management',
        upload: 'Upload Manager',
        users: 'Users Management',
        settings: 'Settings'
    };
    document.getElementById('pageHeading').textContent = headings[section] || 'Dashboard';
    
    // Show section
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById(section + 'Section').classList.add('active');
    
    // Load section content
    if (section === 'movies') loadMoviesSection();
    if (section === 'series') loadSeriesSection();
    if (section === 'upload') loadUploadSection();
    if (section === 'users') loadUsersSection();
    if (section === 'settings') loadSettingsSection();
}

// Load All Sections
function loadAllSections() {
    loadMoviesSection();
    loadSeriesSection();
    loadUploadSection();
    loadUsersSection();
    loadSettingsSection();
}

// MOVIES SECTION
function loadMoviesSection() {
    const section = document.getElementById('moviesSection');
    section.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">🎬 All Movies</h2>
            <button class="btn-gradient" onclick="openAddMovieModal()">➕ Add Movie</button>
        </div>
        
        <div class="neon-card" style="margin-bottom: 2rem;">
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <input type="text" class="form-input" placeholder="🔍 Search movies..." id="movieSearch" onkeyup="filterMovies()" style="flex: 1; min-width: 250px;">
                <select class="form-select" id="genreFilter" onchange="filterMovies()" style="width: 200px;">
                    <option value="">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                </select>
                <select class="form-select" id="statusFilter" onchange="filterMovies()" style="width: 200px;">
                    <option value="">All Status</option>
                    <option value="Released">Released</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Trending">Trending</option>
                </select>
            </div>
        </div>
        
        <div class="table-container">
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Rating</th>
                            <th>Genre</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="moviesTableBody"></tbody>
                </table>
            </div>
        </div>
    `;
    renderMoviesTable();
}

function renderMoviesTable() {
    const tbody = document.getElementById('moviesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = moviesData.map(movie => `
        <tr>
            <td><img src="${movie.poster}" class="table-thumb" onerror="this.src='https://via.placeholder.com/60x90?text=No+Image'"></td>
            <td><strong>${movie.title}</strong></td>
            <td>${movie.year}</td>
            <td>⭐ ${movie.rating}</td>
            <td>${movie.genre}</td>
            <td>${movie.duration}</td>
            <td><span class="badge badge-success">${movie.status}</span></td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-icon" onclick="editMovie(${movie.id})" title="Edit">✏️</button>
                    <button class="btn-icon" onclick="deleteMovie(${movie.id})" title="Delete">🗑️</button>
                    <button class="btn-icon" onclick="viewMovieDetails(${movie.id})" title="View">👁️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function filterMovies() {
    // Filter logic here
    renderMoviesTable();
}

function openAddMovieModal() {
    showMovieModal();
}

function showMovieModal(movieId = null) {
    const movie = movieId ? moviesData.find(m => m.id === movieId) : null;
    const isEdit = !!movie;
    
    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? '✏️ Edit Movie' : '➕ Add New Movie'}</h2>
                    <button class="modal-close" onclick="closeModal()">✕</button>
                </div>
                <div class="modal-body">
                    <form id="movieForm" onsubmit="saveMovie(event, ${movieId})">
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Movie Title *</label>
                                <input type="text" class="form-input" id="movieTitle" value="${movie?.title || ''}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Year *</label>
                                <input type="number" class="form-input" id="movieYear" value="${movie?.year || ''}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Genre *</label>
                                <input type="text" class="form-input" id="movieGenre" value="${movie?.genre || ''}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Duration *</label>
                                <input type="text" class="form-input" id="movieDuration" value="${movie?.duration || ''}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Rating *</label>
                                <input type="number" step="0.1" class="form-input" id="movieRating" value="${movie?.rating || ''}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status *</label>
                                <select class="form-select" id="movieStatus" required>
                                    <option value="Released" ${movie?.status === 'Released' ? 'selected' : ''}>Released</option>
                                    <option value="Upcoming" ${movie?.status === 'Upcoming' ? 'selected' : ''}>Upcoming</option>
                                    <option value="Trending" ${movie?.status === 'Trending' ? 'selected' : ''}>Trending</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Description *</label>
                            <textarea class="form-textarea" id="movieDescription" required>${movie?.description || ''}</textarea>
                        </div>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Cast *</label>
                                <input type="text" class="form-input" id="movieCast" value="${movie?.cast || ''}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Director *</label>
                                <input type="text" class="form-input" id="movieDirector" value="${movie?.director || ''}" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Poster URL *</label>
                            <input type="url" class="form-input" id="moviePoster" value="${movie?.poster || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Video URL *</label>
                            <input type="url" class="form-input" id="movieVideoUrl" value="${movie?.videoUrl || ''}" required>
                        </div>
                        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                            <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                            <button type="submit" class="btn-gradient">${isEdit ? 'Update Movie' : 'Add Movie'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modalContainer').innerHTML = modalHTML;
}

function saveMovie(event, movieId) {
    event.preventDefault();
    
    const movieData = {
        title: document.getElementById('movieTitle').value,
        year: document.getElementById('movieYear').value,
        genre: document.getElementById('movieGenre').value,
        duration: document.getElementById('movieDuration').value,
        rating: document.getElementById('movieRating').value,
        status: document.getElementById('movieStatus').value,
        description: document.getElementById('movieDescription').value,
        cast: document.getElementById('movieCast').value,
        director: document.getElementById('movieDirector').value,
        poster: document.getElementById('moviePoster').value,
        videoUrl: document.getElementById('movieVideoUrl').value
    };
    
    if (movieId) {
        const index = moviesData.findIndex(m => m.id === movieId);
        moviesData[index] = { ...moviesData[index], ...movieData };
    } else {
        movieData.id = moviesData.length > 0 ? Math.max(...moviesData.map(m => m.id)) + 1 : 1;
        moviesData.push(movieData);
    }
    
    saveData();
    updateStats();
    loadRecentUploads();
    renderMoviesTable();
    closeModal();
    alert(movieId ? '✅ Movie updated successfully!' : '✅ Movie added successfully!');
}

function editMovie(id) {
    showMovieModal(id);
}

function deleteMovie(id) {
    if (confirm('Are you sure you want to delete this movie?')) {
        moviesData = moviesData.filter(m => m.id !== id);
        saveData();
        updateStats();
        loadRecentUploads();
        renderMoviesTable();
        alert('✅ Movie deleted successfully!');
    }
}

function viewMovieDetails(id) {
    const movie = moviesData.find(m => m.id === id);
    if (movie) {
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
        window.open('movie-details.html', '_blank');
    }
}

// SERIES SECTION
function loadSeriesSection() {
    const section = document.getElementById('seriesSection');
    section.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">📺 All Series</h2>
            <button class="btn-gradient" onclick="openAddSeriesModal()">➕ Add Series</button>
        </div>
        
        <div class="table-container">
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Seasons</th>
                            <th>Episodes</th>
                            <th>Rating</th>
                            <th>Genre</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="seriesTableBody"></tbody>
                </table>
            </div>
        </div>
    `;
    renderSeriesTable();
}

function renderSeriesTable() {
    const tbody = document.getElementById('seriesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = seriesData.map(series => `
        <tr>
            <td><img src="${series.poster}" class="table-thumb"></td>
            <td><strong>${series.title}</strong></td>
            <td>${series.seasons}</td>
            <td>${series.episodes}</td>
            <td>⭐ ${series.rating}</td>
            <td>${series.genre}</td>
            <td><span class="badge badge-success">${series.status}</span></td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-icon" onclick="editSeries(${series.id})">✏️</button>
                    <button class="btn-icon" onclick="deleteSeries(${series.id})">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openAddSeriesModal() {
    alert('Series management modal - Coming soon!');
}

function editSeries(id) {
    alert('Edit series - Coming soon!');
}

function deleteSeries(id) {
    if (confirm('Delete this series?')) {
        seriesData = seriesData.filter(s => s.id !== id);
        saveData();
        updateStats();
        renderSeriesTable();
        alert('✅ Series deleted!');
    }
}

// UPLOAD MANAGER SECTION
function loadUploadSection() {
    const section = document.getElementById('uploadSection');
    section.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">⬆️ Upload Manager</h2>
        </div>
        
        <div class="neon-card">
            <h3 style="margin-bottom: 1.5rem; color: var(--neon-blue);">📁 Upload Files</h3>
            <div class="form-group">
                <label class="form-label">Upload Poster Image</label>
                <input type="file" class="form-input" accept="image/*" onchange="handleFileUpload(event, 'poster')">
                <div id="posterProgress" style="margin-top: 1rem;"></div>
            </div>
            <div class="form-group">
                <label class="form-label">Upload Video File</label>
                <input type="file" class="form-input" accept="video/*" onchange="handleFileUpload(event, 'video')">
                <div id="videoProgress" style="margin-top: 1rem;"></div>
            </div>
            <p style="color: var(--text-secondary); margin-top: 1rem;">
                💡 Tip: For better performance, use external hosting services like YouTube, Vimeo, or cloud storage and paste the URL in the movie form.
            </p>
        </div>
    `;
}

function handleFileUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;
    
    const progressId = type === 'poster' ? 'posterProgress' : 'videoProgress';
    const progressDiv = document.getElementById(progressId);
    
    // Simulate upload progress
    let progress = 0;
    progressDiv.innerHTML = `
        <div style="background: rgba(0, 212, 255, 0.1); border-radius: 10px; overflow: hidden;">
            <div id="${type}Bar" style="height: 30px; background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple)); width: 0%; transition: width 0.3s; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;"></div>
        </div>
        <p style="margin-top: 0.5rem; color: var(--text-secondary);">Uploading ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</p>
    `;
    
    const interval = setInterval(() => {
        progress += 10;
        document.getElementById(type + 'Bar').style.width = progress + '%';
        document.getElementById(type + 'Bar').textContent = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressDiv.innerHTML = '<p style="color: var(--neon-green);">✅ Upload complete!</p>';
            }, 500);
        }
    }, 200);
}

// USERS SECTION
function loadUsersSection() {
    const section = document.getElementById('usersSection');
    section.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">👥 All Users</h2>
        </div>
        
        <div class="neon-card" style="margin-bottom: 2rem;">
            <input type="text" class="form-input" placeholder="🔍 Search users..." id="userSearch" onkeyup="filterUsers()">
        </div>
        
        <div class="table-container">
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subscription</th>
                            <th>Join Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="usersTableBody"></tbody>
                </table>
            </div>
        </div>
    `;
    renderUsersTable();
}

function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = usersData.map(user => `
        <tr>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td><span class="badge badge-success">${user.subscription}</span></td>
            <td>${user.joinDate}</td>
            <td><span class="badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}">${user.status.toUpperCase()}</span></td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-icon" onclick="toggleUserStatus(${user.id})" title="${user.status === 'active' ? 'Block' : 'Unblock'}">${user.status === 'active' ? '🚫' : '✅'}</button>
                    <button class="btn-icon" onclick="deleteUser(${user.id})" title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function filterUsers() {
    renderUsersTable();
}

function toggleUserStatus(id) {
    const user = usersData.find(u => u.id === id);
    user.status = user.status === 'active' ? 'blocked' : 'active';
    saveData();
    renderUsersTable();
    alert(`✅ User ${user.status === 'active' ? 'unblocked' : 'blocked'}!`);
}

function deleteUser(id) {
    if (confirm('Delete this user?')) {
        usersData = usersData.filter(u => u.id !== id);
        saveData();
        updateStats();
        renderUsersTable();
        alert('✅ User deleted!');
    }
}

// SETTINGS SECTION
function loadSettingsSection() {
    const section = document.getElementById('settingsSection');
    section.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">⚙️ App Settings</h2>
        </div>
        
        <div class="form-container">
            <form onsubmit="saveSettings(event)">
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">App Name</label>
                        <input type="text" class="form-input" id="appName" value="${appSettings.appName}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">App Logo (Emoji)</label>
                        <input type="text" class="form-input" id="appLogo" value="${appSettings.appLogo}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Theme</label>
                        <select class="form-select" id="appTheme">
                            <option value="dark" ${appSettings.theme === 'dark' ? 'selected' : ''}>Dark</option>
                            <option value="light" ${appSettings.theme === 'light' ? 'selected' : ''}>Light</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">TMDB API Key</label>
                        <input type="text" class="form-input" id="tmdbApiKey" value="${appSettings.tmdbApiKey}" placeholder="Enter TMDB API Key">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Custom CSS</label>
                    <textarea class="form-textarea" id="customCss" placeholder="Enter custom CSS code...">${appSettings.customCss || ''}</textarea>
                </div>
                <button type="submit" class="btn-gradient">💾 Save Settings</button>
            </form>
        </div>
    `;
}

function saveSettings(event) {
    event.preventDefault();
    appSettings.appName = document.getElementById('appName').value;
    appSettings.appLogo = document.getElementById('appLogo').value;
    appSettings.theme = document.getElementById('appTheme').value;
    appSettings.tmdbApiKey = document.getElementById('tmdbApiKey').value;
    appSettings.customCss = document.getElementById('customCss').value;
    saveData();
    alert('✅ Settings saved successfully!');
}

// Utility Functions
function closeModal(event) {
    if (event && event.target.className !== 'modal-overlay') return;
    document.getElementById('modalContainer').innerHTML = '';
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function toggleTheme() {
    const icon = document.getElementById('themeIcon');
    icon.textContent = icon.textContent === '🌙' ? '☀️' : '🌙';
    alert('Theme toggle - Coming soon!');
}
</body>
</html>