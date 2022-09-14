import { Component, OnInit, ViewChild } from '@angular/core';
import {MegaMenuItem, MenuItem} from 'primeng/api';
import { Icategorie, IMenuCategorie } from 'src/app/models/icategorie';
import { CategorieService } from 'src/app/services/designe/categorie.service';

import {SelectItem} from 'primeng/api';


interface MenuType {
  name: string,
  id: number
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  

  //only for proto
  /***************************************** */
    isLogin:boolean = true;
    listMenuType: MenuType[] =[
      { name:"SlideMenu" , id:1},
      { name:"PanelMenu" , id:2},
      { name:"TieredMenu", id:3},
    //  { name:"Menu"      , id:3},
    //  { name:"MegaMenu"  , id:5},
    ]
    selectedMenyTyp: MenuType ={ name:"SlideMenu" , id:1} ;
   /***************************************** */


  Categories:Icategorie[];
  items: MenuItem[]=[];


  searchValue: string;
  
  constructor(private categorieService: CategorieService) { 
 
  }
  itemPanelMenu: MenuItem[];
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
    this.getCategories();


    
       
 

  }

  getCategories(){
    this.categorieService.GetMenucategories() ;
  }


buildlistmenu( List: Icategorie[])  
{
    let item : IMenuCategorie;
    item ={ id : 0, idroot:0, name: "categorie"};
    item.items = this.categorieService.buildMenuCategorie(List);
    console.log( item);

    this.buildMenuItem(item,this.items);
    console.log( this.items);
 

}


buildMenuItem( cat: IMenuCategorie  ,items: MenuItem[]   ) 
{
 
  console.log( "cat root name : " + cat.name);
  cat.items.forEach(y =>
  {
        console.log( "cat child name : " + y.name);
        const item: MenuItem ={
          label: y.name ,
          id: "root" + y.idroot + " Id"+ y.id,
          icon: 'pi pi-pw pi-file',
        }
        items.push(item);
        if(y.items){
          console.log( "length : " + y.items.length);
          if(y.items.length>0){
            item.items=[];
            this.buildMenuItem(y, item.items  )
          }
        }
  }) 
}



onclick_logout()
{
      this.isLogin=false;  
}

onclick_login()
{
      this.isLogin=true;  
}










toggleMenu($event)
{
  this.isLogin=true;  
}
}
