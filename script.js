document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Store themeIcon reference globally for cleanup
    window.themeIcon = themeIcon;
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add animation classes
        themeToggle.classList.add('animating');
        
        // Create ripple effect
        createRippleEffect(themeToggle);
        
        // Create particle effect
        createParticleEffect(themeToggle);
        
        // Change theme after a short delay for better visual sync
        setTimeout(() => {
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }, 300);
        
        // Update icon with animation
        setTimeout(() => {
            updateThemeIcon(newTheme);
        }, 300);
        
        // Remove animation classes
        setTimeout(() => {
            themeToggle.classList.remove('animating');
        }, 600);
    });
    
    function updateThemeIcon(theme) {
        // Clean up all existing icons first
        const allIcons = themeToggle.querySelectorAll('.theme-icon');
        allIcons.forEach(icon => icon.remove());
        
        // Create new icon
        const newIcon = document.createElement('span');
        newIcon.className = 'theme-icon';
        newIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        
        themeToggle.appendChild(newIcon);
        
        // Update the global themeIcon reference
        window.themeIcon = newIcon;
    }
    
    function createRippleEffect(element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        
        // Position ripple at center of the button
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 1500);
    }
    
    function createParticleEffect(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.dataset.particleId = `particle-${Date.now()}-${i}`;
            
            // Position particles around the button
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 30;
            const x = rect.left + rect.width / 2 + Math.cos(angle) * distance;
            const y = rect.top + rect.height / 2 + Math.sin(angle) * distance;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Set random flight direction
            const tx = (Math.random() - 0.5) * 150;
            const ty = (Math.random() - 0.5) * 150;
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(particle);
            
            // Activate particle animation
            setTimeout(() => {
                particle.classList.add('active');
            }, i * 50);
            
            // Remove particle after animation with cleanup
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 1200 + i * 50);
        }
    }
    
    // Clean up any orphaned particles periodically
    setInterval(() => {
        const orphanedParticles = document.querySelectorAll('.particle');
        orphanedParticles.forEach(particle => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
    }, 5000);
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link and corresponding section
            this.classList.add('active');
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Smooth scroll to top of section
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // Handle navigation buttons
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all links and sections
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                // Find and activate the corresponding nav link
                const targetNavLink = document.querySelector(`[href="#${targetId}"]`);
                if (targetNavLink) {
                    targetNavLink.classList.add('active');
                }
                
                // Activate the target section
                targetSection.classList.add('active');
                
                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Handle preview card links
    const previewLinks = document.querySelectorAll('.preview-link');
    previewLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href');
            const targetNav = document.querySelector(`[href="${targetSection}"]`);
            
            if (targetNav) {
                targetNav.click();
            }
        });
    });

    // Play button animation
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            this.classList.toggle('playing');
            if (this.classList.contains('playing')) {
                this.innerHTML = '❚❚';
                // Here you would typically add actual audio playback logic
                showNotification('Now playing: Break the Chains');
            } else {
                this.innerHTML = '▶';
                // Here you would typically add actual audio pause logic
                showNotification('Paused');
            }
        });
    }

    // Concert ticket link handling - removed to allow normal link behavior

    // Music platform links
    const musicLinks = document.querySelectorAll('.music-link');
    musicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent;
            const albumTitle = this.closest('.album-card').querySelector('h3').textContent;
            showNotification(`Opening ${platform} for ${albumTitle}`);
            // In a real implementation, this would open the respective platform
        });
    });

    // Social media links - removed to allow normal link behavior

    // Scroll animations
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image img');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    window.addEventListener('scroll', handleScroll);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeSection = document.querySelector('.section.active');
        const activeLink = document.querySelector('.nav-link.active');
        const allLinks = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = allLinks.indexOf(activeLink);

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (currentIndex > 0) {
                    allLinks[currentIndex - 1].click();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (currentIndex < allLinks.length - 1) {
                    allLinks[currentIndex + 1].click();
                }
                break;
            case 'Escape':
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                break;
        }
    });

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        const activeLink = document.querySelector('.nav-link.active');
        const allLinks = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = allLinks.indexOf(activeLink);

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < allLinks.length - 1) {
                // Swipe left - next section
                allLinks[currentIndex + 1].click();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous section
                allLinks[currentIndex - 1].click();
            }
        }
    }

    // Dynamic year in footer
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
    }

    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
        
        // Flash theme icon briefly to indicate functionality
        setTimeout(() => {
            themeIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                themeIcon.style.transform = 'scale(1)';
            }, 300);
        }, 1000);
    });
});

// Notification system
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent-red);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInFromRight 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;

    // Add animation keyframes if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInFromRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutToRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutToRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(handleScroll, 10);

// Page visibility API to pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    const videos = document.querySelectorAll('video');
    if (document.hidden) {
        videos.forEach(video => video.pause());
    } else {
        videos.forEach(video => video.play());
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('Something went wrong. Please refresh the page.');
});