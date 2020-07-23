// ici action = l'objet reçu

export default function(token = '', action) {
    console.log(token)
    if (action.type == 'addToken') {
        console.log(action.userToken)
      return action.userToken;
    } else {
      return token;
    }
  }