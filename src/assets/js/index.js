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

initCarousel(
    '.slider-curator',
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

function GroupBox(btn, box, substrate) {
    let self = this;
    self.btn = document.querySelector(btn);
    self.btn.setAttribute('data-group-btn','btn');
    self.box = document.querySelector(box);
    self.box.setAttribute('data-group-box','box');
    self.substrate = document.querySelector(substrate);
    self.substrate.setAttribute('data-group-box','substrate');
    self.transition = 600;

    self.box.style.transition = self.transition + 'ms';
    self.substrate.style.transition = self.transition + 'ms';

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
            self.openBtn(btn);
            self.openBox(btn.box, 0);
        } else if (indBtn && indCurrentOpen) {
            self.closeSubstrate();
            self.closeBtn(btn);
            self.closeBox(btn.box, self.transition);
        } else if (indBtn && !indCurrentOpen) {
            self.openBtn(btn);
            self.openBox(btn.box, self.transition);
        }
    }

    self.openSubstrate = function() {
        self.substrate.style.display = 'block';

        let timeId_1 = setTimeout(function () {
            self.substrate.classList.add('open');

            clearTimeout(timeId_1);
        },0);
    }

    self.closeSubstrate = function() {
        self.substrate.classList.remove('open');

        let timeId_2 = setTimeout(function () {
            self.substrate.style.display = 'none';

            clearTimeout(timeId_2);
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

        let timeId_3 = setTimeout(function () {
            box.classList.add('open');

            clearTimeout(timeId_3);
        },transition);
    }

    self.closeBox = function (box, transition) {
        box.classList.remove('open');

        let timeId_4 = setTimeout(function () {
            box.style.display = 'none';

            clearTimeout(timeId_4);
        },transition);
    }

    self.init = function () {
        self.btn.addEventListener('click', function() {
            self.change(this);
        });

        self.substrate.addEventListener('click', function() {
            self.closeBtn(self.btn);
            self.closeBox(self.btn.box, self.transition);
            self.closeSubstrate();
        });
    }

    self.init();
}

if (document.querySelector('[data-button="header-user"]') &&
    document.querySelector('[data-popup="log in"]') &&
    document.querySelector('.substrate'))
{
    new GroupBox('[data-button="header-user"]', '[data-popup="log in"]', '.substrate');
}

if (document.querySelector('[data-button="forgot password"]') &&
    document.querySelector('[data-popup="forgot password"]') &&
    document.querySelector('.substrate'))
{
    new GroupBox('[data-button="forgot password"]', '[data-popup="forgot password"]', '.substrate');
}

if (document.querySelector('[data-button="registration"]') &&
    document.querySelector('[data-popup="registration"]') &&
    document.querySelector('.substrate'))
{
    new GroupBox('[data-button="registration"]', '[data-popup="registration"]', '.substrate');
}

if (document.querySelector('[data-button="header-search"]') &&
    document.querySelector('[data-popup="search"]') &&
    document.querySelector('.substrate'))
{
    new GroupBox('[data-button="header-search"]', '[data-popup="search"]', '.substrate');
}

if (document.querySelector('[data-button="menu"]') &&
    document.querySelector('[data-popup="menu"]') &&
    document.querySelector('.substrate'))
{
    new GroupBox('[data-button="menu"]', '[data-popup="menu"]', '.substrate');
}