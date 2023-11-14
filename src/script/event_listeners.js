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
    refresh_input_value(e.target)
    refresh_cursor(e.target)
}

function handleChangeModeBtnMouseDown(e)
{
    e.target.setAttribute("state", JSON.stringify(get_id("mode-list") === document.activeElement))
}

function handleChangeModeBtnClick(e)
{
    const mode_list = get_id("mode-list")
    state = JSON.parse(e.target.getAttribute("state"))
    state = !state
    e.target.setAttribute("state", state)
    if(state)
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
    const value = get_id("input-text").textContent
    if(validate_input_value(value))
    {
        const compound = parse_input_value(get_id("input-text").textContent)
    }
    else
    {
        throw new Error("pal gume")
    }
}