// ========== NAVBAR ACTIVE LINK ==========
// Deteksi halaman aktif dan tambahkan class active ke menu yang sesuai
document.addEventListener('DOMContentLoaded', function() {
    // Ambil nama file halaman saat ini
    const currentPage = window.location.pathname.split('/').pop();
    
    // Jika halaman kosong atau index, set ke index.html
    const pageName = currentPage || 'index.html';
    
    // Dapatkan semua link navbar
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Loop melalui semua link
    navLinks.forEach(link => {
        // Hapus semua class active dulu
        link.classList.remove('active');
        
        // Ambil href dari link
        const linkHref = link.getAttribute('href');
        
        // Jika link href sama dengan halaman saat ini
        if (pageName === linkHref) {
            link.classList.add('active');
        }
        
        // Jika di halaman index dan link adalah index.html
        // Ini untuk handle kasus ketika URL berakhir dengan '/' atau kosong
        if ((pageName === '' || pageName === '/') && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // ========== LOGO LIGHTBOX FUNCTIONALITY ==========
    // Logo lightbox functionality
    const logoClick = document.querySelector('#logoClick');
    const logoLightbox = document.getElementById('logoLightbox');
    const closeLightbox = document.getElementById('closeLightbox');
    const closeLightboxBtn = document.getElementById('closeLightboxBtn');
    
    if (logoClick && logoLightbox) {
        // Buka lightbox saat logo diklik
        logoClick.addEventListener('click', function(e) {
            e.preventDefault();
            logoLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Tutup lightbox saat tombol close diklik
        if (closeLightbox) {
            closeLightbox.addEventListener('click', function() {
                logoLightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        if (closeLightboxBtn) {
            closeLightboxBtn.addEventListener('click', function() {
                logoLightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Tutup lightbox saat klik di luar konten
        logoLightbox.addEventListener('click', function(e) {
            if (e.target === logoLightbox) {
                logoLightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Tutup lightbox dengan tombol ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && logoLightbox.classList.contains('active')) {
                logoLightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ========== KATA SAMBUTAN SLIDER ==========
    const sambutanSliderItems = document.querySelectorAll('.sambutan-slider-item');
    const sambutanSliderDots = document.querySelectorAll('.sambutan-slider-dot');
    let currentSambutanSlide = 0;
    let sambutanSlideInterval;
    
    if (sambutanSliderItems.length > 0) {
        function goToSambutanSlide(index) {
            sambutanSliderItems.forEach(item => item.classList.remove('active'));
            sambutanSliderDots.forEach(dot => dot.classList.remove('active'));
            
            sambutanSliderItems[index].classList.add('active');
            sambutanSliderDots[index].classList.add('active');
            currentSambutanSlide = index;
        }
        
        function startSambutanAutoSlide() {
            sambutanSlideInterval = setInterval(() => {
                const nextSlide = (currentSambutanSlide + 1) % sambutanSliderItems.length;
                goToSambutanSlide(nextSlide);
            }, 8000);
        }
        
        startSambutanAutoSlide();
        
        sambutanSliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(sambutanSlideInterval);
                goToSambutanSlide(index);
                startSambutanAutoSlide();
            });
        });
        
        const sliderWrapper = document.querySelector('.sambutan-slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', () => {
                clearInterval(sambutanSlideInterval);
            });
            
            sliderWrapper.addEventListener('mouseleave', startSambutanAutoSlide);
        }
    }
    
    // ========== ANGGOTA SLIDER FUNCTION (INFINITE LOOP) ==========
    initAnggotaSliders();
    
    // ========== GANTI ICON PROGRAM KERJA ==========
    updateProgramIcons();
    
    // ========== GALERI MODAL FIX ==========
    initGaleriModals();
    
    // ========== BERITA MODAL FIX ==========
    initBeritaModals();
});

// ========== ANGGOTA SLIDER FUNCTION DENGAN INFINITE LOOP ==========
function initAnggotaSliders() {
    const bidangIds = ['humas', 'olahraga', 'agama', 'media'];
    
    bidangIds.forEach(bidangId => {
        const sliderTrack = document.getElementById(`${bidangId}Slider`);
        if (!sliderTrack) return;
        
        // Setup variables
        let currentIndex = 0;
        let isAnimating = false;
        let autoSlideInterval;
        
        // Ambil semua slide original
        const slides = sliderTrack.querySelectorAll('.anggota-slide');
        const totalSlides = slides.length;
        
        if (totalSlides === 0) return;
        
        // Clone slides untuk infinite effect
        // Clone pertama
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            sliderTrack.appendChild(clone);
        });
        
        // Clone kedua (untuk smooth infinite)
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            sliderTrack.appendChild(clone);
        });
        
        // Update setelah cloning
        const allSlides = sliderTrack.querySelectorAll('.anggota-slide');
        const totalAllSlides = allSlides.length;
        
        // Set initial position (mulai dari set pertama)
        const slideWidth = 180 + 20; // 180px + 20px gap
        sliderTrack.style.transform = `translateX(0px)`;
        
        // Function untuk slide ke kiri (prev)
        function slidePrev() {
            if (isAnimating) return;
            isAnimating = true;
            
            currentIndex--;
            
            // Jika sudah melewati batas awal, pindah ke posisi tengah
            if (currentIndex < 0) {
                // Set posisi ke tengah tanpa animasi
                sliderTrack.style.transition = 'none';
                currentIndex = totalSlides - 1;
                sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
                
                // Force reflow
                void sliderTrack.offsetWidth;
                
                // Kembalikan transisi
                sliderTrack.style.transition = 'transform 0.5s ease';
            }
            
            // Animasikan ke posisi baru
            sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            
            // Reset animating flag setelah animasi selesai
            setTimeout(() => {
                isAnimating = false;
            }, 500);
            
            resetAutoSlide();
        }
        
        // Function untuk slide ke kanan (next)
        function slideNext() {
            if (isAnimating) return;
            isAnimating = true;
            
            currentIndex++;
            
            // Animasikan ke posisi baru
            sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            
            // Jika sudah melewati set kedua, reset ke set pertama tanpa terlihat
            if (currentIndex >= totalSlides * 2) {
                setTimeout(() => {
                    // Set posisi ke set pertama tanpa animasi
                    sliderTrack.style.transition = 'none';
                    currentIndex = totalSlides;
                    sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
                    
                    // Force reflow
                    void sliderTrack.offsetWidth;
                    
                    // Kembalikan transisi
                    sliderTrack.style.transition = 'transform 0.5s ease';
                    isAnimating = false;
                }, 500);
            } else {
                // Reset animating flag setelah animasi selesai
                setTimeout(() => {
                    isAnimating = false;
                }, 500);
            }
            
            resetAutoSlide();
        }
        
        // Auto slide every 3 seconds
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                slideNext();
            }, 3000);
        }
        
        // Reset auto slide timer
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // Add event listeners for navigation buttons
        const prevBtn = document.getElementById(`${bidangId}Prev`);
        const nextBtn = document.getElementById(`${bidangId}Next`);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                slidePrev();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                slideNext();
            });
        }
        
        // Start auto slide
        startAutoSlide();
        
        // Pause on hover
        const container = sliderTrack.parentElement;
        container.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        container.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
        
        // Touch support untuk mobile
        let touchStartX = 0;
        let touchEndX = 0;
        let isTouching = false;
        
        sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            clearInterval(autoSlideInterval);
            isTouching = true;
        }, { passive: true });
        
        sliderTrack.addEventListener('touchmove', (e) => {
            if (!isTouching) return;
            touchEndX = e.touches[0].clientX;
        }, { passive: true });
        
        sliderTrack.addEventListener('touchend', (e) => {
            if (!isTouching) return;
            isTouching = false;
            
            const diff = touchStartX - touchEndX;
            const swipeThreshold = 50;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe kiri -> next
                    slideNext();
                } else {
                    // Swipe kanan -> prev
                    slidePrev();
                }
            }
            
            startAutoSlide();
        }, { passive: true });
        
        // Mouse drag support untuk desktop
        let mouseStartX = 0;
        let isDragging = false;
        
        sliderTrack.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            clearInterval(autoSlideInterval);
            isDragging = true;
            sliderTrack.style.cursor = 'grabbing';
        });
        
        sliderTrack.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        sliderTrack.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const mouseEndX = e.clientX;
            const diff = mouseStartX - mouseEndX;
            const dragThreshold = 50;
            
            if (Math.abs(diff) > dragThreshold) {
                if (diff > 0) {
                    // Drag kiri -> next
                    slideNext();
                } else {
                    // Drag kanan -> prev
                    slidePrev();
                }
            }
            
            sliderTrack.style.cursor = 'grab';
            startAutoSlide();
        });
        
        sliderTrack.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                sliderTrack.style.cursor = 'grab';
                startAutoSlide();
            }
        });
        
        // Set cursor awal
        sliderTrack.style.cursor = 'grab';
    });
}

