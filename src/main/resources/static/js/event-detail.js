$(function () {
    const backendServer = "http://localhost:8080";
    const frontendServer = "http://localhost:8084";
    var totalSlots,
        valMax,
        valMin;
    let id = $("#id").val();
    let title;
    console.log(id);
    if (id != "") {
        $.ajax({

            type: "GET",
            url: backendServer + "/api/event/" + id,
            dataType: 'json',
        }).done((res) => {
            console.table(res.data);
            loadInfo(res.data);
        }).fail((res) => {
            console.log(res.message);
        });

    }

    const loadInfo = async (event) => {
        title = event.title;
        $("#eventName").text(event.title);
        $(".event-name").text(event.title);
        $("#eventStatus").text(event.eventStautsid.name);
        $("#eventPrice").text(formatter.format(event.fee));
        $("#feeEvent").val(event.fee).change();
        $("#eventLocation").text(event.location);
        $("#eventAddress").text(event.address);
        $("#eventEnd").append('From: ' + toStringDate(event.startDate) + '<br/>' + 'To: ' + toStringDate(event.endDate));
        $("#eventOpen").append('From: ' + toStringDate(event.startRegisterDate) + '<br/>' + 'To: ' + toStringDate(event.endRegisterDate));
        $("#eventDescription").append(event.description);
        ratingStar(event.totalRatesPoint);
        $("#totalRates").text(event.totalRates);
        let imageUrl = await loadImageFromEvent(event.id);
        $("#eventImage").attr("src", imageUrl);
        $("#selectQuantity").attr('min', event.minSlot).attr('max', event.maxSlot).val(0).change();
        valMax = event.maxSlot, valMin = event.minSlot;

        let today = new Date();
        let checkStartRegister = Date.daysBetween(today, toOjectDAte(event.startRegisterDate));
        let checkEndRegister = Date.daysBetween(today, toOjectDAte(event.endRegisterDate));

        if (checkStartRegister > 0) {
            $("#btnJoinNow").removeClass('btn btn-outline-danger font-weight-bold mt-2 animated pulse infinite')
                .addClass('btn btn-blue-grey font-weight-bold mt-2 disabled').text('Coming Soon');
        }
        if (checkEndRegister < 0) {
            $("#btnJoinNow").removeClass('btn btn-outline-danger font-weight-bold mt-2 animated pulse infinite')
                .addClass('btn btn-blue-grey font-weight-bold mt-2 disabled').text('Close Register');
        }
        totalSlots = event.totalSlots;
    }


    var operators = {
        '*': function (a, b) {
            return a * b
        },
    };

    //fee
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    //date
    const toStringDate = (dateTime) => {

        var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time

        var date = dateTime[0].split("/");
        var time = dateTime[1].split(":");
        //(year, month, day, hours, minutes, seconds, milliseconds)
        let dateObject = new Date(date[2], date[1] - 1, date[0], time[0], time[1]);
        let name = getWeekDay(dateObject)
            + " " + dateObject.getDate() + " " + getMonth(dateObject) + " " + dateObject.getFullYear()
            + " at " + dateObject.getHours() + ":" + dateObject.getMinutes();
        return name;

    }

    const toOjectDAte = (dateTime) => {

        var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time

        var date = dateTime[0].split("/");
        var time = dateTime[1].split(":");
        //(year, month, day, hours, minutes, seconds, milliseconds)
        let dateObject = new Date(date[2], date[1] - 1, date[0], time[0], time[1]);
        return dateObject;
    }

    Date.daysBetween = function (date1, date2) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return difference_ms;
    }

    const getWeekDay = (date) => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return days[date.getDay()];
    }


    const getMonth = (date) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return months[date.getMonth()];
    }
    //rating
    const ratingStar = (ratePoint) => {
        const starPercentage = (ratePoint / 5) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        $("#totalRatingPoints").width(starPercentageRounded);
    }

    const loadImageFromEvent = (id) => {
        return fetch(backendServer + "/api/event-image/event/" + id)
            .then(rs => rs.json())
            .then(data => backendServer + data.data.imageLink);
    }

    var username = localStorage.getItem('username');

    $("#btnJoinNow").click((e) => {
        e.preventDefault();
        if (username === null) {
            $("#modalLRForm").modal();
        } else {
            window.location.href = frontendServer + `/event/${id}/register-event`;
        }
    })


    $("#formRegisterEvent").submit((e) => {
        e.preventDefault();
        let now = new Date();
        let data = {
            quantity: $("#selectQuantity").val(),
            total: $("#total").val(),
            registerDate: now,
            eventId: id,
            username: username,
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/participant",
            dataType: 'json',
            data: JSON.stringify(data),
            contentType: "application/json",
            processData: false

        }).done((res) => {
            console.log(res.data);
            console.log(res.status_code);
            alert(res.message);
            // location.href = '/event/detail/' + title + '/' + id;
        }).fail((res) => {
            console.log(res.message);
        });
    })

    $('.qty').click(function () {
        var $t = $(this),
            $in = $('input[name="' + $t.data('field') + '"]'),
            val = parseInt($in.val());


        // Check if a number is in the field first
        if (isNaN(val) || val < valMin) {
            // If field value is NOT a number, or
            // if field value is less than minimum,
            // ...set value to 0 and exit function
            $in.val(valMin);
        } else if (val > valMax) {
            // If field value exceeds maximum,
            // ...set value to max
            $in.val(valMax);
        }

        // Perform increment or decrement logic
        if ($t.data('func') == 'plus') {
            if (val < valMax) $in.val(val + 1);
        } else {
            if (val > valMin) $in.val(val - 1);
        }

        let quantity = $('#selectQuantity').val();
        let fee = $("#feeEvent").val();
        $("#total").val(quantity * fee).change();
    });
})