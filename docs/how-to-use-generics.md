# Cómo Usar Genéricos en TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-generics-in-typescript)
:::

## Introducción

Los genéricos son una característica fundamental de los lenguajes tipificados estáticamente, lo que permite a los desarrolladores pasar [tipos](./how-to-use-basic-types.html) como parámetros a otro tipo, [función](./how-to-use-functions.html) u otra estructura. Cuando un desarrollador convierte su componente en un componente genérico, le da a ese componente la capacidad de aceptar y aplicar la escritura que se pasa cuando se usa el componente, lo que mejora la flexibilidad del código, hace que los componentes sean reutilizables y elimina la duplicación.

[TypeScript](https://www.typescriptlang.org/) es totalmente compatible con los genéricos como una forma de introducir la seguridad de tipos en los componentes que aceptan argumentos y devuelven valores cuyo tipo será indeterminado hasta que se consuman más adelante en su código. En este tutorial, probará ejemplos del mundo real de genéricos de TypeScript y explorará cómo se usan en funciones, tipos, [clases](./how-to-use-classes.html) e [interfaces](how-to-use-interfaces.html). También usará genéricos para crear tipos asignados y tipos condicionales, lo que lo ayudará a crear componentes de TypeScript que tengan la flexibilidad de aplicarse a todas las situaciones necesarias en su código.


## Sintaxis de Genéricos

Antes de entrar en la aplicación de los genéricos, este tutorial primero analizará la sintaxis de los genéricos de TypeScript, seguido de un ejemplo para ilustrar su propósito general.

Los genéricos aparecen en el código TypeScript entre corchetes angulares, en el formato `<T>,`, donde `T` representa un tipo pasado. `<T>` puede leerse como un genérico de tipo `T`. En este caso, `T` operará de la misma manera que los parámetros funcionan en las funciones, como marcadores de posición para un tipo que se declarará cuando se cree una instancia de la estructura. Por lo tanto, los tipos genéricos especificados entre paréntesis angulares también se conocen como _parámetros de tipo genérico_ o simplemente _parámetros de tipo_. También pueden aparecer varios tipos genéricos en una sola definición, como `<T, K, A>`.


:::tip Nota
Por convención, los programadores suelen utilizar una sola letra para nombrar un tipo genérico. Esta no es una regla de sintaxis, y puede nombrar genéricos como cualquier otro tipo en TypeScript, pero esta convención ayuda a transmitir inmediatamente a aquellos que leen su código que un tipo genérico no requiere un tipo específico.
:::

Los genéricos pueden aparecer en funciones, tipos, clases e interfaces. Cada una de estas estructuras se cubrirá más adelante en este tutorial, pero por ahora se usará una función como ejemplo para ilustrar la sintaxis básica de los genéricos.

Para ver cuán útiles son los genéricos, imagine que tiene una [función de JavaScript](https://www.digitalocean.com/community/tutorials/how-to-define-functions-in-javascript) que toma dos parámetros: un [objeto](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript) y una [matriz](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript) de claves. La función devolverá un nuevo objeto basado en el original, pero solo con las claves que desea:


```ts
function pickObjectKeys(obj, keys) {
  let result = {}
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}
```

Este fragmento muestra la función `pickObjectKeys()`, que itera sobre la matriz `keys` y crea un nuevo objeto con las claves especificadas en la matriz.

Aquí hay un ejemplo que muestra cómo usar la función:


```ts
const language = {
  name: "TypeScript",
  age: 8,
  extensions: ['ts', 'tsx']
}

const ageAndExtensions = pickObjectKeys(language, ['age', 'extensions'])
```

Esto declara un `language` objeto, luego aísla la propiedad `age` y `extensions` con la función `pickObjectKeys()`. El valor de `ageAndExtensions` sería el siguiente:


```ts
{
  age: 8,
  extensions: ['ts', 'tsx']
}
```


Si tuviera que migrar este código a TypeScript para hacerlo seguro, tendría que usar genéricos. Puede refactorizar el código agregando las siguientes líneas resaltadas:


```ts{1,2}
function pickObjectKeys<T, K extends keyof T>(obj: T, keys: K[]) {
  let result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

const language = {
  name: "TypeScript",
  age: 8,
  extensions: ['ts', 'tsx']
}

const ageAndExtensions = pickObjectKeys(language, ['age', 'extensions'])
```

`<T, K extends keyof T>` declara dos tipos de parámetros para la función, donde a `K` se le asigna un tipo que es la unión de las claves en `T`. El parámetro de la función `obj` se establece luego en cualquier tipo que `T` represente, y `keys` en una matriz de cualquier tipo que `K` represente. Dado que `T` en el caso del objeto `language` establece `age` como un número y `extensions` como una matriz de cadenas, a la variable `ageAndExtensions` se le asignará ahora el tipo de un objeto con las propiedades `age: number` y `extensions: string[]`.

Esto impone un tipo de devolución basado en los argumentos proporcionados a `pickObjectKeys`, lo que permite a la función la flexibilidad de aplicar una estructura de escritura antes de que sepa el tipo específico que necesita aplicar. Esto también agrega una mejor experiencia de desarrollador cuando usa la función en un IDE como Visual Studio Code, que creará sugerencias para el parámetro `keys` según el objeto que proporcionó. Esto se muestra en la siguiente captura de pantalla:

![how-to-use-generics](./img/how-to-use-generics-1.png)


Con una idea de cómo se crean los genéricos en TypeScript, ahora puede pasar a explorar el uso de genéricos en situaciones específicas. Este tutorial cubrirá primero cómo se pueden usar los genéricos en funciones.


## Usar Genéricos con Funciones

Uno de los escenarios más comunes para usar genéricos con funciones es cuando tiene algún código que no se escribe fácilmente para todos los casos de uso. Para que la función se aplique a más situaciones, puede incluir escritura genérica. En este paso, ejecutará un ejemplo de una función `identity` para ilustrar esto. También explorará un ejemplo asíncrono de cuándo pasar parámetros de tipo directamente a su genérico y cómo crear restricciones y valores predeterminados para sus parámetros de tipo genérico.

## Asignar Parámetros Genéricos

Eche un vistazo a la siguiente función, que devuelve lo que se pasó como primer argumento:


```ts
function identity(value) {
  return value;
}
```

Puede agregar el siguiente código para que la función sea segura en TypeScript:


```ts{1}
function identity<T>(value: T): T {
  return value;
}
```

Convirtió su función en una función genérica que acepta el parámetro de tipo genérico `T`, que es el tipo del primer argumento, luego estableció el tipo de retorno para que sea el mismo con: `T`.

A continuación, agregue el siguiente código para probar la función:


```ts{5}
function identity<T>(value: T): T {
  return value;
}

const result = identity(123);
```

`result` tiene el tipo `123`, que es el número exacto que pasó. TypeScript aquí está infiriendo el tipo genérico del propio código de llamada. De esta forma, el código de llamada no necesita pasar ningún parámetro de tipo. También puede ser explícito y establecer los parámetros de tipo genérico en el tipo que desee:


```ts{5}
function identity<T>(value: T): T {
  return value;
}

const result = identity<number>(123);
```

En este código, `result` tiene el tipo `number`. Al pasar el tipo con el código `<number>`, le está haciendo saber explícitamente a TypeScript que desea que el parámetro de tipo genérico `T` de la función `identity` sea del tipo `number`. Esto hará cumplir el tipo `number` como argumento y el valor de retorno.

## Pasar Parámetros de Tipo Directamente

Pasar parámetros de tipo directamente también es útil cuando se usan tipos personalizados. Por ejemplo, eche un vistazo al siguiente código:


```ts
type ProgrammingLanguage = {
  name: string;
};

function identity<T>(value: T): T {
  return value;
}

const result = identity<ProgrammingLanguage>({ name: "TypeScript" });
```


En este código, `result` tiene el tipo personalizado `ProgrammingLanguage` porque se pasa directamente a la función `identity`. Si no incluyera el parámetro de tipo explícitamente, `result` tendría el tipo `{ name: string }` en su lugar.


Otro ejemplo que es común cuando se trabaja con JavaScript es usar una función contenedora para recuperar datos de una API:


```ts
async function fetchApi(path: string) {
  const response = await fetch(`https://example.com/api${path}`)
  return response.json();
}
```

Esta [función asincrónica](https://www.digitalocean.com/community/tutorials/understanding-the-event-loop-callbacks-promises-and-async-await-in-javascript) toma una ruta de URL como argumento, utiliza la [API fetch](https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data) para realizar una solicitud a la URL y luego devuelve un valor de respuesta [JSON](https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript). En este caso, el tipo de devolución de la función `fetchApi` será `Promise<any>`, que es el tipo de devolución de la llamada `json()` en el objeto `response` de _fetch_.


Tener `any` como tipo de devolución no es muy útil. `any` significa cualquier valor de JavaScript y, al usarlo, pierde la verificación de tipo estática, uno de los principales beneficios de TypeScript. Si sabe que la API va a devolver un objeto en una forma determinada, puede hacer que esta función sea segura para tipos mediante el uso de genéricos:


```ts{1}
async function fetchApi<ResultType>(path: string): Promise<ResultType> {
  const response = await fetch(`https://example.com/api${path}`);
  return response.json();
}
```

El código resaltado convierte su función en una función genérica que acepta el parámetro de tipo genérico `ResultType`. Este tipo genérico se usa en el tipo de devolución de su función: `Promise<ResultType>`.


:::tip Nota
Como su función es `async`, debe devolver un objeto `Promise`. El tipo `Promise` de TypeScript es en sí mismo un tipo genérico que acepta el tipo del valor al que se resuelve la promesa.
:::

Si observa más de cerca su función, verá que el genérico no se usa en la lista de argumentos ni en ningún otro lugar donde TypeScript pueda inferir su valor. Esto significa que el código de llamada debe pasar explícitamente un tipo para este genérico al llamar a su función.

Aquí hay una posible implementación de la función genérica `fetchApi` para recuperar datos de usuario:


```ts{10}
type User = {
  name: string;
}

async function fetchApi<ResultType>(path: string): Promise<ResultType> {
  const response = await fetch(`https://example.com/api${path}`);
  return response.json();
}

const data = await fetchApi<User[]>('/users')

export {}
```

En este código, está creando un nuevo tipo llamado `User` y usando una matriz de ese tipo (`User[]`) como tipo para el parámetro genérico `ResultType`. La variable `data` ahora tiene el tipo `User[]` en lugar de `any`.


:::tip Nota 
Como está utilizando `await` para procesar de forma asíncrona el resultado de su función, el tipo de devolución será el tipo `T` en `Promise<T>`, que en este caso es el tipo genérico `ResultType`.
:::


## Parámetros de Tipo Predeterminados

Al crear su función `fetchApi` genérica como lo está haciendo, el código de llamada siempre tiene que proporcionar el parámetro de tipo. Si el código de llamada no incluye el tipo genérico, `ResultType` estaría vinculado a `unknown`. Tomemos por ejemplo la siguiente implementación:


```ts
async function fetchApi<ResultType>(path: string): Promise<ResultType> {
  const response = await fetch(`https://example.com/api${path}`);
  return 
response.json();
}

const data = await fetchApi('/users')

console.log(data.a)

export {}
```

Este código intenta acceder a una propiedad `a` teórica de `data`. Pero dado que el tipo de `data` es `unknown`, este código no podrá acceder a una propiedad del objeto.

Si no planea agregar un tipo específico a cada llamada de su función genérica, puede agregar un tipo predeterminado al parámetro de tipo genérico. Esto se puede hacer agregando `= DefaultType` justo después del tipo genérico, así:


```ts{1}
async function fetchApi<ResultType = Record<string, any>>(path: string): Promise<ResultType> {
  const response = await fetch(`https://example.com/api${path}`);
  return response.json();
}

const data = await fetchApi('/users')

console.log(data.a)

export {}
```

Con este código, ya no es necesario que pase un tipo al parámetro genérico `ResultType` al llamar a la función `fetchApi`, ya que tiene un tipo predeterminado de `Record<string, any>`. Esto significa que TypeScript reconocerá `data` como un objeto con claves de tipo `string` y valores de tipo `any`, lo que le permitirá acceder a sus propiedades.


## Restricciones de Parámetros de Tipo

En algunas situaciones, un parámetro de tipo genérico necesita permitir que solo ciertas formas pasen al genérico. Para crear esta capa adicional de especificidad para su genérico, puede imponer restricciones a su parámetro.

Imagine que tiene una restricción de almacenamiento en la que solo puede almacenar objetos que tienen valores de cadena para todas sus propiedades. Para eso, puedes crear una función que tome cualquier objeto y devuelva otro objeto con las mismas claves que el original, pero con todos sus valores transformados en cadenas. Esta función se llamará `stringifyObjectKeyValues`.

Esta función va a ser una función genérica. De esta manera, puede hacer que el objeto resultante tenga la misma forma que el objeto original. La función se verá así:


```ts
function stringifyObjectKeyValues<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj).reduce((acc, key) =>  ({
    ...acc,
    [key]: JSON.stringify(obj[key])
  }), {} as { [K in keyof T]: string })
}
```


En este código, `stringifyObjectKeyValues` usa el [método `reduce` de matriz](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-iteration-methods) para iterar sobre una matriz de las claves originales, [encadenando](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) los valores y agregándolos a una nueva matriz.

Para asegurarse de que el código de llamada siempre pase un objeto a su función, está utilizando una restricción de tipo en el tipo `T` genérico, como se muestra en el siguiente código resaltado:


```ts{1}
function stringifyObjectKeyValues<T extends Record<string, any>>(obj: T) {
  // ...
}
```

`extends Record<string, any>` se conoce como restricción de tipo genérico y le permite especificar que su tipo genérico debe ser asignable al tipo que viene después de la palabra clave `extends`. En este caso, `Record<string, any>` indica un objeto con claves de tipo `string` y valores de tipo `any`. Puede hacer que su parámetro de tipo amplíe cualquier tipo de TypeScript válido.

Al llamar a `reduce`, el tipo de retorno de la función reducer se basa en el valor inicial del acumulador. El código `{} as { [K in keyof T]: string }` establece el tipo del valor inicial del acumulador en `{ [K in keyof T]: string }` mediante el uso de una conversión de tipos en un objeto vacío, `{}`. El tipo `{ [K in keyof T]: string }` crea un nuevo tipo con las mismas claves que `T`, pero con todos los valores establecidos para tener el tipo `string`. Esto se conoce como un _tipo mapeado_, que este tutorial explorará más a fondo en una sección posterior.

El siguiente código muestra la implementación de su función `stringifyObjectKeyValues`:


```ts
function stringifyObjectKeyValues<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj).reduce((acc, key) =>  ({
    ...acc,
    [key]: JSON.stringify(obj[key])
  }), {} as { [K in keyof T]: string })
}

