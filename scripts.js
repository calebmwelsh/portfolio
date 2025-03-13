document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill progress bars when they come into view
                if (entry.target.classList.contains('skills')) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add typing effect to hero section
    const heroText = document.querySelector('.hero-text h1');
    const typingCursor = document.querySelector('.typing-cursor');
    
    if (heroText && typingCursor) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Keep cursor blinking after typing is complete
                typingCursor.style.animation = 'blink 1s step-end infinite';
            }
        };
        
        setTimeout(typeWriter, 500); // Delay start for better effect
    }

    // Add active state to navigation links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Scroll to top functionality
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    if (scrollToTopButton) {
        // Show button when user scrolls down 200px
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        // Smooth scroll to top when button is clicked
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Update button icon
            if (body.classList.contains('dark-mode')) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });

    // Initialize navigation with active state
    function setInitialActiveNav() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Call on page load
    setInitialActiveNav();
    
    // Add CSS for dark mode
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
        body.dark-mode {
            background-color: #121212;
            color: #e5e5e5;
        }
        
        body.dark-mode .navbar {
            background: rgba(18, 18, 18, 0.95);
        }
        
        body.dark-mode .about,
        body.dark-mode .projects,
        body.dark-mode .contact {
            background: #1a1a1a;
        }
        
        body.dark-mode .skills,
        body.dark-mode .resume {
            background: #121212;
        }
        
        body.dark-mode .skill-category,
        body.dark-mode .resume-card,
        body.dark-mode .project-card {
            background: #1a1a1a;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }
        
        body.dark-mode h2,
        body.dark-mode h3 {
            color: #ffffff;
        }
        
        body.dark-mode .about-text p,
        body.dark-mode .project-info p,
        body.dark-mode .resume-card p,
        body.dark-mode .skill-category li {
            color: #b0b0b0;
        }
        
        body.dark-mode .project-tags span {
            background: #2a2a2a;
            color: #b0b0b0;
        }
        
        body.dark-mode .btn-primary {
            background: #333333;
            color: white;
            border-color: #333333;
        }
        
        body.dark-mode .btn-primary:hover {
            background: #444444;
        }
        
        body.dark-mode .contact-info a {
            color: #b0b0b0;
        }
        
        body.dark-mode .contact-method {
            background: #2a2a2a;
        }
        
        body.dark-mode .contact-method i {
            color: #e5e5e5;
        }
        
        body.dark-mode .skill-progress {
            background-color: #2a2a2a;
        }
        
        body.dark-mode .skill-progress-bar {
            background-color: #ffffff;
        }
    `;
    document.head.appendChild(darkModeStyles);
    
    // Enhanced skill progress bar animation
    const skillSections = document.querySelectorAll('.skills');
    
    // Function to animate skill bars
    function animateSkillBars(section) {
        const progressBars = section.querySelectorAll('.skill-progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
                bar.classList.add('animated');
            }, 300);
        });
    }
    
    // Initial animation for visible skill sections
    skillSections.forEach(section => {
        if (isElementInViewport(section)) {
            animateSkillBars(section);
        }
    });
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Contact method hover effects
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', () => {
            method.style.transform = 'translateY(-5px)';
            method.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
        
        method.addEventListener('mouseleave', () => {
            method.style.transform = 'translateY(0)';
            method.style.boxShadow = 'none';
        });
    });
});
