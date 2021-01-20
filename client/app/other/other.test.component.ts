import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-test',
  templateUrl: './other.test.component.html',
  styleUrls: ['./other.test.component.css']
})
export class OtherTestComponent implements OnInit {
  tags = [
    {
      value: 'skill_evade',
      display: ':skill_evade'
    }
  ];

  showDropDown = false;
  searchText = '';

  constructor(
  ) {

  }

  ngOnInit() {

  }

  updateSearch() {
    this.openDropDown();
  }


  closeDropDown() {
    this.showDropDown = false;
    console.log("foo")
  }

  openDropDown() {
    this.showDropDown = true;
  }

  getSearchValue() {

  }

  selectValue(tag) {

  }
}
