# vlast-phone
[qb-phone](https://github.com/qbcore-framework/qb-phone) iOS Theme made by TORCHIZM for discord.gg/vlast

> Requirements
* [screenshot-basic](https://github.com/citizenfx/screenshot-basic)

### Installation:
* If not exists, add this codes to qb-core/server/player.lua > CheckPlayerData function
```lua
PlayerData.metadata["phonedata"] = PlayerData.metadata["phonedata"] ~= nil and PlayerData.metadata["phonedata"] or {
        SerialNumber = QBCore.Player.CreateSerialNumber(),
        InstalledApps = {},
    }

PlayerData.metadata["phone"] = PlayerData.metadata["phone"] ~= nil and PlayerData.metadata["phone"] or {}
```

* If not exists, Add this code as a new function to qb-core/server/player.lua
```lua
QBCore.Player.CreateSerialNumber = function()
    local UniqueFound = false
    local SerialNumber = nil

    while not UniqueFound do
        SerialNumber = math.random(11111111, 99999999)
        QBCore.Functions.ExecuteSql(true, "SELECT COUNT(*) as count FROM `players` WHERE `metadata` LIKE '%"..SerialNumber.."%'", function(result)
            if result[1].count == 0 then
                UniqueFound = true
            end
        end)
    end
    return SerialNumber
end
```


### Todo List:
* Clock (Currently Working On)
* Remake Bank
* Yellowpages multi-image support
* Twitter Accounts
* Gallery App
* Images will save to gallery
* Redesing Wanteds
* Improve Zoom

### Main Menu
![Main Menu](/readme/1.png)
-----
### Bank (Developing rn)
> Dependencies
> * [vlast-bank](https://github.com/torchizm/vlast-bank)


![Bank](/readme/2.png)
-----
### Calculator with all functions
![Calculator](/readme/calculator.png)
-----
### Mail (just static html page)
![Mail](/readme/mail.png)
-----
### Messages
![Messages](/readme/messages_1.png)
![Messages](/readme/messages_2.png)
![Messages](/readme/messages_3.png)
-----
### Phone
![Phone](/readme/phone_1.png)
![Phone](/readme/phone_2.png)
![Phone](/readme/phone_3.png)
![Phone](/readme/phone_4.png)
![Phone](/readme/phone_5.png)
-----
### Property
> Dependencies
> - [qb-vehicleshop](https://github.com/qbcore-framework/qb-vehicleshop)
> - [qb-houses](https://github.com/qbcore-framework/qb-houses)

![Property](/readme/property.png)
-----
### Racing (deault)
> Dependencies
> - [qb-lapraces](https://github.com/qbcore-framework/qb-lapraces)

![Racing](/readme/racing.png)
-----
### Settings
![Settings](/readme/settings_1.png)
![Settings](/readme/settings_2.png)
![Settings](/readme/settings_3.png)
![Wallpapers](/readme/wallpaper_1.png)
-----
### Twitter
![Twitter](/readme/twitter_1.png)
![Twitter](/readme/twitter_2.png)
-----
### Wanteds
> Dependencies
> - [torchizm-mdw](https://github.com/torchizm/torchizm-mdw)

![Wanteds](/readme/wanteds.png)
-----
### Yellow Pages
![Yellow Pages](/readme/yellow_pages_1.png)
-----
### Zoom
![Zoom](/readme/zoom_1.png)
![Zoom](/readme/zoom_2.png)
-----
### Clock
![Stopwatch](/readme/clock_1.png)
![Stopwatch](/readme/clock_2.png)
-----