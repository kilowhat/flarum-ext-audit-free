<?php

namespace Kilowhat\Audit\Extenders;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Flags\Flag;
use Illuminate\Contracts\Container\Container;
use Kilowhat\Audit\AuditLogger;

class FlarumFlagsEvents implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        Flag::created(function (Flag $flag) {
            AuditLogger::log('post.flagged', [
                'discussion_id' => $flag->post->discussion->id,
                'post_id' => $flag->post->id,
            ]);
        });
    }
}
