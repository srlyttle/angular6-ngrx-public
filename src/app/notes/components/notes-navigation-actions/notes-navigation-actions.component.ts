import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-navigation-actions',
  templateUrl: './notes-navigation-actions.component.html',
  styleUrls: ['./notes-navigation-actions.component.scss'],
})
export class NotesNavigationActionsComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
  goToRoute(route) {
    this.router.navigate([route]);
  }
}
