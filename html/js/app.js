NM = {}
NM.Phone = {}
NM.Screen = {}
NM.Phone.Functions = {}
NM.Phone.Animations = {}
NM.Phone.Notifications = {}
NM.Phone.PlayingAudio = undefined;
NM.Phone.ContactColors = {
    0: "#9b59b6",
    1: "#3498db",
    2: "#e67e22",
    3: "#e74c3c",
    4: "#1abc9c",
    5: "#9c88ff",
}

NM.Phone.Data = {
    currentApplication: null,
    PlayerData: {},
    BankHistory: {},
    Applications: {},
    IsOpen: false,
    CallActive: false,
    MetaData: {},
    PlayerJob: {},
    AnonymousCall: false,
}

NM.Phone.Data.MaxSlots = 16;

OpenedChatData = {
    number: null,
}

var CanOpenApp = true;

function IsAppJobBlocked(joblist, myjob) {
    var retval = false;
    if (joblist.length > 0) {
        $.each(joblist, function(i, job){
            if (job == myjob && NM.Phone.Data.PlayerData.job.onduty) {
                retval = true;
            }
        });
    }
    return retval;
}

NM.Phone.Functions.closemaybe = function() {
    NM.Phone.Animations.TopSlideUp('.phone-application-container', 400, -160);
    NM.Phone.Animations.TopSlideUp('.'+NM.Phone.Data.currentApplication+"-app", 400, -160);
    CanOpenApp = false;
    setTimeout(function(){
        NM.Phone.Functions.ToggleApp(NM.Phone.Data.currentApplication, "none");
        CanOpenApp = true;
    }, 400)
    NM.Phone.Functions.HeaderTextColor("white", 300);
    NM.Phone.Data.currentApplication = null;
}

NM.Phone.Functions.SetupApplications = function(data) {
    NM.Phone.Data.Applications = data.applications;

    var i;
    for (i = 1; i <= NM.Phone.Data.MaxSlots; i++) {
        var applicationSlot = $(".phone-applications").find('[data-appslot="'+i+'"]');
        $(applicationSlot).html("");
        $(applicationSlot).css({
            "background-color":"transparent"
        });
        $(applicationSlot).prop('title', "");
        $(applicationSlot).removeData('app');
        $(applicationSlot).removeData('placement')
    }


    $.each(data.applications, function(index, app) {
        var applicationSlot = $(".phone-applications").find('[data-appslot="'+app.slot+'"]');
 
        var blockedapp = IsAppJobBlocked(app.blockedjobs, NM.Phone.Data.PlayerJob.name)

        if ((!app.job || app.job === NM.Phone.Data.PlayerJob.name) && !blockedapp) {
            // $(applicationSlot).css({"background-image":app.color});
            // $(applicationSlot).css({"background-image":`url("./img/apps/${app.app}");`});
            if (app.slot > 4) {
                var icon = `<img class="ApplicationIcon" src="./img/apps/${app.image}.png"></img> <p class="application-description">${app.tooltipText}</p>`;
                // var icon = `<i class="ApplicationIcon  ${app.icon}" style="${app.style}"></i> <p class="application-description">${app.tooltipText}</p>`;
            } else {
                var icon = `<img class="ApplicationIcon" src="./img/apps/${app.image}.png"></img>`;
                // var icon = `<i class="ApplicationIcon ${app.icon}" style="${app.style}"></i>`;
            }
            if (app.app == "meos") {
                icon = '<img src="./img/politie.png" class="police-icon">';
            } 

            $(applicationSlot).html(icon+'<div class="app-unread-alerts">0</div>');
            // $(applicationSlot).prop('title', app.tooltipText);
            $(applicationSlot).data('app', app.app);

            if (app.tooltipPos !== undefined) {
                $(applicationSlot).data('placement', app.tooltipPos)
            }
        }

    });

    $('[data-toggle="tooltip"]').tooltip();
}

NM.Phone.Functions.SetupAppWarnings = function(AppData) {
    $.each(AppData, function(i, app){
        var AppObject = $(".phone-applications").find("[data-appslot='"+app.slot+"']").find('.app-unread-alerts');

        if (app.Alerts > 0) {
            $(AppObject).html(app.Alerts);
            $(AppObject).css({"display":"block"});
        } else {
            $(AppObject).css({"display":"none"});
        }
    });
}

