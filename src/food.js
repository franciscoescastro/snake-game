class Food {
    constructor(x, y, scale) {
        this.x = x
        this.y = y
        this.scale = scale
        this.color = {r: 245, g: 155, b: 66}
    }

    draw(p5) {
        p5.fill(this.color.r, this.color.g, this.color.b)
        p5.rect(this.x, this.y, this.scale, this.scale)
    }
}

export default Food