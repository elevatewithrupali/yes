/* components.js - injects shared header, footer, popup */

(function() {

const HEADER_HTML = `
<header>
  <a href="index.html" class="logo"><img src="logo.svg" alt="Rupali Logo">
  <nav>
    <a href="about.html">About</a>
    <a href="index.html#work">Work</a>
    <a href="index.html#publications">Publications</a>
    <a href="index.html#services">Services</a>
    <a href="index.html#contact">Contact</a>
    <a href="shop.html" class="btn-nav">Shop</a>
  </nav>
  <button class="hamburger" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</header>
<nav class="mobile-nav">
  <a href="about.html">About</a>
  <a href="index.html#work">Work</a>
  <a href="index.html#publications">Publications</a>
  <a href="index.html#services">Services</a>
  <a href="index.html#contact">Contact</a>
  <a href="shop.html">Shop</a>
</nav>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="index.html" class="logo"><img src="logo-footer.svg" alt="Rupali Logo">
      <p>Senior Product Designer & Business Communication Coach helping you build better systems and communicate with precision.</p>
      <div class="footer-social">
        <a href="#" aria-label="LinkedIn">${svgLinkedIn()}</a>
        <a href="#" aria-label="Twitter">${svgTwitter()}</a>
        <a href="#" aria-label="Dribbble">${svgDribbble()}</a>
        <a href="#" aria-label="Instagram">${svgInstagram()}</a>
      </div>
    </div>
    <div class="footer-col">
      <h5>Navigation</h5>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="index.html#work">Work</a></li>
        <li><a href="index.html#publications">Publications</a></li>
        <li><a href="index.html#services">Services</a></li>
        <li><a href="index.html#contact">Contact</a></li>
        <li><a href="shop.html">Shop</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Resources</h5>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
      <div class="footer-resume" style="margin-top:32px;">
        <h5>Download</h5>
        <a href="resume.pdf" download>
          ${svgDownload()} Resume (PDF)
        </a>
      </div>
    </div>
    <div class="footer-newsletter footer-col">
      <label>Stay Updated</label>
      <p>Design insights and communication frameworks, delivered to your inbox.</p>
      <form class="newsletter-form" onsubmit="return false;">
        <input type="email" placeholder="Your email address" required>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Rupali. All rights reserved.</p>
    <p style="font-size:0.72rem;color:rgba(255,255,255,0.2);">Sr. Product Designer & Communication Coach</p>
  </div>
</footer>
`;

const POPUP_HTML = `
<div class="popup-overlay" id="newsletter-popup" role="dialog" aria-modal="true">
  <div class="popup">
    <button class="popup-close" id="popup-close" aria-label="Close">×</button>
    <div class="label">Stay in the loop</div>
    <h3>Design meets clarity.</h3>
    <p>Get curated insights on product design, behavioral UX, and high-stakes communication — straight to your inbox.</p>
    <form class="popup-form" id="popup-form">
      <input type="email" placeholder="Enter your email" required>
      <button type="submit">Join</button>
    </form>
    <span class="popup-skip" id="popup-skip">No thanks, maybe later</span>
    <div class="popup-deco"></div>
  </div>
</div>
`;

function svgLinkedIn() { return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`; }
function svgTwitter() { return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>`; }
function svgDribbble() { return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>`; }
function svgInstagram() { return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`; }
function svgDownload() { return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`; }

// Inject components
document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
document.body.insertAdjacentHTML('beforeend', POPUP_HTML);

// Inject Google Fonts
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap';
document.head.appendChild(link);

})();
