let canvas, c, w, h, u

let points, offset, spacing, centerX, centerY, gradient

function init() {
  canvas = document.createElement('canvas')
  canvas.width = w = innerWidth
  canvas.height = h = innerHeight
  c = canvas.getContext('2d')
  c.translate(w / 2, h / 2)
  document.body.appendChild(canvas)
  spacing = 40
  points = Array(30).fill(0).map(_ => Array(60).fill(0))
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[0].length; j++) {
      const dist = Math.abs(j - points[0].length / 2)
      points[i][j] = {
        x: j * spacing,
        y: Math.random() * -(dist*dist) + 30, 
        z: -i * 10
      }
    }
  }
  offset = points[0].length * spacing / 2
  gradient = c.createLinearGradient(0, -150, 0, 100);
  gradient.addColorStop(0, 'gold')
  gradient.addColorStop(1, 'rgb(200, 0, 100)')
  update(0)
}

function update(time) {
  for (let i = 0; i < points.length; i++) {
    let gone = false
    for (let j = 0; j < points[0].length; j++) {
      points[i][j].z -= 0.5
      if (points[i][j].z < -300) {
        gone = true
      }
    }
    if (gone) {
     let arr = points.pop()
     for(let k = 0; k < arr.length; k++) {
      const dist = Math.abs(k - arr.length / 2)
      arr[k].z = 0
      arr[k].y = Math.random() * -(dist*dist) + 30
     }
     points.unshift( arr )
    }
  }
  show()
  u = requestAnimationFrame(update)
}

function show() {
  c.clearRect(-w / 2, -h / 2, w, h)
  c.beginPath()
  c.arc(0, 0, 200, 0, Math.PI * 2)
  c.closePath()
  c.shadowColor = "orange"
  c.shadowBlur = 100
  c.fillStyle = gradient
  c.fill()
  c.shadowBlur = 0
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = 0; j < points[0].length - 1; j++) {
      const size = 300 / (300 + points[i][j].z)
      const nextSize = 300 / (300 + points[i+1][j].z)
      c.beginPath()
      c.moveTo((points[i][j].x - offset) * size, points[i][j].y * size)
      c.lineTo((points[i][j+1].x - offset) * size, points[i][j+1].y * size)
      c.lineTo((points[i+1][j+1].x - offset) * nextSize, points[i+1][j+1].y * nextSize)
      c.lineTo((points[i+1][j].x - offset) * nextSize, points[i+1][j].y * nextSize)
      c.closePath()
      const color = 300 + points[i][j].z
      c.fillStyle = `rgba(0, 0, 0, ${-points[i][j].z / 100})`
      c.strokeStyle = `rgba(${250 - color}, 0, ${50 + color}, ${1 - color / 300})`
      c.fill()
      c.stroke()
    } 
  }
}

init()
