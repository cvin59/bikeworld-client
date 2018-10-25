const frontendServer = 'http://localhost:8084';
const backendServer = 'http://localhost:8080';

function getProductById() {
    let id = $("#id").val()
    console.log(id);
    if (id != null) {
        $.ajax({
            type: "GET",
            url: backendServer + "api/product/" + id,
            dataType: 'json',
            success: function (response) {
                $('#result').html("");
                var product=JSON.parse(response){

                }
            }
        })
    }
}
