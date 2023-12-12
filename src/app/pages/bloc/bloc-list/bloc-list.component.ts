import { Component, OnInit } from "@angular/core";
import { Bloc } from "src/app/models/bloc";
import { BlocService } from "src/app/services/bloc.service";
import { BlocAddDialogComponent } from "../bloc-add-dialog/bloc-add-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
@Component({
  selector: "app-bloc-list",
  templateUrl: "./bloc-list.component.html",
  styleUrls: ["./bloc-list.component.scss"],
})
export class BlocListComponent implements OnInit {

  blocList: Bloc[];

  searchInput: string = "";
  handleSearch(str: string): Bloc[] {
    if (str != "") {
      return this.blocList.filter((bloc) => bloc.nomBloc.startsWith(str));
    }
    return this.blocList;
  }

  constructor(private blocService: BlocService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.blocService.getAllBlocs().subscribe((data: Bloc[]) => {
      this.blocList = data;
    });
  }

  openDialog(title: String, bloc: Bloc) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      bloc: bloc ? bloc : null,
    };

    const dialogRef = this.dialog.open(BlocAddDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((bloc) => {
      if (bloc) {
        if (title === "Add Bloc") {
          this.blocService.addBloc(bloc).subscribe((data) => {
            this.blocList.push(data);
          });
        } else {
          this.blocService.updateBloc(bloc).subscribe((data) => {
            let index = this.blocList.findIndex(
              (bloc) => bloc.idBloc == data.idBloc
            );
            this.blocList[index].nomBloc = data.nomBloc;
            this.blocList[index].capaciteBloc = data.capaciteBloc;
            this.blocList[index].foyer = data.foyer;
          });
        }
      }
      return null;
    });
  }

  addBloc() {
    this.openDialog("Add Bloc", null);
  }

  editBloc(bloc: Bloc) {
    this.openDialog("Edit Bloc", bloc);
  }

  deleteBloc(idBloc) {
    this.blocService.deleteBloc(idBloc).subscribe();
    this.blocList = this.blocList.filter((bloc) => bloc.idBloc != idBloc);
  }
}
