var FoccusedBank = null;

$(document).on('click', '.bank-app-account', function(e) {
    var copyText = document.getElementById("iban-account");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "IBAN Kopyalandı", "#badc58", 1750);
});

var CurrentTab = "accounts";

$(document).on('click', '.bank-app-header-button', function(e) {
    e.preventDefault();

    var PressedObject = this;
    var PressedTab = $(PressedObject).data('headertype');

    if (CurrentTab != PressedTab) {
        var PreviousObject = $(".bank-app-header").find('[data-headertype="' + CurrentTab + '"]');

        if (PressedTab == "invoices") {
            $(".bank-app-" + CurrentTab).animate({
                left: -30 + "vh"
            }, 250, function() {
                $(".bank-app-" + CurrentTab).css({ "display": "none" })
            });
            $(".bank-app-" + PressedTab).css({ "display": "flex" }).animate({
                left: 0 + "vh"
            }, 250);
        } else if (PressedTab == "accounts") {
            $(".bank-app-" + CurrentTab).animate({
                left: 30 + "vh"
            }, 250, function() {
                $(".bank-app-" + CurrentTab).css({ "display": "none" })
            });
            $(".bank-app-" + PressedTab).css({ "display": "block" }).animate({
                left: 0 + "vh"
            }, 250);
        } else if (PressedTab == "transfer") {
            $(".bank-app-" + CurrentTab).animate({
                left: 30 + "vh"
            }, 250, function() {
                $(".bank-app-" + CurrentTab).css({ "display": "none" })
            });
            $(".bank-app-" + PressedTab).css({ "display": "flex" }).animate({
                left: 0 + "vh"
            }, 250);
        }

        $(PreviousObject).removeClass('bank-app-header-button-selected');
        $(PressedObject).addClass('bank-app-header-button-selected');
        setTimeout(function() { CurrentTab = PressedTab; }, 300)
    }
})

NM.Phone.Functions.DoBankOpen = function() {
    $(".bank-app-account-number").val(NM.Phone.Data.PlayerData.charinfo.account);
    $(".bank-app-account-balance").html("$ " + NM.Phone.Data.PlayerData.money.bank);
    $(".bank-app-account-balance").data('balance', NM.Phone.Data.PlayerData.money.bank);

    $(".bank-app-loaded").css({ "display": "none", "padding-left": "30vh" });
    $(".bank-app-accounts").css({ "left": "30vh" });
    $(".qbank-logo").css({ "left": "0vh" });
    $("#qbank-text").css({ "opacity": "0.0", "left": "9vh" });
    $(".bank-app-loading").css({
        "display": "block",
        "left": "0vh",
    });
    setTimeout(function() {
        CurrentTab = "accounts";
        $(".qbank-logo").animate({
            left: -12 + "vh"
        }, 500);
        setTimeout(function() {
            $("#qbank-text").animate({
                opacity: 1.0,
                left: 14 + "vh"
            });
        }, 100);
        setTimeout(function() {
            $(".bank-app-loaded").css({ "display": "block" }).animate({ "padding-left": "0" }, 300);
            $(".bank-app-accounts").animate({ left: 0 + "vh" }, 300);
            $(".bank-app-loading").animate({
                left: -30 + "vh"
            }, 300, function() {
                $(".bank-app-loading").css({ "display": "none" });
            });
        }, 1500)
    }, 500)
}

// $(document).on('click', '.bank-app-account-actions', function(e) {
//     NM.Phone.Animations.TopSlideUp(".bank-app-transfer", 400, 0);
// });

// $(document).on('click', '#cancel-transfer', function(e) {
//     e.preventDefault();
//     NM.Phone.Animations.TopSlideDown(".bank-app-transfer", 400, -100);
// });

$(document).on('click', '#accept-transfer', function(e) {
    e.preventDefault();

    var iban = $("#bank-transfer-iban").val();
    var amount = $("#bank-transfer-amount").val();
    var amountData = $(".bank-app-account-balance").data('balance');

    if (iban != "" && amount != "") {
        if (amountData >= amount) {
            $.post('http://qb-phone/TransferMoney', JSON.stringify({
                iban: iban,
                amount: amount
            }), function(data) {
                if (data.CanTransfer) {
                    $("#bank-transfer-iban").val("");
                    $("#bank-transfer-amount").val("");
                    $(".bank-app-account-balance").html("$ " + data.NewAmount);
                    $(".bank-app-account-balance").data('balance', data.NewAmount);
                    NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "$ " + amount + " Tutarındaki transfer gerçekleşti", "#badc58", 1500);
                } else {
                    NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "Yetersiz Bakiye", "#badc58", 1500);
                }
            })
            // NM.Phone.Animations.TopSlideUp(".bank-app-transfer", 400, -100);
        } else {
            NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "Yetersiz Bakiye", "#badc58", 1500);
        }
    } else {
        NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "Bütün alanları doldurunuz", "#badc58", 1750);
    }
});

GetInvoiceLabel = function(type) {
    retval = type

    return retval
}

