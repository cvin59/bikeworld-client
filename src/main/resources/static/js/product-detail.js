var username;
var seller
var productPrice;
var productId;
var ratingPage = 1;
var ratingTotal;
var canRate;


$(function () {
    username = localStorage.getItem("username");
    let id = $("#id").val();
    console.log(id);
    if (id != "") {
        $.ajax({
            type: "GET",
            url: backendServer + "/api/product/" + id,
            dataType: 'json',
            success(res) {
                if (res != null) {
                    if (username != null) {
                        $("#rate-user-name").text(username);
                    }

                    $("#show-product-name").append(res.data.name);
                    $("#link-show-product-name").append(res.data.name);
                    $("#show-product-price").append(res.data.price + " Dollars");
                    $("#show-product-quantity").append(res.data.quantity);
                    $("#show-product-description").append(res.data.description);
                    $("#show-product-address").append(res.data.address);
                    $("#show-symbol-product-address").append(res.data.address);
                    $("#show-product-brand").append(res.data.brand);

                    $("#orderQuantity").attr({"max": res.data.quantity, "min": 1});

                    if (res.data.latitude != null && res.data.longtitude != null) {
                        $("#productLat").val(res.data.latitude);
                        $("#productLng").val(res.data.longtitude);
                    } else {
                        $("#show-map").attr("disabled", "disabled");
                    }


                    productId = res.data.id;
                    productPrice = res.data.price;
                    seller = res.data.seller;

                    var rate = res.data.totalRatePoint;
                    var rater = res.data.totalRater

                    loadSellerProfile(res.data.seller);
                    loadRelevant(res.data.name, res.data.categoryId);
                    showReviews(rater);
                    showStars(rate, rater, $("#show-product-rate"));
                    showImages(res);
                    showStatus(res.data.statusId);
                    showMyRate();
                    showRatings();

                }
            }, error(e) {
                console.log(e);
            }
        })

    }
});

function showMyRate() {
    if (username == null) {
        $('#txtRatingContent').attr("readonly", true);
    } else {
        $.ajax({
            url: backendServer + "/api/product/rate?productId=" + productId +
                "&rater=" + username,
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (res.status_code == 1) {
                    $('#btnRating').attr('disabled', true);
                    $('#txtRatingContent').attr("readonly", true);
                    $('#txtRatingContent').val(res.data.content);
                    showStars(res.data.point, 1, $('#star-rating'));
                }
            }, error: function (res) {
                console.log(res.message);
            }

        })
    }
}

function showStatus(stat) {
    var statusId = stat.id;
    var status = stat.name;
    switch (statusId) {
        case 1:
            $("#show-product-status").addClass("badge ml-3 success-color");
            break;
        case 2:
            $("#show-product-status").addClass("badge ml-3 warning-color");
            break;
        case 3:
            $("#show-product-status").addClass("badge ml-3 info-color");
            break;
        case 4:
            $("#show-product-status").class = "badge ml-3 stylish-color";
            break;
    }

    $("#show-product-status").append(status);
}

function showImages(res) {
    productImgs = res.data.images;

    var indicators = document.getElementById("carousel-indicators");
    var inner = document.getElementById("carousel-inner");

    var img = document.createElement("img");

    if (productImgs != null) {

        for (i = 0; i < productImgs.length; i++) {
            var li = document.createElement("li");
            var div = document.createElement("div");
            var img = document.createElement("img");

            li.setAttribute("data-target", "#carousel-example-1z");
            li.setAttribute("data-slide-to", i);
            if (i === 0) {
                li.setAttribute("class", "active");
                div.setAttribute("class", "carousel-item active");
            } else {
                div.setAttribute("class", "carousel-item");

            }


            img.setAttribute("class", "d-block w-100");
            img.setAttribute("src", backendServer + productImgs[i]);

            div.appendChild(img);
            inner.appendChild(div);
            indicators.appendChild(li);

        }
    } else {
        var li = document.createElement("li");
        var div = document.createElement("div");
        var img = document.createElement("img");

        li.setAttribute("data-target", "#carousel-example-1z");
        li.setAttribute("data-slide-to", i);
        li.setAttribute("class", "active");
        div.setAttribute("class", "carousel-item active");


        img.setAttribute("class", "d-block w-100");
        img.setAttribute("src", backendServer + "/images/img404.jpg");

        div.appendChild(img);
        inner.appendChild(div);
        indicators.appendChild(li);
    }
}

function showReviews(rater) {
    if (rater > 1) {
        $("#show-product-rater").append(rater + " Reviews");
    } else {
        $("#show-product-rater").append(rater + " Review");
    }
}

function showStars(rate, rater, location) {
    var star = rate / rater;
    var stars = "";
    for (i = 0; i <= 4; i++) {
        if (star <= i) {
            stars = stars + "<i class=\"fa fa-star-o orange-text\"> </i>";
        }

        if (star > i && star < i + 1) {
            stars = stars + "<i class=\"fa fa-star-half-o orange-text\">";
        }

        if (star >= i + 1) {
            stars = stars + ("<i class=\"fa fa-star orange-text\"></i>");
        }
    }
    location.html(stars);
}

