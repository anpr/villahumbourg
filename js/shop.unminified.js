
function buildSelect(selId, data) {
    var selectObj = jQuery(selId)[0];
    selectObj.options.length = 0;
    jQuery.each(data, function () {
        var option = new Option(this.text, this.value);
        if (jQuery.browser.msie) {
            selectObj.add(option)
        } else {
            selectObj.add(option, null)
        }
    })
}
Number.prototype.toMoney = function (decimals, decimal_sep, thousands_sep) {
    var n = this,
        c = isNaN(decimals) ? 2 : Math.abs(decimals),
        d = decimal_sep || ",",
        t = (typeof thousands_sep === "undefined") ? "." : thousands_sep,
        sign = (n < 0) ? "-" : "",
        i = parseInt(n = Math.abs(n).toFixed(c)) + "",
        j = ((j = i.length) > 3) ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "")
};
var shop = function () {
    var debug = false;
    var merchant = "info@villahumbourg.it";
    if (debug) {
        merchant = "pacini_1316599639_biz@sgconsulting.it"
    }
    var importo = function (qta) {
        if (qta < 6) {
            return 11.2
        } else {
            if (qta < 12) {
                return 11.2
            } else {
                if (qta < 24) {
                    return 11.2
                } else {
                    return 11.2
                }
            }
        }
    };
    var paesi = [];
    var spese = {
        "it|italia": [
            [3, 6.5],
            [9, 7.65],
            [20, 9.6],
            [40, 13.8],
            [75, 21.75],
            [100, 26.65]
        ],
        "at|austria": [
            [5, 10],
            [9, 10],
            [13, 11],
            [20, 11.95],
            [30, 14.9],
            [40, 16.85],
            [50, 18.8]
        ],
        "fr|france": [
            [5, 14.25],
            [9, 14.8],
            [13, 15.3],
            [30, 15.3],
            [40, 30.5],
            [50, 33.9]
        ],
        "de|germany": [
            [5, 10.65],
            [9, 12],
            [13, 12.6],
            [20, 13.2],
            [30, 17.45],
            [40, 20.2],
            [50, 22.95]
        ],
        "nl|netherlands": [
            [5, 11.65],
            [9, 12.5],
            [13, 13.1],
            [20, 13.9],
            [30, 15.85],
            [40, 17.55],
            [50, 19.25]
        ],
        "si|slovenia": [
            [5, 14.05],
            [9, 15.1],
            [13, 16.4],
            [20, 17.05],
            [30, 21.5],
            [40, 24.5],
            [50, 27.5]
       ],
        "uk|united kingdom": [
            [5, 15.85],
            [9, 17.05],
            [13, 17.9],
            [20, 18.2],
            [30, 56.35],
            [40, 60.4],
            [50, 64.4]
        ]
    };
    var carrello = {
        importo_unitario: importo,
        qta: 0,
        importo: 0,
        spese: 0
    };
    var labelPaese = function (lang) {
        if (lang == "it") {
            return "Paese di destinazione"
        } else {
            return "Select your country"
        }
    };
    var errorQta = function (lang) {
        if (lang == "it") {
            return "Quantità non valida"
        } else {
            return "Please insert a number"
        }
    };
    var errorPaese = function (lang) {
        if (lang == "it") {
            return "Paese non valido"
        } else {
            return "Invalid country"
        }
    };
    var errorImpossibileSpedire = function (lang) {
        if (lang == "it") {
            return 'Impossibile inviare questa quantit&agrave; nel paese selezionato. <br />Contattaci via email per completare l\'ordine:<br /><a href="mailto: ludovica.profous@villahumbourg.it">ludovica.profous@villahumbourg.it</a><br />'
        } else {
            return 'Can\'t complete the order. Send us an email: <a href="mailto: ludovica.profous@villahumbourg.it">ludovica.profous@villahumbourg.it</a>'
        }
    };
    var selectOnePaese = function (lang) {
        if (lang == "it") {
            return "Seleziona il tuo paese"
        } else {
            return "Select your country"
        }
    };
    var prezzoMerce = function (importo, qta) {
        return importo * Math.floor(qta)
    };
    var pesoMerce = function (qta) {
        var peso = {
            "12": 13.5,
            "6": 6.5,
            "3": 3.5
        };
        var ncolli_12 = Math.floor(qta / 12);
        qta = qta - ncolli_12 * 12;
        var ncolli_6 = Math.floor(qta / 6);
        qta = qta - ncolli_6 * 6;
        var ncolli_3 = Math.floor(qta / 3);
        qta = qta - ncolli_3 * 3;
        if (qta > 0) {
            ncolli_3 += 1
        }
        if (shop.debug) {
            console.log("Colli da 12: " + ncolli_12);
            console.log("Colli da  6: " + ncolli_6);
            console.log("Colli da  3: " + ncolli_3)
        }
        return (ncolli_12 * peso["12"] + ncolli_6 * peso["6"] + ncolli_3 * peso["3"])
    };
    var paesiSelect = function (idSel, lang) {
        shop.paesi = [{
            text: labelPaese(lang),
            value: ""
        }];
        var spese = shop.spese;
        for (var paese in spese) {
            if (spese.hasOwnProperty(paese)) {
                var p = paese.split("|");
                shop.paesi[shop.paesi.length] = {
                    text: p[1],
                    value: paese
                }
            }
        }
        buildSelect(idSel, shop.paesi)
    };
    var getSpeseSped = function (qta, paese, lang) {
        var result = 0;
        if (paese == "") {
            return result
        } else {
            var pesoTot = pesoMerce(qta);
            if (shop.debug) {
                console.log("Qta: " + qta + " Peso: " + pesoTot)
            }
            var spese_pesi = shop.spese[paese];
            if (!spese_pesi) {
                jQuery("#errorPaese").html(errorPaese(lang));
                return result
            }
            for (var i = 0, len = spese_pesi.length; i < len; i++) {
                if (spese_pesi[i][0] >= pesoTot) {
                    result = spese_pesi[i][1];
                    if (shop.debug) {
                        console.log("spese = ", result)
                    }
                    return result
                }
            }
        }
        return false
    };
    var aggiornaImporti = function (lang) {
        jQuery("#errorQta").html("");
        jQuery("#errorPaese").html("");
        var carrello = shop.carrello;
        var qta = jQuery("#qta").val();
        if (isNaN(qta)) {
            jQuery("#errorQta").html(errorQta(lang));
            return
        }
        carrello.qta = qta;
        var prUnitario = carrello.importo_unitario(qta);
        carrello.importo = prezzoMerce(prUnitario, qta);
        jQuery("#totMerce").html(carrello.importo.toMoney(2, ",", "."));
        jQuery("#totale").html(carrello.importo.toMoney(2, ",", "."));
        var paese = jQuery("#paese").val();
        carrello.spese = getSpeseSped(carrello.qta, paese, lang);
        if (carrello.spese === false) {
            jQuery("#errMsg").html(errorImpossibileSpedire(lang));
            return
        }
        jQuery("#speseSped").html(carrello.spese.toMoney(2, ",", "."));
        var totale = carrello.importo + carrello.spese;
        jQuery("#totale").html(totale.toMoney(2, ",", "."));
        return
    };
    var dataToPaypal = function (lang) {
        var hidden_field = function (name, value) {
            var f = document.createElement("input");
            f.type = "hidden";
            f.name = name;
            f.value = value;
            return f
        };
        var returnPage = function (lang, debug) {
            var ret = "http://www.villahumbourg.it/english/thank-you.html";
            if (lang.toLowerCase() == "it") {
                ret = ret.replace("english", "italiano")
            } else {
                if (lang.toLowerCase() == "de") {
                    ret = ret.replace("english", "deutsch")
                }
            } if (debug) {
                ret = ret.replace("www.", "localhost/")
            }
            return ret
        };
        var cancelPage = function (lang, debug) {
            var ret = "http://www.villahumbourg.it/english/cancel.html";
            if (lang.toLowerCase() == "it") {
                ret = ret.replace("english", "italiano")
            } else {
                if (lang.toLowerCase() == "de") {
                    ret = ret.replace("english", "deutsch")
                }
            } if (debug) {
                ret = ret.replace("www.", "localhost/")
            }
            return ret
        };
        var qta = shop.carrello.qta,
            prUnitario = shop.carrello.importo_unitario,
            speseSped = shop.carrello.spese;
        if (speseSped == 0) {
            jQuery("#errorPaese").html(selectOnePaese(lang));
            return false
        }
        var paypalForm = document.createElement("form");
        paypalForm.method = "POST";
        if (shop.debug) {
            paypalForm.action = "https://sandbox.paypal.com/cgi-bin/webscr"
        } else {
            paypalForm.action = "https://www.paypal.com/cgi-bin/webscr"
        }
        paypalForm.appendChild(hidden_field("business", shop.merchant));
        paypalForm.appendChild(hidden_field("cmd", "_cart"));
        paypalForm.appendChild(hidden_field("upload", "1"));
        paypalForm.appendChild(hidden_field("currency_code", "EUR"));
        paypalForm.appendChild(hidden_field("no_shipping", "2"));
        paypalForm.appendChild(hidden_field("return", returnPage(lang, shop.debug)));
        paypalForm.appendChild(hidden_field("cancel_return", cancelPage(lang, shop.debug)));
        var lc = {
            it: "IT",
            en: "GB",
            de: "DE"
        };
        paypalForm.appendChild(hidden_field("lc", lc[lang]));
        var p = jQuery("#paese").val().split("|")[0];
        paypalForm.appendChild(hidden_field("country", p.toUpperCase()));
        paypalForm.appendChild(hidden_field("item_name_1", "Olio Extra vergine di Oliva - 0,5 litri"));
        paypalForm.appendChild(hidden_field("amount_1", "" + prUnitario(qta)));
        paypalForm.appendChild(hidden_field("quantity_1", "" + qta));
        paypalForm.appendChild(hidden_field("shipping_1", "" + speseSped));
        if (shop.debug) {
            console.log(paypalForm)
        }
        document.getElementById("hiddenForm").appendChild(paypalForm);
        paypalForm.submit();
        return false
    };
    return {
        debug: debug,
        merchant: merchant,
        paesi: paesi,
        spese: spese,
        aggiornaImporti: aggiornaImporti,
        paesiSelect: paesiSelect,
        carrello: carrello,
        dataToPaypal: dataToPaypal
    }
}();
