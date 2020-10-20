import Page from 'flarum/components/Page';
import AuditBrowser from '../../common/components/AuditBrowser';
import Header from './Header';

/* global m */

export default class AuditPage extends Page {
    view() {
        return m('.AuditPage', m('.AuditPageContainer', [
            m(Header),
            m(AuditBrowser),
        ]));
    }
}
