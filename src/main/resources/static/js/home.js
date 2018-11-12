$(function () {
    $.ajax({
        type: "GET",
        url: backendServer + "/api/event/event-home",
        dataType: 'json',
    }).done((res) => {
        loadEventHome(res.data);
    }).fail((res) => {
        console.log(res);
    })

    const loadImage = (id) => {
        return fetch(backendServer + "/api/event-image/event/" + id)
            .then(rs => rs.json())
            .then(data => typeof data.data === 'undefined' ?
                backendServer + '/images/default-product-img.png' :
                backendServer + data.data.imageLink);
    }

    const loadImageProduct = (id) => {
        return fetch(backendServer + "/api/product-image/product/" + id)
            .then(rs => rs.json())
            .then(data => typeof data.data[0] === 'undefined' ?
                backendServer + '/images/default-product-img.png' :
                backendServer + data.data[0].imageLink);
            // .then(data => console.table(data.data[0]));
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

    $.ajax({
        type: "GET",
        url: backendServer + "/api/product/product-home",
        dataType: 'json',
    }).done((res) => {
        loadProductHome(res.data);
    }).fail((res) => {
        console.log(res);
    })

    function loadProduct3(value, imageUrl, $) {
        $.append('<div class="col-md-3">\n' +
            '                                <!-- Card -->\n' +
            '                                <div class="card card-cascade wider card-ecommerce">\n' +
            '                                    <!-- Card image -->\n' +
            '                                    <div class="view view-cascade overlay  product-avatar">\n' +
            '                                        <img src="' + imageUrl +'"\n' +
            '                                            class="card-img-top" alt="sample photo">\n' +
            '                                        <a href="/product/detail/' +value.id+'">\n' +
            '                                            <div class="mask rgba-white-slight"></div>\n' +
            '                                        </a>\n' +
            '                                    </div>\n' +
            '                                    <!-- Card image -->\n' +
            '                                    <!-- Card content -->\n' +
            '                                    <div class="card-body card-body-cascade text-center">\n' +
            '                                        <!-- Category & Title -->\n' +
            // '                                        <a href="" class="text-muted">\n' +
            //     '                                            <h5>Helemt</h5>\n' +
            // '                                        </a>\n' +
            '                                        <p class="card-title">\n' +
            '                                            <strong>\n' +
            '                                        <a href="/product/detail/' +value.id+'">\n' +
            '' + formatName(value.name) + '</a>\n' +
            '                                            </strong>\n' +
            '                                        </p>\n' +
            '                                        <!-- Description -->\n' +
            // '                                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing minima\n' +
            // '                                            veniam elit.</p>\n' +
            '<div>\n' +
            "                                        <!-- Star -->\n" +
            "                                        <p class=\"card-text\" id=show-product-stars-" + value.id + "></p>\n" +
            '                                        <!-- Card footer -->\n' +
            '                                        <div class="card-footer px-1">\n' +
            '                                            <span class="float-left font-weight-bold">\n' +
            '                                                <strong>' + formatter.format(value.price) + '</strong>\n' +
            '                                            </span>\n' +
            '                                            <span class="float-right">\n' +
            '                                                <a class="" href="/product/detail/' +value.id+'" data-toggle="tooltip" data-placement="top" title="Quick Look">\n' +
            '                                                    Details >>\n' +
            '                                                </a>\n' +
            '                                            </span>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                    <!-- Card content -->\n' +
            '                                </div>\n' +
            '                                <!-- Card -->\n' +
            '                            </div>');
    }

    const loadProductHome = async (products) => {
        var i, j = 0;
        for (i = 0; i < products.length; i += 4) {
            $("#sliderProduct").append('<div class="carousel-item" id="slideProduct' + i + '">\n' +

                '                    </div>');
            let product3 = products.slice(i, i + 4);
            for (value of product3) {
                const imageUrl = await loadImageProduct(value.id);
                await loadProduct3(value, imageUrl, $(`#slideProduct${i}`));

                var rate = value.totalRater;
                var star = value.totalRatePoint / rate;
                var stars = "";
                if (rate != 0) {
                    for (j = 0; j <= 4; j++) {
                        if (star <= j) {
                            stars = stars + "<i class=\"fa fa-star-o orange-text\"> </i>";
                        }

                        if (star > j && star < j + 1) {
                            stars = stars + "<i class=\"fa fa-star-half-o orange-text\"></i>";
                        }

                        if (star >= j + 1) {
                            stars = stars + ("<i class=\"fa fa-star orange-text\"></i>");
                        }
                    }
                    $("#show-product-stars-" + value.id).html(stars);
                } else {
                    $("#show-product-stars-" + value.id).html("0 Review");
                }
            }
        }
        $("#sliderProduct .carousel-item").first().addClass("active");

    }

    const formatName = (name) => {
        if (name.length >= 18) {
            return name.substring(0, 18) + "...";
        }
        return name;
    }


})
