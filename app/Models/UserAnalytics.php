<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAnalytics extends Model
{
    protected $fillable = [
        'user_id',
        'total_quotes',
        'total_tracked',
        'total_shipped',
    ];

    public function track_quote($user_id)
    {
        $oldAnalytics = $this->where('user_id', $user_id)->first();
        if (!$oldAnalytics) {
            $this->create([
                'user_id' => $user_id,
                'total_quotes' => 1,
                'total_tracked' => 0,
                'total_shipped' => 0,
            ]);

            return;
        }
        $this->where('user_id', $user_id)->update([
            'total_quotes' => $oldAnalytics->total_quotes + 1,
        ]);
    }

    public function track_shipped($user_id)
    {
        $oldAnalytics = $this->where('user_id', $user_id)->first();
        if (!$oldAnalytics) {
            $this->create([
                'user_id' => $user_id,
                'total_quotes' => 0,
                'total_tracked' => 0,
                'total_shipped' => 1,
            ]);

            return;
        }
        $this->where('user_id', $user_id)->update([
            'total_shipped' => $oldAnalytics->total_shipped + 1,
        ]);
    }

    public function track_tracked($user_id)
    {
        $oldAnalytics = $this->where('user_id', $user_id)->first();
        if (!$oldAnalytics) {
            $this->create([
                'user_id' => $user_id,
                'total_quotes' => 0,
                'total_tracked' => 1,
                'total_shipped' => 0,
            ]);

            return;
        }
        $this->where('user_id', $user_id)->update([
            'total_tracked' => $oldAnalytics->total_tracked + 1,
        ]);
    }
}
