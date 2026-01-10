/**
 * Main JavaScript for CinemaMax Pro Theme
 */

;(() => {
  // DOM Ready
  document.addEventListener("DOMContentLoaded", () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item__question")

    faqItems.forEach((item) => {
      item.addEventListener("click", function () {
        const isExpanded = this.getAttribute("aria-expanded") === "true"
        const answerId = this.getAttribute("aria-controls")
        const answer = document.getElementById(answerId)

        // Close all other FAQs
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.setAttribute("aria-expanded", "false")
            const otherAnswerId = otherItem.getAttribute("aria-controls")
            const otherAnswer = document.getElementById(otherAnswerId)
            if (otherAnswer) {
              otherAnswer.hidden = true
            }
          }
        })

        // Toggle current FAQ
        this.setAttribute("aria-expanded", !isExpanded)
        if (answer) {
          answer.hidden = isExpanded
        }
      })
    })

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
        if (href !== "#" && href.length > 1) {
          const target = document.querySelector(href)
          if (target) {
            e.preventDefault()
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }
      })
    })

    // Countdown Timer (if present)
    const countdownTimer = document.querySelector(".offer__countdown-timer")
    if (countdownTimer) {
      // Simple countdown implementation
      let hours = 5
      let minutes = 23
      let seconds = 47

      function updateCountdown() {
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 0
          minutes = 0
          seconds = 0
        }

        const hoursEl = countdownTimer.querySelector(".countdown-unit:nth-child(1) .countdown-unit__value")
        const minutesEl = countdownTimer.querySelector(".countdown-unit:nth-child(2) .countdown-unit__value")
        const secondsEl = countdownTimer.querySelector(".countdown-unit:nth-child(3) .countdown-unit__value")

        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0")
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0")
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0")
      }

      setInterval(updateCountdown, 1000)
    }

    // Demo video play button
    const playButton = document.querySelector(".demo__play-button")
    if (playButton) {
      playButton.addEventListener("click", () => {
        // Replace with actual video embed or lightbox
        alert("Video player would open here")
      })
    }
  })
})()
