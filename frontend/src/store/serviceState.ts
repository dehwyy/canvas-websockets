import {makeAutoObservable} from "mobx";

class ServiceState {
    constructor(

    ) {
        makeAutoObservable(this)
    }


}

export default new ServiceState()