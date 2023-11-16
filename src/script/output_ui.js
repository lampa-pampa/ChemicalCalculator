class OutputUI
{
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

    write(child_node)
    {
        get_id("output").innerHTML = ""
        this.append(child_node)
    }

    append(child_node)
    {
        get_id("output").appendChild(child_node)
    }
}