"use strict";
var cheerio = require('cheerio');
var _ = require('underscore');
var ElementWrapper = (function () {
    function ElementWrapper(element) {
        this.element = element;
    }
    ElementWrapper.prototype.getContent = function () {
        return this.element.children && this.element.children.length > 0 && this.element.children[0].data;
    };
    ElementWrapper.prototype.getHref = function () {
        return this.element.attribs && this.element.attribs.href;
    };
    return ElementWrapper;
}());
exports.ElementWrapper = ElementWrapper;
var PageHelper = (function () {
    function PageHelper(html) {
        this.$ = cheerio.load(html);
    }
    PageHelper.prototype.one = function (selector) {
        return new ElementWrapper(this.$(selector)[0]);
    };
    PageHelper.prototype.many = function (selector) {
        var elements = [];
        _.each(this.$(selector), function (element) {
            elements.push(new ElementWrapper(element));
        });
        return elements;
    };
    return PageHelper;
}());
exports.PageHelper = PageHelper;
//# sourceMappingURL=PageHelper.js.map