$(document).on('click', '.pay-invoice', function(event) {
    event.preventDefault();

    var InvoiceId = $(this).parent().parent().attr('id');
    var InvoiceData = $("#" + InvoiceId).data('invoicedata');
    var BankBalance = $(".bank-app-account-balance").data('balance');
    if (BankBalance >= InvoiceData.amount) {
        $.post('http://qb-phone/PayInvoice', JSON.stringify({
            sender: InvoiceData.sender,
            amount: InvoiceData.amount,
            invoiceId: InvoiceData.id,
        }), function(CanPay) {
            if (CanPay) {
                $("#" + InvoiceId).animate({
                    left: 30 + "vh",
                }, 300, function() {
                    setTimeout(function() {
                        $("#" + InvoiceId).remove();
                    }, 100);
                });
                NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", InvoiceData.amount + "$ Tutardındaki fatura ödendi", "#badc58", 1500);
                var amountData = $(".bank-app-account-balance").data('balance');
                $("#bank-transfer-amount").val(amountData - InvoiceData.amount);
                $(".bank-app-account-balance").data('balance', amountData - InvoiceData.amount);
            } else {
                NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "Yetersiz Bakiye", "#badc58", 1500);
            }
        });
    } else {
        NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "Yetersiz Bakiye", "#badc58", 1500);
    }
});

$(document).on('click', '.bank-app-invoices-footer', function(event) {
    event.preventDefault();

    var BankBalance = $(".bank-app-account-balance").data('balance');
    var TotalBalance = $('#total-fine-amount').attr('amount');

    if (BankBalance >= TotalBalance) {
        $('.bank-app-invoices-list .bank-app-invoice').each(function() {
            var InvoiceId = $(this).attr('id');
            var InvoiceData = $("#" + InvoiceId).data('invoicedata');

            $.post('http://qb-phone/PayInvoice', JSON.stringify({
                sender: InvoiceData.sender,
                amount: InvoiceData.amount,
                invoiceId: InvoiceData.id,
            }), function(CanPay) {
                if (CanPay) {
                    $("#" + InvoiceId).animate({
                        left: 30 + "vh",
                    }, 300, function() {
                        setTimeout(function() {
                            $("#" + InvoiceId).remove();
                        }, 100);
                    });
                    var amountData = $(".bank-app-account-balance").data('balance');
                    $("#bank-transfer-amount").val(amountData - InvoiceData.amount);
                    $(".bank-app-account-balance").data('balance', amountData - InvoiceData.amount);
                    NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", TotalBalance + "$ Tutardındaki fatura ödendi", "#badc58", 1500);
                    $('#total-fine-amount').html('0$');
                    $('.bank-app-invoices-list').empty();
                } else {
                    NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "Ödeme Başarısız Oldu", "#badc58", 1500);
                }
            });
        });
    } else {
        NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "Yetersiz Bakiye", "#badc58", 1500);
    }
});

$(document).on('click', '.decline-invoice', function(event) {
    event.preventDefault();
    var TotalBalance = $('#total-fine-amount').attr('amount');
    var InvoiceId = $(this).parent().parent().attr('id');
    var InvoiceData = $("#" + InvoiceId).data('invoicedata');
    var BankBalance = $(".bank-app-account-balance").data('balance');
    if (BankBalance >= InvoiceData.amount) {
        $.post('http://qb-phone/PayInvoice', JSON.stringify({
            sender: InvoiceData.sender,
            amount: InvoiceData.amount,
            invoiceId: InvoiceData.id,
        }), function(CanPay) {
            if (CanPay) {
                $("#" + InvoiceId).animate({
                    left: 30 + "vh",
                }, 300, function() {
                    setTimeout(function() {
                        $("#" + InvoiceId).remove();
                    }, 100);
                });
                NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", InvoiceData.amount + "$ Tutardındaki fatura ödendi", "#badc58", 1500);
                var amountData = $(".bank-app-account-balance").data('balance');
                $("#bank-transfer-amount").val(amountData - InvoiceData.amount);
                var kalanfatura = TotalBalance - InvoiceData.amount 
                $("#total-fine-amount").html(+TotalBalance - InvoiceData.amount+"$");
                $(".bank-app-account-balance").data('balance', amountData - InvoiceData.amount);
            } else {
                NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "Yetersiz Bakiye", "#badc58", 1500);
            }
        });
    } else {
        NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "Yetersiz Bakiye", "#badc58", 1500);
    }
    
    // event.preventDefault();
    // var InvoiceId = $(this).parent().parent().attr('id');
    // var InvoiceData = $("#" + InvoiceId).data('invoicedata');

    // $.post('http://qb-phone/DeclineInvoice', JSON.stringify({
    //     sender: InvoiceData.sender,
    //     amount: InvoiceData.amount,
    //     invoiceId: InvoiceData.invoiceid,
    // }));
    // $("#" + InvoiceId).animate({
    //     left: 30 + "vh",
    // }, 300, function() {
    //     setTimeout(function() {
    //         $("#" + InvoiceId).remove();
    //     }, 100);
    // });
    // NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", InvoiceData.amount + "$ Tutardındaki fatura ödendi", "#badc58", 1500);
});

