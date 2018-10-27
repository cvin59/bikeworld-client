$(function () {
    const backendServer = "http://localhost:8080"

    let id = $("#id").val();
    console.log(id);
    if (id != "") {
        $.ajax({
            type: "GET",
            url: backendServer + "/api/product/" + id,
            dataType: 'json',
            success(res) {
                if (res!=null){
                    document.getElementById("show-product-name").innerText(res.data.name);
                }
            }
        })

    }
})

