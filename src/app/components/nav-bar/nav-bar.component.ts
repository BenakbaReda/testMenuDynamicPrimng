import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Icategorie, IMenuCategorie } from 'src/app/models/icategorie';
import { CategorieService } from 'src/app/services/designe/categorie.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    Categories:Icategorie[];
    items: MenuItem[]=[];

    value: string;
  
  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {

    console.log("NavBarComponent : ngOnInit()");
    this.categorieService.SubCategories$.subscribe(
      val => {
               // console.log(val);
                this.Categories= this.categorieService.Categories ;
                this.buildlistmenu(this.Categories );
              },
      err => console.error("sub " + err),
      () => console.log("Sub Complete")
    );
    this.SubscriberMenuCategories();

  }

  SubscriberMenuCategories(){
    this.categorieService.GetMenucategories() ;
  }


  buildlistmenu( List: Icategorie[])  
 {
 
    let item : IMenuCategorie;
    item ={ id : 0, idroot:0, name: "categorie"};
    item.items = this.buildMenuCategorie(List);
    console.log( item);





 }


 
 buildMenuCategorie( List: Icategorie[],   parentid:number=0) : IMenuCategorie[]
{
  const items : IMenuCategorie[]=[];
 // console.log( "buildmenull  parentid :" +parentid  );
   List.forEach(cat =>
   {
       if ( cat.idParent == parentid ){
            const elm = { id : cat.id, idroot: cat.idParent , name: cat.displayname};
            items.push(elm);
            //console.log( "add elm  Id :" + cat.id  );
        }
        else
        {
            const rootitem = items.find(y=> y.id== cat.idParent)
             if ( rootitem ){
               // console.log( "found item  ID :" +rootitem.id  );
       
                rootitem.items=this.buildMenuCategorie(List, cat.idParent) 
            }
        }
   }) 

   // console.log( "Icategorie : " + JSON.stringify(x));
   return items;
}

 
}
