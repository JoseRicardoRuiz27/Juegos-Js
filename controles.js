const MARIO_ANIMS = {
    grown:{
        idle: 'mario-grande-idle',
        walk: 'mario-grande-walk',
        jump: 'mario-grande-jump'
    },
    normal:{
        idle: 'mario-quieto',
        walk: 'mario-corriendo',
        jump: 'mario-salto'
    }
}

export function movimientosMario ({keys, mario}){
    const isMarioTouchingFloor = mario.body.touching.down
    const isLeftKeyDown = keys.left.isDown
    const isRightKeyDown = keys.right.isDown
    const isUpKeyDown = keys.up.isDown
    
    if(mario.isDead) return
    if(mario.isBlocked) return
    
    const marioAnims = mario.isGrown ? MARIO_ANIMS.grown : MARIO_ANIMS.normal

    if (isLeftKeyDown) {
        mario.x -=2
        isMarioTouchingFloor && mario.anims.play(`mario-corriendo`, true)
        mario.flipX = true
    } else if (isRightKeyDown) {
        mario.x +=2
        isMarioTouchingFloor && mario.anims.play(`mario-corriendo`, true)
        mario.flipX = false
    } else if(isMarioTouchingFloor) {
        mario.anims.play(marioAnims.idle, true)
    }

    if (isUpKeyDown  && isMarioTouchingFloor) {
        mario.setVelocityY(-300)
        mario.anims.play(`mario-salto`, true)
    }
}