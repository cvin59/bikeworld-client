$(function () {
    var count = 1;
    var totalPage;
    var selectSortBy = $("#selectSortBy");
    var selectDirection = $("#selectDirection");

    $('#selectSortBy').change(async () => {
        count = 1;
        $("#resultView").empty();
        let allEvent = await getAllEvent();
        await loadEvent($("#resultView"),allEvent.content);
        totalPage = allEvent.totalPage;
        count = 1;
    });

    $('#selectDirection').change(async () => {
        count = 1;
        $("#resultView").empty();
        let allEvent = await getAllEvent();
        await loadEvent($("#resultView"),allEvent.content);
        totalPage = allEvent.totalPage;
        count = 1;
    });

    const getAllEvent = async () => {
        let result;
        await $.ajax({
            type: "GET",
            url: backendServer + "/api/event/get?page=" + 1 + "&sort=" + selectSortBy.val() + "&direction=" + selectDirection.val(),
            dataType: 'json',
        }).done((res) => {
            result = res;
        }).fail((res) => {
            alert(res.message);
        });
        return result;
    }

    const getMoreEvent = async (i) => {
        let result;
        await $.ajax({
            type: "GET",
            url: backendServer + "/api/event/get?page=" + i + "&sort=" + selectSortBy.val() + "&direction=" + selectDirection.val(),
            dataType: 'json',
        }).done((res) => {
            result = res;
        }).fail((res) => {
            alert(res.message);
        });
        return result;
    }

    const loadFirstPage = async () => {
        let allEvent = await getAllEvent();
        await loadEvent($("#resultView"), allEvent.content);
        totalPage = allEvent.totalPage;
        // await loadPaging(allEvent.totalPage, allEvent.currPage);
    }

    $("#loadMore").click(async (e) => {
        e.preventDefault();
        if (count === totalPage) {
            $("#loadMore").removeClass("btn-outline-primary");
            $("#loadMore").addClass("btn-outline-default disabled");
        } else {
            let allEvent = await getMoreEvent(++count);
            await loadEvent($("#resultView"), allEvent.content);
        }
    })

    loadFirstPage();
})