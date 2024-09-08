import { animacionesCreadas } from "./animations.js"
import { initAudio, playAudio } from "./audios.js"
import { movimientosMario } from "./controles.js"
import { spritesheet } from "./spritesheet.js"

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
    this.load.image(
        'supermushroom',
        `assets/collectibles/super-mushroom.png`
    )
    
    spritesheet(this)

    initAudio(this)
}

function create (){
    animacionesCreadas(this)

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

    this.enemy = this.physics.add.sprite(120, config.height -30, `goomba`)
    .setOrigin(0, 1)
    .setGravityY(300)
    .setVelocityX(-50)
    this.enemy.anims.play('goomba-caminando', true)
   
    this.collectibes = this.physics.add.staticGroup()
    this.collectibes.create(120, 130, `coin`).anims.play(`coin-aparece`, true)
    this.collectibes.create(220, 130, `coin`).anims.play(`coin-aparece`, true)
    this.collectibes.create(200, config.height -40, `supermushroom`).anims.play(`supermushroom-idle`, true)
    this.physics.add.overlap(this.mario, this.collectibes, collectItem, null, this)

    //le asignamos una configuracion al mundo de donde empieza y donde termina en el width y height
    this.physics.world.setBounds(0, 0, 2000, config.height)
    this.physics.add.collider(this.mario, this.floor) //aqui mezclamos las fisicas de mario y el suelo
    this.physics.add.collider(this.enemy, this.floor)
    this.physics.add.collider(this.mario, this.enemy,
        onHitEnemy, null, this)

    //le decimos que la camara siga a mario
    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    //creamos el this para luego cargar los botones en el juego
    this.keys = this.input.keyboard.createCursorKeys()

}

function collectItem(mario,  item){ 
    const {texture : {key}} = item
        item.destroy()
    if(key === `coin`) {
        playAudio(`coin-pickup`, this, {volume: .1})   
        addToScore(100, item, this)
    } else if(key === `supermushroom`) {
        this.physics.world.pause()
        this.anims.pauseAll()

        mario.isGrown = true
        mario.anims.play(`mario-grande-idle`, true)
    }
}

function addToScore(scoreToAdd, origin, game){
 //Mostramos un mensaje de coins con la fuente cargada en el html
 const coinText = game.add.text(
    origin.getBounds().x,
    origin.getBounds().y,
    scoreToAdd,
    {
        fontFamily: `pixel`,
        fontSize: config.width / 75,
    }
)
game.tweens.add({
    targets: coinText,
    duration: 500,
    y: coinText.y -10,
    onComplete: () => {
        coinText.destroy()
    }
})   
}

function onHitEnemy(mario, enemy){
    if(mario.body.touching.down && enemy.body.touching.up){
        enemy.anims.play(`goomba-muerto`, true)
        enemy.setVelocityX(0)
        mario.setVelocityY(-150)
        playAudio(`goomba-stomp`, this)
        addToScore(100, enemy, this)

        setTimeout(() => {
        enemy.destroy()
        }, 500)
    }else{
        killMario(this)
    }
}

function update(){ 
    //como se comportara mario segun las teclas precionadas
    movimientosMario(this) 
    const {mario} = this

    if (mario.y >= config.height) {
     killMario(this)   
    }
}

function killMario(game) {
    const {mario, scene} = game

    mario.anims.play(`mario-muerto`, true)
    mario.setCollideWorldBounds(false)

    playAudio(`gameover`, game, {volume: .2})
    mario.body.checkCollision.none = true
    mario.setVelocityX(0)

    setTimeout(() =>{
        mario.setVelocityY(-300)
        // animacion de muerte
    }, 100)
    setTimeout(() => {
        scene.restart()
        // reseteamos el juego
    }, 2000);
}