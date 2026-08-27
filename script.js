document.addEventListener('DOMContentLoaded', () => {

    const swiper = new Swiper('.project-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        
        // 👇 Ensure these loop properties are active 👇
        loop: true,
        loopedSlides: 3, // Matches your number of unique projects
        
        coverflowEffect: {
            rotate: 20, 
            stretch: 0,
            depth: 250, 
            modifier: 1, 
            slideShadows: true, 
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
        },
    });

    // Intersection Observer for Active Navigation Highlight
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -60% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(item => {
                    item.classList.remove('active', 'text-brand-primary', 'border-brand-primary');
                    item.classList.add('text-slate-400', 'border-slate-700');
                    item.style.boxShadow = 'none';
                });
                
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);
                
                if (activeLink) {
                    activeLink.classList.remove('text-slate-400', 'border-slate-700');
                    activeLink.classList.add('active', 'text-brand-primary', 'border-brand-primary');
                    activeLink.style.boxShadow = '0 0 15px rgba(168,85,247,0.4)';
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});