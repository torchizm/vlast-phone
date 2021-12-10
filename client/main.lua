QBCore = nil

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(10)
        if QBCore == nil then
            TriggerEvent('QBCore:GetObject', function(obj) QBCore = obj end)
            Citizen.Wait(200)
        end
    end
end)

-- Code

local PlayerJob = {}

phoneProp = 0
local phoneModel = `prop_npc_phone_02`
local phone31 = false

PhoneData = {
    MetaData = {},
    isOpen = false,
    PlayerData = nil,
    Contacts = {},
    Tweets = {},
    MentionedTweets = {},
    Hashtags = {},
    Chats = {},
    Invoices = {},
    CallData = {},
    RecentCalls = {},
    Garage = {},
    Mails = {},
    Adverts = {},
    GarageVehicles = {},
    AnimationData = {
        lib = nil,
        anim = nil,
    },
    SuggestedContacts = {},
    CryptoTransactions = {},
    Alarms = {}
}

local GarageList = {
    "Garaj A",
    "Garaj B",
    "Garaj C",
    "Garaj D",
    "Garaj E",
    "Garaj F",
    "Garaj G",
    "Garaj H",
    "Garaj I",
    "Garaj J",
    "Garaj K",
    "Garaj L",
    "Garaj M",
}
colors = {
    [0] = "020202",
    [1] = "4c4c4e",
    [2] = "262626",
    [3] = "989898",
    [4] = "a3a3a3",
    [5] = "00143f",
    [6] = "43464b",
    [7] = "2c2c2e",
    [8] = "577d8f",
    [9] = "34343e",
    [10] = "101211",
    [11] = "353c42",
    [12] = "141414",
    [13] = "626262",
    [14] = "b4b4b4",
    [15] = "020202",
    [16] = "303030",
    [17] = "424349",
    [18] = "b3b6bc",
    [19] = "404144",
    [20] = "636364",
    [21] = "262724",
    [22] = "454440",
    [23] = "a3a3a3",
    [24] = "d2d2d2",
    [25] = "323941",
    [26] = "353537",
    [27] = "cf1916",
    [28] = "650103",
    [29] = "c00c15",
    [30] = "571e27",
    [31] = "f00406",
    [32] = "7c1c1e",
    [33] = "6d3407",
    [34] = "480b12",
    [35] = "df1a21",
    [36] = "ff8b01",
    [37] = "c7b279",
    [38] = "ff8b01",
    [39] = "a20000",
    [40] = "ae1d24",
    [41] = "ab3f23",
    [42] = "fcd937",
    [43] = "c44e4e",
    [44] = "d35b5b",
    [45] = "c70f05",
    [46] = "f50729",
    [47] = "811f1c",
    [48] = "970215",
    [49] = "052800",
    [50] = "365533",
    [51] = "58e2ed",
    [52] = "6f760c",
    [53] = "0a6414",
    [54] = "6096a0",
    [55] = "54e80c",
    [56] = "1d2e26",
    [57] = "168632",
    [58] = "052800",
    [59] = "8bb99c",
    [60] = "02a06a",
    [61] = "3d568c",
    [62] = "0f1539",
    [63] = "455892",
    [64] = "158af6",
    [65] = "004a71",
    [66] = "336c99",
    [67] = "1f71a1",
    [68] = "26719b",
    [69] = "011047",
    [70] = "04359e",
    [71] = "010329",
    [72] = "042a75",
    [73] = "2985ea",
    [74] = "2858ad",
    [75] = "152238",
    [76] = "19346b",
    [77] = "747ea7",
    [78] = "40dcd1",
    [79] = "34658e",
    [80] = "86aacc",
    [81] = "07b4df",
    [82] = "0e1b38",
    [83] = "6182b7",
    [84] = "001f3e",
    [85] = "2e3d5f",
    [86] = "17416b",
    [87] = "3e618b",
    [88] = "eea50a",
    [89] = "e1b988",
    [90] = "6f5228",
    [91] = "e1bc2d",
    [92] = "b6e932",
    [93] = "c7c2af",
    [94] = "cd9467",
    [95] = "b6a184",
    [96] = "b07533",
    [97] = "925c14",
    [98] = "845043",
    [99] = "dabe82",
    [100] = "7b5723",
    [101] = "3a1c1e",
    [102] = "b08455",
    [103] = "916230",
    [104] = "f26225",
    [105] = "a58945",
    [106] = "ccb160",
    [107] = "ab9d9a",
    [108] = "5c3b2a",
    [109] = "33221c",
    [110] = "4b3128",
    [111] = "d1d2d4",
    [112] = "eaebe6",
    [113] = "a95c24",
    [114] = "6f3e2f",
    [115] = "623123",
    [116] = "edd3b8",
    [117] = "9395a2",
    [118] = "252525",
    [119] = "c0c6d4",
    [120] = "bfc1c2",
    [121] = "f5f5f5",
    [122] = "efefef",
    [123] = "d76800",
    [124] = "ffa039",
    [125] = "4ade02",
    [126] = "fb9403",
    [127] = "107aea",
    [128] = "093f28",
    [129] = "170804",
    [130] = "ad622b",
    [131] = "f4f5ed",
    [132] = "eee9d6",
    [133] = "65633d",
    [134] = "fbfbf9",
    [135] = "fe0da7",
    [136] = "fcbcb2",
    [137] = "c42f73",
    [138] = "ff6600",
    [139] = "63ff0b",
    [140] = "0000ff",
    [141] = "191e3e",
    [142] = "552382",
    [143] = "870001",
    [144] = "36603c",
    [145] = "b700ce",
    [146] = "002e4f",
    [147] = "070707",
    [148] = "640086",
    [149] = "2a1932",
    [150] = "651c16",
    [151] = "005237",
    [152] = "242923",
    [153] = "a27355",
    [154] = "cd9268",
    [155] = "19a23a",
    [156] = "000000",
    [157] = "d1f7ff",
    [158] = "000000",
}


RegisterNetEvent('qb-phone:client:RaceNotify')
AddEventHandler('qb-phone:client:RaceNotify', function(message)
    if PhoneData.isOpen then
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "Yarış",
                text = message,
                icon = "fas fa-flag-checkered",
                color = "#353b48",
                timeout = 1500,
            },
        })
    else
        SendNUIMessage({
        action = "Notification",
            NotifyData = {
                title = "Yarış", 
                content = message, 
                icon = "fas fa-flag-checkered", 
                timeout = 3500, 
                color = "#353b48",
            },
        })
    end
end)

RegisterNetEvent('qb-phone:client:AddRecentCall')
AddEventHandler('qb-phone:client:AddRecentCall', function(data, time, type)
    table.insert(PhoneData.RecentCalls, {
        name = IsNumberInContacts(data.number),
        time = time,
        type = type,
        number = data.number,
        anonymous = data.anonymous
    })
    TriggerServerEvent('qb-phone:server:SetPhoneAlerts', "phone")
    Config.PhoneApplications["phone"].Alerts = Config.PhoneApplications["phone"].Alerts + 1
    SendNUIMessage({ 
        action = "RefreshAppAlerts",
        AppData = Config.PhoneApplications
    })
end)

RegisterNetEvent('QBCore:Client:OnJobUpdate')
AddEventHandler('QBCore:Client:OnJobUpdate', function(JobInfo)
    SendNUIMessage({
        action = "UpdateApplications",
        JobData = JobInfo,
        applications = Config.PhoneApplications
    })

    PlayerJob = JobInfo
end)

RegisterNUICallback('ClearRecentAlerts', function(data, cb)
    TriggerServerEvent('qb-phone:server:SetPhoneAlerts', "phone", 0)
    Config.PhoneApplications["phone"].Alerts = 0
    SendNUIMessage({ action = "RefreshAppAlerts", AppData = Config.PhoneApplications })
end)

RegisterCommand("resetbackground", function(source, raw, args)
    local background = "default-qbus"

    PhoneData.MetaData.background = background
    TriggerServerEvent('qb-phone:server:SaveMetaData', PhoneData.MetaData)
end)

RegisterNUICallback('SetBackground', function(data)
    local background = data.background

    PhoneData.MetaData.background = background
    TriggerServerEvent('qb-phone:server:SaveMetaData', PhoneData.MetaData)
end)

RegisterNUICallback('GetMissedCalls', function(data, cb)
    cb(PhoneData.RecentCalls)
end)

RegisterNUICallback('GetSuggestedContacts', function(data, cb)
    cb(PhoneData.SuggestedContacts)
end)

function IsNumberInContacts(num)
    local retval = num
    for _, v in pairs(PhoneData.Contacts) do
        if num == v.number then
            retval = v.name
        end
    end
    return retval
end

local isLoggedIn = false

Citizen.CreateThread(function()
    while true do
        if IsControlJustPressed(0, Config.OpenPhone) then
            if not PhoneData.isOpen then
                QBCore.Functions.TriggerCallback('qb-phone:server:HasPhone', function(HasPhone)
                    if HasPhone then
                        OpenPhone()
                    else
                        QBCore.Functions.Notify("Üzerinde telefon yok", "error")
                    end
                end)
            end
        end
        Citizen.Wait(3)
    end
end)

function CalculateTimeToDisplay()
	hour = GetClockHours()
    minute = GetClockMinutes()
    
    local obj = {}
    
	if minute <= 9 then
		minute = "0" .. minute
    end
    
    obj.hour = hour
    obj.minute = minute

    return obj
end

RegisterCommand("telfix", function()
    if not PhoneData.CallData.InCall then
        DoPhoneAnimation('cellphone_text_out')
        SetTimeout(400, function()
            StopAnimTask(PlayerPedId(), PhoneData.AnimationData.lib, PhoneData.AnimationData.anim, 2.5)
            deletePhone()
            PhoneData.AnimationData.lib = nil
            PhoneData.AnimationData.anim = nil
        end)
    else
        PhoneData.AnimationData.lib = nil
        PhoneData.AnimationData.anim = nil
        DoPhoneAnimation('cellphone_text_to_call')
    end
    SetNuiFocus(false, false)
    phone = false
    SetTimeout(1000, function()
        PhoneData.isOpen = false
    end)
end)

Citizen.CreateThread(function()
    while true do
        if PhoneData.isOpen then
            SendNUIMessage({
                action = "UpdateTime",
                InGameTime = CalculateTimeToDisplay(),
            })
        end
        Citizen.Wait(1000)
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(60000)

        if isLoggedIn then
            QBCore.Functions.TriggerCallback('qb-phone:server:GetPhoneData', function(pData)   
                if pData.PlayerContacts ~= nil and next(pData.PlayerContacts) ~= nil then 
                    PhoneData.Contacts = pData.PlayerContacts
                end

                SendNUIMessage({
                    action = "RefreshContacts",
                    Contacts = PhoneData.Contacts
                })
            end)
        end
    end
end)

