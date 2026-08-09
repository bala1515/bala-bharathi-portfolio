import { Controller } from "@hotwired/stimulus"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

// Signature ID Card Controller: Instant 60fps pendulum swing, mouse parallax, and scroll reaction.
export default class extends Controller {
  static targets = ["card", "lanyard", "container"]

  connect() {
    gsap.registerPlugin(ScrollTrigger)

    if (!this.hasCardTarget) return

    // Set 3D perspective & origins
    gsap.set(this.cardTarget, { transformOrigin: "top center", transformPerspective: 1000, rotationX: 0, rotationY: 0 })
    if (this.hasLanyardTarget) {
      gsap.set(this.lanyardTarget, { transformOrigin: "top center" })
    }

    // Initialize instant quickTo interpolators (0.1s duration = zero lag!)
    this.rotQuick = gsap.quickTo(this.cardTarget, "rotation", { duration: 0.1, ease: "power1.out" })
    this.yQuick = gsap.quickTo(this.cardTarget, "y", { duration: 0.1, ease: "power1.out" })
    this.xRotQuick = gsap.quickTo(this.cardTarget, "rotationY", { duration: 0.2, ease: "power2.out" })
    this.yRotQuick = gsap.quickTo(this.cardTarget, "rotationX", { duration: 0.2, ease: "power2.out" })

    this.initPendulumSwing()
    this.initMouseParallax()
    this.initScrollPhysics()
  }

  disconnect() {
    if (this.swingTween) this.swingTween.kill()
    if (this.scrollTrigger) this.scrollTrigger.kill()
    if (this.onMouseMove) window.removeEventListener("mousemove", this.onMouseMove)
  }

  // 1. Continuous Idle Pendulum Swing
  initPendulumSwing() {
    this.swingTween = gsap.to(this.cardTarget, {
      rotation: 4,
      duration: 2.0,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    })
  }

  // 2. Mouse Parallax Tilt (Desktop - crisp 0.2s tracking)
  initMouseParallax() {
    this.onMouseMove = (e) => {
      if (window.innerWidth < 768) return

      const rect = this.element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = (e.clientX - centerX) / (rect.width / 2)
      const mouseY = (e.clientY - centerY) / (rect.height / 2)

      this.xRotQuick(mouseX * 10)
      this.yRotQuick(-mouseY * 10)
    }

    this.onMouseLeave = () => {
      this.xRotQuick(0)
      this.yRotQuick(0)
    }

    window.addEventListener("mousemove", this.onMouseMove, { passive: true })
    this.element.addEventListener("mouseleave", this.onMouseLeave)
  }

  // 3. Instant Scroll Physics Reaction (No delay queued)
  initScrollPhysics() {
    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.element,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity() / 400
        const clamped = Math.max(-10, Math.min(10, velocity))
        
        // Instant update via quickTo (0.1s interpolation)
        this.rotQuick(clamped)
        this.yQuick(Math.abs(clamped) * 1.2)
      }
    })
  }
}
