let main_ui = null
let input = null
let mode_list = null

let settings = {
    music: false,
    fx: false,
}

document.addEventListener("DOMContentLoaded", () => {
    init()
})

function get_id(id)
{
    return document.getElementById(id)
}

function storage_get(property_name)
{
    return JSON.parse(localStorage.getItem(property_name))
}

function storage_set(property_name, value)
{
    localStorage.setItem(property_name, JSON.stringify(value))
}

function set_listeners(listeners_data)
{
    for(elem of listeners_data)
    {
        for(listener of elem.events)
           get_id(elem.id).addEventListener(listener.type, listener.handler)
    }    
}

function try_to_play_sound(sound_name)
{
    if(settings.fx)
        main_ui.play_sound(sound_name)
}

function init()
{
    main_ui = new MainUi()
    input = new Input(new InputUI())
    mode_list = new ModeList(new ModeListUI())

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
            {type: "click", handler: handleChangeModeBtnClick},
        ]},
        {id: "mode-list", events: [
            {type: "keydown", handler: handleModeListKeyDown},
        ]},
        {id: "calculate-btn", events: [
            {type: "click", handler: handleCalculateBtnClick},
        ]},
    ])
}