RegisterNetEvent("qb-phone:refresh")
AddEventHandler("qb-phone:refresh", function()
    QBCore.Functions.TriggerCallback('qb-phone:server:GetPhoneData', function(pData)
        PlayerJob = QBCore.Functions.GetPlayerData().job
        PhoneData.PlayerData = QBCore.Functions.GetPlayerData()
        local PhoneMeta = PhoneData.PlayerData.metadata["phone"]
        PhoneData.MetaData = PhoneMeta
		
            -- for k, v in pairs(Config.PhoneApplications) do
            --     local AppData = Config.PhoneApplications[v.app]
            --     if AppData.Color == nil then AppData.Color = "#fff" end
            --     Config.PhoneApplications[v.app] = {
            --         app = v.app,
            --         color = AppData.color,
            --         image = AppData.image,
            --         icon = AppData.icon,
            --         tooltipText = AppData.title,
            --         tooltipPos = "bottom",
            --         job = AppData.job,
            --         blockedjobs = AppData.blockedjobs,
            --         slot = AppData.slot,
            --         Alerts = 0,
            --     }
            -- end

        if PhoneMeta.profilepicture == nil then
            PhoneData.MetaData.profilepicture = "default"
        else
            PhoneData.MetaData.profilepicture = PhoneMeta.profilepicture
        end

        if pData.Applications ~= nil and next(pData.Applications) ~= nil then
            for k, v in pairs(pData.Applications) do 
                Config.PhoneApplications[k].Alerts = v 
            end
        end

        if pData.MentionedTweets ~= nil and next(pData.MentionedTweets) ~= nil then 
            PhoneData.MentionedTweets = pData.MentionedTweets 
        end

        if pData.PlayerContacts ~= nil and next(pData.PlayerContacts) ~= nil then 
            PhoneData.Contacts = pData.PlayerContacts
        end

        if pData.Chats ~= nil and next(pData.Chats) ~= nil then
            local Chats = {}
            for k, v in pairs(pData.Chats) do
                Chats[v.number] = {
                    name = IsNumberInContacts(v.number),
                    number = v.number,
                    messages = json.decode(v.messages)
                }
            end

            PhoneData.Chats = Chats
        end

        if pData.Invoices ~= nil and next(pData.Invoices) ~= nil then
            for _, invoice in pairs(pData.Invoices) do
                invoice.name = IsNumberInContacts(invoice.number)
            end
            PhoneData.Invoices = pData.Invoices

        else 

            PhoneData.Invoices = {}
        end

        if pData.Hashtags ~= nil and next(pData.Hashtags) ~= nil then
            PhoneData.Hashtags = pData.Hashtags
        end

        if pData.Tweets ~= nil and next(pData.Tweets) ~= nil then
            PhoneData.Tweets = pData.Tweets
        end

        if pData.Mails ~= nil and next(pData.Mails) ~= nil then
            PhoneData.Mails = pData.Mails
        end

        if pData.Adverts ~= nil and next(pData.Adverts) ~= nil then
            PhoneData.Adverts = pData.Adverts
        end

        if pData.CryptoTransactions ~= nil and next(pData.CryptoTransactions) ~= nil then
            PhoneData.CryptoTransactions = pData.CryptoTransactions
        end

        SendNUIMessage({ 
            action = "LoadPhoneData", 
            PhoneData = PhoneData, 
            PlayerData = PhoneData.PlayerData,
            PlayerJob = PhoneData.PlayerData.job,
            applications = Config.PhoneApplications 
        })
    end)
end)

function LoadPhone()
    isLoggedIn = true
    QBCore.Functions.TriggerCallback('qb-phone:server:GetPhoneData', function(pData)
        PlayerJob = QBCore.Functions.GetPlayerData().job
        PhoneData.PlayerData = QBCore.Functions.GetPlayerData()
        local PhoneMeta = PhoneData.PlayerData.metadata["phone"]
        PhoneData.MetaData = PhoneMeta
		
        -- if pData.InstalledApps ~= nil and next(pData.InstalledApps) ~= nil then
        --     for k, v in pairs(pData.InstalledApps) do
        --         local AppData = Config.StoreApps[v.app]
        --         Config.PhoneApplications[v.app] = {
        --             app = v.app,
        --             color = AppData.color,
        --             image = AppData.image,
        --             icon = AppData.icon,
        --             tooltipText = AppData.title,
        --             tooltipPos = "bottom",
        --             job = AppData.job,
        --             blockedjobs = AppData.blockedjobs,
        --             slot = AppData.slot,
        --             Alerts = 0,
        --         }
        --     end
        -- end

        if PhoneMeta.profilepicture == nil then
            PhoneData.MetaData.profilepicture = "default"
        else
            PhoneData.MetaData.profilepicture = PhoneMeta.profilepicture
        end

        if pData.Applications ~= nil and next(pData.Applications) ~= nil then
            for k, v in pairs(pData.Applications) do 
                Config.PhoneApplications[k].Alerts = v 
            end
        end

        if pData.MentionedTweets ~= nil and next(pData.MentionedTweets) ~= nil then 
            PhoneData.MentionedTweets = pData.MentionedTweets 
        end

        if pData.PlayerContacts ~= nil and next(pData.PlayerContacts) ~= nil then 
            PhoneData.Contacts = pData.PlayerContacts
        end

        if pData.Chats ~= nil and next(pData.Chats) ~= nil then
            local Chats = {}
            for k, v in pairs(pData.Chats) do
                Chats[v.number] = {
                    name = IsNumberInContacts(v.number),
                    number = v.number,
                    messages = json.decode(v.messages)
                }
            end

            PhoneData.Chats = Chats
        end

        if pData.Invoices ~= nil and next(pData.Invoices) ~= nil then
            for _, invoice in pairs(pData.Invoices) do
                invoice.name = IsNumberInContacts(invoice.number)
            end
            PhoneData.Invoices = pData.Invoices
        else
            PhoneData.Invoices = {}
        end

        if pData.Hashtags ~= nil and next(pData.Hashtags) ~= nil then
            PhoneData.Hashtags = pData.Hashtags
        end

        if pData.Tweets ~= nil and next(pData.Tweets) ~= nil then
            PhoneData.Tweets = pData.Tweets
        end

        if pData.Mails ~= nil and next(pData.Mails) ~= nil then
            PhoneData.Mails = pData.Mails
        end

        if pData.Adverts ~= nil and next(pData.Adverts) ~= nil then
            PhoneData.Adverts = pData.Adverts
        end

        if pData.CryptoTransactions ~= nil and next(pData.CryptoTransactions) ~= nil then
            PhoneData.CryptoTransactions = pData.CryptoTransactions
        end

        SendNUIMessage({ 
            action = "LoadPhoneData", 
            PhoneData = PhoneData, 
            PlayerData = PhoneData.PlayerData,
            PlayerJob = PhoneData.PlayerData.job,
            applications = Config.PhoneApplications 
        })
    end)
end

Citizen.CreateThread(function()
    Wait(500)
    LoadPhone()
end)

RegisterNetEvent('QBCore:Client:OnPlayerUnload')
AddEventHandler('QBCore:Client:OnPlayerUnload', function()
    PhoneData = {
        MetaData = {},
        isOpen = false,
        PlayerData = nil,
        Contacts = {},
        Tweets = {},
        MentionedTweets = {},
        Hashtags = {},
        Chats = {},
        Invoices = {},
        CallData = {},
        RecentCalls = {},
        Garage = {},
        Mails = {},
        Adverts = {},
        GarageVehicles = {},
        AnimationData = {
            lib = nil,
            anim = nil,
        },
        SuggestedContacts = {},
        CryptoTransactions = {},
    }

    isLoggedIn = false
end)

RegisterNetEvent('QBCore:Client:OnPlayerLoaded')
AddEventHandler('QBCore:Client:OnPlayerLoaded', function()
    LoadPhone()
end)

RegisterNUICallback('HasPhone', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:HasPhone', function(HasPhone)
        cb(HasPhone)
    end)
end)


PlayerData = {}
function OpenPhone()
    -- QBCore.Functions.TriggerCallback('qb-phone:server:HasPhone', function(HasPhone)
        -- if HasPhone then
            PhoneData.PlayerData = QBCore.Functions.GetPlayerData()
        if not PhoneData.PlayerData.metadata["isdead"] then
            SetNuiFocus(true, true)
            SetNuiFocusKeepInput(true)
            SendNUIMessage({
                action = "open",
                Tweets = PhoneData.Tweets,
                AppData = Config.PhoneApplications,
                CallData = PhoneData.CallData,
                PlayerData = PhoneData.PlayerData,
            })
            PhoneData.isOpen = true

            Citizen.CreateThread(function()
                while PhoneData.isOpen do
                    DisableDisplayControlActions()
                    Citizen.Wait(1)
                end
            end)

            if not PhoneData.CallData.InCall then
                DoPhoneAnimation('cellphone_text_in')
            else
                DoPhoneAnimation('cellphone_call_to_text')
            end

            SetTimeout(250, function()
                newPhoneProp()
            end)
    

            QBCore.Functions.TriggerCallback('qb-phone:server:GetGarageVehicles', function(vehicles)
            if vehicles ~= nil then
                for i = 1, #vehicles do
                    vehicles[i].garage = GarageList[tonumber(vehicles[i].garage)]
                    vehicles[i].color1 = colors[json.decode(vehicles[i].mods).color1]
                    vehicles[i].color2 = colors[json.decode(vehicles[i].mods).color2]
                end
                PhoneData.GarageVehicles = vehicles
            else
                PhoneData.GarageVehicles = {}
            end
            end)
        -- else
        --     QBCore.Functions.Notify("ليس لديك هاتف", "error")
        -- end
        else 
            QBCore.Functions.Notify("Ölüyken telefon kullanamazsın.", "error")
        end
    -- end)
end

-- function OpenPhone()
--     -- QBCore.Functions.TriggerCallback('qb-phone:server:HasPhone', function(HasPhone)
--         -- if HasPhone then
--             PhoneData.PlayerData = QBCore.Functions.GetPlayerData()
--         if not PhoneData.PlayerData.metadata["isdead"] then
--             SetNuiFocus(true, true)
--             SetNuiFocusKeepInput(true)
--             SendNUIMessage({
--                 action = "open",
--                 Tweets = PhoneData.Tweets,
--                 AppData = Config.PhoneApplications,
--                 CallData = PhoneData.CallData,
--                 PlayerData = PhoneData.PlayerData,
--             })
--             isOpen = true
--             phone31 = true
           

--             if not PhoneData.CallData.InCall then
--                 DoPhoneAnimation('cellphone_text_in')
--             else
--                 DoPhoneAnimation('cellphone_call_to_text')
--             end

--             SetTimeout(250, function()
--                 newPhoneProp()
--             end)
    

--             QBCore.Functions.TriggerCallback('qb-phone:server:GetGarageVehicles', function(vehicles)
--             if vehicles ~= nil then
--                 for i = 1, #vehicles do
--                     vehicles[i].garage = GarageList[tonumber(vehicles[i].garage)]
--                     vehicles[i].color1 = colors[json.decode(vehicles[i].mods).color1]
--                     vehicles[i].color2 = colors[json.decode(vehicles[i].mods).color2]
--                 end
--                 PhoneData.GarageVehicles = vehicles
--             else
--                 PhoneData.GarageVehicles = {}
--             end
--             end)
--         -- else
--         --     QBCore.Functions.Notify("ليس لديك هاتف", "error")
--         -- end
--         else 
--             QBCore.Functions.Notify("Ölüyken telefon kullanamazsın.", "error")
--         end
--     -- end)
-- end




RegisterNUICallback('SetupGarageVehicles', function(data, cb)
    cb(PhoneData.GarageVehicles)
end)

RegisterNUICallback('Close', function()
    if not PhoneData.CallData.InCall then
        DoPhoneAnimation('cellphone_text_out')
        SetTimeout(400, function()
            StopAnimTask(PlayerPedId(), PhoneData.AnimationData.lib, PhoneData.AnimationData.anim, 2.5)
            deletePhone()
            PhoneData.AnimationData.lib = nil
            PhoneData.AnimationData.anim = nil
        end)
    else
        PhoneData.AnimationData.lib = nil
        PhoneData.AnimationData.anim = nil
        DoPhoneAnimation('cellphone_text_to_call')
    end
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
    SetTimeout(500, function()
        PhoneData.isOpen = false
    end)
end)

-- RegisterNUICallback('Close', function()
--     if not PhoneData.CallData.InCall then
--         DoPhoneAnimation('cellphone_text_out')
--         SetTimeout(400, function()
--             StopAnimTask(PlayerPedId(), PhoneData.AnimationData.lib, PhoneData.AnimationData.anim, 2.5)
--             deletePhone()
--             PhoneData.AnimationData.lib = nil
--             PhoneData.AnimationData.anim = nil
--         end)
--     else
--         PhoneData.AnimationData.lib = nil
--         PhoneData.AnimationData.anim = nil
--         DoPhoneAnimation('cellphone_text_to_call')
--     end
--     SetNuiFocus(false, false)
--     SetNuiFocusKeepInput(false)
--     SetTimeout(500, function()
--         PhoneData.isOpen = false
--     end)
--     print('kod geçti')
--     phone31 = false
-- end)

exports("phoneisphone", function()
    return phone31
end)

RegisterNUICallback('RemoveMail', function(data, cb)
    local MailId = data.mailId

    TriggerServerEvent('qb-phone:server:RemoveMail', MailId)
    cb('ok')
end)

RegisterNetEvent('qb-phone:client:UpdateMails')
AddEventHandler('qb-phone:client:UpdateMails', function(NewMails)
    SendNUIMessage({
        action = "UpdateMails",
        Mails = NewMails
    })
    PhoneData.Mails = NewMails
end)

