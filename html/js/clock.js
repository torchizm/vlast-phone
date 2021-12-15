var Foccusedclock = null;
var Stopwatch = {
    "Enabled": false,
    Interval: undefined
}
var Worldtime = {
    Interval: undefined
}
var Timer = {
    "Minute": "0",
    "Second": "0",
    Interval: undefined
}
var beepAudio = new Audio('https://cdn.discordapp.com/attachments/840570048539262997/919252940395544636/timer-beep.ogg');
beepAudio.volume = 0.1;

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
    UpdateWorldTimes();
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

$(document).on('click', '#stopwatch-button[data-type="lap"]', function(e){
    e.preventDefault();
    var milisecond = $(`.stopwatch-timer-text[data-type="milisecond"]`).html();
    var second = $(`.stopwatch-timer-text[data-type="second"]`).html();
    var minute = $(`.stopwatch-timer-text[data-type="minute"]`).html();
    var lap = $('.stopwatch-lap-list').children().length + 1;
    
    $('<div/>', {
        class: "stopwatch-lap",
        html: `
            <p>Tur ${lap}</p>
            <p>${minute}:${second}.${milisecond}</p>
        `
    }).appendTo(".stopwatch-lap-list");
});

$(document).on('click', '#stopwatch-button[data-type="clear"]', function(e){
    e.preventDefault();
    $(`.stopwatch-timer-text[data-type="milisecond"]`).html('00');
    $(`.stopwatch-timer-text[data-type="second"]`).html('00');
    $(`.stopwatch-timer-text[data-type="minute"]`).html('00');
    $(`.stopwatch-lap-list`).empty();
});

$(document).on('click', '#stopwatch-button[data-type="start"]', function(e){
    e.preventDefault();
    $(this).attr("data-type", "stop");
    $(this).find('p').html("Durdur");
    var clearBtn = $('#stopwatch-button[data-type="clear"]');
    $(clearBtn).attr("data-type", "lap");
    $(clearBtn).find('p').html("Tur");
    Stopwatch.Interval = setInterval(StartStopwatch, 10);
});

$(document).on('click', '#stopwatch-button[data-type="stop"]', function(e){
    e.preventDefault();
    $(this).attr("data-type", "start");
    $(this).find('p').html("Başlat");
    var clearBtn = $('#stopwatch-button[data-type="lap"]');
    $(clearBtn).attr("data-type", "clear");
    $(clearBtn).find('p').html("Temizle");
    clearInterval(Stopwatch.Interval);
    Stopwatch.Interval = undefined;
});

