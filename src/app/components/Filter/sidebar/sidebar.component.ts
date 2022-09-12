import { Component, Input, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Icategorie } from 'src/app/models/icategorie';
import { CategorieService } from 'src/app/services/designe/categorie.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  currentPosition:string="left";
  currentIsfullScreen:boolean=false;

  isvisible :true


  constructor(private primengConfig: PrimeNGConfig ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;



  }




}
