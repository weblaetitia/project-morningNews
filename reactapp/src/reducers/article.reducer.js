// ici action = l'objet reçu

export default function(wishList = [], action) {
  if(action.type == 'addArticle') {
    var newArray = [...wishList];
    newArray.push({wlTitle: action.wlTitle, wlContent: action.wlContent, wlImage: action.wlImage})
      return newArray;
    } else {
      return wishList;
    }
  }