const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu a");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("active");
});

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove("active");
  }
});

/*************************************************
 PRODUCT SECTION – FINAL FULL JS (FIXED)
*************************************************/

document.addEventListener("DOMContentLoaded", () => {

  /* ================= IMAGE SLIDER ================= */

  const sliderImages = [
    "assets/product-main.png",
    "assets/thumb-1.png",
    "assets/thumb-2.png",
    "assets/thumb-3.png"
  ];

  let currentSlide = 0;

  const mainImage = document.getElementById("mainImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".ps-dot");
  const thumbs = document.querySelectorAll(".ps-thumbs img");

  function updateSlider() {
    if (!mainImage) return;

    mainImage.src = sliderImages[currentSlide];

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });

    // thumbnail active (optional polish)
    thumbs.forEach((thumb, index) => {
      thumb.classList.toggle(
        "active",
        index % sliderImages.length === currentSlide
      );
    });
  }

  prevBtn?.addEventListener("click", () => {
    currentSlide =
      (currentSlide - 1 + sliderImages.length) % sliderImages.length;
    updateSlider();
  });

  nextBtn?.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % sliderImages.length;
    updateSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentSlide = index % sliderImages.length;
      updateSlider();
    });
  });

  updateSlider();

  /* ================= SUBSCRIPTION TOGGLE ================= */

  const singleSub = document.getElementById("singleSub");
  const doubleSub = document.getElementById("doubleSub");

  document.querySelectorAll('input[name="plan"]').forEach(radio => {
    radio.addEventListener("change", function () {

      if (this.closest("#singleSub")) {
        singleSub.classList.add("active");
        doubleSub.classList.remove("active");
      }

      if (this.closest("#doubleSub")) {
        doubleSub.classList.add("active");
        singleSub.classList.remove("active");
      }

    });
  });

  /* ================= SINGLE SUB IMAGE REPLACE ================= */

  const singleFragRow = document.querySelector("#singleSub .frag-row");
  const singleImg = document.querySelector("#singleSub .single-img");

  if (singleFragRow && singleImg) {
    const cards = singleFragRow.querySelectorAll(".frag-card");

    cards.forEach(card => {
      card.addEventListener("click", () => {
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        singleImg.src = card.querySelector("img").src;
      });
    });
  }

  /* ================= DOUBLE SUB IMAGE REPLACE ================= */

  const doubleFragRows = document.querySelectorAll("#doubleSub .frag-row");

  doubleFragRows.forEach((row, rowIndex) => {
    const cards = row.querySelectorAll(".frag-card");

    cards.forEach(card => {
      card.addEventListener("click", () => {
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        const imgSrc = card.querySelector("img").src;

        if (rowIndex === 0) {
          const img1 = document.querySelector(".double-img-1");
          if (img1) img1.src = imgSrc;
        }

        if (rowIndex === 1) {
          const img2 = document.querySelector(".double-img-2");
          if (img2) img2.src = imgSrc;
        }
      });
    });
  });

  /* ================= ADD TO CART ================= */


    const activeFrags =
      document.querySelectorAll(".frag-card.active").length;

    const link = `https://dummy-cart.com/${activePlan}-${activeFrags}`;

    console.log("ADD TO CART LINK:", link);
    // window.location.href = link;
  });


/************ COLLECTION ACCORDION ************/

document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const icon = header.querySelector(".icon");

    document.querySelectorAll(".accordion-item").forEach(i => {
      i.classList.remove("active");
      i.querySelector(".icon").textContent = "+";
    });

    item.classList.add("active");
    icon.textContent = "−";
  });
});
/************ STATS COUNTER ************/

const counters = document.querySelectorAll(".counter");
let statsPlayed = false;

function startCounters() {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let count = 0;
    const speed = 20; // lower = faster

    const updateCount = () => {
      if (count < target) {
        count++;
        counter.innerText = count;
        setTimeout(updateCount, speed);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// trigger on scroll
window.addEventListener("scroll", () => {
  const section = document.getElementById("statsSection");
  const sectionTop = section.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight && !statsPlayed) {
    startCounters();
    statsPlayed = true;
  }
});
/************ COMPARE TABLE HOVER ************/

/******** WHY GTG COLUMN SELECT ********/

const headers = document.querySelectorAll(".compare-table th.brand");
const rows = document.querySelectorAll(".compare-table tbody tr");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const colIndex = header.dataset.col;

    // header active
    headers.forEach(h => h.classList.remove("active"));
    header.classList.add("active");

    // column highlight
    rows.forEach(row => {
      row.querySelectorAll("td").forEach(td =>
        td.classList.remove("active-col")
      );

      const targetCell = row.children[colIndex];
      if (targetCell) targetCell.classList.add("active-col");
    });
  });
});
/************* FOOTER NEWSLETTER JS *************/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("newsletterEmail");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Subscribed successfully!");
    form.reset();
  });
});




