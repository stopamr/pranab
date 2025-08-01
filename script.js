// Netflix CV JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.getElementById("header")
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = header.offsetHeight
        const targetPosition = target.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          mobileMenuToggle.classList.remove("active")
        }
      }
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach((el) => {
    observer.observe(el)
  })

  // Add animation classes to elements
  document.querySelectorAll(".experience-item").forEach((item, index) => {
    item.classList.add(index % 2 === 0 ? "slide-in-left" : "slide-in-right")
  })

  document.querySelectorAll(".research-card, .publication-card").forEach((card) => {
    card.classList.add("fade-in")
  })

  // Stats counter animation
  const statsNumbers = document.querySelectorAll(".stat-number")
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalNumber = Number.parseInt(target.getAttribute("data-target"))
        animateCounter(target, 0, finalNumber, 2000)
        statsObserver.unobserve(target)
      }
    })
  }, observerOptions)

  statsNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })

  function animateCounter(element, start, end, duration) {
    const startTime = performance.now()

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (end - start) * easeOutQuart)

      element.textContent = current + (end >= 50 ? "+" : "")

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = end + (end >= 50 ? "+" : "")
      }
    }

    requestAnimationFrame(updateCounter)
  }

  // Horizontal scroll enhancement
  const horizontalScrolls = document.querySelectorAll(".horizontal-scroll")

  horizontalScrolls.forEach((scroll) => {
    // Mouse wheel horizontal scrolling
    scroll.addEventListener("wheel", function (e) {
      if (e.deltaY !== 0) {
        e.preventDefault()
        this.scrollLeft += e.deltaY
      }
    })

    // Touch/drag scrolling
    let isDown = false
    let startX
    let scrollLeft

    scroll.addEventListener("mousedown", function (e) {
      isDown = true
      startX = e.pageX - this.offsetLeft
      scrollLeft = this.scrollLeft
      this.style.cursor = "grabbing"
    })

    scroll.addEventListener("mouseleave", function () {
      isDown = false
      this.style.cursor = "grab"
    })

    scroll.addEventListener("mouseup", function () {
      isDown = false
      this.style.cursor = "grab"
    })

    scroll.addEventListener("mousemove", function (e) {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - this.offsetLeft
      const walk = (x - startX) * 2
      this.scrollLeft = scrollLeft - walk
    })
  })

  // Card hover effects with 3D transform
  document.querySelectorAll(".research-card, .publication-card, .experience-item").forEach((card) => {
    card.addEventListener("mouseenter", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    })
  })

  // Parallax effect for hero background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-background")
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Dynamic typing effect for hero title (optional)
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.innerHTML
    heroTitle.innerHTML = ""
    let i = 0

    function typeWriter() {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    // Uncomment to enable typing effect
    // setTimeout(typeWriter, 1000);
  }

  // Lazy loading for images (if you add real images later)
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.classList.remove("lazy")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Search functionality (if you want to add a search feature)
  function initSearch() {
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase()
        const searchableElements = document.querySelectorAll(".publication-card, .research-card, .experience-item")

        searchableElements.forEach((element) => {
          const text = element.textContent.toLowerCase()
          if (query === "" || text.includes(query)) {
            element.style.display = ""
            element.style.opacity = "1"
          } else {
            element.style.display = "none"
            element.style.opacity = "0"
          }
        })
      })
    }
  }

  // Initialize search if search input exists
  initSearch()

  // Performance optimization: Debounce scroll events
  function debounce(func, wait, immediate) {
    let timeout
    return function executedFunction() {
      
      const args = arguments
      const later = () => {
        timeout = null
        if (!immediate) func.apply(this, args)
      }
      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(this, args)
    }
  }

  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
  }, 10)

  window.addEventListener("scroll", debouncedScrollHandler)

  // Print optimization
  window.addEventListener("beforeprint", () => {
    document.body.classList.add("printing")
  })

  window.addEventListener("afterprint", () => {
    document.body.classList.remove("printing")
  })

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })
})

// Utility functions
function isMobile() {
  return window.innerWidth <= 768
}

function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024
}

function isDesktop() {
  return window.innerWidth > 1024
}

// Export functions for potential use in other scripts
window.NetflixCV = {
  isMobile,
  isTablet,
  isDesktop,
}
