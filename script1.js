/**
 * =================================================================
 * SKRIP KHUSUS UNTUK HALAMAN GALERI (galeri.html)
 * =================================================================
 * * Mencakup:
 * 1. Fungsi untuk filter galeri.
 * 2. Fungsi untuk menampilkan gambar dalam modal (popup).
 * 3. Fungsi untuk menu navigasi mobile.
 * 4. Inisialisasi galeri agar semua gambar tampil saat halaman dimuat.
 * */

// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', function() {
    
    // Cek dulu apakah kita berada di halaman yang memiliki galeri
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (galleryGrid) {
        // Jika ya, jalankan filter 'all' sebagai default agar semua gambar muncul
        filterGallery('all');
    }
});


/**
 * -----------------------------------------------------------------
 * FUNGSI FILTER GALERI
 * -----------------------------------------------------------------
 * Menyaring item galeri berdasarkan kategori yang dipilih.
 */
function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // 1. Atur ulang style semua tombol filter
    filterButtons.forEach(button => {
        button.classList.remove('bg-pinus', 'text-white');
        button.classList.add('bg-krem', 'text-kabut');
    });

    // 2. Cari dan beri style aktif pada tombol yang diklik/dipilih
    // Menggunakan querySelector agar tidak error saat dipanggil tanpa event klik
    const activeButton = document.querySelector(`.filter-btn[onclick="filterGallery('${category}')"]`);
    if (activeButton) {
        activeButton.classList.add('bg-pinus', 'text-white');
        activeButton.classList.remove('bg-krem', 'text-kabut');
    }

    // 3. Tampilkan atau sembunyikan item galeri sesuai kategori
    galleryItems.forEach(item => {
        // Jika kategori adalah 'all' ATAU item memiliki kelas kategori yang sesuai
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block'; // Tampilkan item
        } else {
            item.style.display = 'none'; // Sembunyikan item
        }
    });
}


/**
 * -----------------------------------------------------------------
 * FUNGSI MODAL GAMBAR (POPUP)
 * -----------------------------------------------------------------
 * Membuka dan menutup popup untuk melihat gambar lebih besar.
 */

// Fungsi untuk membuka modal
function openModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');

    if (modal && modalImage && modalTitle) {
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex'); // Menggunakan flex untuk alignment
        
        // Mencegah body di-scroll saat modal terbuka
        document.body.style.overflow = 'hidden';
    }
}

// Fungsi untuk menutup modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');

        // Mengembalikan kemampuan scroll pada body
        document.body.style.overflow = 'auto';
    }
}

// Tambahkan event listener untuk menutup modal saat menekan tombol Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Tambahkan event listener untuk menutup modal saat mengklik area di luar gambar
const imageModal = document.getElementById('imageModal');
if (imageModal) {
    imageModal.addEventListener('click', function(event) {
        // Cek apakah yang diklik adalah area latar belakang modal itu sendiri
        if (event.target === imageModal) {
            closeModal();
        }
    });
}


/**
 * -----------------------------------------------------------------
 * FUNGSI NAVIGASI MOBILE
 * -----------------------------------------------------------------
 * Untuk menampilkan dan menyembunyikan menu pada perangkat mobile.
 */

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

function toggleSubmenu() {
    const submenu = document.getElementById('submenu');
    if (submenu) {
        submenu.classList.toggle('hidden');
    }
}