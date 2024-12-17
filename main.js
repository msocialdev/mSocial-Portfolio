document.addEventListener("DOMContentLoaded", () => {
    const portfolioGrid = document.getElementById("portfolio-grid");
    const tagFilters = document.getElementById("tag-filters");
  
    // Placeholder for your resources from AWS CloudFront
    const resources = [
      {
        type: "image", // "video" or "image"
        title: "Project 1",
        description: "Graphic Design Work",
        client: "Client A",
        clientLogo: "https://via.placeholder.com/50",
        url: "https://your-cloudfront-url/graphic1.jpg",
        tags: ["Design", "Branding"]
      },
      {
        type: "video",
        title: "Promo Video",
        description: "Marketing Video Project",
        client: "Client B",
        clientLogo: "https://via.placeholder.com/50",
        url: "https://your-cloudfront-url/video1.mp4",
        tags: ["Marketing", "Video"]
      },
      // Add more items
    ];
  
    // Dynamically generate tags
    const allTags = new Set();
    resources.forEach(item => item.tags.forEach(tag => allTags.add(tag)));
  
    allTags.forEach(tag => {
      const button = document.createElement("button");
      button.innerText = tag;
      button.onclick = () => filterResources(tag);
      tagFilters.appendChild(button);
    });
  
    // Display all resources shuffled
    displayResources(shuffleArray(resources));
  
    function displayResources(items) {
      portfolioGrid.innerHTML = ""; // Clear grid
      items.forEach(resource => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("grid-item");
  
        let mediaContent = "";
        if (resource.type === "image") {
          mediaContent = `<img src="${resource.url}" alt="${resource.title}">`;
        } else if (resource.type === "video") {
          mediaContent = `<video autoplay muted loop>
                            <source src="${resource.url}" type="video/mp4">
                          </video>`;
        }
  
        itemDiv.innerHTML = `
          <a href="${resource.url}" class="glightbox" data-gallery="portfolio">
            ${mediaContent}
            <div class="grid-item-title">${resource.title}</div>
          </a>
        `;
  
        portfolioGrid.appendChild(itemDiv);
      });
  
      // Initialize GLightbox for lightbox effect
      const lightbox = GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
      });
    }
  
    function filterResources(tag) {
      const filteredItems = resources.filter(item => item.tags.includes(tag));
      displayResources(filteredItems);
    }
  
    // Helper function: Shuffle array
    function shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  });
  