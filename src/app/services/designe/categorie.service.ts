import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { Icategorie, IMenuCategorie } from 'src/app/models/icategorie';

import { environment } from 'src/environments/environment';
import { BaseHttpService } from '../base/base-http.service';



const API_TABLE_NAME:string    = 'categories';


@Injectable({
  providedIn: 'root'
})
export class CategorieService extends BaseHttpService<Icategorie, number> {

  apiurl! :string;

  SubCategories$ = new AsyncSubject();
  Categories:Icategorie[] =[];

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.api.BaseUrlApp}${API_TABLE_NAME}`);

    this.apiurl=`${environment.api.BaseUrlApp}${API_TABLE_NAME}`;


  }

   GetMenucategories()
   {
        console.log("CategorieService:  GetMenucategories");
        this.GetAll().subscribe( data => {
            this.Categories = data;
            console.log( this.Categories);
            this.SubCategories$.next( this.Categories);
            this.SubCategories$.complete();
        })

   }

   buildMenuCategorie( List: Icategorie[],   parentid:number=0) : IMenuCategorie[]
   {
     const items : IMenuCategorie[]=[];
     // console.log( "buildmenull  parentid :" +parentid  );
     List.forEach(cat =>
     {
         if ( cat.idParent == parentid ){
             const elm = { id : cat.id, idroot: cat.idParent , name: cat.name};
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
