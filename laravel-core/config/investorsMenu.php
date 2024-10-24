<?php

return array(
    array(
        "type" => "link",
        "content" => "Dashboard",
        "active_when" => ["App\Http\Controllers\DashboardController@investor_index"],
        "route" => "/investors",
        "icon" => array("type" => "lucide", "content" => "House"),
    ),
    array("type" => "divider"),
    
    
    array("type" => "divider"),
    array(
        "type" => "link",
        "content" => "Settings",
        "active_when" => ["App\Http\Controllers\SettingController@index"],
        "section" => "settings",
        "route" => "/investors/settings",
        "icon" => array("type" => "lucide", "content" => "Settings"),
    ),

);