var regularPrice = 299;

var periods = [
  { date: new Date(2017, 11, 31), price: 89 },            // End Q4 2017
  { date: new Date(2018, 2, 31), price: 149 },            // End Q1 2018
  { date: new Date(2018, 5, 30), price: 199 },            // End Q2 2018
  { date: new Date(2018, 8, 30), price: 249 },            // End Q3 2018
  { date: new Date(2018, 9, 1), price: regularPrice }     // Regular price beginning Q4
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
  $price = $('.plan-price');
  $discount = $('.plan-discount');
  $regularPrice = $('.regular-price');

  var currentPeriod = getCurrentPeriod();
  var price = currentPeriod['price'];
  var discount = Math.floor(100 - price * 100 / regularPrice);
  var day = 1000 * 60 * 60 * 24;
  var daysLeft = Math.ceil((currentPeriod['date'].getTime() - today.getTime()) / (day));

  if (daysLeft <= 7) {
    $daysContainer.addClass('danger');
  }

  if (price === regularPrice) {
    $regularPrice.addClass('no-currency');
    $regularPrice.html('Regular Price');
  }

  $daysElement.html(daysLeft);
  $price.html(price);
  $discount.html(discount);
}

function getCurrentPeriod() {
  var sortedPeriods = periods.sort(function (a, b) {
    var distanceA = Math.abs(today - a.date);
    var distanceB = Math.abs(today - b.date);
    return distanceA - distanceB;
  });

  return sortedPeriods[0];
}