RegisterNUICallback('AcceptMailButton', function(data)
    TriggerEvent(data.buttonEvent, data.buttonData)
    TriggerServerEvent('qb-phone:server:ClearButtonData', data.mailId)
end)

RegisterNUICallback('AddNewContact', function(data, cb)
    table.insert(PhoneData.Contacts, {
        name = data.ContactName,
        number = data.ContactNumber,
        iban = data.ContactIban,
        image = data.ContactImage
    })
    Citizen.Wait(100)
    cb(PhoneData.Contacts)
    if PhoneData.Chats[data.ContactNumber] ~= nil and next(PhoneData.Chats[data.ContactNumber]) ~= nil then
        PhoneData.Chats[data.ContactNumber].name = data.ContactName
    end
    TriggerServerEvent('qb-phone:server:AddNewContact', data.ContactName, data.ContactNumber, data.ContactIban, data.ContactImage)
end)

RegisterNUICallback('GetMails', function(data, cb)
    cb(PhoneData.Mails)
end)

RegisterNUICallback('GetWhatsappChat', function(data, cb)
    if PhoneData.Chats[data.phone] ~= nil then
        cb(PhoneData.Chats[data.phone])
    else
        cb(false)
    end
end)

RegisterNUICallback('GetProfilePicture', function(data, cb)
    local number = data.number

    QBCore.Functions.TriggerCallback('qb-phone:server:GetPicture', function(picture)
        cb(picture)
    end, number)
end)

RegisterNUICallback('GetBankContacts', function(data, cb)
    cb(PhoneData.Contacts)
end)

RegisterNUICallback('GetInvoices', function(data, cb)
    if PhoneData.Invoices ~= nil and next(PhoneData.Invoices) ~= nil then
        cb(PhoneData.Invoices)
    else
        cb(nil)
    end
end)

RegisterNUICallback('GetBankHistory', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetBankHistory', function(data)
        cb(data)
    end)
end)

function GetKeyByDate(Number, Date)
    local retval = nil
    if PhoneData.Chats[Number] ~= nil then
        if PhoneData.Chats[Number].messages ~= nil then
            for key, chat in pairs(PhoneData.Chats[Number].messages) do
                if chat.date == Date then
                    retval = key
                    break
                end
            end
        end
    end
    return retval
end

function GetKeyByNumber(Number)
    local retval = nil
    if PhoneData.Chats then
        for k, v in pairs(PhoneData.Chats) do
            if v.number == Number then
                retval = k
            end
        end
    end
    return retval
end



function ReorganizeChats(key)
    local ReorganizedChats = {}
    ReorganizedChats[1] = PhoneData.Chats[key]
    for k, chat in pairs(PhoneData.Chats) do
        if k ~= key then
            print(k, key)
            table.insert(ReorganizedChats, chat)
        end
    end
    print(json.encode(ReorganizedChats))
    PhoneData.Chats = ReorganizedChats
end

RegisterNUICallback('SendMessage', function(data, cb)
    local ChatMessage = data.ChatMessage
    local ChatDate = data.ChatDate
    local ChatNumber = data.ChatNumber
    local ChatTime = data.ChatTime
    local ChatType = data.ChatType

    local Ped = GetPlayerPed(-1)
    local Pos = GetEntityCoords(Ped)
    local NumberKey = GetKeyByNumber(ChatNumber)
    local ChatKey = GetKeyByDate(NumberKey, ChatDate)
    if PhoneData.Chats[NumberKey] ~= nil then
        if(PhoneData.Chats[NumberKey].messages == nil) then
            PhoneData.Chats[NumberKey].messages = {}
        end
        if PhoneData.Chats[NumberKey].messages[ChatKey] ~= nil then
            if ChatType == "message" or ChatType == "image" then
                table.insert(PhoneData.Chats[NumberKey].messages[ChatKey].messages, {
                    message = ChatMessage,
                    time = ChatTime,
                    sender = PhoneData.PlayerData.citizenid,
                    type = ChatType,
                    data = {},
                })
            elseif ChatType == "location" then
                table.insert(PhoneData.Chats[NumberKey].messages[ChatKey].messages, {
                    message = "Konum",
                    time = ChatTime,
                    sender = PhoneData.PlayerData.citizenid,
                    type = ChatType,
                    data = {
                        x = Pos.x,
                        y = Pos.y,
                    },
                })
            end
            TriggerServerEvent('qb-phone:server:UpdateMessages', PhoneData.Chats[NumberKey].messages, ChatNumber, false)
            NumberKey = GetKeyByNumber(ChatNumber)
            ReorganizeChats(NumberKey)
        else
            table.insert(PhoneData.Chats[NumberKey].messages, {
                date = ChatDate,
                messages = {},
            })
            ChatKey = GetKeyByDate(NumberKey, ChatDate)
            if ChatType == "message" or ChatType == "image" then
                table.insert(PhoneData.Chats[NumberKey].messages[ChatKey].messages, {
                    message = ChatMessage,
                    time = ChatTime,
                    sender = PhoneData.PlayerData.citizenid,
                    type = ChatType,
                    data = {},
                })
            elseif ChatType == "location" then
                table.insert(PhoneData.Chats[NumberKey].messages[ChatDate].messages, {
                    message = "Konum",
                    time = ChatTime,
                    sender = PhoneData.PlayerData.citizenid,
                    type = ChatType,
                    data = {
                        x = Pos.x,
                        y = Pos.y,
                    },
                })
            end
            TriggerServerEvent('qb-phone:server:UpdateMessages', PhoneData.Chats[NumberKey].messages, ChatNumber, true)
            NumberKey = GetKeyByNumber(ChatNumber)
            ReorganizeChats(NumberKey)
        end
    else
        table.insert(PhoneData.Chats, {
            name = IsNumberInContacts(ChatNumber),
            number = ChatNumber,
            messages = {},
        })
        NumberKey = GetKeyByNumber(ChatNumber)
        table.insert(PhoneData.Chats[NumberKey].messages, {
            date = ChatDate,
            messages = {},
        })
        ChatKey = GetKeyByDate(NumberKey, ChatDate)
        if ChatType == "message" or ChatType == "image" then
            table.insert(PhoneData.Chats[NumberKey].messages[ChatKey].messages, {
                message = ChatMessage,
                time = ChatTime,
                sender = PhoneData.PlayerData.citizenid,
                type = ChatType,
                data = {},
            })
        elseif ChatType == "location" then
            table.insert(PhoneData.Chats[NumberKey].messages[ChatKey].messages, {
                message = "Konum",
                time = ChatTime,
                sender = PhoneData.PlayerData.citizenid,
                type = ChatType,
                data = {
                    x = Pos.x,
                    y = Pos.y,
                },
            })
        end
        TriggerServerEvent('qb-phone:server:UpdateMessages', PhoneData.Chats[NumberKey].messages, ChatNumber, true)
        NumberKey = GetKeyByNumber(ChatNumber)
        ReorganizeChats(NumberKey)
    end

    QBCore.Functions.TriggerCallback('qb-phone:server:GetContactPicture', function(Chat)
        SendNUIMessage({
            action = "UpdateChat",
            chatData = Chat,
            chatNumber = ChatNumber,
        })
    end,  PhoneData.Chats[GetKeyByNumber(ChatNumber)])
end)

RegisterNUICallback('SharedLocation', function(data)
    local x = data.coords.x
    local y = data.coords.y

    SetNewWaypoint(x, y)
    SendNUIMessage({
        action = "PhoneNotification",
        PhoneNotify = {
            title = "Whatsapp",
            text = "Konum ayarlandı",
            icon = "whatsapp",
            color = "#25D366",
            timeout = 1500,
        },
    })
end)

RegisterCommand("testnotif", function(source, raw, args)
    NotifyData = {
        title = "Whatsapp",
        text = "ananı sikim",
        icon = "whatsapp",
        color = "#25D366",
        timeout = 2500,
        type = "normal",
    }
    sendScreenNotify(NotifyData)
end)

RegisterNetEvent('qb-phone:client:UpdateMessages')
AddEventHandler('qb-phone:client:UpdateMessages', function(ChatMessages, SenderNumber, New)
    local Sender = IsNumberInContacts(SenderNumber)

    local NumberKey = GetKeyByNumber(SenderNumber)

    if NumberKey == nil then NumberKey = SenderNumber end

    if New then
        PhoneData.Chats[NumberKey] = {
            name = IsNumberInContacts(SenderNumber),
            number = SenderNumber,
            messages = ChatMessages
        }

        if PhoneData.Chats[NumberKey].Unread ~= nil then
            PhoneData.Chats[NumberKey].Unread = PhoneData.Chats[NumberKey].Unread + 1
        else
            PhoneData.Chats[NumberKey].Unread = 1
        end

        if PhoneData.isOpen then
            if SenderNumber ~= PhoneData.PlayerData.charinfo.phone then
                PhoneNotify = {
                    title = "Whatsapp",
                    text = ""..IsNumberInContacts(SenderNumber).." kişisinden yeni mesaj",
                    icon = "whatsapp",
                    color = "#25D366",
                    timeout = 1500,
                    type = "normal"
                },
                sendScreenNotify(PhoneNotify)
            else
                SendNUIMessage({
                    action = "PhoneNotification",
                    PhoneNotify = {
                        title = "Whatsapp",
                        text = "Kendine mesaj atacak kadar yalnız mısın?",
                        icon = "whatsapp",
                        color = "#25D366",
                        timeout = 4000,
                    },
                })

            end

            NumberKey = GetKeyByNumber(SenderNumber)
            ReorganizeChats(NumberKey)

            Wait(100)
            QBCore.Functions.TriggerCallback('qb-phone:server:GetContactPictures', function(Chats)
                SendNUIMessage({
                    action = "UpdateChat",
                    chatData = Chats[GetKeyByNumber(SenderNumber)],
                    chatNumber = SenderNumber,
                    Chats = Chats,
                })
            end,  PhoneData.Chats)
        else
            SendNUIMessage({
                action = "Notification",
                NotifyData = {
                    title = "Whatsapp", 
                    content = IsNumberInContacts(SenderNumber).." kişisinden yeni mesaj", 
                    icon = "whatsapp", 
                    timeout = 3500, 
                    color = "#25D366",
                },
            })

            Config.PhoneApplications['whatsapp'].Alerts = Config.PhoneApplications['whatsapp'].Alerts + 1
            TriggerServerEvent('qb-phone:server:SetPhoneAlerts', "whatsapp")
        end
    else
        PhoneData.Chats[NumberKey].messages = ChatMessages

        if PhoneData.Chats[NumberKey].Unread ~= nil then
            PhoneData.Chats[NumberKey].Unread = PhoneData.Chats[NumberKey].Unread + 1
        else
            PhoneData.Chats[NumberKey].Unread = 1
        end

        if PhoneData.isOpen then
            if SenderNumber ~= PhoneData.PlayerData.charinfo.phone then

                SendNUIMessage({
                    action = "PhoneNotification",
                    PhoneNotify = {
                        title = "Whatsapp",
                        text = ""..IsNumberInContacts(SenderNumber).." kişisinden yeni bir mesaj",
                        icon = "whatsapp",
                        color = "#25D366",
                        timeout = 1500,
                    },
                })
            else
                SendNUIMessage({
                    action = "PhoneNotification",
                    PhoneNotify = {
                        title = "Whatsapp",
                        text = "Kendine mesaj atacak kadar yalnız mısın?",
                        icon = "whatsapp",
                        color = "#25D366",
                        timeout = 4000,
                    },
                })
            end

            NumberKey = GetKeyByNumber(SenderNumber)
            ReorganizeChats(NumberKey)
            
            Wait(100)
            QBCore.Functions.TriggerCallback('qb-phone:server:GetContactPictures', function(Chats)
                SendNUIMessage({
                    action = "UpdateChat",
                    chatData = Chats[GetKeyByNumber(SenderNumber)],
                    chatNumber = SenderNumber,
                    Chats = Chats,
                })
            end,  PhoneData.Chats)
        else

            -- SendNUIMessage({
            --     action = "Notification",
            --     NotifyData = {
            --         title = "Whatsapp", 
            --         content = IsNumberInContacts(SenderNumber).." kişisinden yeni mesaj", 
            --         icon = "whatsapp", 
            --         timeout = 3500, 
            --         color = "#25D366",
            --     },
            -- })
            NotifyData = {
                title = "Whatsapp",
                text = ""..IsNumberInContacts(SenderNumber).." kişisinden yeni mesaj",
                icon = "whatsapp",
                color = "#25D366",
                timeout = 2500,
                type = "normal",
            }
            sendScreenNotify(NotifyData)
            NumberKey = GetKeyByNumber(SenderNumber)
            ReorganizeChats(NumberKey)

            Config.PhoneApplications['whatsapp'].Alerts = Config.PhoneApplications['whatsapp'].Alerts + 1
            TriggerServerEvent('qb-phone:server:SetPhoneAlerts', "whatsapp")
        end
    end
end)

