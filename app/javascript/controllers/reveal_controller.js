import { Controller } from "@hotwired/stimulus"
import gsap from "gsap"

// Reveal Controller: Animates elements into view instantly with staggered fade & slide-up on scroll.
export default class extends Controller {
  static targets = ["item"]
  static values = {
    stagger: { type: Number, default: 0.08 },
    y: { type: Number, default: 30 },
    duration: { type: Number, default: 0.5 },
    delay: { type: Number, default: 0 }
  }

  connect() {
    this.initReveal()
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  initReveal() {
    const targets = this.hasItemTarget ? this.itemTargets : [this.element]

    // Set initial hidden state instantly
    gsap.set(targets, {
      opacity: 0,
      y: this.yValue,
      willChange: "transform, opacity"
    })

    // High-performance IntersectionObserver for native 60fps scroll triggers
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: this.durationValue,
              delay: this.delayValue,
              stagger: this.staggerValue,
              ease: "power2.out",
              overwrite: "auto"
            })
            this.observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
      }
    )

    this.observer.observe(this.element)
  }
}
