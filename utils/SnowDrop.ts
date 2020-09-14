class Snow {
  public xOff!: number
  public distanceBetweenWaves!: number
  public count!: number
  public position!: { x: number, y: number }
  public radius!: number
  public yOff!: number

  private rotation!: number
  private offset!: number

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private snowSprite: HTMLImageElement,
  ) {
    this.resetPosition()
  }

  resetPosition() {
    this.position = { x: 0, y: 0 };
    this.radius = 16 + Math.random() * 6;
    this.xOff = Math.random() * this.canvas.width - this.radius;
    this.yOff = Math.random() * this.canvas.height;
    this.distanceBetweenWaves = 50 + Math.random() * 40;
    this.count = this.canvas.height + this.yOff;
    this.offset = Math.floor(Math.random() * 11)
    this.rotation = Math.floor(Math.random())
  }

  render() {
    this.rotation = (this.rotation + 1) % 360;

    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(this.rotation * Math.PI / 180);

    this.ctx.beginPath();
    this.ctx.drawImage(this.snowSprite, this.offset * 32, 0, 32, 32, 0, 0, this.radius, this.radius);
    this.ctx.stroke();

    this.ctx.restore();
  }
}


export default function createSnowDrop() {
  if (document.getElementById('snow-drop')) return

  const snowSprite = new Image()
  snowSprite.onload = function () {
    const canvas = document.createElement('canvas')
    canvas.id = "snow-drop"
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    document.body.appendChild(canvas)

    const snows: Snow[] = [];
    const snowCount = 40;
    const snowSpeed = 1;

    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      for (let i = 0; i < snows.length; i++) {
        snows[i].position.x = Math.sin(snows[i].count / snows[i].distanceBetweenWaves) * 50 + snows[i].xOff;
        snows[i].position.y = snows[i].count;
        snows[i].render();

        if (snows[i].count > canvas.height + snows[i].radius) {
          snows[i].count = 0 - snows[i].yOff;
        } else {
          snows[i].count += snowSpeed;
        }
      }

      window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);

    for (let i = 0; i < snowCount; i++) {
      snows.push(new Snow(canvas, ctx, snowSprite))
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }
  snowSprite.src = '/assets/images/snow.png'
}