import app from 'flarum/app';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Placeholder from 'flarum/components/Placeholder';
import AuditItem from './AuditItem';

/* global m */

const translationPrefix = 'kilowhat-audit.lib.browser.';

export default class AuditBrowser extends Component {
    init() {
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
                children: app.translator.trans(translationPrefix + 'loadMore'),
                className: 'Button Button--block',
                onclick: this.loadMore.bind(this),
            });
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
                    children: app.translator.trans(translationPrefix + 'filterApply'),
                }),
            ]),
            this.logs.length === 0 && !this.loading ? Placeholder.component({
                text: app.translator.trans(translationPrefix + 'empty'),
            }) : null,
            m('.AuditList', this.logs.map(log => AuditItem.component({
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

        let q = this.props.baseQ || '';

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

        m.lazyRedraw();

        return results;
    }
}
