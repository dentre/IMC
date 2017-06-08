var logger = require('log4js').getLogger('scheduler');
logger.setLevel(GLOBAL.config["LOGS"].level);
var mongoose = require('mongoose');
var genericModel = require('../otf_core/lib/otf_mongooseGeneric');
var cronJob = require('node-cron');

var job = cronJob.schedule('*/5 * * * *', function () {
			logger.debug('Mise à jour des données');
			var model = global.schemas['AccountId'];
			model.getDocuments({}, function (err, list_users) {
				function updateAccountConges(i, cbk) {
					if (i < list_users.length) {
						/** todo : ici calculer le prorata de congé en plus */
						var _id = list_users[i]._id;
						var date_entree = new Date(list_users[i].date);
						var res = calcul(new Date(), date_entree);
						anciente(res);
						conges = (conges.toFixed(1));
						var rtt = calcul(new Date(), date_entree) * 0.03;
						rtt = (rtt.toFixed(1));
						console.log('jours travaillés depuis l\'arrivée : ' + res);
						console.log('Jours de congés disponibles :' + conges + '  RTT disponibles :' + rtt);
						var jours_dispo = conges - list_users[i].jours_pris;
						var rtt_dispo = rtt -list_users[i].rtt_pris;
						rtt_dispo = (rtt_dispo.toFixed(1));
						// Mise à jour de l'enregistrement AccountId en cours de parcours
						model.updateDocument({_id: _id}, {conges : conges, rtt: rtt, jours_dispo: jours_dispo, rtt_dispo: rtt_dispo}, function (err, data) {
							console.log('mise à jour effectué pour : ', data);
							updateAccountConges(i+1, cbk);
						});
					} else {cbk();}
				}
				updateAccountConges(0, function() {
					console.log('calculs des jours de congés et des rtt + jours dispo et rtt dispo terminés');
				});				
			});	
		}, function () {console.log('erreurs detectées');}, // fin tâche cron
		 false,
		 null
	); // fin fonction scheduler
function startCron() {
	job.start();
}

exports.startCron = startCron;

function anciente(data) {
	if (data < 1826.25) {
		conges = data * 0.068;
	} else if (data < 3652.5) {
		conges = data * 0.071;
	} else if (data < 5478.75) {
		conges = data * 0.074;
	} else if (data < 7305) {
		conges = data * 0.076;
	} else {
		conges = data * 0.079;
	}
}

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