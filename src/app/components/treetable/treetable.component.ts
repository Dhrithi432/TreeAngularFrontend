import { Component, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { DataService, Tree } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {FormControl} from '@angular/forms';

const TREE_DATA: Tree[] = [];

interface ExampleFlatNode {
  expandable: boolean;
  mainbranch: string;
  count: number;
  level: number;
}

@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.css']
})
export class TreetableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'mainbranch',
    'name',
    'employeeId',
    'designation',
    'dateOfJoining',
    'actions',
  ];

  data:Tree[]=[];

  private transformer = (node: Tree, level: number) => {
    return {
      expandable: !!node.childOfMainBranch && node.childOfMainBranch.length > 0,
      mainbranch: node.mainbranch,
      count: node.count,
      empId:node.emp_id,
      name:node.name,
      employeeId: node.employeeId,
      designation: node.designation,
      dateOfJoining: node.dateOfJoining,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable    
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.childOfMainBranch
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  public pageSlice: any;
  fixed_data: any[];
  length: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.log(TREE_DATA);

    this.dataSource.data = this.fixed_data.slice(
      e.pageIndex * this.pageSize,
      e.pageIndex * this.pageSize + this.pageSize
    );
    console.log(this.dataSource.data);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  constructor(private details: DataService, private dialog: MatDialog) {
    this.details.GetData().subscribe(TREE_DATA=> {
          console.log(TREE_DATA);
          this.fixed_data = [...TREE_DATA];
          this.length = this.fixed_data.length;
          TREE_DATA = TREE_DATA.slice(0, 5);
           this.dataSource.data = TREE_DATA;
          
    })
  }

  ngOnInit(): void {
    // this.postTree();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  myControl = new FormControl('');

  deleteRecord(emp_id:number) {
    this.details.deleteData(emp_id).subscribe(id => {
      // this.dataSource=res;
      console.log(id);
    });
  }

}
