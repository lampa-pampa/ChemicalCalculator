function handleDocumentClick(e)
{
    if(settings.music)
        ui.play_music()
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
                ui.run_animation(get_id("input"), "boom-input")
                ui.run_animation(get_id("output"), "fade-in-output") 
                try_to_play_sound("boom")
            }
        }
        else
        {
            ui.output_alert("Podaj wzór sumaryczny związku")
        }
    }
    else
    {
        ui.output_alert("Niepoprawna wartość")
    }
}