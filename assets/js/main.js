/**
* Template Name: iPortfolio - v3.7.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  
  let projects = [
    {
      "img" : "assets/img/Projects/bhira.jpg",
      "name" : "Lbhira",
      "description" : "While serving as the CTO of a startup specializing in the sale of fruits and vegetables, I also took on the responsibility of developing the backend system for a mobile application. This encompassed responsibilities such as user authentication, CRUD operations, real-time stock updates, and stories. The technology stack used included TypeScript, NestJS, TypeORM, and DigitalOcean as a hosting provider.",
      "tags" : ["TypeScript", "NodeJS", "NestJS", "Postgresql", "TypeORM", "DigitalOcean"],
      "sources" : "https://github.com/mamoussa405/Bhira_app_v1",
      "live" : "",
    },
    {
      "img" : "assets/img/Projects/webserver.png",
      "name" : "Webserv",
      "description" : "This project's aim is to build an HTTP server from scratch using C/C++, where concepts like sockets, TCP, Parsing the HTTP Request, and creating a Response are introduced.",
      "tags" : ["C", "C++", "Sockets", "HTTP", "TCP", "CGI", "webserver"],
      "sources" : "https://github.com/mamoussa405/webserv",
      "live" : "",
    },
    {
      "img" : "assets/img/Projects/Inception_of_things.png",
      "name" : "Inception of things:",
      "description" : "This project covers setting up a virtual environment for Kubernetes deployment using Vagrant, deploying K3s and understanding its Ingress feature, learning how to simplify Kubernetes management with K3d, and implementing CI for working clusters in Docker.",
      "tags" : ["Kubernetes", "k3s", "k3d", "Docker", "Vagrant", "CI/CD", "ArgoCD", ],
      "sources" : "https://github.com/mamoussa405/Inception-Of-Things",
      "live" : "",
    },
    {
      "img" : "assets/img/Projects/pong.png",
      "name" : "Ft_Transcendence:",
      "description" : "This project is about creating a website for the Pong contest, where things like: Security concerns, User Account, Chat, Game are the main things in the project.",
      "tags" : ["Typescript", "NestJs", "Postgres", "TypeOrm", "SocketIO", "Docker", "NestJs", ],
      "sources" : "https://github.com/mamoussa405/ft_transcendence",
      "live" : "",
    },
  ];
  $(".owl-carousel.slide-one-item").html("");
  for (let i = 0; i < projects.length; i++)
  {
    let img = $('<div class="image" style="background-image: url('+projects[i].img+');"></div>');
    let main = $('<div class="text">');
    let name = $("<h4>").text(projects[i].name);
    let desc = $("<p>").html(projects[i].description);
    let tags = $("<ul class='tags'>");
    for (let j = 0; j < projects[i].tags.length; j++) {
      tags.append($("<li>"+projects[i].tags[j]+"</li>"));
    }
    let ctabuttons = $("<div class='CTAbuttons'>");
    let btnSource = $("<a class='viewResume' target='_blank'>").attr("href", projects[i].sources).text("Source Code");
    let btnLive = $("<a class='getInTouch' target='_blank'>").attr("href", projects[i].live).text("See Live");
    
    if (projects[i].sources.length > 0 )
      ctabuttons.append(btnSource);
    if (projects[i].live.length > 0 )
      ctabuttons.append(btnLive);

    main.html("");
    main.append(name);
    main.append(desc);
    main.append(tags);
    main.append(ctabuttons);
    let cnt = $('<div class="d-md-flex testimony-29101 align-items-stretch"></div>');
    cnt.html("");
    cnt.append(img);
    cnt.append(main);
  $(".owl-carousel.slide-one-item").append(cnt);

  }

  $('.slide-one-item').owlCarousel({
      center: false,
      autoplayHoverPause: true,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 0,
      smartSpeed: 1500,
      autoplay: true,
      pauseOnHover: false,
      dots: true,
      nav: true,
      navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>']
  });

})()