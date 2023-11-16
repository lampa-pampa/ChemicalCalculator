class ModeListUI
{
    create_mode_list()
    {
        for(const mode_name in data.modes)
        {
            const list_element = document.createElement("div")
            list_element.classList.add("list-element", "connect-to-top")
            
            list_element.appendChild(this.create_list_element_btn(data.modes[mode_name].svg_path, mode_name))
            list_element.appendChild(this.create_list_element_title(data.modes[mode_name].title))
            
            get_id("mode-list-content").appendChild(list_element)
        }
    }

    create_list_element_btn(svg_path_d, id)
    {
        const list_element_btn = document.createElement("button")
        list_element_btn.classList.add("btn")
        list_element_btn.id = id
        list_element_btn.addEventListener("mousedown", handleChangeModeListElementBtnClick)
        
        const svg_icon = document.createElementNS(data.svg.xmlns, "svg")
        svg_icon.setAttribute("viewBox", data.svg.view_box)
        
        const svg_path = document.createElementNS(data.svg.xmlns, "path")
        svg_path.setAttribute("d", svg_path_d)
        
        svg_icon.appendChild(svg_path)
        list_element_btn.appendChild(svg_icon)
        
        return list_element_btn 
    }

    create_list_element_title(title)
    {
        const list_element_title = document.createElement("div")
        list_element_title.classList.add("list-element-title", "connect-to-left")
        list_element_title.textContent = title
        return list_element_title
    }
}