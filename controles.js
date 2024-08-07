export function movimientosMario ({keys, mario}){
    const isMarioTouchingFloor = mario.body.touching.down
    const isLeftKeyDown = keys.left.isDown
    const isRightKeyDown = keys.right.isDown
    const isUpKeyDown = keys.up.isDown
    
    if (isLeftKeyDown) {
        mario.x -=2
        isMarioTouchingFloor && mario.anims.play(`mario-corriendo`, true)
        mario.flipX = true
    } else if (isRightKeyDown) {
        mario.x +=2
        isMarioTouchingFloor && mario.anims.play(`mario-corriendo`, true)
        mario.flipX = false
    } else if(isMarioTouchingFloor) {
        mario.anims.play(`mario-quieto`, true)
    }

    if (isUpKeyDown  && isMarioTouchingFloor) {
        mario.setVelocityY(-300)
        mario.anims.play(`mario-salto`, true)
    }
}