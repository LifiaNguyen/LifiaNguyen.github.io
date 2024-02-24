//Default
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

// Flash screen
document.addEventListener("DOMContentLoaded", function() {
  // Wait for the content to be fully loaded
  window.addEventListener("load", function() {
    // Add the fade-out class to trigger the screen flash animation
    document.querySelector(".screen-flash").classList.add("fade-out");

    // Add the fade-in class to change the background color
    document.body.classList.add("fade-in");

    // Remove the screen flash element once the animation is complete
    setTimeout(function() {
      document.querySelector(".screen-flash").style.display = "none";
    }, 1000); // Adjust the timing to match your animation duration
  });
});

//Header.js
function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = "flex";
}

// Function to hide sidebar
function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = "none";
}

// Event delegation for dynamically loaded content
document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("sidebarshow") ||
  event.target.parentElement.classList.contains("sidebarshow")) {
      showSidebar();
  }
  if (event.target.classList.contains("sidebarhide") ||
  event.target.parentElement.classList.contains("sidebarhide")) {
      hideSidebar();
  }
  // Add more conditions for other elements if needed
});

//Scroll
let lastScrollTop = 0;

window.addEventListener("scroll", function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
      // Scrolling down
      document.querySelector("nav").classList.add("hidden");
  } else {
      // Scrolling up
      document.querySelector("nav").classList.remove("hidden");
  }

  if (currentScroll <= 0) {
      // At the top of the page
      document.querySelector("nav").classList.remove("scrolled");
  } else {
      // Scrolling anywhere else
      document.querySelector("nav").classList.add("scrolled");
  }

  lastScrollTop = currentScroll;
}, false);

//Scrolling effect
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
    else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach(element => {
  observer.observe(element);
});

// Get all the list items
const menuItems = document.querySelectorAll('.main-header li');

// Loop through each list item and add an event listener to handle click
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove 'bold' class from all list items
        menuItems.forEach(item => {
            item.classList.remove('bold');
        });
        // Add 'bold' class to the clicked list item
        this.classList.add('bold');
    });
});

// Function to check which section is currently in view
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}
