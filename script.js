function toggleDarkMode() {
  const body = document.body
  const icon = document.getElementById('dark-icon')
  body.classList.toggle('dark-mode')
  if (body.classList.contains('dark-mode')) {
    if (icon) icon.className = 'bi bi-sun-fill'
    localStorage.setItem('hubgtzsen_darkMode', 'on')
  } else {
    if (icon) icon.className = 'bi bi-moon-stars-fill'
    localStorage.setItem('hubgtzsen_darkMode', 'off')
  }
}

function applyDarkMode() {
  if (localStorage.getItem('hubgtzsen_darkMode') === 'on') {
    document.body.classList.add('dark-mode')
    const icon = document.getElementById('dark-icon')
    if (icon) icon.className = 'bi bi-sun-fill'
  }
}
function submitForm() {
  let valid = true

  const nama     = document.getElementById('inputNama')
  const email    = document.getElementById('inputEmail')
  const instansi = document.getElementById('inputInstansi')
  const errNama     = document.getElementById('errNama')
  const errEmail    = document.getElementById('errEmail')
  const errInstansi = document.getElementById('errInstansi')

  if (!nama) return 

  [nama, email, instansi].forEach(el => {
    el.classList.remove('is-invalid', 'is-valid')
  })
  [errNama, errEmail, errInstansi].forEach(el => el.classList.remove('show'))

  if (nama.value.trim() === '') {
    nama.classList.add('is-invalid')
    errNama.classList.add('show')
    valid = false
  } else {
    nama.classList.add('is-valid')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value.trim())) {
    email.classList.add('is-invalid')
    errEmail.classList.add('show')
    valid = false
  } else {
    email.classList.add('is-valid')
  }
  if (instansi.value.trim() === '') {
    instansi.classList.add('is-invalid')
    errInstansi.classList.add('show')
    valid = false
  } else {
    instansi.classList.add('is-valid')
  }
  if (valid) {
    const btn = document.getElementById('btn-kirim')
    btn.disabled = true
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Mengirim...'

    setTimeout(() => {
      document.getElementById('form-success').style.display = 'block'
      btn.style.display = 'none'
      nama.value = '' email.value = '' instansi.value = ''
      document.getElementById('inputPesan').value = ''
      [nama, email, instansi].forEach(el => el.classList.remove('is-valid'))
    }, 1200)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ['inputNama', 'inputEmail', 'inputInstansi'].forEach(id => {
    const el = document.getElementById(id)
    if (!el) return
    el.addEventListener('input', function () {
      this.classList.remove('is-invalid')
      const errEl = document.getElementById('err' + id.replace('input', ''))
      if (errEl) errEl.classList.remove('show')
    })
  })
})

function scrollToKontak() {
  const target = document.getElementById('kontak')
  if (target) target.scrollIntoView({ behavior: 'smooth' })
}

document.addEventListener('DOMContentLoaded', function () {
  const statsSection = document.getElementById('stats-bar')
  if (!statsSection) return

  let counterDone = false

  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number')
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'))
      const suffix = counter.getAttribute('data-suffix') || ''
      const duration = 1500
      const step = target / (duration / 16)
      let current = 0

      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          counter.textContent = target.toLocaleString('id-ID') + suffix
          clearInterval(timer)
        } else {
          counter.textContent = Math.floor(current).toLocaleString('id-ID')
        }
      }, 16)
    })
  }
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counterDone) {
      counterDone = true
      animateCounters()
    }
  }, { threshold: 0.4 })

  observer.observe(statsSection)
})

document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-link')

  window.addEventListener('scroll', () => {
    let current = ''
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80
      if (window.scrollY >= sectionTop) current = section.getAttribute('id')
    })
    navLinks.forEach(link => {
      link.classList.remove('active-nav')
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-nav')
      }
    })
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card')
  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-6px)'
      this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.14)'
      this.style.transition = 'transform 0.25s, box-shadow 0.25s'
    })
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)'
      this.style.boxShadow = ''
    })
  })
})
