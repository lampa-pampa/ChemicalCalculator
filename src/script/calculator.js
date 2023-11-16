class Calculator
{
    static show_element_info(compound)
    {
        if(!(compound.quantity == 1 && compound.elements.length == 1 && compound.elements[0].quantity == 1))
            return false
        
        const elem_short_name = compound.elements[0].short_name
        const elem_data = elements_data[elem_short_name]

        output_ui.clear()
        output_ui.append_line("Nazwa:", 0, elem_data.full_name)
        try_to_play_sound("show_value")

        return true
    }

    static calculate_percentage_composition(compound)
    {
        const counter = Object()
        let total_weight = 0
        for(const elem of compound.elements)
        {
            const weight = elem.quantity * elements_data[elem.short_name].atomic_weight * compound.quantity
            total_weight += weight

            if(Object.keys(counter).includes(elem.short_name))
                counter[elem.short_name] += weight
            else
                counter[elem.short_name] = weight
        }

        output_ui.clear()
        const keys = Object.keys(counter)
        if(keys.length == 1)
        {
            const elem_name = keys[0]
            output_ui.append_line("=", counter[elem_name], "mol")
        }
        else
        {
            output_ui.append_line("Całkowita masa:", total_weight, "mol")
            for(const elem_name in counter)
            {
                const percents = (counter[elem_name] / total_weight * 100)
                output_ui.append_line(`${elem_name}:`, counter[elem_name], "mol", percents, "%", true)
            }
        }
        try_to_play_sound("load_value")

        return true
    }

    static calculate_empirical_formula(compound)
    {
        console.log("empirical_formula")

        return true
    }

    static calculate_group_formula(compound)
    {
        console.log("group_formula")

        return true
    }

    static calculate_structural_formula(compound)
    {
        console.log("structural_formula")
        
        return true
    }
}