/* Phaser es una global */
const config = {
    type: Phaser.AUTO,
    width: 557,
    height: 244,
    backgroundColor: `#049cd8`,
    parent: `game`,
    physics:{
        default: `arcade`,
        arcade:{
            gravity:{y: 300},
            debug: false
        }
    },
    scene: {
        preload, //Funcion que se ejecuta para precargar recursos del juego
        create, // ''   que se  '' cuando comienza el juego
        update // '' '' '' '' en cada frame
    }
}

new Phaser.Game(config)

function preload(){
    //this -> game => el juego
    this.load.image(
        `cloud1`, // <-- ID
        `assets/scenery/overworld/cloud1.png`
    )
    this.load.image(
        `floorbricks`,
        `assets/scenery/overworld/floorbricks.png`
    )
    this.load.spritesheet(
        `mario`,
        `assets/entities/mario.png`,
        {frameWidth: 18, frameHeight: 16}
    )
}

function create(){
    this.keys = this.input.keyboard.createCursorKeys()

    this.add.image(0, 0, 'cloud1')
    .setOrigin(0,0).setScale(0.15)

    this.floor = this.physics.add.staticGroup()
    this.floor
    .create(0, config.height -16, `floorbricks`)
    .setOrigin(0, 0.5)
    .refreshBody()
    
    this.floor
    .create(170, config.height -16, `floorbricks`)
    .setOrigin(0, 0.5)
    .refreshBody()
    
    this.mario = this.physics.add.sprite(50, 100, `mario`)
    .setCollideWorldBounds(true)
    .setGravityY(400)

    this.physics.add.collider(this.mario, this.floor)

    this.physics.world.setBounds(0, 0, 2000, config.height)
    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    this.anims.create({
        key: `mario-corriendo`,
        frames: this.anims.generateFrameNumbers(
            `mario`,{start: 3, end: 2},
        ),
        frameRate:12,
        repeat:-1
    })
    this.anims.create({
        key: `mario-quieto`,
        frames: [{key: `mario`, frame: 0}]
    })
    this.anims.create({
        key: `mario-salto`,
        frames: [{key: `mario`, frame: 5}]
    })
}

function update(){
    if (this.keys.left.isDown) {
        this.mario.x -=2
        this.mario.anims.play(`mario-corriendo`, true)
        this.mario.flipX = true
    } else if (this.keys.right.isDown) {
        this.mario.x +=2
        this.mario.anims.play(`mario-corriendo`, true)
        this.mario.flipX = false
    } else{
        this.mario.anims.play(`mario-quieto`, true)
    }

    if (this.keys.up.isDown && this.mario.body.touching.down) {
        this.mario.setVelocityY(-300)
        this.mario.anims.play(`mario-salto`, true)
    }
}