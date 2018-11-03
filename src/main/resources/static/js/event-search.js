$(function () {
    var count = 1;
    var totalPage;
    var selectSortBy = $("#selectSortBy");
    var selectDirection = $("#selectDirection");

    $("#selectSearchType").val('3').change();

    const getUrlParameter = (sParam) => {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var keyword = getUrlParameter('q');

    $('#selectSortBy').change(async () => {
        $("#resultView").empty();
        let allEvent = await getAllEvent();
        await loadEvent($("#resultView"), allEvent.content);
        totalPage = allEvent.totalPage;
        count = 1;
    });

    $('#selectDirection').change(async () => {
        $("#resultView").empty();
        let allEvent = await getAllEvent();
        await loadEvent($("#resultView"), allEvent.content);
        totalPage = allEvent.totalPage;
        count = 1;
    });

    const getAllEvent = async () => {
        let result;
        await $.ajax({
            type: "GET",
            url: backendServer + "/api/event/search?q=" + keyword + "&page=" + 1 + "&sort=" + selectSortBy.val() + "&direction=" + selectDirection.val(),
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
            url: backendServer +"/api/event/search?q=" + keyword + "&page=" + i + "&sort=" + selectSortBy.val() + "&direction=" + selectDirection.val(),
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

    // const loadPaging = async (totalPage, currPage) => {
    //     let ulPage = $("#ulPaging");
    //     if (currPage != 1) {
    //         ulPage.append('<li class="page-item disabled"><a class="page-link">First</a></li>');
    //     }
    //     for (var i = 1; i <= totalPage; i++) {
    //         if (totalPage > 10) {
    //             if (currPage === i) {
    //                 ulPage.append('<li class="page-item active"><a class="page-link">i</a></li>');
    //             } else {
    //                 ulPage.append('<li class="page-item"><a class="page-link">i</a></li>');
    //             }
    //         }
    //
    //         if (totalPage > 10 && currPage < 7) {
    //             if (i < 11) {
    //                 if (currPage === i) {
    //                     ulPage.append('<li class="page-item disabled"><a class="page-link">First</a></li>');
    //                 } else {
    //                     ulPage.append('<li class="page-item"><a class="page-link">i</a></li>');
    //                 }
    //             }
    //         }
    //         if (totalPage > 10 && currPage > 6){
    //             let from = currPage - 6;
    //             let to = currPage +5;
    //             if (i > from && i < to) {
    //                 if (currPage === i) {
    //                     ulPage.append('<li class="page-item disabled"><a class="page-link">First</a></li>');
    //                 } else {
    //                     ulPage.append('<li class="page-item"><a class="page-link">i</a></li>');
    //                 }
    //             }
    //         }
    //     }
    //     if (currPage != totalPage){
    //         ulPage.append('<li class="page-item"><a class="page-link">Last</a></li>');
    //     }
    //
    // }

    loadFirstPage();

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    toJSDate = (dateTime) => {

        var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time

        var date = dateTime[0].split("/");
        var time = dateTime[1].split(":");
        console.log(date + time);
        //(year, month, day, hours, minutes, seconds, milliseconds)
        let dateObject = new Date(date[2], date[1] - 1, date[0], time[0], time[1]);
        return dateObject;

    };

    Date.daysBetween = function (date1, date2) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return Math.round(difference_ms / one_day);
    }
})