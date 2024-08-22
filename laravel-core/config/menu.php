<?php

return array(
    array(
        "type" => "link",
        "content" => "Dashboard",
        "active_when" => ["App\Http\Controllers\DashboardController@index"],
        "route" => "/admins",
        "icon" => array("type" => "lucide", "content" => "House"),
    ),
    array("type" => "divider"),
    array(
        "type" => "link",
        "content" => "Desks",
        "active_when" => ["App\Http\Controllers\DeskController#"],
        "route" => "/admins/desks",
        "icon" => array("type" => "lucide", "content" => "Building2"),
    ),
    array(
        "type" => "link",
        "content" => "Delivery Team",
        "active_when" => ["App\Http\Controllers\DeliveryMenController#"],
        "route" => "/admins/delivery-team",
        "icon" => array("type" => "lucide", "content" => "HardHat"),
    ),
    array(
        "type" => "link",
        "content" => "Tracking messages",
        "active_when" => ["App\Http\Controllers\TrackingMessagesController#"],
        "route" => "/admins/tracking-messages",
        "icon" => array("type" => "lucide", "content" => "Crosshair"),
    ),
    array("type" => "divider"),
    array(
        "type" => "link",
        "content" => "Products",
        "active_when" => ["App\Http\Controllers\DashboardController@"],
        "route" => "/",
        "icon" => array("type" => "lucide", "content" => "Package"),
    ),
    array(
        "type" => "link",
        "content" => "Orders",
        "active_when" => ["App\Http\Controllers\DashboardController@"],
        "route" => "/",
        "icon" => array("type" => "lucide", "content" => "ShoppingCart"),
    ),
    array(
        "type" => "link",
        "content" => "Stock",
        "active_when" => ["App\Http\Controllers\DashboardController@"],
        "route" => "/",
        "icon" => array("type" => "lucide", "content" => "Boxes"),
    ),
    
    array("type" => "divider"),
    array(
        "type" => "link",
        "content" => "Investors",
        "active_when" => ["App\Http\Controllers\DashboardController@"],
        "route" => "/",
        "icon" => array("type" => "lucide", "content" => "Briefcase"),
    ),
    array(
        "type" => "link",
        "content" => "Fundings",
        "active_when" => ["App\Http\Controllers\DashboardController@"],
        "route" => "/",
        "icon" => array("type" => "lucide", "content" => "CircleDollarSign"),
    ),
    array(
        "type" => "link",
        "content" => "Advertisings",
        "active_when" => ["App\Http\Controllers\DashboardController@"],
        "route" => "/",
        "icon" => array("type" => "lucide", "content" => "Megaphone"),
    ),
    array(
        "type" => "link",
        "content" => "Invoices",
        "active_when" => ["App\Http\Controllers\DashboardController@"],
        "route" => "/",
        "icon" => array("type" => "lucide", "content" => "ClipboardList"),
    ),
    
    
    array("type" => "divider"),
    array(
        "type" => "link",
        "content" => "Users",
        "active_when" => ["App\Http\Controllers\UserController#"],
        "route" => "/admins/users",
        "icon" => array("type" => "lucide", "content" => "Users"),
    ),
    array(
        "type" => "link",
        "content" => "Settings",
        "active_when" => ["App\Http\Controllers\SettingController@index"],
        "section" => "settings",
        "route" => "/admins/settings",
        "icon" => array("type" => "lucide", "content" => "Settings"),
    ),

);