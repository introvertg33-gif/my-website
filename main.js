// ========== LOADING STATES FUNCTIONALITY ==========
// Enhanced image loading with loading states
function initImageLoading() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Add loading class immediately
    img.parentElement.classList.add('loading');
    
    img.addEventListener('load', function() {
      // Remove loading class and add loaded class
      this.parentElement.classList.remove('loading');
      this.parentElement.classList.add('loaded');
      this.classList.add('image-loaded');
    });
    
    // If image is already cached and loaded
    if (img.complete) {
      img.parentElement.classList.remove('loading');
      img.parentElement.classList.add('loaded');
      img.classList.add('image-loaded');
    }
    
    // Add error handling
    img.addEventListener('error', function() {
      this.parentElement.classList.remove('loading');
      this.parentElement.classList.add('loaded');
      this.classList.add('image-error');
      console.warn('Image failed to load:', this.src);
    });
  });
}

// Section loading states
function showSectionLoading(section) {
  if (section) {
    section.classList.add('loading');
  }
}

function hideSectionLoading(section) {
  if (section) {
    section.classList.remove('loading');
    section.classList.add('loaded');
  }
}

// Initialize loading states for all sections
function initSectionLoading() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    // Show loading state initially
    showSectionLoading(section);
    
    // Hide loading after content is loaded
    setTimeout(() => {
      hideSectionLoading(section);
    }, Math.random() * 1000 + 500); // Random delay for realistic effect
  });
}

// Portfolio items loading
function initPortfolioLoading() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      item.classList.add('loading');
      
      img.addEventListener('load', () => {
        setTimeout(() => {
          item.classList.remove('loading');
          item.classList.add('loaded');
        }, 300);
      });
      
      if (img.complete) {
        setTimeout(() => {
          item.classList.remove('loading');
          item.classList.add('loaded');
        }, 300);
      }
    }
  });
}

// Service cards loading
function initServiceCardsLoading() {
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.classList.add('loading');
    
    // Stagger loading animation
    setTimeout(() => {
      card.classList.remove('loading');
      card.classList.add('loaded');
    }, index * 200 + 500);
  });
}

// Testimonial cards loading
function initTestimonialLoading() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card, index) => {
    card.classList.add('loading');
    
    // Stagger loading animation
    setTimeout(() => {
      card.classList.remove('loading');
      card.classList.add('loaded');
    }, index * 150 + 400);
  });
}

// Video loading state
function initVideoLoading() {
  const videoContainer = document.querySelector('.video-container');
  const video = videoContainer?.querySelector('video');
  
  if (videoContainer && video) {
    videoContainer.classList.add('loading');
    
    video.addEventListener('loadstart', () => {
      videoContainer.classList.add('loading');
      videoContainer.classList.remove('loaded');
    });
    
    video.addEventListener('canplay', () => {
      videoContainer.classList.remove('loading');
      videoContainer.classList.add('loaded');
    });
    
    video.addEventListener('error', () => {
      videoContainer.classList.remove('loading');
      videoContainer.classList.add('loaded');
      console.warn('Video failed to load');
    });
  }
}

// Form loading state
function showFormLoading(form) {
  if (form) {
    form.classList.add('form-loading');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
  }
}

function hideFormLoading(form, message = 'Send Message') {
  if (form) {
    form.classList.remove('form-loading');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = message;
    }
  }
}

// Admin dashboard loading
function showAdminLoading() {
  const dashboard = document.querySelector('.admin-dashboard');
  if (dashboard) {
    dashboard.classList.add('loading');
  }
}

function hideAdminLoading() {
  const dashboard = document.querySelector('.admin-dashboard');
  if (dashboard) {
    dashboard.classList.remove('loading');
  }
}

// Lightbox loading state
function showLightboxLoading() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.add('loading');
  }
}

function hideLightboxLoading() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('loading');
  }
}

// Back to top button loading
function showBackToTopLoading() {
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.classList.add('loading');
  }
}

function hideBackToTopLoading() {
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.classList.remove('loading');
  }
}

// Initialize all loading states
function initLoadingStates() {
  initImageLoading();
  initSectionLoading();
  initPortfolioLoading();
  initServiceCardsLoading();
  initTestimonialLoading();
  initVideoLoading();
  
  // Initialize loading states after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Add loading states to dynamic content
    observeContentChanges();
  });
}

// Observe content changes for dynamic loading states
function observeContentChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            // Check for new images
            const images = node.querySelectorAll ? node.querySelectorAll('img') : [];
            images.forEach(img => {
              img.parentElement.classList.add('loading');
              img.addEventListener('load', () => {
                img.parentElement.classList.remove('loading');
                img.parentElement.classList.add('loaded');
              });
            });
            
            // Check for new portfolio items
            const portfolioItems = node.querySelectorAll ? node.querySelectorAll('.portfolio-item') : [];
            portfolioItems.forEach(item => {
              item.classList.add('loading');
              const img = item.querySelector('img');
              if (img) {
                img.addEventListener('load', () => {
                  setTimeout(() => {
                    item.classList.remove('loading');
                    item.classList.add('loaded');
                  }, 300);
                });
              }
            });
          }
        });
      }
    });
  });
  
  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.parentElement.classList.add('loading');
          
          img.addEventListener('load', () => {
            img.parentElement.classList.remove('loading');
            img.parentElement.classList.add('loaded');
          });
          
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// Initialize loading states when page loads
initLoadingStates();
initLazyLoading();

// ========== DARK MODE FUNCTIONALITY ==========
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference
function initDarkMode() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    enableDarkMode();
  } else {
    enableLightMode(); // Default to light mode
  }
}

// Enable light mode
function enableLightMode() {
  html.classList.remove('dark-mode');
  localStorage.setItem('theme', 'light');
  if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  updateThemeIcon('light');
}

// Enable dark mode
function enableDarkMode() {
  html.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');
  if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to light mode');
  updateThemeIcon('dark');
}

// Toggle dark mode
function toggleDarkMode() {
  if (html.classList.contains('dark-mode')) {
    enableLightMode();
  } else {
    enableDarkMode();
  }
}