// ========== GANTI ICON PROGRAM KERJA ==========
function updateProgramIcons() {
    const programIcons = document.querySelectorAll('.program-icon i');
    
    programIcons.forEach(icon => {
        // Bidang Humas
        if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Kolaborasi dengan Divisi Lain')) {
            icon.className = 'fas fa-handshake';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Humas')) {
            icon.className = 'fas fa-users';
        }
        
        // Bidang Olahraga
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Olahraga')) {
            icon.className = 'fas fa-running';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Car Free Day')) {
            icon.className = 'fas fa-bicycle';
        }
        
        // Bidang Agama
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Agama')) {
            icon.className = 'fas fa-pray';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Shalawat')) {
            icon.className = 'fas fa-hands-praying';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Lomba')) {
            icon.className = 'fas fa-award';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Berbagi')) {
            icon.className = 'fas fa-hand-holding-heart';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Event')) {
            icon.className = 'fas fa-calendar-star';
        }
        
        // Bidang Media Kreatif
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Media')) {
            icon.className = 'fas fa-camera';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Workshop')) {
            icon.className = 'fas fa-paint-brush';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Konten')) {
            icon.className = 'fas fa-video';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Desain')) {
            icon.className = 'fas fa-palette';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Dokumentasi')) {
            icon.className = 'fas fa-photo-video';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Produksi')) {
            icon.className = 'fas fa-film';
        }
    });
}

