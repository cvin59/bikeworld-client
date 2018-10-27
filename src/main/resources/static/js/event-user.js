$(function () {
    const backendServer = "http://localhost:8080";

    $.ajax({
        type: "GET",
        url: backendServer + "/api/event/upcoming-event",
        dataType: 'json',
    }).done((res) => {
        console.log(res.message);
        console.table(res.data);
        window.localStorage.setItem('upcomingEvent', JSON.stringify(res.data));
    }).fail((res) => {
        alert(res.message);
    });

    var upcomingEvent = JSON.parse(window.localStorage.getItem('upcomingEvent'));
    console.log(upcomingEvent);

    const loadImageUpcomingEvent = (id) => {
        return fetch(backendServer + "/api/event-image/event/" + id)
            .then(rs => rs.json())
            .then(data => backendServer + data.data.imageLink);
    }

    const loadInfoUpcomingEvent = (value, imageUrl, slide) => {
        let today = new Date();
        let days = Date.daysBetween(today, toJSDate(value.startDate));
        slide.append('  <!-- Card -->\n' +
            '                            <div class="card ml-1 mr-1 mb-4 w-25">\n' +
            '\n' +
            '                                <!-- Card image -->\n' +
            '                                <div class="view overlay">\n' +
            '                                    <img class="card-img-top h-250px"\n' +
            '                                         src="' + imageUrl + '"\n' +
            '                                         alt="Card image cap">\n' +
            '                                    <a href="event/detail/' + value.title + '/' + value.id + '">\n' +
            '                                        <div class="mask rgba-white-slight"></div>\n' +
            '                                    </a>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <!-- Card content -->\n' +
            '                                <div class="card-body">\n' +
            '\n' +
            '                                    <!-- Title -->\n' +
            '                                    <h4 class="font-weight-bold card-title">' + value.title + '</h4>\n' +
            '                                    <!-- Date -->\n' +
            '                                    <div class="d-flex justify-content-between w-100">\n' +
            '                                        <p class="card-text"><i class="fa fa-calendar pr-2 text-danger ml-3"></i>' + value.startDate +
            '                                        </p>\n' +
            '                                        <p class="card-text"><i class="fa fa-clock-o pr-2"></i>' +  days + ' days left</p>\n' +
            '                                    </div>\n' +
            '                                    <!-- Location and Price -->\n' +
            '                                    <div class="d-flex justify-content-between w-100">\n' +
            '                                        <p class="card-text"><i\n' +
            '                                                class="fa fa-map-marker pr-2 ml-3"></i>' + value.location + '</p>\n' +
            '                                        <p class="font-weight-bold card-text"><i class="fa fa-ticket pr-2"></i>' + value.fee + '</p>\n' +
            '                                    </div>\n' +
            '                                    <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->\n' +
            '                                    <a class="btn btn-outline-primary btn-md font-weight-bold" href="/event/detail/' + value.title + '/' + value.id + '">View More</a>\n' +
            '                                    <a class="btn btn-outline-danger btn-md font-weight-bold">Join Now</a>\n' +
            '\n' +
            '                                </div>\n' +
            '                                <!-- Card content -->\n' +
            '\n' +
            '                            </div>\n' +
            '                            <!-- Card -->');
    }

    const loadSliderEvent = (value, imageUrl, slide) => {
        let today = new Date();
        let days = Date.daysBetween(today, toJSDate(value.startDate));
        slide.append(' <div class="carousel-item">\n' +
            '                <div class="custom-hover-card"><img\n' +
            '                        src="' + imageUrl +'"/>\n' +
            '                    <div class="info">\n' +
            '                        <h1>' + value.title +' </h1>\n' +
            // '                        <p>Short Description</p>\n' +
            '                        <!-- Date -->\n' +
            '                        <div class="d-flex justify-content-between w-100">\n' +
            '                            <p class="white-text"><i class="fa fa-calendar text-danger "></i>' + value.startDate +'</p>\n' +
            '                            <p class="white-text ml-5"><i class="fa fa-clock-o "></i>' + days + ' days left</p>\n' +
            '                        </div>\n' +
            '                        <!-- Location and Price -->\n' +
            '                        <div class="d-flex justify-content-between w-100">\n' +
            '                            <p class="white-text"><i class="fa fa-map-marker  text-primary "></i>' + value.location + '</p>\n' +
            '                            <p class="font-weight-bold white-text ml-5"><i class="fa fa-ticket"></i>' + value.fee + '</p>\n' +
            '                        </div>\n' +
            '                        <a href="event/detail/' + value.title + '/' + value.id + '" class="btn-flat text text-primary h3">Read More</a>\n' +
            '\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>');
    }

    const loadUpcomingEvent = async (upcomingEvent) => {
        var upComingEvent1 = upcomingEvent.slice(0, 3);
        var upComingEvent2 = upcomingEvent.slice(3, 6);
        var upComingEvent3 = upcomingEvent.slice(6, 9);
        //Open For Joining
        for (value of upComingEvent1) {
            const imageUrl = await loadImageUpcomingEvent(value.id);
            const loadInfo = loadInfoUpcomingEvent(value, imageUrl, $("#slideItemUpcoming1"));
            loadInfo;
            const loadSlider = loadSliderEvent(value, imageUrl, $("#sliderEvent"));
            loadSlider
        }
        for (value of upComingEvent2) {
            const imageUrl = await loadImageUpcomingEvent(value.id);
            const loadInfo = loadInfoUpcomingEvent(value, imageUrl, $("#slideItemUpcoming2"));
            loadInfo;
        }
        for (value of upComingEvent3) {
            const imageUrl = await loadImageUpcomingEvent(value.id);
            const loadInfo = loadInfoUpcomingEvent(value, imageUrl, $("#slideItemUpcoming3"));
            loadInfo;
        }
        $("#sliderEvent .carousel-item").first().addClass("active");
    }

    loadUpcomingEvent(upcomingEvent);

    const toJSDate = (dateTime) => {

        var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time

        var date = dateTime[0].split("/");
        var time = dateTime[1].split(":");
        console.log(date + time);
        //(year, month, day, hours, minutes, seconds, milliseconds)
        let dateObject = new Date(date[2], date[1] - 1, date[0], time[0], time[1]);
        return dateObject;

    }

    Date.daysBetween = function( date1, date2 ) {
        //Get 1 day in milliseconds
        var one_day=1000*60*60*24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return Math.round(difference_ms/one_day);
    }
})