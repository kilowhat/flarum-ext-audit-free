<?php

namespace Kilowhat\Audit\Search\Gambits;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use Kilowhat\Audit\Search\AuditSearch;
use LogicException;

class ClientGambit extends AbstractRegexGambit
{
    protected $pattern = 'client:(.+)';

    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        if (!$search instanceof AuditSearch) {
            throw new LogicException('This gambit can only be applied on an AuditSearch');
        }

        $clients = explode(',', trim($matches[1], '"'));

        $search->getQuery()->whereIn('client', $clients, 'and', $negate);
    }
}
