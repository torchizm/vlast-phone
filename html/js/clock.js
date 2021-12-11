var Foccusedclock = null;
var Stopwatch = {
    "Enabled": false,
    Interval: undefined
}
var Worldtime = {
    Interval: undefined
}

$(document).on('click', '#clear-clock', function(event){
    $(".transactions-item-div").remove()
    NM.Phone.Notifications.Add("fas fa-university", "Saat", "Transfer geçmişin temizlendi!", "#badc58", 1750);
    $.post("http://qb-phone/ClearclockData");
})

var CurrentTab = "stopwatch";

$(document).on('click', '#new-alarm', function(e){
    e.preventDefault();
    NM.Phone.Animations.TopSlideDown(".clock-app-transfer", 400, 0);
});

$(document).on('click', '.clock-app-footer-button', function(e){
    e.preventDefault();

    var PressedObject = this;
    var PressedTab = $(PressedObject).data('tab');

    if (CurrentTab != PressedTab) {
        var PreviousObject = $(".clock-app-footer").find('[data-tab="'+CurrentTab+'"]');

        $(".clock-app-"+CurrentTab).css("display", "none");
        $(".clock-app-"+PressedTab).css("display", "flex");

        $(PreviousObject).removeClass('clock-app-footer-selected');
        $(PressedObject).addClass('clock-app-footer-selected');
        
        if (PressedTab == "worldtime") {
            Worldtime.Interval = setInterval(UpdateWorldTimes, 5000);
        } else {
            if (Worldtime.Interval != undefined) {
                clearInterval(Worldtime.Interval);
                Worldtime.Interval = undefined;
            }
        }
        
        CurrentTab = PressedTab;
    }
})

NM.Phone.Functions.SetupClock = function(data) {
    $(".clock-app-loaded").css({"display":"none", "padding-left":"30vh"});
    $(".clock-app-loaded").css({"display":"block"}).animate({"padding-left":"0"}, 0);

    $('.clock-app-worldtime').find('.world-time').each(function() {
        var timeZone = $(this).attr("data-time-zone");
        var timeZoneString = $(this).attr("data-string")
        SetupClocks(timeZoneString, timeZone, this);
    });
}

$(document).on('click', '.clock-set-alarm-button', function(e){
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

$(document).on('click', '.stopwatch-button[data-type="lap"]', function(e){
    e.preventDefault();
    var second = $(`.stopwatch-timer-text[data-type="second"]`).html();
    var minute = $(`.stopwatch-timer-text[data-type="minute"]`).html();
    var hour = $(`.stopwatch-timer-text[data-type="hour"]`).html();
    
    $('<div/>', {
        class: "stopwatch-lap",
        html: `
            <p>${hour}:${minute}:${second}</p>
        `
    }).appendTo(".stopwatch-lap-list");
});

$(document).on('click', '.stopwatch-button[data-type="clear"]', function(e){
    e.preventDefault();
    $(`.stopwatch-timer-text[data-type="second"]`).html('00');
    $(`.stopwatch-timer-text[data-type="minute"]`).html('00');
    $(`.stopwatch-timer-text[data-type="hour"]`).html('00');
    $(`.stopwatch-lap-list`).empty();
});

$(document).on('click', '.stopwatch-button[data-type="start"]', function(e){
    e.preventDefault();
    $(this).attr("data-type", "stop");
    $(this).find('p').html("Durdur");
    var clearBtn = $('.stopwatch-button[data-type="clear"]');
    $(clearBtn).attr("data-type", "lap");
    $(clearBtn).find('p').html("Tur");
    Stopwatch.Interval = setInterval(StartStopwatch, 1000);
});

$(document).on('click', '.stopwatch-button[data-type="stop"]', function(e){
    e.preventDefault();
    $(this).attr("data-type", "start");
    $(this).find('p').html("Başlat");
    var clearBtn = $('.stopwatch-button[data-type="lap"]');
    $(clearBtn).attr("data-type", "clear");
    $(clearBtn).find('p').html("Temizle");
    clearInterval(Stopwatch.Interval);
    Stopwatch.Interval = undefined;
});

function StartStopwatch() {
    var secondElement = $(`.stopwatch-timer-text[data-type="second"]`);
    var second = Number(secondElement.html());
    var minuteElement = $(`.stopwatch-timer-text[data-type="minute"]`);
    var minute = Number(minuteElement.html());
    var hourElement = $(`.stopwatch-timer-text[data-type="hour"]`);
    var hour = Number(hourElement.html());
    
    second++;
    if (second >= 60) {
        minute++;
        second = 0;
    }

    if (minute >= 60) {
        hour++;
        minute = 0;
    }

    if (hour >= 24) {
        hour = 0;
        minute = 0;
        second = 0;
    }

    if (second < 10) {
        second = "0" + second.toString();
    }
    if (minute < 10) {
        minute = "0" + minute.toString();
    }
    if (hour < 10) {
        hour = "0" + hour.toString();
    } 

    secondElement.html(second);
    minuteElement.html(minute);
    hourElement.html(hour);
};

function SetupClocks(timeZoneString, timeZone, t) {
    var timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        dateStyle: 'full',
        timeStyle: 'long'
    }).format();

    timeString = timeString.split(' ');
    var time = `${timeString[5].split(':')[0]}:${timeString[5].split(':')[1]}`;
    var meridian = timeString[6];
    var offset = timeString[7];
    
    $(t).html(`
        <div class="world-time-info">
            <p class="world-time-info-clock">${timeZoneString}</p>
            <p>Bugün, ${offset}</p>
        </div>
        <div class="world-time-clock">
            <p>${time}</p>
            <p>${meridian}</p>
        </div>
    `);
}

function UpdateWorldTimes() {
    $('.clock-app-worldtime').find('.world-time').each(function() {
        var timeZone = $(this).attr("data-time-zone");
        var timeZoneString = $(this).attr("data-string")
        SetupClocks(timeZoneString, timeZone, this);
    });
}