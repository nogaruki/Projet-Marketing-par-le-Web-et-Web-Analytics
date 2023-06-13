let bonbonChartElement = document.getElementById('bonbonChart');
let bonbonDayChartElement = document.getElementById('bonbonDayChart');
let commandeChartElement = document.getElementById('commandeChart');
let bonbonUserChartElement = document.getElementById('bonbonUserChart');
let selectUserElement = document.getElementById('selectUser');
let bonbonChart = null;
fetch("/getCommandeBonBon", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(commandes => {
        const commandeChart = new Chart(commandeChartElement, {
            type: 'line',
            data:  {
                labels: commandes.map(commande => commande.date),
                datasets: [{
                    label: 'Nombre de commandes',
                    data: commandes.map(commande => commande.nombre),
                    backgroundColor: [
                        'rgba(255, 199, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 199, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                onClick: (e) => {
                    console.log(e);
                }
            }
        });
    });

fetch("/getBonbonVendu", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(bonbons => {
        const bonbonChart = new Chart(bonbonChartElement, {
            type: 'bar',
            data:  {
                labels: bonbons.map(bonbon => bonbon.nom),
                datasets: [{
                    label: 'Nombre de bonbons vendus',
                    data: bonbons.map(bonbon => bonbon.nombre),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },

        });
    });

fetch("/getBonbonVenduParJour", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(bonbons => {
        const bonbonChart = new Chart(bonbonDayChartElement, {
            type: 'line',
            data:  {
                labels: bonbons.map(bonbon => bonbon.date),
                datasets: [{
                    label: 'Nombre de bonbons vendus',
                    data: bonbons.map(bonbon => bonbon.nombreTotal),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                onClick: (c, i) => {
                    let index = i[0].index;
                    alert(bonbons[i[0].index].bonbons.map(bonbon => bonbon.nom +' vendu: '+bonbon.nombre).join(",\n "));
                }
            }
        });
    });

selectUserElement.onchange = (e) => {
    let id = e.target.value;
    if(id !== -1) {
        fetch(`/getBonbonPerUser/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(bonbons => {
                if(bonbonChart !== null) {
                    bonbonChart.destroy();
                }
                bonbonChart = new Chart(bonbonUserChartElement, {
                    type: 'bar',
                    data:  {
                        labels: bonbons.map(bonbon => bonbon.nom),
                        datasets: [{
                            label: 'Nombre de bonbons vendus',
                            data: bonbons.map(bonbon => bonbon.nombre),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1
                        }]
                    }
                });
            });
    }
}