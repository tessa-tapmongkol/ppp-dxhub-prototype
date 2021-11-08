export function styleSubcategory(subcategory) {
    return subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
}

export function styleCategory(category){
    var result = category.charAt(0).toUpperCase();
    for(var i = 1; i < category.length; i++) {
        if (category.charAt(i) === '_') {
            result += " ";
        } else {
            result += category.charAt(i);
        }
    }
    return result;
}