NM.Phone.Functions.IsAppHeaderAllowed = function(app) {
    var retval = true;
    $.each(Config.HeaderDisabledApps, function(i, blocked){
        if (app == blocked) {
            retval = false;
        }
    });
    return retval;
}

$(document).on('click', '.phone-application', function(e){
    e.preventDefault();
    var PressedApplication = $(this).data('app');
    var AppObject = $("."+PressedApplication+"-app");

    if (AppObject.length !== 0) {
        if (CanOpenApp) {
            if (NM.Phone.Data.currentApplication == null) {
                NM.Phone.Animations.TopSlideDown('.phone-application-container', 300, 0);
                NM.Phone.Functions.ToggleApp(PressedApplication, "block");
                
                NM.Phone.Functions.HeaderTextColor(Config.HeaderColors[PressedApplication]["top"], Config.HeaderColors[PressedApplication]["bottom"], 300);
    
                $("#phone-footer").css("bottom", "0px");
                NM.Phone.Data.currentApplication = PressedApplication;
    
                if (PressedApplication == "settings") {
                    $("#myPhoneNumber").text(NM.Phone.Data.PlayerData.charinfo.phone);
                    $("#mySerialNumber").text("qb-" + NM.Phone.Data.PlayerData.metadata["phonedata"].SerialNumber);
                } else if (PressedApplication == "twitter") {
                    $.post('http://qb-phone/GetMentionedTweets', JSON.stringify({}), function(MentionedTweets){
                        NM.Phone.Notifications.LoadMentionedTweets(MentionedTweets)
                    })
                    $.post('http://qb-phone/GetHashtags', JSON.stringify({}), function(Hashtags){
                        NM.Phone.Notifications.LoadHashtags(Hashtags)
                    })
                    if (NM.Phone.Data.IsOpen) {
                        $.post('http://qb-phone/GetTweets', JSON.stringify({}), function(Tweets){
                            NM.Phone.Notifications.LoadTweets(Tweets);
                        });
                    }
                } else if (PressedApplication == "bank") {
                    NM.Phone.Functions.DoBankOpen();
                    $.post('http://qb-phone/GetBankContacts', JSON.stringify({}), function(contacts){
                        NM.Phone.Functions.LoadContactsWithNumber(contacts);
                    });
                    $.post('http://qb-phone/GetBankHistory', JSON.stringify({}), function(history){
                        NM.Phone.Functions.LoadBankHistory(history);
                    });
                    $.post('http://qb-phone/GetInvoices', JSON.stringify({}), function(invoices){
                        NM.Phone.Functions.LoadBankInvoices(invoices);
                    });
                } else if (PressedApplication == "whatsapp") {
                    $.post('http://qb-phone/GetWhatsappChats', JSON.stringify({}), function(chats){
                        NM.Phone.Functions.LoadWhatsappChats(chats);
                    });
                } else if (PressedApplication == "phone") {
                    $.post('http://qb-phone/GetMissedCalls', JSON.stringify({}), function(recent){
                        NM.Phone.Functions.SetupRecentCalls(recent);
                    });
                    $.post('http://qb-phone/GetSuggestedContacts', JSON.stringify({}), function(suggested){
                        NM.Phone.Functions.SetupSuggestedContacts(suggested);
                    });
                    $.post('http://qb-phone/ClearGeneralAlerts', JSON.stringify({
                        app: "phone"
                    }));
                } else if (PressedApplication == "mail") {
                    $.post('http://qb-phone/GetMails', JSON.stringify({}), function(mails){
                        NM.Phone.Functions.SetupMails(mails);
                    });
                    $.post('http://qb-phone/ClearGeneralAlerts', JSON.stringify({
                        app: "mail"
                    }));
                } else if (PressedApplication == "advert") {
                    $.post('http://qb-phone/LoadAdverts', JSON.stringify({}), function(Adverts){
                        NM.Phone.Functions.RefreshAdverts(Adverts);
                    })
                } else if (PressedApplication == "garage") {
                    $.post('http://qb-phone/SetupGarageVehicles', JSON.stringify({}), function(Vehicles){
                        SetupGarageVehicles(Vehicles);
                    })
                } else if (PressedApplication == "crypto") {
                    $.post('http://qb-phone/GetCryptoData', JSON.stringify({
                        crypto: "A5bit",
                    }), function(CryptoData){
                        SetupCryptoData(CryptoData);
                    })

                    $.post('http://qb-phone/GetCryptoTransactions', JSON.stringify({}), function(data){
                        RefreshCryptoTransactions(data);
                    })
                } else if (PressedApplication == "racing") {
                    $.post('http://qb-phone/GetAvailableRaces', JSON.stringify({}), function(Races){
                        SetupRaces(Races);
                    });
				} else if (PressedApplication == "taxis") {
                    $.post('http://qb-phone/GetCurrentTaxi', JSON.stringify({}), function(data){
                        Setuptaxi(data);
                    });
                } else if (PressedApplication == "tows") {
                    $.post('http://qb-phone/GetCurrentTow', JSON.stringify({}), function(data){
                        Setuptows(data);
                    });
                } else if (PressedApplication == "clock") {
                    $.post('http://qb-phone/GetAlarmData', JSON.stringify({}), function(data){
                        NM.Phone.Functions.SetupClock(data);
                    });
                } else if (PressedApplication == "arrests") {
                    $.post('http://qb-phone/GetCurrentArrests', JSON.stringify({}), function(data){
                        SetupArrests(data);
                    });
                } else if (PressedApplication == "food") {
                    $.post('http://qb-phone/GetCurrentFoodCompany', JSON.stringify({}), function(data){
                        SetupFood(data);
                    });	
                } else if (PressedApplication == "mechs") {
                    $.post('http://qb-phone/GetCurrentMech', JSON.stringify({}), function(data){
                        Setupmechs(data);
                    });
				
				} else if (PressedApplication == "emergencys") {
                    $.post('http://qb-phone/GetCurrentEmergency', JSON.stringify({}), function(data){
                        Setupemergencys(data);
                    });
                } else if (PressedApplication == "houses") {
                    $.post('http://qb-phone/GetPlayerHouses', JSON.stringify({}), function(Houses){
                        SetupPlayerHouses(Houses);
                    });
                    $.post('http://qb-phone/SetupGarageVehicles', JSON.stringify({}), function(Vehicles){
                        $(".house-app-cars-container").html("");

                        $.each(Vehicles, function(i, key) {
                            let div = $('<div/>', {
                                'class': 'tracket-cars',
                                'html': `
                                        <div id="tracker-cars-items" style =" display: flex; justify-content: space-between; align-items: center;">
                                            <div>
                                                <i class="fas fa-car"></i>
                                                ${key.vehicle}
                                            </div>
                                            <div>
                                                ${key.plate}
                                                <i class="fas fa-arrow-down"></i>
                                            </div>
                                        </div>

                                        <div class="tracket-cars-items-details">
                                            <div>
                                                <i class="fas fa-warehouse"></i>
                                                Garaj: ${key.garage}
                                            </div>

                                            <div>
                                                <i class="fas fa-gas-pump"></i>
                                                Benzin: ${key.fuel}%
                                            </div>
                                            <div> 
                                                <i class="fas fa-car-battery"></i>
                                                Motor: ${key.engine / 10}%
                                            </div>

                                            <div> 
                                                <i class="fas fa-palette"></i>
                                                Ana Renk: <i class="fas fa-circle" style="color: #${key.color1}"></i>
                                            </div>

                                            <div> 
                                                <i class="fas fa-palette"></i>
                                                İkincil Renk: <i class="fas fa-circle" style="color: #${key.color2}"></i>
                                            </div>

                                            <div class="tracker-cars-items-details-buttons">
                                                <div id="getCar">Aracı Çağır</div>
                                                <div id="transferCar">Aracı Transfer Et</div>
                                            </div>

                                        </div>
                                       `
                            }).attr({
                                'value': key
                            }).appendTo('.house-app-cars-container');
                           
                            $(div).find("div#tracker-cars-items div:last-child i").click(function(e) {
                                if ($(div).find("div.tracket-cars-items-details").css("display") == "none")  {
                                    $(div).find("div.tracket-cars-items-details").css("display", "block")
    
                                    $(div).find("div#tracker-cars-items div:last-child i").removeClass("fas fa-arrow-down")
                                    $(div).find("div#tracker-cars-items div:last-child i").addClass("fas fa-arrow-up")
                                }
                                else  {
                                    $(div).find("div.tracket-cars-items-details").css("display", "none");
    
                                    $(div).find("div#tracker-cars-items div:last-child i").removeClass("fas fa-arrow-up")
                                    $(div).find("div#tracker-cars-items div:last-child i").addClass("fas fa-arrow-down")
    
                                }
    
                            })
    
                            $(div).find("div.tracket-cars-items-details div.tracker-cars-items-details-buttons div#getCar").click(function() {
                                $.post('http://qb-phone/getCar', JSON.stringify({ data: key }));
                            })
    
                            $(div).find("div.tracket-cars-items-details div.tracker-cars-items-details-buttons div#sellCar").click(function() {
                                $.post('http://qb-phone/sellCar', JSON.stringify({
                                    data: key
                                }))
                            })
    
                            $(div).find("div.tracket-cars-items-details div.tracker-cars-items-details-buttons div#transferCar").click(function() {
                                $(".myhouses-options-container").css("display", "flex");
                                OpenPopup($(div).attr("value"))
                            })
                        })
                    })
                    // $.post('http://qb-phone/GetPlayerKeys', JSON.stringify({}), function(Keys){
                    //     $(".house-app-mykeys-container").html("");
                    //     if (Keys.length > 0) {
                    //         $.each(Keys, function(i, key){
                    //             var elem = '<div class="mykeys-key" id="keyid-'+i+'"> <span class="mykeys-key-label">' + key.HouseData.adress + '</span> <span class="mykeys-key-sub">أضغط لتحديد الموقع</span> </div>';

                    //             $(".house-app-mykeys-container").append(elem);
                    //             $("#keyid-"+i).data('KeyData', key);
                    //         });
                    //     }
                    // });
                } else if (PressedApplication == "meos") {
                    SetupMeosHome();
                } else if (PressedApplication == "lawyers") {
                    $.post('http://qb-phone/GetCurrentLawyers', JSON.stringify({}), function(data){
                        SetupLawyers(data);
                    });
                } else if (PressedApplication == "store") {
                    $.post('http://qb-phone/SetupStoreApps', JSON.stringify({}), function(data){
                        SetupAppstore(data); 
                    });
                } else if (PressedApplication == "trucker") {
                    $.post('http://qb-phone/GetTruckerData', JSON.stringify({}), function(data){
                        SetupTruckerInfo(data);
                    });
                } else if (PressedApplication == "photos") {
                    $.post('http://qb-phone/GetPhotos', JSON.stringify({}), function(data){
                        SetupPhotos(data);
                    });
                }
            }
        }
    } else {
        NM.Phone.Notifications.Add("settings", "Sistem", "Bazı uygulamalar kullanılamıyor")
    }
});

