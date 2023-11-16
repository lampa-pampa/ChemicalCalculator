class Compound
{
    static create(quantity = 1, elements = [])
    {
        const compound = new Compound()
        compound.elements = elements
        compound.quantity = quantity
        
        return compound
    }

    push(element_short_name, element_quantity = 1)
    {
        this.elements.push({
            short_name: element_short_name,
            quantity: element_quantity,
        })
    }
}