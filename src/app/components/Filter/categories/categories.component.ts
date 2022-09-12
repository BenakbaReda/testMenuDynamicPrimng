import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Icategorie } from 'src/app/models/icategorie';
import { CategorieService } from 'src/app/services/designe/categorie.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  Categories:Icategorie[];
  items: MenuItem[]=[];

  constructor( private categorieService: CategorieService) { }

  ngOnInit(): void {
    console.log("SidebarComponent : ngOnInit()");
    this.categorieService.SubCategories$.subscribe(
      val => {
                console.log(val);
                this.Categories= this.categorieService.Categories ;
                this.BuildMenuItemCategories( );
              },
      err => console.error("sub " + err),
      () => console.log("Sub Complete")
    );
    this.SubscriberMenuCategories();

}


  SubscriberMenuCategories(){
    this.categorieService.GetMenucategories() ;
  }








  BuildMenuItemCategories( ){
      console.log( this.Categories);
      this.Categories.forEach(x =>
                                  {

                                      if( x.catId ==0){
                                            console.log(x)
                                            this.items.push(
                                              {
                                                  id :"Root" + x.catId + "_id" + x.id ,
                                                  label: x.displayname,
                                                  icon:'pi pi-fw pi-file'
                                              })
                                      }
                                  });

      console.log(this.items)
      // this.Categories.forEach(x =>
      //                             {
      //                                   if( x.catId !=0){
      //                                       const item =   this.items.find(element => element.id =="Root"+x.id);
      //                                       item.items.push({
      //                                       id :"chiledLevel1" + x.catId,
      //                                       label:x.displayname,
      //                                       icon:'pi pi-fw pi-file'})
      //                                   }
      //                             });


  }

}