const stringifiedValues = stringifyObjectKeyValues({ a: "1", b: 2, c: true, d: [1, 2, 3]})
```

La variable `stringifiedValues` tendrá el siguiente tipo:


```ts
{
  a: string;
  b: string;
  c: string;
  d: string;
}
```

Esto asegurará que el valor de retorno sea consistente con el propósito de la función.

Esta sección cubrió múltiples formas de usar genéricos con funciones, incluida la asignación directa de parámetros de tipo y la creación de valores predeterminados y restricciones a la forma del parámetro. A continuación, verá algunos ejemplos de cómo los genéricos pueden hacer que las interfaces y las clases se apliquen a más situaciones.

## Usar Genéricos con Interfaces, Clases y Tipos

Al crear [interfaces](./how-to-use-interfaces.html) y [clases](./how-to-use-classes.html) en TypeScript, puede resultar útil utilizar parámetros de tipo genérico para establecer la forma de los objetos resultantes. Por ejemplo, una clase podría tener propiedades de diferentes tipos según lo que se pase al constructor. En esta sección, verá la sintaxis para declarar parámetros de tipo genérico en clases e interfaces y examinará un caso de uso común en aplicaciones HTTP.

## Interfaces y Clases Genéricas

Para crear una interfaz genérica, puede agregar la lista de parámetros de tipo justo después del nombre de la interfaz:


```ts{1,2}
interface MyInterface<T> {
  field: T
}
```

Esto declara una interfaz que tiene una propiedad `field` cuyo tipo está determinado por el tipo pasado a `T`.


Para las clases, es casi la misma sintaxis:


```ts{1,2,3}
class MyClass<T> {
  field: T
  constructor(field: T) {
    this.field = field
  }
}
```

Un caso de uso común de interfaces/clases genéricas es cuando tiene un campo cuyo tipo depende de cómo el código del cliente usa la interfaz/clase. Digamos que tiene una clase `HttpApplication` que se usa para manejar solicitudes HTTP a su API, y que algún valor de contexto se pasará a cada controlador (_handler_) de solicitudes. Una de esas formas de hacer esto sería:


```ts
class HttpApplication<Context> {
  context: Context
  constructor(context: Context) {
    this.context = context;
  }

