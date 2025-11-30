<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Pages Site</title>
</head>
<body>
// Authentication
const ADMIN_USERNAME = 'hubbymovies007';
const ADMIN_PASSWORD = 'hubby555';

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardPage').classList.add('active');
        loadData();
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        location.reload();
    }
}

// Check if already logged in
window.onload = function() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardPage').classList.add('active');
        loadData();
    }
};

// Initial Data
let moviesData = [
    { title: "RRR", genre: "Action, Drama", imgSrc: "https://iili.io/F2ziUOJ.jpg", year: "2022", rating: "8.8", status: "published" },
    { title: "Kalki 2898 AD", genre: "Action, Drama", imgSrc: "https://iili.io/KXXLZ7V.jpg", year: "2024", rating: "8.5", status: "published" },
    { title: "Tiger Nageswara Rao", genre: "Dark Comedy", imgSrc: "https://iili.io/K8M02ef.jpg", year: "2023", rating: "7.8", status: "published" },
    { title: "Shershaah", genre: "Biographical War", imgSrc: "https://iili.io/F2zi8Hg.jpg", year: "2021", rating: "8.9", status: "published" },
    { title: "Drishyam 2", genre: "Thriller", imgSrc: "https://iili.io/F2zikUF.jpg", year: "2022", rating: "8.6", status: "published" },
    { title: "Jai Bhim", genre: "Legal Drama", imgSrc: "https://iili.io/F2zigDv.jpg", year: "2021", rating: "9.2", status: "published" },
    { title: "12th Fail", genre: "Biographical Drama", imgSrc: "https://iili.io/F2ziQUX.jpg", year: "2023", rating: "9.1", status: "published" }
];

let seriesData = [
    { title: "Mirzapur", genre: "Crime Thriller", imgSrc: "https://iili.io/F27Hhgt.jpg", seasons: "3", rating: "8.5", status: "published" },
    { title: "The Family Man", genre: "Spy Thriller", imgSrc: "https://iili.io/F27HyrP.jpg", seasons: "2", rating: "8.7", status: "published" },
    { title: "Sacred Games", genre: "Crime Thriller", imgSrc: "https://iili.io/F27HN7n.jpg", seasons: "2", rating: "8.6", status: "published" },
    { title: "Scam 1992", genre: "Biographical Crime", imgSrc: "https://iili.io/F27Hr1S.jpg", seasons: "1", rating: "9.5", status: "published" },
    { title: "Panchayat", genre: "Comedy Drama", imgSrc: "https://iili.io/F27HgB2.jpg", seasons: "3", rating: "8.9", status: "published" }
];

let usersData = [
    { id: "USR001", name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", signupDate: "2024-01-15", status: "active" },
    { id: "USR002", name: "Priya Singh", email: "priya@example.com", phone: "+91 98765 43211", signupDate: "2024-01-20", status: "active" },
    { id: "USR003", name: "Amit Kumar", email: "amit@example.com", phone: "+91 98765 43212", signupDate: "2024-02-10", status: "active" },
    { id: "USR004", name: "Sneha Patel", email: "sneha@example.com", phone: "+91 98765 43213", signupDate: "2024-02-15", status: "inactive" },
    { id: "USR005", name: "Vikram Reddy", email: "vikram@example.com", phone: "+91 98765 43214", signupDate: "2024-03-01", status: "active" }
];

let subscriptionData = [
    { userName: "Rahul Sharma", email: "rahul@example.com", planType: "Premium", amount: "299", startDate: "2024-01-15", endDate: "2024-02-15", status: "active" },
    { userName: "Priya Singh", email: "priya@example.com", planType: "VIP", amount: "599", startDate: "2024-01-20", endDate: "2024-02-20", status: "active" },
    { userName: "Amit Kumar", email: "amit@example.com", planType: "Free", amount: "0", startDate: "2024-02-10", endDate: "2025-02-10", status: "active" },
    { userName: "Sneha Patel", email: "sneha@example.com", planType: "Premium", amount: "299", startDate: "2024-02-15", endDate: "2024-03-15", status: "inactive" },
    { userName: "Vikram Reddy", email: "vikram@example.com", planType: "VIP", amount: "599", startDate: "2024-03-01", endDate: "2024-04-01", status: "active" }
];

// Load from localStorage if exists
function loadData() {
    const savedMovies = localStorage.getItem('moviesData');
    const savedSeries = localStorage.getItem('seriesData');
    const savedUsers = localStorage.getItem('usersData');
    const savedSubscriptions = localStorage.getItem('subscriptionData');
    
    if (savedMovies) moviesData = JSON.parse(savedMovies);
    if (savedSeries) seriesData = JSON.parse(savedSeries);
    if (savedUsers) usersData = JSON.parse(savedUsers);
    if (savedSubscriptions) subscriptionData = JSON.parse(savedSubscriptions);
    
    renderMoviesTable();
    renderSeriesTable();
    renderUsersTable();
    renderSubscriptionTable();
    updateStats();
}

function saveData() {
    localStorage.setItem('moviesData', JSON.stringify(moviesData));
    localStorage.setItem('seriesData', JSON.stringify(seriesData));
    localStorage.setItem('usersData', JSON.stringify(usersData));
    localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));
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
}

