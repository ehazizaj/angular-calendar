import {Component, OnDestroy, OnInit} from '@angular/core';

import {MenuService} from '../../core/services/menu.service';

import {Router} from '@angular/router';
import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Hotkeys} from '../../core/services/hotkeys.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  opened$ = this.menu.opened$;
  destroy$ = new Subject<boolean>();

  menuList = this.menu.menu;

  constructor(private menu: MenuService, private router: Router, private hotkeys: Hotkeys) {
  }

  ngOnInit(): void {
    this.addMenuHotkey();
  }

  /**
   * Change sidebar open / close
   * @return void
   */
  toggleMenu(): void {
    this.menu.toggleMenu();
  }


  /**
   * Adds keyboard shortcuts for better app navigation
   * @return void
   */
  addMenuHotkey(): void {
    this.hotkeys.addShortcut({keys: 'alt.0'})
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toggleMenu();
      });
    this.hotkeys.addShortcut({keys: 'alt.1'})
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
