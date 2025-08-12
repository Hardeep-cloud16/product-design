// Locomotive Scroll initialization
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Cursor scale variables
let x_Scale = 1;
let y_Scale = 1;
let x_Previous = 0;
let y_Previous = 0;

// First page animations
function firstPageAnim() {
    var time_line = gsap.timeline();

    time_line.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: "expo.inOut"
    })
    .to(".bounding_elem", {
        y: 0,
        ease: "expo.inOut",
        duration: 2,
        delay: -1,
        stagger: 0.2
    })
    .from("#hero_footer", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: "expo.inOut"
    });
}

// Circle squish effect (on mouse movement)
function circleChaptaKaro() {
    window.addEventListener("mousemove", function (dets) {
        // Clamp scale values for smoothness
        x_Scale = gsap.utils.clamp(0.8, 1.2, 1 + (dets.clientX - x_Previous) * 0.01);
        y_Scale = gsap.utils.clamp(0.8, 1.2, 1 + (dets.clientY - y_Previous) * 0.01);

        x_Previous = dets.clientX;
        y_Previous = dets.clientY;

        circleMouseFollower(dets);
    });
}

// Cursor follow function
function circleMouseFollower(dets) {
    document.querySelector("#mini_circle").style.transform =
        `translate(${dets.clientX}px, ${dets.clientY}px) scale(${x_Scale}, ${y_Scale})`;
}

// Attach mousemove for circle
window.addEventListener("mousemove", function (dets) {
    circleMouseFollower(dets);
});

// Image hover animations for each .elem
document.querySelectorAll(".elem").forEach(function (elem) {
    let rotate = 0;
    let diffrot = 0;

    // On mouse move - show & position image
    elem.addEventListener("mousemove", function (dets) {
        var difference = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            top: difference,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
            ease: "power3.out"
        });
    });

    // On mouse leave - hide image
    elem.addEventListener("mouseleave", function () {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: "power3.inOut",
            duration: 0.5
        });
    });
});
const miniCircle = document.getElementById('mini_circle');


document.querySelectorAll('.elem').forEach(elem => {
  elem.addEventListener('mouseenter', () => {
    // Mini circle thoda bada kar
    miniCircle.style.width = '40px';
    miniCircle.style.height = '40px';

  });

  elem.addEventListener('mouseleave', () => {
    // Size wapas chhota kar
    miniCircle.style.width = '10px';
    miniCircle.style.height = '10px';
    
  });
});

// Mini circle ko mouse ke sath move karwana:
window.addEventListener('mousemove', (e) => {
  miniCircle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Call animations
firstPageAnim();
circleChaptaKaro();
