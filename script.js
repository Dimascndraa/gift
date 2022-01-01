//Gsap
gsap.registerPlugin(TextPlugin);
gsap.to(".name", {
    duration: 1,
    delay: 11,
    text: {
        value: "Sri Aminah",
    },
});

gsap.from(".happy", { 
  delay: 7, 
  duration: 1, 
  y: "-2300%", 
  opacity: 0, 
  ease: "power4" 
});

gsap.to(".age", {
    duration: 1,
    delay: 9,
    text: {
        value: "19th",
    },
});

gsap.to(".author-message", {
    duration: 1,
    delay: 48,
    text: {
        value: "- still loving you -",
    },
});

gsap.to(".author", {
    duration: 1,
    delay: 50,
    text: {
        value: "^Dimas Candra^",
    },
});

var typed = new Typed('.hope', {
  strings: ['Be a good person', 'Wish you long life and good health always', 'always success and get better', 'hope you get what you want', 'all the best for you'],
  smartBackspace: true, 
  typeSpeed: 100,
  loop: true,
  showCursor: false,
  backSpeed: 70,
  startDelay: 13000,
});

var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
c = canvas.getContext('2d');

window.addEventListener('resize', function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    initCanvas();
});

var mouse = {
    x: undefined,
    y: undefined };

window.addEventListener('mousemove',
function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircles();
});

window.addEventListener("touchmove",
function (event) {
    let touch = event.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
    drawCircles();
});


function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.vx = vx;
    this.vy = vy;
    this.birth = birth;
    this.life = life;
    this.opacity = opacity;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = 'rgba(' + rgb + ',' + this.opacity + ')';
        c.fill();
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.vy = -this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.opacity = 1 - (frame - this.birth) * 1 / this.life;

        if (frame > this.birth + this.life) {
            for (let i = 0; i < circleArray.length; i++) {
                if (this.birth == circleArray[i].birth && this.life == circleArray[i].life) {
                    circleArray.splice(i, 1);
                    break;
                }
            }
        } else {
            this.draw();
        }
    };

}

var circleArray = [];

function initCanvas() {
    circleArray = [];
}

var colorArray = [
'254,250,233',
'168,134,121',
'139,106,96'];


function drawCircles() {
    for (let i = 0; i < 6; i++) {
        let radius = Math.floor(Math.random() * 4) + 2;
        let vx = Math.random() * 2 - 1;
        let vy = Math.random() * 2 - 1;
        let spawnFrame = frame;
        let rgb = colorArray[Math.floor(Math.random() * colorArray.length)];
        let life = 100;
        circleArray.push(new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, spawnFrame, life));

    }
}

var frame = 0;
function animate() {
    requestAnimationFrame(animate);
    frame += 1;
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

initCanvas();
animate();

// This is just for demo purposes :
for (let i = 1; i < 110; i++) {
    (function (index) {
        setTimeout(function () {
            mouse.x = 100 + i * 10;
            mouse.y = 100;
            drawCircles();
        }, i * 10);
    })(i);
}

// Snow
Scene.setAlias("ty", ["transform", "translateY"]);
Scene.setAlias("rotate", ["transform", "rotate"]);
Scene.setAlias("scale", ["transform", "scale"]);
function createSnows(num) {
  var snows = [];

  for (var i = 0; i < num; ++i) {
    snows.push(`<div class="snow particle particle${i}" style="left: ${10 + (i % 8) * 11}%"></div>`);
  }
  return snows.join("");
}

snows.innerHTML = createSnows(40);

var scene = new Scene({
  ".snow.particle": function () {
    return {
      0: {
        ty: "-4vh",
        rotate: "0deg",
      },
      10: {
        ty: "104vh",
        rotate: "1080deg",
      },
      options: {
        delay: Math.random() * 10,
        iterationCount: "infinite",
      }
    };
  },
}, {
  iterationCount: "infinite",
  selector: true,
}).playCSS();