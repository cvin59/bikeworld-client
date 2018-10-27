$(function () {
    const frontendServer = 'http://localhost:8084';
    const backendServer = 'http://localhost:8080';

    $('#inputProductBrand').click(function () {
        $.ajax({
            url: backendServer + "/api/common/loadBrand",
            dataType: 'json',
            type: 'GET',
            success: function (response) {
                alert(response.data.name);
                var array = response.data;
                if (array != '') {
                    var selectBox = document.getElementById("inputProductBrand");
                    for (i in array)
                        selectBox.innerHTML("<option>" + array[i].name + "</option>");
                }
            },
            error: function (e) {
                alert("ERROR: ", e);
            }
        });
    })


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
        var objectData =
            {
                name: document.getElementById('inputProductName').value,
                description: document.getElementById('inputProductDescription').value,
                price: document.getElementById('inputProductPrice').value,
                //quantity: document.getElementById('inputProductQuantity').value,
                seller: "user",
                category: "1",
                brand: "1",
            };
        var objectDataString = JSON.stringify(objectData);

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
})