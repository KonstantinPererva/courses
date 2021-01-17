function initCarousel(selector, options)
{
    let self = this;
    self.selector = selector;
    self.slider = document.querySelectorAll(self.selector);
    self.options = options;

    if (!self.slider.length) return;

    for (let i = 0; i < self.slider.length; i++)
    {
        let gallery = new Swiper(self.slider[i], self.options);
    }
}

initCarousel('.slider-curator',
    {
        loop: true,
        speed: 600,
        pagination: {
            el: '.pagination-bullets-box',
            type: 'bullets',
            clickable: true
        },
        navigation: {
          prevEl: '[data-button="slider-curator-prev"]',
          nextEl: '[data-button="slider-curator-next"]',
        },
        spaceBetween: 30,
        slidesPerView: 4
    }
);

function GroupBox(btn, box) {
    let self = this;
    self.btn = document.querySelector(btn);
    self.btn.setAttribute('data-group-btn','btn');
    self.box = document.querySelector(box);
    self.box.setAttribute('data-group-box','box');
    self.substrate = document.querySelector('.substrate');
    self.transition = 300;
    self.btn.box = self.box;

    self.listBtn = null;
    self.listBox = null;

    self.change = function(btn) {
        self.listBtn = document.querySelectorAll('[data-group-btn]');
        self.listBox = document.querySelectorAll('[data-group-box]');

        let indBtn = false;
        let indCurrentOpen = btn.classList.contains('open');

        for (let i = 0; i < self.listBtn.length; i++) {
            if (self.listBtn[i].classList.contains('open')) {
                indBtn = true;
                self.closeBtn(self.listBtn[i]);
                self.closeBox(self.listBtn[i].box);
            }
        }

        if (!indBtn) {
            self.openSubstrate();
            self.openBtn(btn, 0);
            self.openBox(btn.box);
        } else if (indBtn && indCurrentOpen) {
            self.closeSubstrate();
            self.closeBtn(btn);
            self.closeBox(btn.box);
        } else if (indBtn && !indCurrentOpen) {
            self.openBtn(btn);
            self.openBox(btn.box, self.transition);
        }
    }

    self.openSubstrate = function() {
        self.substrate.style.display = 'block';

        setTimeout(function () {
            self.substrate.classList.add('open');
        },0);
    }

    self.closeSubstrate = function() {
        self.substrate.classList.remove('open');

        setTimeout(function () {
            self.substrate.style.display = 'none';
        },self.transition);
    }

    self.openBtn = function (btn) {
        btn.classList.add('open');
    }

    self.closeBtn = function (btn) {
        btn.classList.remove('open');
    }

    self.openBox = function (box, transition) {
        box.style.display = 'block';

        let timeId = setTimeout(function () {
            box.classList.add('open');

            clearTimeout(timeId);
        },transition);
    }

    self.closeBox = function (box) {
        box.classList.remove('open');

        setTimeout(function () {
            box.style.display = 'none';
        },self.transition);
    }

    self.init = function () {
        self.btn.addEventListener('click', function() {
            self.change(this);
        });

        self.substrate.addEventListener('click', function() {
            self.closeBtn(self.btn);
            self.closeBox(self.btn.box);
            self.closeSubstrate();
        });
    }

    self.init();
}

new GroupBox('[data-button="header-user"]', '[data-popup="log in"]');
new GroupBox('[data-button="forgot password"]', '[data-popup="forgot password"]');
new GroupBox('[data-button="registration"]', '[data-popup="registration"]');
new GroupBox('[data-button="header-search"]', '[data-popup="search"]');