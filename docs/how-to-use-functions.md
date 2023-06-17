# Cómo Usar Funciones en TypeScript

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


## Optional Function Parameters in TypeScript