RegisterNetEvent("qb-phone-new:client:BankNotify")
AddEventHandler("qb-phone-new:client:BankNotify", function(text)
    SendNUIMessage({
        action = "Notification",
        NotifyData = {
            title = "Banka", 
            content = text, 
            icon = "fas fa-university", 
            timeout = 3500, 
            color = "#ff002f",
        },
    })
end)

RegisterNetEvent('qb-phone:client:NewMailNotify')
AddEventHandler('qb-phone:client:NewMailNotify', function(MailData)
    if PhoneData.isOpen then
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "Mail",
                text = MailData.sender.. " adresinden yeni mail",
                icon = "fas fa-envelope",
                color = "#ff002f",
                timeout = 1500,
            },
        })
    else
        SendNUIMessage({
            action = "Notification",
            NotifyData = {
                title = "Mail", 
                content = MailData.sender.. " adresinden yeni mail", 
                icon = "fas fa-envelope", 
                timeout = 3500, 
                color = "#ff002f",
            },
        })
    end
    Config.PhoneApplications['mail'].Alerts = Config.PhoneApplications['mail'].Alerts + 1
    TriggerServerEvent('qb-phone:server:SetPhoneAlerts', "mail")
end)

RegisterNUICallback('PostAdvert', function(data)
    TriggerServerEvent('qb-phone:server:AddAdvert', data.message, data.image)
end)

RegisterNetEvent('qb-phone:client:UpdateAdverts')
AddEventHandler('qb-phone:client:UpdateAdverts', function(Adverts, LastAd)
    PhoneData.Adverts = Adverts

    if PhoneData.isOpen then
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "Advertisement",
                text = "Yeni ilan "..LastAd,
                icon = "fas fa-layer-group",
                color = "#ff8f1a",
                timeout = 2500,
            },
        })
    else
        NotifyData = {
            title = "Sarı Sayfalar", 
            text = "Yeni ilan "..LastAd, 
            icon = "twitter",
            color = "#ff8f1a",
            timeout = 3500,
            type = "normal"
        }
        sendScreenNotify(NotifyData)
    end

    SendNUIMessage({
        action = "RefreshAdverts",
        Adverts = PhoneData.Adverts
    })
end)

RegisterNUICallback('LoadAdverts', function()
    SendNUIMessage({
        action = "RefreshAdverts",
        Adverts = PhoneData.Adverts
    })
end)

RegisterNUICallback('ClearAlerts', function(data, cb)
    local chat = data.number
    local ChatKey = GetKeyByNumber(chat)

    if PhoneData.Chats[ChatKey].Unread ~= nil then
        local newAlerts = (Config.PhoneApplications['whatsapp'].Alerts - PhoneData.Chats[ChatKey].Unread)
        Config.PhoneApplications['whatsapp'].Alerts = newAlerts
        TriggerServerEvent('qb-phone:server:SetPhoneAlerts', "whatsapp", newAlerts)

        PhoneData.Chats[ChatKey].Unread = 0

        SendNUIMessage({
            action = "RefreshWhatsappAlerts",
            Chats = PhoneData.Chats,
        })
        SendNUIMessage({ action = "RefreshAppAlerts", AppData = Config.PhoneApplications })
    end
end)

RegisterNUICallback('PayInvoice', function(data, nuiCb)
    local sender = data.sender
    local amount = data.amount
    local invoiceId = data.invoiceId

    QBCore.Functions.TriggerCallback('esx_billing:payBill', function(data, cb)
        TriggerEvent("qb-phone:refresh")
        nuiCb(data)
    end, invoiceId)
end)

RegisterNUICallback('DeclineInvoice', function(data, cb)
    local sender = data.sender
    local amount = data.amount
    local invoiceId = data.invoiceId

    QBCore.Functions.TriggerCallback('qb-phone:server:DeclineInvoice', function(CanPay, Invoices)
        PhoneData.Invoices = Invoices
        cb('ok')
    end, sender, amount, invoiceId)
end)

RegisterNUICallback('EditContact', function(data, cb)
    local NewName = data.CurrentContactName
    local NewNumber = data.CurrentContactNumber
    local NewIban = data.CurrentContactIban
    local NewImage = data.CurrentContactImage
    local OldName = data.OldContactName
    local OldNumber = data.OldContactNumber
    local OldIban = data.OldContactIban

    for k, v in pairs(PhoneData.Contacts) do
        if v.name == OldName and v.number == OldNumber then
            v.name = NewName
            v.number = NewNumber
            v.iban = NewIban
            v.image = NewImage
        end
    end
    if PhoneData.Chats[NewNumber] ~= nil and next(PhoneData.Chats[NewNumber]) ~= nil then
        PhoneData.Chats[NewNumber].name = NewName
    end
    Citizen.Wait(100)
    cb(PhoneData.Contacts)
    TriggerServerEvent('qb-phone:server:EditContact', NewName, NewNumber, NewIban, NewImage, OldName, OldNumber, OldIban)
end)

RegisterNUICallback('EditContactNote', function(data, cb)
    local Name = data.ContactName
    local Number = data.ContactNumber
    local NewNote = data.ContactNote

    for k, v in pairs(PhoneData.Contacts) do
        if v.name == Name and v.number == Number then
            v.note = NewNote
        end
    end
    Citizen.Wait(100)
    cb(PhoneData.Contacts)
    print(Name, Number, NewNote)
    TriggerServerEvent('qb-phone:server:EditContactNote', Name, Number, NewNote)
end)

local function escape_str(s)
	-- local in_char  = {'\\', '"', '/', '\b', '\f', '\n', '\r', '\t'}
	-- local out_char = {'\\', '"', '/',  'b',  'f',  'n',  'r',  't'}
	-- for i, c in ipairs(in_char) do
	--   s = s:gsub(c, '\\' .. out_char[i])
	-- end
	return s
end

function GenerateTweetId()
    local tweetId = "TWEET-"..math.random(11111111, 99999999)
    return tweetId
end

RegisterNetEvent('qb-phone:client:UpdateHashtags')
AddEventHandler('qb-phone:client:UpdateHashtags', function(Handle, msgData)
    if PhoneData.Hashtags[Handle] ~= nil then
        table.insert(PhoneData.Hashtags[Handle].messages, msgData)
    else
        PhoneData.Hashtags[Handle] = {
            hashtag = Handle,
            messages = {}
        }
        table.insert(PhoneData.Hashtags[Handle].messages, msgData)
    end

    SendNUIMessage({
        action = "UpdateHashtags",
        Hashtags = PhoneData.Hashtags,
    })
end)

RegisterNUICallback('GetHashtagMessages', function(data, cb)
    if PhoneData.Hashtags[data.hashtag] ~= nil and next(PhoneData.Hashtags[data.hashtag]) ~= nil then
        cb(PhoneData.Hashtags[data.hashtag])
    else
        cb(nil)
    end
end)

RegisterNUICallback('GetTweets', function(data, cb)
    cb(PhoneData.Tweets)
end)

RegisterNUICallback('UpdateProfilePicture', function(data)
    local pf = data.profilepicture

    PhoneData.MetaData.profilepicture = pf
    
    TriggerServerEvent('qb-phone:server:SaveMetaData', PhoneData.MetaData)
end)

local patt = "[?!@#]"

RegisterNUICallback('PostNewTweet', function(data, cb)
    local TweetMessage = {
        firstName = PhoneData.PlayerData.charinfo.firstname,
        lastName = PhoneData.PlayerData.charinfo.lastname,
        message = escape_str(data.Message),
        image = data.Image,
        time = data.Date,
        tweetId = GenerateTweetId(),
        picture = data.Picture
    }

    local TwitterMessage = data.Message
    local MentionTag = TwitterMessage:split("@")
    local Hashtag = TwitterMessage:split("#")

    for i = 2, #Hashtag, 1 do
        local Handle = Hashtag[i]:split(" ")[1]
        if Handle ~= nil or Handle ~= "" then
            local InvalidSymbol = string.match(Handle, patt)
            if InvalidSymbol then
                Handle = Handle:gsub("%"..InvalidSymbol, "")
            end
            TriggerServerEvent('qb-phone:server:UpdateHashtags', Handle, TweetMessage)
        end
    end

    for i = 2, #MentionTag, 1 do
        local Handle = MentionTag[i]:split(" ")[1]
        if Handle ~= nil or Handle ~= "" then
            local Fullname = Handle:split("_")
            local Firstname = Fullname[1]
            table.remove(Fullname, 1)
            local Lastname = table.concat(Fullname, " ")

            if (Firstname ~= nil and Firstname ~= "") and (Lastname ~= nil and Lastname ~= "") then
                if Firstname ~= PhoneData.PlayerData.charinfo.firstname and Lastname ~= PhoneData.PlayerData.charinfo.lastname then
                    TriggerServerEvent('qb-phone:server:MentionedPlayer', Firstname, Lastname, TweetMessage)
                else
                    SetTimeout(2500, function()
                        SendNUIMessage({
                            action = "PhoneNotification",
                            PhoneNotify = {
                                title = "Twitter", 
                                text = "Kendini etiketleyemezsin", 
                                icon = "twitter",
                                color = "#1DA1F2",
                            },
                        })
                    end)
                end
            end
        end
    end

    table.insert(PhoneData.Tweets, TweetMessage)
    Citizen.Wait(100)
    cb(PhoneData.Tweets)

    TriggerServerEvent('qb-phone:server:UpdateTweets', PhoneData.Tweets, TweetMessage)
end)

RegisterNetEvent('qb-phone:client:TransferMoney')
AddEventHandler('qb-phone:client:TransferMoney', function(amount, newmoney)
    PhoneData.PlayerData.money.bank = newmoney
    if PhoneData.isOpen then
        SendNUIMessage({ action = "PhoneNotification", PhoneNotify = { title = "Banka", text = "Hesabınıza $"..amount.." para girişi oldu.", icon = "fas fa-university", color = "#8c7ae6", }, })
        SendNUIMessage({ action = "UpdateBank", NewBalance = PhoneData.PlayerData.money.bank })
    else
        SendNUIMessage({ action = "Notification", NotifyData = { title = "Banka", content = "Hesabınıza $"..amount.." para girişi oldu.", icon = "fas fa-university", timeout = 2500, color = nil, }, })
    end
end)

RegisterCommand("bildtest", function()
    NotifyData = {
        title = "Deneme Bildirimi", 
        text = "deniyoruz amk", 
        icon = "twitter",
        color = "#29a7f3",
        timeout = 3500,
        type = "normal"
    }
    sendScreenNotify(NotifyData)
end)


function sendScreenNotify(data)
    SendNUIMessage({
        action = "screenNotify",
        screenNotify =  data
    }) 
end

function closeScreenNotify()
    SendNUIMessage({
        action = "closeScreenNotify"
    })
end

RegisterNetEvent('qb-phone:client:UpdateTweets')
AddEventHandler('qb-phone:client:UpdateTweets', function(src, Tweets, NewTweetData)
    PhoneData.Tweets = Tweets
    local MyPlayerId = PhoneData.PlayerData.source

    if src ~= MyPlayerId then
        if not PhoneData.isOpen then

            NotifyData = {
                title = "Yeni Tweet (@"..NewTweetData.firstName.." "..NewTweetData.lastName..")", 
                text = NewTweetData.message, 
                icon = "twitter",
                color = "#29a7f3",
                timeout = 3500,
                type = "normal"
            }
            sendScreenNotify(NotifyData)
        else
            SendNUIMessage({
                action = "PhoneNotification",
                PhoneNotify = {
                    title = "Yeni Tweet  (@"..NewTweetData.firstName.." "..NewTweetData.lastName..")", 
                    text = NewTweetData.message, 
                    icon = "twitter",
                    color = "#29a7f3",
                },
            })
        end
    else
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "Twitter", 
                text = "Tweet paylaşıldı", 
                icon = "twitter",
                color = "#29a7f3",
                timeout = 1000,
            },
        })
    end
