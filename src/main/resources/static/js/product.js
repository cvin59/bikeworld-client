$(function () {

    const frontendServer = 'http://localhost:8084';
    const backendServer = 'http://localhost:8080';

    $(document).read(function () {
        $.ajax({
            url: backendServer+"/api/product/4"
        }).then(function (data) {
            $('show-product-name').append(data.name);
            $('show-product-price').append(data.description);
            $('').append(data.price);
        })
    })
})