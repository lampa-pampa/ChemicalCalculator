class MainUi
{
    constructor()
    {
        this.music = new Audio(data.sounds.music.dir)
        this.music.loop = true
    }

    run_animation(node, animation_name)
    {
        node.style.animationName = ""
        node.offsetWidth
        node.style.animationName = animation_name
    }

    play_music()
    {
        this.music.volume = data.sounds.music.start_volume
        this.music.play()
        const self = this
        let interval = setInterval(() => {
            if(self.music.volume < 1 - data.sounds.music.volume_offset)
            {
                self.music.volume += data.sounds.music.volume_offset
            }
            else
            {
                self.music.volume = 1
                clearInterval(interval)
            }
        }, data.sounds.music.volume_offset_dalay)
    }

    play_sound(sound_name)
    {
        const sound = new Audio(data.sounds.fx.dir + data.sounds.fx.names[sound_name])
        sound.play()
    }
}