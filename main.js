/* ============================================
   AIOPSEXPERT.COM — Main JavaScript
   ============================================ */

// ---- Custom Cursor ----
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .card, .faq-question, .chat-bubble, .chat-option-btn, input, select, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

// ---- Neural Canvas ----
function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    let mouseX = W / 2, mouseY = H / 2;

    canvas.width = W;
    canvas.height = H;

    window.addEventListener('resize', () => {
        W = canvas.offsetWidth;
        H = canvas.offsetHeight;
        canvas.width = W;
        canvas.height = H;
        initParticles();
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    const PARTICLE_COUNT = 70;
    const MAX_DIST = 160;
    let particles = [];

    const COLORS = ['rgba(79,127,255,', 'rgba(0,212,255,', 'rgba(124,58,237,'];

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                originalX: 0,
                originalY: 0
            });
        }
    }

    initParticles();

    function draw() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach(p => {
            // Repel from mouse
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                const force = (100 - dist) / 100;
                p.vx += (dx / dist) * force * 0.5;
                p.vy += (dy / dist) * force * 0.5;
            }

            p.vx *= 0.99;
            p.vy *= 0.99;
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + '0.7)';
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.4;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(79,127,255,${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
}

initNeuralCanvas();

// ---- Scroll Reveal ----
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger').forEach(el => {
        observer.observe(el);
    });
}

initScrollReveal();

// ---- Sticky Nav ----
const nav = document.querySelector('.nav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ---- Mobile Hamburger ----
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });
}

// ---- Animated Counters ----
function animateCounter(el, target, duration = 1800, prefix = '', suffix = '') {
    let start = 0;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(eased * target);
        el.textContent = prefix + value.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function initCounters() {
    const counterEls = document.querySelectorAll('[data-counter]');
    if (!counterEls.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const el = entry.target;
                const target = parseFloat(el.dataset.counter);
                const prefix = el.dataset.prefix || '';
                const suffix = el.dataset.suffix || '';
                animateCounter(el, target, 1800, prefix, suffix);
            }
        });
    }, { threshold: 0.5 });

    counterEls.forEach(el => obs.observe(el));
}

initCounters();

// ---- ROI Calculator ----
function initCalc() {
    const form = document.getElementById('roi-calc');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select');
    const savingsEl = document.getElementById('calc-savings');
    const hoursEl = document.getElementById('calc-hours');
    const roiEl = document.getElementById('calc-roi');
    const empSliderVal = document.getElementById('emp-slider-val');
    const hrsSliderVal = document.getElementById('hrs-slider-val');
    const rateSliderVal = document.getElementById('rate-slider-val');

    const empSlider = document.getElementById('calc-employees');
    const hrsSlider = document.getElementById('calc-hours-manual');
    const rateSlider = document.getElementById('calc-rate');

    if (empSlider) empSlider.addEventListener('input', () => { empSliderVal.textContent = empSlider.value; calculate(); });
    if (hrsSlider) hrsSlider.addEventListener('input', () => { hrsSliderVal.textContent = hrsSlider.value; calculate(); });
    if (rateSlider) rateSlider.addEventListener('input', () => { rateSliderVal.textContent = '$' + rateSlider.value; calculate(); });

    function calculate() {
        const employees = parseInt(empSlider?.value || 5);
        const hrsPerWeek = parseInt(hrsSlider?.value || 10);
        const rate = parseInt(rateSlider?.value || 25);

        const hrsAutomated = Math.round(employees * hrsPerWeek * 0.70);
        const monthlySavings = Math.round(hrsAutomated * rate * 4.33);
        const annualROI = Math.round(monthlySavings * 12);

        if (savingsEl) savingsEl.textContent = '$' + monthlySavings.toLocaleString();
        if (hoursEl) hoursEl.textContent = hrsAutomated + ' hrs';
        if (roiEl) roiEl.textContent = '$' + annualROI.toLocaleString();
    }

    calculate();
}

initCalc();

// ---- FAQ Accordion ----
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

            // Toggle current
            if (!isOpen) item.classList.add('open');
        });
    });
}

initFAQ();

