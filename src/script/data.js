const data = 
{
    max_short_name_length: 2,
    
    output: {
        show_number_frame_delay: 30,
        show_number_frame_rate: 50,
        show_string_frame_delay: 200,
        value_precision: 2,
    },
    
    
    default_settings: {
        music: true,
        fx: true,
    },

    sounds: {
        music: {
            dir: "src/sounds/music/bg_music.mp3",
            start_volume: 0.1,
            volume_offset: 0.01,
            volume_offset_dalay: 100,
        },

        fx: {
            dir: "src/sounds/fx/",
            names: {
                boom: "hit-brutal-puncher-cinematic-trailer-sound-effects-124760.mp3",
                alert: "alarm-furious-laboratory-cinematic-trailer-sound-effects-123873.mp3",
                load_value: "traimory-downer-charger-161152.mp3",
                show_value: "braam-classic-satellite-g-cinematic-trailer-sound-effects-123877.mp3",
                mode_list_click: "hit-low-gravity-absorber-cinematic-trailer-sound-effects-124761.mp3",
                input_focus: "traimory-braam-soft-rubikon-revealed-a-161151.mp3",
                input_typing: "ping-contact-cinematic-trailer-sound-effects-124764.mp3",
                input_typing_error: "bend-apocalypto-c-d-cinematic-trailer-sound-effects-123875.mp3",
            },
        },
    },

    svg: {
        xmlns: "http://www.w3.org/2000/svg",
        view_box: "0 0 24 24",
    },

    modes: {
        "percentage_composition": {
            svg_path: "M18.5 3.5L20.5 5.5L5.5 20.5L3.5 18.5L18.5 3.5M7 4C8.66 4 10 5.34 10 7C10 8.66 8.66 10 7 10C5.34 10 4 8.66 4 7C4 5.34 5.34 4 7 4M17 14C18.66 14 20 15.34 20 17C20 18.66 18.66 20 17 20C15.34 20 14 18.66 14 17C14 15.34 15.34 14 17 14M7 6C6.45 6 6 6.45 6 7C6 7.55 6.45 8 7 8C7.55 8 8 7.55 8 7C8 6.45 7.55 6 7 6M17 16C16.45 16 16 16.45 16 17C16 17.55 16.45 18 17 18C17.55 18 18 17.55 18 17C18 16.45 17.55 16 17 16Z",
            title: "Skład procentowy",
            calculator_function: Calculator.calculate_percentage_composition,
        },
        "element_info": {
            svg_path: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",
            title: "Informacje o pierwiastku",
            calculator_function: Calculator.show_element_info,
        },
        "empirical_formula": {
            svg_path: "M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z",
            title: "Wzór empiryczny",
            calculator_function: Calculator.calculate_empirical_formula,
        },
    },
    
    default_mode: "percentage_composition",
}