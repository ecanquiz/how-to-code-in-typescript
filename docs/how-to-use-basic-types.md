# Cómo Usar Tipos Básicos en TypeScript
:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-basic-types-in-typescript)
:::

## Introducción

[TypeScript](https://www.typescriptlang.org/) es una extensión del lenguaje [JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) que utiliza el tiempo de ejecución de JavaScript con un verificador de tipos en tiempo de compilación. Esta combinación permite a los desarrolladores usar el ecosistema completo de JavaScript y las características del lenguaje, al mismo tiempo que agrega verificación de tipos estáticos opcionales, tipos de datos de enumeración, clases e interfaces. Estas funciones brindan al desarrollador la flexibilidad de la naturaleza dinámica de JavaScript, pero también permiten una base de código más confiable, donde la información de tipo se puede usar en tiempo de compilación para detectar posibles problemas que podrían causar errores u otros comportamientos inesperados en tiempo de ejecución.

La información de tipo adicional también proporciona una mejor documentación de las bases de código e [IntelliSense](https://en.wikipedia.org/wiki/Intelligent_code_completion) mejorado (finalización de código, información de parámetros y funciones de asistencia de contenido similares) en los editores de texto. Los compañeros de equipo pueden identificar exactamente qué tipos se esperan para cualquier variable o parámetro de función, sin tener que pasar por la implementación en sí.

Este tutorial analizará la declaración de tipos y todos los tipos básicos utilizados en TypeScript. Lo guiará a través de ejemplos con diferentes ejemplos de código, que puede seguir junto con su propio entorno TypeScript o [TypeScript Playground](https://www.typescriptlang.org/play?ts=4.2.2#), un entorno en línea que le permite escribir TypeScript directamente en el navegador.

## Declarar Tipos de Variables en TypeScript

Al escribir código en JavaScript, que es un lenguaje puramente dinámico, no puede especificar los tipos de datos de las variables. Usted crea las variables y les asigna un valor, pero no especifica un tipo, como se muestra a continuación:

```js
const language = {
  name: "JavaScript"
};

```

En este bloque de código, `language` es un [objeto](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript) que contiene un valor de cadena para la propiedad `name`. El tipo de valor para `language` y sus propiedades no se establece explícitamente, y esto podría causar confusión más adelante si los futuros desarrolladores no saben a qué tipo de valor se refiere `language`.

TypeScript tiene como beneficio principal un sistema de tipo estricto. Un lenguaje tipificado _estáticamente_ es aquel en el que el tipo de las variables se conoce en el momento de la compilación. En esta sección, probará la sintaxis utilizada para especificar tipos de variables con TypeScript.

Los tipos son información extra que escribes directamente en tu código. El compilador de TypeScript utiliza esta información adicional para imponer el uso correcto de los diferentes valores según su tipo.

Imagina trabajar con un lenguaje dinámico, como JavaScript, y usar una variable `string` como si fuera un `number`. Cuando no tiene pruebas unitarias `strict`, el posible error solo aparecerá durante el tiempo de ejecución. Si usa el sistema de tipos disponible con TypeScript, el compilador no compilaría el código, dando un error como este:

```sh
Output
The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type. (2363)
```

Para declarar una variable con un cierto tipo en TypeScript, use la siguiente sintaxis:

```ts
declarationKeyword variableName: Type
```

`declareKeyword` sería algo así como `let`, `var` o `const`. Esto sería seguido por el nombre de la variable, dos puntos (`:`) y el tipo de esa variable.

Cualquier código que escriba en TypeScript, de alguna manera, ya está usando el sistema de tipos, incluso si no está especificando ningún tipo. Toma este código como ejemplo:

```ts
let language = 'TypeScript';
```

En TypeScript, esto tiene el mismo significado que el siguiente:

```ts
let language: string = 'TypeScript';
```

En el primer ejemplo, no estableció el tipo de la variable `language` en `string`, pero TypeScript infirió el tipo porque asignó un valor de cadena cuando se declaró. En el segundo ejemplo, está configurando explícitamente el tipo de la variable `language` en `string`.

Si usaste `const` en lugar de `let`, sería lo siguiente:

```ts
const language = 'TypeScript';
```

En este caso, TypeScript usaría el literal de cadena `TypeScript` como el tipo de su variable, como si lo hubiera escrito de esta manera:

```ts
const language: 'TypeScript' = 'TypeScript';
```

TypeScript hace esto porque, cuando usa [`const`](https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript#constants), no va a asignar un nuevo valor a la variable después de la declaración, [ya que esto generaría un error](https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript#difference-between-var,-let,-and-const).

:::info Nota
Si está utilizando un editor compatible con TypeScript, al pasar el cursor sobre las variables se mostrará la información de tipo de cada variable.
:::

Si establece explícitamente el tipo de una variable y luego usa un tipo diferente como su valor, el Compilador de TypeScript (`tsc`) o su editor mostrará el error `2322`. Intente ejecutar lo siguiente:

```ts
const myNumber: number = 'look! this is not a number :)';
```

Esto producirá el siguiente error:

```sh
Output
Type 'string' is not assignable to type 'number'. (2322)
```

Ahora que ha probado a configurar el tipo de una variable en TypeScript, la siguiente sección mostrará todos los tipos básicos admitidos por TypeScript.

## Tipos Básicos Utilizados en TypeScript

TypeScript tiene varios tipos básicos que se utilizan como bloques de construcción al crear tipos más complejos. En las siguientes secciones, examinará la mayoría de estos tipos. Tenga en cuenta que la mayoría de las variables que está creando a lo largo de esta sección podrían omitir su tipo porque TypeScript podría inferirlas, pero está siendo explícito acerca de los tipos con fines de aprendizaje.


## `string`

El tipo `string` se usa para tipos de datos textuales, como cadenas literales o [cadenas de plantillas](https://www.digitalocean.com/community/tutorials/understanding-template-literals-in-javascript).

Pruebe el siguiente código:

```ts
const language: string = 'TypeScript';
const message: string = `I'm programming in ${language}!`;
```

En este bloque de código, tanto `language` como `message` tienen asignado el tipo de `string`. El literal de la plantilla sigue siendo una cadena, aunque se determine dinámicamente.

Dado que las cadenas son comunes en la programación de JavaScript, este es probablemente uno de los tipos que más utilizará.

## `boolean`

El tipo booleano se usa para representar `true` o `false`.

Pruebe el código en el siguiente bloque:

```ts
const hasErrors: boolean = true;
const isValid: boolean = false;
```
Since hasErrors and isValid were declared as booleans, they can only be assigned the values true and false. Note that truthy and falsy values are not converted into their boolean equivalents and will throw an error if used with these variables.

Dado que `hasErrors` e `isValid` se declararon como booleanos, solo se les pueden asignar los valores `true` y `false`. Tenga en cuenta que los valores [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) y [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) no se convierten en sus equivalentes booleanos y arrojarán un error si se usan con estas variables.

## `number`

El tipo `number` se utiliza para representar números [enteros y flotantes](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript#numbers), como se muestra a continuación:

```ts
const pi: number = 3.14159;
const year: number = 2021;
```
Este es otro tipo común que se usa con frecuencia en el desarrollo de JavaScript, por lo que esta declaración será común en TypeScript.

## `bigint`

El tipo `bigint` es un tipo que se puede usar cuando se apunta a ES2020. Se usa para representar [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), que es un nuevo tipo de datos para almacenar números enteros mayores que `2^53`.

Prueba el siguiente código:

```ts
const bigNumber: bigint = 9007199254740993n;
```
:::info Nota
Nota: Si este código arroja un error, es posible que TypeScript no esté configurado para apuntar a `ES2020`. Esto se puede cambiar en su [archivo `tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
:::

Si está trabajando con números mayores que `2^53` o con algunas bibliotecas matemáticas, `bigint` será una declaración de tipo común.

## `symbol`

El tipo `symbol` se utiliza para representar el valor primitivo [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol). Esto creará un valor único y sin nombre.

Ejecute el siguiente código usando la función constructora `Symbol()`:

```ts
const mySymbol: symbol = Symbol('unique-symbol-value');
```

La singularidad de estos valores se puede utilizar para evitar colisiones de referencia. Para obtener más información sobre los `symbols` en JavaScript, lea el [artículo sobre `symbols` en Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol).


## Arrays

En TypeScript, los [arrays](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript) se escriben en función de los elementos que se espera que tengan. Hay dos formas de escribir una matriz:

- Agregar `[]` al tipo esperado de los elementos de la matriz. Por ejemplo, si desea escribir una matriz que contenga varios valores tipo `number`, podría hacerlo así:

```ts
const primeNumbers: number[] = [2, 3, 5, 7, 11];
```

Si asignó un valor tipo `string` a esta matriz, TypeScript le daría un error.

- Usando `Array<T>` Generic, donde `T` es el tipo esperado de los elementos en esa matriz. Usando el ejemplo anterior, se convertiría en esto:

```ts
const primeNumbers: Array<number> = [2, 3, 5, 7, 11];
```

Ambas formas son idénticas, así que elija una e intente usar solo ese formato para representar matrices. Esto mantendrá la base de código consistente, lo que a menudo es más importante que elegir un estilo sobre el otro.

Un aspecto importante del uso de variables que contienen matrices en TypeScript es que la mayoría de las veces tendrá que escribirlas. Prueba el siguiente código:

```ts
const myArray = [];
```

TypeScript no puede inferir el tipo correcto esperado por esta matriz. En cambio, usa `any[]`, lo que significa una matriz de cualquier cosa. Esto no es de tipo seguro y podría causar confusión más adelante en su código.

Para que su código sea más robusto, se recomienda ser explícito sobre los tipos de la matriz. Por ejemplo, esto aseguraría que la matriz tenga elementos numéricos:

```ts
const myArray: number[] = [];
```

De esta manera, si intenta insertar un valor no válido en la matriz, TypeScript generará un error. Pruebe el siguiente código:

```ts
const myArray: number[] = [];

myArray.push('some-text');
```

The TypeScript Compiler will show error `2345`:

```sh
Output
Argument of type 'string' is not assignable to parameter of type 'number'. (2345)
```

## Tuplas

Las tuplas son arreglos con un número específico de elementos. Un caso de uso común para esto es almacenar coordenadas 2D en el formato `[x, y]`. Si está trabajando con [React](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-react-js) y usando [Hooks](https://www.digitalocean.com/community/tutorials/how-to-manage-state-with-hooks-on-react-components), el resultado de la mayoría de los Hooks también es una tupla, como `const [isValid, setIsValid] = React.useState(false)`.

Para escribir una tupla, a diferencia de escribir una matriz, envuelve el tipo de los elementos dentro de `[]`, separándolos con comas. Imagina que estás creando una matriz literal con los tipos de los elementos:

```ts
const position: [number, number] = [1, 2];
```

Si intenta pasar menos o más que la cantidad de elementos que espera la tupla, el Compilador de TypeScript mostrará el error `2322`.

Tome el siguiente código, por ejemplo:

```ts
const position: [number, number] = [1, 2, 3];
```

Esto produciría lo siguiente:

```sh
Output
Type '[number, number, number]' is not assignable to type '[number, number]'.
Source has 3 element(s) but target allows only 2. (2322)
```

## `any`

En ciertas situaciones, puede ser demasiado difícil especificar los tipos de un valor, como si ese valor proviene de una biblioteca de terceros o de un código que se escribió inicialmente sin TypeScript. Esto puede ser especialmente común cuando se migra un código base de JavaScript a TypeScript en pequeños pasos. En estos escenarios, es posible usar un tipo especial llamado `any`, que significa cualquier tipo. El uso de `any` significa excluirse de la verificación de tipos y es lo mismo que hacer que el compilador de TypeScript ignore ese valor.

Tome el siguiente bloque de código:

```ts
let thisCanBeAnything: any = 12345;

thisCanBeAnything = "I can be anything - Look, I'm a string now";

thisCanBeAnything = ["Now I'm an array - This is almost like pure JavaScript!"];
```

Ninguna de estas declaraciones dará un error en TypeScript, ya que el tipo se declaró como `any`.

:::info Nota
La mayoría de las veces, si puede, debe evitar usar `any`. Usar esto pierde uno de los principales beneficios de TypeScript: tener un código escrito estáticamente.
:::

## `unknown`

El tipo `unknown` es como una contraparte de tipo seguro de tipo `any`. Puede usar `unknown` cuando desee escribir algo cuyo valor no puede determinar, pero aún desea asegurarse de que cualquier código que use ese valor verifique correctamente el tipo antes de usarlo. Esto es útil para los autores de bibliotecas con funciones en su biblioteca que pueden aceptar una amplia gama de valores de sus usuarios y no desean escribir el valor explícitamente.

Por ejemplo, si tienes una variable llamada `code`:

```ts
let code: unknown;
```
Luego, más adelante en el programa, puede asignar diferentes valores a ese campo, como `35` (`number`), o valores completamente no relacionados, como matrices o incluso objetos.

Pero luego podría asignarlo a una matriz:

```ts
code = [12345];
```

Incluso podría reasignarlo a un objeto:

```ts
code = {};
```

Si más adelante en el código desea comparar ese valor con algún otro `number`, como:

```ts
const isCodeGreaterThan100 = code > 100;
```

El compilador de TypeScript mostrará el error `2571`:

```sh
Output
Object is of type 'unknown'. (2571)
```

Esto sucede porque `code` debe ser un tipo `number` para esta comparación, no un tipo `unknown`. Al realizar cualquier operación con un valor de tipo `unknown`, TypeScript debe asegurarse de que el tipo es el que espera. Un ejemplo de hacer esto es usar el operador `typeof` que ya existe en JavaScript. Examine el siguiente bloque de código:

```ts
if (typeof code === 'number') {
  const isCodeGreaterThan100 = code > 60;
  // ...
} else {
  throw new Error('Invalid value received as code');
}
```

En este ejemplo, está verificando si `code` es un número utilizando el operador `typeof`. Cuando haga eso, TypeScript obligará al tipo de su variable a `number` dentro de ese bloque `if`, porque en tiempo de ejecución, el código dentro del bloque `if` solo se ejecutará si `code` está configurado actualmente en un número. De lo contrario, arrojará un error de JavaScript que indica que el valor pasado no es válido.

Para comprender las diferencias entre el tipo `unknown` y `any`, puede pensar de `unknown` como "No sé el tipo de ese valor" y `any` como "No me importa qué tipo tiene este valor".

## `void`

Puede usar el tipo `void` para definir la variable en cuestión como si no tuviera ningún tipo. Si asigna el resultado de una función que no devuelve ningún valor a una variable, esa variable tendrá el tipo `void`.

Tome el siguiente código:

```ts
function doSomething() {};

const resultOfVoidFunction: void = doSomething();
```

Rara vez tendrá que usar el tipo `void` directamente en TypeScript.

## null y undefined

null and undefined values in TypeScript have their own unique types that are called by the same name:

Los valores `null` y `undefined` en TypeScript tienen sus propios tipos únicos que reciben el mismo nombre:

```ts
const someNullField: null = null;
const someUndefinedField: undefined = undefined;
```

Estos son especialmente útiles al crear sus propios tipos personalizados, que se tratarán más adelante en esta serie.

## `never`

El tipo `never` es el tipo de un valor que nunca existirá. Por ejemplo, imagina que creas una variable numérica:

```ts
const year: number = 2021;
```

Si crea un bloque `if` para ejecutar algún código si `year` no es un `number`, podría ser como el siguiente:

```ts
if (typeof year !== "number") {
  year;
}
```

El tipo de la variable `year` dentro de ese bloque `if` va a ser `never`. Esto se debe a que, dado que `year` se tipea como `number`, nunca se cumplirá la condición para este bloque `if`. Puede pensar en el tipo `never` como un tipo imposible porque esa variable no puede tener un valor en este punto.

## `object`

El tipo de `object` representa cualquier tipo que no sea un tipo primitivo. Esto significa que no es uno de los siguientes tipos:

- `number`
- `string`
- `boolean`
- `bigint`
- `symbol`
- `null`
- `undefined`

El tipo `object` se usa comúnmente para describir literales de objeto porque se le puede asignar cualquier literal de objeto:

```ts
const programmingLanguage: object = {
  name: "TypeScript"
};
```

:::info Nota
Hay un tipo mucho mejor que `object` que podría usarse en este caso llamado `Record`. Esto tiene que ver con la creación de tipos personalizados y se trata en un tutorial posterior de esta serie.
:::

## Conclusión

En este tutorial, probó los diferentes tipos básicos que están disponibles en TypeScript. Estos tipos se usarán con frecuencia cuando se trabaje en una base de código de TypeScript y son los principales bloques de construcción para crear tipos personalizados más complejos.

