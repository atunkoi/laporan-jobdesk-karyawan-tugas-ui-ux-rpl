// Fungsi untuk menangani logout
function handleLogout() {
    // Dalam implementasi nyata, ini akan menghapus session/token
    // Untuk versi dummy, kita hanya redirect ke halaman login
    localStorage.clear(); // Membersihkan data lokal jika ada
    sessionStorage.clear(); // Membersihkan session jika ada
    window.location.href = '../login.html';
}

// Fungsi untuk menangani submit form login
function handleLoginSubmit(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulasi login - dalam aplikasi nyata, ini akan terhubung ke backend
    if(username.toLowerCase() === 'admin') {
        // Redirect ke dashboard admin
        window.location.href = 'admin/dashboard.html';
    } else if(username.toLowerCase() === 'karyawan') {
        // Redirect ke dashboard karyawan
        window.location.href = 'karyawan/dashboard.html';
    } else {
        alert('Username tidak dikenali. Gunakan "admin" atau "karyawan" untuk login.');
    }
}

// Fungsi untuk menangani filter tabel
function setupTableFilter(searchInputId, tableBodySelector) {
    const searchInput = document.getElementById(searchInputId);
    if (!searchInput) return;
    
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll(tableBodySelector + ' tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if(text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Fungsi untuk menangani filter berdasarkan status
function setupStatusFilter(filterSelectId, tableBodySelector) {
    const filterSelect = document.getElementById(filterSelectId);
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function() {
        const selectedStatus = this.value;
        const rows = document.querySelectorAll(tableBodySelector + ' tr');
        
        rows.forEach(row => {
            const statusCell = row.cells[row.cells.length - 2].textContent.trim().toLowerCase(); // Asumsi status selalu di kolom kedua dari kanan
            
            if(selectedStatus === '' || statusCell.includes(selectedStatus)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Fungsi untuk menangani filter berdasarkan tanggal
function setupDateFilter(startDateId, endDateId, tableBodySelector) {
    const startDateInput = document.getElementById(startDateId);
    const endDateInput = document.getElementById(endDateId);
    
    if (!startDateInput || !endDateInput) return;
    
    function filterByDate() {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const rows = document.querySelectorAll(tableBodySelector + ' tr');
        
        rows.forEach(row => {
            const tanggal = row.cells[0].textContent; // Asumsi tanggal selalu di kolom pertama
            
            let showRow = true;
            
            if(startDate && tanggal < startDate) {
                showRow = false;
            }
            if(endDate && tanggal > endDate) {
                showRow = false;
            }
            
            row.style.display = showRow ? '' : 'none';
        });
    }
    
    startDateInput.addEventListener('change', filterByDate);
    endDateInput.addEventListener('change', filterByDate);
}

// Fungsi untuk menangani preview form
function setupFormPreview(formId, previewContainerId) {
    const form = document.getElementById(formId);
    const previewContainer = document.getElementById(previewContainerId);
    
    if (!form || !previewContainer) return;
    
    form.addEventListener('input', function() {
        // Dalam implementasi nyata, ini akan menampilkan preview dari data form
        // Untuk versi dummy, kita hanya menampilkan pesan
        previewContainer.innerHTML = '<p class="text-info">Preview akan muncul setelah Anda mengisi formulir...</p>';
    });
}

// Fungsi untuk menangani submit form
function setupFormSubmit(formId, successMessage) {
    const form = document.getElementById(formId);
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Dalam implementasi nyata, ini akan mengirim data ke server
        // Untuk versi dummy, kita hanya menampilkan pesan konfirmasi
        alert(successMessage || 'Data berhasil disimpan!');
        
        // Reset form setelah submit
        form.reset();
        
        // Jika ada tanggal, set ke hari ini
        const dateInputs = form.querySelectorAll('input[type="date"]');
        dateInputs.forEach(input => {
            if (!input.id.includes('start') && !input.id.includes('end')) {
                const today = new Date().toISOString().split('T')[0];
                input.value = today;
            }
        });
    });
}

// Fungsi untuk menangani modal
function setupModal(modalTriggerClass, modalId) {
    const triggers = document.querySelectorAll('.' + modalTriggerClass);
    const modal = document.getElementById(modalId);
    
    if (!modal) return;
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            // Dalam implementasi nyata, ini akan mengisi data modal
            // Untuk versi dummy, kita hanya menampilkan modal
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
}

// Fungsi untuk inisialisasi komponen saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    // Setup event listener untuk form login jika ada
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Setup event listener untuk tombol logout jika ada
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', handleLogout);
    });
    
    // Setup filter tabel jika ada
    setupTableFilter('searchInput', 'tbody');
    setupStatusFilter('filterStatus', 'tbody');
    setupDateFilter('startDateFilter', 'endDateFilter', 'tbody');
    
    // Setup form preview jika ada
    setupFormPreview('reportForm', 'previewContent');
    
    // Setup form submit jika ada
    setupFormSubmit('reportForm', 'Laporan berhasil dikirim!');
});