/**
 * K | Luxe Wellness - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initScrollEffects();
  initBeforeAfterSlider();
  initTestimonialCarousel();
  initPopups();
});

/**
 * Navigation functionality
 */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar-toggle');
  const nav = document.querySelector('.navbar-nav');
  
  // Mobile menu toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Close mobile menu on link click
  const navLinks = document.querySelectorAll('.navbar-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * Scroll effects and animations
 */
function initScrollEffects() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Before/After Image Slider
 */
function initBeforeAfterSlider() {
  const sliders = document.querySelectorAll('.before-after-slider');
  
  sliders.forEach(slider => {
    const handle = slider.querySelector('.slider-handle');
    const afterImage = slider.querySelector('.after-image');
    let isDragging = false;
    
    const updateSlider = (x) => {
      const rect = slider.getBoundingClientRect();
      let percentage = ((x - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      
      handle.style.left = percentage + '%';
      afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    };
    
    handle.addEventListener('mousedown', () => isDragging = true);
    handle.addEventListener('touchstart', () => isDragging = true);
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) updateSlider(e.clientX);
    });
    
    document.addEventListener('touchmove', (e) => {
      if (isDragging) updateSlider(e.touches[0].clientX);
    });
    
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('touchend', () => isDragging = false);
    
    // Click to position
    slider.addEventListener('click', (e) => {
      if (e.target !== handle) updateSlider(e.clientX);
    });
  });
}

/**
 * Testimonial Carousel
 */
function initTestimonialCarousel() {
  const carousel = document.querySelector('.testimonial-carousel');
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.testimonial-slide');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  };
  
  const nextSlide = () => {
    showSlide((currentSlide + 1) % slides.length);
  };
  
  const prevSlide = () => {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  };
  
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto-advance
  setInterval(nextSlide, 6000);
}

/**
 * Pop-up Modals
 */
function initPopups() {
  // Monthly Promo Pop-up
  const promoModal = document.getElementById('promo-modal');
  const promoClose = document.querySelector('.promo-close');
  
  if (promoModal && !sessionStorage.getItem('promoSeen')) {
    setTimeout(() => {
      promoModal.classList.add('active');
      sessionStorage.setItem('promoSeen', 'true');
    }, 5000);
  }
  
  if (promoClose) {
    promoClose.addEventListener('click', () => {
      promoModal.classList.remove('active');
    });
  }
  
  // Close on backdrop click
  if (promoModal) {
    promoModal.addEventListener('click', (e) => {
      if (e.target === promoModal) {
        promoModal.classList.remove('active');
      }
    });
  }
  
  // Newsletter Slide-in
  const newsletterSlide = document.getElementById('newsletter-slide');
  let newsletterShown = false;
  
  // Show on scroll (70% down page)
  const showNewsletterOnScroll = () => {
    if (newsletterShown || !newsletterSlide) return;
    
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 70) {
      newsletterSlide.classList.add('active');
      newsletterShown = true;
    }
  };
  
  window.addEventListener('scroll', showNewsletterOnScroll);
  
  // Close newsletter
  const newsletterClose = document.querySelector('.newsletter-close');
  if (newsletterClose) {
    newsletterClose.addEventListener('click', () => {
      newsletterSlide.classList.remove('active');
    });
  }
  
  // Form submissions
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Placeholder for form handling
      alert('Thank you for your submission! We will be in touch soon.');
      form.reset();
    });
  });
}
