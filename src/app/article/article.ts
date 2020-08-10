import { ArticleSort } from './article.enum';

/**
 * Temporary schema for an article. Will need to expand on specific
 * details such as username to user id and name.
 */
export interface Article {
    id: string;
    name: string;
    title: string;
    subreddit: string;
    username: string;
    link: string;
    comments: string;
    avatar: string;
    image: string;
}

export interface ArticleOptions {
    sort: ArticleSort;
    subreddit?: string;
    pagination?: ArticlePagination;
}

/**
 * Article pagination schema that can be generalize elsewhere.
 */
export interface ArticlePagination {
    after?: string;
    before?: string;
    page: number;
}
