APPOINTMENT AIR — HERO LAYOUT UPDATE

Use Appointment-Air-Hero-Layout-Fix.zip to update the existing project.
Extract the ZIP, then copy its contents into the existing VS Code repository folder.
Keep index.html at the repository root and the assets folder alongside it.
Do not put an extra extracted folder inside the repository.

FIVE WEBSITE FILES IN THE UPDATE
Replace:
  index.html
  assets/styles.css
  assets/site.js
Add:
  assets/appointment-air-hero-v3.mp4
  assets/hero-poster-v3.webp

The video and poster are already connected in index.html. You do not need to rename or manually embed either earlier MP4 download. The new filenames and stylesheet/script version parameters prevent the previous video or layout from being reused from cache.

Run Live Server from index.html, then hard refresh with Ctrl+Shift+R. Open the top of index.html without a #how-it-works or other fragment when inspecting the first screen.

WHAT WAS FIXED
The hero now has a minimum height equal to the visible browser height minus the actual header height. ResizeObserver updates that measurement when the header wraps or the window changes size. The video and poster cover the hero, preserve their aspect ratio and are clipped inside the hero. They do not increase the page width.

Short laptop layouts use tighter spacing and smaller heading sizes. On very small or short phone screens, the hero can grow beyond one screen so the copy and buttons remain readable and are not cut off. A vertical page scroll is expected; horizontal scrolling is not.

A landscape video must crop at the sides when it fills a portrait hero. This is intentional cover behavior, not stretching or content extending beyond the page.

PLAYBACK
The new silent 29.76-second film is a 1280×720 H.264 MP4, about 5.5 MB, with progressive playback metadata. It uses autoplay, muted, playsinline, loop and preload=auto. The current script starts playback without a click, continues looping while you scroll, pauses when the browser tab is hidden, and resumes when visible. A system preference for reduced motion intentionally displays the matching still poster. Browser autoplay restrictions remain controlled by the browser.

PRESERVED
Existing logo artwork, page copy, phone links to +1 605 667 4545, CNAME, privacy and terms content, SMS opt-in page and form behavior. This update does not publish to GitHub.

TESTS
The homepage was checked at 15 viewport sizes from 320 to 2560 pixels wide, including narrow portrait phones, a short landscape phone, tablets, short laptops and a wide desktop. Privacy, Terms and SMS opt-in were each checked at four widths. No horizontal overflow was found. Hero/video coverage and automatic muted playback passed. Native looping and live resizing were checked in Chromium. This is viewport testing in a desktop browser, not a claim of testing physical phones or every browser.

A complete alternative is Appointment-Air-GitHub-Ready.zip, containing the existing website with this update applied. Choose the patch ZIP OR the complete ZIP; you do not need both.

Reference for video sizing: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit
Reference for video attributes: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video
