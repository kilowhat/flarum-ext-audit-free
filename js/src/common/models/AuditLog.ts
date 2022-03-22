import Model from 'flarum/common/Model';

export default class AuditLog extends Model {
    actorId = Model.attribute('actorId');
    client = Model.attribute('client');
    ipAddress = Model.attribute('ipAddress');
    action = Model.attribute('action');
    payload = Model.attribute('payload');
    createdAt = Model.attribute('createdAt', Model.transformDate);

    actor = Model.hasOne('actor');
    discussion = Model.hasOne('discussion');
    post = Model.hasOne('post');
    tag = Model.hasOne('tag');
    user = Model.hasOne('user');
}
