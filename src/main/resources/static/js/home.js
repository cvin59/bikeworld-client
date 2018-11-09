$(function () {
    $.ajax({
        type: "GET",
        url: backendServer + "/api/event/event-home",
        dataType: 'json',
    }).done((res) => {
        loadEventHome(res.data);
    }).fail((res) => {
        alert(res.message);
    })

    const loadImage = (id) => {
        return fetch(backendServer + "/api/event-image/event/" + id)
            .then(rs => rs.json())
            .then(data => typeof data.data === 'undefined' ? '' : backendServer + data.data.imageLink);
    }

    const loadEventHome = (events) => {
        $.each(events, async function (i, value) {
            let imageUrl = await loadImage(value.id);
            let today = new Date();
            let days = Date.daysBetween(today, toJSDate(value.startDate));
            if (days <= 0) {
                days = '0 days left';
            } else {
                days = days + 'days left';
            }
            if (i === 0) {
                await $("#featuredNews").append(' <div class="single-news mb-lg-0 mb-4">\n' +
                    '\n' +
                    '                            <!-- Image -->\n' +
                    '                            <div class="view overlay rounded z-depth-1-half mb-4">\n' +
                    '                                        <img class="img-fluid" src=' + imageUrl + '\n' +
                    '                                    alt="Sample image">\n' +
                    '                                <a href="/event/detail/' + value.title + '/' + value.id + '">\n' +
                    '                                        <div class="mask rgba-white-slight"></div>\n' +
                    '                                    </a>\n' +
                    '                            </div>\n' +
                    '\n' +
                    '                            <!-- Excerpt -->\n' +
                    '                            <h3 class="font-weight-bold dark-grey-text mb-3">\n' +
                    '                                <a>' + value.title + '</a>\n' +
                    '                            </h3>\n' +
                    '\n' +
                    '                            <!-- Date -->\n' +
                    '                            <div class="d-flex justify-content-between mt-3">\n' +
                    '                                <p class="dark-grey-text"><i class="fa fa-calendar pr-2 text-danger"></i>' + value.startDate + '</p>\n' +
                    '                                <p class="dark-grey-text"><i class="fa fa-clock-o pr-2"></i>' + days + '</p>\n' +
                    '                            </div>\n' +
                    '\n' +
                    '                            <!-- Location and Price -->\n' +
                    '                            <div class="d-flex justify-content-between">\n' +
                    '                                <p class="dark-grey-text"><i class="fa fa-map-marker pr-2 text-primary"></i>' + value.location + '</p>\n' +
                    '                                <p class="font-weight-bold dark-grey-text"><i class="fa fa-ticket pr-2"></i>' + formatter.format(value.fee) + '</p>\n' +
                    '                            </div>\n' +
                    '\n' +
                    '                            <!-- Link -->\n' +
                    '                            <!--<div class="d-flex justify-content-end w-100">-->\n' +
                    '                                <!--<a href="#!" class="btn-sm btn-outline-danger text-danger font-weight-bold d-flex justify-content-end">Join Now</a>-->\n' +
                    '                            <!--</div>-->\n' +
                    '\n' +
                    '                        </div>');
            } else {
                $("#smallNews").append('<div class="single-news mb-4">\n' +
                    '\n' +
                    '                            <!-- Grid row -->\n' +
                    '                            <div class="row">\n' +
                    '\n' +
                    '                                <!-- Grid column -->\n' +
                    '                                <div class="col-md-6">\n' +
                    '\n' +
                    '                                    <!--Image-->\n' +
                    '                                    <div class="view overlay rounded z-depth-1 mb-4">\n' +
                    '                                        <img class="img-fluid" src=' + imageUrl + '\n' +
                    '                                            alt="Sample image">\n' +
                    '                                        <a href="/event/detail/' + value.title + '/' + value.id + '">\n' +
                    '                                        <div class="mask rgba-white-slight"></div>\n' +
                    '                                    </a>\n' +
                    '                                    </div>\n' +
                    '\n' +
                    '                                </div>\n' +
                    '                                <!-- Grid column -->\n' +
                    '                                <!-- Grid column -->\n' +
                    '                                <div class="col-md-6">\n' +
                    '\n' +
                    '                                    <!-- Excerpt -->\n' +
                    '                                    <h4 class="font-weight-bold dark-grey-text">' + value.title + '</h4>\n' +
                    '                                    <div class="d-flex justify-content-between">\n' +
                    '                                        <div class="col-11 pl-0">\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '\n' +
                    '                                </div>\n' +
                    '                                <!-- Grid column -->\n' +
                    '                                <!-- Date -->\n' +
                    '                                <div class="d-flex justify-content-between w-100">\n' +
                    '                                    <p class="dark-grey-text"><i class="fa fa-calendar pr-2 text-danger ml-3"></i>' + value.startDate + '</p>\n' +
                    '                                    <p class="dark-grey-text"><i class="fa fa-clock-o pr-2"></i>' + days + '</p>\n' +
                    '                                </div>\n' +
                    '                                <!-- Location and Price -->\n' +
                    '                                <div class="d-flex justify-content-between w-100">\n' +
                    '                                    <p class="dark-grey-text"><i class="fa fa-map-marker pr-2 text-primary ml-3"></i>' + value.location + '</p>\n' +
                    '                                    <p class="font-weight-bold dark-grey-text"><i class="fa fa-ticket pr-2"></i>' + formatter.format(value.fee) + '</p>\n' +
                    '                                </div>\n' +
                    '\n' +
                    '                                <!-- Link -->\n' +
                    '                                <!--<div class="d-flex justify-content-end w-100">-->\n' +
                    '                                    <!--<a href="#!" class="btn-sm btn-outline-danger text-danger font-weight-bold d-flex justify-content-end mb-3">Join Now</a>-->\n' +
                    '                                <!--</div>-->\n' +
                    '\n' +
                    '                            </div>\n' +
                    '                            <!-- Grid row -->\n' +
                    '\n' +
                    '                        </div>');
            }
        })

    }
})
