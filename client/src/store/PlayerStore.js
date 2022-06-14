import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";

export default class PlayerStore {
    constructor() {
        this._selectedTrack ={}
        this._audio ={}
        makeAutoObservable(this);
    }


    getAudio(audio){
        return this._audio
    }
    getSelectedTrack(selectedTrack){
        return this._selectedTrack
    }
}
