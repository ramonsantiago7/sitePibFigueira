document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.menu-toggle');

  toggles.forEach((toggle) => {
    const header = toggle.closest('.site-header');
    if (!header) return;

    const nav = header.querySelector('.site-nav');
    if (!nav) return;

    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      header.classList.remove('menu-open');
    };

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      header.classList.toggle('menu-open', !isExpanded);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 840) {
          closeMenu();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 840) {
        closeMenu();
      }
    });
  });
});