end)

RegisterNUICallback('GetMentionedTweets', function(data, cb)
    cb(PhoneData.MentionedTweets)
end)

RegisterNUICallback('GetHashtags', function(data, cb)
    if PhoneData.Hashtags ~= nil and next(PhoneData.Hashtags) ~= nil then
        cb(PhoneData.Hashtags)
    else
        cb(nil)
    end
end)

RegisterNetEvent('qb-phone:client:GetMentioned')
AddEventHandler('qb-phone:client:GetMentioned', function(TweetMessage, AppAlerts)
    Config.PhoneApplications["twitter"].Alerts = AppAlerts
    if not PhoneData.isOpen then
        SendNUIMessage({ action = "Notification", NotifyData = { title = "Bir tweette sizden bahsedildi", content = TweetMessage.message, icon = "twitter", timeout = 3500, color = nil, }, })
    else
        SendNUIMessage({ action = "PhoneNotification", PhoneNotify = { title = "Bir tweette sizden bahsedildi", text = TweetMessage.message, icon = "twitter", color = "#1DA1F2", }, })
    end
    local TweetMessage = {firstName = TweetMessage.firstName, lastName = TweetMessage.lastName, message = escape_str(TweetMessage.message), time = TweetMessage.time, picture = TweetMessage.picture}
    table.insert(PhoneData.MentionedTweets, TweetMessage)
    SendNUIMessage({ action = "RefreshAppAlerts", AppData = Config.PhoneApplications })
    SendNUIMessage({ action = "UpdateMentionedTweets", Tweets = PhoneData.MentionedTweets })
end)

RegisterNUICallback('ClearMentions', function()
    Config.PhoneApplications["twitter"].Alerts = 0
    SendNUIMessage({
        action = "RefreshAppAlerts",
        AppData = Config.PhoneApplications
    })
    TriggerServerEvent('qb-phone:server:SetPhoneAlerts', "twitter", 0)
    SendNUIMessage({ action = "RefreshAppAlerts", AppData = Config.PhoneApplications })
end)

RegisterNUICallback('ClearGeneralAlerts', function(data)
    SetTimeout(400, function()
        Config.PhoneApplications[data.app].Alerts = 0
        SendNUIMessage({
            action = "RefreshAppAlerts",
            AppData = Config.PhoneApplications
        })
        TriggerServerEvent('qb-phone:server:SetPhoneAlerts', data.app, 0)
        SendNUIMessage({ action = "RefreshAppAlerts", AppData = Config.PhoneApplications })
    end)
end)

function string:split(delimiter)
    local result = { }
    local from  = 1
    local delim_from, delim_to = string.find( self, delimiter, from  )
    while delim_from do
      table.insert( result, string.sub( self, from , delim_from-1 ) )
      from  = delim_to + 1
      delim_from, delim_to = string.find( self, delimiter, from  )
    end
    table.insert( result, string.sub( self, from  ) )
    return result
end

RegisterNUICallback('TransferMoney', function(data, cb)
    data.amount = tonumber(data.amount)
    if tonumber(PhoneData.PlayerData.money.bank) >= data.amount then
        local amaountata = PhoneData.PlayerData.money.bank - data.amount
        TriggerServerEvent('qb-phone:server:TransferMoney', data.iban, data.amount)
        local cbdata = {
            CanTransfer = true,
            NewAmount = amaountata 
        }
        cb(cbdata)
    else
        local cbdata = {
            CanTransfer = false,
            NewAmount = nil,
        }
        cb(cbdata)
    end
end)

RegisterNUICallback("SetAlarm", function(data)
    PhoneData.Alarms[#PhoneData.Alarms + 1] = data.clock
end)

RegisterNUICallback("GetAlarmData", function(data, cb)
    cb(PhoneData.Alarms)
end)

RegisterNUICallback("DeleteAlarm", function(data)
    if PhoneData.Alarms[tonumber(data.id) + 1] then
        table.remove(PhoneData.Alarms, tonumber(data.id) + 1)
    end
end)

Citizen.CreateThread(function()
    while true do
        local a, b, c, d, e = GetLocalTime()
        d = d + 3
        if d < 10 then
            d = "0"..d
        end
        if e < 10 then
            e = "0"..e
        end
        for i = 1, #PhoneData.Alarms do
            if PhoneData.Alarms[i] == d..":"..e then
                TriggerEvent("qb-phone:PlayAlarmSound")
            end
        end
        Citizen.Wait(5000)
    end
end)

RegisterNetEvent("qb-phone:PlayAlarmSound")
AddEventHandler("qb-phone:PlayAlarmSound", function()
    -- SendNUIMessage({
    --     action = "PlayAlarm"
    -- })
    TriggerServerEvent("InteractSound_SV:PlayOnSource", "ringing", 0.2)
end)

RegisterNUICallback('CanTransferMoney', function(data, cb)
    local amount = tonumber(data.amountOf)
    local iban = data.sendTo
    local PlayerData = QBCore.Functions.GetPlayerData()

    if (PlayerData.money.bank - amount) >= 0 then
        QBCore.Functions.TriggerCallback('qb-phone:server:CanTransferMoney', function(Transferd)
            if Transferd then
                cb({TransferedMoney = true, NewBalance = (PlayerData.money.bank - amount)})
            else
                cb({TransferedMoney = false})
            end
        end, amount, iban)
    else
        cb({TransferedMoney = false})
    end
end)

RegisterNUICallback('GetWhatsappChats', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetContactPictures', function(Chats)
        cb(Chats)
    end, PhoneData.Chats)
end)

RegisterNUICallback('CallContact', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetCallState', function(CanCall, IsOnline)
        local status = { 
            CanCall = CanCall, 
            IsOnline = IsOnline,
            InCall = PhoneData.CallData.InCall,
        }
        cb(status)
        if CanCall and not status.InCall and (data.ContactData.number ~= PhoneData.PlayerData.charinfo.phone) then
            CallContact(data.ContactData, data.Anonymous)
        end
    end, data.ContactData)
end)

function GenerateCallId(caller, target)
    local CallId = math.ceil(((tonumber(caller) + tonumber(target)) / 100 * 1))
    return CallId
end

CallContact = function(CallData, AnonymousCall)
    local RepeatCount = 0
    PhoneData.CallData.CallType = "outgoing"
    PhoneData.CallData.InCall = true
    PhoneData.CallData.TargetData = CallData
    PhoneData.CallData.AnsweredCall = false
    PhoneData.CallData.CallId = GenerateCallId(PhoneData.PlayerData.charinfo.phone, CallData.number)
	PlayPedRingtone("Dial_and_Remote_Ring", PlayerPedId(), 1)
    TriggerServerEvent('qb-phone:server:CallContact', PhoneData.CallData.TargetData, PhoneData.CallData.CallId, AnonymousCall)
    TriggerServerEvent('qb-phone:server:SetCallState', true)
    
    for i = 1, Config.CallRepeats + 1, 1 do
        if not PhoneData.CallData.AnsweredCall then
            if RepeatCount + 1 ~= Config.CallRepeats + 1 then
                if PhoneData.CallData.InCall then
                    RepeatCount = RepeatCount + 1
                  --  TriggerServerEvent("InteractSound_SV:PlayOnSource", "demo", 0.1)
                else
					StopPedRingtone(PlayerPedId())
                    break
                end
                Citizen.Wait(Config.RepeatTimeout)
            else
				StopPedRingtone(PlayerPedId())
                CancelCall()
                break
            end
        else
			StopPedRingtone(PlayerPedId())
            break
        end
    end
end

Call = function(CallData)
    local RepeatCount = 0
    PhoneData.CallData.CallType = "outgoing"
    PhoneData.CallData.InCall = true
    PhoneData.CallData.TargetData = CallData
    PhoneData.CallData.AnsweredCall = false
    PhoneData.CallData.CallId = GenerateCallId(PhoneData.PlayerData.charinfo.phone, CallData.number)
	PlayPedRingtone("Dial_and_Remote_Ring", PlayerPedId(), 1)
    TriggerServerEvent('qb-phone:server:CallContact', PhoneData.CallData.TargetData, PhoneData.CallData.CallId, false)
    TriggerServerEvent('qb-phone:server:SetCallState', true)
    
    for i = 1, Config.CallRepeats + 1, 1 do
        if not PhoneData.CallData.AnsweredCall then
            if RepeatCount + 1 ~= Config.CallRepeats + 1 then
                if PhoneData.CallData.InCall then
                    RepeatCount = RepeatCount + 1
                  --  TriggerServerEvent("InteractSound_SV:PlayOnSource", "demo", 0.1)
                else
					StopPedRingtone(PlayerPedId())
                    break
                end
                Citizen.Wait(Config.RepeatTimeout)
            else
				StopPedRingtone(PlayerPedId())
                CancelCall()
                break
            end
        else
			StopPedRingtone(PlayerPedId())
            break
        end
    end
end

CancelCall = function()
    TriggerServerEvent('qb-phone:server:CancelCall', GetPlayerServerId(PlayerId()), PhoneData.CallData)
    if PhoneData.CallData.CallType == "ongoing" then
        -- exports.saltychat:SetRadioChannel('', true)
    end

    -- if (PhoneData.CallData.CallId ~= nil and exports.tokovoip_script:isPlayerInChannel(PhoneData.CallData.CallId)) then
    --     exports.tokovoip_script:removePlayerFromRadio(PhoneData.CallData.CallId)
    -- end

    PhoneData.CallData.CallType = nil
    PhoneData.CallData.InCall = false
    PhoneData.CallData.AnsweredCall = false
    PhoneData.CallData.TargetData = {}
    PhoneData.CallData.CallId = nil

    if not PhoneData.isOpen then
        StopAnimTask(PlayerPedId(), PhoneData.AnimationData.lib, PhoneData.AnimationData.anim, 2.5)
        deletePhone()
        PhoneData.AnimationData.lib = nil
        PhoneData.AnimationData.anim = nil
    else
        PhoneData.AnimationData.lib = nil
        PhoneData.AnimationData.anim = nil
    end

    TriggerServerEvent('qb-phone:server:SetCallState', false)

    if not PhoneData.isOpen then
        SendNUIMessage({ 
            action = "Notification", 
            NotifyData = { 
                title = "Telefon",
                content = "Arama sonlandırıldı", 
                icon = "fas fa-phone", 
                timeout = 3500, 
                color = "#e84118",
            }, 
        })
  
    else
        SendNUIMessage({ 
            action = "PhoneNotification", 
            PhoneNotify = { 
                title = "Telefon", 
                text = "Arama sonlandırıldı", 
                icon = "fas fa-phone", 
                color = "#e84118", 
            }, 
        })

        SendNUIMessage({
            action = "SetupHomeCall",
            CallData = PhoneData.CallData,
        })

        SendNUIMessage({
            action = "CancelOutgoingCall",
        })
    end
end

RegisterNetEvent("myevent:CsoundStatus")
AddEventHandler("myevent:CsoundStatus", function(musicId, data, distance, range, vol, playerid)
local pos = GetEntityCoords(GetPlayerPed(-1))
	if Vdist(pos, data.position) <= range and playerid ~= GetPlayerServerId(NetworkGetEntityOwner(GetPlayerPed(-1))) then
		exports['xsound']:PlayUrlPos(musicId, data.link, 1, data.position)
		exports['xsound']:Distance(musicId, distance)
		exports['xsound']:setVolume(musicId, vol)
	end
end)