function OpenPopup(value) {
    let popup = $('<div/>', {
        "class": "mulkiyet-popup-input",    
        "html": `
            <p> Plakayı Onayla</p>
            <input type="text" placeholder="PLAKA">
            <div class="mulkiyet-popup-input-buttons">
                <div>Onayla</div>
                <div>İptal</div>
            </div>
        `
    }).appendTo(".myhouses-options-container")

    $(popup).find("div.mulkiyet-popup-input-buttons div:first-child").click(function(){
        if ($(popup).find("input").val() == undefined || $(popup).find("input").val() == null || $(popup).find("input").val() == "") {
            return
        }
        $.post('http://qb-phone/transferCar', JSON.stringify({
            vehicle: $(popup).find("input").val()
        }))
        $(".myhouses-options-container").css("display", "none")
    })

    $(popup).find("div.mulkiyet-popup-input-buttons div:last-child").click(function() {
        $(".myhouses-options-container").css("display", "none")
    })

}

$(document).on('click', '.mykeys-key', function(e){
    e.preventDefault();

    var KeyData = $(this).data('KeyData');

    $.post('http://qb-phone/SetHouseLocation', JSON.stringify({
        HouseData: KeyData
    }))
});

$(document).on('click', '.phone-home-container', function(event){
    event.preventDefault();

    if (NM.Phone.Data.currentApplication === null) {
        NM.Phone.Functions.Close();
    } else {
        NM.Phone.Animations.TopSlideUp('.phone-application-container', 400, -160);
        NM.Phone.Animations.TopSlideUp('.'+NM.Phone.Data.currentApplication+"-app", 400, -160);
        CanOpenApp = false;
        setTimeout(function(){
            NM.Phone.Functions.ToggleApp(NM.Phone.Data.currentApplication, "none");
            CanOpenApp = true;
        }, 400)
        NM.Phone.Functions.HeaderTextColor("white", "white", 300);

        if (NM.Phone.Data.currentApplication == "whatsapp") {
            if (OpenedChatData.number !== null) {
                setTimeout(function(){
                    $(".whatsapp-header-footer").css("display", "flex");
                    $(".whatsapp-header-footer").animate({
                        right: 0+"vh"
                    }, 1);
                    $(".whatsapp-chats").css({"display":"block"});
                    $(".whatsapp-chats").animate({
                        right: 0+"vh"
                    }, 1);
                    $(".whatsapp-openedchat").animate({
                        right: -30+"vh"
                    }, 1, function(){
                        $(".whatsapp-openedchat").css({"display":"none"});
                    });
                    OpenedChatPicture = null;
                    OpenedChatData.number = null;
                }, 450);
            }
        } else if (NM.Phone.Data.currentApplication == "phone") {
            setTimeout(() => {
                $(".phone-contact-details").css("right", "-100%");
                $(".phone-add-contact").css("right", "-100%");
                $(".phone-edit-contact").css("right", "-100%");
            }, 450);
        } else if (NM.Phone.Data.currentApplication == "bank") {
            if (CurrentTab == "invoices") {
                setTimeout(function(){
                    $(".bank-app-invoices").animate({"left": "30vh"});
                    $(".bank-app-invoices").css({"display":"none"})
                    $(".bank-app-accounts").css({"display":"block"})
                    $(".bank-app-accounts").css({"left": "0vh"});
    
                    var InvoicesObjectBank = $(".bank-app-header").find('[data-headertype="invoices"]');
                    var HomeObjectBank = $(".bank-app-header").find('[data-headertype="accounts"]');
    
                    $(InvoicesObjectBank).removeClass('bank-app-header-button-selected');
                    $(HomeObjectBank).addClass('bank-app-header-button-selected');
    
                    CurrentTab = "accounts";
                }, 400)
            }
        } else if (NM.Phone.Data.currentApplication == "meos") {
            $(".meos-alert-new").remove();
            setTimeout(function(){
                $(".meos-recent-alert").removeClass("noodknop");
                $(".meos-recent-alert").css({"background-color":"#004682"}); 
            }, 400)
        }

        $("#phone-footer").css("bottom", "-10px");
        NM.Phone.Data.currentApplication = null;
    }
});

