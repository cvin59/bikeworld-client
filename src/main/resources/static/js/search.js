$(function () {
    const searchEvent = (keyword) => {
        $.ajax({
            type: "GET",
            url: backendServer + "/api/event/result?q=" + keyword +
                "&page=" + 1,
            dataType: 'json',
        }).done((res) => {
            location.href = frontendServer + "/event/search?q=" + keyword;
        }).fail((res) => {
            alert(res.message);
        });
    }

    $("#formSearch").submit((e) => {
        e.preventDefault();
        let type = $("#selectSearchType").val();
        let keyword = $("#txtSearch").val();
        switch (type) {
            case "1":
                break;
            case "2":
                break;
            case "3":
                location.href = frontendServer + "/event/search?q=" + keyword;
                break;
        }
    })
})