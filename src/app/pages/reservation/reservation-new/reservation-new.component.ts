import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bloc } from 'src/app/models/bloc';
import { chamber } from 'src/app/models/chambre';
import { Etudiant } from 'src/app/models/etudiant';
import { foyer } from 'src/app/models/foyer';
import { Reservation } from 'src/app/models/reservation';
import { universite } from 'src/app/models/universite';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-new',
  templateUrl: './reservation-new.component.html',
  styleUrls: ['./reservation-new.component.scss']
})
export class ReservationNewComponent implements OnInit {

  universites: universite[];
  selected_universite: universite = null;
  foyer: foyer= null;
  blocs: bloc[]= null;
  selected_bloc: bloc;
  chambres: chamber[]= null;
  selected_chambre: chamber;
  form: FormGroup;
  etudiants: Etudiant[];

  constructor(
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reservationService.getAlluniversities().subscribe((universites: universite[]) => {
      this.universites = universites;
    })
    this.reservationService.getAllEtudiants().subscribe((etudiants: Etudiant[]) => {
      this.etudiants = etudiants;
      console.log(this.etudiants)
    })

    this.form = this.fb.group({
      anneUniversitaire: ['', [Validators.required, this.yearRangeValidator]],
      state: "AWAITING",
      idChambre: [null, Validators.required],
      etudiantList: this.fb.array([]),
      // insert current user in etudiantList 
      // etudiantList: [logged_in_etudiant],
    })

    // this.etudiants.forEach(etudiant => {
    //   this.addEtudiantCheckbox(etudiant);
    // });
  }

  yearRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const pattern = /^\d{4}-\d{4}$/;
    if (control.value && !pattern.test(control.value)) {
      return { 'invalidYearRange': true };
    }
    const years = control.value.split('-').map(Number);
  
    if ((years[0] >= years[1]) && (years[0] - years[1] == 1)) {
      return { 'invalidYearOrder': true };
    }
  
    return null;
  }
  

  onEtudiantCheckboxChange(etudiant: any, isChecked: boolean) {
    const etudiantList = this.form.get('etudiantList') as any;

    if (isChecked) {
      etudiantList.push(this.fb.control(etudiant));
    } else {
      const index = etudiantList.controls.findIndex((control: any) => control.value === etudiant);
      etudiantList.removeAt(index);
    }
  }

  selectuni(uni: universite) {
    if (this.selected_universite !== uni) {
      this.selected_universite = uni
      this.reservationService.getfoyerbyuniversite(uni.idUniversite).subscribe((foyer: foyer) => {
        this.foyer = foyer;
        this.blocs = foyer.blocList;
      })
    }
  }

  selectbloc(bloc: bloc) {
    if (this.selected_bloc !== bloc) {
      this.selected_bloc = bloc
      this.chambres = bloc.chamberList;
      console.log(bloc);
      console.log(this.chambres)
      this.form.patchValue({ idChambre: null });
    }
  }

  selectchambre(chambre: chamber) {
    if (this.selected_chambre !== chambre) {
      this.selected_chambre = chambre
      this.form.patchValue({ idChambre: chambre.idChambre });
    }
  }

  save() {
    this.reservationService.addReservation(this.form.value, this.form.value.idChambre).subscribe((reservation: Reservation) => {
      this.router.navigate(['reservation'])
    })
  }



}
