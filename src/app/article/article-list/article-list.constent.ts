import { MatSnackBarConfig } from '@angular/material/snack-bar';

export class ArticleListConstent {

    /**
     * Images used to populate card content.
     */
    static readonly IMG_CONSTRUCTION = {
        DARK: 'assets/under-construction-dark.jpg',
        LIGHT: 'assets/under-construction-light.jpg'
    };

    /**
     * Configuration options for the shared message.
     */
    static readonly SHARE_LINK_SNACKBAR_OPTIONS: MatSnackBarConfig = {
        duration: 1500
    };
}
