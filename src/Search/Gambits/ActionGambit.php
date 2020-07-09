<?php

namespace Kilowhat\Audit\Search\Gambits;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use Kilowhat\Audit\Search\AuditSearch;
use LogicException;

class ActionGambit extends AbstractRegexGambit
{
    protected $pattern = 'action:(.+)';

    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        if (!$search instanceof AuditSearch) {
            throw new LogicException('This gambit can only be applied on an AuditSearch');
        }

        $actions = explode(',', trim($matches[1], '"'));

        $search->getQuery()->whereIn('action', $actions, 'and', $negate);
    }
}
