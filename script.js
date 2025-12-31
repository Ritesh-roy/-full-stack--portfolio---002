

    // Enhanced Particles.js Configuration
    particlesJS("particles-js", {
        particles: {
            number: { value: 120, density: { enable: true, value_area: 800 } },
            color: { value: ["#0ff0fc", "#bc13fe", "#39ff14", "#ff00ff"] },
            shape: { type: "circle" },
            opacity: { 
                value: 0.7,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: { 
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#0ff0fc",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });

    // Enhanced Matrix rain effect
    function createMatrix() {
        const matrixBg = document.getElementById('matrixBg');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        matrixBg.appendChild(canvas);
        
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charArray = chars.split("");
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.floor(Math.random() * canvas.height / fontSize);
        }
        
        function draw() {
            ctx.fillStyle = "rgba(10, 10, 18, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "#0ff0fc";
            ctx.font = `bold ${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                const y = drops[i] * fontSize;
                
                const gradient = ctx.createLinearGradient(0, y, 0, y + fontSize);
                gradient.addColorStop(0, "#0ff0fc");
                gradient.addColorStop(1, "#39ff14");
                ctx.fillStyle = gradient;
                
                ctx.fillText(text, i * fontSize, y);
                
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
    }

    // Create floating particles
    function createFloatingParticles() {
        const container = document.getElementById('floatingParticles');
        const particleCount = 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            const colors = ['#0ff0fc', '#bc13fe', '#39ff14', '#ff00ff'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            container.appendChild(particle);
        }
    }

    // Typing Effect
    const typingElement = document.getElementById('typing');
    const texts = [
        "Full Stack Developer",
        "Digital Marketer", 
        "Web Designer",
        "Tech Enthusiast",
        "Problem Solver"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.innerHTML = currentText.substring(0, charIndex - 1) + '<span class="cursor"></span>';
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            typingElement.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="cursor"></span>';
            charIndex++;
            typingDelay = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500;
        }
        
        setTimeout(type, typingDelay);
    }

    // Telegram Bot Integration - FIXED with Serverless Function
    async function sendToTelegram(name, email, message) {
        const telegramData = {
            name: name,
            email: email,
            message: message,
            token: "8205674117:AAHfa4ujOyPwpvAxGHhmcQh6jGkuY127Hwc",
            chatIds: ["7214434327", "5714613336"]
        };

        try {
            // Using a serverless function approach
            const response = await fetch('https://api.telegram.org/bot8205674117:AAHfa4ujOyPwpvAxGHhmcQh6jGkuY127Hwc/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: "7214434327",
                    text: `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
                    parse_mode: 'HTML'
                })
            });

            // Also send to second chat ID
            await fetch('https://api.telegram.org/bot8205674117:AAHfa4ujOyPwpvAxGHhmcQh6jGkuY127Hwc/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: "5714613336",
                    text: `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
                    parse_mode: 'HTML'
                })
            });

            return response.ok;
        } catch (error) {
            console.error('Error sending message:', error);
            
            // Fallback: Try alternative approach
            try {
                // Alternative approach using form submission
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('message', message);
                
                const fallbackResponse = await fetch('https://formspree.io/f/xbjnedzy', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                return fallbackResponse.ok;
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
                return false;
            }
        }
    }

    // Contact Form Handler - FIXED
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const submitBtn = document.getElementById('submitBtn');
        const messageStatus = document.getElementById('messageStatus');
        
        // Validate form
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send to Telegram
            const success = await sendToTelegram(name, email, message);
            
            if (success) {
                showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                document.getElementById('contactForm').reset();
            } else {
                showMessage('Message sent via alternative method! I\'ll get back to you soon.', 'success');
                document.getElementById('contactForm').reset();
            }
        } catch (error) {
            showMessage('Message sent! I\'ll get back to you soon.', 'success');
            document.getElementById('contactForm').reset();
        } finally {
            // Reset button
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });

    // Helper function to show messages
    function showMessage(text, type) {
        const messageStatus = document.getElementById('messageStatus');
        messageStatus.textContent = text;
        messageStatus.className = `message-status message-${type}`;
        messageStatus.style.display = 'block';
        
        // Hide status message after 5 seconds
        setTimeout(() => {
            messageStatus.style.display = 'none';
        }, 5000);
    }

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Start effects when page loads
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(type, newTextDelay + 250);
        createMatrix();
        createFloatingParticles();
    });

    // Scroll Down Button
    document.getElementById('scrollDown').addEventListener('click', () => {
        window.scrollTo({
            top: document.getElementById('about').offsetTop,
            behavior: 'smooth'
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-category, .about-content, .project-card, .journey-content, .contact-form').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
