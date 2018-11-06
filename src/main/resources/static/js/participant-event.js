$(function () {
    var productListPage = 1;
    var productListTotalPage;
    var productListSize = 5;

    username = localStorage.getItem('username');

    var getParticipant = async () => {
        let result;
        await $.ajax({
            type: "GET",
            url: backendServer + "/api/participant/" + username + "?page=" + 1 + "&sort=" + 'registerDate' + "&direction=" + 1,
            dataType: 'json',
        }).done((res) => {
            result = res;
            console.table(res.content);
        }).fail((res) => {
            alert(res.message);
        });
        return result;
    }

    var loadFirstPage = async () => {
        let allEvent = await getParticipant();
        await loadParticipant($("#participantsView"), allEvent.content);
        // totalPage = allEvent.totalPage;
        // currentPage = allEvent.currPage;
        // await loadPaging(allEvent.totalPage, allEvent.currPage);
    }

    loadFirstPage();


    const loadParticipant = async (element, participants) => {
        for (value of participants) {
            let imageUrl = await loadImage(value.eventId.id);
            await element.append('<div class="row wow bounceInUp animated fast border-top">\n' +
                '                                        <div class="col-4 pt-3 pb-3 view zoom">\n' +
                '                                            <a href="/event/detail/' + value.eventId.title + '/' + value.eventId.id + '"><img class="img-fluid"\n' +
                '                                                            src="' + imageUrl + '"></a>\n' +
                '                                        </div>\n' +
                '                                        <div class="col-8 card shadow-none">\n' +
                '                                            <div class="card-body">\n' +
                '                                                <a>\n' +
                '                                                    <h4 class="font-weight-bold"><a style="font-size: 16px; color: #333" href="/event/detail/' + value.eventId.title + '/' + value.eventId.id + '">' + value.eventId.title + '</a></h4>\n' +
                '                                                </a>\n' +
                '                                                <dl class="row">\n' +
                '                                                    <dt class="col-sm-3">Total:</dt>\n' +
                '                                                    <dd class="col-sm-9">' + formatter.format(value.total) + '</dd>\n' +
                '\n' +
                '                                                    <dt class="col-sm-3">Quantity:</dt>\n' +
                '                                                    <dd class="col-sm-9">' + value.quantity + '</dd>\n' +
                '                                                </dl>\n' +
                '                                                <dl class="row">\n' +
                '                                                    <dt class="col-sm-3">Register Date:</dt>\n' +
                '                                                    <dd class="col-sm-9">' + value.registerDate + '</dd>\n' +
                '                                                </dl>\n' +
                '\n' +
                '                                                <div>\n' +
                '                                                    <div>' + status(value.eventId.eventStautsid.id) + '</div>\n' +
                '                                                </div>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>');
        }


    }

    const status = (statusId) => {
        let ret;
        switch (statusId) {
            case 1:
                ret = '<span class="badge badge-info">Inactive</span>';
                break;
            case 2:
                ret = '<span class="badge badge-primary">Active</span>';
                break;
            case 3:
                ret = '<span class="badge badge-success">Finish</span>';
                break;
            case 4:
                ret = '<span class="badge badge-danger">Canceled</span>';
                break;
        }
        return ret;
    }
})


function productListPagination(totalPage, currentPage) {

    if (currentPage < 2) {
        document.getElementById("productList-first-page").className = "page-item disabled";
        document.getElementById("productList-previous-page").className = "page-item disabled";
    } else {
        document.getElementById("productList-first-page").className = "page-item";
        document.getElementById("productList-previous-page").className = "page-item";
    }

    if (currentPage == totalPage) {
        document.getElementById("productList-last-page").className = "page-item disabled";
        document.getElementById("productList-next-page").className = "page-item disabled";
    } else {
        document.getElementById("productList-last-page").className = "page-item";
        document.getElementById("productList-next-page").className = "page-item";
    }

    switch (totalPage) {
        case 1:
            $("#productList-back2").css("display", "none");
            $("#productList-back").css("display", "none");
            $("#productList-next").css("display", "none");
            $("#productList-next2").css("display", "none");
            break;
        case 2:
            if (currentPage == 1) {
                $("#productList-back2").css("display", "none");
                $("#productList-back").css("display", "none");
                $("#productList-next").css("display", "block");
                $("#productList-next2").css("display", "none");
            } else if (currentPage == 2) {
                $("#productList-back2").css("display", "none");
                $("#productList-back").css("display", "block");
                $("#productList-next").css("display", "none");
                $("#productList-next2").css("display", "none");
            }
        default:
            switch (currentPage) {
                case 1:
                    $("#productList-back2").css("display", "none");
                    $("#productList-back").css("display", "none");
                    $("#productList-next").css("display", "block");
                    $("#productList-next2").css("display", "block");
                    break;
                case 2:
                    $("#productList-back2").css("display", "none");
                    $("#productList-back").css("display", "block");
                    $("#productList-next").css("display", "block");
                    $("#productList-next2").css("display", "block");
                    break;
                default:
                    if (totalPage - currentPage == 0) {
                        $("#productList-back2").css("display", "block");
                        $("#productList-back").css("display", "block");
                        $("#productList-next").css("display", "none");
                        $("#productList-next2").css("display", "none");
                    } else if (totalPage - currentPage == 1) {
                        $("#productList-back2").css("display", "block");
                        $("#productList-back").css("display", "block");
                        $("#productList-next").css("display", "block");
                        $("#productList-next2").css("display", "none");
                    } else {
                        $("#productList-next").css("display", "block");
                        $("#productList-next2").css("display", "blcck");
                        $("#productList-back2").css("display", "block");
                        $("#productList-back").css("display", "block");
                    }
                    break;
            }
    }
    var back2 = currentPage - 2;
    $("#productList-back2").html("  <a class=\"page-link\">" + back2 + "</a>");

    var back = currentPage - 1;
    $("#productList-back").html("  <a class=\"page-link\">" + back + "</a>");

    $("#productList-current-page").html("  <a class=\"page-link\">" + currentPage + "</a>");

    var next = currentPage + 1;
    $("#productList-next").html("  <a class=\"page-link\">" + next + "</a>");

    var next2 = currentPage + 2;
    $("#productList-next2").html("  <a class=\"page-link\">" + next2 + "</a>");
}


$("#productList-next").click(function () {
    productListPage += 1;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-next2").click(function () {
    productListPage += 2;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-back").click(function () {
    productListPage -= 1;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-back2").click(function () {
    productListPage -= 2;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-first-page").click(function () {
    productListPage = 1;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-last-page").click(function () {
    productListPage = productListTotalPage;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-previous-page").click(function () {
    if (productListPage - 5 < 2) {
        productListPage = 1;
    } else {
        productListPage -= 5;
    }
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-next-page").click(function () {
    if (productListTotalPage - productListPage < 5) {
        productListPage = productListTotalPage;
    } else {
        productListPage += 5;
    }
    $("#show-product-list").html("");
    showProductList();
});