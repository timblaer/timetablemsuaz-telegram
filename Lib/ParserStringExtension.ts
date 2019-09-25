declare interface String {
    cleanStringArray(this:string, separator:string):string[];
}

String.prototype.cleanStringArray = function(this:string, separator:string):string[] {
    return this
        .replace('\n', '')
        .split(separator)
        .map(
            x => x.replace(/<[^>]*>/g, "").trim()
        )
        .filter(
            str => str.length != 0
        );
}