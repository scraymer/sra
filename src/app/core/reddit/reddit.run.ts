import { RedditService } from './reddit.service';

/**
 * Used to initialize the reddit service on bootstrap.
 */
export function onAppInit(redditService: RedditService): () => Promise<any> {
    return redditService.initialize;
}
