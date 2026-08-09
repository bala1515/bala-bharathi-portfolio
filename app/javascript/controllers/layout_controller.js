import { Controller } from "@hotwired/stimulus"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

// Layout Controller: Manages instant native scrolling response and automatic ScrollTrigger refreshes.
export default class extends Controller {
  connect() {
    gsap.registerPlugin(ScrollTrigger)
    
    // Disable GSAP lag smoothing completely for instant response
    gsap.ticker.lagSmoothing(0)

    // Force ScrollTrigger to update & refresh on native scroll
    this.onScroll = () => ScrollTrigger.update()
    window.addEventListener("scroll", this.onScroll, { passive: true })

    // Refresh ScrollTrigger after DOM load
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    this.bindAnchorLinks()
  }

  disconnect() {
    window.removeEventListener("scroll", this.onScroll)
  }

  bindAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href")
        if (href && href !== "#") {
          e.preventDefault()
          const target = document.querySelector(href)
          if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - 80
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            })
          }
        }
      })
    })
  }
}
