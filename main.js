document.addEventListener("DOMContentLoaded", () => {
    const portfolioGrid = document.getElementById("portfolio-grid");
    const tagFilters = document.getElementById("tag-filters");
  
    // Shuffle array function
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  
    // Generate tags
    const allTags = ["All", ...new Set(resources.flatMap(item => item.tags))];
    let activeTag = "All";
  
    allTags.forEach(tag => {
      const button = document.createElement("button");
      button.innerText = tag;
      button.classList.toggle("active", tag === activeTag);
      button.onclick = () => {
        activeTag = tag;
        updateTagButtons();
        displayResources();
      };
      tagFilters.appendChild(button);
    });
  
    function updateTagButtons() {
      document.querySelectorAll(".filter-container button").forEach(button => {
        button.classList.toggle("active", button.innerText === activeTag);
      });
    }
  
    // Assign random tile sizes
    function getRandomSizeClass() {
      const sizes = ["small", "medium", "large"];
      return sizes[Math.floor(Math.random() * sizes.length)];
    }
  
    // Display Resources
    function displayResources() {
      portfolioGrid.innerHTML = "";
      const filteredResources = activeTag === "All"
        ? shuffle(resources)
        : shuffle(resources.filter(item => item.tags.includes(activeTag)));
  
      filteredResources.forEach(resource => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("grid-item", getRandomSizeClass());
  
        const lightboxContent = `
          <h3>${resource.title}</h3>
          <p>${resource.description}</p>
        `;
  
        let mediaContent = "";
        if (resource.type === "image") {
          mediaContent = `<img src="${resource.url}" alt="${resource.title}">`;
        } else if (resource.type === "video") {
          mediaContent = `<video preload="none" poster="https://easywaypatente.com/img/video-thumb.jpg" muted>
                            <source data-src="${resource.url}" src="${resource.url}" type="video/mp4">
                          </video>`;
            
        itemDiv.addEventListener("mouseenter", () => {
            const video = itemDiv.querySelector("video");
            const source = video.querySelector("source");
            
            // Restore the source and load the video when hovered
            if (!source.src) {
                source.src = source.dataset.src;  // Restore the original URL stored in data-src
                video.load();
            }
            video.play();
        });
        
        itemDiv.addEventListener("mouseleave", () => {
            const video = itemDiv.querySelector("video");
            const source = video.querySelector("source");
            
            // Pause and reset the video when mouse leaves
            video.pause();
            video.currentTime = 0;
            
            // Set the source to null to stop further loading
            source.src = "";
            video.load();
        });
                          
                          
        }
  
        itemDiv.innerHTML = `
          <a href="${resource.url}" class="glightbox" data-gallery="portfolio" data-desc="${lightboxContent}">
            ${mediaContent}
          </a>
        `;
  
        portfolioGrid.appendChild(itemDiv);
      });
  
      // Initialize or refresh GLightbox
      GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
      });
    }
  
    // Initial Display
    displayResources();
  });
  