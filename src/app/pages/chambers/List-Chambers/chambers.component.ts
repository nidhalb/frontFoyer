import { Component, OnInit, ViewChild } from '@angular/core';
import { ChamberService } from '../../../services/chamber.service';
import { chamber } from 'src/app/models/chamber';
import { bloc } from 'src/app/models/bloc';
import { Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';



// ...
@Component({
  selector: 'app-chambers',
  templateUrl: './chambers.component.html',
  styleUrls: ['./chambers.component.scss']
})
export class ChambersComponent implements OnInit {
 
  @Output() addChambersToggle: EventEmitter<string> = new EventEmitter<string>();

  chambers: chamber[] = [];
  newChamber: chamber = { idChambre: 0, numeroChambre: 0, typeC: '' };
  chambersAdded: chamber[] = [];
  selectedBlocId = '';
  blocs: bloc[] = [];
  pagedChambers: chamber[] = [];
  //statstiques   
  allChambers: number = 0;
  totalBlocCapacity: number = 0;
  activeBlocCapacity: String = '0';
  // Pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;

  itemsPerPage = 4;
  currentPage = 1;
  totalItems = 0;
  showSuccessMessage=false;
  constructor(private chamberService: ChamberService) {}
  onChamberAdded() {
    this.loadData();
    this.loadBlocs();
    this.loadChamberStatistics();
    this.loadStatistics();
}
onChamberEdited()
{
  this.loadData();
  this.loadBlocs();
  this.loadChamberStatistics();
  this.loadStatistics();
  this.editisTrue=false;
}
  ngOnInit(): void {
    this.loadBlocs();
this.loadChamberStatistics();
  }

  loadBlocs(): void {
    this.chamberService.getAllBlocs().subscribe((allBlocs: bloc[]) => {
      this.blocs = allBlocs;
    });
  }

  updateChamberTable(): void {
    this.loadData();
    this.loadStatistics();
  }
  closeSuccessMessage() {
    this.showSuccessMessage = false;
  }
  editisTrue=false;
  idcham=0;
  toggleEditForm(idchamber:number){
    this.editisTrue = !this.editisTrue;
this.idcham=idchamber;

  }

  loadData(): void {
    if (this.selectedBlocId) {
      // Fetch data from your service for the selected bloc
      this.chamberService.getChambersByBloc(this.selectedBlocId).subscribe((chambersP: chamber[]) => {
        this.chambers = chambersP;
        this.totalItems = this.chambers.length;
        this.pagedChambers = this.getPagedData(this.chambers);
      });
    } else {
      // Fetch data for all chambers if no bloc is selected
      this.chamberService.getAllChambers().subscribe((allChambers: chamber[]) => {
        this.chambers = allChambers;
        this.totalItems = this.chambers.length;
        this.pagedChambers = this.getPagedData(this.chambers);
      });
    }
  }

  getPagedData(chambers: chamber[]): chamber[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return chambers.slice(startIndex, endIndex);
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pagedChambers = this.getPagedData(this.chambers);
  }



  showaddchamber = false;

  toggleAddChambers() {
    console.log('toggle addd chambers');
    this.showaddchamber = !this.showaddchamber;
    console.log('showaddchambers:', this.showaddchamber);
  
    // Emit the selected bloc ID
    this.addChambersToggle.emit(this.selectedBlocId);
  }

  getSelectedBlocName(): string {
    const selectedBloc = this.blocs.find(bloc => bloc.idBloc === Number(this.selectedBlocId));
    return selectedBloc ? selectedBloc.nomBloc.toString() : '';
  }


  handleAddChambersToggle(newBlocId: string) {
    console.log('Bloc changed. Resetting add-chambers component.');
    this.showaddchamber = false;
  }

  deleteChamber(idChambre: number) {
    this.chamberService.DeleteChamber(idChambre).subscribe((response: any) => {
      console.log(response);
      this.loadData();
    });
  }

  deleteChamberAlert(id: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this chamber?');
    if (isConfirmed) {
      // Call your deleteChamber() function here
      this.deleteChamber(id);
      this.loadStatistics();
      this.loadChamberStatistics();
      this.showSuccessMessage=true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  }

  loadChamberStatistics(): void {
    this.chamberService.getAllChambers().subscribe((chambers) => {
      this.allChambers = chambers.length;
    });
  }
  loadStatistics(): void {
   

    this.chamberService.getBlocMaxCapacity(this.selectedBlocId).subscribe((maxCapacity) => {
      this.totalBlocCapacity = maxCapacity;
    });

    this.chamberService.getBlocCurrentCapacity(this.selectedBlocId).subscribe((currentCapacity) => {
      this.activeBlocCapacity = currentCapacity.toString();
      if(this.activeBlocCapacity== this.totalBlocCapacity.toString()){
        this.activeBlocCapacity='Full';
      }
    });

    
  }

}



 





