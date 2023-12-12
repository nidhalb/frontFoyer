import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable, map, startWith } from "rxjs";
import { Foyer } from "src/app/models/foyer.model";
import { FoyerManagementService } from "src/app/services/foyer-management.service";

@Component({
  selector: "app-bloc-add-dialog",
  templateUrl: "./bloc-add-dialog.component.html",
  styleUrls: ["./bloc-add-dialog.component.scss"],
})
export class BlocAddDialogComponent implements OnInit {
  title: String;
  form: FormGroup;
  idBloc: number;
  nomBloc: string;
  capaciteBloc: number;
  foyer: Foyer;

  listFoyer:Foyer[];

  myControl = new FormControl();
  options: string[] = []
  filteredOptions: Observable<String[]>;

  constructor(
    private dialogRef: MatDialogRef<BlocAddDialogComponent>,
    private fb: FormBuilder,
    private foyerService: FoyerManagementService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title
    if(data.bloc){
      this.idBloc = data.bloc.idBloc
      this.nomBloc = data.bloc.nomBloc
      this.capaciteBloc = data.bloc.capaciteBloc
      this.foyer = data.bloc.foyer
      this.myControl.setValue(this.foyer.nomFoyer)
    }
    
  }

  ngOnInit(): void {
    

    this.foyerService.getAll().subscribe((data: Foyer[]) => {
      this.listFoyer = data;
      data.forEach(element => {
        this.options.push(element.nomFoyer);
      });
    });

    this.form = this.fb.group({
      idBloc: [this.idBloc],
      nomBloc: [this.nomBloc, []],
      capaciteBloc: [this.capaciteBloc, []],
      foyer: [this.foyer, []],
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  save() {
    
    this.form.value.foyer = this.listFoyer.find(elm => elm.nomFoyer == this.myControl.value)
    if(this.form.value.foyer && this.form.value.nomBloc && this.form.value.capaciteBloc){
      this.dialogRef.close(this.form.value);
    }
    
  }

  close() {
    this.dialogRef.close();
  }

  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
