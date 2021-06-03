import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import icon from 'flarum/common/helpers/icon';
import AuditBrowser from '../../common/components/AuditBrowser';

/* global m */

const translationPrefix = 'kilowhat-audit.admin.header.';

export default class AuditPage extends ExtensionPage {
    className() {
        // We need a common class that's identical between free and pro to re-use CSS
        return super.className() + ' AuditPage';
    }

    header() {
        const vdom = super.header();

        vdom[0].children.push(icon('fas fa-book', {
            className: 'AuditBanner',
        }));

        vdom[0].children[0].children[0].children[1].children = [
            m('h2', [
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
        ];

        return vdom;
    }

    content() {
        return m('.AuditPageContainer', m(AuditBrowser));
    }
}
