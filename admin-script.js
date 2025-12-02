<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Pages Site</title>
</head>
<body>
// Load data on page load
window.onload = function() {
    loadData();
    initializeSections();
};

// Initial Data
let moviesData = [
    { title: "RRR", genre: "Action, Drama", imgSrc: "https://iili.io/F2ziUOJ.jpg", year: "2022", rating: "8.8", status: "published", duration: "187 min", uploadedBy: "Admin", uploadDate: "2024-11-15" },
    { title: "Kalki 2898 AD", genre: "Action, Drama", imgSrc: "https://iili.io/KXXLZ7V.jpg", year: "2024", rating: "8.5", status: "published", duration: "180 min", uploadedBy: "Admin", uploadDate: "2024-12-01" },
    { title: "Tiger Nageswara Rao", genre: "Dark Comedy", imgSrc: "https://iili.io/K8M02ef.jpg", year: "2023", rating: "7.8", status: "published", duration: "175 min", uploadedBy: "Admin", uploadDate: "2024-11-20" },
    { title: "Ek Deewane Ki Deewaniyat", genre: "Romance", imgSrc: "https://iili.io/K6lu9ea.jpg", year: "2024", rating: "7.5", status: "published", duration: "145 min", uploadedBy: "Admin", uploadDate: "2024-11-25" },
    { title: "Shershaah", genre: "Biographical War", imgSrc: "https://iili.io/F2zi8Hg.jpg", year: "2021", rating: "8.9", status: "published", duration: "135 min", uploadedBy: "Admin", uploadDate: "2024-11-10" },
    { title: "12th Fail", genre: "Biographical Drama", imgSrc: "https://iili.io/F2ziQUX.jpg", year: "2023", rating: "9.1", status: "published", duration: "147 min", uploadedBy: "Admin", uploadDate: "2024-11-30" },
    { title: "Housefull 5", genre: "Upcoming Drama", imgSrc: "https://iili.io/F2I2FNp.jpg", year: "2024", rating: "N/A", status: "draft", duration: "150 min", uploadedBy: "Admin", uploadDate: "2024-11-29" }
];

let seriesData = [
    { title: "Mirzapur", genre: "Crime Thriller", imgSrc: "https://iili.io/F27Hhgt.jpg", seasons: "3", episodes: "30", rating: "8.5", status: "published", uploadedBy: "Admin", uploadDate: "2024-11-18" },
    { title: "The Family Man", genre: "Spy Thriller", imgSrc: "https://iili.io/F27HyrP.jpg", seasons: "2", episodes: "19", rating: "8.7", status: "published", uploadedBy: "Admin", uploadDate: "2024-11-22" },
    { title: "Sacred Games", genre: "Crime Thriller", imgSrc: "https://iili.io/F27HN7n.jpg", seasons: "2", episodes: "16", rating: "8.6", status: "published", uploadedBy: "Admin", uploadDate: "2024-11-12" },
    { title: "Scam 1992", genre: "Biographical Crime", imgSrc: "https://iili.io/F27Hr1S.jpg", seasons: "1", episodes: "10", rating: "9.5", status: "published", uploadedBy: "Admin", uploadDate: "2024-11-08" },
    { title: "Panchayat", genre: "Comedy Drama", imgSrc: "https://iili.io/F27HgB2.jpg", seasons: "3", episodes: "24", rating: "8.9", status: "published", uploadedBy: "Admin", uploadDate: "2024-11-28" }
];

