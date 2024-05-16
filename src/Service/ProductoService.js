import firebase from "../Config/firebase"

//mostrar todos los productos
export async function getAllProductos(buscar){
    
    const querySnapshot = await firebase.db.collection("productos").orderBy("nombre").startAt(buscar).endAt(buscar+'\uf8ff')
    .get()
    return querySnapshot.docs

}

//mostrar detalle producto 
export async function getIdProductos(id){
   
    return await firebase.db.doc("productos/"+id).get()

}

//mostrar detalle usuario 
export async function getIdUsuario(uid){
   
    return await firebase.db.doc("usuarios/"+uid).get()

}

//actualizar producto db
export async function update(id,data){

    return await firebase.db.doc("productos/"+id).set(data)
    
}
//eliminar producto db
export async function del(id){

    return await firebase.db.doc("productos/"+id).delete()
    
}