<?php

namespace Kilowhat\Audit\Search;

use Flarum\Search\ApplySearchParametersTrait;
use Flarum\Search\GambitManager;
use Flarum\Search\SearchCriteria;
use Flarum\Search\SearchResults;
use Kilowhat\Audit\AuditLog;

class AuditSearcher
{
    use ApplySearchParametersTrait;

    protected $gambits;

    public function __construct(GambitManager $gambits)
    {
        $this->gambits = $gambits;
    }

    public function search(SearchCriteria $criteria, $limit = null, $offset = 0, array $load = [])
    {
        $actor = $criteria->actor;

        $query = AuditLog::query();

        // Construct an object which represents this search for users.
        // Apply gambits to it, sort, and paging criteria. Also give extensions
        // an opportunity to modify it.
        $search = new AuditSearch($query->getQuery(), $actor);

        $this->gambits->apply($search, $criteria->query);
        $this->applySort($search, $criteria->sort);
        $this->applyOffset($search, $offset);
        $this->applyLimit($search, $limit + 1);

        // Execute the search query and retrieve the results. We get one more
        // results than the user asked for, so that we can say if there are more
        // results. If there are, we will get rid of that extra result.
        $albums = $query->get();

        if ($areMoreResults = ($limit > 0 && $albums->count() > $limit)) {
            $albums->pop();
        }

        $albums->load($load);

        return new SearchResults($albums, $areMoreResults);
    }
}
