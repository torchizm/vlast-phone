var Foccusedclock = null;

$(document).on('click', '.clock-app-account', function(e){
    var copyText = document.getElementById("iban-account");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    NM.Phone.Notifications.Add("fas fa-university", "Saat", "IBAN Kopyalandı!", "#badc58", 1750);
});


$(document).on('click', '#clear-clock', function(event){
    $(".transactions-item-div").remove()
    NM.Phone.Notifications.Add("fas fa-university", "Saat", "Transfer geçmişin temizlendi!", "#badc58", 1750);
    $.post("http://qb-phone/ClearclockData");
})

var CurrentTab = "accounts";

$(document).on('click', '#new-alarm', function(e){
    e.preventDefault();
    NM.Phone.Animations.TopSlideDown(".clock-app-transfer", 400, 0);
});

$(document).on('click', '.alarm-item > i', function(e){
    e.preventDefault();
    var id = $(this).data("id")
    $.post("http://qb-phone/DeleteAlarm", JSON.stringify({id: id}));
    $("#alarm-item-"+ id).animate({
        "margin-left": -50+"vh"
    }, 350, function(){
        $("#alarm-item-"+id).remove();
        NM.Phone.Notifications.Add("far fa-clock", "Saat", "Alarm kaldırıldı!", "#ff7e1496", 1750); 
    });
});

$(document).on('click', '.clock-app-header-button', function(e){
    e.preventDefault();

    var PressedObject = this;
    var PressedTab = $(PressedObject).data('headertype');
    // console.log(PressedObject)
    if (CurrentTab != PressedTab) {
        var PreviousObject = $(".clock-app-header").find('[data-headertype="'+CurrentTab+'"]');

        // if (PressedTab == "invoices") {
        //     $(".clock-app-"+CurrentTab).animate({
        //         left: -30+"vh"
        //     }, 250, function(){
        //         $(".clock-app-"+CurrentTab).css({"display":"none"})
        //     });
        //     $(".clock-app-"+PressedTab).css({"display":"block"}).animate({
        //         left: 0+"vh"
        //     }, 250);
        // } else if (PressedTab == "accounts") {
        //     $(".clock-app-"+CurrentTab).animate({
        //         left: 30+"vh"
        //     }, 250, function(){
        //         $(".clock-app-"+CurrentTab).css({"display":"none"})
        //     });
        //     $(".clock-app-"+PressedTab).css({"display":"block"}).animate({
        //         left: 0+"vh"
        //     }, 250);
        // } else if (PressedTab == "transfer") {
            
        // }
        $(".clock-app-"+CurrentTab).animate({
            left: 30+"vh"
        }, 250, function(){
            $(".clock-app-"+CurrentTab).css({"display":"none"})
        });
        $(".clock-app-"+PressedTab).css({"display":"block"}).animate({
            left: 0+"vh"
        }, 250);

        $(PreviousObject).removeClass('clock-app-header-button-selected');
        $(PressedObject).addClass('clock-app-header-button-selected');
        setTimeout(function(){ CurrentTab = PressedTab; }, 300)
    }
})

NM.Phone.Functions.DoclockOpen = function(data) {
    // $(".bank-app-account-number").val("IBAN: " + data.iban);
    // $(".bank-app-account-balance").html("&dollar; "+data.bank.toFixed());
    // $(".bank-app-account-balance").data('balance', data.bank.toFixed());
    $(".clock-app-loaded").css({"display":"none", "padding-left":"30vh"});

    CurrentTab = "accounts";
    $(".clock-app-loaded").css({"display":"block"}).animate({"padding-left":"0"}, 0);
    $(".clock-app-accounts").animate({left:0+"vh"}, 0);
    $(".clock-app-alarm").css({"display":"block"}).animate({
        left: 0+"vh"
    }, 0);
    $("#clock-accounts-button").addClass('clock-app-header-button-selected');
    LoadClock(data)
}

