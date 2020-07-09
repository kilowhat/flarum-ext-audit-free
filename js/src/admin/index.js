import app from 'flarum/app';
import AuditLog from '../common/models/AuditLog';
import addForumRoutes from './addForumRoutes';
import addPage from './addPage';

app.initializers.add('kilowhat-audit', () => {
    app.store.models['kilowhat-audit'] = AuditLog;

    addForumRoutes();
    addPage();
});
