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
    create_mode_list()
    set_mode(data.default_mode)
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
})