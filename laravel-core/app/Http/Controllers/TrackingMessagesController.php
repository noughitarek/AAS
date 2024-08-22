<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TrackingMessagesController extends Controller
{
    public function index()
    {
        return Inertia::render('Admins/TrackingMessages/Index', [
            'trackingMessages' => config('settings.tracking_messages')
        ]);
    }
    
    public function save(Request $request)
    {
        foreach($request->all() as $path=>$content)
        {
            $path = "settings-tracking_messages-".$path;
            if($path == "_token") continue;
            $setting = Setting::where('path', $path)->first();
            if(!$setting){
                $setting = Setting::create([
                    'path' => $path,
                    'content' => $content,
                    'created_by' => Auth::id(),
                    'updated_by' => Auth::id(),
                ]);
            }else{
                $setting->update(['content'=>$content]);
            }
        }
        return redirect()->route('admins.trackingMessages.index')->with('success', 'Tracking messages updated successfully.');
    }
}
