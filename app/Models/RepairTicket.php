<?php

namespace App\Models;

use Database\Factories\RepairTicketFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepairTicket extends Model
{
    /** @use HasFactory<RepairTicketFactory> */
    use HasFactory;

    protected $fillable = [
        'ticket_number',
        'user_id',
        'device_type',
        'device_brand',
        'device_model',
        'serial_number',
        'service_type',
        'problem_description',
        'symptoms',
        'urgency',
        'customer_name',
        'customer_phone',
        'customer_email',
        'customer_address',
        'status',
        'estimated_cost',
        'technician_notes',
        'completed_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'symptoms' => 'array',
            'estimated_cost' => 'decimal:2',
            'completed_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function generateTicketNumber(): string
    {
        $prefix = 'REP-'.date('Ymd');
        $random = strtoupper(substr(uniqid(), -4));

        return "{$prefix}-{$random}";
    }
}
