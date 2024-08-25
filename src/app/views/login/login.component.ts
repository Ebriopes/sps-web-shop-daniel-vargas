import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly unsubscribe = new Subject<void>();

  cardTitle: string = 'Inicio';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.cardTitle =
      this.route.snapshot.firstChild?.data['cardTitle'] ?? this.cardTitle;

    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.cardTitle = this.route.snapshot.firstChild?.data['cardTitle'];
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
