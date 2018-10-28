$(function () {
    const frontendServer = 'http://localhost:8084';
    const backendServer = 'http://localhost:8080';

    CKEDITOR.replace('inputProductDescription');

    $.ajax({
        url: backendServer + "/api/common/loadBrand",
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            var array = response.data;
            if (array != '') {
                var selectBox = document.getElementById("inputProductBrand");
                for (i = 0; i < array.length; i++) {
                    // selectBox.innerText("<option>" + array[i].name + "</option>");
                    var o = new Option(array[i].name, array[i].id);
                    $(o).html(array[i].name);
                    $("#inputProductBrand").append(o);
                }
            } else {
                alert("wrong");
            }
        },
        error: function (e) {
            alert("ERROR load: ", e);
        }
    }).done($.ajax({
        url: backendServer + "/api/common/loadCategory",
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            var array = response.data;
            if (array != '') {
                var selectBox = document.getElementById("inputProductCategory");
                for (i = 0; i < array.length; i++) {
                    // selectBox.innerText("<option>" + array[i].name + "</option>");
                    var o = new Option(array[i].name, array[i].id);
                    $(o).html(array[i].name);
                    $("#inputProductCategory").append(o);
                }
            } else {
                alert("wrong");
            }
        },
        error: function (e) {
            alert("ERROR load: ", e);
        }
    }))


// Restrict number only
    $('#inputProductPrice').on("change", function () {
        var val = Math.abs(parseInt(this.value, 10) || 1);
        this.value = val < 1 ? 1 : val;
    })
    $('#inputProductQuantity').on("change", function () {
        var val = Math.abs(parseInt(this.value, 10) || 1);
        this.value = val > 100 ? 99 : val;
    });


    //Create Product
    $('#btnCreate').click(function () {
        var cate = document.getElementById("inputProductCategory");
        var brand = document.getElementById("inputProductBrand");

        var objectData =
            {
                name: document.getElementById('inputProductName').value,
                description: CKEDITOR.instances['inputProductDescription'].getData(),
                price: document.getElementById('inputProductPrice').value,
                //quantity: document.getElementById('inputProductQuantity').value,
                seller: "user",
                category: cate.options[cate.selectedIndex].value,
                brand: brand.options[brand.selectedIndex].value,
            };
        var objectDataString = JSON.stringify(objectData);
        var e = document.getElementById("inputProductBrand");
        var strUser = e.options[e.selectedIndex].value;
        alert(strUser);
        $.ajax({
            type: "POST",
            url: backendServer + "/api/product",
            dataType: "json",
            data: {
                productModelString: objectDataString
            },
            success: function (data) {
                alert('Success');
            },
            error: function () {
                alert(objectDataString);
            }
        });
    })

    $('#product-list-link').click(function () {
        alert("ok");
    })
})