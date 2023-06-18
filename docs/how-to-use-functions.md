# Cómo Usar Funciones en TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-functions-in-typescript)
:::

## Introducción
Crear y usar funciones es un aspecto fundamental de cualquier lenguaje de programación, y [TypeScript](https://www.typescriptlang.org/) no es diferente. TypeScript es totalmente compatible con la existente [sintaxis para funciones de JavaScript](https://www.digitalocean.com/community/tutorials/how-to-define-functions-in-javascript), al tiempo que agrega [información de tipo](./how-to-use-basic-types.html) y [sobrecarga de funciones](https://en.wikipedia.org/wiki/Function_overloading) como nuevas características. Además de proporcionar documentación adicional a la función, la información de tipo también reduce las posibilidades de errores en el código porque existe un menor riesgo de pasar tipos de datos no válidos a una función de tipo seguro.

En este tutorial, comenzará creando las funciones más básicas con información de tipo, luego pasará a escenarios más complejos, como el uso de [resto de parámetros](https://www.digitalocean.com/community/tutorials/understanding-destructuring-rest-parameters-and-spread-syntax-in-javascript) y la sobrecarga de funciones. Probarás diferentes ejemplos de código, que puedes seguir en tu propio entorno de TypeScript o en [TypeScript Playground](https://www.typescriptlang.org/play?ts=4.2.2#), un entorno en línea que te permite escribir TypeScript directamente en el navegador.

## Creación de Funciones Tipificadas

En esta sección, creará funciones en TypeScript y luego les agregará información de tipo.

En JavaScript, las funciones se pueden declarar de varias maneras. Una de las más populares es usar la palabra clave `function`, como se muestra a continuación:

```js
function sum(a, b) {
  return a + b;
}
```

En este ejemplo, `sum` es el nombre de la función, `(a, b)` son los argumentos y `{return a + b;}` es el cuerpo de la función.

La sintaxis para crear funciones en TypeScript es la misma, excepto por una adición importante: puede informar al compilador qué tipos debe tener cada argumento o parámetro. El siguiente bloque de código muestra la sintaxis general para esto, con las declaraciones de tipo resaltadas:

```ts{1}
function functionName(param1: Param1Type, param2: Param2Type): ReturnType {
  // ... body of the function
}
```

Con esta sintaxis, puede agregar tipos a los parámetros de la función `sum` que se mostró anteriormente. Esto asegura que `a` y `b` sean valores `number`. También puede agregar el tipo del valor devuelto:

```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

Ahora TypeScript esperará que la función `sum` devuelva un valor numérico. Si llama a su función con algunos parámetros y almacena el valor del resultado en una variable llamada `result`:


```ts
const result = sum(1, 2);
```

La variable `result` tendrá el tipo `number`. Si está utilizando el playground de TypeScript o está utilizando un editor de texto que es totalmente compatible con TypeScript, al pasar el cursor sobre `result` se mostrará `const result: number`, lo que muestra que TypeScript ha implícito su tipo de la declaración de la función.

Si llamó a su función con un valor que tiene un tipo diferente al esperado por su función, el Compilador de TypeScript (`tsc`) le daría el error `2345`. Realice la siguiente llamada a la función `sum`:


```ts
sum('shark', 'whale');
```

Esto daría lo siguiente:


```sh
Output
Argument of type 'string' is not assignable to parameter of type 'number'. (2345)
```

Puede usar cualquier tipo en sus funciones, no solo [tipos básicos](./how-to-use-basic-types.html). Por ejemplo, imagine que tiene un tipo `User` que se ve así:

```ts
type User = {
  firstName: string;
  lastName: string;
};
```

Podría crear una función que devuelva el nombre completo del usuario como la siguiente:


```ts
function getUserFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
```

La mayoría de las veces, TypeScript es lo suficientemente inteligente como para inferir el tipo de devolución de las funciones, por lo que puede eliminar el tipo de devolución de la declaración de la función en este caso:


```ts
function getUserFullName(user: User) {
  return `${user.firstName} ${user.lastName}`;
}
```

Observe que eliminó la parte de `: string`, que era el tipo de retorno de su función. Como está devolviendo una cadena en el cuerpo de su función, TypeScript asume correctamente que su función tiene un tipo de retorno de cadena.

Para llamar a su función ahora, debe pasar un objeto que tenga la misma forma que el tipo `User`:

```ts
type User = {
  firstName: string;
  lastName: string;
};

function getUserFullName(user: User) {
  return `${user.firstName} ${user.lastName}`;
}

const user: User = {
  firstName: "Jon",
  lastName: "Doe"
};

const userFullName = getUserFullName(user);
```

Este código pasará con éxito el verificador de tipos de TypeScript. Si pasa el cursor sobre la constante `userFullName` en su editor, el editor identificará su tipo como `string`.


## Parámetros de Funciones Opcionales en TypeScript

Tener todos los parámetros no siempre es necesario al crear funciones. En esta sección, aprenderá cómo marcar los parámetros de función como opcionales en TypeScript.

Para convertir un parámetro de función en uno opcional, agregue el modificador `?` justo después del nombre del parámetro. Dado un parámetro de función `param1` con tipo `T`, puede hacer que `param1` sea un parámetro opcional agregando `?`, como se destaca a continuación:


```ts
param1?: T
```

Por ejemplo, agregue un parámetro `prefix` opcional a su función `getUserFullName`, que es una cadena opcional que se puede agregar como prefijo al nombre completo del usuario:


```ts{6,7}
type User = {
  firstName: string;
  lastName: string;
};

function getUserFullName(user: User, prefix?: string) {
  return `${prefix ?? ''}${user.firstName} ${user.lastName}`;
}
```

En la primera parte resaltada de este bloque de código, está agregando un parámetro de prefijo opcional a su función, y en la segunda parte resaltada, está anteponiendo el nombre completo del usuario. Para hacer eso, está utilizando el [operador coalescente nulo `??`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing). De esta manera, solo usará el valor del prefijo si está definido; de lo contrario, la función utilizará una cadena vacía.

Ahora puede llamar a su función con o sin el parámetro de prefijo, como se muestra a continuación:


```ts
type User = {
  firstName: string;
  lastName: string;
};

function getUserFullName(user: User, prefix?: string) {
  return `${prefix ?? ''} ${user.firstName} ${user.lastName}`;
}

const user: User = {
  firstName: "Jon",
  lastName: "Doe"
};

const userFullName = getUserFullName(user);
const mrUserFullName = getUserFullName(user, 'Mr. ');
```

En este caso, el valor de `userFullName` será `Jon Doe` y el valor de `mrUserFullName` será `Mr. Jon Doe`.

Tenga en cuenta que no puede agregar un parámetro opcional antes de uno requerido; debe aparecer en último lugar en la serie, como se hace con `(user: User, prefix?: string)`. Enumerarlo primero haría que el compilador de TypeScript devolviera el error `1016`:


```sh
Output
A required parameter cannot follow an optional parameter. (1016)
```

## Expresiones de Funciones de Flecha Tipadas

Hasta ahora, este tutorial ha mostrado cómo escribir funciones normales en TypeScript, definidas con la palabra clave `function`. Pero en JavaScript, puede definir una función en más de una forma, como con [funciones de flecha](https://www.digitalocean.com/community/tutorials/understanding-arrow-functions-in-javascript). En esta sección, agregará tipos a las funciones de flecha en TypeScript.

La sintaxis para agregar tipos a las funciones de flecha es casi la misma que para agregar tipos a las funciones normales. Para ilustrar esto, cambie su función `getUserFullName` a una expresión de función de flecha:


```ts
const getUserFullName = (user: User, prefix?: string) =>
  `${prefix ?? ''}${user.firstName} ${user.lastName}`;
```


Si quisiera ser explícito sobre el tipo de retorno de su función, lo agregaría después de `()`, como se muestra en el código resaltado en el siguiente bloque:


```ts
const getUserFullName = (user: User, prefix?: string): string =>
  `${prefix ?? ''}${user.firstName} ${user.lastName}`;
```

Ahora puede usar su función exactamente como antes:


```ts
type User = {
  firstName: string;
  lastName: string;
};

const getUserFullName = (user: User, prefix?: string) =>
  `${prefix ?? ''}${user.firstName} ${user.lastName}`;

const user: User = {
  firstName: "Jon",
  lastName: "Doe"
};

const userFullName = getUserFullName(user);
```

Esto pasará el verificador de tipos de TypeScript sin ningún error.

:::tip Nota
Recuerda que todo lo que vale para funciones en JavaScript también vale para funciones en TypeScript. Para repasar estas reglas, consulte nuestro tutorial [Cómo Definir Funciones en JavaScript](https://www.digitalocean.com/community/tutorials/how-to-define-functions-in-javascript).
:::

## Tipos de Función

En las secciones anteriores, agregó tipos a los parámetros y valores devueltos para funciones en TypeScript. En esta sección, aprenderá a crear tipos de función, que son tipos que representan una firma de función específica. Crear un tipo que coincida con una función específica es especialmente útil cuando se pasan funciones a otras funciones, como tener un parámetro que es en sí mismo una función. Este es un patrón común cuando se crean funciones que aceptan [devoluciones de llamada](https://www.digitalocean.com/community/tutorials/understanding-the-event-loop-callbacks-promises-and-async-await-in-javascript).

La sintaxis para crear su tipo de función es similar a la creación de una función de flecha, con dos diferencias:

- Eliminas el cuerpo de la función.
- Haces que la declaración de la función devuelva el tipo `return` en sí.

Así es como crearía un tipo que coincida con la función `getUserFullName` que ha estado usando:


```ts{6}
type User = {
  firstName: string;
  lastName: string;
};

type PrintUserNameFunction = (user: User, prefix?: string) => string;
```

En este ejemplo, usó la palabra clave `type` para declarar un nuevo tipo, luego proporcionó el tipo para los dos parámetros entre paréntesis y el tipo para el valor devuelto después de la flecha.

Para un ejemplo más concreto, imagine que está creando una [funcion detectora de eventos](https://www.digitalocean.com/community/tutorials/understanding-events-in-javascript) llamada `onEvent`, que recibe como primer parámetro el nombre del evento y como segundo parámetro la devolución de llamada del evento. La devolución de llamada del evento en sí recibiría como primer parámetro un objeto con el siguiente tipo:


```ts
type EventContext = {
  value: string;
};
```

Luego puede escribir su función `onEvent` de esta manera:


```ts{7}
type EventContext = {
  value: string;
};

function onEvent(
  eventName: string,
  eventCallback: (target: EventContext) => void
) {
  // ... implementation
}
```

Tenga en cuenta que el tipo del parámetro `eventCallback` es un tipo de función:


```ts
eventCallback: (target: EventTarget) => void
```


Esto significa que su función `onEvent` espera que se pase otra función en el parámetro `eventCallback`. Esta función debería aceptar un solo argumento del tipo `EventTarget`. El tipo de retorno de esta función es ignorado por su función `onEvent`, por lo que está utilizando [`void`](./how-to-use-basic-types.html) como tipo.

## Using Typed Asynchronous Functions






