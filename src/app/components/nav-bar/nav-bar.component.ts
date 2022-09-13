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
    let items : IMenuCategorie[]=[];
    let item : IMenuCategorie;
    const listIdParent : number[]=[];

    List.forEach(x =>
    {
        let idparent = listIdParent.find(nbr => nbr== x.idParent)
        if((idparent == null) || (idparent == undefined)  ){
            listIdParent.push(x.idParent);
        }
    })
    listIdParent.sort();
    console.log(listIdParent)


    listIdParent.forEach(x =>
    {
        item ={ id : x, idroot:0, name: ""};
        item.items = this.getchildofParent(List,x );
        items.push(item);
    })
 
    console.log( items);

 }


getchildofParent( List: Icategorie[], parentid:number=0, root : IMenuCategorie =null ) : IMenuCategorie[]
 {
    let items : IMenuCategorie[];
    let elm : IMenuCategorie

    List.forEach(x =>
    {
        
        if ( x.idParent ==parentid){
               
            if(parentid ==0){
                if(items ==null) items =[];
                elm ={ id : x.id,idroot:x.idParent , name: x.displayname};
                items.push(elm);
            }
            else
            {
                if(root !=null)
                {
                    let exist = root.items.find(y=> y.id== parentid)
                    exist.items=this.getchildofParent(List, exist.id,  exist)
                }


            }

        }
        
        
       
    })
    return items;
 }


 getchildofParentold( List: Icategorie[], parentid:number=0, item: IMenuCategorie) : IMenuCategorie[]
 {
    let items : IMenuCategorie[]
 

    List.forEach(x =>
    {
        
        if ( x.idParent ==parentid){
   
            if(items ==null) items =[];
           // items.push( { id : x.id, name: x.displayname});
        }
       
    })
    return items;
 }



buildMenu( List: Icategorie[] )
{
    const listIdParent : number[]=[];
    List.forEach(x =>
    {
        let idparent = listIdParent.find(nbr => nbr== x.idParent)
        if((idparent == null) || (idparent == undefined)  ){
            listIdParent.push(x.idParent);
        }
    })

    console.log( "listIdParent : " + JSON.stringify(listIdParent));
    let MenuCategorie:IMenuCategorie[];

    listIdParent.forEach(x =>
    {
        let childItem :  MenuItem[]  = this.findChildOfParent(List, x);
        childItem.forEach(elm =>
        {
            console.log( " [ ID : " + elm.id );
        })


    })



}
 



 

findChildOfParent( List: Icategorie[] ,  idParent:number =0): MenuItem[]
{
    let parentItem :  MenuItem  ;
    let childItem :  MenuItem[] =null;
    List.forEach(x =>
    {
       // console.log( "Icategorie : " + JSON.stringify(x));
       // console.log( "Icategorie  [ ID : " + x.id + ", Parent : " + x.idParent + "]");
       // parentItem = childItem.find(elm  => elm.id == "Root" + x.idParent + "_id" + x.id  )
        if ( x.idParent ==idParent){
                if(childItem ==null) childItem =[];
                parentItem = {
                    id :"Parent" + x.idParent + "_child" + x.id ,
                    label: x.displayname,
                    icon:'pi pi-fw pi-file' 
                }
                childItem.push(parentItem);
               //  parentItem.items= this.findChildOfParent(this.Categories,x.idParent )  
               //  console.log( "item  : ID : " +  parentItem.id );
        }
        else
        {



        }
    })
  //  console.log( "childItem : " + JSON.stringify(childItem));
    return childItem;

}

 

}
