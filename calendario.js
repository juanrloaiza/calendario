calendario = document.getElementById("calendario")

let processDate = function (date) {
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`
}

fetch('calendario/logica.json').then(response => response.json())
    .then(dates => {
        let base_table = `<table class='table is-hoverable'>
                            <thead>
                                <tr><th>Corte</th><th>Fecha</th><th>Evaluación</th><th>%</th></tr>
                            </thead>
                            <tbody>`

        cortes = Object.keys(dates)

        cortes.forEach(corte => {
            base_table += '<tr><td rowspan=' + (dates[corte].length) + '>' + corte + '</td>'

            dates[corte].forEach(date => {
                let startDate = new Date(date['fecha-inicio'])

                let endDate = null
                if (date["fecha-final"]) { endDate = new Date(date["fecha-final"]) }


                let style = `style="${Date.now() < startDate ? "" : "color: #aaa"}`
                base_table += `<td ${style}">
                                ${processDate(startDate)}
                                ${endDate ? "&ndash; " + processDate(endDate) : ""}
                                </td >`
                base_table += `<td ${style}">${date['nombre']}</td>`
                base_table += `<td ${style}">${date['porcentaje']}%</td></tr>`
            })
        });

        base_table = base_table + '</tbody></table>'

        calendario.innerHTML = base_table
    })


