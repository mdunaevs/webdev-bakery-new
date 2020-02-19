//Graph functions
document.addEventListener('DOMContentLoaded', function () {
    var myChartWeek = Highcharts.chart('best_times_week', {
        chart: {
            type: 'bar',
            backgroundColor: "#bebab7"
        },
        title: {
            text: 'Popular Times: Wed-Fri'
        },
        xAxis: {
          categories: ['12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm']
        },
        yAxis: {
            title: {
                text: 'People'
            }
        },
        series: [
          {
            name: 'Average number of people visiting the store Wed-Fri',
            data: [10,8,24,5,7,32,16,18,27,39,32,22],
            color: '#800020'
          }
      ]
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var myChartWeekend = Highcharts.chart('best_times_weekend', {
        chart: {
            type: 'bar',
            backgroundColor: "#e8e6de"
        },
        title: {
            text: 'Popular Times: Sat-Sun'
        },
        xAxis: {
          categories: ['10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm']
        },
        yAxis: {
            title: {
                text: 'People'
            }
        },
        series: [
          {
            name: 'Average number of people visiting the store Sat-Sun',
            data: [30,33,50,48,25,28,27,24,46,66,73,70]
          }
      ]
    });
});
