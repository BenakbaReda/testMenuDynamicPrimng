export interface Icategorie {

  id: number,
  name: string,
  displayname: string,
  url :string,
  idParent: number,
 
}


export interface IMenuCategorie {

  id: number,
  name: string,
  idroot: number,
  items?:IMenuCategorie[]
}