NM.Phone.Functions.Open = function(data) {
    NM.Phone.Animations.BottomSlideUp('.container', 300, 0);
    NM.Phone.Notifications.LoadTweets(data.Tweets);
    NM.Phone.Data.IsOpen = true;
    clearInterval(NM.Phone.PlayingAudio);
}

NM.Phone.Functions.ToggleApp = function(app, show) {
    $("."+app+"-app").css({"display":show});
}

NM.Phone.Functions.Close = function() {

    if (NM.Phone.Data.currentApplication == "whatsapp") {
        setTimeout(function(){
            NM.Phone.Animations.TopSlideUp('.phone-application-container', 400, -160);
            NM.Phone.Animations.TopSlideUp('.'+NM.Phone.Data.currentApplication+"-app", 400, -160);
            $(".whatsapp-app").css({"display":"none"});
            NM.Phone.Functions.HeaderTextColor("white", 300);
    
            if (OpenedChatData.number !== null) {
                OpenedChatData.number = null;
                $(".whatsapp-chats").css({"display":"block"});
                $(".whatsapp-header-footer").css({"display":"flex"});
                $(".whatsapp-chats, .whatsapp-header-footer").animate({
                    right: 0+"vh"
                }, 200);
                $(".whatsapp-openedchat").animate({
                    right: -30+"vh"
                }, 200, function(){
                    $(".whatsapp-openedchat").css({"display":"none"});
                });
            }
            OpenedChatPicture = null;
            NM.Phone.Data.currentApplication = null;
        }, 500)
    } else if (NM.Phone.Data.currentApplication == "meos") {
        $(".meos-alert-new").remove();
        $(".meos-recent-alert").removeClass("noodknop");
        $(".meos-recent-alert").css({"background-color":"#004682"}); 
    }

    NM.Phone.Animations.BottomSlideDown('.container', 300, -70);
    $.post('http://qb-phone/Close');
    NM.Phone.Data.IsOpen = false;
}

