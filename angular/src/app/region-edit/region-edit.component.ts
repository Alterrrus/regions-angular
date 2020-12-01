import { Component,OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService} from "../service/region.service";
import { GiphyService } from "../service/giphy.service";
import { NgForm } from '@angular/forms';
import {error} from "@angular/compiler/src/util";
@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.css']
})
export class RegionEditComponent implements OnInit,OnDestroy {
  region:any={};
  sub: Subscription | undefined;
  error:any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private regionService:RegionService,
              private giphyService: GiphyService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.regionService.get(id).subscribe((region: any) => {
          if (region) {
            this.region = region;
            this.region.href = region._links.self.href;
            this.giphyService.get(region.name).subscribe(url => region.giphyUrl = url);
          } else {
            console.log(`Region with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }
  ngOnDestroy() {
    // @ts-ignore
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/region-list']);
  }
  save(form: NgForm) {
    this.regionService.save(form).subscribe(result => {
      this.gotoList();
    }, error => {this.error=error.message;console.log(error);});
  }

  remove(id:number) {
    this.regionService.delete(id).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
