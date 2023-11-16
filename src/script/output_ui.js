class OutputUI
{
    smooth_value_refresh(node, value)
    {
        node.textContent = 0
        const diff = value / data.refresh_value_frame_rate
        const interval = setInterval(() => {
            const cur_value = parseFloat(node.textContent)
            if(cur_value + diff <= value)
            {
                node.textContent = (cur_value + diff).toFixed(data.value_precision)
            }
            else
            {
                node.textContent = value.toFixed(data.value_precision)
                clearInterval(interval)   
            }
        }, data.refresh_value_frame_delay)
    }

    create_named_div(cls)
    {
        const div = document.createElement("div")
        div.classList.add(cls)
        return div
    }

    append_line(name, value, unit, second_value, second_unit, second = false)
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
        this.smooth_value_refresh(property_value, value)

        if(second)
        {
            this.smooth_value_refresh(second_property_value, second_value)
        }
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