NM.Phone.Functions.HeaderTextColor = function(topColor, bottomColor, Timeout) {
    if (Number(bottomColor)) {
        return;
    }

    var borderColor = Config.HeaderBorderColors[topColor];
    $(".phone-header").animate({color: topColor}, Timeout);
    $(".cellular-signal").animate({"background-color": topColor}, Timeout);
    $(".battery").animate({borderTopColor: borderColor, borderRightColor: borderColor, borderBottomColor: borderColor, borderLeftColor: borderColor,}, Timeout);
    $(".battery-inner").animate({"background-color": topColor}, Timeout);
    $(".battery-right").animate({"background-color": borderColor}, Timeout);
    $(".phone-home-button").animate({"background-color": bottomColor}, Timeout);
}

NM.Phone.Animations.BottomSlideUp = function(Object, Timeout, Percentage) {
    $(Object).css({'display':'block'}).animate({
        bottom: Percentage+"%",
    }, Timeout);
}

NM.Phone.Animations.BottomSlideDown = function(Object, Timeout, Percentage) {
    $(Object).css({'display':'block'}).animate({
        bottom: Percentage+"%",
    }, Timeout, function(){
        $(Object).css({'display':'none'});
    });
}

NM.Phone.Animations.NotifySlide = function(Object, Timeout, Percentage) {
    $(Object).css({'display':'block'}).animate({
        bottom: Percentage+"%",
    }, Timeout);
}

