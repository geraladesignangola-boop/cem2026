class InteractiveMap {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // We replace the original SVG with our canvas
    const svg = this.container.querySelector('svg.hero-map');
    if (svg) {
      this.extractPolygons(svg);
      svg.style.display = 'none';
      this.container.insertBefore(this.canvas, this.container.firstChild);
    }
    
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, radius: 80 };
    
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '0';
    this.canvas.style.pointerEvents = 'none'; // so it doesn't block UI
    
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => this.init(), 200);
    });
    
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  extractPolygons(svg) {
    // We use the high-res Path2D from world-path.js instead of the SVG polygons
    this.mapBaseWidth = 800;
    this.mapBaseHeight = 400;
  }

  init() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    this.particles = [];
    
    // Determine scale to fit the map nicely in the container
    const scale = Math.min(this.width / this.mapBaseWidth, this.height / this.mapBaseHeight) * 0.9;
    const offsetX = (this.width - (this.mapBaseWidth * scale)) / 2;
    const offsetY = (this.height - (this.mapBaseHeight * scale)) / 2;
    
    // Create an offscreen canvas to draw the map and sample pixels
    const offscreen = document.createElement('canvas');
    offscreen.width = this.width;
    offscreen.height = this.height;
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
    
    offCtx.fillStyle = '#000';
    offCtx.fillRect(0, 0, this.width, this.height);
    
    if (typeof WORLD_PATH !== 'undefined') {
      offCtx.save();
      offCtx.translate(offsetX, offsetY);
      offCtx.scale(scale, scale);
      const p2d = new Path2D(WORLD_PATH);
      offCtx.fillStyle = '#fff';
      offCtx.fill(p2d);
      offCtx.restore();
    }
    
    // Sample pixels to create dots
    const gap = 12; // distance between dots
    const imgData = offCtx.getImageData(0, 0, this.width, this.height).data;
    
    for (let y = 0; y < this.height; y += gap) {
      for (let x = 0; x < this.width; x += gap) {
        const index = (y * this.width + x) * 4;
        const r = imgData[index]; // White pixel means inside polygon
        
        if (r > 128) {
          // Add some randomness to initial position for a cool spawn effect
          this.particles.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            size: 2.5,
            color: '#FF4500' // var(--gold)
          });
        }
      }
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    const friction = 0.88;
    const springFactor = 0.08;
    
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      
      let dx = this.mouse.x - p.x;
      let dy = this.mouse.y - p.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      
      // Mouse repulsion
      if (dist < this.mouse.radius) {
        let force = (this.mouse.radius - dist) / this.mouse.radius;
        let angle = Math.atan2(dy, dx);
        
        // Pushes the particle away from the mouse
        let targetX = p.x - Math.cos(angle) * force * 15;
        let targetY = p.y - Math.sin(angle) * force * 15;
        
        p.vx += (targetX - p.x) * 0.15;
        p.vy += (targetY - p.y) * 0.15;
      }
      
      // Spring back to base position
      p.vx += (p.baseX - p.x) * springFactor;
      p.vy += (p.baseY - p.y) * springFactor;
      
      // Friction
      p.vx *= friction;
      p.vy *= friction;
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 69, 0, ${0.15 + (Math.abs(p.vx) + Math.abs(p.vy)) * 0.05})`; // Glows a bit when moving
      this.ctx.fill();
    }
    
    // Optional: draw subtle connecting lines between very close active particles
    /*
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = 'rgba(255, 69, 0, 0.05)';
    for (let i = 0; i < this.particles.length; i++) {
      let p1 = this.particles[i];
      if (Math.abs(p1.vx) < 0.1 && Math.abs(p1.vy) < 0.1) continue;
      
      for (let j = i + 1; j < this.particles.length; j++) {
        let p2 = this.particles[j];
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = dx*dx + dy*dy;
        if (dist < 400) { // 20px squared
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
    */
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new InteractiveMap('.hero');
});