RegisterNetEvent('qb-phone:client:CancelCall')
AddEventHandler('qb-phone:client:CancelCall', function()
    if PhoneData.CallData.CallType == "ongoing" then
        SendNUIMessage({
            action = "CancelOngoingCall"
        })
    end

    -- if (PhoneData.CallData.CallId ~= nil and exports.tokovoip_script:isPlayerInChannel(PhoneData.CallData.CallId)) then
    --     exports.tokovoip_script:removePlayerFromRadio(PhoneData.CallData.CallId)
    -- end

	PlaySoundFromEntity(-1, "Hang_Up", PlayerPedId(), "Phone_SoundSet_Michael", 0, 0)
    PhoneData.CallData.CallType = nil
    PhoneData.CallData.InCall = false
    PhoneData.CallData.AnsweredCall = false
    PhoneData.CallData.TargetData = {}

    if not PhoneData.isOpen then
        StopAnimTask(PlayerPedId(), PhoneData.AnimationData.lib, PhoneData.AnimationData.anim, 2.5)
        deletePhone()
        PhoneData.AnimationData.lib = nil
        PhoneData.AnimationData.anim = nil
    else
        PhoneData.AnimationData.lib = nil
        PhoneData.AnimationData.anim = nil
    end

    TriggerServerEvent('qb-phone:server:SetCallState', false)

    if not PhoneData.isOpen then
        -- SendNUIMessage({ 
        --     action = "Notification", 
        --     NotifyData = { 
        --         title = "Telefon",
        --         content = "Arama sonlandırıldı", 
        --         icon = "fas fa-phone", 
        --         timeout = 3500, 
        --         color = "#e84118",
        --     }, 
        -- })
        closeScreenNotify()         
    else
        SendNUIMessage({ 
            action = "PhoneNotification", 
            PhoneNotify = { 
                title = "Phone", 
                text = "Arama sonlandırıldı", 
                icon = "fas fa-phone", 
                color = "#e84118", 
            }, 
        })

        SendNUIMessage({
            action = "SetupHomeCall",
            CallData = PhoneData.CallData,
        })

        SendNUIMessage({
            action = "CancelOutgoingCall",
        })
    end
end)

RegisterNetEvent('qb-phone:client:GetCalled')
AddEventHandler('qb-phone:client:GetCalled', function(CallerNumber, CallId, AnonymousCall)
    local RepeatCount = 0
    local CallData = {
        number = CallerNumber,
        name = IsNumberInContacts(CallerNumber),
        anonymous = AnonymousCall
    }

    if AnonymousCall then
        CallData.name = "Anonymous"
    end

    PhoneData.CallData.CallType = "incoming"
    PhoneData.CallData.InCall = true
    PhoneData.CallData.AnsweredCall = false
    PhoneData.CallData.TargetData = CallData
    PhoneData.CallData.CallId = CallId

    TriggerServerEvent('qb-phone:server:SetCallState', true)

    SendNUIMessage({
        action = "SetupHomeCall",
        CallData = PhoneData.CallData,
    })

    for i = 1, Config.CallRepeats + 1, 1 do
        if not PhoneData.CallData.AnsweredCall then
            if RepeatCount + 1 ~= Config.CallRepeats + 1 then
                if PhoneData.CallData.InCall then
                    QBCore.Functions.TriggerCallback('qb-phone:server:HasPhone', function(HasPhone)
                        if HasPhone then
                            RepeatCount = RepeatCount + 1
							TriggerServerEvent("InteractSound_SV:PlayOnSource", "cellcall", 0.8)
                            local pos = GetEntityCoords(GetPlayerPed(-1))
                            --TriggerServerEvent("InteractSound_SV:PlayOnSource", "ringing", 0.2)
                            TriggerServerEvent("myevent:soundStatus", IDm, { position = pos, link = "https://cdn.discordapp.com/attachments/246766870269657088/708363278816116787/cellcall.ogg" }, 8.5, 10.0, 0.8)
                            
                            if not PhoneData.isOpen then

                                NotifyData = {
                                    calldata = PhoneData.CallData,
                                    timeout = 60000 / 2,
                                    type = "phone"
                                }
                                sendScreenNotify(NotifyData)
                            end
                        end
                    end)
                else
                    SendNUIMessage({
                        action = "IncomingCallAlert",
                        CallData = PhoneData.CallData.TargetData,
                        Canceled = true,
                        AnonymousCall = AnonymousCall,
                    })
                    TriggerServerEvent('qb-phone:server:AddRecentCall', "missed", CallData)
                    break
                end
                Citizen.Wait(Config.RepeatTimeout)
            else
                SendNUIMessage({
                    action = "IncomingCallAlert",
                    CallData = PhoneData.CallData.TargetData,
                    Canceled = true,
                    AnonymousCall = AnonymousCall,
                })
                TriggerServerEvent('qb-phone:server:AddRecentCall', "missed", CallData)
                break
            end
        else
            TriggerServerEvent('qb-phone:server:AddRecentCall', "missed", CallData)
            break
        end
    end
end)

RegisterNUICallback('CancelOutgoingCall', function()
    CancelCall()
end)

RegisterNUICallback('DenyIncomingCall', function()
    CancelCall()
end)

RegisterNUICallback('CancelOngoingCall', function()
    CancelCall()
end)

RegisterNUICallback('AnswerCall', function()
    AnswerCall()
end)

function AnswerCall()
    if (PhoneData.CallData.CallType == "incoming" or PhoneData.CallData.CallType == "outgoing") and PhoneData.CallData.InCall and not PhoneData.CallData.AnsweredCall then
        PhoneData.CallData.CallType = "ongoing"
        PhoneData.CallData.AnsweredCall = true
        PhoneData.CallData.CallTime = 0

        SendNUIMessage({ action = "AnswerCall", CallData = PhoneData.CallData})
        SendNUIMessage({ action = "SetupHomeCall", CallData = PhoneData.CallData})

        TriggerServerEvent('qb-phone:server:SetCallState', true)

        if PhoneData.isOpen then
            DoPhoneAnimation('cellphone_text_to_call')
        else
            DoPhoneAnimation('cellphone_call_listen_base')
        end

        Citizen.CreateThread(function()
            while true do
                if PhoneData.CallData.AnsweredCall then
                    PhoneData.CallData.CallTime = PhoneData.CallData.CallTime + 1
                    SendNUIMessage({
                        action = "UpdateCallTime",
                        Time = PhoneData.CallData.CallTime,
                        Name = PhoneData.CallData.TargetData.name,
                    })
                else
                    break
                end

                Citizen.Wait(1000)
            end
        end)
        
        -- exports.tokovoip_script:addPlayerToRadio(PhoneData.CallData.CallId, false)
        TriggerServerEvent('qb-phone:server:AnswerCall', GetPlayerServerId(PlayerId()), PhoneData.CallData)

        -- exports.saltychat:EstablishCall(PhoneData.CallData.CallId, "Call")
    else
        PhoneData.CallData.InCall = false
        PhoneData.CallData.CallType = nil
        PhoneData.CallData.AnsweredCall = false
        SendNUIMessage({ 
            action = "PhoneNotification", 
            PhoneNotify = { 
                title = "Telefon", 
                text = "Gelen arama yok", 
                icon = "fas fa-phone", 
                color = "#e84118", 
            }, 
        })
    end
end

RegisterNetEvent('qb-phone:client:AnswerCall')
AddEventHandler('qb-phone:client:AnswerCall', function()

    if (PhoneData.CallData.CallType == "incoming" or PhoneData.CallData.CallType == "outgoing") and PhoneData.CallData.InCall and not PhoneData.CallData.AnsweredCall then
        PhoneData.CallData.CallType = "ongoing"
        PhoneData.CallData.AnsweredCall = true
        PhoneData.CallData.CallTime = 0

        SendNUIMessage({ action = "AnswerCall", CallData = PhoneData.CallData})
        SendNUIMessage({ action = "SetupHomeCall", CallData = PhoneData.CallData})

        TriggerServerEvent('qb-phone:server:SetCallState', true)

        if PhoneData.isOpen then
            DoPhoneAnimation('cellphone_text_to_call')
        else
            DoPhoneAnimation('cellphone_call_listen_base')
        end

        Citizen.CreateThread(function()
            while true do
                if PhoneData.CallData.AnsweredCall then
                    PhoneData.CallData.CallTime = PhoneData.CallData.CallTime + 1
                    SendNUIMessage({
                        action = "UpdateCallTime",
                        Time = PhoneData.CallData.CallTime,
                        Name = PhoneData.CallData.TargetData.name,
                    })
                else
                    break
                end

                Citizen.Wait(1000)
            end
        end)

        -- exports.tokovoip_script:addPlayerToRadio(PhoneData.CallData.CallId, false)
    else
        PhoneData.CallData.InCall = false
        PhoneData.CallData.CallType = nil
        PhoneData.CallData.AnsweredCall = false

        SendNUIMessage({ 
            action = "PhoneNotification", 
            PhoneNotify = { 
                title = "Telefon", 
                text = "Gelen arama yok", 
                icon = "fas fa-phone", 
                color = "#e84118", 
            }, 
        })
    end
end)

RegisterNUICallback("GetCurrentFoodCompany", function(data, cb)
    cb(Config.FoodCompany)
end)

RegisterNUICallback("GetCurrentFoodWorker", function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetCurrentFoodWorker', function(workers)
        cb(workers)
    end, data.FoodJob)
end)

RegisterNUICallback("GetCurrentArrests", function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetCurrentArrests', function(arrests)
        cb(arrests)
    end)
end)

-- AddEventHandler('onResourceStop', function(resource)
--     if resource == GetCurrentResourceName() then
--         -- SetNuiFocus(false, false)
--     end
-- end)

RegisterNUICallback('FetchSearchResults', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:FetchResult', function(result)
        cb(result)
    end, data.input)
end)

RegisterNUICallback('FetchVehicleResults', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetVehicleSearchResults', function(result)
        if result ~= nil then 
            for k, v in pairs(result) do
                QBCore.Functions.TriggerCallback('police:IsPlateFlagged', function(flagged)
                    result[k].isFlagged = flagged
                end, result[k].plate)
                Citizen.Wait(50)
            end
        end
        cb(result)
    end, data.input)
end)

RegisterNUICallback('FetchVehicleScan', function(data, cb)
    local vehicle = QBCore.Functions.GetClosestVehicle()
    local plate = GetVehicleNumberPlateText(vehicle)
    local model = GetEntityModel(vehicle)

    QBCore.Functions.TriggerCallback('qb-phone:server:ScanPlate', function(result)
        QBCore.Functions.TriggerCallback('police:IsPlateFlagged', function(flagged)
            result.isFlagged = flagged
            local vehicleInfo = QBCore.Shared.Vehicles[QBCore.Shared.VehicleModels[model]["model"]] ~= nil and QBCore.Shared.Vehicles[QBCore.Shared.VehicleModels[model]["model"]] or {["brand"] = "Unknown brand..", ["name"] = ""}
            result.label = vehicleInfo["name"]
            cb(result)
        end, plate)
    end, plate)
end)

RegisterNetEvent('qb-phone:client:addPoliceAlert')
AddEventHandler('qb-phone:client:addPoliceAlert', function(alertData)
    PlayerJob = QBCore.Functions.GetPlayerData().job
    if PlayerJob.name == 'police' and PlayerJob.onduty then
        SendNUIMessage({
            action = "AddPoliceAlert",
            alert = alertData,
        })
    end
end)

RegisterNUICallback('SetAlertWaypoint', function(data)
    local coords = data.alert.coords

    QBCore.Functions.Notify('GPS Location set: '..data.alert.title)
    SetNewWaypoint(coords.x, coords.y)
end)

RegisterNUICallback('RemoveSuggestion', function(data, cb)
    local data = data.data

    if PhoneData.SuggestedContacts ~= nil and next(PhoneData.SuggestedContacts) ~= nil then
        for k, v in pairs(PhoneData.SuggestedContacts) do
            if (data.name[1] == v.name[1] and data.name[2] == v.name[2]) and data.number == v.number and data.bank == v.bank then
                table.remove(PhoneData.SuggestedContacts, k)
            end
        end
    end
end)

function GetClosestPlayer()
    local closestPlayers = QBCore.Functions.GetPlayersFromCoords()
    local closestDistance = -1
    local closestPlayer = -1
    local coords = GetEntityCoords(GetPlayerPed(-1))

    for i=1, #closestPlayers, 1 do
        if closestPlayers[i] ~= PlayerId() then
            local pos = GetEntityCoords(GetPlayerPed(closestPlayers[i]))
            local distance = GetDistanceBetweenCoords(pos.x, pos.y, pos.z, coords.x, coords.y, coords.z, true)

            if closestDistance == -1 or closestDistance > distance then
                closestPlayer = closestPlayers[i]
                closestDistance = distance
            end
        end
	end

	return closestPlayer, closestDistance
