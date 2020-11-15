function gen() {
    var x = Math.floor(Math.random() * 36);
    if (x < 1) {
        return 2;
    } else if (x >= 1 && x < 3) {
        return 3;
    } else if (x >= 3 && x < 6) {
        return 4;
    } else if (x >= 6 && x < 10) {
        return 5;
    } else if (x >= 10 && x < 15) {
        return 6;
    } else if (x >= 15 && x < 21) {
        return 7;
    } else if (x >= 21 && x < 26) {
        return 8;
    } else if (x >= 26 && x < 30) {
        return 9;
    } else if (x >= 30 && x < 33) {
        return 10;
    } else if (x >= 33 && x < 35) {
        return 11;
    } else if (x >= 35) {
        return 12;
    }
}

function gen_chart(container, type_, title, subtitle, yaxis, data) {
    Highcharts.chart(container, {
        chart: {
            type: type_
        },
        rangeSelector: {
            selected: 1
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            categories: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: yaxis
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            line: {
                marker: {
                    enabled: false
                }
            }
        },
        credits: { enabled: false },
        series: [{
            step: true,
            name: '2 Würfel',
            data: data,
            color: '#057807',
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
}

function recalc() {
    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var arr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var cum_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var n = document.querySelector('#num').value;

    for (var i = 0; i < n; ++i) {
        var x = gen();
        arr[x - 2] += 1;
    }
    for (var i = 0; i < 11; ++i) {
        arr2[i] = arr[i] / n;
    }
    cum_arr[0] = arr2[0];
    for (var i = 1; i < 11; ++i) {
        cum_arr[i] = cum_arr[i-1] + arr2[i];
    }

    gen_chart('container', 'column', 'Das Würfel-Experiment', 'Wirf 2 Würfel und summiere die Augenzahl.', 'Anzahl Würfe', arr);
    gen_chart('container2', 'column', 'Die Wahrscheinlichkeitsverteilung einer Zufallsvariable X', 'Ein Histogramm', 'P(X = xi)', arr2);
    gen_chart('container3', 'line', 'Die kumulative Verteilungsfunktion F', 'Die Treppenfunktion', 'F(x) = P(X <= x)', cum_arr);
}
