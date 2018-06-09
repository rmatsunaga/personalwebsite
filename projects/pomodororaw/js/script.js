$(document).ready(function(){
    var buzzer = $("#buzzer")[0];
    var ogCount = parseInt($("#num").html())
    var ogBreaktime = parseInt($("#breaknum").html())
    var ogLongbreaktime = parseInt($("#longbreaknum").html())
    var cycle = 0;

    $("#reset").hide();

    $("#start").click(function(){
      var counter = setInterval(timer, 1000);
      var count = ogCount * 60;
      var breaktime = ogBreaktime * 60;
      var longbreaktime = ogLongbreaktime * 60;

      function timer() {
        $("#timeType").show();
        //Hide Variables
        $("#start, #minus5clock, #add5clock, #minus5break, #add5break, #minus5longbreak, #add5longbreak, #breaknum, #longbreaknum, #title1, #title2, #title3").hide();
        $("#timeType").html("Session Time: ");
        count -= 1;
        if (count === 0) {
          cycle ++;
          buzzer.play();
          count = ogCount * 60;
          clearInterval(counter);
          if (cycle === 4) {
             cycle = 0;
             var startLongBreak = setInterval(longbreakTimer, 1000);
          } else {
             var startBreak = setInterval(breakTimer, 1000);
          }
          $("#num").hide();
        }
        if (count % 60 >= 10){
           $("#num").html(Math.floor(count/60) + ":" + count%60);
        } else {
          $("#num").html(Math.floor(count/60) + ":" + "0" + count%60);
        }

        function breakTimer() {
          $("#timeType").html("Break Time: ");
          $("#breaknum").show();
          $("#timeType").show();
          breaktime -= 1;
          if (breaktime === 0) {
            buzzer.play();
            clearInterval(startBreak);
            breaktime = ogBreaktime * 60;
            counter = setInterval(timer, 1000);
            $("#num").show();
            $("#breaknum").hide();
          }
          if (breaktime % 60 >= 10){
             $("#breaknum").html(Math.floor(breaktime/60) + ":" + breaktime%60);
          } else {
            $("#breaknum").html(Math.floor(breaktime/60) + ":" + "0" + breaktime%60);
          }
        }

        function longbreakTimer() {
          $("#timeType").html("Long Break Time: ");
          $("#longbreaknum").show();
          $("#timeType").show();
          longbreaktime -= 1;
          if (longbreaktime === 0) {
            buzzer.play();
            clearInterval(startLongBreak);
            longbreaktime = ogLongbreaktime * 60;
            $("#reset").show();
            $("#breaknum").hide();
          }
          if (longbreaktime % 60 >= 10){
             $("#longbreaknum").html(Math.floor(longbreaktime/60) + ":" + longbreaktime%60);
          } else {
            $("#longbreaknum").html(Math.floor(longbreaktime/60) + ":" + "0" + longbreaktime%60);
          }
        }
      }

    });

    $("#reset").click(function() {
      count = ogCount;
      breaktime = ogBreaktime;
      longbreaktime = longBreaktime;
      $("#num").html(count);
      $("#breaknum").html(breaktime);
      $("#start, #minus5clock, #add5clock, #minus5break, #add5break, #breaknum, #num, #title1, #title2, #title3, #add5longbreak, #minus5longbreak, #longbreaknum").show();
      $("#timeType, #reset").hide();

    });

    $("#minus5clock").click(function() {
      if (ogCount >= 5) {
        ogCount -= 5;
        $("#num").html(ogCount);
      }
    });

    $("#add5clock").click(function() {
        ogCount += 5;
        $("#num").html(ogCount);
    });

    $("#minus5break").click(function() {
      if (ogBreaktime >= 5) {
        ogBreaktime -= 5;
        $("#breaknum").html(ogBreaktime);
      }
    });

    $("#add5break").click(function() {
        ogBreaktime += 5;
        $("#breaknum").html(ogBreaktime);
    });
    $("#minus5longbreak").click(function() {
      if (ogLongbreaktime >= 5) {
        ogLongbreaktime -= 5;
        $("#longbreaknum").html(ogLongbreaktime);
      }
    });

    $("#add5longbreak").click(function() {
        ogLongbreaktime += 5;
        $("#longbreaknum").html(ogLongbreaktime);
    });


});
