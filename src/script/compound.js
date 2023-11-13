class Compound
{
    constructor(quantity = 1, elements = {})
    {
        this.elements = elements
        this.quantity = quantity
    }

    push(element_short_name, element_quantity = 1)
    {
        if(!this.elements[element_short_name])
            this.elements[element_short_name] = element_quantity
        else
            this.elements[element_short_name] += element_quantity
    }
}