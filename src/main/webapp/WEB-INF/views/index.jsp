﻿<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Trang chủ</title>
</head>

<body class="hidden-sn">
    <!--Double navigation-->
    <jsp:include page="header.jsp"/>
    <header>
        <!-- Sidebar navigation -->
        <div id="slide-out" class="side-nav elegant-color-dark">
            <ul class="custom-scrollbar">
                <!-- Logo -->
                <li>
                    <div class="logo-wrapper waves-light">
                        <a href="#">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7NJDLI2uPFBJN_dsOCavkJObbQf5kn1myxcHqIAgGOu5SMYGq"
                                class="img-fluid flex-center">
                        </a>
                    </div>
                </li>
                <!--/. Logo -->

                <!-- Side navigation links -->
                <li>
                    <ul class="collapsible collapsible-accordion">
                        <!--Account is only visible after logged in-->
                        <li>
                            <a class="collapsible-header waves-effect arrow-r font-weight-bold">
                                <i class="fa fa-user"></i>
                                Account
                                <i class="fa fa-angle-down rotate-icon"></i>
                            </a>
                            <div class="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" class="waves-effect">Account Info</a>
                                    </li>
                                    <li>
                                        <a href="#" class="waves-effect">Joined Events</a>
                                    </li>
                                    <li>
                                        <a href="#" class="waves-effect">Proposed Events</a>
                                    </li>
                                    <li>
                                        <a href="#" class="waves-effect">Buy History</a>
                                    </li>
                                    <li>
                                        <a href="#" class="waves-effect">Sell History</a>
                                    </li>
                                    <li>
                                        <a href="#" class="waves-effect">Order List</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a class="collapsible-header waves-effect arrow-r font-weight-bold">
                                <i class="fa fa-wrench"></i>
                                Component
                                <i class="fa fa-angle-down rotate-icon"></i>
                            </a>
                            <div class="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" class="waves-effect">Category 1</a>
                                    </li>
                                    <li>
                                        <a href="#" class="waves-effect">Category 2</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a class="collapsible-header waves-effect arrow-r font-weight-bold">
                                <i class="fa fa-tag"></i>
                                Trading
                                <i class="fa fa-angle-down rotate-icon"></i>
                            </a>
                            <div class="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" class="waves-effect">Newest</a>
                                    </li>
                                    <li>
                                        <a href="#" class="waves-effect">Most Populare</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a class="collapsible-header waves-effect arrow-r font-weight-bold">
                                <i class="fa fa-calendar"></i>
                                Event
                                <i class="fa fa-angle-down rotate-icon"></i>
                            </a>
                            <div class="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" class="waves-effect">Clothes</a>
                                    </li>
                                    <li>
                                        <a href="#" class="waves-effect">Bikes</a>
                                    </li>
                                    <li>
                                        <a href="#" class="waves-effect">Bike Components</a>
                                    </li>
                                    <li>
                                        <a href="#" class="waves-effect">Other</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>
                <!--/. Side navigation links -->
            </ul>
        </div>
        <!--/. Sidebar navigation -->
        <!-- Navbar -->
        <nav class="navbar fixed-top navbar-toggleable-md navbar-expand-lg scrolling-navbar double-nav white">
            <!-- SideNav slide-out button -->
            <div class="float-left">
                <a href="#" data-activates="slide-out" class="button-collapse">
                    <i class="fa fa-bars dark-grey-text"></i>
                </a>
            </div>
            <!-- Breadcrumb-->
            <div class="breadcrumb-dn mr-auto">
                <p class="font-weight-bold">Bike World or LOGO</p>
            </div>
            <ul class="nav navbar-nav nav-flex-icons ml-auto">
                <!--Notification button-->
                <!--<li class="nav-item">-->
                <!--<a class="nav-link"><span class="clearfix d-none d-sm-inline-block white-text">Notification</span></a>-->
                <!--</li>-->
                <!--End Notification button-->
                <li class="nav-item">
                    <a class="nav-link font-weight-bold" data-toggle="modal" data-target="#modalLRForm">
                        <span class="clearfix d-none d-sm-inline-block"><i class="fa fa-user"></i>Login/Register</span>
                    </a>
                </li>

                <!--Logged in account button-->
                <!--<li class="nav-item dropdown">-->
                <!--<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"-->
                <!--aria-haspopup="true" aria-expanded="false">-->
                <!--<i class="fa fa-user"></i>-->
                <!--Account-->
                <!--</a>-->
                <!--<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">-->
                <!--<a class="dropdown-item" href="#">Action</a>-->
                <!--<a class="dropdown-item" href="#">Another action</a>-->
                <!--<a class="dropdown-item" href="#">Something else here</a>-->
                <!--</div>-->
                <!--</li>-->
                <!--End Logged in account button-->

            </ul>
        </nav>
        <!-- /.Navbar -->
        <!--Modal: Login / Register Form-->
        <div class="modal fade" id="modalLRForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog cascading-modal" role="document">
                <!--Content-->
                <div class="modal-content">

                    <!--Modal cascading tabs-->
                    <div class="modal-c-tabs">

                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs md-tabs tabs-2 light-blue darken-3" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#logintab" role="tab"><i class="fa fa-user mr-1"></i>Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#registertab" role="tab"><i class="fa fa-user-plus mr-1"></i>Register</a>
                            </li>
                        </ul>

                        <!-- Tab panels -->
                        <div class="tab-content">
                            <!--Login Panel-->
                            <div class="tab-pane fade in show active" id="logintab" role="tabpanel">

                                <!--Body-->
                                <div class="modal-body mb-1">
                                    <div class="md-form form-sm mb-5">
                                        <i class="fa fa-envelope prefix"></i>
                                        <input type="email" id="modalLRInput10" class="form-control form-control-sm validate">
                                        <label data-error="wrong" data-success="right" for="modalLRInput10">Email</label>
                                    </div>

                                    <div class="md-form form-sm mb-4">
                                        <i class="fa fa-lock prefix"></i>
                                        <input type="password" id="modalLRInput11" class="form-control form-control-sm validate">
                                        <label data-error="wrong" data-success="right" for="modalLRInput11">Password</label>
                                    </div>

                                    <div class="md-form form-sm mb-5">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="checkboxRemember" />
                                            <label class="form-check-label" for="checkboxRemember">Remember Me</label>
                                        </div>
                                    </div>

                                    <div class="text-center mt-2">
                                        <button class="btn btn-success">Login</button>
                                    </div>
                                </div>
                                <!--Footer-->
                                <div class="modal-footer">
                                    <div class="options text-center text-md-right mt-1">
                                        <p>Forgot <a href="#registertab" class="blue-text">Password?</a></p>
                                    </div>
                                </div>

                            </div>
                            <!--End Login Panel-->
                            <!--Register Panel-->
                            <div class="tab-pane fade" id="registertab" role="tabpanel">

                                <!--Body-->
                                <div class="modal-body">
                                    <div class="md-form form-sm mb-5">
                                        <i class="fa fa-user prefix"></i>
                                        <input type="text" id="txtUsername" class="form-control form-control-sm validate">
                                        <label data-error="wrong" data-success="right" for="txtUsername">Username</label>
                                    </div>

                                    <div class="md-form form-sm mb-5">
                                        <i class="fa fa-envelope prefix"></i>
                                        <input type="email" id="txtEmail" class="form-control form-control-sm validate">
                                        <label data-error="wrong" data-success="right" for="txtEmail">Email</label>
                                    </div>

                                    <div class="md-form form-sm mb-5">
                                        <i class="fa fa-lock prefix"></i>
                                        <input type="password" id="txtPassword" class="form-control form-control-sm ">
                                        <label data-error="wrong" data-success="right" for="txtPassword">Password</label>
                                    </div>

                                    <div class="md-form form-sm mb-4">
                                        <i class="fa fa-lock prefix"></i>
                                        <input type="password" id="txtConfirmPassword" class="form-control form-control-sm">
                                        <label data-error="wrong" data-success="right" for="txtConfirmPassword">Confirm
                                            password</label>
                                    </div>

                                    <div class="text-center form-sm mt-2">
                                        <button class="btn btn-danger mb-5">Register</button>
                                    </div>
                                </div>
                            </div>
                            <!--End Register Panel-->
                        </div>

                    </div>
                </div>
                <!--/.Content-->
            </div>
        </div>
        <!--Modal: Login / Register Form-->


    </header>
    <!--Main Layout-->
    <main>

        <!-- Section: Scroll-by Menu -->
        <section class="text-center my-5">
            <div class="container">
                <!-- Grid row -->
                <div class="row">

                    <!-- Grid column -->
                    <div class="col-md-4 smooth-scroll">
                        <a href="#eventSection" class="btn-flat w-100 black-text">
                            <i class="fa fa-calendar fa-3x text-danger"></i>
                            <h5 class="font-weight-bold mt-4">Event</h5>
                            <i class="fa fa-sort-down text-danger"></i>
                        </a>
                    </div>
                    <!-- Grid column -->
                    <!-- Grid column -->
                    <div class="col-md-4 smooth-scroll">
                        <a href="#componentSection" class="btn-flat w-100 black-text">
                            <i class="fa fa-wrench fa-3x orange-text"></i>
                            <h5 class="font-weight-bold mt-4">Component</h5>
                            <i class="fa fa-sort-down orange-text"></i>
                        </a>
                    </div>
                    <!-- Grid column -->
                    <!-- Grid column -->
                    <div class="col-md-4 smooth-scroll">
                        <a href="#tradingSection" class="btn-flat w-100 black-text">
                            <i class="fa fa-tag fa-3x green-text"></i>
                            <h5 class="font-weight-bold mt-4">Trading</h5>
                            <i class="fa fa-sort-down green-text"></i>
                        </a>
                    </div>
                    <!-- Grid column -->

                </div>
                <!-- Grid row -->
            </div>
        </section>
        <!--End Section: Scroll-by Menu -->

        <div class="container">
            <!--Search Section-->
            <section class="p-3 pl-5 pr-5">
                <!-- Search form -->
                <form class="form-inline d-flex justify-content-center md-form form-sm">
                    <!-- Search form -->
                    <input class="form-control form-control-sm mr-3 w-50" type="text" placeholder="Search" aria-label="Search">
                    <select class="mdb-select md-form">
                        <option value="1">Component</option>
                        <option value="2">Trading</option>
                        <option value="3">Event</option>
                    </select>
                    <div>
                        <button class="btn btn-rounded btn-danger font-weight-bold"><i class="fa fa-search mr-2"
                                aria-hidden="true"></i>Search</button>
                    </div>

                </form>
            </section>
            <!--End Search Section-->
            <!-- Section: Event -->
            <section id="eventSection" class="magazine-section my-5">

                <!-- Section heading -->
                <h2 class="h1-responsive my-5">Hot Event</h2>

                <!-- Grid row -->
                <div class="row">

                    <!-- Grid column -->
                    <div class="col-lg-6 col-md-12">

                        <!-- Featured news -->
                        <div class="single-news mb-lg-0 mb-4">

                            <!-- Image -->
                            <div class="view overlay rounded z-depth-1-half mb-4">
                                <img class="img-fluid" src="https://motogp.hondaracingcorporation.com/wp-content/uploads/sites/3/2018/06/5b31f586be6512.57238759.jpg"
                                    alt="Sample image">
                                <a>
                                    <div class="mask rgba-white-slight"></div>
                                </a>
                            </div>

                            <!-- Excerpt -->
                            <h3 class="font-weight-bold dark-grey-text mb-3">
                                <a>Tên Event</a>
                            </h3>
                            <p class="dark-grey-text mb-lg-0 mb-md-5 mb-4">Description của event dkgdg gdfjhsfgs
                                ksfkdsf sk ksdfkjshdfk ksfhksjdfhkjs ksdf ksk ksdhfkjshd</p>

                            <!-- Date -->
                            <div class="d-flex justify-content-between mt-3">
                                <p class="dark-grey-text"><i class="fa fa-calendar pr-2 text-danger"></i>27/02/2018</p>
                                <p class="dark-grey-text"><i class="fa fa-clock-o pr-2"></i>9:00AM - 13:00PM</p>
                            </div>

                            <!-- Location and Price -->
                            <div class="d-flex justify-content-between">
                                <p class="dark-grey-text"><i class="fa fa-map-marker pr-2 text-primary"></i>TP.HCM</p>
                                <p class="font-weight-bold dark-grey-text"><i class="fa fa-ticket pr-2"></i>100.000 VND</p>
                            </div>

                            <!-- Link -->
                            <div class="d-flex justify-content-end w-100">
                                <a href="#!" class="btn-sm btn-outline-danger text-danger font-weight-bold d-flex justify-content-end">Join
                                    Now</a>
                            </div>

                        </div>
                        <!-- Featured news -->

                    </div>
                    <!-- Grid column -->
                    <!-- Grid column -->
                    <div class="col-lg-6 col-md-12">

                        <!-- Small news -->
                        <div class="single-news mb-4">

                            <!-- Grid row -->
                            <div class="row">

                                <!-- Grid column -->
                                <div class="col-md-6">

                                    <!--Image-->
                                    <div class="view overlay rounded z-depth-1 mb-4">
                                        <img class="img-fluid" src="https://pbs.twimg.com/media/DoVQ0ifXkAI9aIo.jpg"
                                            alt="Sample image">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>

                                </div>
                                <!-- Grid column -->
                                <!-- Grid column -->
                                <div class="col-md-6">

                                    <!-- Excerpt -->
                                    <h4 class="font-weight-bold dark-grey-text">Tên sự kiện</h4>
                                    <div class="d-flex justify-content-between">
                                        <div class="col-11 pl-0">
                                            <a href="#!" class="dark-grey-text">At vero eos et accusamus et iusto odio
                                                dignissimos ducimus qui blanditiis</a>
                                        </div>
                                    </div>

                                </div>
                                <!-- Grid column -->
                                <!-- Date -->
                                <div class="d-flex justify-content-between w-100">
                                    <p class="dark-grey-text"><i class="fa fa-calendar pr-2 text-danger ml-3"></i>27/02/2018</p>
                                    <p class="dark-grey-text"><i class="fa fa-clock-o pr-2"></i>9:00AM - 13:00PM</p>
                                </div>
                                <!-- Location and Price -->
                                <div class="d-flex justify-content-between w-100">
                                    <p class="dark-grey-text"><i class="fa fa-map-marker pr-2 text-primary ml-3"></i>HCM
                                        City</p>
                                    <p class="font-weight-bold dark-grey-text"><i class="fa fa-ticket pr-2"></i>100.000
                                        VND</p>
                                </div>

                                <!-- Link -->
                                <div class="d-flex justify-content-end w-100">
                                    <a href="#!" class="btn-sm btn-outline-danger text-danger font-weight-bold d-flex justify-content-end mb-3">Join
                                        Now</a>
                                </div>

                            </div>
                            <!-- Grid row -->

                        </div>
                        <!-- Small news -->
                        <!-- Small news -->
                        <div class="single-news mb-4">

                            <!-- Grid row -->
                            <div class="row">

                                <!-- Grid column -->
                                <div class="col-md-6">

                                    <!--Image-->
                                    <div class="view overlay rounded z-depth-1 mb-4">
                                        <img class="img-fluid" src="https://mcn-images.bauersecure.com/pagefiles/643159/triumph-765-moto2-03.jpg"
                                            alt="Sample image">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>

                                </div>
                                <!-- Grid column -->
                                <!-- Grid column -->
                                <div class="col-md-6">

                                    <!-- Excerpt -->
                                    <h4 class="font-weight-bold dark-grey-text">Tên sự kiện</h4>
                                    <div class="d-flex justify-content-between">
                                        <div class="col-11 pl-0 mb-3">
                                            <a href="#!" class="dark-grey-text">At vero eos et accusamus et iusto odio
                                                dignissimos ducimus qui blanditiis</a>
                                        </div>
                                    </div>

                                </div>
                                <!-- Grid column -->
                                <!-- Date -->
                                <div class="d-flex justify-content-between w-100">
                                    <p class="dark-grey-text"><i class="fa fa-calendar pr-2 text-danger ml-3"></i>27/02/2018</p>
                                    <p class="dark-grey-text"><i class="fa fa-clock-o pr-2"></i>9:00AM - 13:00PM</p>
                                </div>
                                <!-- Location and Price -->
                                <div class="d-flex justify-content-between w-100">
                                    <p class="dark-grey-text"><i class="fa fa-map-marker pr-2 text-primary ml-3"></i>TP.HCM</p>
                                    <p class="font-weight-bold dark-grey-text"><i class="fa fa-ticket pr-2"></i>100.000
                                        VND</p>
                                </div>

                                <!-- Link -->
                                <div class="d-flex justify-content-end w-100">
                                    <a href="#!" class="btn-sm btn-outline-danger text-danger font-weight-bold d-flex justify-content-end">Join
                                        Now</a>
                                </div>

                            </div>
                            <!-- Grid row -->

                        </div>
                        <!-- Small news -->

                    </div>
                    <!--Grid column-->

                </div>
                <!-- Grid row -->
                <div class="d-flex justify-content-end">
                    <a>
                        <h4 class="text-danger font-weight-bold">More >></h4>
                    </a>
                </div>
            </section>
            <!-- Section: Event -->
            <!-- Section: Component-->
            <section id="componentSection" class="my-5">

                <!-- Section heading -->
                <h2 class="h1-responsive my-5">Component</h2>

                <!-- Grid row -->
                <div class="row">

                    <!-- Grid column -->
                    <div class="col-lg-3 col-md-6 mb-lg-0 mb-4">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://www.customlids.co.uk/images/agv-pista-gp-r-matt-carbon-p5154-26778_image.jpg"
                                    class="img-fluid" alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Helmet
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Grid column -->
                    <!-- Grid column -->
                    <div class="col-lg-3 col-md-6 mb-lg-0 mb-4">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://i.ebayimg.com/images/g/PzkAAOSwOyJX96kz/s-l300.jpg" class="img-fluid"
                                    alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Jacket
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Grid column -->
                    <!-- Grid column -->
                    <div class="col-lg-3 col-md-6 mb-md-0 mb-4">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://www.motorcycleshop.ie/ekmps/shops/motorcycleshop/images/oxford-spartan-starter-gear-pack-helmet-jacket-trousers-and-gloves-[3]-3324-p.jpg"
                                    class="img-fluid" alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Pants
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Grid column -->
                    <!-- Fourth column -->
                    <div class="col-lg-3 col-md-6">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://www.motorcycleshop.ie/ekmps/shops/motorcycleshop/images/oxford-spartan-starter-gear-pack-helmet-jacket-trousers-and-gloves-[3]-3324-p.jpg"
                                    class="img-fluid" alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Pants
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Fourth column -->

                </div>
                <!-- Grid row -->
                <!-- Grid row -->
                <div class="row">

                    <!-- Grid column -->
                    <div class="col-lg-3 col-md-6 mb-lg-0 mb-4">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://www.customlids.co.uk/images/agv-pista-gp-r-matt-carbon-p5154-26778_image.jpg"
                                    class="img-fluid" alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Helmet
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Grid column -->
                    <!-- Grid column -->
                    <div class="col-lg-3 col-md-6 mb-lg-0 mb-4">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://i.ebayimg.com/images/g/PzkAAOSwOyJX96kz/s-l300.jpg" class="img-fluid"
                                    alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Jacket
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Grid column -->
                    <!-- Grid column -->
                    <div class="col-lg-3 col-md-6 mb-md-0 mb-4">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://www.motorcycleshop.ie/ekmps/shops/motorcycleshop/images/oxford-spartan-starter-gear-pack-helmet-jacket-trousers-and-gloves-[3]-3324-p.jpg"
                                    class="img-fluid" alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Pants
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Grid column -->
                    <!-- Fourth column -->
                    <div class="col-lg-3 col-md-6">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://www.motorcycleshop.ie/ekmps/shops/motorcycleshop/images/oxford-spartan-starter-gear-pack-helmet-jacket-trousers-and-gloves-[3]-3324-p.jpg"
                                    class="img-fluid" alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Pants
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Fourth column -->

                </div>
                <!-- Grid row -->
                <!-- Grid row -->
                <div class="row">

                    <!-- Grid column -->
                    <div class="col-lg-3 col-md-6 mb-lg-0 mb-4">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://www.customlids.co.uk/images/agv-pista-gp-r-matt-carbon-p5154-26778_image.jpg"
                                    class="img-fluid" alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Helemt
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Grid column -->
                    <!-- Grid column -->
                    <div class="col-lg-3 col-md-6 mb-lg-0 mb-4">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://i.ebayimg.com/images/g/PzkAAOSwOyJX96kz/s-l300.jpg" class="img-fluid"
                                    alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Jacket
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Grid column -->
                    <!-- Grid column -->
                    <div class="col-lg-3 col-md-6 mb-md-0 mb-4">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://www.motorcycleshop.ie/ekmps/shops/motorcycleshop/images/oxford-spartan-starter-gear-pack-helmet-jacket-trousers-and-gloves-[3]-3324-p.jpg"
                                    class="img-fluid" alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Pants
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Grid column -->
                    <!-- Fourth column -->
                    <div class="col-lg-3 col-md-6">
                        <!-- Collection card -->
                        <div class="card collection-card z-depth-1-half">
                            <!-- Card image -->
                            <div class="view zoom">
                                <img src="https://www.motorcycleshop.ie/ekmps/shops/motorcycleshop/images/oxford-spartan-starter-gear-pack-helmet-jacket-trousers-and-gloves-[3]-3324-p.jpg"
                                    class="img-fluid" alt="">
                                <div class="stripe dark">
                                    <a>
                                        <p>
                                            Pants
                                            <i class="fa fa-angle-right"></i>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <!-- Card image -->
                        </div>
                        <!-- Collection card -->
                    </div>
                    <!-- Fourth column -->

                </div>
                <!-- Grid row -->

            </section>
            <!-- Section: Component -->
            <!-- Section: Trading-->
            <section id="tradingSection" class="my-5">

                <!-- Section heading -->
                <h2 class="h1-responsive my-5">Trading</h2>

                <!--Carousel Wrapper-->
                <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">
                    <!--Slides-->
                    <div class="carousel-inner pb-3" role="listbox">

                        <!--First slide-->
                        <div class="carousel-item active">

                            <div class="col-md-4 ">
                                <!-- Card -->
                                <div class="card card-cascade wider card-ecommerce">
                                    <!-- Card image -->
                                    <div class="view view-cascade overlay">
                                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (55).jpg"
                                            class="card-img-top" alt="sample photo">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <!-- Card image -->
                                    <!-- Card content -->
                                    <div class="card-body card-body-cascade text-center">
                                        <!-- Category & Title -->
                                        <a href="" class="text-muted">
                                            <h5>Helemt</h5>
                                        </a>
                                        <h4 class="card-title">
                                            <strong>
                                                <a href="">Tên Sản Phẩm</a>
                                            </strong>
                                        </h4>
                                        <!-- Description -->
                                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing minima
                                            veniam elit.</p>
                                        <!-- Card footer -->
                                        <div class="card-footer px-1">
                                            <span class="float-left font-weight-bold">
                                                <strong>100.000 VNĐ</strong>
                                            </span>
                                            <span class="float-right">
                                                <a class="" data-toggle="tooltip" data-placement="top" title="Quick Look">
                                                    Details >>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- Card content -->
                                </div>
                                <!-- Card -->
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <!-- Card -->
                                <div class="card card-cascade wider card-ecommerce">
                                    <!-- Card image -->
                                    <div class="view view-cascade overlay">
                                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (55).jpg"
                                            class="card-img-top" alt="sample photo">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <!-- Card image -->
                                    <!-- Card content -->
                                    <div class="card-body card-body-cascade text-center">
                                        <!-- Category & Title -->
                                        <a href="" class="text-muted">
                                            <h5>Mũ Bảo Hiểm</h5>
                                        </a>
                                        <h4 class="card-title">
                                            <strong>
                                                <a href="">Tên Sản Phẩm</a>
                                            </strong>
                                        </h4>
                                        <!-- Description -->
                                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing minima
                                            veniam elit.</p>
                                        <!-- Card footer -->
                                        <div class="card-footer px-1">
                                            <span class="float-left font-weight-bold">
                                                <strong>100.000 VNĐ</strong>
                                            </span>
                                            <span class="float-right">
                                                <a class="" data-toggle="tooltip" data-placement="top" title="Quick Look">
                                                    Details >>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- Card content -->
                                </div>
                                <!-- Card -->
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <!-- Card -->
                                <div class="card card-cascade wider card-ecommerce">
                                    <!-- Card image -->
                                    <div class="view view-cascade overlay">
                                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (55).jpg"
                                            class="card-img-top" alt="sample photo">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <!-- Card image -->
                                    <!-- Card content -->
                                    <div class="card-body card-body-cascade text-center">
                                        <!-- Category & Title -->
                                        <a href="" class="text-muted">
                                            <h5>Mũ Bảo Hiểm</h5>
                                        </a>
                                        <h4 class="card-title">
                                            <strong>
                                                <a href="">Tên Sản Phẩm</a>
                                            </strong>
                                        </h4>
                                        <!-- Description -->
                                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing minima
                                            veniam elit.</p>
                                        <!-- Card footer -->
                                        <div class="card-footer px-1">
                                            <span class="float-left font-weight-bold">
                                                <strong>100.000 VNĐ</strong>
                                            </span>
                                            <span class="float-right">
                                                <a class="" data-toggle="tooltip" data-placement="top" title="Quick Look">
                                                    Details >>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- Card content -->
                                </div>
                                <!-- Card -->
                            </div>

                        </div>
                        <!--/.First slide-->
                        <!--Second slide-->
                        <div class="carousel-item">

                            <div class="col-md-4">
                                <!-- Card -->
                                <div class="card card-cascade wider card-ecommerce">
                                    <!-- Card image -->
                                    <div class="view view-cascade overlay">
                                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (55).jpg"
                                            class="card-img-top" alt="sample photo">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <!-- Card image -->
                                    <!-- Card content -->
                                    <div class="card-body card-body-cascade text-center">
                                        <!-- Category & Title -->
                                        <a href="" class="text-muted">
                                            <h5>Mũ Bảo Hiểm</h5>
                                        </a>
                                        <h4 class="card-title">
                                            <strong>
                                                <a href="">Tên Sản Phẩm</a>
                                            </strong>
                                        </h4>
                                        <!-- Description -->
                                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing minima
                                            veniam elit.</p>
                                        <!-- Card footer -->
                                        <div class="card-footer px-1">
                                            <span class="float-left font-weight-bold">
                                                <strong>100.000 VNĐ</strong>
                                            </span>
                                            <span class="float-right">
                                                <a class="" data-toggle="tooltip" data-placement="top" title="Quick Look">
                                                    Details >>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- Card content -->
                                </div>
                                <!-- Card -->
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <!-- Card -->
                                <div class="card card-cascade wider card-ecommerce">
                                    <!-- Card image -->
                                    <div class="view view-cascade overlay">
                                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (55).jpg"
                                            class="card-img-top" alt="sample photo">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <!-- Card image -->
                                    <!-- Card content -->
                                    <div class="card-body card-body-cascade text-center">
                                        <!-- Category & Title -->
                                        <a href="" class="text-muted">
                                            <h5>Mũ Bảo Hiểm</h5>
                                        </a>
                                        <h4 class="card-title">
                                            <strong>
                                                <a href="">Tên Sản Phẩm</a>
                                            </strong>
                                        </h4>
                                        <!-- Description -->
                                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing minima
                                            veniam elit.</p>
                                        <!-- Card footer -->
                                        <div class="card-footer px-1">
                                            <span class="float-left font-weight-bold">
                                                <strong>100.000 VNĐ</strong>
                                            </span>
                                            <span class="float-right">
                                                <a class="" data-toggle="tooltip" data-placement="top" title="Quick Look">
                                                    Details >>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- Card content -->
                                </div>
                                <!-- Card -->
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <!-- Card -->
                                <div class="card card-cascade wider card-ecommerce">
                                    <!-- Card image -->
                                    <div class="view view-cascade overlay">
                                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (55).jpg"
                                            class="card-img-top" alt="sample photo">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <!-- Card image -->
                                    <!-- Card content -->
                                    <div class="card-body card-body-cascade text-center">
                                        <!-- Category & Title -->
                                        <a href="" class="text-muted">
                                            <h5>Mũ Bảo Hiểm</h5>
                                        </a>
                                        <h4 class="card-title">
                                            <strong>
                                                <a href="">Tên Sản Phẩm</a>
                                            </strong>
                                        </h4>
                                        <!-- Description -->
                                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing minima
                                            veniam elit.</p>
                                        <!-- Card footer -->
                                        <div class="card-footer px-1">
                                            <span class="float-left font-weight-bold">
                                                <strong>100.000 VNĐ</strong>
                                            </span>
                                            <span class="float-right">
                                                <a class="" data-toggle="tooltip" data-placement="top" title="Quick Look">
                                                    Details >>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- Card content -->
                                </div>
                                <!-- Card -->
                            </div>

                        </div>
                        <!--/.Second slide-->
                        <!--Third slide-->
                        <div class="carousel-item">

                            <div class="col-md-4">
                                <!-- Card -->
                                <div class="card card-cascade wider card-ecommerce">
                                    <!-- Card image -->
                                    <div class="view view-cascade overlay">
                                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (55).jpg"
                                            class="card-img-top" alt="sample photo">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <!-- Card image -->
                                    <!-- Card content -->
                                    <div class="card-body card-body-cascade text-center">
                                        <!-- Category & Title -->
                                        <a href="" class="text-muted">
                                            <h5>Mũ Bảo Hiểm</h5>
                                        </a>
                                        <h4 class="card-title">
                                            <strong>
                                                <a href="">Tên Sản Phẩm</a>
                                            </strong>
                                        </h4>
                                        <!-- Description -->
                                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing minima
                                            veniam elit.</p>
                                        <!-- Card footer -->
                                        <div class="card-footer px-1">
                                            <span class="float-left font-weight-bold">
                                                <strong>100.000 VNĐ</strong>
                                            </span>
                                            <span class="float-right">
                                                <a class="" data-toggle="tooltip" data-placement="top" title="Quick Look">
                                                    Details >>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- Card content -->
                                </div>
                                <!-- Card -->
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <!-- Card -->
                                <div class="card card-cascade wider card-ecommerce">
                                    <!-- Card image -->
                                    <div class="view view-cascade overlay">
                                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (55).jpg"
                                            class="card-img-top" alt="sample photo">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <!-- Card image -->
                                    <!-- Card content -->
                                    <div class="card-body card-body-cascade text-center">
                                        <!-- Category & Title -->
                                        <a href="" class="text-muted">
                                            <h5>Mũ Bảo Hiểm</h5>
                                        </a>
                                        <h4 class="card-title">
                                            <strong>
                                                <a href="">Tên Sản Phẩm</a>
                                            </strong>
                                        </h4>
                                        <!-- Description -->
                                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing minima
                                            veniam elit.</p>
                                        <!-- Card footer -->
                                        <div class="card-footer px-1">
                                            <span class="float-left font-weight-bold">
                                                <strong>100.000 VNĐ</strong>
                                            </span>
                                            <span class="float-right">
                                                <a class="" data-toggle="tooltip" data-placement="top" title="Quick Look">
                                                    Details >>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- Card content -->
                                </div>
                                <!-- Card -->
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <!-- Card -->
                                <div class="card card-cascade wider card-ecommerce">
                                    <!-- Card image -->
                                    <div class="view view-cascade overlay">
                                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (55).jpg"
                                            class="card-img-top" alt="sample photo">
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <!-- Card image -->
                                    <!-- Card content -->
                                    <div class="card-body card-body-cascade text-center">
                                        <!-- Category & Title -->
                                        <a href="" class="text-muted">
                                            <h5>Mũ Bảo Hiểm</h5>
                                        </a>
                                        <h4 class="card-title">
                                            <strong>
                                                <a href="">Tên Sản Phẩm</a>
                                            </strong>
                                        </h4>
                                        <!-- Description -->
                                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing minima
                                            veniam elit.</p>
                                        <!-- Card footer -->
                                        <div class="card-footer px-1">
                                            <span class="float-left font-weight-bold">
                                                <strong>100.000 VNĐ</strong>
                                            </span>
                                            <span class="float-right">
                                                <a class="" data-toggle="tooltip" data-placement="top" title="Quick Look">
                                                    Details >>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- Card content -->
                                </div>
                                <!-- Card -->
                            </div>

                        </div>
                        <!--/.Third slide-->

                    </div>
                    <!--/.Slides-->
                    <!--Controls-->
                    <div class="d-flex justify-content-center">
                        <a class="btn-floating btn-sm" href="#multi-item-example" data-slide="prev"><i class="fa fa-chevron-left black-text"></i></a>
                        <a class="btn-floating btn-sm" href="#multi-item-example" data-slide="next"><i class="fa fa-chevron-right black-text"></i></a>
                    </div>
                    <!--/.Controls-->

                </div>
                <!--/.Carousel Wrapper-->
                <!--View More Button-->
                <div class="d-flex justify-content-end">
                    <a>
                        <h4 class="text-danger font-weight-bold">More >></h4>
                    </a>
                </div>

            </section>
            <!-- End Section: Trading-->

        </div>

        <!-- Footer -->
        <footer class="page-footer font-small stylish-color-dark pt-4">

            <!-- Footer Links -->
            <div class="container text-center text-md-left">

                <!-- Grid row -->
                <div class="row">

                    <!-- Grid column -->
                    <div class="col-md-4 mx-auto">

                        <!-- Content -->
                        <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Footer Content</h5>
                        <p>
                            Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor
                            sit amet, consectetur
                            adipisicing elit.
                        </p>

                    </div>
                    <!-- Grid column -->

                    <hr class="clearfix w-100 d-md-none">

                    <!-- Grid column -->
                    <div class="col-md-2 mx-auto">

                        <!-- Links -->
                        <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

                        <ul class="list-unstyled">
                            <li>
                                <a href="#!">Link 1</a>
                            </li>
                            <li>
                                <a href="#!">Link 2</a>
                            </li>
                            <li>
                                <a href="#!">Link 3</a>
                            </li>
                            <li>
                                <a href="#!">Link 4</a>
                            </li>
                        </ul>

                    </div>
                    <!-- Grid column -->

                    <hr class="clearfix w-100 d-md-none">

                    <!-- Grid column -->
                    <div class="col-md-2 mx-auto">

                        <!-- Links -->
                        <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

                        <ul class="list-unstyled">
                            <li>
                                <a href="#!">Link 1</a>
                            </li>
                            <li>
                                <a href="#!">Link 2</a>
                            </li>
                            <li>
                                <a href="#!">Link 3</a>
                            </li>
                            <li>
                                <a href="#!">Link 4</a>
                            </li>
                        </ul>

                    </div>
                    <!-- Grid column -->

                    <hr class="clearfix w-100 d-md-none">

                    <!-- Grid column -->
                    <div class="col-md-2 mx-auto">

                        <!-- Links -->
                        <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

                        <ul class="list-unstyled">
                            <li>
                                <a href="#!">Link 1</a>
                            </li>
                            <li>
                                <a href="#!">Link 2</a>
                            </li>
                            <li>
                                <a href="#!">Link 3</a>
                            </li>
                            <li>
                                <a href="#!">Link 4</a>
                            </li>
                        </ul>

                    </div>
                    <!-- Grid column -->

                </div>
                <!-- Grid row -->

            </div>
            <!-- Footer Links -->

            <hr>

            <!-- Social buttons -->
            <ul class="list-unstyled list-inline text-center">
                <li class="list-inline-item">
                    <a class="btn-floating btn-fb mx-1">
                        <i class="fa fa-facebook"> </i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a class="btn-floating btn-tw mx-1">
                        <i class="fa fa-twitter"> </i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a class="btn-floating btn-gplus mx-1">
                        <i class="fa fa-google-plus"> </i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a class="btn-floating btn-li mx-1">
                        <i class="fa fa-linkedin"> </i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a class="btn-floating btn-dribbble mx-1">
                        <i class="fa fa-dribbble"> </i>
                    </a>
                </li>
            </ul>
            <!-- Social buttons -->
            <!-- Copyright -->
            <div class="footer-copyright text-center py-3">
                © 2018 Copyright
            </div>
            <!-- Copyright -->

        </footer>
        <!-- Footer -->

    </main>
    <jsp:include page="importjs.jsp"/>
</body>

</html>