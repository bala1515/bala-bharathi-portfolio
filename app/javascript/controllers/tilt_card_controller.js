import { Controller } from "@hotwired/stimulus"
import gsap from "gsap"

// 3D Tilt Card Controller: Adds smooth 3D parallax tilt & glare effect to project cards on mouse hover.
export default class extends Controller {
  connect() {
    gsap.set(this.element, { transformPerspective: 1000, transformStyle: "preserve-3d", rotationX: 0, rotationY: 0 })

    this.xTo = gsap.quickTo(this.element, "rotationY", { duration: 0.4, ease: "power2.out" })
    this.yTo = gsap.quickTo(this.element, "rotationX", { duration: 0.4, ease: "power2.out" })
    this.scaleTo = gsap.quickTo(this.element, "scale", { duration: 0.4, ease: "power2.out" })

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)

    this.element.addEventListener("mousemove", this.onMouseMove)
    this.element.addEventListener("mouseleave", this.onMouseLeave)
  }

  disconnect() {
    this.element.removeEventListener("mousemove", this.onMouseMove)
    this.element.removeEventListener("mouseleave", this.onMouseLeave)
  }

  onMouseMove(e) {
    if (window.innerWidth < 768) return

    const rect = this.element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = -((y - centerY) / centerY) * 10
    const rotateY = ((x - centerX) / centerX) * 10

    this.xTo(rotateY)
    this.yTo(rotateX)
    this.scaleTo(1.03)
  }

  onMouseLeave() {
    this.xTo(0)
    this.yTo(0)
    this.scaleTo(1)
  }
}
