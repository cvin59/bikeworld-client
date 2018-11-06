// JavaScript source code
//Scroll by animation
new WOW().init();

// SideNav Button Initialization
$(".button-collapse").sideNav();
// SideNav Scrollbar Initialization
var sideNavScrollbar = document.querySelector('.custom-scrollbar');
Ps.initialize(sideNavScrollbar);

// Material Select Initialization
$(document).ready(function () {
    $('.mdb-select').material_select();
});

//Star Rating
var $star_rating = $('.star-rating .fa');

var SetRatingStar = function () {
    return $star_rating.each(function () {
        if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
            return $(this).removeClass('fa-star-o').addClass('fa-star');
        } else {
            return $(this).removeClass('fa-star').addClass('fa-star-o');
        }
    });
};

$star_rating.on('click', function () {
    $star_rating.siblings('input.rating-value').val($(this).data('rating'));
    return SetRatingStar();
});
//End Star Rating

//Custom Carousel

//Stops carousel from auto sliding
$('.carousel-no-auto').carousel({
    interval: 0
});
//End Custom Carousel

//Image Preview
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageUpload").change(function () {
    readURL(this);
});
//Image Preview

//Init data tables
$(document).ready(function () {
    $('.customtable').DataTable();
    $('.dataTables_length').addClass('bs-select');

    $(window).scroll(function() {
        if ($(this).scrollTop() > 860) {
            $('#btnGoTop').fadeTo("slow", 8.6);
        }
        if ($(this).scrollTop() <= 500) {
            $('#btnGoTop').fadeOut(400);
        }
    });

    $('#btnGoTop').click(function(event) {
        event.preventDefault();

        $('html, body').animate({scrollTop: 0}, 1000);
    })
});