NM.Phone.Animations.NotifySlideDown = function(Object, Timeout, Percentage) {
    $(Object).css({'display':'block'}).animate({
        bottom: Percentage+"%",
    }, Timeout, function(){
        $(Object).css({'display':'none'});
    });
}

NM.Phone.Animations.TopSlideDown = function(Object, Timeout, Percentage) {
    $(Object).css({'display':'block'}).animate({
        top: Percentage+"%",
    }, Timeout);
}

NM.Phone.Animations.TopSlideUp = function(Object, Timeout, Percentage, cb) {
    $(Object).css({'display':'block'}).animate({
        top: Percentage+"%",
    }, Timeout, function(){
        $(Object).css({'display':'none'});
    });
}

NM.Phone.Animations.SlideLeft = function(Object, Timeout, Percentage) {
    $(Object).css({'display':'block'}).animate({
        right: Percentage+"%",
    }, Timeout, function(){
        $(Object).css({'display':'block'});
    });
}
NM.Phone.Animations.SlideRight = function(Object, Timeout, Percentage) {
    $(Object).css({'display':'block'}).animate({
        right: Percentage+"%",
    }, Timeout, function(){
        $(Object).css({'display':'none'});
    });
}

NM.Phone.Notifications.Add = function(icon, title, text, color, timeout) {
    $.post('http://qb-phone/HasPhone', JSON.stringify({}), function(HasPhone){
        if (HasPhone) {
            if (timeout == null && timeout == undefined) {
                timeout = 2500;
            }

            if (!NM.Phone.Data.IsOpen) {
                NM.Phone.Animations.NotifySlide('.container', 300, -55)

                setTimeout(function() {
                    if (!NM.Phone.Data.IsOpen) {
                        NM.Phone.Animations.NotifySlideDown('.container', 300, -70)
                    }
                }, timeout + 300)
            }

            $(".notification-icon").html(`<img src="./img/apps/${icon}.png" class="police-icon-notify">`);
            $(".notification-title").html(title);
            $(".notification-text").html(text);
            NM.Phone.Animations.TopSlideDown(".phone-notification-container", 200, 6);
            if (NM.Phone.Notifications.Timeout !== undefined || NM.Phone.Notifications.Timeout !== null) {
                clearTimeout(NM.Phone.Notifications.Timeout);
            }
            NM.Phone.Notifications.Timeout = setTimeout(function(){
                NM.Phone.Animations.TopSlideUp(".phone-notification-container", 200, -8);
                NM.Phone.Notifications.Timeout = null;
            }, timeout);
        }
    });
}

