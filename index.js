// Font Awesome Config
window.FontAwesomeConfig = {
  autoReplaceSvg: 'nest', // Options: 'nest', 'remove', 'replace'
};

// Form Submission Handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("my-form");
  const status = document.getElementById("my-form-status");

  if (form) {
    form.addEventListener("submit", async function handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          status.className = "alert alert-success";
          form.reset();
        } else {
          const resData = await response.json();
          if (Object.hasOwn(resData, 'errors')) {
            status.innerHTML = resData["errors"].map(error => error["message"]).join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
          status.className = "alert alert-danger";
        }
      } catch (error) {
        status.innerHTML = "Oops! There was a problem submitting your form";
        status.className = "alert alert-danger";
      }
    });
  }

  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");

      if (isHidden) {
        mobileMenu.classList.remove("hidden", "opacity-0", "scale-95");
        mobileMenu.classList.add("flex", "opacity-100", "scale-100");
      } else {
        mobileMenu.classList.add("opacity-0", "scale-95");
        setTimeout(() => {
          mobileMenu.classList.remove("flex", "opacity-100", "scale-100");
          mobileMenu.classList.add("hidden");
        }, 200); // match transition duration
      }
    });
  }
});

// Filter functions for projects.html

        document.addEventListener('DOMContentLoaded', () => {
            const filterButtons = document.querySelectorAll('.filter-button');
            const projectItems = document.querySelectorAll('.project-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filterValue = button.getAttribute('data-filter');

                    projectItems.forEach(item => {
                        if (filterValue === 'all') {
                            item.style.display = 'block'; // Or 'grid'/'flex' depending on your layout
                        } else {
                            const itemFilters = item.getAttribute('data-filter').split(' ');
                            if (itemFilters.includes(filterValue)) {
                                item.style.display = 'block'; // Or 'grid'/'flex'
                            } else {
                                item.style.display = 'none';
                            }
                        }
                    });

                    // Optional: Highlight active filter button
                    filterButtons.forEach(btn => btn.classList.remove('bg-[#FF6B6B]', 'text-white'));
                    filterButtons.forEach(btn => {
                        if (!btn.classList.contains('border')) {
                            btn.classList.add('border', 'border-[#1B4965]', 'text-[#1B4965]');
                        }
                    });
                    button.classList.add('bg-[#FF6B6B]', 'text-white');
                    button.classList.remove('border', 'border-[#1B4965]', 'text-[#1B4965]');
                });
            });

            // Set 'All Projects' as active by default
            document.querySelector('.filter-button[data-filter="all"]').click();
        });