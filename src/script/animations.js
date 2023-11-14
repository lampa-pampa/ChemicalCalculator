function run_animation(node, animation_name)
{
    node.style.animationName = ""
    node.offsetWidth
    node.style.animationName = animation_name
}

function boom()
{
    run_animation(get_id("input"), "boom-input")
    run_animation(get_id("output"), "fade-in-output") 
    const music = new Audio("src/sounds/boom.mp3")
    music.play()
}

function smooth_value_refresh(node, value)
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