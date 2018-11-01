$(function () {
    const backendServer = "http://localhost:8080";

    let id = $("#id").val();
    console.log(id);
    if (id != "") {
        $.ajax({
            type: "GET",
            url: backendServer + "/api/product/" + id,
            dataType: 'json',
            success(res) {
                if (res != null) {
                    $("#show-product-name").append(res.data.productInfo.name);
                    $("#link-show-product-name").append(res.data.productInfo.name);
                    $("#show-product-price").append(res.data.productInfo.price + " Dollars");
                    $("#show-product-quantity").append(res.data.productInfo.quantity);
                    $("#show-product-description").append(res.data.productInfo.description);
                    $("#show-product-address").append(res.data.productInfo.address);
                    $("#show-symbol-product-address").append(res.data.productInfo.address);
                    $("#show-product-brand").append(res.data.productInfo.brandId.name);

                    var rate = res.data.productInfo.totalRatePoint;
                    var rater = res.data.productInfo.totalRates;

                    showReviews(rater);
                    showStars(rate, rater);
                    showImages(res);
                    showStatus(res.data.productInfo.statusId);
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
    productImgs = res.data.ProductImg;
    if (productImgs != null) {
        var indicators = document.getElementById("carousel-indicators");
        var inner = document.getElementById("carousel-inner");

        var img = document.createElement("img");

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