end

RegisterCommand("commendme", function(source, raw, args)
    TriggerServerEvent('qb-phone:server:GiveContactDetailsTest')
end)

RegisterNetEvent('qb-phone:client:GiveContactDetails')
AddEventHandler('qb-phone:client:GiveContactDetails', function()
    local ped = GetPlayerPed(-1)

    local player, distance = GetClosestPlayer()
    if player ~= -1 and distance < 2.5 then
        local PlayerId = GetPlayerServerId(player)
        TriggerServerEvent('qb-phone:server:GiveContactDetails', PlayerId)
    else
        QBCore.Functions.Notify("No one is around!", "error")
    end
end)

-- Citizen.CreateThread(function()
--     Wait(1000)
--     TriggerServerEvent('qb-phone:server:GiveContactDetails', 1)
-- end)

RegisterNUICallback('DeleteContact', function(data, cb)
    local Name = data.CurrentContactName
    local Number = data.CurrentContactNumber
    local Account = data.CurrentContactIban

    for k, v in pairs(PhoneData.Contacts) do
        if v.name == Name and v.number == Number then
            table.remove(PhoneData.Contacts, k)
            if PhoneData.isOpen then
                SendNUIMessage({
                    action = "PhoneNotification",
                    PhoneNotify = {
                        title = "Telefon",
                        text = "Kişi silindi", 
                        icon = "fa fa-phone-alt",
                        color = "#04b543",
                        timeout = 1500,
                    },
                })
            else
                SendNUIMessage({
                    action = "Notification",
                    NotifyData = {
                        title = "Telefon", 
                        content = "Kişi silindi", 
                        icon = "fa fa-phone-alt", 
                        timeout = 3500, 
                        color = "#04b543",
                    },
                })
            end
            break
        end
    end
    Citizen.Wait(100)
    cb(PhoneData.Contacts)
    if PhoneData.Chats[Number] ~= nil and next(PhoneData.Chats[Number]) ~= nil then
        PhoneData.Chats[Number].name = Number
    end
    TriggerServerEvent('qb-phone:server:RemoveContact', Name, Number)
end)

RegisterNetEvent('qb-phone:client:AddNewSuggestion')
AddEventHandler('qb-phone:client:AddNewSuggestion', function(SuggestionData)
    table.insert(PhoneData.SuggestedContacts, SuggestionData)

    if PhoneData.isOpen then
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "Telefon",
                text = "Yeni bir önerilen kişi var", 
                icon = "phone",
                color = "#04b543",
                timeout = 1500,
            },
        })
    else
        NotifyData = {
            title = "Telefon", 
            text = "Yeni bir önerilen kişi var",
            icon = "phone",
            color = "#04b543",
            timeout = 3500,
            type = "normal",
        }
        sendScreenNotify(NotifyData)


    end

    Config.PhoneApplications["phone"].Alerts = Config.PhoneApplications["phone"].Alerts + 1
    TriggerServerEvent('qb-phone:server:SetPhoneAlerts', "phone", Config.PhoneApplications["phone"].Alerts)
end)

RegisterNUICallback('GetCryptoData', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-crypto:server:GetCryptoData', function(CryptoData)
        cb(CryptoData)
    end, data.crypto)
end)

RegisterNUICallback('BuyCrypto', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-crypto:server:BuyCrypto', function(CryptoData)
        cb(CryptoData)
    end, data)
end)

RegisterNUICallback('SellCrypto', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-crypto:server:SellCrypto', function(CryptoData)
        cb(CryptoData)
    end, data)
end)

RegisterNUICallback('TransferCrypto', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-crypto:server:TransferCrypto', function(CryptoData)
        cb(CryptoData)
    end, data)
end)

RegisterNetEvent('qb-phone:client:RemoveBankMoney')
AddEventHandler('qb-phone:client:RemoveBankMoney', function(amount)
    if PhoneData.isOpen then
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "Banka",
                text = "Hesabınızdan  $"..amount..",- para çıktı", 
                icon = "fas fa-university", 
                color = "#ff002f",
                timeout = 3500,
            },
        })
    else
        SendNUIMessage({
            action = "Notification",
            NotifyData = {
                title = "Banka",
                content = "Hesabınızdan $"..amount..",- para çıktı", 
                icon = "fas fa-university",
                timeout = 3500, 
                color = "#ff002f",
            },
        })
    end
end)

RegisterNetEvent('qb-phone:client:AddTransaction')
AddEventHandler('qb-phone:client:AddTransaction', function(SenderData, TransactionData, Message, Title)
    local Data = {
        TransactionTitle = Title,
        TransactionMessage = Message,
    }
    
    table.insert(PhoneData.CryptoTransactions, Data)

    if PhoneData.isOpen then
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "Crypto",
                text = Message, 
                icon = "fas fa-chart-pie",
                color = "#04b543",
                timeout = 1500,
            },
        })
    else
        SendNUIMessage({
            action = "Notification",
            NotifyData = {
                title = "Crypto",
                content = Message, 
                icon = "fas fa-chart-pie",
                timeout = 3500, 
                color = "#04b543",
            },
        })
    end

    SendNUIMessage({
        action = "UpdateTransactions",
        CryptoTransactions = PhoneData.CryptoTransactions
    })

    TriggerServerEvent('qb-phone:server:AddTransaction', Data)
end)

RegisterNUICallback('GetCryptoTransactions', function(data, cb)
    local Data = {
        CryptoTransactions = PhoneData.CryptoTransactions
    }
    cb(Data)
end)

RegisterNUICallback('GetAvailableRaces', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-lapraces:server:GetRaces', function(Races)
        cb(Races)
    end)
end)

RegisterNUICallback('JoinRace', function(data)
    TriggerServerEvent('qb-lapraces:server:JoinRace', data.RaceData)
end)

RegisterNUICallback('LeaveRace', function(data)
    TriggerServerEvent('qb-lapraces:server:LeaveRace', data.RaceData)
end)

RegisterNUICallback('StartRace', function(data)
    TriggerServerEvent('qb-lapraces:server:StartRace', data.RaceData.RaceId)
end)

RegisterNetEvent('qb-phone:client:UpdateLapraces')
AddEventHandler('qb-phone:client:UpdateLapraces', function()
    SendNUIMessage({
        action = "UpdateRacingApp",
    })
end)

RegisterNUICallback('GetRaces', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-lapraces:server:GetListedRaces', function(Races)
        cb(Races)
    end)
end)

RegisterNUICallback('GetTrackData', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-lapraces:server:GetTrackData', function(TrackData, CreatorData)
        TrackData.CreatorData = CreatorData
        cb(TrackData)
    end, data.RaceId)
end)

RegisterNUICallback('SetupRace', function(data, cb)
    TriggerServerEvent('qb-lapraces:server:SetupRace', data.RaceId, tonumber(data.AmountOfLaps))
end)

RegisterNUICallback('HasCreatedRace', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-lapraces:server:HasCreatedRace', function(HasCreated)
        cb(HasCreated)
    end)
end)

RegisterNUICallback('IsInRace', function(data, cb)
    local InRace = exports['qb-lapraces']:IsInRace()
    cb(InRace)
end)

RegisterNUICallback('IsAuthorizedToCreateRaces', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-lapraces:server:IsAuthorizedToCreateRaces', function(IsAuthorized, NameAvailable)
        local data = {
            IsAuthorized = IsAuthorized,
            IsBusy = exports['qb-lapraces']:IsInEditor(),
            IsNameAvailable = NameAvailable,
        }
        cb(data)
    end, data.TrackName)
end)

RegisterNUICallback('StartTrackEditor', function(data, cb)
    TriggerServerEvent('qb-lapraces:server:CreateLapRace', data.TrackName)
end)

RegisterNUICallback('GetRacingLeaderboards', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-lapraces:server:GetRacingLeaderboards', function(Races)
        cb(Races)
    end)
end)

RegisterNUICallback('RaceDistanceCheck', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-lapraces:server:GetRacingData', function(RaceData)
        local ped = GetPlayerPed(-1)
        local coords = GetEntityCoords(ped)
        local checkpointcoords = RaceData.Checkpoints[1].coords
        local dist = GetDistanceBetweenCoords(coords, checkpointcoords.x, checkpointcoords.y, checkpointcoords.z, true)
        if dist <= 115.0 then
            if data.Joined then
                TriggerEvent('qb-lapraces:client:WaitingDistanceCheck')
            end
            cb(true)
        else
            QBCore.Functions.Notify('You are too far from the race, you navigation is set to race.', 'error', 5000)
            SetNewWaypoint(checkpointcoords.x, checkpointcoords.y)
            cb(false)
        end
    end, data.RaceId)
end)

RegisterNUICallback('IsBusyCheck', function(data, cb)
    if data.check == "editor" then
        cb(exports['qb-lapraces']:IsInEditor())
    else
        cb(exports['qb-lapraces']:IsInRace())
    end
end)

RegisterNUICallback('CanRaceSetup', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-lapraces:server:CanRaceSetup', function(CanSetup)
        cb(CanSetup)
    end)
end)

RegisterNUICallback('GetPlayerHouses', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetPlayerHouses', function(Houses)
        cb(Houses)
    end)
end)

RegisterNUICallback('GetPlayerKeys', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetHouseKeys', function(Keys)
        cb(Keys)
    end)
end)

RegisterNUICallback('SetHouseLocation', function(data, cb)
    SetNewWaypoint(data.HouseData.HouseData.coords.enter.x, data.HouseData.HouseData.coords.enter.y)
    QBCore.Functions.Notify("Your location has been set ! " .. data.HouseData.HouseData.adress .. "!", "success")
end)

RegisterNUICallback('RemoveKeyholder', function(data)
    TriggerServerEvent('qb-houses:server:removeHouseKey', data.HouseData.name, {
        citizenid = data.HolderData.citizenid,
        firstname = data.HolderData.charinfo.firstname,
        lastname = data.HolderData.charinfo.lastname,
    })
end)

RegisterNUICallback('TransferCid', function(data, cb)
    local TransferedCid = data.newBsn

    QBCore.Functions.TriggerCallback('qb-phone:server:TransferCid', function(CanTransfer)
        cb(CanTransfer)
    end, TransferedCid, data.HouseData)
end)

RegisterNUICallback('FetchPlayerHouses', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:MeosGetPlayerHouses', function(result)
        cb(result)
    end, data.input)
end)

RegisterNUICallback('SetGPSLocation', function(data, cb)
    local ped = GetPlayerPed(-1)

    SetNewWaypoint(data.coords.x, data.coords.y)
    QBCore.Functions.Notify('GPS is ingesteld!', 'success')
end)

RegisterNUICallback('SetApartmentLocation', function(data, cb)
    local ApartmentData = data.data.appartmentdata
    local TypeData = Apartments.Locations[ApartmentData.type]

    SetNewWaypoint(TypeData.coords.enter.x, TypeData.coords.enter.y)
    QBCore.Functions.Notify('Your location has been set !', 'success')
end)

RegisterNUICallback('GetCurrentLawyers', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetCurrentLawyers', function(lawyers)
        cb(lawyers)
    end)
end)


RegisterNetEvent('qb-phone:client:toclientcallcenter')
AddEventHandler('qb-phone:client:toclientcallcenter', function()
    TriggerServerEvent('qb-phone:server:emergencylineadd')
end)

RegisterNUICallback('GetCurrentEmergency', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetCurrentEmergency', function(Emergencya)
        cb(Emergencya)
    end)
end)

RegisterNUICallback('GetCurrentTaxi', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetCurrentTaxi', function(taxi)
        cb(taxi)
    end)
end)

RegisterNUICallback('GetCurrentTow', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetCurrentTow', function(tow)
        cb(tow)
    end)
end)

RegisterNUICallback('GetCurrentMech', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-phone:server:GetCurrentMech', function(mech)
        cb(mech)
    end)
end)


RegisterNUICallback('SetupStoreApps', function(data, cb)
    local PlayerData = QBCore.Functions.GetPlayerData()
    local data = {
        StoreApps = Config.StoreApps,
        PhoneData = PlayerData.metadata["phonedata"]
    }
    cb(data)
end)

