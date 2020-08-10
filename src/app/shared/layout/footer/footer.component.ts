import { Component, OnInit } from '@angular/core';
import { environment } from '@env';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    appTitle: string;
    appVersion: string;

    ngOnInit(): void {
        this.appTitle = environment.app.title;
        this.appVersion = environment.app.version;
    }
}
