export class Movie{
    public rating: number;
    public keywords: string[];
    public genres: string[];
    public summary: string;
    public poster: string;

    constructor(public id: string, public title:string){
        this.keywords = [];
        this.genres = [];
     }

    public getKeywords() : string []{
        return this.keywords;
    }
}