$("#btn-Order").on("click", function (e) {
    e.preventDefault();

    if (username == null) {
        $("#modalLRForm").modal();
    } else {
        username = localStorage.getItem("username");

        if (seller === username) {
            alert("You can't buy your own product")
        } else {
            loadProfile(username);
            $("#addOrderModal").modal();
        }
    }
})

function loadSellerProfile(username) {

    $.ajax({
        type: 'GET',
        url: backendServer + "/api/account/profile/" + username,
        dataType: 'json',
        success(res) {
            if (res.data != null) {
                $("#sellerPhone").text(res.data.phone);
                $("#sellerMail").text(res.data.email);
            }
        },
        error(e) {
            console.log(e);
        }
    });
}


function loadProfile(username) {

    $("#edtUsername").val(username);

    $.ajax({
        type: 'GET',
        url: backendServer + "/api/account/profile/" + username,
        dataType: 'json',
        success(res) {
            if (res.data != null) {
                if (res.data.firstName != null && res.data.lastName != null) {
                    $("#receiverName").val(res.data.firstName + " " + res.data.lastName);
                }
                $("#orderPhone").val(res.data.phone);
                $("#orderAddress").val(res.data.address);
            }
        },
        error(e) {
            console.log(e);
        }
    });
}

$("#orderQuantity").on("change", function () {
    var price = $("#orderQuantity").val() * productPrice;
    $("#totalPrice").val(price);
})

$("#create-order-form").submit(async function (e) {
    e.preventDefault();
    var objectData = {
        reciever: $("#receiverName").val(),
        deliveryAddr: $("#orderAddress").val(),
        phoneContact: $("#orderPhone").val(),
        seller: seller,
        buyer: username,
        quantity: $("#orderQuantity").val(),
        total: $("#totalPrice").val(),
        productId: productId,
    }

    var objectDataString = JSON.stringify(objectData);
    var formData = new FormData();

    formData.append('orderModelString', objectDataString);
    $.ajax({
        type: "POST",
        url: backendServer + "/api/order",
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
    }).done((res) => {
        console.log(res.data);
        console.log(res.status_code);
    }).fail((res) => {
        console.log(res.message);
    });
})

$('#rate-product-form').submit(async function (e) {
    e.preventDefault();
    if (username == null) {
        $("#modalLRForm").modal();
    } else if (canRate != 1) {
        alert("You did not buy this product");
    }
    else if ($('#rating-value').val() == 0) {
        alert("Please give rate point");

    } else {
        username = localStorage.getItem("username");

        var objectData =
            {
                rater: username,
                productId: productId,
                content: $('#txtRatingContent').val(),
                point: $('#rating-value').val(),
            };

        var objectDataString = JSON.stringify(objectData);
        var formData = new FormData();
        formData.append("rateModelString", objectDataString);

        $.ajax({
            type: "POST",
            url: backendServer + "/api/product/rate",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
                alert(res.message);
                window.location.reload(true);
            },
            error: function (res) {
                alert(res.message);
            }
        });
    }
})

function checkRate() {
    $.ajax({
        type: "GET",
        url: backendServer + "/api/product/rate/right?productId=" + productId + "&rater=" + username,
        dataType: "json",
        success: function (res) {
            if (res.status_code == 1) {
                canRate = 1;
            } else {
                canRate = 0;
            }
        }, error: function (e) {
            console.log(e);
            canRate = 0;
        }
    });
}

function showRatings() {
    $.ajax({
        url: backendServer + "/api/product/rate/" + productId +
            "?page=" + ratingPage,
        type: 'GET',
        dataType: 'json',
        success: function (res) {

            var ratings = res.data.productRatings;

            for (i = 0; i < ratings.length; i++) {
                $("#rating-section").append("  <div class=\"row mt-2 pt-2 border-top\">\n" +
                    "                        <div class=\"col-1\">\n" +
                    "                            <img src=\"https://mdbootstrap.com/img/Photos/Avatars/img%20(18)-mini.jpg\"\n" +
                    "                                 class=\"rounded-circle z-depth-1-half w-100\">\n" +
                    "                        </div>\n" +
                    "                        <div class=\"col-11\">\n" +
                    "                                <h4 class=\"font-weight-bold black-text\">" +
                    ratings[i].rater + "</h4>\n" +
                    "                            <!--Review-->\n" +
                    "<div id=rating-stars-" + ratings[i].id + ">" +
                    "</div>" +
                    // "                            <i class=\"fa fa-star orange-text\"> </i>\n" +
                    // "                            <i class=\"fa fa-star orange-text\"> </i>\n" +
                    // "                            <i class=\"fa fa-star orange-text\"> </i>\n" +
                    // "                            <i class=\"fa fa-star orange-text\"> </i>\n" +
                    // "                            <i class=\"fa fa-star-half-full orange-text\"> </i>\n" +
                    "                            <h5 class=\"mt-2\">" +
                    ratings[i].content +
                    "</h5>\n" +
                    "                            <h6 class=\"grey-text\">" +
                    ratings[i].rateDate +
                    "</h6>\n" +
                    "                        </div>\n" +
                    "                    </div>"
                );
                var star = ratings[i].point;
                var stars = "";
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
                $("#rating-stars-" + ratings[i].id).html(stars);
            }

            ratingTotal = res.data.totalPage;
            if (ratingTotal == 0) {
                $("#btn-load-more").css("display", "none");
            }
            else if (ratingPage == ratingTotal) {
                $("#btn-load-more").css("display", "none");
            }
        }, error: function (res) {

        }

    })
}

