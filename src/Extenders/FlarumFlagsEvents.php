<?php

namespace Kilowhat\Audit\Extenders;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Flags\Flag;
use Flarum\Post\Post;
use Illuminate\Contracts\Container\Container;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Kilowhat\Audit\AuditLogger;

class FlarumFlagsEvents implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        Flag::created(function (Flag $flag) {
            // We only log flags created manually via the extension
            // We don't log the creation of Approval/Akismet flags
            if ($flag->type !== 'user') {
                return;
            }

            AuditLogger::log('post.flagged', [
                'discussion_id' => $flag->post->discussion->id,
                'post_id' => $flag->post->id,
                'reason' => $flag->reason ?? ($flag->reason_detail ? 'other' : null),
            ]);
        });

        // We don't use the FlagsWillBeDeleted event as extensions might still prevent deletion at that point
        // Will require changes when https://github.com/flarum/flags/pull/21 is merged
        HasMany::macro('delete', function () {
            /**
             * @var $this HasMany
             */

            // Replicates code from Relation::__call
            $result = $this->forwardCallTo($this->getQuery(), 'delete', func_get_args());

            $parent = $this->getParent();

            // Additional logic for logging
            if ($parent instanceof Post && $this->getQuery()->getModel() instanceof Flag) {
                AuditLogger::log('post.dismissed_flags', [
                    'discussion_id' => $parent->discussion->id,
                    'post_id' => $parent->id,
                ]);
            }

            // Replicates code from Relation::__call
            if ($result === $this->getQuery()) {
                return $this;
            }

            return $result;
        });
    }
}
