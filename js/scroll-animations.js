document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.full-page');
  const header = document.getElementById('main-header');

  if (header) {
    const headerHeight = header.offsetHeight; // Get the header's height

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
    handleStickyHeader(); // Call once on load to set initial state
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is entering the viewport
          entry.target.classList.add('is-visible');
          // On mobile, unobserve after first animation to prevent re-triggering
          if (window.innerWidth <= 768) {
            observer.unobserve(entry.target);
          }
        } else {
          // On desktop, remove the class so it can animate again on scroll-up
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
      if (window.innerWidth <= 768) {
        // Mobile: Horizontal indicator
        indicator.style.width = `${e.target.offsetWidth}px`;
        indicator.style.transform = `translateX(${e.target.offsetLeft}px)`;
      } else {
        // Desktop: Vertical indicator
        indicator.style.width = '2px'; // Ensure width is correct for desktop
        const tabHeight = e.target.offsetHeight;
        const tabIndex = Array.from(tabs).indexOf(e.target);
        indicator.style.transform = `translateY(${tabIndex * tabHeight}px)`;
      }

      // Update panels
      panels.forEach(panel => panel.classList.remove('active'));
      document.getElementById(targetPanelId).classList.add('active');
    });
  }

  // --- Resize handler for job tabs indicator ---
  function handleResize() {
    const activeTab = document.querySelector('.job-tab.active');
    if (!activeTab) return;

    const indicator = document.querySelector('.tab-indicator');
    if (window.innerWidth <= 768) {
      // Mobile: Horizontal indicator
      indicator.style.width = `${activeTab.offsetWidth}px`;
      indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
    } else {
      // Desktop: Vertical indicator
      const tabs = document.querySelectorAll('.job-tab');
      const tabIndex = Array.from(tabs).indexOf(activeTab);
      indicator.style.width = '2px'; // Reset width for desktop
      indicator.style.transform = `translateY(${tabIndex * activeTab.offsetHeight}px)`;
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize(); // Call on load to set initial indicator state correctly
});
