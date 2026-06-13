document.addEventListener('DOMContentLoaded', function () {

  window.CEM_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMlU1cixHKgcO-v4KJN9Jd1L4h7ZCR_ZX6vbjN0gSp0MSWthtUUgKaPzxV3_4eNJOuuw/exec';

  // --- Mobile menu ---
  var menuToggle = document.getElementById('menuToggle');
  var menuOverlay = document.getElementById('menuOverlay');

  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      menuOverlay.classList.toggle('open');
      document.body.style.overflow = menuOverlay.classList.contains('open') ? 'hidden' : '';
    });

    menuOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Back to top ---
  var backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('show', window.scrollY > 400);
    });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Scroll reveal ---
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // --- Form handler with localStorage persistence ---
  function handleForm(formId, successId, storageKey) {
    var form = document.getElementById(formId);
    var success = document.getElementById(successId);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var txt = btn.innerHTML;
      btn.innerHTML = 'A enviar...';
      btn.disabled = true;

      var data = {};
      var inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(function (input) {
        if (input.name || input.id) {
          var key = input.name || input.id;
          if (input.type === 'checkbox') {
            data[key] = input.checked;
          } else {
            data[key] = input.value;
          }
        }
      });
      data.submittedAt = new Date().toISOString();

      if ((formId === 'registrationForm' || formId === 'partnerForm' || formId === 'newsletterForm') && window.CEM_SCRIPT_URL) {
        fetch(window.CEM_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(data)
        }).then(function () {
          setTimeout(function () {
            form.style.display = 'none';
            if (success) success.classList.add('show');
            btn.innerHTML = txt;
            btn.disabled = false;
          }, 800);
        }).catch(function () {
          var existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
          existing.push(data);
          localStorage.setItem(storageKey, JSON.stringify(existing));
          setTimeout(function () {
            form.style.display = 'none';
            if (success) success.classList.add('show');
            btn.innerHTML = txt;
            btn.disabled = false;
          }, 800);
        });
        return;
      }

      var existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existing.push(data);
      localStorage.setItem(storageKey, JSON.stringify(existing));

      setTimeout(function () {
        form.style.display = 'none';
        if (success) success.classList.add('show');
        btn.innerHTML = txt;
        btn.disabled = false;
      }, 1200);
    });
  }

  handleForm('registrationForm', 'formSuccess', 'cem_registrations');
  handleForm('partnerForm', 'partnerSuccess', 'cem_partners');
  handleForm('newsletterForm', 'newsletterSuccess', 'cem_newsletter');

  // --- Smooth scroll for anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var h = a.getAttribute('href');
      if (h !== '#') {
        var t = document.querySelector(h);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });

  // --- Current year ---
  var year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  // --- Countdown Timer ---
  var countdownEl = document.getElementById('countdown');
  var miniCountdownEl = document.getElementById('miniCountdown');
  var mainCountdownBar = document.querySelector('.countdown-bar');

  if (countdownEl || miniCountdownEl) {
    // A atividade vai de 22 a 28 de Junho de 2026, com início às 16:00
    var targetDate = new Date('2026-06-22T16:00:00').getTime();
    
    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minsEl = document.getElementById('cd-minutes');
    var secsEl = document.getElementById('cd-seconds');

    var mDaysEl = document.getElementById('m-cd-days');
    var mHoursEl = document.getElementById('m-cd-hours');
    var mMinsEl = document.getElementById('m-cd-minutes');
    var mSecsEl = document.getElementById('m-cd-seconds');

    function updateCountdown() {
      var now = new Date().getTime();
      var distance = targetDate - now;

      if (distance < 0) {
        if (countdownEl) countdownEl.innerHTML = '<div class="cd-live">O Congresso Começou!</div>';
        if (miniCountdownEl) miniCountdownEl.innerHTML = 'AO VIVO';
        return;
      }

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var dStr = days.toString().padStart(2, '0');
      var hStr = hours.toString().padStart(2, '0');
      var mStr = minutes.toString().padStart(2, '0');
      var sStr = seconds.toString().padStart(2, '0');

      if (daysEl) {
        daysEl.textContent = dStr;
        hoursEl.textContent = hStr;
        minsEl.textContent = mStr;
        secsEl.textContent = sStr;
      }
      if (mDaysEl) {
        mDaysEl.textContent = dStr;
        mHoursEl.textContent = hStr;
        mMinsEl.textContent = mStr;
        mSecsEl.textContent = sStr;
      }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Header and Mini countdown scroll logic
  var headerEl = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      if (headerEl) headerEl.classList.add('scrolled');
    } else {
      if (headerEl) headerEl.classList.remove('scrolled');
    }

    if (mainCountdownBar && miniCountdownEl) {
      var rect = mainCountdownBar.getBoundingClientRect();
      if (rect.bottom < 0) {
        miniCountdownEl.classList.add('visible');
      } else {
        miniCountdownEl.classList.remove('visible');
      }
    }
  });

  // --- Speaker Modal Logic ---
  var speakerModal = document.getElementById('speakerModal');
  var modalClose = document.getElementById('modalClose');
  var speakerCards = document.querySelectorAll('.speaker-card');

  if (speakerModal && speakerCards.length > 0) {
    speakerCards.forEach(function(card) {
      card.addEventListener('click', function() {
        // Extract data from the card
        var imgEl = card.querySelector('.speaker-img');
        var nameEl = card.querySelector('h4');
        var roleEl = card.querySelector('.speaker-label');
        var orgEl = card.querySelector('.speaker-org');

        var imgSrc = imgEl ? imgEl.getAttribute('src') : '';
        var name = nameEl ? nameEl.textContent : '';
        var role = roleEl ? roleEl.textContent : '';
        var org = orgEl ? orgEl.textContent : '';

        // Populate modal
        var modalImg = document.getElementById('modalSpeakerImg');
        modalImg.src = imgSrc;
        modalImg.alt = 'Foto de ' + name;
        document.getElementById('modalSpeakerName').textContent = name;
        document.getElementById('modalSpeakerRole').textContent = role;
        document.getElementById('modalSpeakerOrg').textContent = org;
        
        // Biography data
        var bios = {
          "Caridade Muleca": [
            "Reverendo Apóstolo Caridade Muleca, filho de António Teca e Joana Longo. Batizado em 2005 na Igreja Evangélica Monte Carmelo, começou a pregar aos 14 anos. Formado em Teologia Prática (Victory Brazil/Angola) e Teologia Sistemática (Orion). Professor de Escatologia e Tabernáculo. Fundador do Ministério Internacional Deus das Alianças. Director Geral da Escola Dominical, Director Nacional da Juventude Carmelita, Vice-Pastor no Lubango.",
            "Consagrado Apóstolo Missionário em 2017, ordenado Reverendo Apóstolo em 2022. Implantou mais de 14 igrejas. Pela 2.ª vez na lista de pregadores do CEM."
          ],
          "Mata Mourisca": [
            "Mata Mourisca Orlando Andrade, natural do Lubango, nascido a 26 de Agosto de 1986. Pastor sênior e fundador da Igreja Getsêmani Lubango, pai de Lemuel Daniel Andrade. Bacharel em Teologia Reformada pelo Instituto Superior de Teologia Istel-Lubango, estudante de Sociologia, professor de Física do 2.º ciclo. Palestrante, escritor, pregador e Director da Academia da Palavra Viva.",
            "Dedicou boa parte da sua juventude ao ministério de evangelização e discipulado de adolescentes, formando mais de 600 discípulos para Cristo no Sul de Angola. Hoje lidera a Igreja Getsêmani Lubango e actua no ministério de ensino e libertação."
          ],
          "Profeta Malaquias Milagre": [
            "Profeta Malaquias Milagre, natural do Lubango, nascido a 08 de Setembro de 1998. Residente na cidade do Lubango, casado com Esperança Milagre. Escritor e estudante de Teologia na Universidade Teológica Orion. Pastor sênior e fundador da igreja C.P.A. — Catedral Peniel de Adoração, onde exerce um ministério profético e de ensino.",
            "Tem dedicado a sua vida à expansão do Reino de Deus através da pregação da Palavra, da escrita e da formação de discípulos. A sua jornada ministerial é marcada por uma profunda paixão pela adoração e pelo avivamento espiritual, impactando vidas com uma mensagem de fé, esperança e transformação."
          ],
          "Pr Tilson": [
            "Tilson Emanuel Kanguanda, natural do Lubango, província da Huíla, nascido a 27 de Outubro de 1993. Evangelista de consagração, líder da Igreja Cristã Evangélica Pentecostal em Angola (ICEPA) — Centro Jericó-Humpata. Estudante de Teologia no Instituto Superior de Teologia (ISTEL-Lubango).",
            "Dedicado ao ministério evangelístico e pastoral, tem servido com fidelidade na expansão do Reino de Deus através da pregação, discipulado e liderança eclesiástica. A sua vida é marcada por um compromisso inabalável com a Palavra de Deus e com a edificação do Corpo de Cristo."
          ],
          "Profetisa Mimi Domingas TChionga": [
            "Domingas Tchionga Bundi Jamba, natural do Lubango, nascida a 1 de Dezembro de 1995. Líder visionária e fundadora do Ministério Internacional Sangue do Cordeiro. Formada pelo Instituto Superior de Teologia Gnoses. Residente na cidade do Lubango, mãe do Jairo, João, Bernarda e Gire.",
            "Actua no ministério profético com 9 anos de dedicação à obra de Deus. A sua vida é marcada por uma profunda entrega ao serviço cristão, à intercessão e ao discipulado, impactando vidas através da Palavra e do amor de Cristo."
          ]
        };
        var bio = bios[name];
        if (bio) {
          var cleanBio = bio.map(function(p) { return p.replace(/\s{2,}/g, ' '); });
          document.getElementById('modalSpeakerBio').innerHTML = "<p>" + cleanBio.join("</p><p>") + "</p>";
        } else {
          document.getElementById('modalSpeakerBio').textContent = "A biografia completa de " + name + " será disponibilizada em breve. Fique atento às atualizações do programa do congresso.";
        }
        document.getElementById('modalSpeakerDetails').innerHTML = "<strong>Sessões confirmadas:</strong> A anunciar em breve no Programa.";

        // Open modal
        speakerModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
      });
    });

    function closeModal() {
      speakerModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    // Close on overlay click
    speakerModal.addEventListener('click', function(e) {
      if (e.target === speakerModal) {
        closeModal();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && speakerModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

});
