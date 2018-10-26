const frontendServer = 'http://localhost:8084';
const backendServer = 'http://localhost:8080';

$(function () {

    $.ajax({
            type: "GET",
            contentType: "application/json",
            url: backendServer + "/api/product/4",
            dataType: 'json',
            success: function (data) {
                var product = JSON.parse(data);
                var productName = product.name;
                $("#show-product-name").append(productName);

            }, error: function () {
                alert("fail");
            }
        }
    )
})

