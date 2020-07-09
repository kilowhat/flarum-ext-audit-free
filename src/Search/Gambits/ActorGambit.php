<?php

namespace Kilowhat\Audit\Search\Gambits;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use Flarum\User\UserRepository;
use Kilowhat\Audit\Search\AuditSearch;
use LogicException;

class ActorGambit extends AbstractRegexGambit
{
    protected $pattern = 'actor:(.+)';

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

        $rawUsernames = trim($matches[1], '"');

        if ($rawUsernames === 'guest') {
            $search->getQuery()->whereNull('actor_id', 'and', $negate);
        } else {
            $usernames = explode(',', $rawUsernames);

            $ids = [];
            foreach ($usernames as $username) {
                $ids[] = $this->users->getIdForUsername($username);
            }

            $search->getQuery()->whereIn('actor_id', $ids, 'and', $negate);
        }
    }
}
