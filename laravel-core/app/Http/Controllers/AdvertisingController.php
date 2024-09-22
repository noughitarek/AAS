<?php

namespace App\Http\Controllers;

use DateTime;
use Inertia\Inertia;
use App\Models\Funding;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\FundingAdvertisement;

class AdvertisingController extends Controller
{
    public function index()
    {
        $fundings = Funding::with('createdBy', 'updatedBy', 'investor', 'desk', 'product', 'purchases')->orderBy('id', 'desc')->paginate(10);
        
        foreach($fundings as &$funding){
            $funding->totalAdvertisements = $funding->advertisements->sum('advertisement_amount');
            $firstAdvertisement = $funding->advertisements->sortBy('day')->first();
            $funding->firstAdvertisementAt = $firstAdvertisement ? $firstAdvertisement->day : null;

            $day0 = new DateTime();

            $daym2 = (clone $day0)->modify('-2 days')->format('Y-m-d');
            $daym1 = (clone $day0)->modify('-1 days')->format('Y-m-d');
            $dayp1 = (clone $day0)->modify('+1 days')->format('Y-m-d');
            $dayp2 = (clone $day0)->modify('+2 days')->format('Y-m-d');
            $day0 = $day0->format('Y-m-d');

            $funding->daym2 = FundingAdvertisement::where('funding_id', $funding->id)
            ->where('day', $daym2)
            ->first()
            ->advertisement_amount ?? 0;
            $funding->daym1 = FundingAdvertisement::where('funding_id', $funding->id)
            ->where('day', $daym1)
            ->first()
            ->advertisement_amount ?? 0;
            $funding->day0 = FundingAdvertisement::where('funding_id', $funding->id)
            ->where('day', $day0)
            ->first()
            ->advertisement_amount ?? 0;
            $funding->dayp1 = FundingAdvertisement::where('funding_id', $funding->id)
            ->where('day', $dayp1)
            ->first()
            ->advertisement_amount ?? 0;
            $funding->dayp2 = FundingAdvertisement::where('funding_id', $funding->id)
            ->where('day', $dayp2)
            ->first()
            ->advertisement_amount ?? 0;

        }

        return Inertia::render('Admins/Fundings/Advertisings', [
            'fundings' => $fundings,
        ]);
    }
    public function save(Request $request)
    {
        foreach($request->input('fundings') as $index=>$funding){
            $day0 = new DateTime();

            $daym2 = (clone $day0)->modify('-2 days')->format('Y-m-d');
            $daym1 = (clone $day0)->modify('-1 days')->format('Y-m-d');
            $dayp1 = (clone $day0)->modify('+1 days')->format('Y-m-d');
            $dayp2 = (clone $day0)->modify('+2 days')->format('Y-m-d');
            $day0 = $day0->format('Y-m-d');

            if($funding['daym2'] > 0){
                FundingAdvertisement::updateOrCreate(
                    ['funding_id' => $funding['id'], 'day' => $daym2],
                    ['advertisement_amount' => $funding['daym2']]
                );
            }else{
                FundingAdvertisement::where('funding_id', $funding['id'])->where('day', $daym2)->delete();
            }

            if($funding['daym1'] > 0){
                FundingAdvertisement::updateOrCreate(
                    ['funding_id' => $funding['id'], 'day' => $daym1],
                    ['advertisement_amount' => $funding['daym1']]
                );
            }else{
                FundingAdvertisement::where('funding_id', $funding['id'])->where('day', $daym1)->delete();
            }

            if($funding['day0'] > 0){
                FundingAdvertisement::updateOrCreate(
                    ['funding_id' => $funding['id'], 'day' => $day0],
                    ['advertisement_amount' => $funding['day0']]
                );
            }else{
                FundingAdvertisement::where('funding_id', $funding['id'])->where('day', $day0)->delete();
            }

            if($funding['dayp1'] > 0){
                FundingAdvertisement::updateOrCreate(
                    ['funding_id' => $funding['id'], 'day' => $dayp1],
                    ['advertisement_amount' => $funding['dayp1']]
                );
            }else{
                FundingAdvertisement::where('funding_id', $funding['id'])->where('day', $dayp1)->delete();
            }

            if($funding['dayp2'] > 0){
                FundingAdvertisement::updateOrCreate(
                    ['funding_id' => $funding['id'], 'day' => $dayp2],
                    ['advertisement_amount' => $funding['dayp2']]
                );
            }else{
                FundingAdvertisement::where('funding_id', $funding['id'])->where('day', $dayp2)->delete();
            }
        }
    }
}
