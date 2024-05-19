class Calculator
{
    static capitalize(string)
    {
        return string[0].toUpperCase() + string.slice(1)
    }

    static show_element_info(compound)
    {
        if(!(compound.quantity == 1 && compound.elements.length == 1 && compound.elements[0].quantity == 1))
            return false
        
        const elem_short_name = compound.elements[0].short_name
        const elem_data = elements_data[elem_short_name]

        output_ui.clear()
        output_ui.show_line("Nazwa:", Calculator.capitalize(elem_data.full_name))
        output_ui.show_line("Liczba atomowa:", elem_data.atomic_number.toString())
        output_ui.load_line("Masa atomowa:", elem_data.atomic_weight, "u")
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
            output_ui.load_line("=", counter[elem_name], "u")
        }
        else
        {
            output_ui.load_line("Całkowita masa:", total_weight, "u")
            for(const elem_name in counter)
            {
                const percents = (counter[elem_name] / total_weight * 100)
                output_ui.load_line(`${elem_name}:`, counter[elem_name], "u", percents, "%", true)
            }
        }
        try_to_play_sound("load_value")

        return true
    }

    static nwd(a, b)
    {
        return b == 0 ? a : Calculator.nwd(b, a % b)
    }

    static calculate_empirical_formula(compound)
    {
        if(compound.elements.length > 1)
        {
            let nwd = Calculator.nwd(compound.elements[0].quantity, compound.elements[1].quantity)
            for(let i = 2; i < compound.elements.length; ++i)
                nwd = Calculator.nwd(nwd, compound.elements[i].quantity)

            if(nwd > 1)
            {
                for(const elem of compound.elements)
                    elem.quantity /= nwd
            }
        }
            
        let formula = ""

        for(const elem of compound.elements)
        {
            formula += elem.short_name
            if(elem.quantity > 1)
                formula += elem.quantity.toString()
        }

        output_ui.clear()
        output_ui.show_line("Wzór empiryczny:", formula, true)
        try_to_play_sound("load_value")
        
        return true
    }
}