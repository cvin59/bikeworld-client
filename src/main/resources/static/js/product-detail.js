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

                    productId = res.data.id;
                    productPrice = res.data.price;
                    seller = res.data.seller;

                    var rate = res.data.totalRatePoint;
                    var rater = res.data.totalRater

                    showReviews(rater);
                    showStars(rate, rater, $("#show-product-rate"));
                    showImages(res);
                    showStatus(res.data.statusId);
                    // showMyRate();
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

function loadProfile(username) {

    $("#edtUsername").val(username);

    $.ajax({
        type: 'GET',
        url: backendServer + "/api/account/profile/" + username,
        dataType: 'json',
        success(res) {
            if (res.data != null) {
                $("#receiverName").val(res.data.firstName + " " + res.data.lastName);
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

$("#create-order-form").submit(function () {
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
        type: 'POST',
        url: backendServer + "/api/order",
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false,

        success: function (response) {
            alert("Success")
        },
        error: function (e) {
            alert("ERROR load: ", e);
            console.log(e);
        }
    });
})

$('#rate-product-form').submit(function (e) {
    e.preventDefault();

    if (username == null) {
        $("#modalLRForm").modal();
    }else if (canRate!=1){
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
            success: function () {
                alert("Success");
            }, error: function (e) {
                console.log(e);
                alert("Error: " + e);
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
            if (ratingPage == ratingTotal) {
                $("#btn-load-more").css("display", "none")
            }
        }, error: function (res) {

        }

    })
}

$("#txtRatingContent").click(function () {
    if (username == null) {
        $("#modalLRForm").modal();
    }else{
        checkRate();
    }
})

$("#btn-load-more").click(function () {
    ratingPage += 1;
    showRatings();
})