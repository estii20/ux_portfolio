// Configure FontAwesome to replace SVG icons automatically in nested elements
window.FontAwesomeConfig = { autoReplaceSvg: "nest" };

// When the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // --- Form submission handling ---
  const form = document.getElementById("my-form");
  const formStatus = document.getElementById("my-form-status");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent default form submission

      const formData = new FormData(form);

      try {
        // Send form data via fetch using form's action and method attributes
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          // On success, show success message, reset form
          formStatus.innerHTML = "Thanks for your submission!";
          formStatus.className = "alert alert-success";
          form.reset();
        } else {
          // On failure, parse response JSON for errors and show message
          const data = await response.json();

          if (Object.hasOwn(data, "errors")) {
            formStatus.innerHTML = data.errors.map((error) => error.message).join(", ");
          } else {
            formStatus.innerHTML = "Oops! There was a problem submitting your form";
          }
          formStatus.className = "alert alert-danger";
        }
      } catch (error) {
        // On network or other errors, show error message
        formStatus.innerHTML = "Oops! There was a problem submitting your form";
        formStatus.className = "alert alert-danger";
      }
    });
  }

// --- Mobile menu toggle button handling ---
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    if (mobileMenu.classList.contains("hidden")) {
      // Show menu with animation classes
      mobileMenu.classList.remove("hidden", "opacity-0", "scale-95");
      mobileMenu.classList.add("flex", "opacity-100", "scale-100");
    } else {
      // Hide menu with animation classes
      mobileMenu.classList.add("opacity-0", "scale-95");

      // After animation delay, fully hide the menu
      setTimeout(() => {
        mobileMenu.classList.remove("flex", "opacity-100", "scale-100");
        mobileMenu.classList.add("hidden");
      }, 200);
    }
  });

  // 🔽 New logic: Close mobile menu when a link is clicked
  const menuLinks = mobileMenu.querySelectorAll("a");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("opacity-0", "scale-95");
      setTimeout(() => {
        mobileMenu.classList.remove("flex", "opacity-100", "scale-100");
        mobileMenu.classList.add("hidden");
      }, 200);
    });
  });
}

  // --- Project filtering functionality ---
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      projectItems.forEach((item) => {
        if (filter === "all") {
          // Show all projects if filter is "all"
          item.style.display = "block";
        } else {
          // Show only projects matching the filter category
          const categories = item.getAttribute("data-filter").split(" ");
          item.style.display = categories.includes(filter) ? "block" : "none";
        }
      });

      // Reset styles on all filter buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("bg-[#FF6B6B]", "text-white");
        if (!btn.classList.contains("border")) {
          btn.classList.add("border", "border-[#1B4965]", "text-[#1B4965]");
        }
      });

      // Highlight the clicked filter button
      button.classList.add("bg-[#FF6B6B]", "text-white");
      button.classList.remove("border", "border-[#1B4965]", "text-[#1B4965]");
    });
  });

  // Automatically click the "all" filter button on page load to show all projects
  const allButton = document.querySelector('.filter-button[data-filter="all"]');
  if (allButton) allButton.click();
});