// Update theme icon based on current mode
function updateThemeIcon(mode) {
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('.icon');
  if (!icon) return;
  
  if (mode === 'dark') {
    icon.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    `;
  } else {
    icon.innerHTML = `
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="19"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="19" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    `;
  }
}

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener('click', toggleDarkMode);
  
  // Add keyboard support
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDarkMode();
    }
  });
}

// Initialize dark mode on page load
initDarkMode();

// Enhanced contact form validation
function initContactFormValidation() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const subjectSelect = document.getElementById('subject');
  const messageTextarea = document.getElementById('message');
  const newsletterCheckbox = document.getElementById('newsletter');
  const charCount = document.getElementById('char-count');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');
  
  // Real-time validation
  nameInput.addEventListener('input', () => validateField(nameInput, 'name', validateName));
  nameInput.addEventListener('blur', () => validateField(nameInput, 'name', validateName));
  
  emailInput.addEventListener('input', () => validateField(emailInput, 'email', validateEmail));
  emailInput.addEventListener('blur', () => validateField(emailInput, 'email', validateEmail));
  
  phoneInput.addEventListener('input', () => validateField(phoneInput, 'phone', validatePhone));
  phoneInput.addEventListener('blur', () => validateField(phoneInput, 'phone', validatePhone));
  
  subjectSelect.addEventListener('change', () => validateField(subjectSelect, 'subject', validateSubject));
  subjectSelect.addEventListener('blur', () => validateField(subjectSelect, 'subject', validateSubject));
  
  messageTextarea.addEventListener('input', () => {
    updateCharCount();
    validateField(messageTextarea, 'message', validateMessage);
  });
  messageTextarea.addEventListener('blur', () => validateField(messageTextarea, 'message', validateMessage));
  
  // Form submission
  contactForm.addEventListener('submit', handleFormSubmit);
}

// Validation functions
function validateField(field, fieldName, validationFn) {
  const errorElement = document.getElementById(`${fieldName}-error`);
  const isValid = validationFn(field.value);
  
  if (isValid) {
    field.classList.remove('error');
    errorElement.classList.remove('show');
    errorElement.textContent = '';
  } else {
    field.classList.add('error');
    errorElement.classList.add('show');
    errorElement.textContent = getErrorMessage(fieldName, field.value);
  }
  
  return isValid;
}

function validateName(value) {
  const name = value.trim();
  if (name.length < 2) return false;
  if (name.length > 50) return false;
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return false;
  if (/^\s|\s$/.test(name)) return false;
  return true;
}

function validateEmail(value) {
  const email = value.trim();
  if (email.length < 5) return false;
  if (email.length > 100) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(value) {
  const phone = value.trim();
  if (phone === '') return true; // Optional field
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,20}$/;
  return phoneRegex.test(phone);
}

function validateSubject(value) {
  return value !== '';
}

function validateMessage(value) {
  const message = value.trim();
  if (message.length < 20) return false;
  if (message.length > 1000) return false;
  return true;
}

function getErrorMessage(fieldName, value) {
  const trimmedValue = value.trim();
  
  switch (fieldName) {
    case 'name':
      if (trimmedValue.length < 2) return 'Name must be at least 2 characters long';
      if (trimmedValue.length > 50) return 'Name must be less than 50 characters';
      if (!/^[a-zA-Z\s'-]+$/.test(trimmedValue)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
      if (/^\s|\s$/.test(trimmedValue)) return 'Name cannot be empty or contain only spaces';
      return 'Please enter a valid name';
    
    case 'email':
      if (trimmedValue.length < 5) return 'Email must be at least 5 characters long';
      if (trimmedValue.length > 100) return 'Email must be less than 100 characters';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) return 'Please enter a valid email address';
      return 'Please enter a valid email';
    
    case 'phone':
      if (trimmedValue !== '' && !/^\+?[\d\s\-\(\)]{10,20}$/.test(trimmedValue)) {
        return 'Please enter a valid phone number (include country code)';
      }
      return '';
    
    case 'subject':
      return 'Please select a subject for your message';
    
    case 'message':
      if (trimmedValue.length < 20) return 'Message must be at least 20 characters long';
      if (trimmedValue.length > 1000) return 'Message must be less than 1000 characters';
      return 'Please enter a message';
    
    default:
      return 'Please check this field';
  }
}

function updateCharCount() {
  const messageTextarea = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  if (messageTextarea && charCount) {
    const currentLength = messageTextarea.value.length;
    charCount.textContent = currentLength;
    
    // Change color when approaching limit
    if (currentLength > 900) {
      charCount.style.color = '#dc2626';
    } else if (currentLength > 800) {
      charCount.style.color = '#f59e0b';
    } else {
      charCount.style.color = 'var(--muted, #57606f)';
    }
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const subjectSelect = document.getElementById('subject');
  const messageTextarea = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const formStatus = document.getElementById('form-status');

  // Validate all fields
  const isNameValid = validateField(nameInput, 'name', validateName);
  const isEmailValid = validateField(emailInput, 'email', validateEmail);
  const isPhoneValid = validateField(phoneInput, 'phone', validatePhone);
  const isSubjectValid = validateField(subjectSelect, 'subject', validateSubject);
  const isMessageValid = validateField(messageTextarea, 'message', validateMessage);

  if (!isNameValid || !isEmailValid || !isPhoneValid || !isSubjectValid || !isMessageValid) {
    formStatus.textContent = 'Please correct the errors above and try again.';
    formStatus.className = 'error';
    return;
  }

  // All valid — submit natively to Formspree
  submitBtn.disabled = true;
  if (btnText) btnText.textContent = 'Sending...';
  e.target.submit();
}

// Initialize contact form validation
document.addEventListener('DOMContentLoaded', initContactFormValidation);

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    siteNav.classList.toggle("active");
  });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    menuToggle.classList.remove("active");
    siteNav.classList.remove("active");
  });
});

// ========== LIGHTBOX GALLERY FUNCTIONALITY ==========
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxCurrent = document.getElementById("lightbox-current");
const lightboxTotal = document.getElementById("lightbox-total");
const portfolioItems = document.querySelectorAll(".portfolio-item");

let currentImageIndex = 0;
let allImages = [];

// Initialize lightbox with all portfolio images
function initLightbox() {
  allImages = Array.from(portfolioItems).map(item => ({
    src: item.getAttribute("href"),
    title: item.getAttribute("title") || item.querySelector("img").alt,
    alt: item.querySelector("img").alt
  }));
  
  lightboxTotal.textContent = allImages.length;

  // Add click event to each portfolio item
  portfolioItems.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      currentImageIndex = index;
      openLightbox();
    });
  });
}

function openLightbox() {
  lightbox.classList.add("active");
  loadImage(currentImageIndex);
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

function loadImage(index) {
  const wrapper = document.querySelector(".lightbox-image-wrapper");
  wrapper.classList.add("loading");
  
  const img = new Image();
  img.onload = function () {
    lightboxImage.src = allImages[index].src;
    lightboxCaption.textContent = allImages[index].title;
    lightboxCurrent.textContent = index + 1;
    wrapper.classList.remove("loading");
  };
  img.onerror = function () {
    lightboxCaption.textContent = "Error loading image";
    wrapper.classList.remove("loading");
  };
  img.src = allImages[index].src;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % allImages.length;
  loadImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
  loadImage(currentImageIndex);
}

// Lightbox event listeners
lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", prevImage);
lightboxNext.addEventListener("click", nextImage);

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (!lightbox.classList.contains("active")) return;
  
  if (e.key === "ArrowLeft") prevImage();
  else if (e.key === "ArrowRight") nextImage();
  else if (e.key === "Escape") closeLightbox();
});

// Close lightbox on background click
lightbox.addEventListener("click", function (e) {
  if (e.target === this) closeLightbox();
});

// ========== END LIGHTBOX FUNCTIONALITY ==========

// Smooth scroll and back-to-top
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for nav links, CTAs, and footer links
  document.querySelectorAll('a[href^="#"], .cta-btn, .about-cta-btn, .footer-link').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Back to top button with improved threshold
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 350) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initialize lightbox gallery
  initLightbox();
  
  // Initialize image loading effects
  initImageLoading();

  // ========== PORTFOLIO ANIMATIONS & INTERACTIONS ==========
  
  // Add animation to portfolio items on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all portfolio items
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.classList.add('portfolio-animated');
    observer.observe(item);
  });
  
  // Add portfolio item counter on hover
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
      const counter = document.createElement('div');
      counter.className = 'portfolio-counter';
      counter.textContent = `${index + 1}/${portfolioItems.length}`;
      this.appendChild(counter);
    });
    
    item.addEventListener('mouseleave', function() {
      const counter = this.querySelector('.portfolio-counter');
      if (counter) counter.remove();
    });
  });
  
  // Add click tracking for portfolio engagement
  portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.add('portfolio-clicked');
      setTimeout(() => {
        this.classList.remove('portfolio-clicked');
      }, 600);
    });
  });
  
  // Election image special hover effect
  const electionLink = document.querySelector('.election-link');
  if (electionLink) {
    electionLink.addEventListener('mouseenter', function() {
      this.style.animation = 'pulse 0.6s ease-in-out';
    });
  }

  // ========== ENHANCED ADMIN DASHBOARD ==========
  // Admin credentials (change these to your desired credentials)
  const ADMIN_CREDENTIALS = {
    username: 'amin',
    // Simple hash for demonstration (in production, use proper hashing)
    passwordHash: btoa('admin123') // Base64 encoding as simple protection
  };
  
  const STORAGE_KEY = 'portfolioDesigns';
  const LOGIN_ATTEMPTS_KEY = 'loginAttempts';
  const LOCKOUT_KEY = 'loginLockout';
  
  let isAdminLoggedIn = false;
  let currentEditingDesign = null;
  let loginAttempts = [];
  let isLockedOut = false;

  // DOM Elements
  const adminDashboard = document.getElementById('admin-dashboard');
  const adminGearBtn = document.getElementById('admin-gear-btn');
  const closeAdminBtn = document.getElementById('close-admin');
  const adminLogin = document.getElementById('admin-login');
  const adminPanelContent = document.getElementById('admin-panel-content');
  const adminUsernameInput = document.getElementById('admin-username');
  const adminPasswordInput = document.getElementById('admin-password');
  const adminLoginSubmitBtn = document.getElementById('admin-login-btn');
  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');
  const uploadForm = document.getElementById('upload-form');
  const designImageInput = document.getElementById('design-image');
  const imagePreview = document.getElementById('image-preview');
  const uploadedDesignsContainer = document.getElementById('uploaded-designs');
  
  // URL upload elements
  const designUrlInput = document.getElementById('design-url');
  const urlPreview = document.getElementById('url-preview');
  const fileUploadGroup = document.getElementById('file-upload-group');
  const urlUploadGroup = document.getElementById('url-upload-group');
  
  // Profile management elements
  const profileImageInput = document.getElementById('profile-image');
  const profilePreview = document.getElementById('profile-preview');
  const saveProfileBtn = document.getElementById('save-profile-btn');
  const currentProfileImg = document.getElementById('current-profile-img');
  
  const PROFILE_STORAGE_KEY = 'userProfile';
  const AUTH_STATE_KEY = 'adminAuthState';

  // ========== SECURITY MODULE ==========
  const Security = {
    sanitizeInput: function(input) {
      const div = document.createElement('div');
      div.textContent = input;
      return div.innerHTML;
    },
    
    validateFileType: function(file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
      return allowedTypes.includes(file.type);
    },
    
    validateFileSize: function(file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      return file.size <= maxSize;
    },
    
    hashPassword: function(password) {
      return btoa(password); // Simple Base64 hashing (upgrade to bcrypt in production)
    },
    
    verifyPassword: function(password, hash) {
      return this.hashPassword(password) === hash;
    },
    
    checkLoginAttempts: function() {
      const attempts = JSON.parse(localStorage.getItem(LOGIN_ATTEMPTS_KEY) || '[]');
      const now = Date.now();
      const recentAttempts = attempts.filter(attempt => now - attempt.timestamp < 300000); // 5 minutes
      
      return {
        attempts: recentAttempts,
        isBlocked: recentAttempts.length >= 5,
        blockTimeRemaining: recentAttempts.length >= 5 ? Math.max(0, 300000 - (now - recentAttempts[recentAttempts.length - 1].timestamp)) : 0
      };
    },
    
    recordLoginAttempt: function(success) {
      const attempts = JSON.parse(localStorage.getItem(LOGIN_ATTEMPTS_KEY) || '[]');
      attempts.push({
        timestamp: Date.now(),
        success: success,
        ip: 'client' // In production, get real IP
      });
      
      // Keep only last 10 attempts
      if (attempts.length > 10) {
        attempts.splice(0, attempts.length - 10);
      }
      
      localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));
    },
    
    clearLoginAttempts: function() {
      localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
    }
  };

  // ========== AUTHENTICATION MODULE ==========
  const Auth = {
    checkAuthState: function() {
      const authState = localStorage.getItem(AUTH_STATE_KEY);
      return authState === 'authenticated';
    },
    
    setAuthState: function(isAuthenticated) {
      if (isAuthenticated) {
        localStorage.setItem(AUTH_STATE_KEY, 'authenticated');
      } else {
        localStorage.removeItem(AUTH_STATE_KEY);
      }
      this.updateGearButton(isAuthenticated);
    },
    
    updateGearButton: function(isAuthenticated) {
      if (adminGearBtn) {
        if (isAuthenticated) {
          adminGearBtn.setAttribute('title', 'Admin Dashboard');
        } else {
          adminGearBtn.setAttribute('title', 'Admin Login');
        }
      }
    },
    
    login: function(username, password) {
      // Check if currently blocked
      const attemptStatus = Security.checkLoginAttempts();
      if (attemptStatus.isBlocked) {
        const minutes = Math.ceil(attemptStatus.blockTimeRemaining / 60000);
        alert(`Too many failed attempts. Please try again in ${minutes} minute(s).`);
        return false;
      }
      
      // Sanitize inputs
      const cleanUsername = Security.sanitizeInput(username);
      const cleanPassword = Security.sanitizeInput(password);
      
      // Validate credentials
      const isValid = cleanUsername === ADMIN_CREDENTIALS.username && 
                    Security.verifyPassword(cleanPassword, ADMIN_CREDENTIALS.passwordHash);
      
      // Record attempt
      Security.recordLoginAttempt(isValid);
      
      if (isValid) {
        isAdminLoggedIn = true;
        this.setAuthState(true);
        Security.clearLoginAttempts(); // Clear on successful login
      }
      
      return isValid;
    },
    
    logout: function() {
      isAdminLoggedIn = false;
      this.setAuthState(false);
      this.hideAdminPanel();
      this.showLoginSection();
      ProfileManagement.clearPreview(); // Clear profile preview
    },
    
    toggleAdminPanel: function() {
      if (this.checkAuthState()) {
        // If logged in, toggle dashboard
        if (adminDashboard.style.display === 'flex') {
          this.hideAdminPanel();
        } else {
          this.showAdminPanel();
        }
      } else {
        // If not logged in, show login modal
        this.showAdminPanel();
      }
    },
    
    hideAdminPanel: function() {
      adminDashboard.style.display = 'none';
      document.body.style.overflow = 'auto';
    },
    
    showLoginSection: function() {
      adminLogin.style.display = 'block';
      adminPanelContent.style.display = 'none';
      loginError.textContent = '';
      adminUsernameInput.value = '';
      adminPasswordInput.value = '';
    },
    
    showAdminPanel: function() {
      adminDashboard.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      if (this.checkAuthState()) {
        this.showAdminPanelContent();
      }
    },
    
    showAdminPanelContent: function() {
      adminLogin.style.display = 'none';
      adminPanelContent.style.display = 'block';
      this.showTab('upload');
      PortfolioManagement.loadDesignsList();
      ProfileManagement.loadProfile(); // Load profile picture
    },
    
    showTab: function(tabName) {
      // Update tab buttons
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
      });
      
      // Update tab content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}-tab`);
      });
    }
  };

  // ========== LOCAL STORAGE MODULE ==========
  const Storage = {
    // Public hosting configuration
    PUBLIC_HOSTING: {
      enabled: false, // Disabled for reliability - localStorage first
      baseUrl: '/uploads/', // Relative path to uploads folder
      fallbackToLocal: true // Use localStorage if CDN fails
    },
    
    getDesigns: function() {
      // Try public hosting first, fallback to localStorage
      if (this.PUBLIC_HOSTING.enabled) {
        return this.getPublicDesigns()
          .catch(error => {
            console.warn('Public fetch failed, using localStorage:', error);
            return this.getLocalDesigns();
          });
      }
      return Promise.resolve(this.getLocalDesigns());
    },
    
    getLocalDesigns: function() {
      const stored = localStorage.getItem(STORAGE_KEY);
      let designs = [];
      
      // Handle localStorage parsing errors
      try {
        designs = stored ? JSON.parse(stored) : [];
        
        // Ensure it's an array
        if (!Array.isArray(designs)) {
          console.warn('localStorage data is not an array, converting to empty array');
          designs = [];
        }
      } catch (parseError) {
        console.error('localStorage JSON parse error:', parseError);
        console.warn('Invalid localStorage data, using empty array');
        designs = [];
      }
      
      // Sort by newest first
      return designs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    
    getPublicDesigns: function() {
      // Fetch from public hosting with relative path
      return new Promise((resolve, reject) => {
        fetch('/uploads/designs.json')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Check if response is empty
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              console.warn('Response is not JSON, using empty array');
              resolve([]);
              return;
            }
            
            return response.text().then(text => {
              // Check if response is empty
              if (!text || text.trim() === '') {
                console.warn('Empty response, using empty array');
                resolve([]);
                return;
              }
              
              // Try to parse JSON with error handling
              try {
                const designs = JSON.parse(text);
                
                // Ensure it's an array
                if (!Array.isArray(designs)) {
                  console.warn('Response is not an array, converting to empty array');
                  resolve([]);
                  return;
                }
                
                // Sort by newest first
                const sortedDesigns = designs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                resolve(sortedDesigns);
                
              } catch (parseError) {
                console.error('JSON parse error:', parseError);
                console.warn('Invalid JSON format, using empty array');
                resolve([]);
              }
            });
          })
          .catch(error => {
            console.error('Fetch error:', error);
            console.warn('Failed to fetch public designs, using empty array');
            resolve([]);
          });
      });
    },
    
    saveDesigns: function(designs) {
      // Ensure it's an array
      if (!Array.isArray(designs)) {
        console.warn('saveDesigns received non-array, converting to empty array');
        designs = [];
      }
      
      // Handle localStorage save errors
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
        console.log('Designs saved to localStorage successfully');
      } catch (saveError) {
        console.error('localStorage save error:', saveError);
        console.warn('Failed to save designs to localStorage');
      }
      
      if (this.PUBLIC_HOSTING.enabled) {
        this.uploadToPublicHosting(designs);
      }
    },
    
    uploadToPublicHosting: function(designs) {
      // Upload to public hosting service (implement your API)
      const designsJson = JSON.stringify(designs, null, 2);
      
      // Example: Upload to your endpoint
      fetch('/uploads/save-designs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: designsJson
      })
      .then(response => response.json())
      .then(data => {
        console.log('Designs uploaded to public hosting:', data);
      })
      .catch(error => {
        console.warn('Failed to upload to public hosting:', error);
      });
    },
    
    addDesign: function(design) {
      const designs = this.getLocalDesigns();
      // Ensure it's an array
      if (!Array.isArray(designs)) {
        designs = [];
      }
      
      const newDesign = {
        id: Date.now().toString(),
        title: design.title,
        description: design.description,
        image: design.image,
        createdAt: new Date().toISOString(),
        publicUrl: this.PUBLIC_HOSTING.enabled ? 
          `${this.PUBLIC_HOSTING.baseUrl}${design.id}.${this.getImageExtension(design.image)}` : 
          null
      };
      
      // Safely add to array
      if (Array.isArray(designs)) {
        designs.unshift(newDesign);
      } else {
        designs = [newDesign];
      }
      
      this.saveDesigns(designs);
      return newDesign;
    },
    
    getImageExtension: function(imageDataUrl) {
      // Extract file extension from data URL or regular URL
      if (imageDataUrl.startsWith('data:')) {
        const mimeMatch = imageDataUrl.match(/^data:image\/(\w+);/);
        return mimeMatch ? mimeMatch[1].replace('jpeg', 'jpg') : 'jpg';
      }
      return imageDataUrl.split('.').pop().split('?')[0];
    },
    
    updateDesign: function(id, updates) {
      return this.getDesigns().then(designs => {
        if (!Array.isArray(designs)) {
          designs = [];
        }

        const index = designs.findIndex(d => String(d.id) === String(id));
        if (index !== -1) {
          designs[index] = { ...designs[index], ...updates };
          this.saveDesigns(designs);
          return designs[index];
        }

        return null;
      });
    },
    
    deleteDesign: function(id) {
      return this.getDesigns().then(designs => {
        if (!Array.isArray(designs)) {
          designs = [];
        }

        const filtered = designs.filter(design => String(design.id) !== String(id));
        this.saveDesigns(filtered);
        return filtered.length < designs.length;
      });
    },
    
    formatDate: function(isoString) {
      const date = new Date(isoString);
      const options = { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      return date.toLocaleDateString('en-US', options);
    }
  };

  // ========== PROFILE MANAGEMENT MODULE ==========
  const ProfileManagement = {
    loadProfile: function() {
      const profile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (profile) {
        const profileData = JSON.parse(profile);
        if (profileData.profileImage) {
          this.updateProfileImage(profileData.profileImage);
        }
      }
    },
    
    saveProfile: function(imageData) {
      const profile = {
        profileImage: imageData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      this.updateProfileImage(imageData);
      this.showNotification('Profile picture updated successfully!', 'success');
    },
    
    updateProfileImage: function(imageSrc) {
      // Update admin panel current profile image
      if (currentProfileImg) {
        currentProfileImg.src = imageSrc;
      }
      
      // Update main website profile image if it exists
      const mainProfileImg = document.querySelector('.about-photo');
      if (mainProfileImg) {
        mainProfileImg.src = imageSrc;
      }
    },
    
    showNotification: function(message, type) {
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#dc2626'};
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 6000;
        animation: slideInRight 0.3s ease;
      `;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    },
    
    previewImage: function(file) {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          profilePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
          profilePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        profilePreview.style.display = 'none';
        profilePreview.innerHTML = '';
      }
    },
    
    clearPreview: function() {
      profilePreview.style.display = 'none';
      profilePreview.innerHTML = '';
    }
  };

  // ========== PORTFOLIO MANAGEMENT MODULE ==========
  const PortfolioManagement = {
    renderDesigns: function() {
      // Handle promise from getDesigns
      Storage.getDesigns().then(designs => {
        const container = document.getElementById('uploaded-designs');
        
        if (!container) return;
        
        // Ensure designs is an array
        if (!Array.isArray(designs)) {
          designs = [];
        }
        
        if (designs.length === 0) {
          container.innerHTML = '<p class="no-designs-message">No designs uploaded yet. Check back soon for amazing content!</p>';
          return;
        }
        
        container.innerHTML = designs.map((design, index) => {
          const isRecent = index === 0;
          const isHighlight = index === 1;
          const badge = isRecent ? '<span class="portfolio-badge recent-work">Recent Work</span>' : 
                       isHighlight ? '<span class="portfolio-badge portfolio-highlight">Portfolio Highlight</span>' : '';
          
          return `
            <div class="portfolio-item uploaded-item ${isRecent ? 'recent-design' : ''}">
              <a class="portfolio-link" href="${design.publicUrl || design.image}" target="_blank" rel="noopener noreferrer" title="${design.title}">
                <img src="${design.image}" alt="${design.title}" loading="lazy"/>
                ${badge}
                <div class="portfolio-overlay">
                  <span>${design.title}</span>
                  <small class="design-timestamp">${Storage.formatDate(design.createdAt)}</small>
                </div>
              </a>
              ${isAdminLoggedIn ? `
                <div class="admin-controls">
                  <button type="button" class="edit-btn" onclick="event.preventDefault(); event.stopPropagation(); PortfolioManagement.editDesign('${design.id}')" title="Edit design">✏️</button>
                  <button type="button" class="delete-btn" onclick="event.preventDefault(); event.stopPropagation(); PortfolioManagement.deleteDesign('${design.id}')" title="Delete design">🗑️</button>
                </div>
              ` : ''}
            </div>
          `;
        }).join('');
        
        this.reinitializeLightbox();
      }).catch(error => {
        console.error('Error rendering designs:', error);
        const container = document.getElementById('uploaded-designs');
        if (container) {
          container.innerHTML = '<p class="no-designs-message">Unable to load designs. Please try again later.</p>';
        }
      });
    },
    
    loadDesignsList: function() {
      // Handle promise from getDesigns
      Storage.getDesigns().then(designs => {
        const container = document.getElementById('designs-list');
        
        if (!container) return;
        
        // Ensure designs is an array
        if (!Array.isArray(designs)) {
          designs = [];
        }
        
        if (designs.length === 0) {
          container.innerHTML = '<p style="text-align: center; color: #666;">No uploaded designs yet.</p>';
          return;
        }
        
        container.innerHTML = designs.map(design => `
          <div class="design-item">
            <img src="${design.image}" alt="${design.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
            <div class="design-info">
              <strong>${design.title}</strong>
              <small>${Storage.formatDate(design.createdAt)}</small>
            </div>
            <div class="design-actions">
              <button type="button" class="edit-btn" onclick="PortfolioManagement.editDesign('${design.id}')" title="Edit design">✏️</button>
              <button type="button" class="delete-btn" onclick="PortfolioManagement.confirmDelete('${design.id}')" title="Delete design">🗑️</button>
            </div>
          </div>
        `).join('');
      }).catch(error => {
        console.error('Error loading designs list:', error);
        const container = document.getElementById('designs-list');
        if (container) {
          container.innerHTML = '<p style="text-align: center; color: #666;">Unable to load designs.</p>';
        }
      });
    },
    
    addDesign: function(designData) {
      return new Promise((resolve, reject) => {
        // Validate and sanitize inputs
        const sanitizedTitle = Security.sanitizeInput(designData.title);
        const sanitizedDescription = Security.sanitizeInput(designData.description);
        
        if (!sanitizedTitle || !sanitizedDescription) {
          this.showNotification('Title and description are required.', 'error');
          resolve(false);
          return;
        }
        
        // Generate unique ID
        const id = Date.now().toString();
        const newDesign = {
          id: id,
          title: designData.title,
          description: designData.description,
          image: designData.image,
          createdAt: new Date().toISOString()
        };
        
        // Handle promise from getDesigns
        Storage.getDesigns().then(designs => {
          // Ensure designs is an array
          if (!Array.isArray(designs)) {
            designs = [];
          }
          
          // Add new design to beginning of array
          designs.unshift(newDesign);
          
          // Save to storage
          Storage.saveDesigns(designs);
          
          // If it's a file upload, send to server
          if (designData.image.startsWith('data:')) {
            this.uploadFileToServer(newDesign).then(result => {
              if (result) {
                resolve(true);
              } else {
                resolve(false);
              }
            }).catch(error => {
              console.error('Server upload error:', error);
              resolve(false);
            });
          } else {
            // URL upload - just save locally
            resolve(true);
          }
        }).catch(error => {
          console.error('Error getting designs:', error);
          reject(error);
        });
      });
    },
    
    uploadFileToServer: function(design) {
      return new Promise((resolve, reject) => {
        // Convert base64 to blob
        const base64Data = design.image.replace(/^data:image\/\w+;base64,/, '');
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        
        // Create form data
        const formData = new FormData();
        formData.append('design', blob, `design-${design.id}.jpg`);
        formData.append('title', design.title);
        formData.append('description', design.description);
        formData.append('id', design.id);
        
        // Send to server
        fetch('/uploads/save-designs', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            // Update design with server URL
            design.image = result.url;
            design.publicUrl = result.url;
            
            // Save updated design
            Storage.getDesigns().then(designs => {
              const index = designs.findIndex(d => d.id === design.id);
              if (index !== -1) {
                designs[index] = design;
                Storage.saveDesigns(designs);
              }
              resolve(true);
            });
          } else {
            console.error('Server upload failed:', result.error);
            resolve(false);
          }
        })
        .catch(error => {
          console.error('Upload error:', error);
          resolve(false);
        });
      });
    },
    
    editDesign: function(id) {
      Storage.getDesigns().then(designs => {
        if (!Array.isArray(designs)) {
          designs = [];
        }

        const design = designs.find(d => String(d.id) === String(id));
        if (!design) return;

        currentEditingDesign = design;
        this.showEditModal(design);
      }).catch(error => {
        console.error('Error loading design for edit:', error);
      });
    },
    
    updateDesign: function(id, updates) {
      // Sanitize updates
      const sanitizedUpdates = {};
      if (updates.title) {
        sanitizedUpdates.title = Security.sanitizeInput(updates.title);
      }
      if (updates.description) {
        sanitizedUpdates.description = Security.sanitizeInput(updates.description);
      }
      
      Storage.updateDesign(id, sanitizedUpdates).then(updatedDesign => {
        if (updatedDesign) {
          this.renderDesigns();
          this.loadDesignsList();
          this.hideEditModal();
          this.showNotification('Design updated successfully!', 'success');
        } else {
          this.showNotification('Unable to update the design. Please try again.', 'error');
        }
      }).catch(error => {
        console.error('Error updating design:', error);
        this.showNotification('Unable to update the design. Please try again.', 'error');
      });
    },
    
    confirmDelete: function(id) {
      if (confirm('Are you sure you want to delete this design? This action cannot be undone.')) {
        this.deleteDesign(id);
      }
    },
    
    deleteDesign: function(id) {
      Storage.deleteDesign(id).then(deleted => {
        if (deleted) {
          this.renderDesigns();
          this.loadDesignsList();
          this.showNotification('Design deleted successfully!', 'success');
        } else {
          this.showNotification('Design not found or could not be deleted.', 'error');
        }
      }).catch(error => {
        console.error('Error deleting design:', error);
        this.showNotification('Unable to delete the design. Please try again.', 'error');
      });
    },
    
    showEditModal: function(design) {
      const modal = document.createElement('div');
      modal.className = 'edit-modal';
      modal.innerHTML = `
        <div class="edit-modal-content">
          <div class="edit-modal-header">
            <h3>Edit Design</h3>
            <button class="close-edit-modal" onclick="PortfolioManagement.hideEditModal()">&times;</button>
          </div>
          <div class="edit-modal-body">
            <div class="form-group">
              <label for="edit-title">Design Title</label>
              <input type="text" id="edit-title" value="${this.escapeHtml(design.title)}" required>
            </div>
            <div class="form-group">
              <label for="edit-description">Description</label>
              <textarea id="edit-description" required>${this.escapeHtml(design.description)}</textarea>
            </div>
            <div class="edit-actions">
              <button class="save-btn" onclick="PortfolioManagement.saveEdit()">Save Changes</button>
              <button class="cancel-btn" onclick="PortfolioManagement.hideEditModal()">Cancel</button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      modal.style.display = 'flex';
    },
    
    hideEditModal: function() {
      const modal = document.querySelector('.edit-modal');
      if (modal) {
        modal.remove();
      }
      currentEditingDesign = null;
    },
    
    saveEdit: function() {
      if (!currentEditingDesign) return;
      
      const title = document.getElementById('edit-title').value.trim();
      const description = document.getElementById('edit-description').value.trim();
      
      if (!title || !description) {
        alert('Please fill in all fields.');
        return;
      }
      
      this.updateDesign(currentEditingDesign.id, { title, description });
    },
    
    showNotification: function(message, type) {
      // Simple notification - you can enhance this
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#dc2626'};
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 6000;
        animation: slideInRight 0.3s ease;
      `;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    },
    
    escapeHtml: function(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },
    
    reinitializeLightbox: function() {
      const newPortfolioItems = document.querySelectorAll('.portfolio-item:not(.lightbox-initialized)');
      
      newPortfolioItems.forEach((item) => {
        item.classList.add('lightbox-initialized');
        item.addEventListener("click", function (e) {
          // Don't open lightbox if clicking delete button
          if (e.target.classList.contains('delete-btn')) return;
          
          e.preventDefault();
          
          // Update allImages array to include new items
          allImages = Array.from(document.querySelectorAll('.portfolio-item')).map(item => ({
            src: item.getAttribute("href"),
            title: item.getAttribute("title") || item.querySelector("img").alt,
            alt: item.querySelector("img").alt
          }));
          
          // Find current index
          currentImageIndex = Array.from(document.querySelectorAll('.portfolio-item')).indexOf(item);
          lightboxTotal.textContent = allImages.length;
          
          openLightbox();
        });
      });
    }
  };

  // ========== EVENT LISTENERS ==========
  if (adminGearBtn) {
    adminGearBtn.addEventListener('click', function() {
      Auth.toggleAdminPanel();
    });
  }

  if (closeAdminBtn) {
    closeAdminBtn.addEventListener('click', function() {
      Auth.hideAdminPanel();
    });
  }

  adminDashboard.addEventListener('click', function(e) {
    if (e.target === adminDashboard) {
      Auth.hideAdminPanel();
    }
  });

  if (adminLoginSubmitBtn) {
    adminLoginSubmitBtn.addEventListener('click', function() {
      const username = adminUsernameInput.value.trim();
      const password = adminPasswordInput.value.trim();
      
      if (Auth.login(username, password)) {
        Auth.showAdminPanelContent();
        loginError.textContent = '';
      } else {
        loginError.textContent = 'Invalid username or password. Please try again.';
        adminPasswordInput.value = '';
        adminPasswordInput.focus();
      }
    });
  }

  // Allow Enter key for login
  if (adminPasswordInput) {
    adminPasswordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        adminLoginBtn.click();
      }
    });
  }

  if (adminUsernameInput) {
    adminUsernameInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        adminPasswordInput.focus();
      }
    });
  }

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      Auth.showTab(this.dataset.tab);
    });
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => Auth.logout());
  }

  // Image preview with validation
  if (designImageInput) {
    designImageInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        // Validate file type and size
        if (!Security.validateFileType(file)) {
          alert('Invalid file type. Please upload JPG, PNG, WebP, or SVG files.');
          e.target.value = '';
          return;
        }
        
        if (!Security.validateFileSize(file)) {
          alert('File size too large. Please upload files smaller than 5MB.');
          e.target.value = '';
          return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        imagePreview.style.display = 'none';
        imagePreview.innerHTML = '';
      }
    });
  }

  // Upload form submission with validation
  if (uploadForm) {
    // Upload method toggle
    const uploadMethodRadios = document.querySelectorAll('input[name="upload-method"]');
    uploadMethodRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'file') {
          fileUploadGroup.style.display = 'block';
          urlUploadGroup.style.display = 'none';
          designImageInput.required = true;
          designUrlInput.required = false;
        } else {
          fileUploadGroup.style.display = 'none';
          urlUploadGroup.style.display = 'block';
          designImageInput.required = false;
          designUrlInput.required = true;
        }
      });
    });
    
    // URL preview
    if (designUrlInput) {
      designUrlInput.addEventListener('input', function() {
        const url = this.value.trim();
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
          urlPreview.innerHTML = `<img src="${url}" alt="URL Preview" style="max-width: 200px; max-height: 200px; object-fit: cover; border-radius: 5px;">`;
          urlPreview.style.display = 'block';
        } else {
          urlPreview.innerHTML = '';
          urlPreview.style.display = 'none';
        }
      });
    }
    
    uploadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const title = document.getElementById('design-title').value.trim();
      const description = document.getElementById('design-description').value.trim();
      const uploadMethod = document.querySelector('input[name="upload-method"]:checked').value;
      
      // Validate inputs
      if (!title || !description) {
        alert('Please fill in all fields.');
        return;
      }
      
      let imageUrl = null;
      
      if (uploadMethod === 'file') {
        // File upload
        const imageFile = designImageInput.files[0];
        
        if (!imageFile) {
          alert('Please select an image.');
          return;
        }
        
        // Validate file
        if (!Security.validateFileType(imageFile)) {
          alert('Invalid file type. Please upload JPG, PNG, WebP, or SVG files.');
          return;
        }
        
        if (!Security.validateFileSize(imageFile)) {
          alert('File size too large. Please upload files smaller than 5MB.');
          return;
        }
        
        // Convert image to base64
        const reader = new FileReader();
        reader.onload = function(e) {
          const designData = {
            title: title,
            description: description,
            image: e.target.result
          };
          
          // Handle promise from addDesign
          PortfolioManagement.addDesign(designData).then(result => {
            if (result) {
              // Reset form
              uploadForm.reset();
              imagePreview.style.display = 'none';
              imagePreview.innerHTML = '';
              urlPreview.innerHTML = '';
              urlPreview.style.display = 'none';
              
              PortfolioManagement.showNotification('Design uploaded successfully!', 'success');
              
              // Force immediate re-render
              setTimeout(() => {
                PortfolioManagement.renderDesigns();
              }, 100);
            }
          }).catch(error => {
            console.error('Upload error:', error);
            PortfolioManagement.showNotification('Upload failed. Please try again.', 'error');
          });
        };
        
        reader.onerror = function() {
          alert('Error reading image file. Please try again.');
        };
        
        reader.readAsDataURL(imageFile);
        
      } else {
        // URL upload
        const url = designUrlInput.value.trim();
        
        if (!url) {
          alert('Please enter an image URL.');
          return;
        }
        
        // Validate URL
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          alert('Please enter a valid URL starting with http:// or https://');
          return;
        }
        
        const designData = {
          title: title,
          description: description,
          image: url
        };
        
        // Handle promise from addDesign
        PortfolioManagement.addDesign(designData).then(result => {
          if (result) {
            // Reset form
            uploadForm.reset();
            imagePreview.style.display = 'none';
            imagePreview.innerHTML = '';
            urlPreview.innerHTML = '';
            urlPreview.style.display = 'none';
            
            PortfolioManagement.showNotification('Design uploaded successfully!', 'success');
            
            // Force immediate re-render
            setTimeout(() => {
              PortfolioManagement.renderDesigns();
            }, 100);
          }
        }).catch(error => {
          console.error('Upload error:', error);
          PortfolioManagement.showNotification('Upload failed. Please try again.', 'error');
        });
      }
    });
  }

  // Profile picture event listeners
  if (profileImageInput) {
    profileImageInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      ProfileManagement.previewImage(file);
    });
  }

  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', function() {
      const file = profileImageInput.files[0];
      
      if (!file) {
        alert('Please select an image first.');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      
      // Disable button while processing
      saveProfileBtn.disabled = true;
      saveProfileBtn.textContent = 'Saving...';
      
      const reader = new FileReader();
      reader.onload = function(e) {
        ProfileManagement.saveProfile(e.target.result);
        
        // Reset form
        profileImageInput.value = '';
        ProfileManagement.clearPreview();
        
        // Re-enable button
        saveProfileBtn.disabled = false;
        saveProfileBtn.textContent = 'Save Profile Picture';
      };
      
      reader.onerror = function() {
        alert('Error reading image file. Please try again.');
        saveProfileBtn.disabled = false;
        saveProfileBtn.textContent = 'Save Profile Picture';
      };
      
      reader.readAsDataURL(file);
    });
  }

  // Make functions globally accessible
  window.PortfolioManagement = PortfolioManagement;
  window.Auth = Auth;
  window.ProfileManagement = ProfileManagement;
  window.Storage = Storage; // Add Storage for debugging

  // Debug function to test localStorage
  window.debugStorage = function() {
    console.log('=== Storage Debug ===');
    console.log('STORAGE_KEY:', STORAGE_KEY);
    console.log('localStorage data:', localStorage.getItem(STORAGE_KEY));
    
    Storage.getDesigns().then(designs => {
      console.log('getDesigns result:', designs);
      console.log('Designs count:', designs.length);
      console.log('==================');
    });
  };

  // Initialize portfolio and profile on page load
  PortfolioManagement.renderDesigns();
  ProfileManagement.loadProfile(); // Load profile picture for all users
  
  // Check authentication state and update gear button
  Auth.updateGearButton(Auth.checkAuthState());
});

// ========== CV DOWNLOAD FUNCTIONALITY ==========
// Handle CV download to ensure proper PDF format
function handleCVDownload() {
  const cvLink = document.querySelector('.cv-download-btn');
  if (cvLink) {
    cvLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Create a temporary link to force download
      const tempLink = document.createElement('a');
      tempLink.href = 'CV.pdf';
      tempLink.download = 'Sulemana-Mohammed-Amin-CV.pdf';
      tempLink.type = 'application/pdf';
      
      // Trigger download
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    });
  }
}

// Initialize CV download handler
document.addEventListener('DOMContentLoaded', function() {
  handleCVDownload();
  initTypingAnimation();
});

// ========== TYPING ANIMATION FUNCTIONALITY ==========
// Typing animation for user's name
function initTypingAnimation() {
  const typingElement = document.getElementById('typing-name');
  if (!typingElement) return;
  
  const text = 'Sulemana Mohammed Amin';
  let index = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let deletingSpeed = 50;
  let pauseDuration = 2000;
  let pauseTime = 0;
  
  function typeText() {
    const currentText = text.substring(0, index);
    typingElement.textContent = currentText;
    
    if (!isDeleting) {
      // Typing
      if (index < text.length) {
        index++;
        setTimeout(typeText, typingSpeed);
      } else {
        // Finished typing, pause before deleting
        pauseTime = Date.now() + pauseDuration;
        isDeleting = true;
        setTimeout(typeText, pauseDuration);
      }
    } else {
      // Deleting
      if (Date.now() < pauseTime) {
        setTimeout(typeText, 100);
        return;
      }
      
      if (index > 0) {
        index--;
        setTimeout(typeText, deletingSpeed);
      } else {
        // Finished deleting, start typing again
        isDeleting = false;
        setTimeout(typeText, typingSpeed);
      }
    }
  }
  
  // Add cursor styling
  typingElement.style.borderRight = '2px solid var(--primary)';
  typingElement.style.paddingRight = '2px';
  typingElement.style.display = 'inline-block';
  
  // Start typing animation
  setTimeout(typeText, 1000); // Start after 1 second
}