// ---- Chatbot Widget ----
function initChatbot() {
    const bubble = document.getElementById('chat-bubble');
    const panel = document.getElementById('chat-panel');
    const closeBtn = document.getElementById('chat-close');
    const messagesEl = document.getElementById('chat-messages');
    const optionsEl = document.getElementById('chat-options');
    const inputEl = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    if (!bubble || !panel) return;

    let step = 0;

    const FLOWS = [
        {
            msg: "👋 Hi! I'm Daniel's AI assistant. I help SMBs find the right AI solution. Quick question — how big is your team?",
            options: ['Just me (solo)', '2–10 employees', '11–50 employees', '50+ employees']
        },
        {
            msg: "Great! What's your biggest operational bottleneck right now?",
            options: ['Manual data entry & reporting', 'Social media & content creation', 'Lead follow-up & CRM', 'Inventory or scheduling', 'All of the above 😅']
        },
        {
            msg: "Have you tried any AI tools before?",
            options: ["No, we're new to AI", 'We use some basic tools (ChatGPT, etc.)', "We've tried but couldn't make it stick", 'Yes, but want more advanced automation']
        },
        {
            msg: "Based on your answers, I'd recommend starting with a **Free AI Readiness Assessment**. Daniel will analyze your exact situation and show you where automation can save you the most time and money. Ready to book?",
            options: ['📅 Book My Free Assessment', '📦 See Pricing Packages', '💬 Ask a Question']
        }
    ];

    const FINAL_MSGS = {
        '📅 Book My Free Assessment': "Perfect! Click below to pick a time that works for you. Daniel does 15-minute discovery calls daily 🚀<br><br><a href='book.html' class='btn btn-primary btn-sm' style='display:inline-flex;margin-top:0.5rem;cursor:default;'>📅 Book Free Call →</a>",
        '📦 See Pricing Packages': "Our packages start at $500 for an AI Readiness Assessment and go up to $10,000 for full end-to-end AI operations deployment. <a href='index.html#pricing' style='color: var(--primary);'>View all packages →</a>",
        '💬 Ask a Question': "Of course! Type your question below and I'll do my best to answer. Or you can <a href='book.html' style='color: var(--primary);'>book a free call</a> for a personal conversation with Daniel."
    };

    function addMessage(text, isUser = false) {
        const msg = document.createElement('div');
        msg.classList.add('msg', isUser ? 'msg-user' : 'msg-bot');
        msg.innerHTML = text;
        messagesEl.appendChild(msg);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showOptions(opts) {
        optionsEl.innerHTML = '';
        opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('chat-option-btn');
            btn.textContent = opt;
            btn.addEventListener('click', () => handleOption(opt));
            optionsEl.appendChild(btn);
        });
    }

    function handleOption(choice) {
        addMessage(choice, true);
        optionsEl.innerHTML = '';

        setTimeout(() => {
            if (step < FLOWS.length - 1) {
                step++;
                addMessage(FLOWS[step].msg);
                showOptions(FLOWS[step].options);
            } else {
                const finalMsg = FINAL_MSGS[choice] || FINAL_MSGS['📅 Book My Free Assessment'];
                addMessage(finalMsg);
                step = 0;
            }
        }, 400);
    }

    // Open/close
    bubble.addEventListener('click', () => {
        panel.classList.toggle('open');
        if (panel.classList.contains('open') && messagesEl.children.length === 0) {
            setTimeout(() => {
                addMessage(FLOWS[0].msg);
                showOptions(FLOWS[0].options);
            }, 300);
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', () => panel.classList.remove('open'));

    // Text input
    if (sendBtn && inputEl) {
        const sendMsg = () => {
            const text = inputEl.value.trim();
            if (!text) return;
            addMessage(text, true);
            inputEl.value = '';
            setTimeout(() => {
                addMessage("Great question! For a detailed answer, I'd recommend <a href='book.html' style='color:var(--primary);'>booking a free 15-minute call</a> with Daniel. He'll give you a personalized recommendation for your business.");
            }, 500);
        };

        sendBtn.addEventListener('click', sendMsg);
        inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMsg(); });
    }
}

initChatbot();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---- Personal Video Modal ----
(function () {
    const trigger = document.getElementById('video-trigger');
    const modal = document.getElementById('video-modal');
    const closeBtn = document.getElementById('video-modal-close');
    const video = document.getElementById('personal-video');
    if (!trigger || !modal || !video) return;

    function openModal() {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        video.play().catch(() => { });
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        video.pause();
        video.currentTime = 0;
    }

    trigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
})();
