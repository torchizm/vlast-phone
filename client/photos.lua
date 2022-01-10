RegisterNUICallback('GetPhotos', function(data, cb)
    cb(PhoneData.Photos)
end)

RegisterNUICallback('SaveImage', function(data, cb)
    if (data.data.location == nil) then
        data.data.location = GetTheStreet()
    end

	QBCore.Functions.TriggerCallback('qb-phone:server:SavePhoto', function(id, citizenid, date)
		data.id = id
		data.citizenid = citizenid
		data.created_at = date
		table.insert(PhoneData.Photos, data)
        cb(PhoneData.Photos)
    end, data.url, data.data)	
end)

RegisterNUICallback('DeleteImage', function(data, cb)
    for k,v in pairs(PhoneData.Photos) do
        if v.id == data.id then
            table.remove(PhoneData.Photos, k)
        end
    end
    TriggerServerEvent('qb-phone:server:DeletePhoto', data.id)
	cb(PhoneData.Photos)
end)

function GetTheStreet()
    local x, y, z = table.unpack(GetEntityCoords(GetPlayerPed(-1), true))
    local currentStreetHash, intersectStreetHash = GetStreetNameAtCoord(x, y, z, currentStreetHash, intersectStreetHash)
    currentStreetName = GetStreetNameFromHashKey(currentStreetHash)
    intersectStreetName = GetStreetNameFromHashKey(intersectStreetHash)
    zone = tostring(GetNameOfZone(x, y, z))
    playerStreetsLocation = ZoneNames[tostring(zone)]

    if not zone then
        zone = "UNKNOWN"
        ZoneNames['UNKNOWN'] = zone
    elseif not ZoneNames[tostring(zone)] then
        local undefinedZone = zone .. " " .. x .. " " .. y .. " " .. z
        ZoneNames[tostring(zone)] = "Bilinmeyen Bölge"
    end

    if (intersectStreetName ~= nil and intersectStreetName ~= "") or (currentStreetName ~= nil and currentStreetName ~= "") then
        playerStreetsLocation = currentStreetName
    else
        playerStreetsLocation = ZoneNames[tostring(zone)]
    end

	return playerStreetsLocation
end

ZoneNames = {
	AIRP = "Los Santos International Airport",
	ALAMO = "Alamo Sea",
	ALTA = "Alta",
	ARMYB = "Fort Zancudo",
	BANHAMC = "Banham Canyon Dr",
	BANNING = "Banning",
	BAYTRE = "Baytree Canyon",
	BEACH = "Vespucci Beach",
	BHAMCA = "Banham Canyon",
	BRADP = "Braddock Pass",
	BRADT = "Braddock Tunnel",
	BURTON = "Burton",
	CALAFB = "Calafia Bridge",
	CANNY = "Raton Canyon",
	CCREAK = "Cassidy Creek",
	CHAMH = "Chamberlain Hills",
	CHIL = "Vinewood Hills",
	CHU = "Chumash",
	CMSW = "Chiliad Mountain State Wilderness",
	CYPRE = "Cypress Flats",
	DAVIS = "Davis",
	DELBE = "Del Perro Beach",
	DELPE = "Del Perro",
	DELSOL = "La Puerta",
	DESRT = "Grand Senora Desert",
	DOWNT = "Downtown",
	DTVINE = "Downtown Vinewood",
	EAST_V = "East Vinewood",
	EBURO = "El Burro Heights",
	ELGORL = "El Gordo Lighthouse",
	ELYSIAN = "Elysian Island",
	GALFISH = "Galilee",
	GALLI = "Galileo Park",
	golf = "GWC and Golfing Society",
	GRAPES = "Grapeseed",
	GREATC = "Great Chaparral",
	HARMO = "Harmony",
	HAWICK = "Hawick",
	HORS = "Vinewood Racetrack",
	HUMLAB = "Humane Labs and Research",
	JAIL = "Bolingbroke Penitentiary",
	KOREAT = "Little Seoul",
	LACT = "Land Act Reservoir",
	LAGO = "Lago Zancudo",
	LDAM = "Land Act Dam",
	LEGSQU = "Legion Square",
	LMESA = "La Mesa",
	LOSPUER = "La Puerta",
	MIRR = "Mirror Park",
	MORN = "Morningwood",
	MOVIE = "Richards Majestic",
	MTCHIL = "Mount Chiliad",
	MTGORDO = "Mount Gordo",
	MTJOSE = "Mount Josiah",
	MURRI = "Murrieta Heights",
	NCHU = "North Chumash",
	NOOSE = "N.O.O.S.E",
	OCEANA = "Pacific Ocean",
	PALCOV = "Paleto Cove",
	PALETO = "Paleto Bay",
	PALFOR = "Paleto Forest",
	PALHIGH = "Palomino Highlands",
	PALMPOW = "Palmer-Taylor Power Station",
	PBLUFF = "Pacific Bluffs",
	PBOX = "Pillbox Hill",
	PROCOB = "Procopio Beach",
	RANCHO = "Rancho",
	RGLEN = "Richman Glen",
	RICHM = "Richman",
	ROCKF = "Rockford Hills",
	RTRAK = "Redwood Lights Track",
	SanAnd = "San Andreas",
	SANCHIA = "San Chianski Mountain Range",
	SANDY = "Sandy Shores",
	SKID = "Mission Row",
	SLAB = "Stab City",
	STAD = "Maze Bank Arena",
	STRAW = "Strawberry",
	TATAMO = "Tataviam Mountains",
	TERMINA = "Terminal",
	TEXTI = "Textile City",
	TONGVAH = "Tongva Hills",
	TONGVAV = "Tongva Valley",
	VCANA = "Vespucci Canals",
	VESP = "Vespucci",
	VINE = "Vinewood",
	WINDF = "Ron Alternates Wind Farm",
	WVINE = "West Vinewood",
	ZANCUDO = "Zancudo River",
	ZP_ORT = "Port of South Los Santos",
	ZQ_UAR = "Davis Quartz"
}