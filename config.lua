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
        color = "#04b543",
        icon = "fa fa-phone-alt",
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
        color = "#25d366",
        icon = "whatsapp",
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
        color = "#636e72",
        icon = "fas fa-user",
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
        color = "#636e72",
        icon = "fa fa-cog",
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
    --     color = "#27ae60",
    --     icon = "fas fa-cart-arrow-down",
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
        color = "#457cc5",
        icon = "fas fa-dollar-sign",
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
        color = "#29a7f3",
        icon = "twitter",
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
        color = "#1f60c0",
        icon = "fas fa-envelope",
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
        color = "#ecb50f",
        icon = "fas fa-layer-group",
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

    -- ["crypto"] = {
    --     app = "kocadede",
    --     color = "#004682",
    --     icon = "fas fa-chart-pie",
    --     tooltipText = "Crypto Currency",
	-- 	tooltipPos = "bottom",
    --     job = false,
    --     blockedjobs = {
    --         "police",
    --         "unemployed",
    --         "ambulance",
    --         "mechanic"
    --     },
    --     slot = 9,
    --     Alerts = 0,
	-- 	style = "",
	-- 	password = false,
    --     creator = "TORCHIZM",
    --     title = "Borsa"
    -- },

    ["racing"] = {
        app = "racing",
        image = "racing",
        color = "#353b48",
        icon = "fas fa-flag-checkered",
        tooltipText = "Racing",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {
            "police"
        },
        slot = 14,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Yarışlar"
    },
    ["houses"] = {
        app = "houses",
        image = "houses",
        color = "#267ba2",
        icon = "fas fa-home",
        tooltipText = "Mülkiyet",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 10,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Mülkiyet"
    },
    -- ["food"] = {
    --     app = "food",
    --     image = "food",
    --     color = "#ab0000",
    --     icon = "fa fa-utensils",
    --     tooltipText = "İşletmeler",
	-- 	tooltipPos = "bottom",
    --     job = false,
    --     blockedjobs = {},
    --     slot = 14,
    --     Alerts = 0,
	-- 	style = "",
	-- 	password = false,
    --     creator = "TORCHIZM",
    --     title = "İşletmeler"
    -- },
    ["clock"] = {
        app = "clock",
        image = "clock",
        color = "#5f615a",
        icon = "fas fa-clock",
        tooltipText = "Saat",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 12,
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
        slot = 9,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Hesap Maki..."
    },
    ["arrests"] = {
        app = "arrests",
        image = "arrests",
        color = "#ff6a00",
        icon = "fas fa-mask",
        tooltipText = "Arananlar",
		tooltipPos = "bottom",
        job = false,
        blockedjobs = {},
        slot = 11,
        Alerts = 0,
		style = "",
		password = false,
        creator = "TORCHIZM",
        title = "Arananlar"
    },

}
Config.MaxSlots = 20

Config.StoreApps = {

}