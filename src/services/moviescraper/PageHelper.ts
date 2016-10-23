import cheerio = require('cheerio');
import _ = require('underscore');

export class ElementWrapper {

    constructor(private element: any) { }

    public getContent(): string {
        return this.element.children && this.element.children.length > 0 && this.element.children[0].data;
    }

    public getHref(): string {
        return this.element.attribs && this.element.attribs.href;
    }
}

export class PageHelper {
    private $: CheerioStatic;

    constructor(html: string) {
        this.$ = cheerio.load(html);
    }

    public one(selector: string): ElementWrapper {
        return new ElementWrapper(this.$(selector)[0]);
    }

    public many(selector: string): ElementWrapper[] {
        var elements = [];
        _.each(this.$(selector),
            element => {
                elements.push(new ElementWrapper(element));
            }
        );
        return elements;
    }

}