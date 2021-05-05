import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import GeneratedData from './../../../assets/json/generated.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public generatedData = GeneratedData.map(item =>{
    return { ...item, year: item.createdAt.split('-')[0] }
  });
  public searchForm: FormControl = this.formBuilder.control('');
  public searchResults = [];
  public searchButtonDisabled: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.searchForm.valueChanges.pipe( 
    ).subscribe((searchText) => {
      if (searchText == 0) {
        this.searchResults = [];
        this.searchButtonDisabled=true;
      }
      else {
        this.searchButtonDisabled= false;
        this.searchResults = this.generatedData.filter((item) => {
          return item.title.toLowerCase().startsWith(searchText.toLowerCase());
        });
      }
    })
  }

  showMore() {
    this.router.navigate(['list', { searchText: this.searchForm.value }]);
  }
}