export class Movie{
    public rating: number;
    public keywords: string[];
    public summary: string;
    public poster: string;

    constructor(public id: string, public title:string){
        this.keywords = [];
     }

    public getKeywords() : string []{
        return this.keywords;
    }
}