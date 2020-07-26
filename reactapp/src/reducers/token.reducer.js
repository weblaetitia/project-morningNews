// ici action = l'objet reçu

export default function(token = '', action) {
    if (action.type === 'addToken') {
      return action.userToken;
    } else {
      return token;
    }
  }