  // ... implementation

  get(url: string, handler: (context: Context) => Promise<void>): this {
    // ... implementation
    return this;
  }
}
```

Esta clase almacena un `context` cuyo tipo se pasa como el tipo del argumento para la función `handler` en el método `get`. Durante el uso, el tipo de parámetro que se pasa al controlador `get` se deducirá correctamente de lo que se pasa al constructor de la clase.


```ts
...
const context = { someValue: true };
const app = new HttpApplication(context);

app.get('/api', async () => {
  console.log(context.someValue)
});
```

En esta implementación, TypeScript inferirá el tipo de `context.someValue` como `boolean`.


## Tipos Genéricos

Habiendo visto algunos ejemplos de genéricos en clases e interfaces, ahora puede pasar a crear tipos personalizados genéricos. La sintaxis para aplicar genéricos a tipos es similar a cómo se aplican a interfaces y clases. Echa un vistazo al siguiente código:


```ts
type MyIdentityType<T> = T
```

Este tipo genérico devuelve el tipo que se pasa como parámetro de tipo. Imagina que implementaste este tipo con el siguiente código:


```ts
...
type B = MyIdentityType<number>
```

En este caso, el tipo `B` sería de tipo `number`.

Los tipos genéricos se usan comúnmente para crear tipos auxiliares, especialmente cuando se usan tipos asignados. TypeScript proporciona muchos tipos de ayuda prediseñados. Un ejemplo de ello es el tipo `Partial`, que toma un tipo `T` y devuelve otro tipo con la misma forma que `T`, pero con todos sus campos configurados como opcionales. La implementación de `Partial` se ve así:


```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

