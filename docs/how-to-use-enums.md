# Cómo Usar Enumeraciones en TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-enums-in-typescript)
:::

## Introducción

En [TypeScript](https://www.typescriptlang.org/), las _enumeraciones_ o tipos enumerados son estructuras de datos de longitud constante que contienen un conjunto de valores constantes. Cada uno de estos valores constantes se conoce como _miembro_ de la enumeración. Las enumeraciones son útiles cuando se establecen propiedades o valores que solo pueden ser una cierta cantidad de valores posibles. Un ejemplo común es el valor del palo de una sola carta en una baraja de cartas. Cada carta que se saque será un trébol, un diamante, un corazón o una espada; no hay valores de palo posibles más allá de estos cuatro, y es probable que estos valores posibles no cambien. Debido a esto, una enumeración sería una forma eficiente y clara de describir los posibles palos de una carta.

Mientras que la mayoría de las funciones de TypeScript son útiles para generar errores durante la compilación, las enumeraciones también son útiles como estructuras de datos que pueden contener constantes para su código. TypeScript traduce enumeraciones en [objetos JavaScript](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript) en el código final emitido por el compilador. Debido a esto, puede usar enumeraciones para hacer que una base de código sea más legible, ya que puede tener múltiples valores constantes agrupados en la misma estructura de datos, al mismo tiempo que hace que el código sea más seguro para los tipos que simplemente tener diferentes variables `const` por ahí.

Este tutorial explicará la sintaxis que se usa para crear tipos de enumeración, el código JavaScript que el compilador de TypeScript crea bajo el capó, cómo extraer el tipo de objeto de enumeración y un caso de uso para enumeraciones que involucra indicadores de bits en el desarrollo de juegos.

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

El compilador de TypeScript asigna de forma predeterminada números a los miembros de la enumeración, pero puede anular esto para crear una enumeración de cadena. Estas son enumeraciones que tienen valores de cadena para cada miembro; estos son útiles cuando el valor debe tener un cierto significado legible por humanos, como si necesita leer el valor en un registro o mensaje de error más adelante.

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


Este se convierte en el siguiente código cuando se compila en JavaScript utilizando el compilador de TypeScript:


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


## Using Enums in TypeScript
