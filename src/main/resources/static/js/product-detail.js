var username;
var seller
var productPrice;
var productId;
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
                    showStars(rate, rater);
                    showImages(res);
                    showStatus(res.data.statusId);
                }
            }, error(e) {
                console.log(e);
            }
        })

    }
});

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

function showStars(rate, rater) {
    var star = rate / rater;
    var stars = "";
    for (i = 0; i <= 4; i++) {
        if (star <= i) {
            stars = stars + "<i class=\"fa fa-star-o\"> </i>";
        }

        if (star > i && star < i + 1) {
            stars = stars + "<i class=\"fa fa-star-half-o\">";
        }

        if (star >= i + 1) {
            stars = stars + ("<i class=\"fa fa-star\"></i>");
        }
    }
    $("#show-product-rate").html(stars);
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