$("#txtRatingContent").click(function () {
    if (username == null) {
        $("#modalLRForm").modal();
    } else {
        checkRate();
    }
})

$("#btn-load-more").click(function () {
    ratingPage += 1;
    showRatings();
})

function loadRelevant(productName, categoryId) {
    $.ajax({
        type: "GET",
        url: backendServer + "/api/product/relevant?productName=" + productName + "&categoryId=" + categoryId,
        dataType: 'json',
        success(res) {
            var productList = res.data;

            if (productList != null) {
                for (i = 1; i < productList.length; i++) {
                    var avatar = "";
                    if (productList[i].images != null) {
                        avatar = backendServer + productList[i].images[0];
                    } else {
                        avatar = backendServer + "/images/img404.jpg";
                    }

                    $("#show-relevant").append(" <div class=\"col-md-4 clearfix d-none d-md-block mb-3\">\n" +
                        "                                <!-- Card -->\n" +
                        "                                <div class=\"card card-cascade wider card-ecommerce\">\n" +
                        "                                    <!-- Card image -->\n" +
                        "                                    <div class=\"view view-cascade overlay\">\n" +
                        "                                        <img src=" + '"' + avatar + '"' + "\n" +
                        "                                            class=\"card-img-top\" alt=\"sample photo\">\n" +
                        "                                        <a" +
                        " href=" + '"' + frontendServer + "/product/detail/" + productList[i].id + '"' +
                        ">\n" +
                        "                                            <div class=\"mask rgba-white-slight\"></div>\n" +
                        "                                        </a>\n" +
                        "                                    </div>\n" +
                        "                                    <!-- Card image -->\n" +
                        "                                    <!-- Card content -->\n" +
                        "                                    <div class=\"card-body card-body-cascade text-center\">\n" +
                        "                                        <!-- Category & Title -->\n" +
                        "                                        <a" +
                        " href=" + '"' + frontendServer + "/product/category/" + productList[i].categoryId + '"' +
                        "" +
                        "class=\"text-muted\">\n" +
                        "                                            <h5>" +
                        productList[i].category +
                        "</h5>\n" +
                        "                                        </a>\n" +
                        "                                        <h4 class=\"card-title\">\n" +
                        "                                            <strong>\n" +
                        "                                                <a" +
                        " href=" + '"' + frontendServer + "/product/detail/" + productList[i].id + '"' +
                        ">" +
                        formatName(productList[i].name) +
                        "</a>\n" +
                        "                                            </strong>\n" +
                        "                                        </h4>\n" +
                        "                                        <!-- Star -->\n" +
                        "                                        <p class=\"card-text\" id=show-product-stars-" + i + "></p>\n" +
                        "                                        <!-- Card footer -->\n" +
                        "                                        <div class=\"card-footer px-1\">\n" +
                        "                                            <span class=\"float-left font-weight-bold\">\n" +
                        "                                                <strong>" +
                        productList[i].price +
                        "</strong>\n" +
                        "                                            </span>\n" +
                        "                                            <span class=\"float-right\">\n" +
                        "                                                <a class=\"\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Quick Look\"" +
                        " href=" + '"' + frontendServer + "/product/detail/" + productList[i].id + '"' +
                        ">\n" +
                        "                                                    Details >>\n" +
                        "                                                </a>\n" +
                        "                                            </span>\n" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                    <!-- Card content -->\n" +
                        "                                </div>\n" +
                        "                                <!-- Card -->\n" +
                        "                            </div>");
                    var rate = productList[i].totalRater;
                    var star = productList[i].totalRatePoint / rate;
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
                        $("#show-product-stars-" + i).html(stars);
                    } else {
                        $("#show-product-stars-" + i).html("0 Review");
                    }
                }
            }
        },
        error(e) {
            console.log(e);
        }
    })
}

function initialize() {
    initAutocomplete();
}

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('orderAddress')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

    initMap();
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());


        });
    }
}


// $("#orderAddress").on("focus", function () {
//     geolocate();
// })


function initMap(lat, lng) {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: 16
    });

    var marker = new google.maps.Marker({
        position:  {lat: lat, lng: lng},
        map: map,
        title: 'Hello World!'
    });
}

$("#show-map").click(function () {
    var lat = parseFloat($("#productLat").val());
    var lng = parseFloat($("#productLng").val());

    console.log(lat + "," + lng);
    $('#ggMapModal').modal();
    initMap(lat, lng);
})

const formatName = (name) => {
    if (name.length >= 18) {
        return name.substring(0, 18) + "...";
    }
    return name;
}