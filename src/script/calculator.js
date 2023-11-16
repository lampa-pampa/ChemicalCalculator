class Calculator
{
    static get_unit_name

    static calculate_percentage_composition(compound)
    {
        const counter = Object()
        let total_weight = 0
        for(const elem of compound.elements)
        {
            const weight = elem.quantity * elements_data[elem.short_name].atomic_weight
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
    }

    static calculate_empirical_formula(compound)
    {
        console.log("empirical_formula")
    }

    static calculate_group_formula(compound)
    {
        console.log("group_formula")
    }

    static calculate_structural_formula(compound)
    {
        console.log("structural_formula")
    }
}