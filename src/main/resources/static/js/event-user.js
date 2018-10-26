$(function () {
    const backendServer = "http://localhost:8080";

    var upcomingEvent = [];

    $.ajax({
        type: "GET",
        url: backendServer + "/api/event/upcoming-event",
        dataType: 'json',
    }).done((res) => {
        console.log(res.message);
        console.table(res.data);
        loadUpcomingEvent(res.data);
    }).fail((res) => {
        alert(res.message);
    });

    const loadImageFromEvent = (id) => {
        return fetch(backendServer + "/api/event-image/event/" + id)
            .then(rs => rs.json())
            .then(data => backendServer + data.data.imageLink);
    }

    const loadInfoFromEvent = (value, imageUrl, slide) => {
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
            '                                        <p class="card-text"><i class="fa fa-calendar pr-2 text-danger ml-3"></i>27/02/2018\n' +
            '                                        </p>\n' +
            '                                        <p class="card-text"><i class="fa fa-clock-o pr-2"></i>' + value.startDate + '</p>\n' +
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

    const loadUpcomingEvent = async (upcomingEvent) => {
        var upComingEvent1 = upcomingEvent.slice(0, 3);
        var upComingEvent2 = upcomingEvent.slice(3, 6);
        var upComingEvent3 = upcomingEvent.slice(6, 9);
        console.table(upComingEvent3);
        for (value of upComingEvent1) {
            const imageUrl = await loadImageFromEvent(value.id);
            const loadInfo = loadInfoFromEvent(value, imageUrl, $("#slideItemUpcoming1"));
            loadInfo;
        }
        for (value of upComingEvent2) {
            const imageUrl = await loadImageFromEvent(value.id);
            const loadInfo = loadInfoFromEvent(value, imageUrl, $("#slideItemUpcoming2"));
            loadInfo;
        }
        for (value of upComingEvent3) {
            const imageUrl = await loadImageFromEvent(value.id);
            const loadInfo = loadInfoFromEvent(value, imageUrl, $("#slideItemUpcoming3"));
            loadInfo;
        }
    }
})