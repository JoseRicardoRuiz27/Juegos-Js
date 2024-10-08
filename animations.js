export const animacionesCreadas = (game) =>{
    game.anims.create({
        key: `mario-corriendo`,
        frames: game.anims.generateFrameNumbers(
            `mario`,{start: 3, end: 2},
        ),
        frameRate:12,
        repeat:-1
    })
    game.anims.create({
        key: `mario-quieto`,
        frames: [{key: `mario`, frame: 0}]
    })
    game.anims.create({
        key: `mario-grande-idle`,
        frames: [{key: `mario-grande`, frame: 0}]
    })
    game.anims.create({
        key: `mario-salto`,
        frames: [{key: `mario`, frame: 5}]
    })
    game.anims.create({
        key: `mario-muerto`,
        frames: [{key: `mario`, frame: 4}]
    })
    game.anims.create({
        key: `goomba-caminando`,
        frames: game.anims.generateFrameNumbers(
            'goomba',
            {start: 0, end: 1}
        ),
        frameRate: 12,
        repeat: -1
    })
    game.anims.create({
        key: `goomba-muerto`,
        frames: [{key:`goomba`, frame: 2}]
    })
    game.anims.create({
        key: `coin-aparece`,
        frames: game.anims.generateFrameNumbers(
            `coin`,
            {start: 0, end: 3}
        ),
        frameRate: 10,
        repeat: -1
    })
    } 