El tipo `Partial` aquí toma un tipo, itera sobre sus tipos de propiedad y luego los devuelve como opcionales en un nuevo tipo.


:::tip Nota
Dado que `Partial` ya está integrado en TypeScript, compilar este código en su entorno de TypeScript volvería a declarar `Partial` y generaría un error. La implementación de `Partial` citada aquí es solo para fines ilustrativos.
:::


Para ver cuán poderosos son los tipos genéricos, imagine que tiene un objeto literal que almacena los costos de envío de una tienda a todas las demás tiendas en su red de distribución comercial. Cada tienda estará identificada por un código de tres caracteres, así:


```ts
{
  ABC: {
    ABC: null,
    DEF: 12,
    GHI: 13,
  },
  DEF: {
    ABC: 12,
    DEF: null,
    GHI: 17,
  },
  GHI: {
    ABC: 13,
    DEF: 17,
    GHI: null,
  },
}
```


Este objeto es una colección de objetos que representan la ubicación de la tienda. Dentro de la ubicación de cada tienda, hay propiedades que representan el costo de envío a otras tiendas. Por ejemplo, el costo de envío de `ABC` a `DEF` es `12`. El costo de envío de una tienda a sí misma es `null`, ya que no habrá ningún envío.


Para asegurarse de que las ubicaciones de otras tiendas tengan un valor constante y que el envío de una tienda a sí misma sea siempre `null`, puede crear un tipo auxiliar genérico:


```ts
type IfSameKeyThanParentTOtherwiseOtherType<Keys extends string, T, OtherType> = {
  [K in Keys]: {
    [SameThanK in K]: T;
  } &
    { [OtherThanK in Exclude<Keys, K>]: OtherType };
};
```

El tipo `IfSameKeyThanParentTOtherwiseOtherType` recibe tres tipos genéricos. La primera, `Keys`, son todas las claves que desea asegurarse de que tiene su objeto. En este caso se trata de una unión de todos los códigos de las tiendas. `T` es el tipo para cuando el campo de objeto anidado tiene la misma clave que la clave en el objeto principal, que en este caso representa una ubicación de tienda que se envía a sí misma. Finalmente, `OtherType` es el tipo para cuando la clave es diferente, representando un envío de tienda a otra tienda.

Puedes usarlo así:


```ts
...
type Code = 'ABC' | 'DEF' | 'GHI'

const shippingCosts: IfSameKeyThanParentTOtherwiseOtherType<Code, null, number> = {
  ABC: {
    ABC: null,
    DEF: 12,
    GHI: 13,
  },
  DEF: {
    ABC: 12,
    DEF: null,
    GHI: 17,
  },
  GHI: {
    ABC: 13,
    DEF: 17,
    GHI: null,
  },
}
```

Este código ahora aplica la forma del tipo. Si establece alguna de las claves en un valor no válido, TypeScript nos dará un error:


```ts{4}
...
const shippingCosts: IfSameKeyThanParentTOtherwiseOtherType<Code, null, number> = {
  ABC: {
    ABC: 12,
    DEF: 12,
    GHI: 13,
  },
  DEF: {
    ABC: 12,
    DEF: null,
    GHI: 17,
  },
  GHI: {
    ABC: 13,
    DEF: 17,
    GHI: null,
  },
}
```


Dado que el costo de envío entre `ABC` y él mismo ya no es `null`, TypeScript arrojará el siguiente error:


```sh
Output
Type 'number' is not assignable to type 'null'.(2322)
```

Ya ha probado el uso de genéricos en interfaces, clases y tipos _helper_ personalizados. A continuación, explorará más a fondo un tema que ya ha surgido varias veces en este tutorial: crear tipos mapeados con genéricos.


## Creating Mapped Types with Generics




