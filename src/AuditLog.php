<?php

namespace Kilowhat\Audit;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\User\User;
use Illuminate\Support\Arr;

/**
 * @property int $id
 * @property int $actor_id
 * @property string $client
 * @property string $ip_address
 * @property string $action
 * @property array $payload
 * @property Carbon $created_at
 */
class AuditLog extends AbstractModel
{
    protected $table = 'kilowhat_audit_log';

    public $timestamps = false;

    protected $casts = [
        'payload' => 'array',
        'created_at' => 'datetime',
    ];

    public function actor()
    {
        return $this->belongsTo(User::class);
    }

    public function getDiscussionAttribute()
    {
        $discussionId = Arr::get($this->payload, 'discussion_id');

        return $discussionId ? Discussion::query()->find($discussionId) : null;
    }

    public function getPostAttribute()
    {
        $postId = Arr::get($this->payload, 'post_id');

        return $postId ? Post::query()->find($postId) : null;
    }

    public function getTagAttribute()
    {
        $tagId = Arr::get($this->payload, 'tag_id');

        return $tagId ? Tag::query()->find($tagId) : null;
    }

    public function getUserAttribute()
    {
        $userId = Arr::get($this->payload, 'user_id');

        return $userId ? User::query()->find($userId) : null;
    }
}
