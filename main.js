const special_chars = "+ "
const refresh_value_delay = 50
let cur_input_value = ""
let cur_pressed_key = ""
let cur_cursor_index = 0

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", handleDocumentClick)
    document.getElementById("input").addEventListener("click", handleOuterInputClick)
    document.getElementById("input-text").addEventListener("focus", handleInnerInputFocus)
    document.getElementById("input-text").addEventListener("blur", handleInnerInputBlur)
    document.getElementById("input-text").addEventListener("keydown", handleInnerInputKeyDown)
    document.getElementById("input-text").addEventListener("input", handleInnerInputInput)
    document.getElementById("calculate-btn").addEventListener("click", handleCalculateBtnClick)
})

function handleDocumentClick(e)
{
    const music = new Audio("music.mp3")
    music.loop = true
    // music.play()
    document.removeEventListener("click", handleDocumentClick)
}

function handleOuterInputClick(e)
{
    e.target.children[0].focus()
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
    cur_cursor_index = get_cursor_index(e.target)
    cur_pressed_key = e.key
    if(cur_pressed_key == "Enter")
    {
        document.getElementById("calculate-btn").click()
        e.target.blur()
    }
}

function handleInnerInputInput(e)
{
    refresh_value(e.target)
    refresh_cursor(e.target)
}

function handleCalculateBtnClick(e)
{
    boom()
    smooth_refresh(document.getElementById("test1"), 10)
}

/**********************************************************/

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
    diff = new_input_value.length - cur_input_value.length
    new_cursor_index = cur_cursor_index + diff
    if(cur_pressed_key == "Delete")
        new_cursor_index = cur_cursor_index
    if(new_cursor_index > 0)
        set_cursor_index(new_cursor_index, input)
    cur_input_value = new_input_value
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
    while(/[2-9]/.test(value[i]))
    {
        --i
        if(i < 0)
            return false
    }
    return /[)a-zA-Z]/.test(value[i])
}

function refresh_value(input)
{
    parsed_value = ""
    value = input.textContent

    for(let i = 0; i < value.length; ++i)
    {
        char = value[i]
        
        if(/[A-Z]/.test(char))
        {
            elements_data.every((elem) => {
                condition = elem.short_name[0] == char
                if(condition)
                    parsed_value += format_str(char, "element")
                return !condition
            })   
        }
        else if(/[a-z]/.test(char))
        {
            elements_data.every((elem) => {
                condition = elem.short_name.length == 2 && elem.short_name[0] == value[i - 1] && elem.short_name[1] == char
                if(condition)
                    parsed_value += format_str(char, "element")
                return !condition
            })    
        }
        else if(/[2-9]/.test(char))
        {
            if(number_is_subscripted(value, i))
                parsed_value += `<sub>${char}</sub>`
            else
                parsed_value += format_str(char, "digit")
        }
        else if(char == "(" || char == ")")
        {
            parsed_value += format_str(char, "bracket")
        }
        else if(special_chars.includes(char))
        {
            parsed_value += format_str(char, "special-char")
        }
    }

    input.innerHTML = parsed_value

    if(value == input.textContent)
        run_animation(input.parentNode, "input-typing")
    else
        run_animation(input.parentNode, "input-typing-error")
}

function format_str(char, cls)
{
    return `<span class="${cls}">${char}</span>`
}

function run_animation(node, animation_name)
{
    node.style.animationName = ""
    node.offsetWidth
    node.style.animationName = animation_name
}

function boom()
{
    run_animation(document.getElementById("input"), "boom-input")
    run_animation(document.getElementById("calculate-btn"), "boom-btn")
    run_animation(document.getElementById("output"), "fade-in-output") 
    const music = new Audio("boom.mp3")
    music.play()
}

function smooth_refresh(node, value)
{
    node.textContent = 0
    const interval = setInterval(() => {
        const cur_value = parseInt(node.textContent)
        if(cur_value < value)
            node.textContent = cur_value + 1
        else
            clearInterval(interval)
    }, refresh_value_delay)
}