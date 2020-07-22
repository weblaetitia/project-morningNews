export default function(wishList = [], action) {
    if(action.type == 'addArticle') {
      var newArray = [...wishList];
      newArray.push({wlTitle: action.wlTitle, wlContent: action.wlContent})
      return newArray;
    } else {
      return wishList;
    }
  }