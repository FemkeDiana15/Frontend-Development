// JavaScript Document
console.log("hi");

// Wacht tot de DOM volledig is geladen
document.addEventListener('DOMContentLoaded', function() {
  
  /******************************/
  /* menu openen de MENU button */
  /******************************/
  var openButton = document.querySelector(".menu-button");
  if (openButton) {
    openButton.onclick = openMenu;
  }

  function openMenu() {
    var deNav = document.querySelector(".Menu");
    deNav.classList.add("toonMenu");
  }

  /************************************/
  /* menu sluiten met de sluit button */
  /************************************/
  var sluitButton = document.querySelector(".sluit-button");
  if (sluitButton) {
    sluitButton.onclick = sluitMenu;
  }

  function sluitMenu() {
    var deNav = document.querySelector(".Menu");
    deNav.classList.remove("toonMenu");
  }

  /**********************************/
  /* bonus: menu sluiten met escape */
  /**********************************/
  window.onkeydown = function(event) {
    if (event.key === "Escape") {
      var deNav = document.querySelector(".Menu");
      if (deNav) {
        deNav.classList.remove("toonMenu");
      }
    }
  };

  // Alle party popper afbeeldingen selecteren
  var partyPoppers = document.querySelectorAll(".party-popper");

  // Eén geluid selecteren
  var confettiGeluid = document.getElementById("confetti-geluid");

  // Klik-event toevoegen aan elke party popper
  if (partyPoppers.length > 0 && confettiGeluid) {
    partyPoppers.forEach(function(popper) {
      popper.addEventListener("click", function() {
        confettiGeluid.currentTime = 0; // reset zodat het opnieuw start
        confettiGeluid.play();
      });
    });
  }

  /*********************/
  /* SCROLL ANIMATIE - ALLEEN OP PAGINA 1 */
  /*********************/
  var scrollContainer = document.querySelector('.scroll-img-container');
  var img1 = document.getElementById('scroll-img1');
  var img2 = document.getElementById('scroll-img2');

  // Alleen uitvoeren als alle elementen bestaan (op pagina 1)
  if (scrollContainer && img1 && img2) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', moveImages);
        } else {
          window.removeEventListener('scroll', moveImages);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(scrollContainer);

    function moveImages() {
      var rect = scrollContainer.getBoundingClientRect();

      // scrollFraction tussen 0 en 1
      var scrollFraction = 1 - rect.top / window.innerHeight;
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));

      var maxTranslate = img1.offsetWidth - rect.width;

      // Beide afbeeldingen dezelfde kant op
      img1.style.transform = 'translateX(-' + (scrollFraction * maxTranslate) + 'px)';
      img2.style.transform = 'translateX(-' + (scrollFraction * maxTranslate) + 'px)';
    }
  }

  /*********************/
  /* THEMA SWITCHER */
  /*********************/

  var themeToggle = document.getElementById('theme-toggle');
  var prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Controleer of er een thema is opgeslagen
  function applySavedTheme() {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'halloween') {
      document.documentElement.setAttribute('data-theme', 'halloween');
      if (themeToggle) themeToggle.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggle) themeToggle.textContent = '🎃';
    }
  }

  // Wissel tussen thema's
  function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'halloween') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      if (themeToggle) themeToggle.textContent = '🎃';
    } else {
      document.documentElement.setAttribute('data-theme', 'halloween');
      localStorage.setItem('theme', 'halloween');
      if (themeToggle) themeToggle.textContent = '☀️';
    }
  }

  // Event listener alleen toevoegen als de knop bestaat
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Pas het thema toe wanneer de pagina laadt
  applySavedTheme();

  // Optioneel: Luister naar systeem thema veranderingen
  prefersDarkScheme.addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'halloween');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  });

  /*********************/
  /* FONT SIZE CONTROLS */
  /*********************/

  var fontControls = document.querySelectorAll('.font-controls button');
  if (fontControls.length > 0) {
    fontControls.forEach(function(button) {
      button.addEventListener('click', function() {
        var size = button.dataset.size;
        
        // Alleen "normaal" en "groter" toestaan
        if (size === "1" || size === "1.2") {
          // Update active state
          document.querySelectorAll('.font-controls button').forEach(function(btn) {
            btn.classList.remove('active');
          });
          button.classList.add('active');
          
          // Apply font size
          document.body.className = '';
          if (size === '1.2') document.body.classList.add('large-text');
          
          // Save preference
          localStorage.setItem('fontSize', size);
        }
      });
    });

    // Load saved preference - alleen "normaal" of "groter"
    var savedSize = localStorage.getItem('fontSize');
    var sizeButton;
    if (savedSize === '1.2') {
      sizeButton = document.querySelector('[data-size="1.2"]');
    } else {
      sizeButton = document.querySelector('[data-size="1"]');
    }
    if (sizeButton) sizeButton.click();
  }

  /*********************/
  /* SCROLL TO TOP */
  /*********************/

  var scrollBtn = document.getElementById('scrollToTop');
  if (scrollBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });

    scrollBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});