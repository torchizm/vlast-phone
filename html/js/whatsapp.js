var WhatsappSearchActive = false;
var OpenedChatPicture = null;

$(document).ready(function(){
    $("#whatsapp-search-input").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".whatsapp-chats .whatsapp-chat").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

$(document).on('click', '#whatsapp-search-chats', function(e){
    e.preventDefault();

    if ($("#whatsapp-search-input").css('display') == "none") {
        $("#whatsapp-search-input").fadeIn(150);
        WhatsappSearchActive = true;
    } else {
        $("#whatsapp-search-input").fadeOut(150);
        WhatsappSearchActive = false;
    }
});

$(document).on('click', '.whatsapp-chat', function(e){
    e.preventDefault();

    var ChatId = $(this).attr('id');
    var ChatData = $("#"+ChatId).data('chatdata');

    NM.Phone.Functions.SetupChatMessages(ChatData);

    $.post('http://qb-phone/ClearAlerts', JSON.stringify({
        number: ChatData.number
    }));

    if (WhatsappSearchActive) {
        $("#whatsapp-search-input").fadeOut(150);
    }

    $(".whatsapp-openedchat").css({"display":"flex"});
    $(".whatsapp-openedchat").animate({
        right: 0+"vh"
    },200);
    
    $(".whatsapp-chats, .whatsapp-header-footer").animate({
        right: 30+"vh"
    },200, function(){
        $(".whatsapp-chats, .whatsapp-header-footer").css({"display":"none"});
    });

    $('.whatsapp-openedchat-messages').animate({scrollTop: 9999}, 150);

    if (OpenedChatPicture == null) {
        OpenedChatPicture = "./img/default.png";
        if (ChatData.picture != null || ChatData.picture != undefined || ChatData.picture != "default") {
            OpenedChatPicture = ChatData.picture
        }
        $(".whatsapp-openedchat-picture").css({"background-image":"url("+OpenedChatPicture+")"});
    }
});

$(document).on('click', '#whatsapp-openedchat-back', function(e){
    e.preventDefault();
    $.post('http://qb-phone/GetWhatsappChats', JSON.stringify({}), function(chats){
        NM.Phone.Functions.LoadWhatsappChats(chats);
    });
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
    OpenedChatPicture = null;
});

NM.Phone.Functions.GetLastMessage = function(messages) {
    var CurrentDate = new Date();
    var CurrentMonth = CurrentDate.getMonth();
    var CurrentDOM = CurrentDate.getDate();
    var CurrentYear = CurrentDate.getFullYear();
    var LastMessageData = {
        time: "00:00",
        message: "nothing"
    }

    if (messages == undefined) {
        LastMessageData.time = "00:00";
        LastMessageData.message = "Yok";
    } else {
        $.each(messages[messages.length - 1], function(i, msg){
            var msgData = msg[msg.length - 1];
            LastMessageData.time = msgData.time
            LastMessageData.message = msgData.message
        });
    }

    return LastMessageData
}

GetCurrentDateKey = function() {
    var CurrentDate = new Date();
    var CurrentMonth = CurrentDate.getMonth();
    var CurrentDOM = CurrentDate.getDate();
    var CurrentYear = CurrentDate.getFullYear();
    var CurDate = ""+CurrentDOM+"-"+CurrentMonth+"-"+CurrentYear+"";

    return CurDate;
}

NM.Phone.Functions.LoadWhatsappChats = function(chats) {
    $(".whatsapp-chats").html("");
    $.each(chats, function(i, chat){
        var profilepicture = "./img/default.png";
        if (chat.picture !== "default") {
            profilepicture = chat.picture
        }
        var LastMessage = NM.Phone.Functions.GetLastMessage(chat.messages);
        var ChatElement = '';

        if (LastMessage.message.startsWith("https://") || LastMessage.message.startsWith("http://")) {
            var ChatElement = '<div class="whatsapp-chat" id="whatsapp-chat-'+i+'"><div class="whatsapp-chat-picture" style="background-image: url('+profilepicture+');"></div><div class="whatsapp-chat-details"><div class="whatsapp-chat-name"><p>'+chat.name+'</p></div><div class="whatsapp-chat-lastmessage"><p><i class="fas fa-image"></i> Fotoğraf</p></div></div> <div class="whatsapp-chat-lastmessagetime"><p>'+LastMessage.time+'</p><i class="fas fa-chevron-right"></i></div><div class="whatsapp-chat-unreadmessages unread-chat-id-'+i+'">1</div></div>';
        } else {
            var ChatElement = '<div class="whatsapp-chat" id="whatsapp-chat-'+i+'"><div class="whatsapp-chat-picture" style="background-image: url('+profilepicture+');"></div><div class="whatsapp-chat-details"><div class="whatsapp-chat-name"><p>'+chat.name+'</p></div><div class="whatsapp-chat-lastmessage"><p>'+LastMessage.message+'</p></div></div> <div class="whatsapp-chat-lastmessagetime"><p>'+LastMessage.time+'</p><i class="fas fa-chevron-right"></i></div><div class="whatsapp-chat-unreadmessages unread-chat-id-'+i+'">1</div></div>';
        }

        
        $(".whatsapp-chats").append(ChatElement);
        $("#whatsapp-chat-"+i).data('chatdata', chat);

        if (chat.Unread > 0 && chat.Unread !== undefined && chat.Unread !== null) {
            $(".unread-chat-id-"+i).html(chat.Unread);
            $(".unread-chat-id-"+i).css({"display":"block"});
        } else {
            $(".unread-chat-id-"+i).css({"display":"none"});
        }
    });
}

NM.Phone.Functions.ReloadWhatsappAlerts = function(chats) {
    $.each(chats, function(i, chat){
        if (chat.Unread > 0 && chat.Unread !== undefined && chat.Unread !== null) {
            $(".unread-chat-id-"+i).html(chat.Unread);
            $(".unread-chat-id-"+i).css({"display":"block"});
        } else {
            $(".unread-chat-id-"+i).css({"display":"none"});
        }
    });
}

const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

FormatChatDate = function(date) {
    var TestDate = date.split("-");
    var NewDate = new Date((parseInt(TestDate[1]) + 1)+"-"+TestDate[0]+"-"+TestDate[2]);

    var CurrentMonth = monthNames[NewDate.getMonth()];
    var CurrentDOM = NewDate.getDate();
    var CurrentYear = NewDate.getFullYear();
    var CurDateee = CurrentDOM + "-" + NewDate.getMonth() + "-" + CurrentYear;
    var ChatDate = CurrentDOM + " " + CurrentMonth + " " + CurrentYear;
    var CurrentDate = GetCurrentDateKey();

    var ReturnedValue = ChatDate;

    if (CurrentDate == CurDateee) {
        ReturnedValue = "Bugün";
    }

    return ReturnedValue;
}

FormatMessageTime = function() {
    var NewDate = new Date();
    var NewHour = NewDate.getHours();
    var NewMinute = NewDate.getMinutes();
    var Minutessss = NewMinute;
    var Hourssssss = NewHour;
    if (NewMinute < 10) {
        Minutessss = "0" + NewMinute;
    }
    if (NewHour < 10) {
        Hourssssss = "0" + NewHour;
    }
    var MessageTime = Hourssssss + ":" + Minutessss
    return MessageTime;
}

$(document).on('click', '#whatsapp-openedchat-send', function(e){
    e.preventDefault();

    var Message = $("#whatsapp-openedchat-message").val();

    if (Message !== null && Message !== undefined && Message !== "") {
        $.post('http://qb-phone/SendMessage', JSON.stringify({
            ChatNumber: OpenedChatData.number,
            ChatDate: GetCurrentDateKey(),
            ChatMessage: Message,
            ChatTime: FormatMessageTime(),
            ChatType: "message",
        }));

        $("#whatsapp-openedchat-message").val("");
        AutoGrow();
    } else {
        NM.Phone.Notifications.Add("whatsapp", "Whatsapp", "Boş mesaj gönderemezsin", "#25D366", 1750);
    }
});

$(document).on('keypress', function (e) {
    if (OpenedChatData.number !== null) {
        if(e.which === 13){
            e.preventDefault();
            var Message = $("#whatsapp-openedchat-message").val();
    
            if (Message !== null && Message !== undefined && Message !== "") {
                $.post('http://qb-phone/SendMessage', JSON.stringify({
                    ChatNumber: OpenedChatData.number,
                    ChatDate: GetCurrentDateKey(),
                    ChatMessage: Message,
                    ChatTime: FormatMessageTime(),
                    ChatType: "message",
                }));

                $("#whatsapp-openedchat-message").val("");
                AutoGrow();
            } else {
                NM.Phone.Notifications.Add("whatsapp", "Whatsapp", "Boş mesaj gönderemezsin", "#25D366", 1750);
            }
        }
    }
});

$(document).on('click', '#send-image', function(e){
    e.preventDefault();

    $.post('http://qb-phone/Close', JSON.stringify({}));
    $("body").css("display", "none");
    
    $.post('http://qb-phone/TakeImage', JSON.stringify({}), function(url) {
        $("body").css("display", "block");

        if (url !== "") {
            $.post('http://qb-phone/SendMessage', JSON.stringify({
                ChatNumber: OpenedChatData.number,
                ChatDate: GetCurrentDateKey(),
                ChatMessage: url,
                ChatTime: FormatMessageTime(),
                ChatType: "image",
            }));
        }
    });
});

$(document).on('click', '#send-location', function(e){
    e.preventDefault();

    $.post('http://qb-phone/SendMessage', JSON.stringify({
        ChatNumber: OpenedChatData.number,
        ChatDate: GetCurrentDateKey(),
        ChatMessage: "Konum",
        ChatTime: FormatMessageTime(),
        ChatType: "location",
    }));
});

// NM.Phone.Functions.SetupChatMessages = function(cData, NewChatData) {
//     if (cData) {
//         OpenedChatData.number = cData.number;

//         if (OpenedChatPicture == null) {
//             $.post('http://qb-phone/GetProfilePicture', JSON.stringify({
//                 number: OpenedChatData.number,
//             }), function(picture){
//                 OpenedChatPicture = "./img/default.png";
//                 if (picture != "default" && picture != null) {
//                     OpenedChatPicture = picture
//                 }
//                 $(".whatsapp-openedchat-picture").css({"background-image":"url("+OpenedChatPicture+")"});
//             });
//         } else {
//             $(".whatsapp-openedchat-picture").css({"background-image":"url("+OpenedChatPicture+")"});
//         }

//         $(".whatsapp-openedchat-name").html("<p>"+cData.name+"</p>");
//         $(".whatsapp-openedchat-messages").html("");

//         $.each(cData.messages, function(i, chat){
//             var ChatDate = FormatChatDate(i);
//             var ChatDiv = '<div class="whatsapp-openedchat-messages-'+i+' unique-chat"><div class="whatsapp-openedchat-date">'+ChatDate+'</div></div>';
    
//             $.each(cData.messages[i], function(index, message){
//                 var Sender = "me";
//                 if (message.sender !== NM.Phone.Data.PlayerData.citizenid) { Sender = "other"; }
//                 var MessageElement
//                 if (message.type == "message") {
//                     MessageElement = '<div class="whatsapp-openedchat-message whatsapp-openedchat-message-'+Sender+'" data-toggle="tooltip" data-placement="bottom" title="'+ChatDate+'">'+message.message+'<div class="whatsapp-openedchat-message-time">'+message.time+'</div></div><div class="clearfix"></div>'
//                 } else if (message.type == "location") {
//                     MessageElement = '<div class="whatsapp-openedchat-message whatsapp-openedchat-message-'+Sender+' whatsapp-shared-location" data-x="'+message.data.x+'" data-y="'+message.data.y+'" data-toggle="tooltip" data-placement="bottom" title="'+ChatDate+'"><span style="font-size: 1.2vh;"><i class="fas fa-thumbtack" style="font-size: 1vh;"></i> Locatie</span><div class="whatsapp-openedchat-message-time">'+message.time+'</div></div><div class="clearfix"></div>'
//                 }
//                 $(".whatsapp-openedchat-messages").append(MessageElement);

//                 $('[data-toggle="tooltip"]').tooltip();
//             });
//         });
//         $('.whatsapp-openedchat-messages').animate({scrollTop: 9999}, 1);
//     } else {
//         OpenedChatData.number = NewChatData.number;
//         if (OpenedChatPicture == null) {
//             $.post('http://qb-phone/GetProfilePicture', JSON.stringify({
//                 number: OpenedChatData.number,
//             }), function(picture){
//                 OpenedChatPicture = "./img/default.png";
//                 if (picture != "default" && picture != null) {
//                     OpenedChatPicture = picture
//                 }
//                 $(".whatsapp-openedchat-picture").css({"background-image":"url("+OpenedChatPicture+")"});
//             });
//         }

//         $(".whatsapp-openedchat-name").html("<p>"+NewChatData.name+"</p>");
//         $(".whatsapp-openedchat-messages").html("");
//         // var NewDate = new Date();
//         // var NewDateMonth = NewDate.getMonth();
//         // var NewDateDOM = NewDate.getDate();
//         // var NewDateYear = NewDate.getFullYear();
//         // var DateString = ""+NewDateDOM+"-"+(NewDateMonth+1)+"-"+NewDateYear;
//         // var ChatDiv = '<div class="whatsapp-openedchat-messages-'+DateString+' unique-chat"></div>';
//         // $(".whatsapp-openedchat-messages").append(ChatDiv);
//     }

//     $('.whatsapp-openedchat-messages').animate({scrollTop: 9999}, 1);
// }

NM.Phone.Functions.SetupChatMessages = function(cData, NewChatData) {
    if (cData) {
        OpenedChatData.number = cData.number;

        if (OpenedChatPicture == null) {
            $.post('http://qb-phone/GetProfilePicture', JSON.stringify({
                number: OpenedChatData.number,
            }), function(picture){
                OpenedChatPicture = "./img/default.png";
                if (picture != "default" && picture != null) {
                    OpenedChatPicture = picture
                }
                $(".whatsapp-openedchat-picture").css({"background-image":"url("+OpenedChatPicture+")"});
            });
        } else {
            $(".whatsapp-openedchat-picture").css({"background-image":"url("+OpenedChatPicture+")"});
        }

        $(".whatsapp-openedchat-name").html("<p>"+cData.name+"</p>");
        $(".whatsapp-openedchat-messages").html("");

        $.each(cData.messages, function(i, chat){

            var ChatDate = FormatChatDate(chat.date);
            var ChatDiv = '<div class="whatsapp-openedchat-messages-'+i+' unique-chat"><div class="whatsapp-openedchat-date">'+ChatDate+'</div></div>';

            $(".whatsapp-openedchat-messages").append(ChatDiv);
    
            $.each(cData.messages[i].messages, function(index, message){
                var Sender = "me";
                if (message.sender !== NM.Phone.Data.PlayerData.citizenid) { Sender = "other"; }
                
                var MessageElement = '';
                
                if (message.type == "image" || message.message.startsWith("http://") || message.message.startsWith("https://")) {
                    // MessageElement = '<div class="whatsapp-openedchat-message whatsapp-openedchat-message-'+Sender+'"><img class="whatsapp-openedchat-message-image" src='+message.message+'><div class="whatsapp-openedchat-message-time">'+message.time+'</div></div><div class="clearfix"></div>'
                    MessageElement = '<div class="whatsapp-messagebox whatsapp-messagebox-image whatsapp-messagebox-'+Sender+'"><img class="whatsapp-openedchat-message-image" src='+message.message+'></div><div class="clearfix"></div><div class="whatsapp-openedchat-message-time-'+Sender+'">'+message.time+'</div>'
                } else if (message.type == "message") {
                    // MessageElement = '<div class="whatsapp-openedchat-message whatsapp-openedchat-message-'+Sender+'">'+message.message+'<div class="whatsapp-openedchat-message-time">'+message.time+'</div></div><div class="clearfix"></div>'
                    MessageElement = '<div class="whatsapp-messagebox whatsapp-messagebox-'+Sender+'">'+message.message+'</div><div class="clearfix"></div><div class="whatsapp-openedchat-message-time-'+Sender+'">'+message.time+'</div>'
                } else if (message.type == "location") {
                    // MessageElement = '<div class="whatsapp-openedchat-message whatsapp-openedchat-message-'+Sender+' whatsapp-shared-location" data-x="'+message.data.x+'" data-y="'+message.data.y+'"><span style="font-size: 1.2vh;"><i class="fas fa-thumbtack" style="font-size: 1vh;"></i> Konum</span><div class="whatsapp-openedchat-message-time">'+message.time+'</div></div><div class="clearfix"></div>'
                    MessageElement = '<div class="whatsapp-messagebox whatsapp-messagebox-'+Sender+' whatsapp-shared-location" data-x="'+message.data.x+'" data-y="'+message.data.y+'"><span style="font-size: 1.2vh;"><i class="fas fa-thumbtack" style="font-size: 1vh;"></i> Konum</span></div><div class="clearfix"></div><div class="whatsapp-openedchat-message-time-'+Sender+'">'+message.time+'</div>'
                }
                $(".whatsapp-openedchat-messages-"+i).append(MessageElement);
            });
        });
        $('.whatsapp-openedchat-messages').animate({scrollTop: 9999}, 1);
    } else {
        OpenedChatData.number = NewChatData.number;
        if (OpenedChatPicture == null) {
            $.post('http://qb-phone/GetProfilePicture', JSON.stringify({
                number: OpenedChatData.number,
            }), function(picture){
                OpenedChatPicture = "./img/default.png";
                if (picture != "default" && picture != null) {
                    OpenedChatPicture = picture
                }
                $(".whatsapp-openedchat-picture").css({"background-image":"url("+OpenedChatPicture+")"});
            });
        }

        $(".whatsapp-openedchat-name").html("<p>"+NewChatData.name+"</p>");
        $(".whatsapp-openedchat-messages").html("");
        var NewDate = new Date();
        var NewDateMonth = NewDate.getMonth();
        var NewDateDOM = NewDate.getDate();
        var NewDateYear = NewDate.getFullYear();
        var DateString = ""+NewDateDOM+"-"+(NewDateMonth+1)+"-"+NewDateYear;
        var ChatDiv = '<div class="whatsapp-openedchat-messages-'+DateString+' unique-chat"><div class="whatsapp-openedchat-date">BUGÜN</div></div>';

        $(".whatsapp-openedchat-messages").append(ChatDiv);
    }

    if (cData.number == cData.name) {
        let addContactElement = `<div class="add-contact-container">
                                    <span>Bu kullanıcı kişi listenizde yok</span>
                                    <div id="add-new-contact-button">
                                        <span>Kişi Ekle</span>
                                    </div>
                                </div>`;
        
        $(".whatsapp-openedchat-messages").append(addContactElement);
    }

    $('.whatsapp-openedchat-messages').animate({scrollTop: 9999}, 1);
}

$(document).on('click', '#add-new-contact-button', function(e) {
    e.preventDefault();

    NM.Phone.Animations.TopSlideUp('.phone-application-container', 400, -160);
    NM.Phone.Animations.TopSlideUp('.'+NM.Phone.Data.currentApplication+"-app", 400, -160);
    CanOpenApp = false;
    setTimeout(function(){
        NM.Phone.Functions.ToggleApp(NM.Phone.Data.currentApplication, "none");
        CanOpenApp = true;
    }, 400)
    // NM.Phone.Functions.HeaderTextColor("white", 300);

    if (NM.Phone.Data.currentApplication == "whatsapp") {
        if (OpenedChatData.number !== null) {
            setTimeout(function(){
                $(".whatsapp-chats").css({"display":"block"});
                $(".whatsapp-header-footer").css({"display":"flex"});
                $(".whatsapp-chats, .whatsapp-header-footer").animate({
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
    }

    setTimeout(function(){
        var PressedApplication = "phone";
        var AppObject = $("."+PressedApplication+"-app");

        
        NM.Phone.Animations.TopSlideDown('.phone-application-container', 300, 0);
        
        setTimeout(() => {
            NM.Phone.Functions.ToggleApp(PressedApplication, "block");

            NM.Phone.Data.currentApplication = PressedApplication;

            $.post('http://qb-phone/GetMissedCalls', JSON.stringify({}), function(recent){
                NM.Phone.Functions.SetupRecentCalls(recent);
            });
            $.post('http://qb-phone/GetSuggestedContacts', JSON.stringify({}), function(suggested){
                NM.Phone.Functions.SetupSuggestedContacts(suggested);
            });
            $.post('http://qb-phone/ClearGeneralAlerts', JSON.stringify({
                app: "phone"
            }));

            // NM.Phone.Animations.TopSlideDown(".phone-add-contact", 300, 0);
            $(".phone-add-contact").css("display", "block");
            setTimeout(() => {
                $(".phone-add-contact").animate({"right": "0vh"}, 300);

                $(document).find('.phone-add-contact-number').each(function() {
                    $(this).val($(".whatsapp-openedchat-name p").text());
                });
            }, 300);
        }, 300)
    }, 500);
});

$(document).on('click', '.whatsapp-shared-location', function(e){
    e.preventDefault();
    var messageCoords = {}
    messageCoords.x = $(this).data('x');
    messageCoords.y = $(this).data('y');

    $.post('http://qb-phone/SharedLocation', JSON.stringify({
        coords: messageCoords,
    }))
});

var ExtraButtonsOpen = false;

$(document).on('click', '#whatsapp-openedchat-message-extras', function(e){
    e.preventDefault();

    if (!ExtraButtonsOpen) {
        $(".whatsapp-extra-buttons").css({"display":"block"}).animate({
            left: 0+"vh"
        }, 250);
        ExtraButtonsOpen = true;
    } else {
        $(".whatsapp-extra-buttons").animate({
            left: -10+"vh"
        }, 250, function(){
            $(".whatsapp-extra-buttons").css({"display":"block"});
            ExtraButtonsOpen = false;
        });
    }
});

function AutoGrow() {
    // element.style.height = (element.scrollHeight)+"px";
    // $(element).css("height", `5px`);
    var element = $("#whatsapp-openedchat-message");
    element.css("height", "5px");
    element.css("height", `${element.prop('scrollHeight')}px`);

    if (element.val() == "") {
        $(".whatsapp-openedchat-input-icons").animate({"width": "72px", "right": "0px"}, 100);
    } else {
        $(".whatsapp-openedchat-input-icons").animate({"width": "0px", "right": "8vh"}, 100);
    }
}