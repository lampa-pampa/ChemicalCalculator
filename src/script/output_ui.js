class OutputUI
{
    smooth_show_number(node, value)
    {
        node.textContent = 0
        const diff = value / data.output.show_number_frame_delay
        const interval = setInterval(() => {
            const cur_value = parseFloat(node.textContent)
            if(cur_value + diff <= value)
            {
                node.textContent = (cur_value + diff).toFixed(data.output.value_precision)
            }
            else
            {
                node.textContent = value.toFixed(data.output.value_precision)
                clearInterval(interval)   
            }
        }, data.output.show_number_frame_rate)
    }

    smooth_show_string(node, value, format)
    {
        node.textContent = value
        node.style.width = getComputedStyle(node).width
        node.textContent = ""
        let i = 0
        const interval = setInterval(() => {
            if(i < value.length)
            {
                const char = value[i]
                if(format)
                {
                    if(!isNaN(parseInt(char)))
                        node.innerHTML += format_char(char, "sub", "digit")
                    else
                        node.innerHTML += format_char(char, "span", "chemical-element")
                }
                else
                {
                    node.textContent += char
                }
                ++i
            }
            else
            {
                clearInterval(interval)
            }
        }, data.output.show_string_frame_delay)
    }

    create_named_div(cls)
    {
        const div = document.createElement("div")
        div.classList.add(cls)
        return div
    }

    load_line(name, value, unit, second_value, second_unit, second = false)
    {
        const line = this.create_named_div("line")
        const values = this.create_named_div("values")
        
        const property_name = this.create_named_div("property-name")
        property_name.textContent = name
        
        const property_value = this.create_named_div("property-value")

        const property_unit = this.create_named_div("property-unit")
        property_unit.textContent = unit

        let second_property_value = this.create_named_div("second-property-value")
        let second_property_unit = this.create_named_div("second-property-unit")

        line.appendChild(property_name)
        values.appendChild(property_value)
        values.appendChild(property_unit)
        
        if(second)
        {
            second_property_unit.textContent = second_unit
            values.appendChild(second_property_value)
            values.appendChild(second_property_unit)
        }

        line.appendChild(values)
        this.append(line)
        this.smooth_show_number(property_value, value)

        if(second)
        {
            this.smooth_show_number(second_property_value, second_value)
        }
    }

    show_line(name, value, format = false) 
    {
        const line = this.create_named_div("line")
        const values = this.create_named_div("values")
        
        const property_name = this.create_named_div("property-name")
        property_name.textContent = name
        
        const property_value = this.create_named_div("property-value")
        
        line.appendChild(property_name)
        values.appendChild(property_value)
        line.appendChild(values)
        this.append(line)

        this.smooth_show_string(property_value, value, format)
    }

    alert(message)
    {
        const alert = document.createElement("span")
        alert.classList.add("alert")
        alert.textContent = message
        this.clear()
        this.append(alert)
        try_to_play_sound("alert")
    }

    clear()
    {
        get_id("output").innerHTML = ""
    }

    append(child_node)
    {
        get_id("output").appendChild(child_node)
    }

    write(child_node)
    {
        this.clear()
        this.append(child_node)
    }
}