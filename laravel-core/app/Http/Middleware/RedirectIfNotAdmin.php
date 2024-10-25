<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfNotAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $guard = 'web'): Response
    {
        $routename = $guard=="web"?'admins.login':'investors.login';
        if (!Auth::guard($guard)->check()) {
            return redirect()->route($routename);
        }
        return $next($request);
    }
}
