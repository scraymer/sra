import { environment } from '@env';
import { Article } from './article';

const PLACEHOLDER = {
    AVATAR: environment.production ? 'https://picsum.photos/40/40?random=' : 'assets/placeholder-avatar.png',
    IMAGE: environment.production ? 'https://picsum.photos/350/200?random=' : 'assets/placeholder-image.png',
    LINK: 'https://en.wikipedia.org/wiki/Foobar'
};

export const ARTICLES: Article[] = [
        { id: '1', subreddit: 'r/helloworld', username: 'u/foobar', link: PLACEHOLDER.LINK, avatar: PLACEHOLDER.AVATAR,
            image: PLACEHOLDER.IMAGE, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '
                + 'tempor incididunt ut labore et dolore magna aliqua.'},
        { id: '2', subreddit: 'r/helloworld', username: 'u/foobar', link: PLACEHOLDER.LINK, avatar: PLACEHOLDER.AVATAR,
            image: PLACEHOLDER.IMAGE, title: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi '
                + 'ut aliquip ex ea commodo consequat.'},
        { id: '3', subreddit: 'r/helloworld', username: 'u/foobar', link: PLACEHOLDER.LINK, avatar: PLACEHOLDER.AVATAR,
            image: PLACEHOLDER.IMAGE, title: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum '
                + 'dolore eu fugiat nulla pariatur.'},
        { id: '4', subreddit: 'r/helloworld', username: 'u/foobar', link: PLACEHOLDER.LINK, avatar: PLACEHOLDER.AVATAR,
            image: PLACEHOLDER.IMAGE, title: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia '
                + 'deserunt mollit anim id est laborum.'},
        { id: '5', subreddit: 'r/helloworld', username: 'u/foobar', link: PLACEHOLDER.LINK, avatar: PLACEHOLDER.AVATAR,
            image: PLACEHOLDER.IMAGE, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '
                + 'tempor incididunt ut labore et dolore magna aliqua.'},
        { id: '6', subreddit: 'r/helloworld', username: 'u/foobar', link: PLACEHOLDER.LINK, avatar: PLACEHOLDER.AVATAR,
            image: PLACEHOLDER.IMAGE, title: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi '
                + 'ut aliquip ex ea commodo consequat.'},
        { id: '7', subreddit: 'r/helloworld', username: 'u/foobar', link: PLACEHOLDER.LINK, avatar: PLACEHOLDER.AVATAR,
            image: PLACEHOLDER.IMAGE, title: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum '
                + 'dolore eu fugiat nulla pariatur.'},
        { id: '8', subreddit: 'r/helloworld', username: 'u/foobar', link: PLACEHOLDER.LINK, avatar: PLACEHOLDER.AVATAR,
            image: PLACEHOLDER.IMAGE, title: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia '
                + 'deserunt mollit anim id est laborum.'},
        { id: '9', subreddit: 'r/helloworld', username: 'u/foobar', link: PLACEHOLDER.LINK, avatar: PLACEHOLDER.AVATAR,
            image: PLACEHOLDER.IMAGE, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '
                + 'tempor incididunt ut labore et dolore magna aliqua.'},
        { id: '10', subreddit: 'r/helloworld', username: 'u/foobar', link: PLACEHOLDER.LINK, avatar: PLACEHOLDER.AVATAR,
            image: PLACEHOLDER.IMAGE, title: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi '
                + 'ut aliquip ex ea commodo consequat.'}
    ];

/**
 * Used to resolve picsum photo urls when in production mode.
 */
class ApplyRandomImage {
    static initialize() {
        if (environment.production) {
            this.resolvePicsumUrls();
        }
    }

    /**
     * Append id value to avatar and image values. This is used to make
     * picsum photo urls unique in production mode only.
     */
    private static resolvePicsumUrls(): void {
        for (const article of ARTICLES) {
            article.avatar = article.avatar + article.id;
            article.image = article.image + article.id;
        }
    }
}
ApplyRandomImage.initialize();
