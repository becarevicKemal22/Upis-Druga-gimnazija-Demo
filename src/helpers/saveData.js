import {getDatabase, ref, set} from "firebase/database";

export function saveData(data){
    const db = getDatabase();
    const path = data["Program"].toLowerCase().replace(/ /g, '_') + '/' + data["Ime i prezime"];
    const noProgram = Object.assign({}, data);
    delete noProgram["Program"];
    set(ref(db, path), noProgram)
}