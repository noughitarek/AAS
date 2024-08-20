<?php

return array(
    array(
        "type" => "link",
        "content" => "Dashboard",
        "active_when" => ["App\Http\Controllers\Admins\DashboardController@index"],
        "route" => "/",
        "icon" => array("type" => "lucide", "content" => "House"),
    ),
    
    array("type" => "divider"),
    array(
        "type" => "link",
        "content" => "Users",
        "active_when" => ["App\Http\Controllers\Admins\UserController#"],
        "route" => "/users",
        "icon" => array("type" => "lucide", "content" => "Users"),
    ),
    array(
        "type" => "link",
        "content" => "Settings",
        "active_when" => ["App\Http\Controllers\Admins\SettingController@index"],
        "section" => "settings",
        "route" => "/settings",
        "icon" => array("type" => "lucide", "content" => "Settings"),
    ),

);