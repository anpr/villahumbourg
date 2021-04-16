/* gestione delle varie select */
function buildSelect(selId, data) {
  var selectObj = jQuery(selId)[0];
  selectObj.options.length=0; // remove all options
  // add the new ones
  jQuery.each(data, function() {
    var option = new Option(this.text, this.value);
    if (jQuery.browser.msie) {
      selectObj.add(option);
    } else {
      selectObj.add(option, null);
    }
  });
}

Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep) { 
    var n = this,
    c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
    d = decimal_sep || ',', //if no decimal separetor is passed we use the comma as default decimal separator (we MUST use a decimal separator)

   /*
   according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
   the fastest way to check for not defined parameter is to use typeof value === 'undefined' 
   rather than doing value === undefined.
   */   
    t = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep, //if you don't want ot use a thousands separator you can pass empty string as thousands_sep value

    sign = (n < 0) ? '-' : '',

    //extracting the absolute value of the integer part of the number and converting to string
    i = parseInt(n = Math.abs(n).toFixed(c)) + '', 

    j = ((j = i.length) > 3) ? j % 3 : 0; 
    return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ''); 
};

var shop = function(){
    var debug = false; //debug flag
    var merchant = "info@villahumbourg.it";
    if (debug) {
	merchant = "pacini_1316599639_biz@sgconsulting.it";
    }

    var importo = function(qta) {
	if (qta < 6) {
	    return 8.15;
	} else if (qta < 12) {
	    return 7.99;
	} else if (qta < 24) {
	    return 7.83;
	} else {
	    return 7.67;
	}
    };
    var paesi = [];
    var spese = {"it|italia": 
		 [[3, 6.50], 
		  [10, 7.65],
		  [20, 9.60],
		  [40, 13.80],
		  [75, 21.75],
		  [100, 26.65]],
		 "it|italia (calabria e sicilia)": 
		 [[3, 12.50], 
		  [10, 13.65],
		  [20, 15.60],
		  [40, 19.80],
		  [75, 27.75],
		  [100, 32.65]],
		 "it|italia (sardegna)": 
		 [[3, 14.50], 
		  [10, 15.65],
		  [20, 17.60],
		  [40, 21.80],
		  [75, 29.75],
		  [100, 34.65]],
		 "it|italia (livigno, venezia e isole minori)": 
		 [[3, 22.50], 
		  [10, 23.65],
		  [20, 25.60],
		  [40, 29.80],
		  [75, 37.75],
		  [100, 42.65]],
		 "at|austria": 
		 [[5, 10],
		  [10, 11],
		  [15, 11.95],
		  [20, 12.95],
		  [30, 14.90],
		  [40, 16.85],
		  [50, 18.80]],
		 "be|belgium": 
		 [[5, 10.25],
		  [10, 11.05],
		  [15, 11.90],
		  [20, 12.75],
		  [30, 14.45],
		  [40, 16.15],
		  [50, 17.85]],
		 "br|bulgaria": 
		 [[5, 20.80],
		  [10, 24.05],
		  [15, 27.30],
		  [20, 30.55],
		  [30, 37.05],
		  [40, 43.55],
		  [50, 46.15]],
		 "cy|cyprus": 
		 [[5, 42.20],
		  [10, 65.65],
		  [15, 88.40],
		  [20, 111.15],
		  [30, 156.65],
		  [40, 202.15],
		  [50, 247.65]],
		 "cz|czech republic": 
		 [[5, 18.10],
		  [10, 19.25],
		  [15, 20.40],
		  [20, 21.60],
		  [30, 23.95],
		  [40, 26.25],
		  [50, 28.60]],
		 "dk|denmark": 
		 [[5, 14.40],
		  [10, 15.25],
		  [15, 16.10],
		  [20, 16.95],
		  [30, 18.65],
		  [40, 20.30],
		  [50, 22.00]],
		 "ee|estonia": 
		 [[5, 22.10],
		  [10, 25.35],
		  [15, 28.60],
		  [20, 31.85],
		  [30, 38.35],
		  [40, 44.85],
		  [50, 51.35]],
		 "fi|finland": 
		 [[5, 32.95],
		  [10, 35.15],
		  [15, 37.35],
		  [20, 39.55],
		  [30, 44.00],
		  [40, 48.40],
		  [50, 52.85]],
		 "fr|france": 
		 [[5, 18.70],
		  [10, 20.40],
		  [15, 22.05],
		  [20, 23.75],
		  [30, 27.15],
		  [40, 30.50],
		  [50, 33.90]],
		 "de|germany": 
		 [[5, 10.65],
		  [10, 12.00],
		  [15, 13.40],
		  [20, 14.75],
		  [30, 17.45],
		  [40, 20.20],
		  [50, 22.95]],
		 "gr|greece": 
		 [[5, 71.75],
		  [10, 89.55],
		  [15, 107.35],
		  [20, 125.20],
		  [30, 160.80],
		  [40, 196.40],
		  [50, 232.05]],
		 "hu|hungary": 
		 [[5, 15.55],
		  [10, 17.55],
		  [15, 19.55],
		  [20, 21.60],
		  [30, 25.60],
		  [40, 29.65],
		  [50, 33.65]],
		 "ie|ireland": 
		 [[5, 26.05],
		  [10, 27.85],
		  [15, 29.70],
		  [20, 31.50],
		  [30, 35.15],
		  [40, 38.80],
		  [50, 42.45]],
		 "lv|latvia": 
		 [[5, 22.10],
		  [10, 25.35],
		  [15, 28.60],
		  [20, 31.85],
		  [30, 38.35],
		  [40, 44.85],
		  [50, 51.35]], //lettonia
		 "lt|lithuania": 
		 [[5, 22.10],
		  [10, 25.35],
		  [15, 28.60],
		  [20, 31.85],
		  [30, 38.35],
		  [40, 44.85],
		  [50, 51.35]],
		 "lu|luxembourgh": 
		 [[5, 11.10],
		  [10, 11.95],
		  [15, 12.80],
		  [20, 13.65],
		  [30, 15.35],
		  [40, 17.05],
		  [50, 18.70]],
		 "mt|malta": 
		 [[5, 40.30],
		  [10, 59.80],
		  [15, 79.30],
		  [20, 98.80],
		  [30, 137.80],
		  [40, 176.80],
		  [50, 215.80]],
		 "nl|netherlands": 
		 [[5, 11.65],
		  [10, 12.50],
		  [15, 13.35],
		  [20, 14.20],
		  [30, 15.85],
		  [40, 17.55],
		  [50, 19.25]],
		 "pl|poland": 
		 [[5, 17.80],
		  [10, 19.00],
		  [15, 20.15],
		  [20, 21.30],
		  [30, 23.65],
		  [40, 26.00],
		  [50, 28.35]],
		 "pt|portugal": 
		 [[5, 21.90],
		  [10, 24.25],
		  [15, 26.60],
		  [20, 28.90],
		  [30, 33.60],
		  [40, 38.30],
		  [50, 42.95]],
		 "ro|romania": 
		 [[5, 22.10],
		  [10, 23.75],
		  [15, 25.35],
		  [20, 27.00],
		  [30, 30.25],
		  [40, 33.50],
		  [50, 36.75]],
		 "sk|slovakia": 
		 [[5, 25.30],
		  [10, 28.85],
		  [15, 32.35],
		  [20, 35.85],
		  [30, 42.85],
		  [40, 49.90],
		  [50, 56.90]],
		 "si|slovenia": 
		 [[5, 14.05],
		  [10, 15.55],
		  [15, 17.05],
		  [20, 18.50],
		  [30, 21.50],
		  [40, 24.50],
		  [50, 27.50]],
		 "es|spain": 
		 [[5, 18.30],
		  [10, 20.30],
		  [15, 22.30],
		  [20, 24.35],
		  [30, 28.35],
		  [40, 32.40],
		  [50, 36.40]],
		 "se|sweden": 
		 [[5, 19.95],
		  [10, 20.90],
		  [15, 21.90],
		  [20, 22.85],
		  [30, 24.80],
		  [40, 26.75],
		  [50, 28.70]],
		 "uk|united kingdom": 
		 [[5, 46.30],
		  [10, 48.30],
		  [15, 50.30],
		  [20, 52.30],
		  [30, 56.35],
		  [40, 60.40],
		  [50, 64.40]]
		};
    var carrello = {
	importo_unitario: importo,
	qta: 0,
	importo: 0.0,
	spese: 0.0
    };

    var labelPaese = function(lang) {
	if (lang=='it') {
	    return "Paese di destinazione";
	} else {
	    return "Select your country";
	}
    };

    var errorQta = function(lang) {
	if (lang=='it') {
	    return "Quantità non valida";
	} else {
	    return "Please insert a number";
	}
    };

    var errorPaese = function(lang) {
	if (lang=='it') {
	    return "Paese non valido";
	} else {
	    return "Invalid country";
	}
    };

    var errorImpossibileSpedire = function(lang) {
	if (lang=='it') {
	    return "Impossibile inviare questa quantit&agrave; nel paese selezionato. <br />Contattaci via email per completare l'ordine:<br /><a href=\"mailto: ludovica.profous@villahumbourg.it\">ludovica.profous@villahumbourg.it</a><br />";
	} else {
	    return "Can't complete the order. Send us an email: <a href=\"mailto: ludovica.profous@villahumbourg.it\">ludovica.profous@villahumbourg.it</a>";
	}
    };

    var selectOnePaese = function(lang) {
	if (lang=='it') {
	    return "Seleziona il tuo paese";
	} else {
	    return "Select your country";
	}
    };

    // calcolo il prezzo della merce
    var prezzoMerce = function(importo, qta) {
	return importo*Math.floor(qta);
    };

    // calcolo il peso complessivo della merce
    var pesoMerce = function(qta) {
	var peso = {'12': 13.5,
		    '6': 6.5,
		    '3': 3.5};
	var ncolli_12 = Math.floor(qta / 12);
	qta = qta - ncolli_12*12;
	var ncolli_6 = Math.floor(qta / 6);
	qta = qta - ncolli_6*6;
	var ncolli_3 = Math.floor(qta / 3);
	qta = qta - ncolli_3*3;
	if (qta > 0) {
	    ncolli_3 += 1;
	}
	if (shop.debug) {
	    console.log("Colli da 12: "+ncolli_12);
	    console.log("Colli da  6: "+ncolli_6);
	    console.log("Colli da  3: "+ncolli_3);	    
	}
	return (ncolli_12*peso['12'] + ncolli_6*peso['6'] + ncolli_3*peso['3']);
    };

    // select dei paesi: carico i dati paesi in json e costruisco la select
    var paesiSelect = function(idSel, lang) {
	shop.paesi = [{'text': labelPaese(lang),
		      'value': ''}];
	var spese = shop.spese;
	for (var paese in spese) {  
	    if (spese.hasOwnProperty(paese)) {  
		var p = paese.split("|");
		shop.paesi[shop.paesi.length] = {'text': p[1],
						 'value': paese};
	    }
	}
        buildSelect(idSel, shop.paesi);
    };

    // funzione per il calcolo delle spese di spedizione
    var getSpeseSped = function(qta, paese, lang) {
        var result = 0.0;	
	if (paese == '') {
	    return result;
	} else {
	    var pesoTot = pesoMerce(qta);
	    if (shop.debug) {
		console.log('Qta: '+qta+' Peso: '+pesoTot);
	    }
	    var spese_pesi = shop.spese[paese]; //prendo le spese per paese

	    if (!spese_pesi) {
		jQuery('#errorPaese').html(errorPaese(lang));
		return result;
	    }

	    for (var i=0, len=spese_pesi.length; i<len; i++) {
		if (spese_pesi[i][0] >= pesoTot) {
		    result = spese_pesi[i][1];
		    return result/2; //NOTA: dimezzo le spese di spedizione
		}
	    }
	}
	return false;
    };

    // aggiornamento importi: prezzo merce, spese spedizione e totale
    var aggiornaImporti = function(lang) {
	// azzero eventuali messaggi di errore
	jQuery('#errorQta').html('');
	jQuery('#errorPaese').html('');

	var carrello = shop.carrello;

	// read and check qta
	var qta = jQuery('#qta').val();
	if (isNaN(qta)) {
	    jQuery('#errorQta').html(errorQta(lang));
	    return ;
	}
	carrello.qta = qta;

	// prezzo merce
	var prUnitario = carrello.importo_unitario(qta);
	carrello.importo = prezzoMerce(prUnitario, qta);

	jQuery('#totMerce').html(carrello.importo.toMoney(2, ",", "."));

	jQuery('#totale').html(carrello.importo.toMoney(2, ",", "."));
	// calcolo spese sped
	var paese = jQuery('#paese').val();
	carrello.spese = getSpeseSped(carrello.qta, paese, lang);
	if (carrello.spese === false) {
            jQuery('#errMsg').html(errorImpossibileSpedire(lang));
	    return ;
	}
	jQuery('#speseSped').html(carrello.spese.toMoney(2, ",", "."));
	// totale: merce + spese sped
	var totale = carrello.importo + carrello.spese;
	jQuery('#totale').html(totale.toMoney(2, ",", "."));
	return ;
    };

    var dataToPaypal = function(lang) {
	var hidden_field = function(name, value) {
	    var f = document.createElement("input");
	    f.type = 'hidden';
	    f.name = name;
	    f.value = value;
	    return f;
	};

	var returnPage = function(lang, debug) {
	    var ret = "http://www.villahumbourg.it/english/thank-you.html";
	    if (lang.toLowerCase() == 'it') {
		ret = ret.replace('english', 'italiano');
	    } else if (lang.toLowerCase() == 'de') {
		ret = ret.replace('english', 'deutsch');
	    }
	    if (debug) {
		ret = ret.replace('www.', 'localhost/');
	    }
	    return ret;
	};

	var cancelPage = function(lang, debug) {
	    var ret = "http://www.villahumbourg.it/english/cancel.html";
	    if (lang.toLowerCase() == 'it') {
		ret = ret.replace('english', 'italiano');
	    } else if (lang.toLowerCase() == 'de') {
		ret = ret.replace('english', 'deutsch');
	    }
	    if (debug) {
		ret = ret.replace('www.', 'localhost/');
	    }
	    return ret;
	};

	var qta = shop.carrello.qta, 
	prUnitario = shop.carrello.importo_unitario, 
	speseSped = shop.carrello.spese;
	if (speseSped == 0.0) {
	    jQuery('#errorPaese').html(selectOnePaese(lang));
	    return false;
	}

	//costruisco la form e faccio il submit
	var paypalForm = document.createElement("form");
	paypalForm.method = 'POST';
	if (shop.debug) {
	    paypalForm.action = "https://sandbox.paypal.com/cgi-bin/webscr";
	} else {
	    paypalForm.action = "https://www.paypal.com/cgi-bin/webscr";
	}
	//identificativi merchant
	paypalForm.appendChild(hidden_field('business', shop.merchant));
	//opzioni transazione
	paypalForm.appendChild(hidden_field('cmd', '_cart'));
	paypalForm.appendChild(hidden_field('upload', '1'));
	paypalForm.appendChild(hidden_field('currency_code', 'EUR'));
	paypalForm.appendChild(hidden_field('no_shipping', '2'));
	paypalForm.appendChild(hidden_field('return', returnPage(lang, shop.debug)));
	paypalForm.appendChild(hidden_field('cancel_return', cancelPage(lang, shop.debug)));
	var lc = {it: 'IT', en: 'GB', de: 'DE'}; //lingua per la pagina paypal
	paypalForm.appendChild(hidden_field('lc', lc[lang]));
	//prendo il codice del paese
	var p = jQuery('#paese').val().split('|')[0];
	paypalForm.appendChild(hidden_field('country', p.toUpperCase()));
	// items
	paypalForm.appendChild(hidden_field('item_name_1', 'Olio Extra vergine di Oliva - 0,5 litri'));
	paypalForm.appendChild(hidden_field('amount_1', ''+prUnitario(qta)));
	paypalForm.appendChild(hidden_field('quantity_1', ''+qta));
	paypalForm.appendChild(hidden_field('shipping_1', ''+speseSped));
	if (shop.debug) {
	    console.log(paypalForm);
	}
	// metto la form nella pagina e faccio il submit
	document.getElementById('hiddenForm').appendChild(paypalForm);
	paypalForm.submit();
	return false;
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
    };
}();

