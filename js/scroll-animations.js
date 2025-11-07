document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.full-page');
  const header = document.getElementById('main-header');

  if (header) {
    let headerHeight = 0;

    // Recalculate the sticky point after animations have finished
    setTimeout(() => {
      // Get the full height of the header
      const headerStyles = window.getComputedStyle(header);
      headerHeight = header.offsetHeight; // header has padding, not margin-top now

      function handleStickyHeader() {
        if (window.scrollY > 0) {
          header.classList.add('sticky');
          document.body.style.paddingTop = `${headerHeight}px`;
        } else {
          header.classList.remove('sticky');
          document.body.style.paddingTop = '0';
        }
      }

      window.addEventListener('scroll', handleStickyHeader);
      // Call once on load to set initial state if already scrolled (e.g., after refresh)
      handleStickyHeader();
    }, 1500); // 1500ms = 1.5s, safely after the header animation (0.6s + 0.8s)
  }

  let lastY = 0; // To keep track of scroll direction

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Determine scroll direction
        const currentY = window.scrollY;
        const isScrollingDown = currentY > lastY;
        lastY = currentY;

        if (entry.isIntersecting) {
          // Element is entering the viewport
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('is-leaving');
        } else {
          // Element is leaving the viewport
          // Only apply the "leaving" animation when scrolling down
          if (isScrollingDown) {
            entry.target.classList.add('is-leaving');
          }
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: 0.1, 
    }
  );

  pages.forEach((page) => observer.observe(page));

  // --- Job Tabs Functionality ---
  const jobTabsContainer = document.querySelector('.job-tabs');
  if (jobTabsContainer) {
    const tabs = jobTabsContainer.querySelectorAll('.job-tab');
    const indicator = jobTabsContainer.querySelector('.tab-indicator');
    const panels = document.querySelectorAll('.job-panel');

    jobTabsContainer.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') return;

      const targetPanelId = e.target.dataset.target;

      // Update tabs
      tabs.forEach(tab => tab.classList.remove('active'));
      e.target.classList.add('active');

      // Update indicator position
      const tabHeight = e.target.offsetHeight;
      const tabIndex = Array.from(tabs).indexOf(e.target);
      indicator.style.transform = `translateY(${tabIndex * tabHeight}px)`;

      // Update panels
      panels.forEach(panel => panel.classList.remove('active'));
      document.getElementById(targetPanelId).classList.add('active');
    });
  }
});
