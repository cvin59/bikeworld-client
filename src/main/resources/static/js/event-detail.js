$(function () {
    const backendServer = "http://localhost:8080"

    let id = $("#id").val();
    console.log(id);
    if (id != "") {
        $.ajax({

            type: "GET",
            url: backendServer + "/api/event/" + id,
            dataType: 'json',
        }).done((res) => {
            console.table(res.data);
            loadInfo(res.data);
        }).fail((res) => {
            console.log(res.message);
        });

    }

    const loadInfo = async (event) => {
        $("#eventName").text(event.title);
        $("#eventStatus").text(event.eventStautsid.name);
        $("#eventPrice").text(formatter.format(event.fee));
        $("#eventLocation").text(event.location);
        $("#eventAddress").text(event.address);
        $("#eventOpen").text(toJSDate(event.startDate));
        $("#eventEnd").text(toJSDate(event.endDate));
        $("#eventDescription").append(event.description);
        ratingStar(event.totalRatesPoint);
        $("#totalRates").text(event.totalRates);
        let imageUrl = await loadImageFromEvent(event.id);
        $("#eventImage").attr("src", imageUrl);
    }
    //fee
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    //date
    const toJSDate = (dateTime) => {

        var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time

        var date = dateTime[0].split("/");
        var time = dateTime[1].split(":");
        console.log(date + time);
        //(year, month, day, hours, minutes, seconds, milliseconds)
        let dateObject = new Date(date[2], date[1] - 1, date[0], time[0], time[1]);
        let name = getWeekDay(dateObject)
            + " " + dateObject.getDate() + " " + getMonth(dateObject) + " " + dateObject.getFullYear()
            + " at " + dateObject.getHours() + ":" + dateObject.getMinutes();
        return name;

    }

    const getWeekDay = (date) => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return days[date.getDay()];
    }


    const getMonth = (date) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Oct', 'Dec'];

        return months[date.getMonth()];
    }
    //rating
    const ratingStar = (ratePoint) => {
        const starPercentage = (ratePoint / 5) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        $("#totalRatingPoints").width(starPercentageRounded);
    }

    const loadImageFromEvent = (id) => {
        return fetch(backendServer + "/api/event-image/event/" + id)
            .then(rs => rs.json())
            .then(data => backendServer + data.data.imageLink);
    }

    var JWT = localStorage.getItem('JWT');

    $("#btnJoinNow").click((e) => {
        e.preventDefault();
        if (JWT === null) {
            $("#modalLRForm").modal();
        }
    })
})