const data = 
{
    max_short_name_length: 2,
    refresh_value_frame_delay: 50,
    refresh_value_frame_rate: 20,
    
    value_precision: 2,
    
    default_settings: {
        music: true,
        fx: true,
    },

    sounds: {
        fx: {
            dir: "src/sounds/fx/",
            names: {
                boom: "hit-brutal-puncher-cinematic-trailer-sound-effects-124760.mp3",
                alert: "alarm-furious-laboratory-cinematic-trailer-sound-effects-123873.mp3",
                load_value: "traimory-downer-charger-161152.mp3",
                mode_list_click: "hit-low-gravity-absorber-cinematic-trailer-sound-effects-124761.mp3",
                input_focus: "traimory-braam-soft-rubikon-revealed-a-161151.mp3",
                input_typing: "ping-contact-cinematic-trailer-sound-effects-124764.mp3",
                input_typing_error: "bend-apocalypto-c-d-cinematic-trailer-sound-effects-123875.mp3",
            },
        },

        music: {
            dir: "src/sounds/music/bg_music.mp3",
            start_volume: 0.1,
            volume_offset: 0.01,
            volume_offset_dalay: 100,
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
        "empirical_formula": {
            svg_path: "M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z",
            title: "Wzór empiryczny",
            calculator_function: Calculator.calculate_empirical_formula,
        },
        "group_formula": {
            svg_path: "M22,14A2,2 0 0,1 20,16H4A2,2 0 0,1 2,14V10A2,2 0 0,1 4,8H20A2,2 0 0,1 22,10V14M4,14H8V10H4V14M10,14H14V10H10V14M16,14H20V10H16V14Z",
            title: "Wzór grupowy",
            calculator_function: Calculator.calculate_group_formula,
        },
        "structural_formula": {
            svg_path: "M12 9C10.7 9 9.6 9.8 9.2 11H6.8C6.4 9.8 5.3 9 4 9C2.3 9 1 10.3 1 12S2.3 15 4 15C5.3 15 6.4 14.2 6.8 13H9.2C9.6 14.2 10.7 15 12 15S14.4 14.2 14.8 13H17.2C17.6 14.2 18.7 15 20 15C21.7 15 23 13.7 23 12S21.7 9 20 9C18.7 9 17.6 9.8 17.2 11H14.8C14.4 9.8 13.3 9 12 9M3 12C3 11.4 3.4 11 4 11S5 11.4 5 12 4.6 13 4 13 3 12.6 3 12M21 12C21 12.6 20.6 13 20 13S19 12.6 19 12 19.4 11 20 11 21 11.4 21 12Z",
            title: "Wzór strukturalny",
            calculator_function: Calculator.calculate_structural_formula,
        },
    },
    
    default_mode: "percentage_composition",
}