NM.Phone.Functions.LoadBankInvoices = function(invoices) {
    if (invoices !== null) {
        var total = 0;
        $(".bank-app-invoices-list").html("");

        $.each(invoices, function(i, invoice) {
            // var Elem = '<div class="bank-app-invoice" id="invoiceid-' + i + '"> <div class="bank-app-invoice-title">' + GetInvoiceLabel(invoice.label) + ' <span style="font-size: 1vh; color: gray;">(Sender: ' + invoice.name + ')</span></div> <div class="bank-app-invoice-amount">$ ' + invoice.amount + ',-</div> <div class="bank-app-invoice-buttons"> <i class="fas fa-check-circle pay-invoice"></i> <i class="fas fa-times-circle decline-invoice"></i> </div> </div>';
            var Elem = '<div class="bank-app-invoice" id="invoiceid-' + i + '"> <div class="bank-app-invoice-title">' + GetInvoiceLabel(invoice.label) + ' </div> <div class="bank-app-invoice-amount">$ ' + invoice.amount + '</div> <div class="bank-app-invoice-buttons"> <i class="fas fa-times-circle decline-invoice"></i> </div> </div>';
            total += invoice.amount;
            $('#total-fine-amount').html(`${total}$`);
            $('#total-fine-amount').attr('amount', total);
            $(".bank-app-invoices-list").append(Elem);
            $("#invoiceid-" + i).data('invoicedata', invoice);
        });
    }
}

NM.Phone.Functions.LoadBankHistory = function(history) {
    if (history !== null) {
        $(".bank-app-history").html("");

        $.each(history, function(i, item) {
            // var Elem = '<div class="bank-app-invoice" id="invoiceid-' + i + '"> <div class="bank-app-invoice-title">' + GetInvoiceLabel(invoice.label) + ' <span style="font-size: 1vh; color: gray;">(Gönderici: ' + invoice.name + ')</span></div> <div class="bank-app-invoice-amount">$ ' + invoice.amount + ',-</div> <div class="bank-app-invoice-buttons"> <i class="fas fa-check-circle pay-invoice"></i> <i class="fas fa-times-circle decline-invoice"></i> </div> </div>';

            var Elem = `<div class="bank-app-history-item">
                            <div class="bank-app-history-header">
                                <i class="fas fa-exchange-alt"></i>
                                <div>
                                    <i class="fas fa-plus"></i>
                                    <span>${item.amount}</span>
                                </div>
                            </div>
                            <div class="bank-app-history-item-description">
                                <span>${item.description}</span>
                            </div>
                        </div>`

            $(".bank-app-history").append(Elem);
        });
    }
}

NM.Phone.Functions.LoadContactsWithNumber = function(myContacts) {
    var ContactsObject = $(".bank-app-my-contacts-list");
    $(ContactsObject).html("");
    var TotalContacts = 0;

    $("#bank-app-my-contact-search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".bank-app-my-contacts-list .bank-app-my-contact").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    if (myContacts !== null) {
        $.each(myContacts, function(i, contact) {
            var RandomNumber = Math.floor(Math.random() * 6);
            var ContactColor = NM.Phone.ContactColors[RandomNumber];
            var ContactElement = '<div class="bank-app-my-contact" data-bankcontactid="' + i + '"> <div class="bank-app-my-contact-firstletter">' + ((contact.name).charAt(0)).toUpperCase() + '</div> <div class="bank-app-my-contact-name">' + contact.name + '</div> </div>'
            TotalContacts = TotalContacts + 1
            $(ContactsObject).append(ContactElement);
            $("[data-bankcontactid='" + i + "']").data('contactData', contact);
        });
    }
};

$(document).on('click', '.bank-app-my-contacts-list-back', function(e) {
    e.preventDefault();

    NM.Phone.Animations.TopSlideUp(".bank-app-my-contacts", 400, -100);
});

$(document).on('click', '.bank-transfer-mycontacts-icon', function(e) {
    e.preventDefault();

    NM.Phone.Animations.TopSlideDown(".bank-app-my-contacts", 400, 0);
});

$(document).on('click', '.bank-app-my-contact', function(e) {
    e.preventDefault();
    var PressedContactData = $(this).data('contactData');

    if (PressedContactData.iban !== "" && PressedContactData.iban !== undefined && PressedContactData.iban !== null) {
        $("#bank-transfer-iban").val(PressedContactData.iban);
        $.post("http://qb-phone/aiakos-inputcheck", JSON.stringify({input: false}));
    } else {
        NM.Phone.Notifications.Add("fas fa-university", "Vlast Bank", "Bu numaraya tanımlı bir hesap bulunmuyor.", "#badc58", 2500);
    }
    NM.Phone.Animations.TopSlideUp(".bank-app-my-contacts", 400, -100);
});