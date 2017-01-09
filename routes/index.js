var express = require('express');
var router = express.Router();

/* GET home page. */
function get_date() {
    var mydate = new Date()
    var year = mydate.getYear()
    if (year < 1000)
        year += 1900;
    var day = mydate.getDay();
    var month = mydate.getMonth();
    var daym = mydate.getDate();
    if (daym < 10)
        daym = "0" + daym;
    var dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday");
    var montharray = new Array("January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December");

        date = dayarray[day] + ", " + montharray[month] + " " + daym + ", " + year;


    return date;
}
router.get('/', function(req, res, next) {
  res.render('index', {
   date: get_date()
   });
});

module.exports = router;
