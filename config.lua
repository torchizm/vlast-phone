Config = Config or {}

Config.RepeatTimeout = 2500
Config.CallRepeats = 10
Config.OpenPhone = 288

Config.FoodCompany = {
    [1] = { name =  'Burgershot', setjob = 'ambulance'},
    [2] = { name =  'Hotdog', setjob = 'hotdog'}
}

Config.PhoneApplications = {
    ["phone"] = {
        app = "phone",
        image = "phone",
        tooltipText = "Arama",
        tooltipPos = "top",
        job = false,
        blockedjobs = {},
        slot = 1,
        Alerts = 0,
    },

    ["whatsapp"] = {
        app = "whatsapp",
        image = "whatsapp",
        tooltipText = "Mesajlar",
        tooltipPos = "top",
        job = false,
        blockedjobs = {},
        slot = 2,
        Alerts = 0,
    },

    ["rehber"] = {
        app = "phone",
        image = "contacts",
        tooltipText = "Rehber",
        tooltipPos = "top",
        style = "padding-right: .08vh; font-size: 2.3vh";
        job = false,
        blockedjobs = {},
        slot = 3,
        Alerts = 0,
    },

    ["settings"] = {
        app = "settings",
        image = "settings",
        tooltipText = "Ayarlar",
        tooltipPos = "top",
        style = "padding-right: .08vh; font-size: 2.3vh";
        job = false,
        blockedjobs = {},
        slot = 4,
        Alerts = 0,
    },

    -- ["store"] = {
    --     app = "store",
    --     image = "store",
    --     tooltipText = "App Store",
    --     tooltipPos = "right",
    --     style = "padding-right: .3vh; font-size: 2.2vh";
    --     job = false,
    --     blockedjobs = {},
    --     slot = 5,
    --     Alerts = 0,
    -- },
    ["bank"] = {
        app = "bank",
        image = "bank",
        tooltipText = "Bank",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 5,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Banka"
    },

    ["twitter"] = {
        app = "twitter",
        image = "twitter",
        tooltipText = "Twitter",
        tooltipPos = "bottom",
        style = "",
        job = false,
        blockedjobs = {},
        slot = 6,
        Alerts = 0,
        password = false,
        creator = "TORCHIZM",
        title = "Twitter"
    },

    ["mail"] = {
        app = "mail",
        image = "mail",
        tooltipText = "Mail",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 7,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Mail"
    },
    
    ["advert"] = {
        app = "advert",
        image = "advert",
		tooltipPos = "bottom",
        tooltipText ="Sarı Sayfalar",
        job = false,
        blockedjobs = {},
        slot = 8,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Sarı Sayfalar"
    },
    ["clock"] = {
        app = "clock",
        image = "clock",
        tooltipText = "Saat",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 9,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Saat"
    },
    ["calculator"] = {
        app = "calculator",
        image = "calculator",
        color = "#ff6a00",
        icon = "fas fa-calculator",
        tooltipText = "Hesap Maki...",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 10,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Hesap Maki..."
    },
    ["houses"] = {
        app = "houses",
        image = "houses",
        tooltipText = "Mülkiyet",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 11,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Mülkiyet"
    },
    ["arrests"] = {
        app = "arrests",
        image = "arrests",
        tooltipText = "Arananlar",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 12,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Arananlar"
    },
    ["photos"] = {
        app = "photos",
        image = "photos",
        tooltipText = "Fotoğraflar",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 13,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Fotoğraflar"
    },
    ["camera"] = {
        app = "camera",
        image = "camera",
        tooltipText = "Kamera",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 14,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Kamera"
    },
    ["racing"] = {
        app = "racing",
        image = "racing",
        tooltipText = "Yarışlar",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {
            "police"
        },
        slot = 15,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Yarışlar"
    }
}
Config.MaxSlots = 20

Config.StoreApps = {

}