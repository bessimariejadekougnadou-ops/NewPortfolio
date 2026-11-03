import { gsap } from 'gsap';

export class NavigationEffect {
  constructor(navigation) {
    this.previous = null;
    this.current = null;
    this.navigation = navigation;
    if (!this.navigation) return;

    this.anchors = Array.from(this.navigation.querySelectorAll("a.nav-link"));
    this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^";

    // Initialize anchors and cached texts
    this.anchors.forEach((anchor) => {
      const span = anchor.querySelector("span.nav-link-text");
      const cachedText = span ? span.innerText.trim() : anchor.innerText.trim();
      anchor.setAttribute("data-cached-text", cachedText);

      // Scramble on hover
      anchor.addEventListener("mouseenter", () => {
        this.scramble(anchor, cachedText);
      });

      // Handle click
      anchor.addEventListener("click", () => {
        this.handleCurrent(anchor);
      });
    });

    // Determine initial active anchor
    const initialActive = this.navigation.querySelector("a.nav-link.active") || this.anchors[0];
    if (initialActive) {
      this.current = initialActive;
      this.current.classList.add("active");
      this.current._hasActiveRects = true;
      const nodes = this.getNodes(this.current);
      if (nodes[0] && nodes[0].length > 0) gsap.set(nodes[0], { attr: { x: "0%" } });
      if (nodes[1] && nodes[1].length > 0) gsap.set(nodes[1], { attr: { x: "0%" } });
    }
  }

  scramble(anchor, targetText) {
    const span = anchor.querySelector("span.nav-link-text");
    if (!span || !targetText) return;
    if (anchor._isScrambling) return;
    anchor._isScrambling = true;

    let iteration = 0;
    const len = targetText.length;
    clearInterval(anchor._scrambleTimer);

    anchor._scrambleTimer = setInterval(() => {
      span.innerText = targetText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) {
            return targetText[index];
          }
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join("");

      if (iteration >= len) {
        clearInterval(anchor._scrambleTimer);
        span.innerText = targetText;
        anchor._isScrambling = false;
      }
      iteration += 1 / 3;
    }, 25);
  }

  handleCurrent(current) {
    if (!current) return;
    if (this.current === current && current.classList.contains("active") && current._hasActiveRects) {
      return;
    }

    this.current = current;
    this.current.classList.add("active");
    this.current._hasActiveRects = true;

    // Slide out all other anchors cleanly
    this.handlePrevious();

    const nodes = this.getNodes(this.current);

    // Layer 1 (.blue rect): radiant violet/purple slices
    if (nodes[0] && nodes[0].length > 0) {
      gsap.to(nodes[0], {
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        attr: { x: "0%" },
        overwrite: true,
        stagger: 0.012
      });

      // Subtle, pro color pulse from luminous lilac to royal violet
      gsap.fromTo(
        nodes[0],
        { fill: "#c084fc" },
        {
          fill: "#7c3aed",
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto"
        }
      );
    }

    // Layer 2 (.pink rect): deep velvet royal violet slices (delay 0.1s)
    if (nodes[1] && nodes[1].length > 0) {
      gsap.to(nodes[1], {
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        attr: { x: "0%" },
        stagger: 0.012,
        overwrite: true,
        delay: 0.1
      });
    }

    // High-tech text scramble feedback on active switch
    const cachedText = this.current.getAttribute("data-cached-text");
    if (cachedText) {
      this.scramble(this.current, cachedText);
    }
  }

  handlePrevious() {
    this.anchors.forEach((anchor) => {
      if (anchor !== this.current && (anchor.classList.contains("active") || anchor._hasActiveRects)) {
        anchor.classList.remove("active");
        anchor._hasActiveRects = false;
        const nodes = this.getNodes(anchor);
        if (nodes[0] && nodes[0].length > 0) {
          gsap.to(nodes[0], {
            duration: 0.2,
            ease: "power1.out",
            attr: { x: "-101%" },
            overwrite: true
          });
        }
        if (nodes[1] && nodes[1].length > 0) {
          gsap.to(nodes[1], {
            duration: 0.2,
            ease: "power1.out",
            attr: { x: "-101%" },
            overwrite: true,
            delay: 0.02
          });
        }
      }
    });
  }

  getNodes(item) {
    if (!item) return [[], []];
    return [
      gsap.utils.shuffle(Array.from(item.querySelectorAll(".blue rect"))),
      gsap.utils.shuffle(Array.from(item.querySelectorAll(".pink rect")))
    ];
  }

  setActiveById(id) {
    const target = this.anchors.find((a) => a.getAttribute("data-id") === id);
    if (target && target !== this.current) {
      this.handleCurrent(target);
    }
  }

  destroy() {
    this.anchors.forEach((anchor) => {
      clearInterval(anchor._scrambleTimer);
    });
  }
}