let usersData = [
    { id: "USR001", name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", signupDate: "2024-01-15", status: "active", subscription: "Premium", avatar: "👨" },
    { id: "USR002", name: "Priya Singh", email: "priya@example.com", phone: "+91 98765 43211", signupDate: "2024-01-20", status: "active", subscription: "VIP", avatar: "👩" },
    { id: "USR003", name: "Amit Kumar", email: "amit@example.com", phone: "+91 98765 43212", signupDate: "2024-02-10", status: "active", subscription: "Free", avatar: "👨" },
    { id: "USR004", name: "Sneha Patel", email: "sneha@example.com", phone: "+91 98765 43213", signupDate: "2024-02-15", status: "inactive", subscription: "Premium", avatar: "👩" },
    { id: "USR005", name: "Vikram Reddy", email: "vikram@example.com", phone: "+91 98765 43214", signupDate: "2024-03-01", status: "active", subscription: "VIP", avatar: "👨" }
];

let subscriptionPlans = [
    { id: "PLAN001", name: "Free Plan", price: "0", duration: "Lifetime", features: ["SD Quality", "Ads Supported", "Limited Content", "1 Device"], subscribers: 1250, status: "active" },
    { id: "PLAN002", name: "Premium Plan", price: "299", duration: "30 Days", features: ["HD Quality", "No Ads", "Full Content", "2 Devices", "Download"], subscribers: 850, status: "active" },
    { id: "PLAN003", name: "VIP Plan", price: "599", duration: "30 Days", features: ["4K Quality", "No Ads", "Exclusive Content", "4 Devices", "Download", "Early Access"], subscribers: 420, status: "active" }
];

let transactionsData = [
    { id: "TXN001", user: "Rahul Sharma", email: "rahul@example.com", plan: "Premium", amount: "299", date: "2024-12-01", paymentMode: "UPI", status: "success" },
    { id: "TXN002", user: "Priya Singh", email: "priya@example.com", plan: "VIP", amount: "599", date: "2024-12-01", paymentMode: "Card", status: "success" },
    { id: "TXN003", user: "Vikram Reddy", email: "vikram@example.com", plan: "VIP", amount: "599", date: "2024-11-30", paymentMode: "UPI", status: "success" },
    { id: "TXN004", user: "Amit Kumar", email: "amit@example.com", plan: "Premium", amount: "299", date: "2024-11-30", paymentMode: "Wallet", status: "pending" },
    { id: "TXN005", user: "Sneha Patel", email: "sneha@example.com", plan: "Premium", amount: "299", date: "2024-11-29", paymentMode: "Card", status: "failed" }
];

// Load from localStorage if exists
function loadData() {
    const savedMovies = localStorage.getItem('moviesData');
    const savedSeries = localStorage.getItem('seriesData');
    const savedUsers = localStorage.getItem('usersData');
    const savedPlans = localStorage.getItem('subscriptionPlans');
    const savedTransactions = localStorage.getItem('transactionsData');
    
    if (savedMovies) moviesData = JSON.parse(savedMovies);
    if (savedSeries) seriesData = JSON.parse(savedSeries);
    if (savedUsers) usersData = JSON.parse(savedUsers);
    if (savedPlans) subscriptionPlans = JSON.parse(savedPlans);
    if (savedTransactions) transactionsData = JSON.parse(savedTransactions);
    
    updateStats();
}

function saveData() {
    localStorage.setItem('moviesData', JSON.stringify(moviesData));
    localStorage.setItem('seriesData', JSON.stringify(seriesData));
    localStorage.setItem('usersData', JSON.stringify(usersData));
    localStorage.setItem('subscriptionPlans', JSON.stringify(subscriptionPlans));
    localStorage.setItem('transactionsData', JSON.stringify(transactionsData));
}

function updateStats() {
    document.getElementById('totalMovies').textContent = moviesData.length;
    document.getElementById('totalSeries').textContent = seriesData.length;
    document.getElementById('totalUsers').textContent = usersData.length;
}

// Navigation
function showSection(section) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    document.getElementById(section + 'Section').classList.add('active');
    event.target.closest('.nav-link').classList.add('active');
    
    // Load section content
    if (section === 'earnings') loadEarningsSection();
    if (section === 'movies') loadMoviesSection();
    if (section === 'webseries') loadWebSeriesSection();
    if (section === 'upload') loadUploadSection();
    if (section === 'users') loadUsersSection();
    if (section === 'subscription') loadSubscriptionSection();
    if (section === 'settings') loadSettingsSection();
}

