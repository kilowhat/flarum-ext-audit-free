<?php

namespace Kilowhat\Audit\Extenders;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Tags\Event;
use Illuminate\Contracts\Container\Container;
use Illuminate\Support\Arr;
use Kilowhat\Audit\AuditLogger;

class FlarumTagsEvents implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Event\DiscussionWasTagged::class, [$this, 'discussionWasTagged']);
    }

    public function discussionWasTagged(Event\DiscussionWasTagged $event)
    {
        AuditLogger::log('discussion.tagged', [
            'discussion_id' => $event->discussion->id,
            'old_tags' => Arr::pluck($event->oldTags, 'slug'),
            'new_tags' => $event->discussion->tags->pluck('slug'),
        ]);
    }
}
