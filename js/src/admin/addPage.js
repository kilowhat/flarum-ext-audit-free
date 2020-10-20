import {extend} from 'flarum/extend';
import app from 'flarum/app';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import AdminNav from 'flarum/components/AdminNav';
import AuditPage from './components/AuditPage';

/* global m */

export default function () {
    app.routes['kilowhat-audit'] = {
        path: '/audit',
        component: AuditPage,
    };

    app.extensionSettings['kilowhat-audit-free'] = () => m.route.set(app.route('kilowhat-audit'));

    extend(AdminNav.prototype, 'items', items => {
        items.add('kilowhat-audit', AdminLinkButton.component({
            href: app.route('kilowhat-audit'),
            icon: 'fas fa-book',
            description: app.translator.trans('kilowhat-audit.admin.menu.description'),
        }, app.translator.trans('kilowhat-audit.admin.menu.title')));
    });
}
