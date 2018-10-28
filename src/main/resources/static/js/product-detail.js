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
                    $("#show-product-name").append(res.data.name);
                    $("#link-show-product-name").append(res.data.name);
                    $("#show-product-price").append(res.data.price + " Dollars");
                    $("#show-product-quantity").append(res.data.quantity);
                    $("#show-product-description").append(res.data.description);
                    $("#show-product-address").append(res.data.address);
                    $("#show-symbol-product-address").append(res.data.address);
                    $("#show-product-brand").append(res.data.brandId.name);
                    var rate = res.data.totalRatePoint;
                    var rater = res.data.totalRates;
                    showReviews(rater);
                    showStars(rate, rater);
                }
            }, error(e) {
                console.log(e);
            }
        })

    }
})

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

