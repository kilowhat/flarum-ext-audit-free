<?php

namespace Kilowhat\Audit;

use Flarum\Extend;
use Flarum\Foundation\Application;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),

    (new Extend\Routes('api'))
        ->get('/kilowhat-audit/logs', 'kilowhat-audit.index', Controllers\AuditIndexController::class),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Middleware('forum'))
        ->add(Middlewares\SetLoggerActor::class),
    (new Extend\Middleware('admin'))
        ->add(Middlewares\SetLoggerActor::class),
    (new Extend\Middleware('api'))
        ->add(Middlewares\SetLoggerActor::class),

    new Extenders\CoreDiscussionEvents(),
    new Extenders\CorePostEvents(),
    new Extenders\CoreUserEvents(),
    new Extenders\FlarumApprovalEvents(),
    new Extenders\FlarumFlagsEvents(),
    new Extenders\FlarumLockEvents(),
    new Extenders\FlarumStickyEvents(),
    new Extenders\FlarumSuspendEvents(),
    new Extenders\FlarumTagsEvents(),

    (new Extend\ServiceProvider())
        ->register(Providers\SearchServiceProvider::class),
];
