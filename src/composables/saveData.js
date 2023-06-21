import {getDatabase, ref, set} from "firebase/database";

export function saveData(data){
    const db = getDatabase();
    set(ref(db, 'gimnazijski/' + data["Ime i prezime"]), data)
    console.log("Data set successfully");
}