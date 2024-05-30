// import React, { useEffect } from 'react';
// import './App.css';

// const NightSky = () => {
//   useEffect(() => {
//     const starContainer = document.querySelector('.stars');

//     for (let i = 0; i < 100; i++) {
//       const star = document.createElement('div');
//       star.className = 'star';
//       star.style.top = `${Math.random() * 100}vh`;
//       star.style.left = `${Math.random() * 100}vw`;
//       star.style.animationDelay = `${Math.random() * 1.5}s`;
//       starContainer.appendChild(star);
//     }
//   }, []);

//   return (
//     <div className="night-sky">
//       <div className="stars"></div>
//       <div className="twinkling"></div>
//     </div>
//   );
// };

// function App() {
//   return (
//     <div className="App">
//       <NightSky />
//     </div>
//   );
// }

// export default App;













import React, { useEffect } from 'react';
import { TweenLite, Circ } from 'gsap';
import './App.css';

const App = () => {

  let posx = 0; // Define posx
  let posy = 0; // Define posy
  let animateHeader = true; // Define animateHeader



  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const target = { x: width / 2, y: height / 2 };
    const largeHeader = document.getElementById("large-header");
    largeHeader.style.height = height + "px";
    const canvas = document.getElementById("demo-canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const points = [];
    for (let x = 0; x < width; x += width / 20) {
      for (let y = 0; y < height; y += height / 20) {
        const px = x + (Math.random() * width) / 20;
        const py = y + (Math.random() * height) / 20;
        const p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    for (let i = 0; i < points.length; i++) {
      const closest = [];
      const p1 = points[i];
      for (let j = 0; j < points.length; j++) {
        const p2 = points[j];
        if (!(p1 === p2)) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    for (let i in points) {
      const c = new Circle(
        points[i],
        2 + Math.random() * 2,
        "rgba(255,255,255,0.3)"
      );
      points[i].circle = c;
    }

    function mouseMove(e) {
      let posx = (posy = 0);
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      target.x = posx;
      target.y = posy;
    }

    function scrollCheck() {
      animateHeader = document.body.scrollTop > height ? false : true;
    }

    function resize() {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      largeHeader.style.height = newHeight + "px";
      canvas.width = newWidth;
      canvas.height = newHeight;
    }

    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (let i in points) {
          if (Math.abs(getDistance(target, points[i])) < 4000) {
            points[i].active = 0.3;
            points[i].circle.active = 0.6;
          } else if (Math.abs(getDistance(target, points[i])) < 20000) {
            points[i].active = 0.1;
            points[i].circle.active = 0.3;
          } else if (Math.abs(getDistance(target, points[i])) < 40000) {
            points[i].active = 0.02;
            points[i].circle.active = 0.1;
          } else {
            points[i].active = 0;
            points[i].circle.active = 0;
          }
          drawLines(points[i]);
          points[i].circle.draw();
        }
      }
      requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
      TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: function () {
          shiftPoint(p);
        }
      });
    }

    function drawLines(p) {
      if (!p.active) return;
      for (let i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = "rgba(156, 217, 249," + p.active + ")"; // Adjust the color here
        ctx.stroke();
      }
    }

    function Circle(pos, rad, color) {
      const _this = this;
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;

      _this.draw = function () {
        if (!_this.active) return;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(156,217,249," + _this.active + ")";
        ctx.fill();
      };
    }

    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("scroll", scrollCheck);
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("scroll", scrollCheck);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div id="large-header" className="large-header">
      <canvas id="demo-canvas"></canvas>
      <h1 className="main-title">Hii<span className="thin">Piperr</span></h1>
    </div>
  );
};

export default App;














