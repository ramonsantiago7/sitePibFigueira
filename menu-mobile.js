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
      nav.querySelectorAll('.dropdown.submenu-open').forEach((dropdown) => {
        dropdown.classList.remove('submenu-open');
      });
    };

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      header.classList.toggle('menu-open', !isExpanded);

      if (isExpanded) {
        nav.querySelectorAll('.dropdown.submenu-open').forEach((dropdown) => {
          dropdown.classList.remove('submenu-open');
        });
      }
    });

    nav.querySelectorAll('.dropdown > a').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        if (window.innerWidth > 840) return;

        const dropdown = trigger.closest('.dropdown');
        if (!dropdown) return;

        event.preventDefault();

        nav.querySelectorAll('.dropdown.submenu-open').forEach((item) => {
          if (item !== dropdown) {
            item.classList.remove('submenu-open');
          }
        });

        dropdown.classList.toggle('submenu-open');
      });
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (link.closest('.dropdown > a')) return;
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