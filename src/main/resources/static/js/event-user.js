$(function () {
    const backendServer = "http://localhost:8080";
    const loadInforegisteringEvent = (value, imageUrl, slide) => {
        let today = new Date();
        let days = Date.daysBetween(today, toJSDate(value.startDate));
        if (days <= 0) {
            days = '0 days left';
        } else {
            days = days + 'days left';
        }
        slide.append('<div class="col-md-4">' +
            '  <!-- Card -->\n' +
            '                            <div class="card card-cascade card-ecommerce ml-2 mr-2 mb-2 animated wow zoomIn faster">\n' +
            '\n' +
            '                                <!-- Card image -->\n' +
            '                                <div class="view overlay">\n' +
            '                                    <img class="card-img-top h-150px"\n' +
            '                                         src="' + imageUrl + '"\n' +
            '                                         alt="Card image cap">\n' +
            '                                    <a href="/event/detail/' + value.title + '/' + value.id + '">\n' +
            '                                        <div class="mask rgba-white-slight"></div>\n' +
            '                                    </a>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <!-- Card content -->\n' +
            '                                <div class="card-body">\n' +
            '\n' +
            '                                    <!-- Title -->\n' +
            '                                    <h6 class="font-weight-bold card-title"><a style="font-size: 16px; color: #333" href="/event/detail/' + value.title + '/' + value.id + '">' + formatName(value.title) + '</a></h6>\n' +
            '                                    <!-- Date -->\n' +
            '                                    <div class="d-flex justify-content-between w-100">\n' +
            '                                        <p class="card-text"><i class="fa fa-calendar pr-2 text-danger ml-3"></i>' + value.startDate +
            '                                        </p>\n' +
            '                                        <p class="card-text"><i class="fa fa-clock-o pr-2"></i>' + days + ' </p>\n' +
            '                                    </div>\n' +
            '                                    <!-- Location and Price -->\n' +
            '                                    <div class="d-flex justify-content-between w-100">\n' +
            '                                        <p class="card-text"><i\n' +
            '                                                class="fa fa-map-marker pr-2 ml-3"></i>' + formatName(value.location) + '</p>\n' +
            '                                        <p class="font-weight-bold card-text"><i class="fa fa-ticket pr-2"></i>' + formatter.format(value.fee) + '</p>\n' +
            '                                    </div>\n' +
            '                                    <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->\n' +
            // '                                    <a class="btn btn-outline-primary btn-md font-weight-bold float-right" href="/event/detail/' + value.title + '/' + value.id + '">View More</a>\n' +
            '\n' +
            '                                </div>\n' +
            '                                <!-- Card content -->\n' +
            '\n' +
            '                            </div>\n' +
            '                            <!-- Card -->' +
            '</div>');
    }

    const loadInfoComingsoonEvent = (value, imageUrl, slide) => {
        let today = new Date();
        let days = Date.daysBetween(today, toJSDate(value.startDate));
        if (days <= 0) {
            days = '0 days left';
        } else {
            days = days + 'days left';
        }
        slide.append('<div class="col-md-4">' +
            '  <!-- Card -->\n' +
            '                            <div class="card card-cascade card-ecommerce ml-2 mr-2 mb-2 animated wow zoomIn faster">\n' +
            '\n' +
            '                                <!-- Card image -->\n' +
            '                                <div class="view overlay">\n' +
            '                                    <img class="card-img-top h-150px"\n' +
            '                                         src="' + imageUrl + '"\n' +
            '                                         alt="Card image cap">\n' +
            '                                    <a href="/event/detail/' + value.title + '/' + value.id + '">\n' +
            '                                        <div class="mask rgba-white-slight"></div>\n' +
            '                                    </a>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <!-- Card content -->\n' +
            '                                <div class="card-body">\n' +
            '\n' +
            '                                    <!-- Title -->\n' +
            '                                    <h6 class="font-weight-bold card-title"><a style="font-size: 16px; color: #333" href="/event/detail/' + value.title + '/' + value.id + '">' + formatName(value.title) + '</a></h6>\n' +
            '                                    <!-- Date -->\n' +
            '                                    <div class="d-flex justify-content-between w-100">\n' +
            '                                        <p class="card-text"><i class="fa fa-calendar pr-2 text-danger ml-3"></i>' + value.startDate +
            '                                        </p>\n' +
            '                                        <p class="card-text"><i class="fa fa-clock-o pr-2"></i>' + days + ' </p>\n' +
            '                                    </div>\n' +
            '                                    <!-- Location and Price -->\n' +
            '                                    <div class="d-flex justify-content-between w-100">\n' +
            '                                        <p class="card-text"><i\n' +
            '                                                class="fa fa-map-marker pr-2 ml-3"></i>' + formatName(value.location) + '</p>\n' +
            '                                        <p class="font-weight-bold card-text"><i class="fa fa-ticket pr-2"></i>' + formatter.format(value.fee) + '</p>\n' +
            '                                    </div>\n' +
            '                                    <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->\n' +
            // '                                    <a class="btn btn-outline-primary btn-md font-weight-bold float-right" href="/event/detail/' + value.title + '/' + value.id + '">View More</a>\n' +
            '\n' +
            '                                </div>\n' +
            '                                <!-- Card content -->\n' +
            '\n' +
            '                            </div>\n' +
            '                            <!-- Card -->' +
            '</div>');
    }

    const loadregisteringEvent = async (registeringEvent) => {
        var i, j = 0;
        for (i = 0; i < registeringEvent.length; i += 3) {
            $("#sliderItemregistering").append('<div class="carousel-item" id="slideItemregistering' + i + '">\n' +

                '                    </div>');
            let registeringEvent1 = registeringEvent.slice(i, i + 3);
            for (value of registeringEvent1) {
                const imageUrlRegisteringSoon = await loadImage(value.id);
                loadInfoRegistering = await loadInforegisteringEvent(value, imageUrlRegisteringSoon, $(`#slideItemregistering${i}`));

            }
            $("#indicatorregisteringEvent").append(' <li data-target="#openForJoiningCarousel" data-slide-to="' + j++ + '"></li>');
        }
        $("#indicatorregisteringEvent li").first().addClass("active");
        $("#sliderItemregistering .carousel-item").first().addClass("active");
    }

    const loadcomingsoonEvent = async (comingsoonEvent) => {
        var i, j = 0;
        for (i = 0; i < comingsoonEvent.length; i += 3) {
            $("#sliderItemComingSoon").append('<div class="carousel-item" id="sliderItemComingSoon' + i + '">\n' +

                '                    </div>');
            let comingsoonEvent1 = comingsoonEvent.slice(i, i + 3);
            for (value of comingsoonEvent1) {
                const imageUrlComingSoon = await loadImage(value.id);
                loadInfoComingSoon = await loadInfoComingsoonEvent(value, imageUrlComingSoon, $(`#sliderItemComingSoon${i}`));
            }
            $("#indicatorComingSoonEvent").append(' <li data-target="#comingSoonCarousel" data-slide-to="' + j++ + '"></li>');
        }
        $("#indicatorComingSoonEvent li").first().addClass("active");
        $("#sliderItemComingSoon .carousel-item").first().addClass("active");
    }

    const loadInfoSliderEvent = (value, imageUrl, slide) => {
        let today = new Date();
        let days = Date.daysBetween(today, toJSDate(value.startDate));
        if (days <= 0) {
            days = '0 days left';
        } else {
            days = days + 'days left';
        }
        slide.append(' <div class="carousel-item">\n' +
            '                <div class="custom-hover-card"><img\n' +
            '                        src="' + imageUrl + '"/>\n' +
            '                    <div class="info">\n' +
            '                        <h1>' + value.title + ' </h1>\n' +
            // '                        <p>Short Description</p>\n' +
            '                        <!-- Date -->\n' +
            '                        <div class="d-flex justify-content-between w-100">\n' +
            '                            <p class="white-text"><i class="fa fa-calendar text-danger "></i>' + value.startDate + '</p>\n' +
            '                            <p class="white-text ml-5"><i class="fa fa-clock-o "></i>' + days + '</p>\n' +
            '                        </div>\n' +
            '                        <!-- Location and Price -->\n' +
            '                        <div class="d-flex justify-content-between w-100">\n' +
            '                            <p class="white-text"><i class="fa fa-map-marker  text-primary "></i>' + value.location + '</p>\n' +
            '                            <p class="font-weight-bold white-text ml-5"><i class="fa fa-ticket"></i>' + value.fee + '</p>\n' +
            '                        </div>\n' +
            '                        <a href="/event/detail/' + value.title + '/' + value.id + '" class="btn-flat text text-primary h3">Read More</a>\n' +
            '\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>');
    }

    const loadSliderEvent = async (registeringEvent) => {
        let registeringEvent1 = registeringEvent.slice(0, 3);
        for (value of registeringEvent1) {
            const imageUrl = await loadImage(value.id);
            loadSlider = await loadInfoSliderEvent(value, imageUrl, $("#sliderEvent"));
        }
        $("#sliderEvent .carousel-item").first().addClass("active");
    }


    $.ajax({
        type: "GET",
        url: backendServer + "/api/event/registering-event",
        dataType: 'json',
    }).done((res) => {
        console.log(res.message);
        console.table(res.data);
        if (res.data != null) {
            window.localStorage.setItem('registeringEvent', JSON.stringify(res.data));
        }
    }).fail((res) => {
        alert(res.message);
    });

    var data = {};

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
        let lat = position.coords.latitude,
            lng = position.coords.longitude;
        console.log(lat + "," + lng);
        $.ajax({
            type: "GET",
            url: backendServer + "/api/event/nearby-event?lat=" + lat + "&lng=" + lng,
            dataType: 'json',
        }).done((res) => {
            console.log(res.message);
            console.table(res.data);
            if (res.data != null) {
                window.localStorage.setItem('comingsoonEvent', JSON.stringify(res.data));
            }
        }).fail((res) => {
            alert(res.message);
        });
    }


    const getregisteringEvent = () => {
        return fetch(backendServer + "/api/event/registering-event")
            .then(rs => rs.json())
            .then(data => data.data);
    }
    const getcomingsoonEvent = () => {
        return fetch(backendServer + "/api/event/comingsoon-event")
            .then(rs => rs.json())
            .then(data => data.data);
    }

    var registeringEvent = JSON.parse(window.localStorage.getItem('registeringEvent'))
    var comingsoonEvent = JSON.parse(window.localStorage.getItem('comingsoonEvent'))

    const setregisteringEvent = async () => {
        if (registeringEvent === null) {
            registeringEvent = await getregisteringEvent();
            sliderEvent = await loadSliderEvent(registeringEvent);
            registeringEventSlide = await loadregisteringEvent(registeringEvent.slice(0, 9));
        } else {
            sliderEvent = await loadSliderEvent(registeringEvent);
            registeringEventSlide = await loadregisteringEvent(registeringEvent.slice(0, 9));
        }
    }
    const setcomingsoonEvent = async () => {
        if (comingsoonEvent === null) {
            comingsoonEvent = await getcomingsoonEvent();
            comingsoonEventSlide = await loadcomingsoonEvent(comingsoonEvent);
        } else {
            comingsoonEventSlide = await loadcomingsoonEvent(comingsoonEvent);
        }
    }

    const loadEvent = async () => {
        registeringEventSlide = await setregisteringEvent();
        comingsoonEventSlide = await setcomingsoonEvent();
    }

    loadEvent();

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    toJSDate = (dateTime) => {

        var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time

        var date = dateTime[0].split("/");
        var time = dateTime[1].split(":");
        console.log(date + time);
        //(year, month, day, hours, minutes, seconds, milliseconds)
        let dateObject = new Date(date[2], date[1] - 1, date[0], time[0], time[1]);
        return dateObject;

    };

    Date.daysBetween = function (date1, date2) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return Math.round(difference_ms / one_day);
    }

    const formatName = (name) => {
        if (name.length >= 25) {
            return name.substring(0, 25) + "...";
        }
        return name;
    }
})

const clickJoinNow = (id) => {
    let username = localStorage.getItem('username');
    let frontendServer = 'http://localhost:8084';
    if (username === null) {
        $("#modalLRForm").modal();
    } else {
        window.location.href = frontendServer + `/event/${id}/register-event`;
    }
}