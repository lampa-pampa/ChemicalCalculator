let main_ui = null
let input = null
let mode_list = null
let output_ui = null
let settings = null

document.addEventListener("DOMContentLoaded", () => {
    init()
})

function init()
{
    settings = data.default_settings
    main_ui = new MainUi()
    input = new Input(new InputUI())
    mode_list = new ModeList(new ModeListUI())
    output_ui = new OutputUI()
    document.addEventListener("click", handleDocumentClick)
}

function handleDocumentClick(e)
{
    if(settings.music)
        main_ui.play_music()
    document.removeEventListener("click", handleDocumentClick)
}

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