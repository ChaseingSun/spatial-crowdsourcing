import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';

import {
    AccountService, AuthServerProvider, CSRFService, HasAnyAuthorityDirective, JhiLoginModalComponent,
    JhiSocialComponent, LoginModalService, LoginService, Principal, SocialService,
    SpacialcrowdsourcingSharedCommonModule, SpacialcrowdsourcingSharedLibsModule, StateStorageService, UserService,
} from './';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgmCoreModule} from "@agm/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        SpacialcrowdsourcingSharedLibsModule,
        SpacialcrowdsourcingSharedCommonModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        /*AgmCoreModule.forRoot({
            apiKey:'AIzaSyAkIG_7Gsl3yqKhoyXuG0yy8BhSxmxCtJ0'
        }),*/
        AgmCoreModule.forRoot({
            libraries:["geometry"],
            apiKey: 'AIzaSyDOF23XN2tAVxQxwJgm-80A78bZ88wlx4g'
        }),

    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        SpacialcrowdsourcingSharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SpacialcrowdsourcingSharedModule {}
