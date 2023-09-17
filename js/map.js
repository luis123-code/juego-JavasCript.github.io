/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
  '-': ' ',
  'O': '🚀',
  'X': '👾',
  'I': '🌎',
  'PLAYER': '👽',
  'VIDA' : '❤️' ,
  'BOMB_COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
};

const maps = [];


maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);

maps.push(`
    O-----XXXX
    XX-XX-XXXX
    XX----XXXX
    XX--XXXXXX
    XX------XX
    XXX-XX-XXX
    XX-----XXX
    XX-XX-XXXX
    XX-----IXX
    XXXXXXXXXX
  `);

  
maps.push(`
    I--XX---XX
    XX-XX-X-XX
    XX--X-XX-X
    XX--XX-XXX
    XXX----XXX
    XXXX-X-XXX
    XX--X--XXX
    XX-XX-XXXX
    XX-----OXX
    XXXXXXXXXX
  `);

  



