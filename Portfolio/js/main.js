const sidebar  = document.getElementById('sidebar');
const backdrop = document.getElementById('backdrop');

// mobile open/close
function toggleMenu() {
  sidebar.classList.toggle('open');
  backdrop.classList.toggle('show');
}

// load navbar
document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("sidebar").innerHTML = html;

      // hook hamburger AFTER navbar loads
      const hamburger = document.getElementById('hamburger');
      if (hamburger) hamburger.addEventListener('click', toggleMenu);
      if (backdrop)  backdrop.addEventListener('click', toggleMenu);

      //set active link AFTER navbar loads
      const current = location.hash || location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.nav-link').forEach(a => {
        const href = a.getAttribute('href');
        if (href === current) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    })
    .catch(err => console.error("Sidebar failed to load:", err));
})
;

//clear form
document.getElementById("contactForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // stop default form redirect
  const form = event.target;
  const formData = new FormData(form);

  // send to Formspree
  const response = await fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    form.reset(); // clear form
    document.getElementById("formMessage").style.display = "block"; // show success message
  } else {
    alert("Sorry! Something went wrong. Please try again.");
  }
});

//thank you message form autofade
document.getElementById("contactForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const response = await fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { 'Accept': 'application/json' }
  });

  const messageBox = document.getElementById("formMessage");

  if (response.ok) {
    form.reset();
    messageBox.textContent = "Thank you! Your message has been sent.";
    messageBox.classList.add("show");

    // Auto-hide thank you message @ 6s basta yon na yon
    setTimeout(() => {
      messageBox.classList.remove("show");
      setTimeout(() => { messageBox.style.display = "none"; }, 800); // wait for fade
    }, 6000);
  } else {
    messageBox.textContent = "Oops! Something went wrong. Please try again.";
    messageBox.style.color = "#cc0000";
    messageBox.style.background = "rgba(204,0,0,0.1)";
    messageBox.style.border = "1px solid #e6a1a1";
    messageBox.classList.add("show");
  }
});


