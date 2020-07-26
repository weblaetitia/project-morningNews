// ici action = l'objet reçu

export default function(wishList = [], action) {
  if(action.type === 'addArticle') {
    var find = false 
    wishList.forEach(element => {
      if (element.title === action.title) {
        find = true
      }
    })
    if (!find) {
      var newArray = [...wishList];
      newArray.push({title: action.title, content: action.content, urlToImage: action.urlToImage})
      return newArray;
    } else {
      return wishList
    }
  } else if (action.type === 'delete') {
    var filterArray = wishList.filter(element => element.title !== action.title)
    return filterArray;
  } else if (action.type === 'getArticles') {
    return action.articlesFromDB;
  } else {
    return wishList;
  }
}