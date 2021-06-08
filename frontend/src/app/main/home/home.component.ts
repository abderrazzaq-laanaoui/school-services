import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import * as shape from "d3-shape";
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import { fuseAnimations } from "@fuse/animations";
import {navigation} from 'app/navigation/navigation';
import { ProjectDashboardService } from "./home.service";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";

@Component({
    selector: "project-dashboard",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProjectDashboardComponent implements OnInit {
    projects: any[];
    selectedProject: any;

    widgets: any;
    widget7: any = {};
    navigation: any;
    dateNow = Date.now();

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: ProjectDashboardService,
        private _fuseNavigationService: FuseNavigationService,

    ) {
        /**
         * Widget 5
         */
        this.widget7 = {
            currentRange: "T",
        };
    
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.projects = this._projectDashboardService.projects;
        this.widgets = this._projectDashboardService.widgets;
            // Get default navigation
            this.navigation = navigation;

            // Register the navigation to the service
            this._fuseNavigationService.register('main', this.navigation);
    
            // Set the main navigation as our current navigation
            this._fuseNavigationService.setCurrentNavigation('main');
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