NM.Phone.Functions.LoadPhoneData = function(data) {
    NM.Phone.Data.PlayerData = data.PlayerData;
    NM.Phone.Data.PlayerJob = data.PlayerJob;
    NM.Phone.Data.MetaData = data.PhoneData.MetaData;
    NM.Phone.Functions.LoadMetaData(data.PhoneData.MetaData, data.PlayerData.charinfo);
    NM.Phone.Functions.LoadContacts(data.PhoneData.Contacts);
    NM.Phone.Functions.SetupApplications(data);
}

NM.Phone.Functions.UpdateTime = function(data) {    
    var NewDate = new Date();
    var NewHour = NewDate.getHours();
    var NewMinute = NewDate.getMinutes();
    var Minutes = NewMinute;
    var Hours = NewHour;
    if (NewHour < 10) {
        Hours = "0" + Hours;
    }
    if (NewMinute < 10) {
        Minutes = "0" + NewMinute;
    }

    if (data.InGameTime.hour < 10) {
        data.InGameTime.hour = "0" + data.InGameTime.hour;
    }

    $("#phone-time").html(`${data.InGameTime.hour}:${data.InGameTime.minute}`);
}


var beepAudio = new Audio('https://cdn.discordapp.com/attachments/840570048539262997/919252940395544636/timer-beep.ogg');
beepAudio.volume = 0.1;

function TimerBeep() {
    beepAudio.play();
}

