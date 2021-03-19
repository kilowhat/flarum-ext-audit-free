<?php

namespace Kilowhat\Audit\Providers;

use Flarum\Foundation\AbstractServiceProvider;
use Kilowhat\Audit\Search\AuditSearcher;
use Kilowhat\Audit\Search\Gambits\NoOpFullTextGambit;

class SearchServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        // Workaround for https://github.com/flarum/core/issues/2712
        $this->container->extend('flarum.simple_search.fulltext_gambits', function ($oldFulltextGambits) {
            $oldFulltextGambits[AuditSearcher::class] = NoOpFullTextGambit::class;

            return $oldFulltextGambits;
        });
    }
}
