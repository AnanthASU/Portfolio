const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#navLinks');
const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
const revealItems = [...document.querySelectorAll('.reveal')];
const filters = [...document.querySelectorAll('.filter')];
const projectCards = [...document.querySelectorAll('.project-card')];
const toast = document.querySelector('#toast');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

links.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute('id');
      links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((section) => navObserver.observe(section));

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((btn) => btn.classList.remove('active'));
    filter.classList.add('active');
    const selected = filter.dataset.filter;
    projectCards.forEach((card) => {
      const categories = card.dataset.category || '';
      card.classList.toggle('is-hidden', selected !== 'all' && !categories.includes(selected));
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#copyEmail')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('amuppal1@asu.edu');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  } catch {
    window.location.href = 'mailto:amuppal1@asu.edu';
  }
});
