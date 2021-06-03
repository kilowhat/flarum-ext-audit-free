import app from 'flarum/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import AuditItem from './AuditItem';

/* global m */

const translationPrefix = 'kilowhat-audit.lib.browser.';

export default class AuditBrowser extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.q = '';
        this.loading = true;
        this.moreResults = false;
        this.logs = [];

        this.refresh();
    }

    view() {
        let loading;

        if (this.loading) {
            loading = LoadingIndicator.component();
        } else if (this.moreResults) {
            loading = Button.component({
                className: 'Button Button--block',
                onclick: this.loadMore.bind(this),
            }, app.translator.trans(translationPrefix + 'loadMore'));
        }

        return m('div', [
            m('.AuditSearch', [
                m('.AuditSearchWrapper', [
                    m('input.FormControl', {
                        value: this.q,
                        onchange: event => {
                            this.q = event.target.value;
                        },
                        placeholder: app.translator.trans(translationPrefix + 'filterPlaceholder'),
                    }),
                    this.q ? Button.component({
                        className: 'Search-clear Button Button--icon Button--link',
                        onclick: () => {
                            this.q = '';
                            this.refresh();
                        },
                        icon: 'fas fa-times-circle',
                    }) : null,
                ]),
                Button.component({
                    className: 'Button',
                    onclick: () => {
                        this.refresh();
                    },
                }, app.translator.trans(translationPrefix + 'filterApply')),
            ]),
            this.logs.length === 0 && !this.loading ? Placeholder.component({
                text: app.translator.trans(translationPrefix + 'empty'),
            }) : null,
            m('.AuditList', this.logs.map(log => m(AuditItem, {
                log,
                changeQuery: q => {
                    this.q = q;
                    this.refresh();
                },
            }))),
            m('.AuditMore', loading),
        ]);
    }

    requestParams() {
        const params = {filter: {}};

        let q = this.attrs.baseQ || '';

        if (this.q) {
            q += ' ' + this.q;
        }

        if (q) {
            params.filter.q = q.trim();
        }

        return params;
    }

    refresh(clear = true) {
        if (clear) {
            this.loading = true;
            this.logs = [];
        }

        return this.loadResults().then(
            results => {
                this.logs = [];
                this.parseResults(results);
            },
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }

    loadResults(offset) {
        const params = this.requestParams();
        params.page = {offset};

        return app.store.find('kilowhat-audit/logs', params);
    }

    loadMore() {
        this.loading = true;

        this.loadResults(this.logs.length)
            .then(this.parseResults.bind(this));
    }

    parseResults(results) {
        [].push.apply(this.logs, results);

        this.loading = false;
        this.moreResults = !!results.payload.links.next;

        m.redraw();

        return results;
    }
}
