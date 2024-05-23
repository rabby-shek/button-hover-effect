(() => {
  const randomLetters =
    "QWERTYUIOPASDFGHJKLZXCVBNMabcdefghijklmnopqrstuvwxyz ".split("");

  class HoverAnimation {
    constructor(el) {
      this.el = el;
      this.originalText = el.innerText;
      this.textLength = el.innerText.length;
      this.frame = 0;
      this.hovered = false;
      this.animationRequestId = null;
      //   this.convertOriginalTextToArray = this.originalText.split('');

      // Wrapping the text content in a span to maintain width
      this.span = document.createElement("span");
      this.span.style.display = "inline-block";
      this.span.style.width = `${this.el.offsetWidth}px`;
      this.span.style.textAlign = "center";
      this.span.innerText = this.originalText;
      this.el.innerText = "";
      this.el.appendChild(this.span);

      this.el.addEventListener("mouseenter", () => {
        this.hovered = true;
        this.animate();
        // console.log(this.convertOriginalTextToArray);
      });

      this.el.addEventListener("mouseleave", () => {
        this.hovered = false;
        this.frame = 0;
        cancelAnimationFrame(this.animationRequestId);
        setTimeout(() => {
          this.span.innerText = this.originalText;
        });
      });
    }

    animate() {
      if (!this.hovered) return;

      if (this.frame < 30) {
        if (this.frame % 3 === 0) {
          let randomString = "";
          for (let i = 0; i < this.textLength; i++) {
            const randomChar =
              randomLetters[Math.floor(Math.random() * randomLetters.length)];
            randomString += randomChar;
          }
          this.span.innerText = randomString;
        }
        this.frame++;
        this.animationRequestId = requestAnimationFrame(
          this.animate.bind(this)
        );
      } else {
        this.span.innerText = this.originalText;
      }
    }
  }

  const initializeHoverAnimations = () => {
    const elements = document.querySelectorAll(".animate-hover");
    elements.forEach((el) => new HoverAnimation(el));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeHoverAnimations);
  } else {
    initializeHoverAnimations();
  }
})();
