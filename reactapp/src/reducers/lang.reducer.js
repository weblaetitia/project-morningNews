// ici action = l'objet reçu

export default function(lang = 'french', action) {
    if (action.type == 'switchLanguage') {
      return action.lang;
    } else {
      return lang;
    }
  }