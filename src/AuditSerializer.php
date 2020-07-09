<?php

namespace Kilowhat\Audit;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicDiscussionSerializer;
use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Tags\Api\Serializer\TagSerializer;

class AuditSerializer extends AbstractSerializer
{
    protected $type = 'kilowhat-audit';

    /**
     * @param AuditLog $log
     * @return array
     */
    protected function getDefaultAttributes($log)
    {
        return [
            'actorId' => $log->actor_id,
            'client' => $log->client,
            'ipAddress' => $log->ip_address,
            'action' => $log->action,
            'payload' => $log->payload,
            'createdAt' => $this->formatDate($log->created_at),
        ];
    }

    public function actor($log)
    {
        return $this->hasOne($log, BasicUserSerializer::class);
    }

    public function discussion($log)
    {
        return $this->hasOne($log, BasicDiscussionSerializer::class);
    }

    public function post($log)
    {
        return $this->hasOne($log, BasicPostSerializer::class);
    }

    public function tag($log)
    {
        return $this->hasOne($log, TagSerializer::class);
    }

    public function user($log)
    {
        return $this->hasOne($log, BasicUserSerializer::class);
    }
}
