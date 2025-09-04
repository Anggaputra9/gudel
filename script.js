// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Mobile Submenu Toggle
function toggleSubmenu() {
    const submenu = document.getElementById('submenu');
    submenu.classList.toggle('hidden');
}

// Homestay Tabs
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active state from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('border-pinus', 'text-pinus');
        button.classList.add('border-transparent', 'text-kabut');
    });
    
    // Show selected tab content
    const selectedContent = document.getElementById(`content-${tabName}`);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }
    
    // Add active state to selected tab button
    const selectedButton = document.getElementById(`tab-${tabName}`);
    if (selectedButton) {
        selectedButton.classList.add('border-pinus', 'text-pinus');
        selectedButton.classList.remove('border-transparent', 'text-kabut');
    }
}

// Gallery Filter
function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update button states
    filterButtons.forEach(button => {
        button.classList.remove('bg-pinus', 'text-white');
        button.classList.add('bg-krem', 'text-kabut');
    });
    
    // Set active button
    event.target.classList.add('bg-pinus', 'text-white');
    event.target.classList.remove('bg-krem', 'text-kabut');
    
    // Filter gallery items
    galleryItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            // Add fade in animation
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 100);
        } else {
            item.style.display = 'none';
        }
    });
}

// Gallery Modal
function openModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// FAQ Toggle
function toggleFAQ(faqNumber) {
    const content = document.getElementById(`faq-content-${faqNumber}`);
    const icon = document.getElementById(`faq-icon-${faqNumber}`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for loading effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.group, .gallery-item, .tab-content > div');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Form validation (if forms are added later)
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// WhatsApp integration helper
function sendWhatsAppMessage(message) {
    const phoneNumber = '6281234567890';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Auto-generate WhatsApp messages for different sections
function generateBookingMessage(type, details = '') {
    const messages = {
        homestay: `Halo! Saya tertarik untuk booking homestay di Gudel Wisata Baturaden. ${details}`,
        camping: `Halo! Saya ingin reservasi camping di Gudel Wisata Baturaden. ${details}`,
        venue: `Halo! Saya ingin sewa venue untuk acara di Gudel Wisata Baturaden. ${details}`,
        promo: `Halo! Saya ingin tahu lebih lanjut tentang promo yang sedang berlaku di Gudel Wisata Baturaden. ${details}`
    };
    
    return messages[type] || `Halo! Saya tertarik dengan Gudel Wisata Baturaden. ${details}`;
}

// Add click handlers for WhatsApp buttons
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // You can customize the message based on the page or section
            const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
            const message = generateBookingMessage(currentPage);
            
            // Update the href with the custom message
            const phoneNumber = '6281234567890';
            const encodedMessage = encodeURIComponent(message);
            this.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        });
    });
});

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Back to top button functionality
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'fixed bottom-8 right-8 w-12 h-12 bg-pinus text-white rounded-full shadow-lg hover:bg-kayu transition-all duration-300 opacity-0 pointer-events-none z-50';
    backToTop.style.fontSize = '20px';
    backToTop.style.fontWeight = 'bold';
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// >>> TAMBAHKAN KODE INI DI BAGIAN BAWAH SCRIPT.JS <<<

document.addEventListener('DOMContentLoaded', function() {
    // Cek dulu apakah kita berada di halaman yang memiliki galeri
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (galleryGrid) {
        // Jika ya, jalankan filter 'all' sebagai default
        filterGallery('all');
    }
});