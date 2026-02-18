import { makeAutoObservable } from "mobx";

export class ActivityStore {
    //initial value of filter is all
    filter ="all";
    startDate = new Date().toISOString();

    constructor(){
        makeAutoObservable(this)
    }

    setFilter = (filter: string) => {

        //this method updates the filter property
        //to the value that is passed, allowing us to
        //change filter dynamically
        this.filter = filter
    }

    setStartDate = (date: Date) => {
        this.startDate = date.toISOString();
    }
}