// Movies Functions
function renderMoviesTable() {
    const tbody = document.getElementById('moviesTableBody');
    tbody.innerHTML = '';
    
    moviesData.forEach((movie, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${movie.imgSrc}" class="movie-thumb" onerror="this.src='https://via.placeholder.com/60x90?text=No+Image'"></td>
            <td><strong>${movie.title}</strong></td>
            <td>${movie.genre}</td>
            <td>${movie.year}</td>
            <td>⭐ ${movie.rating}</td>
            <td><span class="status-badge status-${movie.status}">${movie.status === 'published' ? 'Published' : 'Draft'}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-edit" onclick="editMovie(${index})">✏️</button>
                    <button class="btn-icon btn-delete" onclick="deleteMovie(${index})">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddMovieModal() {
    document.getElementById('movieModalTitle').textContent = 'Add New Movie';
    document.getElementById('movieForm').reset();
    document.getElementById('movieIndex').value = '';
    document.getElementById('movieModal').classList.add('active');
}

function closeMovieModal() {
    document.getElementById('movieModal').classList.remove('active');
}

function editMovie(index) {
    const movie = moviesData[index];
    document.getElementById('movieModalTitle').textContent = 'Edit Movie';
    document.getElementById('movieIndex').value = index;
    document.getElementById('movieTitle').value = movie.title;
    document.getElementById('movieGenre').value = movie.genre;
    document.getElementById('movieImage').value = movie.imgSrc;
    document.getElementById('movieYear').value = movie.year;
    document.getElementById('movieRating').value = movie.rating;
    document.getElementById('movieStatus').value = movie.status;
    document.getElementById('movieModal').classList.add('active');
}

function saveMovie(event) {
    event.preventDefault();
    const index = document.getElementById('movieIndex').value;
    const movie = {
        title: document.getElementById('movieTitle').value,
        genre: document.getElementById('movieGenre').value,
        imgSrc: document.getElementById('movieImage').value,
        year: document.getElementById('movieYear').value,
        rating: document.getElementById('movieRating').value,
        status: document.getElementById('movieStatus').value
    };

    if (index === '') {
        moviesData.push(movie);
        alert('Movie added successfully!');
    } else {
        moviesData[index] = movie;
        alert('Movie updated successfully!');
    }

    saveData();
    renderMoviesTable();
    updateStats();
    closeMovieModal();
}

function deleteMovie(index) {
    if (confirm(`Are you sure you want to delete "${moviesData[index].title}"?`)) {
        moviesData.splice(index, 1);
        saveData();
        renderMoviesTable();
        updateStats();
        alert('Movie deleted successfully!');
    }
}

// Series Functions
function renderSeriesTable() {
    const tbody = document.getElementById('seriesTableBody');
    tbody.innerHTML = '';
    
    seriesData.forEach((series, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${series.imgSrc}" class="movie-thumb" onerror="this.src='https://via.placeholder.com/60x90?text=No+Image'"></td>
            <td><strong>${series.title}</strong></td>
            <td>${series.genre}</td>
            <td>${series.seasons} Season${series.seasons > 1 ? 's' : ''}</td>
            <td>⭐ ${series.rating}</td>
            <td><span class="status-badge status-${series.status}">${series.status === 'published' ? 'Published' : 'Draft'}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-edit" onclick="editSeries(${index})">✏️</button>
                    <button class="btn-icon btn-delete" onclick="deleteSeries(${index})">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddSeriesModal() {
    document.getElementById('seriesModalTitle').textContent = 'Add New Series';
    document.getElementById('seriesForm').reset();
    document.getElementById('seriesIndex').value = '';
    document.getElementById('seriesModal').classList.add('active');
}

function closeSeriesModal() {
    document.getElementById('seriesModal').classList.remove('active');
}

function editSeries(index) {
    const series = seriesData[index];
    document.getElementById('seriesModalTitle').textContent = 'Edit Series';
    document.getElementById('seriesIndex').value = index;
    document.getElementById('seriesTitle').value = series.title;
    document.getElementById('seriesGenre').value = series.genre;
    document.getElementById('seriesImage').value = series.imgSrc;
    document.getElementById('seriesSeasons').value = series.seasons;
    document.getElementById('seriesRating').value = series.rating;
    document.getElementById('seriesStatus').value = series.status;
    document.getElementById('seriesModal').classList.add('active');
}

function saveSeries(event) {
    event.preventDefault();
    const index = document.getElementById('seriesIndex').value;
    const series = {
        title: document.getElementById('seriesTitle').value,
        genre: document.getElementById('seriesGenre').value,
        imgSrc: document.getElementById('seriesImage').value,
        seasons: document.getElementById('seriesSeasons').value,
        rating: document.getElementById('seriesRating').value,
        status: document.getElementById('seriesStatus').value
    };

    if (index === '') {
        seriesData.push(series);
        alert('Series added successfully!');
    } else {
        seriesData[index] = series;
        alert('Series updated successfully!');
    }

    saveData();
    renderSeriesTable();
    updateStats();
    closeSeriesModal();
}

function deleteSeries(index) {
    if (confirm(`Are you sure you want to delete "${seriesData[index].title}"?`)) {
        seriesData.splice(index, 1);
        saveData();
        renderSeriesTable();
        updateStats();
        alert('Series deleted successfully!');
    }
}

// Users Functions
function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    usersData.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${user.id}</strong></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.signupDate}</td>
            <td><span class="status-badge status-${user.status}">${user.status === 'active' ? 'Active' : 'Inactive'}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-edit" onclick="editUser(${index})">✏️</button>
                    <button class="btn-icon btn-delete" onclick="deleteUser(${index})">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddUserModal() {
    document.getElementById('userModalTitle').textContent = 'Add New User';
    document.getElementById('userForm').reset();
    document.getElementById('userIndex').value = '';
    document.getElementById('userModal').classList.add('active');
}

function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
}

function editUser(index) {
    const user = usersData[index];
    document.getElementById('userModalTitle').textContent = 'Edit User';
    document.getElementById('userIndex').value = index;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPhone').value = user.phone;
    document.getElementById('userStatus').value = user.status;
    document.getElementById('userModal').classList.add('active');
}

function saveUser(event) {
    event.preventDefault();
    const index = document.getElementById('userIndex').value;
    const user = {
        id: index === '' ? 'USR' + String(usersData.length + 1).padStart(3, '0') : usersData[index].id,
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value,
        signupDate: index === '' ? new Date().toISOString().split('T')[0] : usersData[index].signupDate,
        status: document.getElementById('userStatus').value
    };

    if (index === '') {
        usersData.push(user);
        alert('User added successfully!');
    } else {
        usersData[index] = user;
        alert('User updated successfully!');
    }

    saveData();
    renderUsersTable();
    updateStats();
    closeUserModal();
}

function deleteUser(index) {
    if (confirm(`Are you sure you want to delete user "${usersData[index].name}"?`)) {
        usersData.splice(index, 1);
        saveData();
        renderUsersTable();
        updateStats();
        alert('User deleted successfully!');
    }
}

// Subscription Functions
function renderSubscriptionTable() {
    const tbody = document.getElementById('subscriptionTableBody');
    tbody.innerHTML = '';
    
    subscriptionData.forEach((sub, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${sub.userName}</strong></td>
            <td>${sub.email}</td>
            <td><span class="status-badge status-${sub.planType.toLowerCase()}">${sub.planType}</span></td>
            <td>₹${sub.amount}</td>
            <td>${sub.startDate}</td>
            <td>${sub.endDate}</td>
            <td><span class="status-badge status-${sub.status}">${sub.status === 'active' ? 'Active' : 'Inactive'}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-edit" onclick="editSubscription(${index})">✏️</button>
                    <button class="btn-icon btn-delete" onclick="deleteSubscription(${index})">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddSubscriptionModal() {
    document.getElementById('subscriptionModalTitle').textContent = 'Add Subscription';
    document.getElementById('subscriptionForm').reset();
    document.getElementById('subscriptionIndex').value = '';
    document.getElementById('subscriptionModal').classList.add('active');
}

function closeSubscriptionModal() {
    document.getElementById('subscriptionModal').classList.remove('active');
}

function editSubscription(index) {
    const sub = subscriptionData[index];
    document.getElementById('subscriptionModalTitle').textContent = 'Edit Subscription';
    document.getElementById('subscriptionIndex').value = index;
    document.getElementById('subUserName').value = sub.userName;
    document.getElementById('subEmail').value = sub.email;
    document.getElementById('subPlanType').value = sub.planType;
    document.getElementById('subAmount').value = sub.amount;
    document.getElementById('subStartDate').value = sub.startDate;
    document.getElementById('subEndDate').value = sub.endDate;
    document.getElementById('subStatus').value = sub.status;
    document.getElementById('subscriptionModal').classList.add('active');
}

function saveSubscription(event) {
    event.preventDefault();
    const index = document.getElementById('subscriptionIndex').value;
    const subscription = {
        userName: document.getElementById('subUserName').value,
        email: document.getElementById('subEmail').value,
        planType: document.getElementById('subPlanType').value,
        amount: document.getElementById('subAmount').value,
        startDate: document.getElementById('subStartDate').value,
        endDate: document.getElementById('subEndDate').value,
        status: document.getElementById('subStatus').value
    };

    if (index === '') {
        subscriptionData.push(subscription);
        alert('Subscription added successfully!');
    } else {
        subscriptionData[index] = subscription;
        alert('Subscription updated successfully!');
    }

    saveData();
    renderSubscriptionTable();
    closeSubscriptionModal();
}

function deleteSubscription(index) {
    if (confirm(`Are you sure you want to delete subscription for "${subscriptionData[index].userName}"?`)) {
        subscriptionData.splice(index, 1);
        saveData();
        renderSubscriptionTable();
        alert('Subscription deleted successfully!');
    }
}

// Settings Functions
function saveGeneralSettings(event) {
    event.preventDefault();
    alert('General settings saved successfully!');
}

function changePassword(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (currentPassword !== ADMIN_PASSWORD) {
        alert('Current password is incorrect!');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }

    alert('Password changed successfully! Please login again with new password.');
    // In real application, you would update the password in database
}

function savePaymentSettings(event) {
    event.preventDefault();
    alert('Payment settings saved successfully!');
}
</body>
</html>