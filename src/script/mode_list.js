class ModeList
{
    constructor(ui)
    {
        this.ui = ui
        this.ui.create_mode_list()
        const storage_mode = storage_get("mode")
        if(storage_mode && Object.keys(data.modes).includes(storage_mode))
            this.set_mode(storage_mode)
        else
            this.set_mode(data.default_mode)
        set_listeners([
            {id: "change-mode-btn", events: [
                {type: "click", handler: handleChangeModeBtnClick},
            ]},
            {id: "mode-list", events: [
                {type: "keydown", handler: handleModeListKeyDown},
            ]},
        ])
    }

    set_mode(mode_name)
    {
        storage_set("mode", mode_name)
        const change_mode_btn = get_id("change-mode-btn")
        change_mode_btn.setAttribute("mode", mode_name)
        change_mode_btn.children[0].children[0].setAttribute("d", data.modes[mode_name].svg_path)
    }
    
    get_mode()
    {
        return get_id("change-mode-btn").getAttribute("mode")
    }
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