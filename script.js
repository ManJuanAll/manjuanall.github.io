const header = document.getElementById('header');
const heroImage = document.querySelector('.hero-image');
const animateSections = document.querySelectorAll('.animate-section');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const scrollArrow = document.getElementById('scroll-arrow');
let lastScroll = 0;

const observerOptions = {
    root: null,
    rootMargin: '-150px 0px 0px 0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateSections.forEach(section => {
    observer.observe(section);
});

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    const maxScroll = window.innerHeight;
    const blurAmount = Math.min(20, (currentScroll / maxScroll) * 20);
    const brightness = Math.max(0.5, 1 - (currentScroll / maxScroll) * 0.5);
    heroImage.style.filter = `blur(${blurAmount}px) brightness(${brightness})`;
    
    lastScroll = currentScroll;
});

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

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

const headerLogo = document.getElementById('header-logo');
if (headerLogo) {
    headerLogo.addEventListener('click', scrollToTop);
}

const scrollToTopWithRetry = () => {
    scrollToTop();
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 300);
    setTimeout(scrollToTop, 500);
};

// 只在页面加载时调用一次，避免重复调用
window.addEventListener('load', scrollToTopWithRetry);

const copyrightEl = document.getElementById('copyright');
const currentYear = new Date().getFullYear();
copyrightEl.textContent = `© 2018-${currentYear} 是漫卷嗷 保留所有权利.`;



document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

scrollArrow.addEventListener('click', () => {
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        welcomeSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

const projectItems = document.querySelectorAll('.project-item');

projectItems.forEach(card => {
    const projectImage = card.querySelector('.project-image');
    const projectInfo = card.querySelector('.project-info');
    
    const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;
        
        card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.01)`;
    };
    
    const handleMouseLeave = () => {
        card.style.transform = 'translate(0, 0) scale(1)';
    };
    
    if (projectImage) {
        projectImage.addEventListener('mousemove', handleMouseMove);
        projectImage.addEventListener('mouseleave', handleMouseLeave);
    }
    
    if (projectInfo) {
        projectInfo.addEventListener('mousemove', handleMouseMove);
        projectInfo.addEventListener('mouseleave', handleMouseLeave);
    }
});

const textObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const card = entry.target;
        const wrappers = card.querySelectorAll('.text-wrapper');
        
        if (entry.isIntersecting) {
            wrappers.forEach((wrapper, i) => {
                setTimeout(() => {
                    wrapper.classList.add('animate');
                }, i * 150);
            });
        } else {
            wrappers.forEach((wrapper) => {
                wrapper.classList.remove('animate');
                void wrapper.offsetWidth;
            });
        }
    });
}, textObserverOptions);

projectItems.forEach(card => {
    textObserver.observe(card);
});

// 技能板块动画
const skillsSection = document.getElementById('skills');
const skillCards = document.querySelectorAll('.skill-card');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            skillCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}