function LoadClock(data) {
    $(".clock-transactions-item-div").html("");
    // $("#incoming-main-div").html('');

    $.each(data, function (k, v) { 
        if (v != undefined || v != null) {
            var content = '<div id="alarm-item-'+ k +'" class="alarm-item"><p class="alarm-clock">'+v+'</p><br><p style="height: 0; margin-top: -3.5vh; margin-left: .25vh; color: rgb(185, 185, 185);">Alarm</p><i data-id="' + k + '" class="fas fa-times-circle"></i></div>'
            $(".clock-transactions-item-div").append(content);
        }
    });
}

// $(document).on('click', '#transfer', function(e){
//     NM.Phone.Animations.TopSlideDown(".clock-app-transfer", 400, 0);
// });

$(document).on('click', '.clock-app-transfer-button', function(e){
    var type = $(this).attr("id")
    if (type == "accept-alarm") {
        var value = $("#clock-transfer-iban").val()
        $.post("http://qb-phone/SetAlarm", JSON.stringify({clock: value}));
        $.post('http://qb-phone/GetAlarmData', JSON.stringify({}), function(data){
            NM.Phone.Functions.DoclockOpen(data);
        });
        NM.Phone.Notifications.Add("far fa-clock", "Saat", "Saat " + value + " için alarm kurdun!", "color: #ff7e1496;", 1500);
    }
    setTimeout(() => {
        NM.Phone.Animations.TopSlideUp(".clock-app-transfer", 400, -100) 
    }, 100);
})

// $(document).on('click', '#clock-transfer-iban', function(e){
//     if (document.getElementById("clock-transfer-iban").value == "") {
//         document.getElementById("clock-transfer-iban").value = "HX"
//     }
//     // $("#clock-transfer-iban").val() = "HX"
// })

var Cronometer = {
    started: false,
}
$(document).on('click', '.start-stop', function(e){
    if (!Cronometer.started) {
        $(".start-stop").html("Durdur")
        $(".reset-tur").html("Tur")
        $(".start-stop").css({
            "background-color": "#701729",
            color: "#fc3158"
        })
        // if (Cronometer.tempTimer == 0) {
        Cronometer.baseTimer = Date.now()
        // }
        myFunction()
    } else {
        $(".start-stop").html("Başlat")
        if (tourCount != 1) {
            $(".reset-tur").html("Sıfırla")
        }

        $(".start-stop").css({
            "background-color": "rgb(21, 87, 37)",
            color: "rgb(39, 184, 75)"
        })
        myStopFunction()
    }
    Cronometer.started = !Cronometer.started
});

var tourCount = 1
$(document).on('click', '.reset-tur', function(e){
    var currentTime = $("#cronometer").html();
    if (currentTime != "00:00,00") {
        $(".clock-app-invoices-list").append('<div class="clock-app-invoice"><p>'+tourCount+'.Tur</p><span>'+ currentTime +'</span></div>');
        tourCount += 1    
    }
    if ($(".reset-tur").html() == "Sıfırla") {
        $("#cronometer").html("00:00,00")
        $(".reset-tur").html("Tur")
        $(".clock-app-invoices-list").html("")
        tourCount = 1
    }
});

var myVar = 0;
var count = 0;
function myFunction() {
    myVar =  setTimeout(function(){ 
        myFunction(); 
        let nowTimer = Date.now()
        var text = "00:00,00"; 
        var diffrence = Math.floor((nowTimer - Cronometer.baseTimer) / 10)
        var salise = diffrence < 100 ? diffrence : diffrence % 100
        var saniye = saniye < 60 ? Math.floor(diffrence / 100) : Math.floor(diffrence / 100) % 60
        var dakika = dakika < 60 ? Math.floor(diffrence / 6000) : Math.floor(diffrence / 6000) % 60
        var saat = Math.floor(dakika / 60)
        saniye = saniye < 10 ? "0" + saniye : saniye
        dakika = dakika < 10 ? "0" + dakika : dakika
        saat = saat < 10 ? "0" + saat : saat
        text = saat == 0 ? dakika + ":" + saniye + "," + salise : saat + ":" + dakika + ":" + saniye
        $("#cronometer").html(text)
    }, 10);
}

function myStopFunction() {
    clearTimeout(myVar);
}