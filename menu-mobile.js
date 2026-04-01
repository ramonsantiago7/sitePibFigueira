document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.menu-toggle');
   const MOBILE_BREAKPOINT = 840;

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

    nav.querySelectorAll('.dropdown').forEach((dropdown) => {
      const trigger = dropdown.querySelector(':scope > a');
      if (!trigger) return;

      trigger.addEventListener('click', (event) => {
        if (window.innerWidth > MOBILE_BREAKPOINT) return;

        const submenu = dropdown.querySelector(':scope > .submenu');
        if (!submenu) return;

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
        if (link.closest('.submenu')) {
          closeMenu();
          return;
        }

        if (link.matches('.dropdown > a')) {
          return;
        }

        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          closeMenu();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        closeMenu();
      }
    });
  });
});