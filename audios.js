export const initAudio = ({load}) =>{
    load.audio(`gameover`,
        `assets/sound/music/gameover.mp3`)

    load.audio(`goomba-stomp`,
        `assets/sound/effects/goomba-stomp.wav`)
} 
export const playAudio = (id, {sound}, {volume = 1} = {}) => {
    try {
        return sound.add(id, {volume}).play()
    } catch (e) {
        console.log(e)
    }
}