// ========== GALERI MODAL FIX ==========
function initGaleriModals() {
    const galeriButtons = document.querySelectorAll('.btn-galery');
    
    galeriButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus modal lama jika ada
            const oldModal = document.querySelector('.modal-overlay');
            if (oldModal) {
                oldModal.remove();
            }
            
            // Get data dari card
            const card = this.closest('.galeri-item');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const date = card.querySelector('.galeri-date').textContent;
            
            // Buat modal baru
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="close-modal"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-gallery">
                            <div class="modal-gallery-item">
                                <input type="file" id="fileUpload1" accept="image/*" style="display: none;">
                                <label for="fileUpload1" class="upload-label">
                                    <i class="fas fa-plus"></i>
                                    <span>Klik untuk upload foto</span>
                                </label>
                                <img id="preview1" src="" alt="" style="display: none;">
                            </div>
                            <div class="modal-gallery-item">
                                <input type="file" id="fileUpload2" accept="image/*" style="display: none;">
                                <label for="fileUpload2" class="upload-label">
                                    <i class="fas fa-plus"></i>
                                    <span>Klik untuk upload foto</span>
                                </label>
                                <img id="preview2" src="" alt="" style="display: none;">
                            </div>
                            <div class="modal-gallery-item">
                                <input type="file" id="fileUpload3" accept="image/*" style="display: none;">
                                <label for="fileUpload3" class="upload-label">
                                    <i class="fas fa-plus"></i>
                                    <span>Klik untuk upload foto</span>
                                </label>
                                <img id="preview3" src="" alt="" style="display: none;">
                            </div>
                            <div class="modal-gallery-item">
                                <input type="file" id="fileUpload4" accept="image/*" style="display: none;">
                                <label for="fileUpload4" class="upload-label">
                                    <i class="fas fa-plus"></i>
                                    <span>Klik untuk upload foto</span>
                                </label>
                                <img id="preview4" src="" alt="" style="display: none;">
                            </div>
                        </div>
                        
                        <div class="modal-info">
                            <p><strong>Tanggal:</strong> ${date}</p>
                            <p>${description}</p>
                            <div class="modal-actions">
                                <button class="btn-save">
                                    <i class="fas fa-save"></i> Simpan Foto
                                </button>
                                <button class="btn-close-modal">
                                    <i class="fas fa-times"></i> Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Add active class after a delay
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Setup event listeners untuk modal baru
            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) {
                        document.body.removeChild(modal);
                    }
                    document.body.style.overflow = 'auto';
                }, 300);
            };
            
            // Close button
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.querySelector('.btn-close-modal').addEventListener('click', closeModal);
            
            // Click outside to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Setup file upload
            setupFileUpload();
        });
    });
    
    function setupFileUpload() {
        // Setup file upload untuk semua input
        const fileInputs = document.querySelectorAll('input[type="file"]');
        
        fileInputs.forEach((input, index) => {
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const previewId = `preview${index + 1}`;
                        const preview = document.getElementById(previewId);
                        const label = this.closest('.modal-gallery-item').querySelector('.upload-label');
                        
                        if (preview) {
                            preview.src = e.target.result;
                            preview.style.display = 'block';
                            if (label) label.style.display = 'none';
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }
}

// ========== BERITA MODAL FIX ==========
function initBeritaModals() {
    // Fix untuk modal berita (single close)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-berita')) {
            e.preventDefault();
            
            const button = e.target.closest('.btn-berita');
            const newsId = button.getAttribute('data-news');
            const title = button.closest('.berita-card').querySelector('h3').textContent;
            
            // Hapus modal lama jika ada
            const oldModal = document.querySelector('.modal-overlay');
            if (oldModal) {
                oldModal.remove();
            }
            
            const newsData = {
                'recruitment': `
                    <p><strong>Tanggal:</strong> 5 Januari 2026</p>
                    <p>Pendaftaran anggota OSIS baru telah dibuka untuk siswa kelas X dan XI. Persyaratan pendaftaran:</p>
                    <ul>
                        <li>Siswa aktif SMK Tritech Informatika</li>
                        <li>Memiliki nilai akademik minimal 75</li>
                        <li>Memiliki motivasi untuk berkontribusi</li>
                        <li>Tidak memiliki catatan pelanggaran berat</li>
                    </ul>
                    <p>Pendaftaran hingga 15 Januari 2026 melalui website OSIS.</p>
                `,
                'prestasi': `
                    <p><strong>Tanggal:</strong> 20 Desember 2025</p>
                    <p>Tim coding OSIS berhasil meraih juara 2 dalam kompetisi coding tingkat kota yang diadakan oleh Dinas Pendidikan.</p>
                    <p>Tim terdiri dari 3 siswa berhasil membuat aplikasi "E-Learning Helper" yang membantu proses pembelajaran daring.</p>
                    <p>Prestasi ini merupakan kebanggaan bagi sekolah dan OSIS.</p>
                `
            };
            
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="close-modal"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        ${newsData[newsId] || '<p>Konten tidak tersedia.</p>'}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Add active class after a delay
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Setup close event - SINGLE CLOSE
            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) {
                        document.body.removeChild(modal);
                    }
                    document.body.style.overflow = 'auto';
                }, 300);
            };
            
            // Close button
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            
            // Click outside to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
    });
}

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuToggle.innerHTML = navbar.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbar && navbar.classList.contains('active') && 
        !navbar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        navbar.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuToggle.innerHTML = '<i class=\'fas fa-bars\'></i>';
            }
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value) {
            alert('Terima kasih! Anda telah berlangganan newsletter OSIS.');
            emailInput.value = '';
        }
    });
}

// Current year for footer
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = currentYear;
});