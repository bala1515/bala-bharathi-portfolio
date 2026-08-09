# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"

# GSAP Animation Library & ScrollTrigger Plugin
pin "gsap", to: "https://ga.jspm.io/npm:gsap@3.12.5/index.js"
pin "gsap/ScrollTrigger", to: "https://ga.jspm.io/npm:gsap@3.12.5/ScrollTrigger.js"

# Lenis Smooth Scroll Library
pin "@studio-freight/lenis", to: "https://ga.jspm.io/npm:@studio-freight/lenis@1.0.42/dist/lenis.mjs"

pin_all_from "app/javascript/controllers", under: "controllers"
