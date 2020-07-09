<?php

namespace Kilowhat\Audit\Search\Gambits;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use Kilowhat\Audit\Search\AuditSearch;
use LogicException;

class DiscussionGambit extends AbstractRegexGambit
{
    protected $pattern = 'discussion:(.+)';

    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        if (!$search instanceof AuditSearch) {
            throw new LogicException('This gambit can only be applied on an AuditSearch');
        }

        $ids = array_map(function ($id) {
            return intval($id); // Conversion to int is required for JSON comparison
        }, explode(',', trim($matches[1], '"')));

        $search->getQuery()->whereIn($search->getQuery()->raw('json_extract(payload, "$.discussion_id")'), $ids, 'and', $negate);
    }
}
