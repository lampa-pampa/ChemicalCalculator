function handleDocumentClick(e)
{
    const music = new Audio("src/sounds/music.mp3")
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
    states.cur_cursor_index = get_cursor_index(e.target)
    states.cur_pressed_key = e.key
    if(states.cur_pressed_key === "Enter")
    {
        get_id("calculate-btn").click()
        e.target.blur()
    }
}

function handleInnerInputInput(e)
{
    refresh_input_value(e.target)
    refresh_cursor(e.target)
}

function handleChangeModeBtnClick(e)
{
    get_id("mode-list").focus()
}

function handleModeListKeyDown(e)
{
    if(e.key === "Escape")
        e.target.blur()
}

function handleCalculateBtnClick(e)
{
    const value = get_id("input-text").textContent
    if(validate_input_value(value))
    {
        if(value)
        {
            const mode = get_id("change-mode-btn").getAttribute("mode")
            if(mode)
            {
                const compound = parse_input_value(get_id("input-text").textContent)
                data.modes[mode].calculator_function(compound)
                boom()
            }
            else
            {

            }
        }
        else
        {
            
        }
    }
    else
    {
        
    }
}