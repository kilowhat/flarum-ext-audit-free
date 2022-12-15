import app from 'flarum/common/app';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import {ApiResponsePlural} from 'flarum/common/Store';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import AuditItem from './AuditItem';
import AuditLog from '../models/AuditLog';

const translationPrefix = 'kilowhat-audit.lib.browser.';

interface AuditBrowserAttrs extends ComponentAttrs {
    baseQ?: string
}

export default class AuditBrowser extends Component<AuditBrowserAttrs> {
    q: string = ''
    loading: boolean = true
    moreResults: boolean = false
    logs: AuditLog[] = []

    oninit(vnode: any) {
        super.oninit(vnode);

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
                        onchange: (event: InputEvent) => {
                            this.q = (event.target as HTMLInputElement).value;
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
                changeQuery: (q: string) => {
                    this.q = q;
                    this.refresh();
                },
            }))),
            m('.AuditMore', loading),
        ]);
    }

    requestParams(): any {
        const params: any = {filter: {}};

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

    loadResults(offset: number | undefined = undefined) {
        const params = this.requestParams();
        params.page = {offset};

        return app.store.find<AuditLog[]>('kilowhat-audit/logs', params);
    }

    loadMore() {
        this.loading = true;

        this.loadResults(this.logs.length)
            .then(this.parseResults.bind(this));
    }

    parseResults(results: ApiResponsePlural<AuditLog>) {
        [].push.apply(this.logs, results as any);

        this.loading = false;
        this.moreResults = !!results.payload.links?.next;

        m.redraw();

        return results;
    }
}
