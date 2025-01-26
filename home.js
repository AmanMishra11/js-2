
const projects = [
    {
      title: "Age Calculator",
      description: "A simple tool to calculate your exact age in years, months, and days based on your date of birth.",
      image: "./assets/age.png",
      liveLink: "https://amanmishra11.github.io/js-2/",
      codeLink: "https://github.com/AmanMishra11/js-2", 
    },
    {
      title: "Dark/Light Mode Toggle",
      description: "A responsive toggle feature to switch between Dark Mode and Light Mode, enhancing the user experience for different lighting environments.",
      image: "./assets/dark.jpg",
      liveLink: "https://amanmishra11.github.io/js-2/dark.html",
      codeLink: "https://github.com/AmanMishra11/js-2",
    },
    {
      title: "Products/Cart Management",
      description: "A dynamic product list with cart management functionality, allowing users to add/remove products and adjust quantities.",
      image: "./assets/products.png",
      liveLink: "https://amanmishra11.github.io/js-2/products.html",
      codeLink: "https://github.com/AmanMishra11/js-2",
    },
    {
      title: "Keycode Keyboard",
      description: "A fun and interactive tool to display the keycode and key value of any key pressed on the keyboard.",
      image: "./assets/keycode.png",
      liveLink: "https://amanmishra11.github.io/js-2/keycode.html",
      codeLink: "https://github.com/AmanMishra11/js-2",
    },
    {
      title: "Sticky Notes",
      description: "A fun and interactive page to add, delete sticky notes with a simple and intuitive interface.",
      image: "./assets/sticky.png",
      liveLink: "https://amanmishra11.github.io/js-2/sticky.html",
      codeLink: "https://github.com/AmanMishra11/js-2",
    },
    {
      title: "Feedback",
      description: "A fun and interactive page to give feedback using emojis.",
      image: "./assets/feedback.png",
      liveLink: "https://amanmishra11.github.io/js-2/feedback.html",
      codeLink: "https://github.com/AmanMishra11/js-2",
    },
    {
      title: "Digital Clock",
      description: "A digital clock with options to set the design of the clock and options to set different cities.",
      image: "./assets/clock.png",
      liveLink: "https://amanmishra11.github.io/js-2/clock.html",
      codeLink: "",
    },
    {
      title: "Stopwatch",
      description: "A stopwatch with start, stop, restart, and lap functionalities.",
      image: "./assets/stopwatch.png",
      liveLink: "https://amanmishra11.github.io/js-2/stopwatch.html",
      codeLink: "https://github.com/AmanMishra11/js-2",
    },
    {
      title: "Burgerking Order",
      description: "A Burgerking ordering website which displays when your order is ready with sound effects.",
      image: "./assets/burgerking.png",
      liveLink: "https://amanmishra11.github.io/js-2/burgerking.html",
      codeLink: "https://github.com/AmanMishra11/js-2",
    },
    {
      title: "Leaderboard",
      description: "A leaderboard page where you can add player details and scores, adjust points, and see positions update automatically.",
      image: "./assets/leaderboard.png",
      liveLink: "https://amanmishra11.github.io/js-2/leaderboard.html",
      codeLink: "https://github.com/AmanMishra11/js-2",
    },
    {
      title: "Emoji Search",
      description: "An Emoji search page where you can search for emojis and it will display the relevamnt emojis and their description.",
      image: "./assets/emoji.png",
      liveLink: "https://amanmishra11.github.io/js-2/emoji.html",
      codeLink: "https://github.com/AmanMishra11/js-2",
    }
  ];

  function createProjectCard(project) {
    return `
          <div class="project-card">
              <img src="${project.image}" alt="${project.title}" class="project-image">
              <div class="project-info">
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
                  <div class="project-links">
                      <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer">Live Demo</a>
                      <a href="${project.codeLink}" target="_blank" rel="noopener noreferrer">View Code</a>
                  </div>
              </div>
          </div>
      `
  }

  function loadProjects() {
    const projectsGrid = document.getElementById("projectsGrid")
    projectsGrid.innerHTML = projects.map((project) => createProjectCard(project)).join("")
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-links a")
  
    let currentSection = ""
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (pageYOffset >= sectionTop - 60) {
        currentSection = section.getAttribute("id")
      }
    })
  
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").slice(1) === currentSection) {
        link.classList.add("active")
      }
    })
  })

  document.addEventListener("DOMContentLoaded", loadProjects)
  
  