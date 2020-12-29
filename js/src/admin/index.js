import app from 'flarum/app';
import AuditLog from '../common/models/AuditLog';
import AuditPage from './components/AuditPage';
import addForumRoutes from './addForumRoutes';

app.initializers.add('kilowhat-audit', () => {
    app.store.models['kilowhat-audit'] = AuditLog;

    addForumRoutes();

    app.extensionData
        .for('kilowhat-audit-free')
        .registerPage(AuditPage);
});
