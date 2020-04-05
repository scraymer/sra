/**
 * Temporary schema for an article. Will need to expand on specific
 * details such as username to user id and name.
 */
export interface Article {
    id: number;
    title: string;
    subreddit: string;
    username: string;
    link: string;
    avatar: string;
    image: string;
}
