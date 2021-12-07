$(function() {
    $( ".calculator-app " ).click(function() {
        $( ".text" ).focus();
    });

    $(".text").keydown(function (e) {
    //  backspace, delete, tab, escape, enter and vb tuşlara izin vermek için.
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 109, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) || // ctrl-a
            (e.keyCode == 67 && e.ctrlKey === true) || //ctrl + c
            (e.keyCode == 88 && e.ctrlKey === true) || //crtl + x 
            (e.keyCode == 55 && e.shiftKey === true) || // :/
            (e.keyCode == 109 ) || // -
            (e.keyCode == 107 ) || // +
            (e.keyCode == 106 ) || // *
            (e.keyCode >= 35 && e.keyCode <= 39)) { // sol , sag
            
            return;
        }
        // sayisal deger sorgulama
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});


function CalculatorAddKey(key) {
    if (document.form.text.value == "0") {
        document.form.text.value = key;
    } else {
        document.form.text.value = document.form.text.value + key;
    }
}

function CalculatorCalculate() {
    var val = document.form.text.value;

    if (val) {
        document.form.text.value = eval(val);
    }
}

function CalculatorClearAll() {
    document.form.text.value = "0";
}
        
function CalculatorCorrect() {
    var val = document.form.text.value;
    document.form.text.value = val.substring(0, val.length-1);
}

function CheckKeys(event) {
    event = event || window.event;
    if (event.which === 13) {
        event.preventDefault();
        return (false);
    }
}

document.onkeyup = function (data) {
    if (data.which == 13 ) {
        CalculatorCalculate();
    }
};