$(document).ready(function(){
    window.addEventListener('message', function(event) {
        switch(event.data.action) {
            case "open":
                NM.Phone.Functions.Open(event.data);
                NM.Phone.Functions.SetupAppWarnings(event.data.AppData);
                NM.Phone.Functions.SetupCurrentCall(event.data.CallData);
                NM.Phone.Data.IsOpen = true;
                NM.Phone.Data.PlayerData = event.data.PlayerData;
                break;
            case "PlayAlarm":
                NM.Phone.PlayingAudio = setInterval(TimerBeep, 1000);
                break;
            // case "LoadPhoneApplications":
            //     NM.Phone.Functions.SetupApplications(event.data);
            //     break;
            case "LoadPhoneData":
                NM.Phone.Functions.LoadPhoneData(event.data);
                break;
            case "UpdateTime":
                NM.Phone.Functions.UpdateTime(event.data);
                break;
            case "Notification":
                if (event.data.PhoneNotify.type == "phone") {
                    NM.Phone.Functions.SetupCurrentCall(event.data.calldata);
                } else {
                    NM.Phone.Notifications.Add(event.data.PhoneNotify.icon, event.data.PhoneNotify.title, event.data.PhoneNotify.text, event.data.PhoneNotify.color, event.data.PhoneNotify.timeout);
                }
                break;
            case "RefreshAppAlerts":
                NM.Phone.Functions.SetupAppWarnings(event.data.AppData);                
                break;
            case "UpdateMentionedTweets":
                NM.Phone.Notifications.LoadMentionedTweets(event.data.Tweets);                
                break;
            case "UpdateBank":
                $(".bank-app-account-balance").html("$ "+event.data.NewBalance);
                $(".bank-app-account-balance").data('balance', event.data.NewBalance);
                break;
            case "UpdateChat":
                if (NM.Phone.Data.currentApplication == "whatsapp") {
                    if (OpenedChatData.number !== null && OpenedChatData.number == event.data.chatNumber) {
                        NM.Phone.Functions.SetupChatMessages(event.data.chatData);
                    } else {
                        NM.Phone.Functions.LoadWhatsappChats(event.data.Chats);
                    }
                }
                break;
            case "UpdateHashtags":
                NM.Phone.Notifications.LoadHashtags(event.data.Hashtags);
                break;
            case "RefreshWhatsappAlerts":
                NM.Phone.Functions.ReloadWhatsappAlerts(event.data.Chats);
                break;
            case "CancelOutgoingCall":
                $.post('http://qb-phone/HasPhone', JSON.stringify({}), function(HasPhone){
                    if (HasPhone) {
                        CancelOutgoingCall();
                    }
                });
                break;
            case "IncomingCallAlert":
                $.post('http://qb-phone/HasPhone', JSON.stringify({}), function(HasPhone){
                    if (HasPhone) {
                        IncomingCallAlert(event.data.CallData, event.data.Canceled, event.data.AnonymousCall);
                    }
                });
                break;
            case "SetupHomeCall":
                NM.Phone.Functions.SetupCurrentCall(event.data.CallData);
                break;
            case "AnswerCall":
                NM.Phone.Functions.AnswerCall(event.data.CallData);
                break;
            case "UpdateCallTime":
                var CallTime = event.data.Time;
                var date = new Date(null);
                date.setSeconds(CallTime);
                var timeString = date.toISOString().substr(11, 8);

                if (!NM.Phone.Data.IsOpen) {
                    NM.Phone.Functions.closemaybe();
                    NM.Phone.Animations.NotifySlide('.container', 300, -55)
                } else {
                    $(".call-notifications").animate({
                        right: -35+"vh"
                    }, 400, function(){
                        $(".call-notifications").css({"display":"none"});
                    });
                }

                $(".phone-call-ongoing-time").html(timeString);
                $(".phone-currentcall-title").html("Gelen Arama ("+timeString+")");
                break;
            case "CancelOngoingCall":
                $(".call-notifications").animate({right: -35+"vh"}, function(){
                    $(".call-notifications").css({"display":"none"});
                });
                NM.Phone.Animations.TopSlideUp('.phone-application-container', 400, -160);
                setTimeout(function(){
                    NM.Phone.Functions.ToggleApp("phone-call", "none");
                    $(".phone-application-container").css({"display":"none"});
                }, 400)
                NM.Phone.Functions.HeaderTextColor("white", 300);
    
                NM.Phone.Data.CallActive = false;
                NM.Phone.Data.currentApplication = null;
                break;
            case "RefreshContacts":
                NM.Phone.Functions.LoadContacts(event.data.Contacts);
                break;
            case "UpdateMails":
                NM.Phone.Functions.SetupMails(event.data.Mails);
                break;
            case "RefreshAdverts":
                if (NM.Phone.Data.currentApplication == "advert") {
                    NM.Phone.Functions.RefreshAdverts(event.data.Adverts);
                }
                break;
            case "AddPoliceAlert":
                AddPoliceAlert(event.data)
                break;
            case "UpdateApplications":
                NM.Phone.Data.PlayerJob = event.data.JobData;
                NM.Phone.Functions.SetupApplications(event.data);
                break;
            case "UpdateTransactions":
                RefreshCryptoTransactions(event.data);
                break;
            case "UpdateRacingApp":
                $.post('http://qb-phone/GetAvailableRaces', JSON.stringify({}), function(Races){
                    SetupRaces(Races);
                });
                break;
            case "RefreshAlerts":
                NM.Phone.Functions.SetupAppWarnings(event.data.AppData);
                break;
        }
    })
});

$(document).on('keydown', function() {
    switch(event.keyCode) {
        case 27:
            NM.Phone.Functions.Close();
            break;
    }
});

$("input[type=text], textarea").focusin(function() {
    $.post("http://qb-phone/LockKeyboard", JSON.stringify({}));
});

$("input[type=text], textarea").focusout(function() {
    $.post("http://qb-phone/ReleaseKeyboard", JSON.stringify({}));
});