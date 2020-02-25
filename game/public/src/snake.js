class Snake {
    constructor(x, y, scale) {
        this.x = x
        this.y = y
        this.xSpeed = 1
        this.ySpeed = 0
        this.scale = scale
        this.tail = []
        this.tailChanged = false
        this.color = {r: 255, g: 255, b: 255}
    }

    update(p5) {
        const previousHeadX = this.x
        const previousHeadY = this.y
        const previousColor = this.color

        this.x += this.xSpeed * this.scale
        this.y += this.ySpeed * this.scale

        // this.x = p5.constrain(this.x, 0, p5.width - this.scale)
        // this.y = p5.constrain(this.y, 0, p5.height - this.scale)

        const widthBoundarie = p5.width - this.scale
        const heightBoundarie = p5.height - this.scale
        if(this.x > widthBoundarie) {
            this.x = 0
        }

        if(this.x < 0) {
            this.x = widthBoundarie
        }

        if(this.y > heightBoundarie) {
            this.y = 0
        }
        
        if(this.y < 0) {
            this.y = heightBoundarie
        }
        
        if(this.tail.length > 0) {
            const tailLastItem = this.tail.pop()
            const color = this.tailChanged ? tailLastItem.color : previousColor
            
            this.tail.unshift({x: previousHeadX, y: previousHeadY, color: color})
        }
    }

    draw(p5) {
        this.drawHead(p5)
        this.drawTail(p5)
    }

    drawHead(p5) {
        p5.fill(255)
        p5.rect(this.x, this.y, this.scale, this.scale)
    }

    drawTail(p5) {
        this.tail.forEach(item => {
            p5.fill(item.color.r, item.color.g, item.color.b)
            p5.rect(item.x, item.y, this.scale, this.scale)
        })
    }

    moveUp() {
        if(this.isMovingDown()) {
            return
        }
        this.xSpeed = 0
        this.ySpeed = -1
    }

    moveDown() {
        if(this.isMovingUp()) {
            return
        }
        this.xSpeed = 0
        this.ySpeed = 1
    }
    
    moveLeft() {
        if(this.isMovingRight()) {
            return
        }
        this.xSpeed = -1
        this.ySpeed = 0
    }

    moveRight() {
        if(this.isMovingLeft()) {
            return
        }
        this.xSpeed = 1
        this.ySpeed = 0
    }

    isMovingUp() {
        return this.xSpeed === 0 && this.ySpeed === -1
    }

    isMovingDown() {
        return this.xSpeed === 0 && this.ySpeed === 1
    }

    isMovingLeft() {
        return this.xSpeed === -1 && this.ySpeed === 0
    }

    isMovingRight() {
        return this.xSpeed === 1 && this.ySpeed === 0
    }

    eat(food) {
        if(this.x === food.x && this.y === food.y) {
            this.tail.push({x: food.x, y: food.y, color: {r: 145, g: 33, b: 136}})
            this.tailChanged = true
            return true
        }
        
        this.tailChanged = false
        return false
    }
}

export default Snake