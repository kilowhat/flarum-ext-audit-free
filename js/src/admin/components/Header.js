import app from 'flarum/app';
import Component from 'flarum/Component';
import icon from 'flarum/helpers/icon';

/* global m */

const translationPrefix = 'kilowhat-audit.admin.header.';

export default class Header extends Component {
    view() {
        return m('.AuditHeader', [
            icon('fas fa-book', {
                className: 'AuditBanner',
            }),
            m('h1', [
                app.translator.trans(translationPrefix + 'title'),
                m('span.badge', app.translator.trans(translationPrefix + 'free')),
                m('a.AuditUpgrade', {
                    target: '_blank',
                    href: 'https://kilowhat.net/flarum/extensions/audit',
                }, [
                    icon('fas fa-rocket'),
                    ' ',
                    app.translator.trans(translationPrefix + 'upgrade'),
                ]),
            ]),
            m('ul', [
                m('li', m('a', {
                    target: '_blank',
                    href: 'https://kilowhat.net/flarum/extensions/audit',
                }, [
                    app.translator.trans(translationPrefix + 'documentation'),
                    ' ',
                    icon('fas fa-external-link-alt'),
                ])),
                m('li', m('a', {
                    target: '_blank',
                    href: 'https://discuss.flarum.org/d/24432',
                }, [
                    app.translator.trans(translationPrefix + 'discuss'),
                    ' ',
                    icon('fas fa-external-link-alt'),
                ])),
                m('li', app.translator.trans(translationPrefix + 'version', {
                    version: app.data.extensions['kilowhat-audit-free'].version,
                })),
            ]),
        ]);
    }
}
