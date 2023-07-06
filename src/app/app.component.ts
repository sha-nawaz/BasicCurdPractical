import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from './dailog/dailog.component';
import { ApiService } from './services/api.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularCrd';

  employe: any = {}
  employelist: any[] = []

  displayedColumns: string[] = ['firstName', 'lastName', 'emailId', 'mobileNumber', 'country', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog,
    private api: ApiService) {
  };
  ngOnInit() {
    this.getAllEmploye();
  };

  openDialog() {
    this.dialog.open(DailogComponent, {
      width: "30%",
      height: "70%",
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllEmploye();
      };
    });
  };

  getAllEmploye() {

    this.api.getEmployeService().subscribe({
      next: (res) => {
        this.employelist = res;
        localStorage.setItem('employe', JSON.stringify(this.employelist));

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error: (err) => {
        alert("error while facthing the record!!");
      },
    });
  };

  editEmploye(row: any) {
    this.dialog.open(DailogComponent, {
      width: '30%',
      height: "70%",
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllEmploye();
      }
    });
  };

  deleteEmploye(id) {

 if(confirm("Are you sure to delete record?"))
    this.api.delteEmployeService(id).subscribe({
      next: (res) => {
        alert("data hasbeen deleted sucessfully")
        this.getAllEmploye();
      },
      error: () => {
        alert("error while deleting the data")
      },
    });
  }
;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    };
  };

}
