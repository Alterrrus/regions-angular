import {Component, OnInit} from '@angular/core';
import {RegionService} from "../service/region.service";
import {GiphyService} from "../service/giphy.service";

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {
  regions: Array<any> | undefined;

  constructor(private regionService: RegionService, private giphyService: GiphyService) {
  }

  ngOnInit(): void {
    this.regionService.getAll().subscribe(data => {
      this.regions = data;
      // @ts-ignore
      for(const region of this.regions){
        this.giphyService.get(region.name).subscribe(url=>region.giphyUrl=url);
      }
    });
  }

}
