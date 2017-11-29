var periods = [
  new Date(2017, 11, 31), // End Q4 2017
  new Date(2018, 2, 31),  // End Q1 2018
  new Date(2018, 5, 30),  // End Q2 2018
  new Date(2018, 8, 30),  // End Q3 2018
  new Date(2018, 9, 1)    // Regular price beginning Q4
]

$(document).ready(function () {

  $(".mouse").click(function () {
    $('html, body').animate({ scrollTop: $(".features-section").offset().top }, 1200);
  });

  setRemainingDays();

  // Smooth scrolling
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

function setRemainingDays() {
  today = new Date();
  $daysElement = $('#days-left');
  $daysContainer = $('.days');

  var currentPeriod = getCurrentPeriod();
  var day = 1000 * 60 * 60 * 24;
  var daysLeft = Math.ceil((currentPeriod.getTime() - today.getTime()) / (day));

  if (daysLeft <= 7) {
    $daysContainer.addClass('danger');
  }

  $daysElement.html(daysLeft);
}

function getCurrentPeriod() {
  var sortedPeriods = periods.sort(function (a, b) {
    var distanceA = Math.abs(today - a);
    var distanceB = Math.abs(today - b);
    return distanceA - distanceB;
  });

  return sortedPeriods[0];
}