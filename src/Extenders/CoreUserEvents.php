<?php

namespace Kilowhat\Audit\Extenders;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\User\Event;
use Flarum\User\LoginProvider;
use Flarum\User\PasswordToken;
use Flarum\User\User;
use Illuminate\Contracts\Container\Container;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Kilowhat\Audit\AuditLogger;

class CoreUserEvents implements ExtenderInterface
{
    protected $originalEmail;

    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Event\Activated::class, [$this, 'activated']);
        $container['events']->listen(Event\AvatarChanged::class, [$this, 'avatarChanged']);
        $container['events']->listen(Event\AvatarSaving::class, [$this, 'avatarSaving']);
        $container['events']->listen(Event\Deleted::class, [$this, 'deleted']);
        $container['events']->listen(Event\EmailChangeRequested::class, [$this, 'emailChangeRequested']);
        $container['events']->listen(Event\EmailChanged::class, [$this, 'emailChanged']);
        $container['events']->listen(Event\GroupsChanged::class, [$this, 'groupsChanged']);
        $container['events']->listen(Event\LoggedIn::class, [$this, 'loggedIn']);
        $container['events']->listen(Event\LoggedOut::class, [$this, 'loggedOut']);
        $container['events']->listen(Event\PasswordChanged::class, [$this, 'passwordChanged']);
        $container['events']->listen(Event\Registered::class, [$this, 'registered']);
        $container['events']->listen(Event\Renamed::class, [$this, 'renamed']);
        $container['events']->listen(Event\Saving::class, [$this, 'saving']);

        PasswordToken::created(function (PasswordToken $token) {
            $this->log($token->user, 'password_change_requested');
        });

        LoginProvider::created(function (LoginProvider $provider) {
            $this->log($provider->user, 'provider_connected', [
                'provider' => $provider->provider,
                'identifier' => $provider->identifier,
            ]);
        });

        LoginProvider::updated(function (LoginProvider $provider) {
            if (Arr::exists($provider->getChanges(), 'last_login_at')) {
                $this->log($provider->user, 'logged_in_with_provider', [
                    'provider' => $provider->provider,
                    'identifier' => $provider->identifier,
                ]);
            }
        });
    }

    protected function log(User $user, string $action, array $payload = [])
    {
        AuditLogger::log("user.$action", array_merge([
            'user_id' => $user->id,
        ], $payload));
    }

    public function activated(Event\Activated $event)
    {
        // Do not log anything when enabled via API on creation or via social login
        if ($event->user->wasRecentlyCreated) {
            return;
        }

        if (Str::startsWith(AuditLogger::$path, '/confirm/')) {
            $this->log($event->user, 'activated_with_email');
        } else {
            $this->log($event->user, 'activated');
        }
    }

    public function avatarChanged(Event\AvatarChanged $event)
    {
        // Do not log anything when avatar is added via API on creation or via social login
        if ($event->user->wasRecentlyCreated) {
            return;
        }

        $this->log($event->user, $event->user->avatar_url ? 'avatar_changed' : 'avatar_removed');
    }

    public function avatarSaving(Event\AvatarSaving $event)
    {
        // Used to work around the missing call to dispatchEventsFor() in UploadAvatarHandler
        // TODO: remove once fixed in Flarum
        $event->user->afterSave(function (User $user) use ($event) {
            $hasSeenAvatarChanged = false;

            foreach ($user->releaseEvents() as $afterSaveEvent) {
                // There's a second issue with Flarum. Even if we dispatch the events, two events get dispatched
                // for AvatarChanged (one when setting it to null, another setting it to something)
                // Both events are identical so it doesn't matter which one we remove. We'll keep the first and ignore any other
                if (get_class($afterSaveEvent) === Event\AvatarChanged::class) {
                    if ($hasSeenAvatarChanged) {
                        continue;
                    }

                    $hasSeenAvatarChanged = true;
                }

                $afterSaveEvent->actor = $event->actor;

                app('events')->dispatch($afterSaveEvent);
            }
        });
    }

    public function deleted(Event\Deleted $event)
    {
        $this->log($event->user, 'deleted');
    }

    public function emailChangeRequested(Event\EmailChangeRequested $event)
    {
        $this->log($event->user, 'email_change_requested', [
            'new_email' => $event->email,
        ]);
    }

    public function emailChanged(Event\EmailChanged $event)
    {
        $this->log($event->user, 'email_changed', [
            'old_email' => $this->originalEmail,
            'new_email' => $event->user->email,
        ]);
    }

    public function groupsChanged(Event\GroupsChanged $event)
    {
        $oldGroupIds = Arr::pluck($event->oldGroups, 'id');
        $newGroupIds = $event->user->groups->pluck('id');

        if (json_encode($oldGroupIds) !== json_encode($newGroupIds)) {
            $this->log($event->user, 'groups_changed', [
                'old_group_ids' => $oldGroupIds,
                'new_group_ids' => $newGroupIds,
            ]);
        }
    }

    public function loggedIn(Event\LoggedIn $event)
    {
        AuditLogger::$actor = $event->user;
        $this->log($event->user, 'logged_in');
    }

    public function loggedOut(Event\LoggedOut $event)
    {
        $this->log($event->user, 'logged_out');
    }

    public function passwordChanged(Event\PasswordChanged $event)
    {
        $this->log($event->user, 'password_changed');
    }

    public function registered(Event\Registered $event)
    {
        $this->log($event->user, 'created');
    }

    public function renamed(Event\Renamed $event)
    {
        $this->log($event->user, 'username_changed', [
            'old_username' => $event->oldUsername,
            'new_username' => $event->user->username,
        ]);
    }

    public function saving(Event\Saving $event)
    {
        // There's no way of accessing the original email from EmailChanged, so we save it beforehand
        $this->originalEmail = $event->user->getOriginal('email');
    }
}
