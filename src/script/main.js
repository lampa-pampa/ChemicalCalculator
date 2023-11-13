const data = 
{
    max_short_name_length: 2,
    brackets: "",
    special_chars: "",
    refresh_value_frame_delay: 50,
    refresh_value_frame_rate: 20,
}

let states = 
{
    cur_input_value: "",
    cur_pressed_key: "",
    cur_cursor_index: 0,
    mode_list_state: false,
}

function get_id(id)
{
    return document.getElementById(id)
}

function set_listeners(listeners_data)
{
    for(elem of listeners_data)
    {
        for(listener of elem.events)
           get_id(elem.id).addEventListener(listener.type, listener.handler)
    }    
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", handleDocumentClick)
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
        {id: "change-mode-btn", events: [
            {type: "mousedown", handler: handleChangeModeBtnMouseDown},
            {type: "click", handler: handleChangeModeBtnClick},
        ]},
        {id: "mode-list", events: [
            {type: "keydown", handler: handleModeListKeyDown},
        ]},
        {id: "calculate-btn", events: [
            {type: "click", handler: handleCalculateBtnClick},
        ]},
    ])
})

function handleDocumentClick(e)
{
    const music = new Audio("src/sounds/music.mp3")
    music.loop = true
    // music.play()
    document.removeEventListener("click", handleDocumentClick)
}

function handleOuterInputClick(e)
{
    e.target.firstChild.focus()
}

function handleInnerInputFocus(e)
{
    e.target.parentNode.classList.add("active")
}

function handleInnerInputBlur(e)
{
    e.target.parentNode.classList.remove("active")
}

function handleInnerInputKeyDown(e)
{
    states.cur_cursor_index = get_cursor_index(e.target)
    states.cur_pressed_key = e.key
    if(states.cur_pressed_key == "Enter")
    {
        get_id("calculate-btn").click()
        e.target.blur()
    }
}

function handleInnerInputInput(e)
{
    refresh_value(e.target)
    refresh_cursor(e.target)
}

function handleChangeModeBtnMouseDown()
{
    states.mode_list_state = get_id("mode-list") === document.activeElement
}

function handleChangeModeBtnClick(e)
{
    const mode_list = get_id("mode-list")
    states.mode_list_state = !states.mode_list_state
    if(states.mode_list_state)
        mode_list.focus()
    else
        mode_list.blur()
}

function handleModeListKeyDown(e)
{
    if(e.key == "Escape")
        e.target.blur()
}

function handleCalculateBtnClick(e)
{
    try
    {
        const compound = parse_input_value(get_id("input-text").textContent)
        show_element_data(compound)
    }
    catch(error)
    {
        console.log(error)
    }
}

/**********************************************************/

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
                condition = key == value.substr(read_index, j)
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
            throw new Error(`Zły znak na miejscu: ${read_index + 1}`)

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

function show_element_data(compound)
{
    //strukturalny
    //grupowy
    //empiryczny
    //sumaryczny
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
    if(states.cur_pressed_key == "Delete")
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
        
        if(/[A-Za-z]/.test(char))
        {
            found = ""
            for(let j = data.max_short_name_length; j > 0; --j)
            {
                Object.keys(elements_data).every((key) => {
                    condition = key.substring(0, j) == value.substr(i, j)
                    if(condition)
                        found = value.substr(i, j)
                    return !condition
                })
                if(found)
                {
                    for(char of found)
                        parsed_value += format_char(char, "span", "chemical-element")
                    i += j - 1
                    break
                }
            }
        }
        else if(/[0-9]/.test(char))
        {
            if(!(char == "0" && !/[0-9]/.test(value[i - 1])))
            {
                if(number_is_subscripted(value, i))
                    parsed_value += format_char(char, "sub", "digit")
                else
                    parsed_value += format_char(char, "span", "digit")
            }
        }
        else if(data.brackets.includes(char))
        {
            parsed_value += format_char(char, "span", "bracket")
        }
        else if(data.special_chars.includes(char))
        {
            parsed_value += format_char(char, "span", "special-char")
        }
    }
    return parsed_value
}

function refresh_value(input)
{
    input.innerHTML = format_input_value(input.textContent)
    
    if(states.cur_input_value == input.textContent)
        run_animation(input.parentNode, "input-typing-error")
    else
        run_animation(input.parentNode, "input-typing")
}

function format_char(char, tag, cls)
{
    return `<${tag} class="${cls}">${char}</${tag}>`
}

function run_animation(node, animation_name)
{
    node.style.animationName = ""
    node.offsetWidth
    node.style.animationName = animation_name
}

function boom()
{
    run_animation(get_id("input"), "boom-input")
    run_animation(get_id("calculate-btn"), "boom-btn")
    run_animation(get_id("output"), "fade-in-output") 
    const music = new Audio("src/sounds/boom.mp3")
    music.play()
}

function smooth_value_refresh(node, value)
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