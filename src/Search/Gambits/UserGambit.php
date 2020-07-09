<?php

namespace Kilowhat\Audit\Search\Gambits;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use Flarum\User\UserRepository;
use Kilowhat\Audit\Search\AuditSearch;
use LogicException;

class UserGambit extends AbstractRegexGambit
{
    protected $pattern = 'user:(.+)';

    protected $users;

    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        if (!$search instanceof AuditSearch) {
            throw new LogicException('This gambit can only be applied on an AuditSearch');
        }

        $usernames = explode(',', trim($matches[1], '"'));

        $ids = [];
        foreach ($usernames as $username) {
            $ids[] = $this->users->getIdForUsername($username);
        }

        $search->getQuery()->whereIn($search->getQuery()->raw('json_extract(payload, "$.user_id")'), $ids, 'and', $negate);
    }
}
