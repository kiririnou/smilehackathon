function fmtTime(minutes){
  return Math.floor((minutes / 60)) + ":" + (minutes % 60);
}

$(document).ready(function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 1440,
    values: [ 0, 0 ],
    slide: function( event, ui ) {
      $("#startInterval").text(fmtTime(ui.values[0]));
      $("#endInterval").text(fmtTime(ui.values[1]));
    }
  });

  function setChart() {
    var ctx = document.getElementById('myChart').getContext('2d');

    // let tempVal = Array();

    var myChart = new Chart(ctx, {
      type: 'line',

        data: {
          labels: ['12:01','14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
          datasets: [{
            label: 'MEMORY',
            data: [10, 3, 90, 100, 20, 40, 5, 100, 20, 10, 90, 20, 20, 40],
            borderColor: '#d45079',
            fill: false,
            borderWidth: 2
          }
        ]
        },
        options: {
          bezierCurve : false,
          scales: {
            xAxes: [{
              gridLines: {
                display:false
              }
          }],
          yAxes: [{
            gridLines: {
              display:false
            }
          }]
          }
        }
    });
  }


  setChart();

  function success(result){
    console.log(result);
  };

  $.ajax({
    url: "http://127.0.0.1:5000/api/avg_interval/BFEBFBFF00020652",
    success: success,
  });

});
