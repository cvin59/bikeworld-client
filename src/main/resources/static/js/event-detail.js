var lat, lng, currLat, currLng;
$(function () {
    var backendServer = "http://localhost:8080",
        frontendServer = "http://localhost:8084",
        totalSlots,
        valMax,
        valMin,
        username = localStorage.getItem('username'),
        checkFinish;
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
        lat = parseFloat(event.latitude);
        lng = parseFloat(event.longitude);

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
        ratingStar(event.totalRatesPoint, $("#totalRatingPoints"));
        $("#totalRates").text(event.totalRates);
        let imageUrl = await loadImage(event.id);
        $("#eventImage").attr("src", imageUrl);
        $("#selectQuantity").attr('min', event.minSlot).attr('max', event.maxSlot).val(0).change();
        valMax = event.maxSlot, valMin = event.minSlot;

        let today = new Date();
        let checkStartRegister = Date.daysBetween(today, toOjectDAte(event.startRegisterDate));
        let checkEndRegister = Date.daysBetween(today, toOjectDAte(event.endRegisterDate));
        checkFinish = Date.daysBetween(today, toOjectDAte(event.endDate));

        if (checkStartRegister > 0) {
            $("#btnJoinNow").removeClass('btn btn-outline-danger font-weight-bold mt-2 animated pulse infinite')
                .addClass('btn btn-blue-grey font-weight-bold mt-2 disabled').text('Coming Soon');
        }
        if (checkEndRegister < 0) {
            $("#btnJoinNow").removeClass('btn btn-outline-danger font-weight-bold mt-2 animated pulse infinite')
                .addClass('btn btn-blue-grey font-weight-bold mt-2 disabled').text('Close Register');
        }
        if (checkFinish < 0) {
            $("#btnJoinNow").removeClass('btn btn-blue-grey font-weight-bold mt-2 animated pulse infinite')
                .addClass('btn btn-success font-weight-bold mt-2 disabled').text('Event Finish');
        }
        if (event.currentSlot === event.totalSlots) {
            $("#btnJoinNow").removeClass('btn btn-outline-danger font-weight-bold mt-2 animated pulse infinite')
                .addClass('btn btn-blue-grey font-weight-bold mt-2 disabled').text('Sold Out');
        }

        totalSlots = event.totalSlots;
        await checkParticipant(event.id, username);
        await checkEventRating(event.id);
        await getEventRating(event.id);
    }

    const checkParticipant = async (eventId, username) => {
        await $.ajax({
            type: "GET",
            url: backendServer + "/api/participant?eventId=" + eventId + "&username=" + username,
            dataType: 'json',
        }).done((res) => {
            if (res.status_code === 1 && checkFinish < 0) {
                console.log("yes he has participated");
                $("#formReview").css('display', 'block');
            }
        }).fail((res) => {
            console.log(res.message);
        });
    }

    const checkEventRating = async (eventId) => {
        await $.ajax({
            type: "GET",
            url: backendServer + "/api/event-rating/check?eventId=" + eventId + "&username=" + username,
            dataType: 'json',
        }).done((res) => {
            if (res.status_code === 1) {
                console.log("yes he has rated");
                $("#formReview").css('display', 'none');
            }
        }).fail((res) => {
            console.log(res.message);
        });
    }

    const getEventRating = async (eventId) => {
        await $.ajax({
            type: "GET",
            url: backendServer + "/api/event-rating/event?eventId=" + eventId,
            dataType: 'json',
        }).done((res) => {
            if (res.status_code === 1) {
                console.table(res.data);
                let ratings = res.data;
                ratings.forEach(async (rating) => {
                    let avatar = await loadAvatar(rating.accountUsename.username);
                    $("#eventReview").append(' <div class="row mt-5">\n' +
                        '                        <div class="col-1">\n' +
                        '                            <img src="' + avatar + '"\n' +
                        '                                 class="z-depth-1-half avatar-rate">\n' +
                        '                        </div>\n' +
                        '                        <div class="col-11">\n' +
                        '                            <a href="/name" style="color: #333">\n' +
                        '                                ' + rating.accountUsename.username + '\n' +
                        '                            </a>\n' +
                        '                            <!--Review-->\n' +
                        '                            <div>\n' +
                        '                                <div class="stars-outer">\n' +
                        '                                    <div id="" class="stars-inner" style="width: ' + ratingStarWidth(rating.ratePoint) + '"></div>\n' +
                        '                                </div>\n' +
                        '                                <span class="card-text" ></span>\n' +
                        '                            </div>\n' +
                        '                            <p class="mt-2">' + rating.content + '</p>\n' +
                        '                            <p class="grey-text">' + toStringDate(rating.rateDate) + '</p>\n' +
                        '                        </div>\n' +
                        '                    </div>');
                })

            }
        }).fail((res) => {
            console.log(res.message);
        });
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

    Date.ratingBetween = function (date1, date2) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return difference_ms;
        return Math.round(difference_ms / one_day);
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
    const ratingStar = (ratePoint, element) => {
        const starPercentage = (ratePoint / 5) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        element.width(starPercentageRounded);
    }

    const ratingStarWidth = (ratePoint) => {
        let starPercentage = (ratePoint / 5) * 100;
        let starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        return starPercentageRounded;
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

    $("#formReview").submit((e) => {
        e.preventDefault();
        let now = new Date();
        let data = {
            ratePoint: $("#ratingPoint").val(),
            content: $("#txtRatingContent").val(),
            eventId: id,
            username: username,
            rateDate: now,
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/event-rating",
            dataType: 'json',
            data: JSON.stringify(data),
            contentType: "application/json",
            processData: false
        }).done((res) => {
            console.log(res.data);
            console.log(res.status_code);
            $('#centralModalSuccess').modal('show');
            checkEventRating(id);
        }).fail((res) => {
            console.log(res.message);
        });
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

    $("#direction-tab-link").click((e) => {
        e.preventDefault();
        if (isNaN(lat) && isNaN(lng)) {
            $("#mapError").text('Map Not Available. Sorry for the inconvenience');
            $("#map").height('0px');
            $(".floating-panel").hide();
        } else {
            getLocation();
        }
    })


    function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {lat: 0, lng: 0}
        });
        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsDisplay);
        var onChangeHandler = function() {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('mode').addEventListener('change', onChangeHandler);
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: {lat: currLat, lng: currLng},
            destination: {lat: lat, lng: lng},
            travelMode: document.getElementById('mode').value,
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                $("#mapError").text('Directions request failed due to ' + status);
                $("#map").height('0px');
                $(".floating-panel").hide();
            }
        });
    }

    function getLocation() {
        console.log("Entering getLocation()");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                displayCurrentLocation,
                displayError,
                {
                    maximumAge: 3000,
                    timeout: 5000,
                    enableHighAccuracy: true
                });
        } else {
            console.log("Oops, no geolocation support");
        }
        console.log("Exiting getLocation()");
    };

    function displayCurrentLocation(position) {
        console.log("Entering displayCurrentLocation");
        currLat = position.coords.latitude;
        currLng = position.coords.longitude;
        console.log("Latitude " + currLat + " Longitude " + currLng);
        console.log("Exiting displayCurrentLocation");
        initMap()
    }

    function displayError(error) {
        console.log("Entering ConsultantLocator.displayError()");
        var errorType = {
            0: "Unknown error",
            1: "Permission denied by user",
            2: "Position is not available",
            3: "Request time out"
        };
        var errorMessage = errorType[error.code];
        if (error.code == 0 || error.code == 2) {
            errorMessage = errorMessage + "  " + error.message;
            }
        $("#mapError").text('Map Not Available. Sorry for the inconvenience');
        $("#map").height('0px');
        $(".floating-panel").hide();
        console.log("Exiting ConsultantLocator.displayError()");
    }
})
