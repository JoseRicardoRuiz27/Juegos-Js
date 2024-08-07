import { animacionesCreadas } from "./animations.js"

/* Phaser es una global */
const config = {
    autoFocus: false,
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
    // para cargar una img
    this.load.image(
        `floorbricks`,
        `assets/scenery/overworld/floorbricks.png`
    )
    //para cargar sprites
    this.load.spritesheet(
        `mario`,
        `assets/entities/mario.png`,
        {frameWidth: 18, frameHeight: 16}
    )
    this.load.audio(
        `gameover`,
        `assets/sound/music/gameover.mp3`
    )
}

function create (){

    //cargamos la imagen de la nube que antes generamos
    this.add.image(100, 50, 'cloud1')
    .setOrigin(0,0).setScale(0.15)

    //cargamos y le damos fisicas a la imagen del suelo
    this.floor = this.physics.add.staticGroup()
    this.floor
    .create(0, config.height -16, `floorbricks`)
    .setOrigin(0, 0.5)
    .refreshBody()
    
    this.floor
    .create(170, config.height -16, `floorbricks`)
    .setOrigin(0, 0.5)
    .refreshBody() //utilizamos esta funcion para evitar error a la hora de cargar el suelo
    
    //cargamos la img de mario y le damos fisicas
    this.mario = this.physics.add.sprite(50, 100, `mario`)
    .setOrigin(0, 1)
    .setCollideWorldBounds(true) //evitamos el personaje salga de la pantalla
    .setGravityY(300)

    //le asignamos una configuracion al mundo de donde empieza y donde termina en el width y height
    this.physics.world.setBounds(0, 0, 2000, config.height)
    this.physics.add.collider(this.mario, this.floor) //aqui mezclamos las fisicas de mario y el suelo

    //le decimos que la camara siga a mario
    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    animacionesCreadas(this)
    
    //creamos el this para luego cargar los botones en el juego
    this.keys = this.input.keyboard.createCursorKeys()

}

function update(){ 
    //como se comportara mario segun las teclas precionadas
    const {keys, mario} = this
    const isMarioTouchingFloor = mario.body.touching.down
    const isLeftKeyDown = keys.left.isDown
    const isRightKeyDown = keys.right.isDown
    const isUpKeyDown = keys.up.isDown

    if(mario.isDead) return
    
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

    if (this.mario.y >= config.height) {
        this.mario.isDead = true
        this.mario.anims.play(`mario-muerto`)
        this.mario.setCollideWorldBounds(false)
        this.sound.add(`gameover`, {volume: .2}).play()
        setTimeout(() =>{
            this.mario.setVelocityY(-320)
            // animacion de muerte
        }, 100)
        setTimeout(() => {
            this.scene.restart()
            // reseteamos el juego
        }, 2000);
    }
}