import app from 'flarum/app';
import Component from 'flarum/Component';
import Badge from 'flarum/components/Badge';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';
import GroupBadge from 'flarum/components/GroupBadge';
import avatar from 'flarum/helpers/avatar';
import humanTime from 'flarum/helpers/humanTime';
import icon from 'flarum/helpers/icon';
import username from 'flarum/helpers/username';
import Group from 'flarum/models/Group';
import extractText from 'flarum/utils/extractText';
import ItemList from 'flarum/utils/ItemList';

/* global m, moment */

const translationPrefix = 'kilowhat-audit.lib.browser.';

function formatGroups(groupIds, emptyIsAdmin = false) {
    let groupIdsCopy = groupIds ? JSON.parse(JSON.stringify(groupIds)) : [];

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

function formatTags(tagSlugs) {
    let tagSlugsCopy = tagSlugs || [];

    return tagSlugsCopy.map((slug, index) => [index > 0 ? ', ' : null, m('code', slug)]);
}

export default class AuditItem extends Component {
    init() {
        super.init();

        this.showRaw = false;
    }

    view() {
        const {log} = this.props;

        const actor = log.actor();
        const payload = log.payload() || {};
        const discussion = log.discussion();
        const post = log.post();
        const tag = log.tag();
        const user = log.user();

        const clientRow = [];

        if (log.ipAddress()) {
            clientRow.push(m('a', {
                onclick: () => {
                    this.props.changeQuery('ip:' + log.ipAddress());
                },
            }, log.ipAddress()));
        }

        if (log.client() !== 'session' && log.client() !== 'cli') {
            clientRow.push(m('a', {
                onclick: () => {
                    this.props.changeQuery('client:' + log.client());
                },
            }, app.translator.trans(translationPrefix + 'client.' + log.client())));
        }

        clientRow.push(humanTime(log.createdAt()));

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
                    this.props.changeQuery('client:cli');
                },
            }, app.translator.trans(translationPrefix + 'client.cli'));
        } else if (log.actorId() === null) {
            usernameElement = m('a', {
                onclick: () => {
                    this.props.changeQuery('actor:guest');
                },
            }, app.translator.trans(translationPrefix + 'withoutActor'));
        } else if (actor) {
            usernameElement = m('a', {
                onclick: () => {
                    this.props.changeQuery('actor:' + actor.username());
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

                tag: m('a', {
                    href: tag ? app.route.tag(tag) : '#',
                }, tag ? tag.name() : app.translator.trans(translationPrefix + 'deletedResource.tag', {
                    id: payload.tag_id,
                })),

                post: m('a', {
                    href: post && post.discussion() ? app.route.post(post) : '#',
                }, post ? (post.contentType() === 'comment' ? 'Comment' : 'Post') : app.translator.trans(translationPrefix + 'deletedResource.post', {
                    id: payload.post_id,
                })),

                postuser: m('a', {
                    href: post && post.user() ? app.route.user(post.user()) : '#',
                }, username(post ? post.user() : null)),

                until: payload.until ? moment(payload.until).format('LLLL') : '?',

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

                old_email: m('code', payload.old_email),
                new_email: m('code', payload.new_email),

                old_tags: formatTags(payload.old_tags),
                new_tags: formatTags(payload.new_tags),

                post_count: payload.post_count,
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
            children: app.translator.trans(translationPrefix + 'controls.' + (this.showRaw ? 'hideRaw' : 'showRaw')),
            onclick: () => {
                this.showRaw = !this.showRaw;
            },
        }));

        if (actor) {
            controls.add('actor', Button.component({
                children: app.translator.trans(translationPrefix + 'controls.filterActor'),
                onclick: () => {
                    this.props.changeQuery('actor:' + actor.username());
                },
            }));
        }

        if (log.ipAddress()) {
            controls.add('ip', Button.component({
                children: app.translator.trans(translationPrefix + 'controls.filterIp'),
                onclick: () => {
                    this.props.changeQuery('ip:' + log.ipAddress());
                },
            }));
        }

        controls.add('client', Button.component({
            children: app.translator.trans(translationPrefix + 'controls.filterClient'),
            onclick: () => {
                this.props.changeQuery('client:' + log.client());
            },
        }));

        controls.add('action', Button.component({
            children: app.translator.trans(translationPrefix + 'controls.filterAction'),
            onclick: () => {
                this.props.changeQuery('action:' + log.action());
            },
        }));

        if (user) {
            controls.add('user', Button.component({
                children: app.translator.trans(translationPrefix + 'controls.filterUser'),
                onclick: () => {
                    this.props.changeQuery('user:' + user.username());
                },
            }));
        }

        if (payload.discussion_id) {
            controls.add('discussion', Button.component({
                children: app.translator.trans(translationPrefix + 'controls.filterDiscussion'),
                onclick: () => {
                    this.props.changeQuery('discussion:' + payload.discussion_id);
                },
            }));
        }

        return m('.AuditItem', [
            m('.AuditItemAvatar', avatarElement),
            m('.AuditItemData', [
                Dropdown.component({
                    children: controls.toArray(),
                    menuClassName: 'Dropdown-menu--right',
                    buttonClassName: 'Button Button--icon Button--flat',
                    label: app.translator.trans(translationPrefix + 'controls'),
                    icon: 'fas fa-ellipsis-v',
                }),
                m('.AuditItemRow', [
                    usernameElement,
                    ' - ',
                    m('a', {
                        onclick: () => {
                            this.props.changeQuery('action:' + log.action());
                        },
                    }, log.action()),
                ]),
                m('.AuditItemRow', formattedPayload),
                m('.AuditItemRow', clientRow.map((text, i) => [i === 0 ? null : ' - ', text])),
            ]),
        ]);
    }
}
