import app from 'flarum/admin/app';

// When we are in the admin panel, the URL route builders for the frontend aren't available
// So we add them if they are missing
export default function () {
    if (!app.route.discussion) {
        app.route.discussion = discussion => {
            return app.forum.attribute('baseUrl') + '/d/' + discussion.slug();
        };
    }
    if (!app.route.post) {
        app.route.post = post => {
            return app.route.discussion(post.discussion()) + '/' + post.number();
        };
    }
    if (!app.route.tag) {
        app.route.tag = tag => {
            return app.forum.attribute('baseUrl') + '/t/' + tag.slug();
        };
    }
    if (!app.route.user) {
        app.route.user = user => {
            return app.forum.attribute('baseUrl') + '/u/' + user.slug();
        };
    }
}
