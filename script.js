// 🌗 Theme toggle with icon and background switch
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
const orb = document.querySelector('.orb');

// Set initial theme based on saved or system preference
function setInitialTheme() {
  let theme;
  if (savedTheme) {
    theme = savedTheme;
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', theme);
  updateToggleIcon(theme);
  updateBackground(theme);
}
setInitialTheme();

// Update icon on theme toggle button
function updateToggleIcon(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌑';
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon(next);
  updateBackground(next);
});

// Background image switcher
function updateBackground(theme) {
  const bg = theme === 'light'
    ? 'url("img/imgL.png")'
    : 'url("img/imgD.png")';
  document.body.style.backgroundImage = bg;
}

// 🔗 Active nav link on scroll
const links = document.querySelectorAll('.nav a');
const sections = Array.from(links).map(link => document.querySelector(link.getAttribute('href')));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = '#' + entry.target.id;
    const link = document.querySelector(`.nav a[href="${id}"]`);
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active-link'));
      link?.classList.add('active-link');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
sections.forEach(section => section && observer.observe(section));

// 🌀 Orb follows mouse
document.addEventListener('pointermove', e => {
  const x = (e.clientX / window.innerWidth) * 100 + '%';
  const y = (e.clientY / window.innerHeight) * 100 + '%';
  orb.style.setProperty('--x', x);
  orb.style.setProperty('--y', y);
});

// 📩 Contact form demo
function submitForm(e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = 'ارسال شد! (دمو — برای اتصال بک‌اند تنظیم کنید)';
  e.target.reset();
  return false;
}

// 🎞️ Animate on scroll
const fadeIns = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeIns.forEach(el => fadeObserver.observe(el));

// 🧊 Hover animation on glass elements
document.querySelectorAll('.glass').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'translateY(4px)';
    el.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translateY(0)';
    el.style.boxShadow = '';
  });
});

// 📅 Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// 🧭 3D tilt effect on cards
document.querySelectorAll('.tilt-3d').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('show');
});

document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    mobileMenu.classList.remove('show');
    menuToggle.classList.remove('active');
  });
});
function closeMenuOnScroll() {
  if (mobileMenu.classList.contains('show')) {
    mobileMenu.classList.remove('show');
    menuToggle.classList.remove('active');
  }
}

window.addEventListener('scroll', closeMenuOnScroll);
window.addEventListener('wheel', closeMenuOnScroll);
window.addEventListener('touchmove', closeMenuOnScroll); // برای موبایل

document.querySelectorAll('.desktop-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});