<?php

namespace Kilowhat\Audit\Providers;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Search\GambitManager;
use Illuminate\Contracts\Container\Container;
use Kilowhat\Audit\Search\AuditSearcher;
use Kilowhat\Audit\Search\Gambits;

class SearchServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->app->when(AuditSearcher::class)
            ->needs(GambitManager::class)
            ->give(function (Container $app) {
                $gambits = new GambitManager($app);

                $gambits->add(Gambits\ActionGambit::class);
                $gambits->add(Gambits\ActorGambit::class);
                $gambits->add(Gambits\ClientGambit::class);
                $gambits->add(Gambits\DiscussionGambit::class);
                $gambits->add(Gambits\IpGambit::class);
                $gambits->add(Gambits\UserGambit::class);

                return $gambits;
            });
    }
}
