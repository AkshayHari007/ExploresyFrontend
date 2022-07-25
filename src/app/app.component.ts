import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Exploresy';

  sideBarOpen = false;


  @ViewChild(MatDrawer)
  sidenav!: MatDrawer;

  constructor(private observer: BreakpointObserver, private cd:ChangeDetectorRef) {

  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
          this.cd.detectChanges();
        } else {
          this.sidenav.mode = 'side';
          // this.sidenav.open();
          this.cd.detectChanges();

        }
      });
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