function StartStopwatch() {
    var milisecondElement = $(`.stopwatch-timer-text[data-type="milisecond"]`);
    var milisecond = Number(milisecondElement.html());
    var secondElement = $(`.stopwatch-timer-text[data-type="second"]`);
    var second = Number(secondElement.html());
    var minuteElement = $(`.stopwatch-timer-text[data-type="minute"]`);
    var minute = Number(minuteElement.html());
    
    milisecond++;
    if (milisecond >= 60) {
        second++;
        milisecond = 0;
    }

    if (second >= 60) {
        minute++;
        second = 0;
    }

    if (minute >= 60) {
        minute = 0;
    }

    if (milisecond < 10) {
        milisecond = "0" + milisecond.toString();
    } 
    if (second < 10) {
        second = "0" + second.toString();
    }
    if (minute < 10) {
        minute = "0" + minute.toString();
    }

    milisecondElement.html(milisecond);
    secondElement.html(second);
    minuteElement.html(minute);
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

$(document).ready(function () {
    var pickers = ["#clock-timer-minute-picker", "#clock-timer-second-picker", "#clock-alarm-minute-picker", "#clock-alarm-second-picker"];
    var numbers = [];
    for (var i = 0; i < 60; i++) {
        numbers.push(i);
    }

    pickers.forEach(picker => {
        $(picker).picker({
            data: numbers,
            lineHeight: 30,
            selected: picker == "#clock-timer-minute-picker" ? 29 : 0
        }, function (result) {
            $(picker).data("value", result);
        });

        $(`${picker} .clone-scroller`).on({
            'mousemove': function(e) {
                clicked && updateScrollPos(this, e);
            },
            'mousedown': function(e) {
                clicked = true;
                clickY = e.pageY;
            }
        });
    });
});

var clicked = false, clickY;

var updateScrollPos = function(element, e) {
    var val = clickY - e.pageY;
    $(element).scrollTop($(element).scrollTop() + val / 4);
}

$(document).mouseup(function() {
    clicked = false;
})

$('#clock-timer-cancel').click(function() {
    SwitchTimerPage('.clock-app-timer-setup', '.clock-app-timer-show', 100);
})

$('#clock-timer-save').click(function() {
    Timer.Minute = $('#clock-timer-minute-picker').data("value");
    Timer.Second = $('#clock-timer-second-picker').data("value");

    if (Timer.Minute == undefined) {
        Timer.Minute = 0;
    }
    if (Timer.Second == undefined) {
        Timer.Second = 0;
    }

    console.log(Number(Timer.Minute), Number(Timer.Second), IsTimerValid(Number(Timer.Minute), Number(Timer.Second)))
    if (IsTimerValid(Number(Timer.Minute), Number(Timer.Second)) === false) {
        NM.Phone.Notifications.Add("clock", "Saat", `Daha sonraki zamanlar için zamanlayıcı kurabilirsiniz`, "color: #ff7e1496;", 1500);
        return;
    }
    
    $(`#timer-button[data-type="start"] p`).html('Durdur');
    $(`#timer-button[data-type="start"]`).attr('data-type', 'stop');

    NM.Phone.Notifications.Add("clock", "Saat", `${Timer.Minute} dakika ${Timer.Second} saniye sonrası için zamanlayıcı kuruldu`, "color: #ff7e1496;", 1500);
    
    UpdateTimer();
    Timer.Interval = setInterval(UpdateTimer, 1000);
    
    SwitchTimerPage('.clock-app-timer-setup', '.clock-app-timer-show', 100);
});

var IsTimerValid = (minute, second) => (minute != 0 || second > 1)

$('#clock-timer-edit').click(function() {
    $('#clock-timer-cancel').css("display", "block");
    SwitchTimerPage('.clock-app-timer-show', '.clock-app-timer-setup', -100);
});

function SwitchTimerPage(current, will, num) {
    $(current).animate({
        'left': num+'%',
    }, 300, function(){
        $(this).css('display', 'none');
    });
    
    $(will).css('display', 'block');
    $(will).animate({
        'left': 0+'%',
    }, 300);
}

function UpdateTimer() {
    Timer.Second = Number(Timer.Second) - 1;
    
    if (Timer.Second < 0) {
        Timer.Second = 59;
        Timer.Minute = Timer.Minute - 1;
    }
    
    if (Timer.Minute < 10) {
        Timer.Minute = Number(Timer.Minute);
        Timer.Minute = "0" + Timer.Minute.toString();
    }
    if (Timer.Second < 10) {
        Timer.Second = "0" + Timer.Second.toString();
    }

    $(`.clock-app-timer-remaining[data-type="second"]`).html(Timer.Second);
    $(`.clock-app-timer-remaining[data-type="minute"]`).html(Timer.Minute);

    if (Timer.Minute <= 0 && Timer.Second <= 0) {
        Timer.Minute = 0;
        Timer.Second = 0;
        clearInterval(Timer.Interval);

        $(`#timer-button[data-type="stop"] p`).html('Başlat');
        $(`#timer-button[data-type="stop"]`).attr('data-type', 'start');

        NM.Phone.Notifications.Add("clock", "Saat", "Zamanlayıcı durdu", "color: #ff7e1496;", 1500);
        NM.Phone.PlayingAudio = setInterval(TimerBeep, 1000);
    }
}

function TimerBeep() {
    beepAudio.play();
}

$(document).on('click', '#timer-button[data-type="start"]', function(e){
    e.preventDefault();

    if (Timer.Minute == 0 && Timer.Second == 0) {
        return;
    }

    Timer.Interval = setInterval(UpdateTimer, 1000);
    $(this).find('p').html('Durdur');
    $(this).attr('data-type', 'stop');
});

$(document).on('click', '#timer-button[data-type="stop"]', function(e){
    e.preventDefault();
    clearInterval(Timer.Interval);
    $(this).find('p').html('Başlat');
    $(this).attr('data-type', 'start');
});

$(document).on('click', '#timer-button[data-type="clear"]', function(e){
    e.preventDefault();
    clearInterval(Timer.Interval);
    $(`#timer-button[data-type="stop"] p`).html('Başlat');
    $(`#timer-button[data-type="stop"]`).attr('data-type', 'start');

    $(`.clock-app-timer-remaining[data-type="minute"],
       .clock-app-timer-remaining[data-type="second"]`).each(function() {
        $(this).html('00');     
    });
});

$("#clock-alarm-add").click(function() {
    SwitchTimerPage(".clock-app-alarm-show", ".clock-app-alarm-add", -100);
});

$("#clock-alarm-cancel").click(function() {
    SwitchTimerPage(".clock-app-alarm-add", ".clock-app-alarm-show", 100);
});
$("#clock-alarm-save").click(function() {
    SwitchTimerPage(".clock-app-alarm-add", ".clock-app-alarm-show", 100);
});

$('#clock-alarm-repeat-option').click(function() {
    var Options = ["Her Gün", "Hafta Sonu", "Hafta İçi"];

    OpenSelector("Alarm Tekrarı", Options, function(val) {
        $('#clock-alarm-repeat-option').attr("data-selected", val);
        $('#clock-alarm-repeat-option .settings-tab-description p').html(val);
    });
});