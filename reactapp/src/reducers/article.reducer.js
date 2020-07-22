// ici action = l'objet reçu

export default function(wishList = [], action) {
  if(action.type == 'addArticle') {

    var find = false 
    
    wishList.forEach(element => {
      if (element.wlTitle == action.wlTitle) {
        find = true
      }
    })


    if (!find) {
      var newArray = [...wishList];
      newArray.push({wlTitle: action.wlTitle, wlContent: action.wlContent, wlImage: action.wlImage})
      return newArray;
    } else {
      return wishList
    }

    
  } else if (action.type == 'delete') {
    var filterArray = wishList.filter(element => element.wlTitle !== action.wlTitle)
    return filterArray;
  } else {
    return wishList;
  }
}