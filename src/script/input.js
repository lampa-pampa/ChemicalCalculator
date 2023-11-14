let states = 
{
    cur_input_value: "",
    cur_pressed_key: "",
    cur_cursor_index: 0,
}

function parse_input_value(value)
{
    const compound = new Compound();
    let read_index = 0
    let str_quantity = ""
    while(/[0-9]/.test(value[read_index]))
    {
        str_quantity += value[read_index]
        ++read_index
    }

    const quantity = parseInt(str_quantity)
    if(!isNaN(quantity))
        compound.quantity = quantity

    while(value[read_index])
    {
        found = ""
        for(let j = data.max_short_name_length; j > 0; --j)
        {
            Object.keys(elements_data).every((key) => {
                condition = key === value.substr(read_index, j)
                if(condition)
                    found = value.substr(read_index, j)
                return !condition
            })
            if(found)
            {
                read_index += j
                break
            }
        }

        let str_quantity = ""
        while(/[0-9]/.test(value[read_index]))
        {
            str_quantity += value[read_index]
            ++read_index
        }
        if(str_quantity)
            compound.push(found, parseInt(str_quantity))
        else
            compound.push(found, 1)
    }
    return compound
}

function validate_input_value(value)
{
    if(!value)
        return true
    let read_index = 0
    let str_quantity = ""
    while(/[0-9]/.test(value[read_index]))
    {
        str_quantity += value[read_index]
        ++read_index
    }

    let quantity = parseInt(str_quantity)
    if(!isNaN(quantity) && quantity < 2)
        return false

    if(read_index >= value.length)
        return false

    while(value[read_index])
    {
        found = ""
        for(let j = data.max_short_name_length; j > 0; --j)
        {
            Object.keys(elements_data).every((key) => {
                condition = key === value.substr(read_index, j)
                if(condition)
                    found = value.substr(read_index, j)
                return !condition
            })
            if(found)
            {
                read_index += j
                break
            }
        }

        if(!found)
            return false

        let str_quantity = ""
        while(/[0-9]/.test(value[read_index]))
        {
            str_quantity += value[read_index]
            ++read_index
        }
        quantity = parseInt(str_quantity)
        if(!isNaN(quantity) && quantity < 2)
            return false
    }
    return true
}

function get_selection_index(input, range_container, range_offset)
{
    if(range_container === input)
        return range_offset
    
    if(range_container.nodeType === Node.TEXT_NODE)
        range_container = range_container.parentNode
    
    for(let i = 0; i < input.childNodes.length; ++i)
    {
        if(input.childNodes[i] === range_container)
            return i + range_offset
    }

    return 0
}

function get_cursor_index(input)
{
    const range = window.getSelection().getRangeAt(0)
    start = get_selection_index(input, range.startContainer, range.startOffset)
    end = get_selection_index(input, range.endContainer, range.endOffset)
    return (start > end ? start : end)
}

function refresh_cursor(input)
{
    new_input_value = input.textContent
    diff = new_input_value.length - states.cur_input_value.length
    new_cursor_index = states.cur_cursor_index + diff
    if(states.cur_pressed_key === "Delete")
        new_cursor_index = states.cur_cursor_index
    if(new_cursor_index > 0)
        set_cursor_index(new_cursor_index, input)
    states.cur_input_value = new_input_value
}

function set_cursor_index(index, node)
{
    const selection = window.getSelection()
    const range = document.createRange()
    range.setStart(node.childNodes[index - 1], 1)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
}

function number_is_subscripted(value, i)
{
    while(/[0-9]/.test(value[i]))
    {
        --i
        if(i < 0)
            return false
    }
    return /[a-zA-Z]/.test(value[i])
}

function format_input_value(value)
{
    let parsed_value = ""

    for(let i = 0; i < value.length; ++i)
    {
        char = value[i]
        if(/[A-Za-z0-9]/.test(char))
        {
            if(/[0-9]/.test(char))
            {
                if(!(char == "0" && !/[0-9]/.test(value[i - 1])))
                {
                    if(number_is_subscripted(value, i))
                        parsed_value += format_char(char, "sub", "digit")
                    else
                        parsed_value += format_char(char, "span", "digit")
                }
            }
            else
            {
                parsed_value += format_char(char, "span", "chemical-element")
            }
        }
    }
    return parsed_value
}

function refresh_input_value(input)
{
    input.innerHTML = format_input_value(input.textContent)
    
    if(states.cur_input_value == input.textContent)
        run_animation(input.parentNode, "input-typing-error")

    if(!validate_input_value(input.textContent))
        input.parentNode.classList.add("error")
    else
        input.parentNode.classList.remove("error")
}

function format_char(char, tag, cls)
{
    return `<${tag} class="${cls}">${char}</${tag}>`
}