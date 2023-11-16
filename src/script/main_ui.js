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
        music = true
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

    smooth_value_refresh(node, value)
    {
        node.textContent = 0
        let diff = 1
        if(value > data.refresh_value_frame_rate)
            diff = Math.floor(value / data.refresh_value_frame_rate)
        const interval = setInterval(() => {
            const cur_value = parseInt(node.textContent)
            if(cur_value < value)
            {
                if(value - cur_value >= diff)
                    node.textContent = cur_value + diff
                else
                    node.textContent = value
            }
            else
                clearInterval(interval)   
        }, data.refresh_value_frame_delay)
    }

    output_write(child_node)
    {
        get_id("output").innerHTML = ""
        this.output_append(child_node)
    }

    output_append(child_node)
    {
        get_id("output").appendChild(child_node)
    }
}