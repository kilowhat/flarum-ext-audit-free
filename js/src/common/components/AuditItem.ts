import {ClassComponent, Vnode} from 'mithril';
import app from 'flarum/common/app';
import Badge from 'flarum/common/components/Badge';
import Button from 'flarum/common/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';
import GroupBadge from 'flarum/common/components/GroupBadge';
import avatar from 'flarum/common/helpers/avatar';
import humanTime from 'flarum/common/helpers/humanTime';
import icon from 'flarum/common/helpers/icon';
import username from 'flarum/common/helpers/username';
import Group from 'flarum/common/models/Group';
import extractText from 'flarum/common/utils/extractText';
import ItemList from 'flarum/common/utils/ItemList';
import AuditLog from '../models/AuditLog';

const translationPrefix = 'kilowhat-audit.lib.browser.';

function formatGroups(groupIds: string[] | null | undefined, emptyIsAdmin = false) {
    let groupIdsCopy: string[] = groupIds ? JSON.parse(JSON.stringify(groupIds)) : [];

    if (!groupIdsCopy.length) {
        if (emptyIsAdmin) {
            groupIdsCopy.push(Group.ADMINISTRATOR_ID);
        } else {
            return m('em', app.translator.trans(translationPrefix + 'noValue'));
        }
    }

    return groupIdsCopy.map(groupId => {
        if (groupId + '' === Group.GUEST_ID) {
            return Badge.component({
                icon: 'fas fa-globe',
                label: app.translator.trans(translationPrefix + 'permissionGroup.everyone'),
            });
        }

        if (groupId + '' === Group.MEMBER_ID) {
            return Badge.component({
                icon: 'fas fa-user',
                label: app.translator.trans(translationPrefix + 'permissionGroup.members'),
            });
        }

        const group = app.store.getById('groups', groupId);

        if (group) {
            return GroupBadge.component({
                group,
            });
        }

        return Badge.component({
            icon: 'fas fa-question',
            label: extractText(app.translator.trans(translationPrefix + 'deletedResource.group', {
                id: groupId,
            })),
        });
    }).map((vnode, index) => [index > 0 ? ', ' : null, vnode]);
}

function formatTags(tagSlugs: string[] | null | undefined) {
    let tagSlugsCopy = tagSlugs || [];

    return tagSlugsCopy.map((slug, index) => [index > 0 ? ', ' : null, m('code', slug)]);
}

interface AuditItemAttrs {
    log: AuditLog
    changeQuery: (q: string) => void
}

export default class AuditItem implements ClassComponent<AuditItemAttrs> {
    showRaw: boolean = false