function GetFirstAvailableSlot()
    local retval = 0
    for k, v in pairs(Config.PhoneApplications) do
        retval = retval + 1
    end
    return (retval + 1)
end

local CanDownloadApps = false

RegisterNUICallback('InstallApplication', function(data, cb)
    local ApplicationData = Config.StoreApps[data.app]
    local NewSlot = GetFirstAvailableSlot()

    --if not CanDownloadApps then
      --  return
   -- end
    
    if NewSlot <= Config.MaxSlots then
        TriggerServerEvent('qb-phone:server:InstallApplication', {
            app = data.app,
        })
        cb({
            app = data.app,
            data = ApplicationData
        })
    else
        cb(false)
    end
end)

RegisterNUICallback('RemoveApplication', function(data, cb)
    TriggerServerEvent('qb-phone:server:RemoveInstallation', data.app)
end)

RegisterNetEvent('qb-phone:RefreshPhone')
AddEventHandler('qb-phone:RefreshPhone', function()
    LoadPhone()
    SetTimeout(250, function()
        SendNUIMessage({
            action = "RefreshAlerts",
            AppData = Config.PhoneApplications,
        })
    end)
end)

RegisterNUICallback('GetTruckerData', function(data, cb)
    local TruckerMeta = QBCore.Functions.GetPlayerData().metadata["jobrep"]["trucker"]
    local TierData = exports['qb-trucker']:GetTier(TruckerMeta)
    cb(TierData)
end)

-- Disables GTA controls when display is active
-- this allows for NUI input with ingame input
function DisableDisplayControlActions()
    playerPed = PlayerPedId()
    DisablePlayerFiring(playerPed, true)
    SetPedCanPlayGestureAnims(playerPed, false)

    DisableControlAction(0, 24, true) -- Attack
    DisableControlAction(0, 257, true) -- Attack 2
    DisableControlAction(0, 25, true) -- Aim
    DisableControlAction(0, 263, true) -- Melee Attack 1
    DisableControlAction(0, 45, true) -- Reload
    DisableControlAction(0, 21, true) -- left shift
    DisableControlAction(0, 22, true) -- Jump
    DisableControlAction(0, 23, true) -- F
    DisableControlAction(0, 182, true) -- L
    DisableControlAction(0, 80, true) -- R
    DisableControlAction(0, 311, true) -- K
    DisableControlAction(0, 26, true) -- C
    DisableControlAction(0, 75, true) -- F
    DisableControlAction(0, 157, true)
    DisableControlAction(0, 158, true)
    DisableControlAction(0, 160, true)
    DisableControlAction(0, 164, true)
    DisableControlAction(0, 165, true)
    DisableControlAction(0, 44, true) -- Cover
    DisableControlAction(0, 37, true) -- Select Weapon
    DisableControlAction(0, 288,  true) -- Disable phone
    DisableControlAction(0, 245,  true) -- Disable chat
    DisableControlAction(0, 289, true) -- Inventory
    DisableControlAction(0, 170, true) -- Animations
    DisableControlAction(0, 167, true) -- Job
    DisableControlAction(0, 244, true) -- Ragdoll
    DisableControlAction(0, 303, true) -- Car lock
    DisableControlAction(0, 29, true) -- B ile işaret
    DisableControlAction(0, 81, true) -- B ile işaret
    DisableControlAction(0, 26, true) -- Disable looking behind
    DisableControlAction(0, 73, true) -- Disable clearing animation
    DisableControlAction(2, 199, true) -- Disable pause screen
    DisableControlAction(2, 36, true) -- Disable going stealth
    DisableControlAction(0, 47, true)  -- Disable weapon
    DisableControlAction(0, 264, true) -- Disable melee
    DisableControlAction(0, 257, true) -- Disable melee
    DisableControlAction(0, 140, true) -- Disable melee
    DisableControlAction(0, 141, true) -- Disable melee
    DisableControlAction(0, 142, true) -- Disable melee
    
end

function InPhone()
    return PhoneData.isOpen
end
local AracCikariliyor = false
RegisterNUICallback("getCar", function(data)
  if not AracCikariliyor then 
        AracCikariliyor = true
        vehicle = data.data
        local gameVehicles = QBCore.Functions.GetVehicles()

        for i = 1, #gameVehicles do
            if DoesEntityExist(gameVehicles[i]) then
                if GetVehicleNumberPlateText(gameVehicles[i]) == vehicle.plate then
                    local vehicleCoords = GetEntityCoords(gameVehicles[i])
                    SetNewWaypoint(vehicleCoords.x, vehicleCoords.y)
                    QBCore.Functions.Notify(vehicle.plate.. " plakalı aracını zaten dışarıda", "error")
                    return
                end
            end
        end

        local coords = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 1.5, 6.0, 1.0)
        local spawnPoint = {x = coords.x,  y = coords.y, z = coords.z, r = 1.0}
        wait = 1000 * math.random(15, 20)
        QBCore.Functions.Notify("Aracınız vale tarafından getiriliyor. Tahmini bekleme süresi: " ..wait/1000, "inform")
        Citizen.Wait(wait)
        QBCore.Functions.SpawnVehicle(vehicle.vehicle, function(veh)
            QBCore.Functions.TriggerCallback('qb-garage:server:GetVehicleProperties', function(properties)

                if vehicle.plate ~= nil then
                    TriggerServerEvent('qb-garages:server:UpdateOutsideVehicles', OutsideVehicles)
                end

                QBCore.Functions.SetVehicleProperties(veh, properties)
                SetVehicleNumberPlateText(veh, vehicle.plate)
                
                exports['LegacyFuel']:SetFuel(veh, vehicle.fuel)
                SetEntityAsMissionEntity(veh, true, true)
                TriggerServerEvent('qb-garage:server:updateVehicleState', 0, vehicle.plate, vehicle.garage)
                TriggerEvent("x-hotwire:give-keys", veh)
                SetVehicleEngineOn(veh, true, true)
            end, vehicle.plate)
        end, spawnPoint, true)
        AracCikariliyor = false
    end
end)

RegisterNUICallback("transferCar", function(data)
    local player = QBCore.Functions.GetClosestPlayer()
    local serverid = GetPlayerServerId(player)
    if player ~= -1 then
        TriggerServerEvent("qb-phone:transferVehicle", data.vehicle, serverid)
    else
        QBCore.Functions.Notify("Yakında kimse yok!", "error")
    end
end)

function mathTrim(value)
    if value then
		return (string.gsub(value, "^%s*(.-)%s*$", "%1"))
	else
		return nil
	end
end

RegisterNUICallback('TakeImage', function(data, cb)
    CreateMobilePhone(1)
    CellCamActivate(true, true)
    takePhoto = true
    SetNuiFocus(false, false)
    while takePhoto do
        Citizen.Wait(1)

        if IsControlJustPressed(1, 27) then -- Toogle Mode
            frontCam = not frontCam
            CellFrontCamActivate(frontCam)
        elseif IsControlJustPressed(1, 177) then -- CANCEL
            DestroyMobilePhone()
            CellCamActivate(false, false)
            cb("")
            takePhoto = false
            OpenPhone()
            break
        elseif IsControlJustPressed(1, 176) then -- TAKE.. PIC
            exports['screenshot-basic']:requestScreenshotUpload("", "files[]", function(data)
                local resp = json.decode(data)
                DestroyMobilePhone()
                CellCamActivate(false, false)
                OpenPhone()
                cb(resp.attachments[1].proxy_url)
            end)
        
            takePhoto = false
        end

        HideHudComponentThisFrame(7)
        HideHudComponentThisFrame(8)
        HideHudComponentThisFrame(9)
        HideHudComponentThisFrame(6)
        HideHudComponentThisFrame(19)
        HideHudAndRadarThisFrame()
    end
end)

function CellFrontCamActivate(activate)
	return Citizen.InvokeNative(0x2491A93618B7D838, activate)
end


Keys = {
	["ESC"] = 322, ["F1"] = 288, ["F2"] = 289, ["F3"] = 170, ["F5"] = 166, ["F6"] = 167, ["F7"] = 168, ["F8"] = 169, ["F9"] = 56, ["F10"] = 57, 
	["~"] = 243, ["1"] = 157, ["2"] = 158, ["3"] = 160, ["4"] = 164, ["5"] = 165, ["6"] = 159, ["7"] = 161, ["8"] = 162, ["9"] = 163, ["-"] = 84, ["="] = 83, ["BACKSPACE"] = 177, 
	["TAB"] = 37, ["Q"] = 44, ["W"] = 32, ["E"] = 38, ["R"] = 45, ["T"] = 245, ["Y"] = 246, ["U"] = 303, ["P"] = 199, ["["] = 39, ["]"] = 40, ["ENTER"] = 18,
	["CAPS"] = 137, ["A"] = 34, ["S"] = 8, ["D"] = 9, ["F"] = 23, ["G"] = 47, ["H"] = 74, ["K"] = 311, ["L"] = 182,
	["LEFTSHIFT"] = 21, ["Z"] = 20, ["X"] = 73, ["C"] = 26, ["V"] = 0, ["B"] = 29, ["N"] = 249, ["M"] = 244, [","] = 82, ["."] = 81,
	["LEFTCTRL"] = 36, ["LEFTALT"] = 19, ["SPACE"] = 22, ["RIGHTCTRL"] = 70, 
	["HOME"] = 213, ["PAGEUP"] = 10, ["PAGEDOWN"] = 11, ["DELETE"] = 178,
	["LEFT"] = 174, ["RIGHT"] = 175, ["TOP"] = 27, ["DOWN"] = 173,
	["NENTER"] = 201, ["N4"] = 108, ["N5"] = 60, ["N6"] = 107, ["N+"] = 96, ["N-"] = 97, ["N7"] = 117, ["N8"] = 61, ["N9"] = 118
}

LockKeyboard = false

RegisterNUICallback("LockKeyboard", function()
    LockKeyboard = true

    while LockKeyboard do
        Citizen.Wait(5)
        DisableControlAction(0, 21, true)
        DisableControlAction(0, 22, true)
        DisableControlAction(0, 24, true) -- Attack
        DisableControlAction(0, 257, true) -- Attack 2
        DisableControlAction(0, 25, true) -- Aim
        DisableControlAction(0, 263, true) -- Melee Attack 1

        DisableControlAction(0, 30, true)
        DisableControlAction(0, 31, true)
        DisableControlAction(0, 32, true)
        DisableControlAction(0, 33, true)
        DisableControlAction(0, 34, true)
        DisableControlAction(0, 35, true)

        DisableControlAction(0, Keys['Q'], true) -- Cover
        DisableControlAction(0, Keys['TAB'], true) -- Select Weapon
        DisableControlAction(0, Keys['F'], true) -- Also 'enter'?
        DisableControlAction(0, Keys['U'], true) -- Ragdoll

        DisableControlAction(0, Keys['F1'], true) -- Disable phone
        DisableControlAction(0, Keys['F2'], true) -- Inventory
        DisableControlAction(0, Keys['F3'], true) -- Animations

        DisableControlAction(0, Keys['C'], true) -- Disable looking behind
        DisableControlAction(0, Keys['X'], true) -- Disable clearing animation
        DisableControlAction(2, Keys['P'], true) -- Disable pause screen

        DisableControlAction(0, 59, true) -- Disable steering in vehicle
        DisableControlAction(0, 71, true) -- Disable driving forward in vehicle
        DisableControlAction(0, 72, true) -- Disable reversing in vehicle

        DisableControlAction(2, Keys['LEFTCTRL'], true) -- Disable going stealth

        DisableControlAction(0, 264, true) -- Disable melee
        DisableControlAction(0, 257, true) -- Disable melee
        DisableControlAction(0, 140, true) -- Disable melee
        DisableControlAction(0, 141, true) -- Disable melee
        DisableControlAction(0, 142, true) -- Disable melee
        DisableControlAction(0, 143, true) -- Disable melee
        DisableControlAction(0, 75, true)  -- Disable exit vehicle
        DisableControlAction(27, 75, true) -- Disable exit vehicle
    end
end)

RegisterNUICallback("ReleaseKeyboard", function()
    LockKeyboard = false
end)