// Initialize all sections
function initializeSections() {
    loadEarningsSection();
    loadMoviesSection();
    loadWebSeriesSection();
    loadUploadSection();
    loadUsersSection();
    loadSubscriptionSection();
    loadSettingsSection();
}

// SECTION 2: EARNINGS
function loadEarningsSection() {
    const section = document.getElementById('earningsSection');
    section.innerHTML = `
        <h1 class="page-title">💰 Earnings Management</h1>
        
        <!-- Earnings Summary Cards -->
        <div class="stats-grid">
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">Today's Earnings</div>
                        <div class="stat-value">₹2,450</div>
                        <div class="stat-change positive">↑ ₹450 from yesterday</div>
                    </div>
                    <div class="stat-icon blue">💵</div>
                </div>
            </div>
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">Yesterday</div>
                        <div class="stat-value">₹2,000</div>
                        <div class="stat-change positive">↑ ₹200</div>
                    </div>
                    <div class="stat-icon purple">💰</div>
                </div>
            </div>
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">This Month</div>
                        <div class="stat-value">₹69,500</div>
                        <div class="stat-change positive">↑ 23% growth</div>
                    </div>
                    <div class="stat-icon green">📈</div>
                </div>
            </div>
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">Lifetime Earnings</div>
                        <div class="stat-value">₹4.2L</div>
                        <div class="stat-change positive">Total revenue</div>
                    </div>
                    <div class="stat-icon pink">💎</div>
                </div>
            </div>
        </div>

        <!-- Earnings Graphs -->
        <div class="charts-grid">
            <div class="chart-card glass-effect">
                <div class="chart-header">
                    <h3>📊 Daily Earnings</h3>
                    <select class="chart-filter">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>
                <div class="chart-placeholder">
                    <div class="chart-mock">Bar Chart: Daily Earnings Breakdown</div>
                </div>
            </div>

            <div class="chart-card glass-effect">
                <div class="chart-header">
                    <h3>📈 Monthly Earnings</h3>
                    <select class="chart-filter">
                        <option>Last 6 Months</option>
                        <option>This Year</option>
                    </select>
                </div>
                <div class="chart-placeholder">
                    <div class="chart-mock">Line Chart: Monthly Revenue Trend</div>
                </div>
            </div>
        </div>

        <!-- Transactions Table -->
        <div class="table-card glass-effect">
            <div class="table-header">
                <h3>💳 Recent Transactions</h3>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-secondary" onclick="exportCSV()">📥 Export CSV</button>
                    <button class="btn btn-secondary" onclick="exportPDF()">📄 Export PDF</button>
                </div>
            </div>
            
            <!-- Filters -->
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <input type="date" class="filter-input" placeholder="Start Date">
                <input type="date" class="filter-input" placeholder="End Date">
                <select class="filter-input">
                    <option>All Status</option>
                    <option>Success</option>
                    <option>Pending</option>
                    <option>Failed</option>
                </select>
                <select class="filter-input">
                    <option>All Plans</option>
                    <option>Free</option>
                    <option>Premium</option>
                    <option>VIP</option>
                </select>
                <button class="btn btn-primary">🔍 Filter</button>
            </div>

            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Plan</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Payment Mode</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="transactionsTableBody"></tbody>
                </table>
            </div>
        </div>
    `;
    renderTransactionsTable();
}

function renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    transactionsData.forEach(txn => {
        const statusClass = txn.status === 'success' ? 'badge-success' : txn.status === 'pending' ? 'badge-warning' : 'badge-danger';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${txn.id}</strong></td>
            <td>${txn.user}</td>
            <td>${txn.email}</td>
            <td><span class="badge badge-success">${txn.plan}</span></td>
            <td><strong>₹${txn.amount}</strong></td>
            <td>${txn.date}</td>
            <td>${txn.paymentMode}</td>
            <td><span class="badge ${statusClass}">${txn.status.toUpperCase()}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function exportCSV() {
    alert('📥 Exporting transactions to CSV...');
}

function exportPDF() {
    alert('📄 Exporting transactions to PDF...');
}

// SECTION 3: MOVIES
function loadMoviesSection() {
    const section = document.getElementById('moviesSection');
    section.innerHTML = `
        <h1 class="page-title">🎬 Movies Management</h1>
        
        <!-- Search & Filters -->
        <div class="filters-bar glass-effect">
            <input type="text" class="filter-input" placeholder="🔍 Search movies..." id="movieSearch" onkeyup="filterMovies()">
            <select class="filter-input" id="genreFilter" onchange="filterMovies()">
                <option value="">All Genres</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Thriller">Thriller</option>
                <option value="Romance">Romance</option>
            </select>
            <select class="filter-input" id="yearFilter" onchange="filterMovies()">
                <option value="">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
            </select>
            <select class="filter-input" id="statusFilter" onchange="filterMovies()">
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
            </select>
            <button class="btn btn-primary" onclick="openAddMovieModal()">➕ Add Movie</button>
        </div>

        <!-- Movies Grid -->
        <div class="movies-grid" id="moviesGrid"></div>

        <!-- Movies Table View -->
        <div class="table-card glass-effect" style="margin-top: 2rem;">
            <div class="table-header">
                <h3>📋 Movies List</h3>
                <button class="btn btn-secondary" onclick="toggleView()">🔄 Toggle View</button>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Duration</th>
                            <th>Year</th>
                            <th>Rating</th>
                            <th>Uploaded By</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="moviesTableBody"></tbody>
                </table>
            </div>
        </div>
    `;
    renderMoviesGrid();
    renderMoviesTable();
}

function renderMoviesGrid() {
    const grid = document.getElementById('moviesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    moviesData.forEach((movie, index) => {
        const card = document.createElement('div');
        card.className = 'movie-card glass-effect';
        card.innerHTML = `
            <img src="${movie.imgSrc}" alt="${movie.title}" class="movie-poster" onerror="this.src='https://via.placeholder.com/300x450?text=No+Image'">
            <div class="movie-card-info">
                <h3>${movie.title}</h3>
                <p class="movie-genre">${movie.genre}</p>
                <div class="movie-meta">
                    <span>⭐ ${movie.rating}</span>
                    <span>${movie.year}</span>
                </div>
                <div class="movie-actions">
                    <button class="btn-icon" onclick="editMovie(${index})" title="Edit">✏️</button>
                    <button class="btn-icon" onclick="deleteMovie(${index})" title="Delete">🗑️</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderMoviesTable() {
    const tbody = document.getElementById('moviesTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    moviesData.forEach((movie, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${movie.imgSrc}" class="table-thumb" onerror="this.src='https://via.placeholder.com/60x90?text=No+Image'"></td>
            <td><strong>${movie.title}</strong></td>
            <td>${movie.genre}</td>
            <td>${movie.duration}</td>
            <td>${movie.year}</td>
            <td>⭐ ${movie.rating}</td>
            <td>${movie.uploadedBy}</td>
            <td><span class="badge ${movie.status === 'published' ? 'badge-success' : 'badge-warning'}">${movie.status.toUpperCase()}</span></td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-icon" onclick="editMovie(${index})">✏️</button>
                    <button class="btn-icon" onclick="deleteMovie(${index})">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterMovies() {
    const search = document.getElementById('movieSearch')?.value.toLowerCase() || '';
    const genre = document.getElementById('genreFilter')?.value || '';
    const year = document.getElementById('yearFilter')?.value || '';
    const status = document.getElementById('statusFilter')?.value || '';
    
    // Filter logic here
    renderMoviesGrid();
    renderMoviesTable();
}

function toggleView() {
    const grid = document.getElementById('moviesGrid');
    const table = document.querySelector('.table-card');
    if (grid.style.display === 'none') {
        grid.style.display = 'grid';
        table.style.display = 'none';
    } else {
        grid.style.display = 'none';
        table.style.display = 'block';
    }
}

function openAddMovieModal() {
    alert('🎬 Add Movie Modal - Coming Soon!');
}

function editMovie(index) {
    alert(`✏️ Edit Movie: ${moviesData[index].title}`);
}

function deleteMovie(index) {
    if (confirm(`Delete "${moviesData[index].title}"?`)) {
        moviesData.splice(index, 1);
        saveData();
        renderMoviesGrid();
        renderMoviesTable();
        updateStats();
        alert('✅ Movie deleted successfully!');
    }
}

// Continue with other sections...
// Due to character limit, I'll create the remaining sections in the next update

// SECTION 4: WEB SERIES
function loadWebSeriesSection() {
    const section = document.getElementById('webseriesSection');
    section.innerHTML = `
        <h1 class="page-title">📺 Web Series Management</h1>
        
        <!-- Search & Filters -->
        <div class="filters-bar glass-effect">
            <input type="text" class="filter-input" placeholder="🔍 Search series..." id="seriesSearch">
            <select class="filter-input">
                <option>All Categories</option>
                <option>Crime</option>
                <option>Thriller</option>
                <option>Drama</option>
                <option>Comedy</option>
            </select>
            <select class="filter-input">
                <option>All Years</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
            </select>
            <select class="filter-input">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
            </select>
            <button class="btn btn-primary" onclick="openAddSeriesModal()">➕ Add Series</button>
        </div>

        <!-- Series Grid -->
        <div class="movies-grid" id="seriesGrid"></div>
    `;
    renderSeriesGrid();
}

function renderSeriesGrid() {
    const grid = document.getElementById('seriesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    seriesData.forEach((series, index) => {
        const card = document.createElement('div');
        card.className = 'movie-card glass-effect';
        card.innerHTML = `
            <img src="${series.imgSrc}" alt="${series.title}" class="movie-poster">
            <div class="movie-card-info">
                <h3>${series.title}</h3>
                <p class="movie-genre">${series.genre}</p>
                <div class="movie-meta">
                    <span>⭐ ${series.rating}</span>
                    <span>${series.seasons} Seasons</span>
                    <span>${series.episodes} Episodes</span>
                </div>
                <div class="movie-actions">
                    <button class="btn-icon" onclick="editSeries(${index})">✏️</button>
                    <button class="btn-icon" onclick="deleteSeries(${index})">🗑️</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openAddSeriesModal() {
    alert('📺 Add Series Modal - Coming Soon!');
}

function editSeries(index) {
    alert(`✏️ Edit Series: ${seriesData[index].title}`);
}

function deleteSeries(index) {
    if (confirm(`Delete "${seriesData[index].title}"?`)) {
        seriesData.splice(index, 1);
        saveData();
        renderSeriesGrid();
        updateStats();
        alert('✅ Series deleted successfully!');
    }
}

// SECTION 5: UPLOAD MOVIE
function loadUploadSection() {
    const section = document.getElementById('uploadSection');
    section.innerHTML = `
        <h1 class="page-title">⬆️ Upload Movie</h1>
        
        <div class="upload-container glass-effect">
            <form id="uploadMovieForm" class="upload-form">
                <!-- Movie Information -->
                <div class="form-section">
                    <h3>📝 Movie Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Movie Title *</label>
                            <input type="text" required placeholder="Enter movie title">
                        </div>
                        <div class="form-group">
                            <label>Release Year *</label>
                            <input type="number" required placeholder="2024">
                        </div>
                        <div class="form-group">
                            <label>Genre/Category *</label>
                            <input type="text" required placeholder="Action, Drama">
                        </div>
                        <div class="form-group">
                            <label>Duration *</label>
                            <input type="text" required placeholder="120 min">
                        </div>
                        <div class="form-group">
                            <label>IMDb Rating *</label>
                            <input type="number" step="0.1" required placeholder="8.5">
                        </div>
                        <div class="form-group">
                            <label>Cast</label>
                            <input type="text" placeholder="Actor 1, Actor 2">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description *</label>
                        <textarea rows="4" required placeholder="Enter movie description..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Tags</label>
                        <input type="text" placeholder="action, thriller, drama">
                    </div>
                </div>

                <!-- Media Upload -->
                <div class="form-section">
                    <h3>🎬 Media Upload</h3>
                    <div class="upload-area">
                        <div class="upload-box">
                            <span class="upload-icon">🖼️</span>
                            <p>Upload Poster</p>
                            <input type="file" accept="image/*">
                        </div>
                        <div class="upload-box">
                            <span class="upload-icon">🎥</span>
                            <p>Upload Trailer</p>
                            <input type="file" accept="video/*">
                        </div>
                        <div class="upload-box">
                            <span class="upload-icon">📹</span>
                            <p>Upload Full Movie</p>
                            <input type="file" accept="video/*">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Or Enter Video URL</label>
                        <input type="url" placeholder="https://...">
                    </div>
                    <div class="quality-urls">
                        <h4>Multiple Quality URLs</h4>
                        <input type="url" placeholder="360p URL">
                        <input type="url" placeholder="480p URL">
                        <input type="url" placeholder="720p URL">
                        <input type="url" placeholder="1080p URL">
                    </div>
                </div>

                <!-- SEO Section -->
                <div class="form-section">
                    <h3>🔍 SEO Settings</h3>
                    <div class="form-group">
                        <label>Meta Title</label>
                        <input type="text" placeholder="SEO title">
                    </div>
                    <div class="form-group">
                        <label>Meta Description</label>
                        <textarea rows="3" placeholder="SEO description"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Keywords</label>
                        <input type="text" placeholder="keyword1, keyword2">
                    </div>
                </div>

                <!-- Publish Options -->
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary">💾 Save as Draft</button>
                    <button type="submit" class="btn btn-primary glow-btn">🚀 Publish Now</button>
                </div>
            </form>
        </div>
    `;
}

// SECTION 6: USERS
function loadUsersSection() {
    const section = document.getElementById('usersSection');
    section.innerHTML = `
        <h1 class="page-title">👥 Users Management</h1>
        
        <!-- User Stats -->
        <div class="stats-grid">
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">Total Users</div>
                        <div class="stat-value">${usersData.length}</div>
                    </div>
                    <div class="stat-icon blue">👥</div>
                </div>
            </div>
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">Active Users</div>
                        <div class="stat-value">${usersData.filter(u => u.status === 'active').length}</div>
                    </div>
                    <div class="stat-icon green">✅</div>
                </div>
            </div>
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">Premium Users</div>
                        <div class="stat-value">${usersData.filter(u => u.subscription === 'Premium').length}</div>
                    </div>
                    <div class="stat-icon purple">💎</div>
                </div>
            </div>
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">Free Users</div>
                        <div class="stat-value">${usersData.filter(u => u.subscription === 'Free').length}</div>
                    </div>
                    <div class="stat-icon pink">🆓</div>
                </div>
            </div>
        </div>

        <!-- Users Table -->
        <div class="table-card glass-effect">
            <div class="table-header">
                <h3>📋 All Users</h3>
                <button class="btn btn-primary" onclick="openAddUserModal()">➕ Add User</button>
            </div>
            
            <!-- Filters -->
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <select class="filter-input">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Blocked</option>
                </select>
                <select class="filter-input">
                    <option>All Subscriptions</option>
                    <option>Free</option>
                    <option>Premium</option>
                    <option>VIP</option>
                </select>
                <input type="text" class="filter-input" placeholder="Search users...">
            </div>

            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Joined Date</th>
                            <th>Subscription</th>
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
    tbody.innerHTML = '';
    
    usersData.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><div class="user-avatar">${user.avatar}</div></td>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.signupDate}</td>
            <td><span class="badge badge-success">${user.subscription}</span></td>
            <td><span class="badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}">${user.status.toUpperCase()}</span></td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-icon" onclick="viewUser(${index})" title="View">👁️</button>
                    <button class="btn-icon" onclick="blockUser(${index})" title="Block">🚫</button>
                    <button class="btn-icon" onclick="deleteUser(${index})" title="Delete">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddUserModal() {
    alert('➕ Add User Modal - Coming Soon!');
}

function viewUser(index) {
    alert(`👁️ View User: ${usersData[index].name}`);
}

function blockUser(index) {
    usersData[index].status = usersData[index].status === 'active' ? 'inactive' : 'active';
    saveData();
    renderUsersTable();
    alert(`${usersData[index].status === 'active' ? '✅ User unblocked' : '🚫 User blocked'}`);
}

function deleteUser(index) {
    if (confirm(`Delete user "${usersData[index].name}"?`)) {
        usersData.splice(index, 1);
        saveData();
        renderUsersTable();
        alert('✅ User deleted successfully!');
    }
}

// SECTION 7: SUBSCRIPTION
function loadSubscriptionSection() {
    const section = document.getElementById('subscriptionSection');
    section.innerHTML = `
        <h1 class="page-title">💳 Subscription Management</h1>
        
        <!-- Subscription Analytics -->
        <div class="stats-grid">
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">Total Subscribers</div>
                        <div class="stat-value">${subscriptionPlans.reduce((sum, plan) => sum + plan.subscribers, 0)}</div>
                    </div>
                    <div class="stat-icon blue">👥</div>
                </div>
            </div>
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">Active Plans</div>
                        <div class="stat-value">${subscriptionPlans.filter(p => p.status === 'active').length}</div>
                    </div>
                    <div class="stat-icon green">✅</div>
                </div>
            </div>
            <div class="stat-card glass-effect">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">Monthly Revenue</div>
                        <div class="stat-value">₹69.5K</div>
                    </div>
                    <div class="stat-icon purple">💰</div>
                </div>
            </div>
        </div>

        <!-- Plan Distribution Chart -->
        <div class="chart-card glass-effect" style="margin-bottom: 2rem;">
            <div class="chart-header">
                <h3>📊 Plan Distribution</h3>
            </div>
            <div class="chart-placeholder">
                <div class="chart-mock">Pie Chart: Free vs Premium vs VIP</div>
            </div>
        </div>

        <!-- Subscription Plans Grid -->
        <div class="plans-grid" id="plansGrid"></div>
        
        <button class="btn btn-primary" onclick="openAddPlanModal()" style="margin-top: 2rem;">➕ Add New Plan</button>
    `;
    renderPlansGrid();
}

function renderPlansGrid() {
    const grid = document.getElementById('plansGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    subscriptionPlans.forEach((plan, index) => {
        const card = document.createElement('div');
        card.className = 'plan-card glass-effect';
        card.innerHTML = `
            <div class="plan-header">
                <h3>${plan.name}</h3>
                <div class="plan-price">₹${plan.price}<span>/month</span></div>
            </div>
            <div class="plan-duration">${plan.duration}</div>
            <div class="plan-features">
                ${plan.features.map(f => `<div class="feature">✅ ${f}</div>`).join('')}
            </div>
            <div class="plan-stats">
                <div class="stat">
                    <span class="stat-label">Subscribers</span>
                    <span class="stat-value">${plan.subscribers}</span>
                </div>
            </div>
            <div class="plan-actions">
                <button class="btn btn-secondary" onclick="editPlan(${index})">✏️ Edit</button>
                <button class="btn btn-secondary" onclick="deletePlan(${index})">🗑️ Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openAddPlanModal() {
    alert('➕ Add Plan Modal - Coming Soon!');
}

function editPlan(index) {
    alert(`✏️ Edit Plan: ${subscriptionPlans[index].name}`);
}

function deletePlan(index) {
    if (confirm(`Delete plan "${subscriptionPlans[index].name}"?`)) {
        subscriptionPlans.splice(index, 1);
        saveData();
        renderPlansGrid();
        alert('✅ Plan deleted successfully!');
    }
}

// SECTION 8: SETTINGS
function loadSettingsSection() {
    const section = document.getElementById('settingsSection');
    section.innerHTML = `
        <h1 class="page-title">⚙️ Settings</h1>
        
        <div class="settings-grid">
            <!-- General Settings -->
            <div class="setting-card glass-effect">
                <h3>🌐 General Settings</h3>
                <form class="settings-form">
                    <div class="form-group">
                        <label>App Name</label>
                        <input type="text" value="CineHub">
                    </div>
                    <div class="form-group">
                        <label>Logo Upload</label>
                        <input type="file" accept="image/*">
                    </div>
                    <div class="form-group">
                        <label>Favicon</label>
                        <input type="file" accept="image/*">
                    </div>
                    <div class="form-group">
                        <label>Contact Email</label>
                        <input type="email" value="info@cinehub.com">
                    </div>
                    <button type="submit" class="btn btn-primary">💾 Save Changes</button>
                </form>
            </div>

            <!-- Player Settings -->
            <div class="setting-card glass-effect">
                <h3>🎬 Player Settings</h3>
                <form class="settings-form">
                    <div class="form-group">
                        <label>Default Video Quality</label>
                        <select>
                            <option>Auto</option>
                            <option>1080p</option>
                            <option>720p</option>
                            <option>480p</option>
                        </select>
                    </div>
                    <div class="form-group checkbox-group">
                        <input type="checkbox" id="skipIntro" checked>
                        <label for="skipIntro">Skip Intro Button</label>
                    </div>
                    <div class="form-group checkbox-group">
                        <input type="checkbox" id="autoplay" checked>
                        <label for="autoplay">Autoplay Next Episode</label>
                    </div>
                    <div class="form-group checkbox-group">
                        <input type="checkbox" id="watermark">
                        <label for="watermark">Watermark Setting</label>
                    </div>
                    <button type="submit" class="btn btn-primary">💾 Save Changes</button>
                </form>
            </div>

            <!-- Admin Account Settings -->
            <div class="setting-card glass-effect">
                <h3>🔐 Admin Account</h3>
                <form class="settings-form">
                    <div class="form-group">
                        <label>Change Password</label>
                        <input type="password" placeholder="New password">
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm password">
                    </div>
                    <div class="form-group">
                        <label>Change Email</label>
                        <input type="email" value="admin@cinehub.com">
                    </div>
                    <div class="form-group">
                        <label>Theme Mode</label>
                        <select>
                            <option>Dark</option>
                            <option>Light</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">💾 Save Changes</button>
                </form>
            </div>

            <!-- Payment Settings -->
            <div class="setting-card glass-effect">
                <h3>💳 Payment Settings</h3>
                <form class="settings-form">
                    <div class="form-group">
                        <label>Razorpay Key ID</label>
                        <input type="text" placeholder="rzp_test_xxxxx">
                    </div>
                    <div class="form-group">
                        <label>Razorpay Secret Key</label>
                        <input type="password" placeholder="Secret key">
                    </div>
                    <div class="form-group">
                        <label>Stripe Publishable Key</label>
                        <input type="text" placeholder="pk_test_xxxxx">
                    </div>
                    <div class="form-group">
                        <label>Stripe Secret Key</label>
                        <input type="password" placeholder="sk_test_xxxxx">
                    </div>
                    <div class="form-group">
                        <label>Currency</label>
                        <select>
                            <option>INR - ₹</option>
                            <option>USD - $</option>
                            <option>EUR - €</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Payment Callback URL</label>
                        <input type="url" placeholder="https://...">
                    </div>
                    <button type="submit" class="btn btn-primary">💾 Save Changes</button>
                </form>
            </div>
        </div>
    `;
}
</body>
</html>