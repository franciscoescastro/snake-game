import Snake from './snake.js'
import Food from './food.js'

let snake;
let currentFood;
const actorScale = 20

new p5(function(p5) {
    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.frameRate(8)

        snake = new Snake(0, 0, actorScale)
        currentFood = createRamdomFruit(p5.width, p5.height, actorScale)
    }

    p5.draw = ()=> {
        p5.background(51);

        snake.update(p5)
        snake.draw(p5)
        
        if(snake.eat(currentFood)) {
            currentFood = createRamdomFruit(p5.width, p5.height, actorScale)
        }

        currentFood.draw(p5)
    }

    p5.keyPressed = () => {
        if (p5.keyCode === p5.LEFT_ARROW) {
            snake.moveLeft()
        } else if (p5.keyCode === p5.RIGHT_ARROW) {
            snake.moveRight()
        } else if (p5.keyCode === p5.UP_ARROW) {
            snake.moveUp()
        } else if (p5.keyCode === p5.DOWN_ARROW) {
            snake.moveDown()
        }
    }
})

const createRamdomFruit = (width, height, scale) => {
    const ramdomPosition = getRamdomPosition(width, height, scale)
    return new Food(ramdomPosition.x, ramdomPosition.y, scale)
}

const getRamdomPosition = (width, height, scale) => {
    const x = Math.floor(Math.random() * width/scale) * scale
    const y = Math.floor(Math.random() * height/scale) * scale

    return {x, y}
}