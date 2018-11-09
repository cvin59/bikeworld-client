const loadImage = (id) => {
    return fetch(backendServer + "/api/event-image/event/" + id)
        .then(rs => rs.json())
        .then(data => typeof data.data === 'undefined' ?
            backendServer + '/images/default-product-img.png' :
            backendServer + data.data.imageLink);
}

const loadEvent = async (element, allEvent) => {
    for (value of allEvent) {
        let imageUrl = await loadImage(value.id);
        let today = new Date();
        let days = Date.daysBetween(today, toJSDate(value.startDate));
        if (days <= 0) {
            days = '0 days left';
        } else {
            days = days + 'days left';
        }
        await element.append('<div class="col-md-4">' +
            '  <!-- Card -->\n' +
            '                            <div class="card card-cascade card-ecommerce ml-2 mr-2 mb-5 animated wow zoomIn faster">\n' +
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
            '                                    <h6 class="font-weight-bold card-title"><a style="font-size: 16px; color: #333" href="/event/detail/' + value.title + '/' + value.id + '">' + value.title.substring(0, 25)+'</a></h6>\n' +
            '                                    <!-- Date -->\n' +
            '                                    <div class="d-flex justify-content-between w-100">\n' +
            '                                        <p class="card-text"><i class="fa fa-calendar pr-2  ml-3"></i>' + value.startDate +
            '                                        </p>\n' +
            '                                        <p class="card-text"><i class="fa fa-clock-o pr-2"></i>' + days + ' </p>\n' +
            '                                    </div>\n' +
            '                                    <!-- Location and Price -->\n' +
            '                                    <div class="d-flex justify-content-between w-100">\n' +
            '                                        <p class="card-text"><i\n' +
            '                                                class="fa fa-map-marker pr-2 ml-3"></i>' + value.location.substring(0, 20) + '</p>\n' +
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


}


formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const toOjectDAte = (dateTime) => {
    var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time
    var date = dateTime[0].split("/");
    var time = dateTime[1].split(":");
    //(year, month, day, hours, minutes, seconds, milliseconds)
    let dateObject = new Date(date[2], date[1] - 1, date[0], time[0], time[1]);
    return dateObject;
}

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