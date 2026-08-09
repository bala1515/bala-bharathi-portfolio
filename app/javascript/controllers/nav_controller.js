import { Controller } from "@hotwired/stimulus"

// Navbar Controller: Controls sticky navbar glassmorphism shrink, active link highlight & mobile menu toggle.
export default class extends Controller {
  static targets = ["nav", "menu", "link"]

  connect() {
    this.onScroll = this.onScroll.bind(this)
    window.addEventListener("scroll", this.onScroll, { passive: true })
    this.onScroll()
  }

  disconnect() {
    window.removeEventListener("scroll", this.onScroll)
  }

  onScroll() {
    const scrollY = window.scrollY

    // Shrink & intensify glassmorphism on scroll
    if (this.hasNavTarget) {
      if (scrollY > 40) {
        this.navTarget.classList.add("py-3", "shadow-xl", "bg-[#0b0f19]/90")
        this.navTarget.classList.remove("py-5", "bg-[#0b0f19]/60")
      } else {
        this.navTarget.classList.add("py-5", "bg-[#0b0f19]/60")
        this.navTarget.classList.remove("py-3", "shadow-xl", "bg-[#0b0f19]/90")
      }
    }

    // Highlight active nav link based on section scroll position
    const sections = document.querySelectorAll("section[id]")
    let currentSectionId = ""

    sections.forEach((section) => {
      const top = section.offsetTop - 120
      const height = section.offsetHeight
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = section.getAttribute("id")
      }
    })

    if (this.hasLinkTarget) {
      this.linkTargets.forEach((link) => {
        const href = link.getAttribute("href")
        if (href === `#${currentSectionId}`) {
          link.classList.add("text-teal-400", "font-semibold")
          link.classList.remove("text-slate-400")
        } else {
          link.classList.remove("text-teal-400", "font-semibold")
          link.classList.add("text-slate-400")
        }
      })
    }
  }

  toggleMenu() {
    if (this.hasMenuTarget) {
      this.menuTarget.classList.toggle("hidden")
    }
  }

  closeMenu() {
    if (this.hasMenuTarget) {
      this.menuTarget.classList.add("hidden")
    }
  }
}
