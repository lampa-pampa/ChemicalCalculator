function set_mode(mode_name)
{
    const change_mode_btn = get_id("change-mode-btn")
    change_mode_btn.setAttribute("mode", mode_name)
    change_mode_btn.children[0].children[0].setAttribute("d", data.modes[mode_name].svg_path)
}

function create_list_element_btn(svg_path_d, id)
{
    const list_element_btn = document.createElement("button")
    list_element_btn.classList.add("btn")
    list_element_btn.id = id
    list_element_btn.addEventListener("mousedown", (e) => {
        set_mode(e.target.id)
    })
    
    const svg_icon = document.createElementNS(data.svg.xmlns, "svg")
    svg_icon.setAttribute("viewBox", data.svg.view_box)
    
    const svg_path = document.createElementNS(data.svg.xmlns, "path")
    svg_path.setAttribute("d", svg_path_d)
    
    svg_icon.appendChild(svg_path)
    list_element_btn.appendChild(svg_icon)
    
    return list_element_btn 
}

function create_list_element_title(title)
{
    const list_element_title = document.createElement("div")
    list_element_title.classList.add("list-element-title", "connect-to-left")
    list_element_title.textContent = title
    return list_element_title
}

function create_mode_list()
{
    mode_list = get_id("mode-list-content")
    for(mode_name in data.modes)
    {
        const list_element = document.createElement("div")
        list_element.classList.add("list-element", "connect-to-top")
        
        list_element.appendChild(create_list_element_btn(data.modes[mode_name].svg_path, mode_name))
        list_element.appendChild(create_list_element_title(data.modes[mode_name].title))
        
        mode_list.appendChild(list_element)
    }
}