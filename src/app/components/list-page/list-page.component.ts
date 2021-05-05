import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import GeneratedData from './../../../assets/json/generated.json';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  public generatedData = GeneratedData.map(item => {
    return { ...item, year: item.createdAt.split('-')[0] }
  });
  public searchResults = [];
  public searchResultList = [];
  public searchForm: FormControl = this.formBuilder.control('');
  public searchButtonDisabled: boolean = true;
  public pageCount = 0;
  public activePage = 0;
  public pagingList = [];
  public pageElementLimit = 6;

  constructor(private formBuilder: FormBuilder, private dataRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    const searchText = this.dataRoute.snapshot.params['searchText'];
    this.filterAndSearchData(searchText);
  }

  // filter data & calculate page count & start pagining
  filterAndSearchData(searchText) {
    this.searchResults = this.generatedData.filter((item) => {
      return item.title.toLowerCase().startsWith(searchText.toLowerCase());
    });

    this.searchResultList = this.searchResults.slice(0, this.pageElementLimit);
    this.pageCount = Math.ceil(this.searchResults.length / this.pageElementLimit);
    this.activePage = 0;
    this.pagining();
  }

  ngAfterViewInit() {
    this.searchForm.valueChanges.pipe(
    ).subscribe((searchText) => {
      if (searchText == 0) {
        this.searchButtonDisabled = true;
      }
      else {
        this.searchButtonDisabled = false;
      }
    })
  }

  // search function
  search() {
    this.filterAndSearchData(this.searchForm.value);
  }

  // go to new page 
  newPage(value) {
    this.activePage = value;
    this.searchResultList = this.searchResults.slice(value * this.pageElementLimit, (value + 1) * this.pageElementLimit);
    this.pagining();
  }

  // pagining function
  pagining() {
    this.pagingList = [];
    for (let i = 0; i < this.pageCount; i++) {
      if (this.pageCount < 7) {
        this.pagingList.push(i);
      }
      else {
        if (this.activePage < 4 && i < 7) {
          this.pagingList.push(i);
        }
        else if (this.activePage > this.pageCount - 4 && i > this.pageCount - 8
          && i < this.pageCount - 3) {
          this.pagingList.push(i);
        }
        else if (this.activePage > 3 && i === 0) {
          this.pagingList = [0, '...'];
        }
        else if (this.activePage < this.pageCount - 3 && i === this.pageCount - 1) {
          this.pagingList = [...this.pagingList, '...', (this.pageCount - 1)];
        }
        else if (
          (i > this.activePage - 3 && i < this.activePage + 3)) {
          this.pagingList.push(i);
        }
      }
    }
  }

  // number check function
  isNumber(n) {
    return !isNaN(n);
  }

  // sorting function
  sortingData(value) { 
    if (value === 'nameAsc') {
      this.searchResults.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
    } else if (value === 'nameDesc') {
      this.searchResults.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1).reverse();
    } else if (value === 'yearAsc') {
      this.searchResults.sort((a, b) => a.year - b.year);
    } else {
      this.searchResults.sort((a, b) => b.year - a.year);
    }
    this.searchResultList = this.searchResults.slice(0, this.pageElementLimit);
    this.activePage = 0;
  }
}