    view(vnode: Vnode<AuditItemAttrs>) {
        const {log, changeQuery} = vnode.attrs;

        const actor = log.actor();
        const payload = log.payload() || {};
        const discussion = log.discussion();
        const newDiscussion = log.newDiscussion();
        const post = log.post();
        const tag = log.tag();
        const user = log.user();

        const clientRow = [];

        if (log.ipAddress()) {
            clientRow.push(m('a', {
                onclick: () => {
                    changeQuery('ip:' + log.ipAddress());
                },
            }, log.ipAddress()));
        }

        if (log.client() !== 'session' && log.client() !== 'cli') {
            clientRow.push(m('a', {
                onclick: () => {
                    changeQuery('client:' + log.client());
                },
            }, app.translator.trans(translationPrefix + 'client.' + log.client())));
        }

        clientRow.push(humanTime(log.createdAt()!));

        let avatarElement;

        if (log.client() === 'cli') {
            avatarElement = icon('fas fa-terminal');
        } else if (log.actorId() === null) {
            avatarElement = icon('fas fa-user-secret');
        } else if (actor) {
            avatarElement = m('a', {
                href: actor ? app.route.user(actor) : '#',
            }, avatar(actor));
        } else {
            // In this case actorId isn't null but actor is, which means the user was deleted
            avatarElement = avatar(null);
        }

        let usernameElement;

        if (log.client() === 'cli') {
            usernameElement = m('a', {
                onclick: () => {
                    changeQuery('client:cli');
                },
            }, app.translator.trans(translationPrefix + 'client.cli'));
        } else if (log.actorId() === null) {
            usernameElement = m('a', {
                onclick: () => {
                    changeQuery('actor:guest');
                },
            }, app.translator.trans(translationPrefix + 'withoutActor'));
        } else if (actor) {
            usernameElement = m('a', {
                onclick: () => {
                    changeQuery('actor:' + actor.username());
                },
            }, username(actor));
        } else {
            // In this case actorId isn't null but actor is, which means the user was deleted
            usernameElement = username(actor);
        }

        let formattedPayload;

        let translationKeyForPayload = translationPrefix + log.action();

        if (log.action() === 'setting_changed' && payload.hasOwnProperty('new_value')) {
            translationKeyForPayload = translationPrefix + 'setting_changed_with_values';
        }

        if (typeof app.translator.translations[translationKeyForPayload] === 'string') {
            const parameters = {
                // We can't call this translation parameter {user} because it's reserved by Flarum
                username: m('a', {
                    href: user ? app.route.user(user) : '#',
                }, user ? username(user) : app.translator.trans(translationPrefix + 'deletedResource.user', {
                    id: payload.user_id,
                })),

                discussion: m('a', {
                    href: discussion ? app.route.discussion(discussion) : '#',
                }, discussion ? discussion.title() : app.translator.trans(translationPrefix + 'deletedResource.discussion', {
                    id: payload.discussion_id,
                })),

                new_discussion: m('a', {
                    href: newDiscussion ? app.route.discussion(newDiscussion) : '#',
                }, newDiscussion ? newDiscussion.title() : app.translator.trans(translationPrefix + 'deletedResource.discussion', {
                    id: payload.new_discussion_id,
                })),

                tag: m('a', {
                    href: tag ? app.route.tag(tag) : '#',
                }, tag ? tag.name() : app.translator.trans(translationPrefix + 'deletedResource.tag', {
                    id: payload.tag_id,
                })),

                post: m('a', {
                    href: post && post.discussion() ? app.route.post(post) : '#',
                }, post ? app.translator.trans(translationPrefix + 'genericResource.' + (post.contentType() === 'comment' ? 'comment' : 'post')) : app.translator.trans(translationPrefix + 'deletedResource.post', {
                    id: payload.post_id,
                })),

                postuser: m('a', {
                    href: post && post.user() ? app.route.user(post.user()) : '#',
                }, username(post ? post.user() : null)),

                until: payload.until ? dayjs(payload.until).format('LLLL') : '?',

                old_title: m('em', payload.old_title),

                new_title: payload.new_title && discussion ? m('a', {
                    href: app.route.discussion(discussion),
                }, payload.new_title) : payload.new_title,

                package: m('code', payload.package),
                provider: m('code', payload.provider),
                ip: m('code', payload.ip),

                key: m('code', payload.key),
                permission: m('code', payload.permission),
                old_value: payload.old_value ? m('code', payload.old_value) : m('em', app.translator.trans(translationPrefix + 'noValue')),
                new_value: payload.new_value ? m('code', payload.new_value) : m('em', app.translator.trans(translationPrefix + 'noValue')),

                old_groups: formatGroups(payload.old_group_ids, log.action() === 'permission_changed'),
                new_groups: formatGroups(payload.new_group_ids, log.action() === 'permission_changed'),

                old_username: m('code', payload.old_username),
                new_username: m('code', payload.new_username),

                old_nickname: payload.old_nickname ? m('code', payload.old_nickname) : m('em', app.translator.trans(translationPrefix + 'noValue')),
                new_nickname: payload.new_nickname ? m('code', payload.new_nickname) : m('em', app.translator.trans(translationPrefix + 'noValue')),

                old_email: m('code', payload.old_email),
                new_email: m('code', payload.new_email),

                old_tags: formatTags(payload.old_tags),
                new_tags: formatTags(payload.new_tags),

                original_discussion_ids_count: Array.isArray(payload.original_discussion_ids) ? payload.original_discussion_ids.length : m('em', app.translator.trans(translationPrefix + 'noValue')),
                post_count: payload.post_count,

                old_user: payload.old_user_id ? app.translator.trans(translationPrefix + 'deletedResource.user', {
                    id: payload.old_user_id,
                }) : m('em', app.translator.trans(translationPrefix + 'noValue')),
                new_user: payload.new_user_id ? app.translator.trans(translationPrefix + 'deletedResource.user', {
                    id: payload.new_user_id,
                }) : m('em', app.translator.trans(translationPrefix + 'noValue')),

                old_date: payload.old_date ? dayjs(payload.old_date).format('LLLL') : m('em', app.translator.trans(translationPrefix + 'noValue')),
                new_date: payload.new_date ? dayjs(payload.new_date).format('LLLL') : m('em', app.translator.trans(translationPrefix + 'noValue')),

                reason: payload.reason ? m('code', payload.reason) : m('em', app.translator.trans(translationPrefix + 'noReason')),

                deleted_count: payload.deleted_count,
            };

            formattedPayload = app.translator.trans(translationKeyForPayload, parameters);

            if (this.showRaw) {
                formattedPayload = [formattedPayload, m('pre', JSON.stringify(payload, null, 2))];
            }
        } else {
            formattedPayload = JSON.stringify(payload);
        }

        const controls = new ItemList();

        controls.add('raw', Button.component({
            onclick: () => {
                this.showRaw = !this.showRaw;
            },
        }, app.translator.trans(translationPrefix + 'controls.' + (this.showRaw ? 'hideRaw' : 'showRaw'))));

        if (actor) {
            controls.add('actor', Button.component({
                onclick: () => {
                    changeQuery('actor:' + actor.username());
                },
            }, app.translator.trans(translationPrefix + 'controls.filterActor')));
        }

        if (log.ipAddress()) {
            controls.add('ip', Button.component({
                onclick: () => {
                    changeQuery('ip:' + log.ipAddress());
                },
            }, app.translator.trans(translationPrefix + 'controls.filterIp')));
        }

        controls.add('client', Button.component({
            onclick: () => {
                changeQuery('client:' + log.client());
            },
        }, app.translator.trans(translationPrefix + 'controls.filterClient')));

        controls.add('action', Button.component({
            onclick: () => {
                changeQuery('action:' + log.action());
            },
        }, app.translator.trans(translationPrefix + 'controls.filterAction')));

        if (user) {
            controls.add('user', Button.component({
                onclick: () => {
                    changeQuery('user:' + user.username());
                },
            }, app.translator.trans(translationPrefix + 'controls.filterUser')));
        }

        if (payload.discussion_id) {
            controls.add('discussion', Button.component({
                onclick: () => {
                    changeQuery('discussion:' + payload.discussion_id);
                },
            }, app.translator.trans(translationPrefix + 'controls.filterDiscussion')));
        }

        return m('.AuditItem', [
            m('.AuditItemAvatar', avatarElement),
            m('.AuditItemData', [
                Dropdown.component({
                    menuClassName: 'Dropdown-menu--right',
                    buttonClassName: 'Button Button--icon Button--flat',
                    label: app.translator.trans(translationPrefix + 'controls'),
                    icon: 'fas fa-ellipsis-v',
                }, controls.toArray()),
                m('.AuditItemRow', [
                    usernameElement,
                    ' - ',
                    m('a', {
                        onclick: () => {
                            changeQuery('action:' + log.action());
                        },
                    }, log.action()),
                ]),
                m('.AuditItemRow', formattedPayload),
                m('.AuditItemRow', clientRow.map((text, i) => [i === 0 ? null : ' - ', text])),
            ]),
        ]);
    }
}
