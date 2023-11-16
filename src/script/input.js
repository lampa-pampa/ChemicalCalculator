class Input
{
    constructor(ui)
    {
        this.ui = ui
        this.state = {
            value: "",
            pressed_key: "",
            cursor_index: 0,
        }
        
        set_listeners([
            {id: "input", events: [
                {type: "click", handler: handleOuterInputClick},
            ]},
            {id: "input-text", events: [
                {type: "focus", handler: handleInnerInputFocus},
                {type: "blur", handler: handleInnerInputBlur},
                {type: "keydown", handler: handleInnerInputKeyDown},
                {type: "input", handler: handleInnerInputInput},
            ]},
            {id: "calculate-btn", events: [
                {type: "click", handler: handleCalculateBtnClick},
            ]},
        ])
    }
    
    parse_value(value)
    {
        const compound = Compound.create();
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
            let found = ""
            for(let j = data.max_short_name_length; j > 0; --j)
            {
                Object.keys(elements_data).every((key) => {
                    const condition = key === value.substr(read_index, j)
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

    validate_value(value)
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
        if((!isNaN(quantity) && quantity < 2) || read_index >= value.length)
            return false

        while(value[read_index])
        {
            let found = ""
            for(let j = data.max_short_name_length; j > 0; --j)
            {
                Object.keys(elements_data).every((key) => {
                    const condition = key === value.substr(read_index, j)
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

    get_selection_index(node, range_container, range_offset)
    {
        if(range_container === node)
            return range_offset

        if(range_container.nodeType === Node.TEXT_NODE)
            range_container = range_container.parentNode

        for(let i = 0; i < node.childNodes.length; ++i)
        {
            if(node.childNodes[i] === range_container)
                return i + range_offset
        }
        
        return 0
    }

    get_cursor_index(node)
    {
        const range = window.getSelection().getRangeAt(0)
        const start = this.get_selection_index(node, range.startContainer, range.startOffset)
        const end = this.get_selection_index(node, range.endContainer, range.endOffset)
        return (start > end ? start : end)
    }

    refresh_cursor(node)
    {
        const new_input_value = node.textContent
        const diff = new_input_value.length - this.state.value.length
        let new_cursor_index = this.state.cursor_index + diff

        if(this.state.pressed_key === "Delete")
            new_cursor_index = this.state.cursor_index

        if(new_cursor_index > 0)
            this.set_cursor_index(new_cursor_index, node)

        this.state.value = new_input_value
    }

    set_cursor_index(index, node)
    {
        const selection = window.getSelection()
        const range = document.createRange()
        range.setStart(node.childNodes[index - 1], 1)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
    }

    number_is_subscripted(value, i)
    {
        while(/[0-9]/.test(value[i]))
        {
            --i
            if(i < 0)
            return false
        }

        return /[a-zA-Z]/.test(value[i])
    }

    format_value(value)
    {
        let parsed_value = ""
        for(let i = 0; i < value.length; ++i)
        {
            const char = value[i]

            if(/[A-Za-z0-9]/.test(char))
            {
                if(/[0-9]/.test(char))
                {
                    if(!(char == "0" && !/[0-9]/.test(value[i - 1])))
                    {
                        if(this.number_is_subscripted(value, i))
                            parsed_value += this.format_char(char, "sub", "digit")
                        else
                            parsed_value += this.format_char(char, "span", "digit")
                    }
                }
                else
                {
                    parsed_value += this.format_char(char, "span", "chemical-element")
                }
            }
        }

        return parsed_value
    }

    refresh_value(node)
    {
        node.innerHTML = this.format_value(node.textContent)
        
        if(input.state.pressed_key === "Enter")
            return
        
        if(this.state.value == node.textContent)
        {
            main_ui.run_animation(node.parentNode, "input-typing-error")
            try_to_play_sound("input_typing_error")
        }
        else
        {
            main_ui.run_animation(document.body, "input-typing")
            try_to_play_sound("input_typing")
        }

        if(!this.validate_value(node.textContent))
            node.parentNode.classList.add("error")
        else
            node.parentNode.classList.remove("error")
    }

    format_char(char, tag, cls)
    {
        return `<${tag} class="${cls}">${char}</${tag}>`
    }
}

function handleOuterInputClick(e)
{
    e.target.children[0].focus()
}

function handleInnerInputFocus(e)
{
    e.target.parentNode.classList.add("active")
    try_to_play_sound("input_focus")
}

function handleInnerInputBlur(e)
{
    e.target.parentNode.classList.remove("active")
}

function handleInnerInputKeyDown(e)
{
    input.state.cursor_index = input.get_cursor_index(e.target)
    input.state.pressed_key = e.key
}

function handleInnerInputInput(e)
{
    if(input.state.pressed_key === "Enter")
        get_id("calculate-btn").click()

    input.refresh_value(e.target)
    input.refresh_cursor(e.target)
}

function handleCalculateBtnClick(e)
{
    const value = get_id("input-text").textContent
    if(input.validate_value(value))
    {
        if(value)
        {
            const mode = get_id("change-mode-btn").getAttribute("mode")
            if(mode)
            {
                const compound = input.parse_value(get_id("input-text").textContent)
                data.modes[mode].calculator_function(compound)
                main_ui.run_animation(get_id("input"), "boom-input")
                main_ui.run_animation(get_id("output"), "fade-in-output") 
                try_to_play_sound("boom")
                try_to_play_sound("output_load")
            }
        }
        else
        {
            input.ui.alert("Podaj wzór sumaryczny związku")
            try_to_play_sound("alert")
        }
    }
    else
    {
        input.ui.alert("Niepoprawna wartość")
        try_to_play_sound("alert")
    }
}