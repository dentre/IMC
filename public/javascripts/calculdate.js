function calcul(date1, date2) {
	// Obtenez 1 jour en millisecondes
	var one_day = 1000 * 60 * 60 * 24;
	// Convertit les deux dates en millisecondes
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();
	// Calculer la différence en millisecondes
	var difference_ms = date1_ms - date2_ms;
	// Revenez en jours et retournez
	return Math.round(difference_ms / one_day);
}

function calculcomplexe() {
	if res < 1826.25 {
		jours_dispo = res * 0.068;
	} else if res < 3652.5 {
		jours_dispo = res * 0.071;
	} else if res < 5478.75 {
		jours_dispo = res * 0.074;
	} else if res < 7305 {
		jours_dispo = res * 0.076;
	} else {
		jours_dispo = res * 0.069;
	};

	switch (res) {
	case (res < 1826.25):
		jours_dispo = res * 0.068;
		break;
	case (res < 3652.5):
		jours_dispo = res * 0.071;
		break;
	case (res < 5478.75):
		jours_dispo = res * 0.074;
		break;
	case (res < 7305):
		jours_dispo = res * 0.076;
		break;
	case (res > 7305):
		jours_dispo = res * 0.079;
		break;
	}