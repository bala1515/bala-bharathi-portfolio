import { Controller } from "@hotwired/stimulus"

// Scroll Progress Bar Controller: Updates a top thin progress bar as user scrolls down the page.
export default class extends Controller {
  static targets = ["bar"]

  connect() {
    this.updateProgress = this.updateProgress.bind(this)
    window.addEventListener("scroll", this.updateProgress, { passive: true })
    window.addEventListener("resize", this.updateProgress, { passive: true })
    this.updateProgress()
  }

  disconnect() {
    window.removeEventListener("scroll", this.updateProgress)
    window.removeEventListener("resize", this.updateProgress)
  }

  updateProgress() {
    if (!this.hasBarTarget) return

    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
    this.barTarget.style.width = `${Math.min(100, Math.max(0, progress))}%`
  }
}
