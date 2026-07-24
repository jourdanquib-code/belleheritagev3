// Shared nav + footer injection for Belle Heritage mockup

const NAV_HTML = `
<div class="mockup-notice">Mockup — For Client Review</div>
<div class="top-bar">
  Lafayette, Louisiana <span>✦</span> Cultural Heritage Specialist <span>✦</span> Est. by Dr. Elista Istre
</div>
<nav class="nav-wrapper">
  <div class="nav-container">
    <a href="index.html" class="logo">Belle <span class="accent">Heritage</span></a>
    <ul class="nav-menu">
      <li class="nav-item">
        <a class="nav-link" href="programs.html">Programs</a>
        <div class="dropdown">
          <a href="culture-for-kids.html">Culture for Kids</a>
          <a href="living-history.html">Living History</a>
          <a href="scholarly.html">Scholarly Presentations</a>
          <a href="book-talks.html">Book Talks</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="consulting.html">Heritage Consulting</a>
        <div class="dropdown">
          <a href="museums-historical-sites.html">Museums / Historical Sites</a>
          <a href="community-heritage-initiatives.html">Community Heritage Initiatives</a>
          <a href="corporate-history.html">Corporate / Institutional History</a>
          <a href="community-travel-advisor.html">Community Travel Advisor</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="boutique.html">Boutique</a>
        <div class="dropdown">
          <div class="dropdown-nested">
            <a href="boutique.html#books">Book Nook & Gifts</a>
            <div class="sub-dropdown">
              <a href="boutique.html#josette">Josette</a>
              <a href="boutique.html#creole">Creole</a>
              <a href="boutique.html#bookmarks">Bookmarks</a>
            </div>
          </div>
          <div class="dropdown-nested">
            <a href="boutique.html#jewelry">Jewelry</a>
            <div class="sub-dropdown">
              <a href="boutique.html#pendants">Pendants</a>
              <a href="boutique.html#earrings">Earrings</a>
              <a href="boutique.html#design-your-own">Design Your Own</a>
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="about.html">About</a>
        <div class="dropdown">
          <a href="about.html">About Us</a>
          <a href="consulting.html#past-projects">Past Projects</a>
          <a href="#">Photo Gallery</a>
          <a href="book-now.html">Contact Us</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-container">
    <div class="footer-brand">
      <h3>Belle <span class="accent">Heritage</span></h3>
      <p>Celebrating the beauty of heritage through scholarship, story, and meaningful cultural experiences in Lafayette and beyond.</p>
    </div>
    <div class="footer-col">
      <h4>Explore</h4>
      <ul>
        <li><a href="programs.html">Programs</a></li>
        <li><a href="consulting.html">Heritage Consulting</a></li>
        <li><a href="boutique.html">Boutique</a></li>
        <li><a href="book-now.html">Book Now</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="about.html">About Us</a></li>
        <li><a href="#">Past Projects</a></li>
        <li><a href="#">Photo Gallery</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Connect</h4>
      <ul>
        <li><a href="#">Instagram</a></li>
        <li><a href="#">Facebook</a></li>
        <li><a href="#">Newsletter</a></li>
        <li><a href="mailto:info@belleheritage.com">info@belleheritage.com</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 Belle Heritage. All rights reserved.</span>
    <span>Lafayette, Louisiana</span>
  </div>
</footer>
`;

const FLOATING_EVENTS_HTML = `
  <div class="floating-events-popup">
    <div class="floating-events-popup-header">Upcoming Events</div>
    <a href="book-now.html" class="floating-event-row">
      <span class="fe-date">May 4</span>
      <span class="fe-title">Cajun Story Time</span>
    </a>
    <a href="book-now.html" class="floating-event-row">
      <span class="fe-date">May 12</span>
      <span class="fe-title">Creole Legacy Book Talk</span>
    </a>
    <a href="book-now.html" class="floating-event-row">
      <span class="fe-date">May 20</span>
      <span class="fe-title">Downtown Heritage Tour</span>
    </a>
    <a href="book-now.html" class="floating-event-row">
      <span class="fe-date">May 27</span>
      <span class="fe-title">Spring Jewelry Trunk Show</span>
    </a>
    <a href="book-now.html" class="floating-events-book">Book an Event →</a>
  </div>
  <a href="book-now.html" class="floating-cta floating-cta-events">Upcoming Events</a>
`;

document.addEventListener('DOMContentLoaded', () => {
  const navHost = document.getElementById('site-nav');
  if (navHost) navHost.innerHTML = NAV_HTML;
  const footerHost = document.getElementById('site-footer');
  if (footerHost) footerHost.innerHTML = FOOTER_HTML;

  // Inject sitewide floating Upcoming Events button (unless page already has one)
  if (!document.querySelector('.floating-events-wrap')) {
    const wrap = document.createElement('div');
    wrap.className = 'floating-events-wrap';
    wrap.innerHTML = FLOATING_EVENTS_HTML;
    document.body.appendChild(wrap);
  }

  // Graceful fallback for any image that fails to load (placeholder photography)
  document.querySelectorAll('img').forEach(img => {
    const fail = () => {
      if (img.dataset.failed) return;
      img.dataset.failed = '1';
      const ph = document.createElement('div');
      ph.className = 'img-fallback';
      ph.setAttribute('data-label', img.getAttribute('alt') || 'Photo');
      if (img.parentNode) img.parentNode.replaceChild(ph, img);
    };
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });
});
