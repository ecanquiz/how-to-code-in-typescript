# Cómo Usar Enumeraciones en TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-enums-in-typescript)
:::

## Introducción

En [TypeScript](https://www.typescriptlang.org/), las _enumeraciones_ o tipos enumerados son estructuras de datos de longitud constante que contienen un conjunto de valores constantes. Cada uno de estos valores constantes se conoce como _miembro_ de la enumeración. Las enumeraciones son útiles cuando se establecen propiedades o valores que solo pueden ser una cierta cantidad de valores posibles. Un ejemplo común es el valor del palo de una sola carta en una baraja de cartas. Cada carta que se saque será un trébol, un diamante, un corazón o una espada; no hay valores de palo posibles más allá de estos cuatro, y es probable que estos valores posibles no cambien. Debido a esto, una enumeración sería una forma eficiente y clara de describir los posibles palos de una carta.

Mientras que la mayoría de las funciones de TypeScript son útiles para generar errores durante la compilación, las enumeraciones también son útiles como estructuras de datos que pueden contener constantes para su código. TypeScript traduce enumeraciones en [objetos JavaScript](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript) en el código final emitido por el compilador. Debido a esto, puede usar enumeraciones para hacer que una base de código sea más legible, ya que puede tener múltiples valores constantes agrupados en la misma estructura de datos, al mismo tiempo que hace que el código sea más seguro para los tipos que simplemente tener diferentes variables `const` por ahí.

Este tutorial explicará la sintaxis que se usa para crear tipos de enumeración, el código JavaScript que el Compilador de TypeScript crea bajo el capó, cómo extraer el tipo de objeto de enumeración y un caso de uso para enumeraciones que involucra banderas de bits en el desarrollo de juegos.

## Creando Enumeraciones en TypeScript

En esta sección, verá un ejemplo de cómo declarar una _enumeración numérica_ y una _enumeración de cadena_.

Las enumeraciones en TypeScript generalmente se usan para representar un número determinado de opciones para un valor dado. Estos datos se organizan en un conjunto de pares clave/valor. Si bien las claves deben ser cadenas, al igual que con los objetos de JavaScript en general, los valores de los miembros de enumeración suelen ser números que se incrementan automáticamente y sirven principalmente para distinguir un miembro de otro. Las enumeraciones con solo valores numéricos se denominan _enumeraciones numéricas_.

Para crear una enumeración numérica, use la palabra clave `enum`, seguida del nombre de la enumeración. Luego, cree un bloque de llaves (`{}`), donde especificará los miembros de la enumeración dentro, así:

```ts
enum CardinalDirection {
  North = 1,
  East,
  South,
  West,
};
```

En este ejemplo, está creando una enumeración denominada `CardinalDirection`, que tiene un miembro que representa cada uno de los puntos cardinales. Una enumeración es una elección adecuada de estructura de datos para contener estas opciones, ya que siempre hay solo cuatro opciones para los valores: norte, sur, este y oeste.

Usó el número `1` como el valor del primer miembro de su enumeración `CardinalDirection`. Esto asigna el número `1` como el valor del `North`. Sin embargo, no asignó valores a los otros miembros. Esto se debe a que TypeScript establece automáticamente los miembros restantes en el valor del miembro anterior más uno. `CardinalDirection.East` tendría el valor `2`, `CardinalDirection.South` tendría el valor `3` y `CardinalDirection.West` tendría el valor `4`.

Este comportamiento solo funciona con enumeraciones numéricas que solo tienen valores numéricos para cada miembro.

También puede ignorar por completo la configuración del valor de los miembros de la enumeración:


```ts
enum CardinalDirection {
  North,
  East,
  South,
  West,
};
```

En este caso, TypeScript establecerá el primer miembro en `0` y luego establecerá los otros automáticamente en función de ese, incrementando cada uno en uno. Esto dará como resultado un código idéntico al siguiente:


```ts{2,3,4,5}
enum CardinalDirection {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
};
```

El Compilador de TypeScript asigna de forma predeterminada números a los miembros de la enumeración, pero puede anular esto para crear una enumeración de cadena. Estas son enumeraciones que tienen valores de cadena para cada miembro; estos son útiles cuando el valor debe tener un cierto significado legible por humanos, como si necesita leer el valor en un registro o mensaje de error más adelante.

Puede declarar miembros de la enumeración para que tengan valores de cadena con el siguiente código:


```ts
enum CardinalDirection {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W'
}
```

Ahora cada una de las direcciones tiene un valor de letra que indica a qué dirección están vinculadas.

Con la sintaxis de la declaración cubierta, ahora puede consultar el JavaScript subyacente para obtener más información sobre cómo se comportan las enumeraciones, incluida la naturaleza bidireccional de los pares clave/valor.


## Miembros de Enumeración Bidireccionales

Tras la compilación de TypeScript, las enumeraciones se traducen en objetos de JavaScript. Sin embargo, hay algunas características de las enumeraciones que las diferencian de los objetos. Ofrecen una estructura de datos más estable para almacenar miembros constantes que los objetos de JavaScript tradicionales y también ofrecen referencias bidireccionales para miembros de enumeración. Para mostrar cómo funciona esto, esta sección le mostrará cómo TypeScript compila las enumeraciones en su código final.

Tome la enumeración de cadena que creó en la última sección:


```ts
enum CardinalDirection {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
};
```


Este se convierte en el siguiente código cuando se compila en JavaScript utilizando el Compilador de TypeScript:


```js
"use strict";
var CardinalDirection;
(function (CardinalDirection) {
    CardinalDirection["North"] = "N";
    CardinalDirection["East"] = "E";
    CardinalDirection["South"] = "S";
    CardinalDirection["West"] = "W";
})(CardinalDirection || (CardinalDirection = {}));
```

En este código, la cadena `"use strict"` inicia el [modo estricto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), una versión más restrictiva de JavaScript. Después de eso, TypeScript crea una variable `CardinalDirection` sin valor. Luego, el código contiene una [expresión de función de invocación inmediata (IIFE)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) que toma la variable `CardinalDirection` como argumento, al mismo tiempo que establece su valor en un objeto vacío (`{}`) si aún no se ha establecido.

Dentro de la función, una vez que `CardinalDirection` se establece como un objeto vacío, el código asigna múltiples propiedades a ese objeto:


```js{4,5,6,7}
"use strict";
var CardinalDirection;
(function (CardinalDirection) {
    CardinalDirection["North"] = "N";
    CardinalDirection["East"] = "E";
    CardinalDirection["South"] = "S";
    CardinalDirection["West"] = "W";
})(CardinalDirection || (CardinalDirection = {}));
```


Tenga en cuenta que cada propiedad es un miembro de su enumeración original, con los valores establecidos en el valor del miembro de la enumeración.

Para las enumeraciones de cadenas, este es el final del proceso. Pero a continuación, intentará lo mismo con la enumeración numérica de la última sección:


```ts
enum CardinalDirection {
  North = 1,
  East,
  South,
  West,
};
```

Esto dará como resultado el siguiente código, con las secciones resaltadas agregadas:


```js{4,5,6,7}
"use strict";
var CardinalDirection;
(function (CardinalDirection) {
    CardinalDirection[CardinalDirection["North"] = 1] = "North";
    CardinalDirection[CardinalDirection["East"] = 2] = "East";
    CardinalDirection[CardinalDirection["South"] = 3] = "South";
    CardinalDirection[CardinalDirection["West"] = 4] = "West";
})(CardinalDirection || (CardinalDirection = {}));
```

Además de que cada miembro de la enumeración se convierte en una propiedad del objeto (`CardinalDirection["North"] = 1]`), la enumeración también crea una clave para cada número y asigna la cadena como valor. En el caso de `North`, `CardinalDirection["North"] = 1` devuelve el valor `1`, y `CardinalDirection[1] = "North"` asigna el valor `"North"` a la clave `"1"`.

Esto permite una relación bidireccional entre los nombres de los miembros numéricos y sus valores. Para probar esto, registre lo siguiente:


```ts
console.log(CardinalDirection.North)
```

Esto devolverá el valor de la tecla `"North"`:


```sh
Output
1
```

A continuación, ejecute el siguiente código para invertir la dirección de la referencia:


```ts
console.log(CardinalDirection[1])
```

La salida será:


```sh
Output
"North"
```

Para ilustrar el objeto final que representa la enumeración, registre la enumeración completa en la consola:


```ts
console.log(CardinalDirection)
```

Esto mostrará los dos conjuntos de pares clave/valor que crean el efecto de bidireccionalidad:


```sh
Output
{
  "1": "North",
  "2": "East",
  "3": "South",
  "4": "West",
  "North": 1,
  "East": 2,
  "South": 3,
  "West": 4
} 
```

Con una comprensión de cómo funcionan las enumeraciones bajo el capó en TypeScript, ahora pasará a usar enumeraciones para declarar tipos en su código.


## Usando Enumeraciones en TypeScript

En esta sección, probará la sintaxis básica de asignar miembros de enumeración como tipos en su código TypeScript. Esto se puede hacer de la misma manera que se declaran los [tipos básicos](./how-to-use-basic-types.html).

Para usar su enumeración `CardinalDirection` como el tipo de una variable en TypeScript, puede usar el nombre de la enumeración, como se muestra en el siguiente código resaltado:


```ts{8}
enum CardinalDirection {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
};

const direction: CardinalDirection = CardinalDirection.North;
```

Observe que está configurando la variable para que tenga la enumeración como su tipo:


```ts
const direction: CardinalDirection = CardinalDirection.North;
```

También está configurando el valor de la variable para que sea uno de los miembros de la enumeración, en este caso `CardinalDirection.North`. Puede hacer esto porque las enumeraciones se compilan en objetos de JavaScript, por lo que también tienen una representación de valor además de ser tipos.

Si pasa un valor que no es compatible con el tipo de enumeración de su variable `direction`, así:


```ts
const direction: CardinalDirection = false;
```

El Compilador de TypeScript mostrará el error `2322`:


```sh
Output
Type 'false' is not assignable to type 'CardinalDirection'. (2322)
```

Por lo tanto, `direction` solo se puede establecer en un miembro de la enumeración `CardinalDirection`.

También puede establecer el tipo de su variable en un miembro de enumeración específico:


```ts{8}
enum CardinalDirection {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
};

const direction: CardinalDirection.North = CardinalDirection.North;
```

En este caso, la variable solo se puede asignar al miembro `North` de la enumeración `CardinalDirection`.

Si los miembros de su enumeración tienen valores numéricos, también puede establecer el valor de su variable en esos valores numéricos. Por ejemplo, dada la enumeración:


```ts
enum CardinalDirection {
  North = 1,
  East,
  South,
  West,
};
```

Puede establecer el valor de una variable de tipo `CardinalDirection` en `1`:


```ts
const direction: CardinalDirection = 1;
```


Esto es posible porque `1` es el valor del miembro `North` de su enumeración `CardinalDirection`. Esto solo funciona para los miembros numéricos de la enumeración y se basa en la relación bidireccional que tiene el JavaScript compilado para los miembros numéricos de la enumeración, que se trata en la última sección.

Ahora que ha intentado declarar tipos de variables con valores de enumeración, la siguiente sección demostrará una forma específica de manipular enumeraciones: extraer el tipo de objeto subyacente.


## Extraer el Tipo de Objeto de las Enumeraciones

En las secciones anteriores, descubrió que las enumeraciones no son solo una extensión de nivel de tipo en la parte superior JavaScript, sino que tienen valores reales. Esto también significa que la estructura de datos de la enumeración en sí tiene un tipo, que deberá tener en cuenta si intenta establecer un objeto JavaScript que represente una instancia de la enumeración. Para hacer esto, deberá extraer el tipo de la representación del objeto enumerado en sí.

Dada su enumeración `CardinalDirection`:


```ts
enum CardinalDirection {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
};
```


Trate de crear un objeto que coincida con su enumeración, como el siguiente:


```ts
enum CardinalDirection {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
};

const test1: CardinalDirection = {
  North: CardinalDirection.North,
  East: CardinalDirection.East,
  South: CardinalDirection.South,
  West: CardinalDirection.West,
}
```

En este código, `test1` es un objeto de tipo `CardinalDirection` y el valor del objeto incluye todos los miembros de la enumeración. Sin embargo, el Compilador de TypeScript mostrará el error `2322`:


```sh
Output
Type '{ North: CardinalDirection; East: CardinalDirection; South: CardinalDirection; West: CardinalDirection; }' is not assignable to type 'CardinalDirection'.
```

El motivo de este error es que el tipo `CardinalDirection` representa un tipo de unión de todos los miembros de la enumeración, no el tipo del objeto de enumeración en sí. Puede extraer el tipo de objeto usando `typeof` antes del nombre de la enumeración. Compruebe el código resaltado a continuación:


```ts
enum CardinalDirection {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
};

const test1: typeof CardinalDirection = {
  North: CardinalDirection.North,
  East: CardinalDirection.East,
  South: CardinalDirection.South,
  West: CardinalDirection.West,
}
```

El Compilador de TypeScript ahora podrá compilar su código correctamente.

Esta sección mostró una forma específica de ampliar el uso de las enumeraciones. A continuación, trabajará en un caso de uso en el que se aplican las enumeraciones: banderas de bits en el desarrollo de juegos.


## Usando Banderas de Bits con Enumeraciones de TypeScript

En esta última sección del tutorial, analizará un caso de uso tangible para enumeraciones en TypeScript: [banderas de bits](https://en.wikipedia.org/wiki/Bit_field).

Las banderas de bits son una forma de representar diferentes opciones de tipo booleano en una sola variable, mediante el uso de [operaciones _bitwise_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_bitwise_operators). Para que esto funcione, cada bandera debe usar exactamente un bit de un número de 32 bits, ya que este es el valor máximo permitido por JavaScript al realizar operaciones _bitwise_. El número máximo de 32 bits es `2,147,483,647`, que en binario es `11111111111111111111111111111111`, por lo que tiene `31` banderas posibles.


Imagina que estás creando un juego y el jugador puede tener diferentes habilidades, como `SKILL_A`, `SKILL_B` y `SKILL_C`. Para asegurarse de que su programa sepa cuándo un jugador tiene cierta habilidad, puede crear banderas que se puedan activar o desactivar, según el estado del jugador.

Con el siguiente pseudocódigo, asigne a cada bandera de habilidad un valor binario:


```ts
SKILL_A = 0000000000000000000000000000001
SKILL_B = 0000000000000000000000000000010
SKILL_C = 0000000000000000000000000000100
```

Ahora puede almacenar todas las habilidades actuales del jugador en una sola variable, utilizando el operador _bitwise_ `|` (O):


```ts
playerSkills = SKILL_A | SKILL_B
```

En este caso, asignando a un jugador la bandera de bits `0000000000000000000000000000001` y la bandera de bits `0000000000000000000000000000010` con el `|` operador producirá `0000000000000000000000000000011`, que representará que el jugador tiene ambas habilidades.

También puede agregar más habilidades:


```ts
playerSkills |= SKILL_C
```

Esto producirá `0000000000000000000000000000111` para indicar que el jugador tiene las tres habilidades.

También puede eliminar una habilidad usando una combinación de los operadores _bitwise_ `&` (_AND_) y `~` (_NOT_):


```ts
playerSkills &= ~SKILL_C
```

Luego, para verificar si el jugador tiene una habilidad específica, usa el operador _bitwise_ `&` (_AND_):


```ts
hasSkillC = (playerSkills & SKILL_C) == SKILL_C
```

Si el jugador no tiene la habilidad `SKILL_C`, la parte `(playerSkills & SKILL_C)` se evaluará a `0`. De lo contrario, `(playerSkills & SKILL_C)` se evaluará al valor exacto de la habilidad que está probando, que en este caso es `SKILL_C` (`00000000000000000000000000000010`). De esta manera, puede probar que el valor evaluado es el mismo que el valor de la habilidad con la que lo está probando.

Como TypeScript le permite establecer el valor de los miembros de la enumeración en números enteros, puede almacenar esas banderas como una enumeración:


```ts
enum PlayerSkills {
  SkillA = 0b0000000000000000000000000000001,
  SkillB = 0b0000000000000000000000000000010,
  SkillC = 0b0000000000000000000000000000100,
  SkillD = 0b0000000000000000000000000001000,
};
```

Puede usar el prefijo `0b` para representar números binarios directamente. Si no desea utilizar representaciones binarias tan grandes, puede utilizar el operador _bitwise_ `<<` (desplazamiento a la izquierda):


```ts
enum PlayerSkills {
  SkillA = 1 << 0,
  SkillB = 1 << 1,
  SkillC = 1 << 2,
  SkillD = 1 << 3,
};
```

`1 << 0` evaluará a `0b0000000000000000000000000000001`, `1 << 1` a `0b000000000000000000000000000010`, `1 << 2` a `0b00000000000000000000000000000100`, y `1 << 3` a `0b00000000000000000000000000001000`.

Ahora puedes declarar tu variable `playerSkills` así:


```ts
let playerSkills: PlayerSkills = PlayerSkills.SkillA | PlayerSkills.SkillB;
```

:::tip Nota
Debe configurar explícitamente el tipo de la variable `playerSkills` para que sea `PlayerSkills`, de lo contrario, TypeScript inferirá que es del tipo `number`.
:::


Para agregar más habilidades, usaría la siguiente sintaxis:


```ts
playerSkills |= PlayerSkills.SkillC;
```

También puedes eliminar una habilidad:


```ts
playerSkills &= ~PlayerSkills.SkillC;
```

Finalmente, puede verificar si el jugador tiene alguna habilidad dada usando su enumeración:


```ts
const hasSkillC = (playerSkills & PlayerSkills.SkillC) === PlayerSkills.SkillC;
```

Si bien todavía usa banderas de bits debajo del capó, esta solución proporciona una forma más legible y organizada de mostrar los datos. También hace que su código sea más seguro para los tipos al almacenar los valores binarios como constantes en una enumeración y generar errores si la variable `playerSkills` no coincide con un bandera de bit.


## Conclusión

Las enumeraciones son una estructura de datos común en la mayoría de los lenguajes que proporcionan un sistema de tipos, y esto no es diferente en TypeScript. En este tutorial, creó y usó enumeraciones en TypeScript, mientras también atravesó algunos escenarios más avanzados, como extraer el tipo de objeto de una enumeración y usar banderas de bits. Con las enumeraciones, puede hacer que su base de código sea más legible, al mismo tiempo que organiza las constantes en una estructura de datos en lugar de dejarlas en el espacio global.
