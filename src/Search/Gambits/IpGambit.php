<?php

namespace Kilowhat\Audit\Search\Gambits;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use Kilowhat\Audit\Search\AuditSearch;
use LogicException;

class IpGambit extends AbstractRegexGambit
{
    protected $pattern = 'ip:(.+)';

    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        if (!$search instanceof AuditSearch) {
            throw new LogicException('This gambit can only be applied on an AuditSearch');
        }

        $ipAddresses = explode(',', trim($matches[1], '"'));

        $search->getQuery()->whereIn('ip_address', $ipAddresses, 'and', $negate);
    }
}
