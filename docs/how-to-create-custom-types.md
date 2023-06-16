# Cómo Crear Tipos Personalizados en TypeScript 

## Introducción

[TypeScript](https://www.typescriptlang.org/) es una extensión del lenguaje [JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) que utiliza el tiempo de ejecución de JavaScript con un verificador de tipos en tiempo de compilación. Esta combinación permite a los desarrolladores usar el ecosistema completo de JavaScript y las características del lenguaje, al mismo tiempo que agregan verificación de tipo estático, enumeraciones, clases e interfaces opcionales.

Aunque los prefabricados [tipos básicos en TypeScript](https://www.digitalocean.com/community/tutorials/how-to-use-basic-types-in-typescript) cubrirán muchos casos de uso, la creación de sus propios tipos personalizados basados en estos tipos básicos le permitirá asegurarse de que el verificador de tipos valide las estructuras de datos específicas de su proyecto. Esto reducirá la posibilidad de errores en su proyecto, al tiempo que permitirá una mejor documentación de las estructuras de datos utilizadas en todo el código.

Este tutorial le mostrará cómo usar tipos personalizados con TypeScript, cómo componer esos tipos junto con uniones e intersecciones, y cómo usar tipos de utilidad para agregar flexibilidad a sus tipos personalizados. Lo guiará a través de diferentes ejemplos de código, que puede seguir en su propio entorno de TypeScript o en [TypeScript Playground](https://www.typescriptlang.org/play?ts=4.2.2#), un entorno en línea que le permite escribir TypeScript directamente en el navegador.

## Creación de Tipos Personalizados

En los casos en que los programas tienen estructuras de datos complejas, es posible que el uso de los tipos básicos de TypeScript no describa completamente las estructuras de datos que está utilizando. En estos casos, declarar su propio tipo lo ayudará a abordar la complejidad. En esta sección, creará tipos que se pueden usar para describir cualquier forma de objeto que necesite usar en su código.

## Sintaxis de Tipo Personalizado

En TypeScript, la sintaxis para crear tipos personalizados es usar la palabra clave `type` seguida del nombre del tipo y luego una asignación a un bloque `{}` con las propiedades del tipo. Toma lo siguiente:

```ts
type Programmer = {
  name: string;
  knownFor: string[];
};
```

La sintaxis se asemeja a un objeto literal, donde la clave es el nombre de la propiedad y el valor es el tipo que debería tener esta propiedad. Esto define un tipo programador `Programmer` que debe ser un [objeto](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript) con la clave `name` que contiene un valor de cadena y una clave `knownFor` que contiene una matriz de cadenas.

Como se muestra en el ejemplo anterior, puede usar punto y coma (`;`) como separador entre cada propiedad. También es posible usar una coma (`,`), u omitir por completo el separador, como se muestra aquí:

```ts
type Programmer = {
  name: string
  knownFor: string[]
};
```

Usar su tipo personalizado es lo mismo que usar cualquiera de los tipos básicos. Agregue dos puntos dobles y luego agregue su nombre de tipo:

```ts{6}
type Programmer = {
  name: string;
  knownFor: string[];
};

const ada: Programmer = {
  name: 'Ada Lovelace',
  knownFor: ['Mathematics', 'Computing', 'First Programmer']
};
```

La constante `ada` ahora pasará el verificador de tipos sin arrojar un error.

Si escribe este ejemplo en cualquier editor con soporte completo de TypeScript, como TypeScript Playground, el editor sugerirá los campos esperados por ese objeto y sus tipos, como se muestra en la siguiente animación:

![how-to-create-custom-types](./img/how-to-create-custom-types-1.gif)

Si agrega comentarios a los campos usando el formato [TSDoc](https://tsdoc.org/), un estilo popular de documentación de comentarios de TypeScript, también se sugieren en la finalización del código. Tome el siguiente código con explicaciones en los comentarios:

```ts
type Programmer = {
  /**
   * The full name of the Programmer
   */
  name: string;
  /**
   * This Programmer is known for what?
   */
  knownFor: string[];
};

const ada: Programmer = {
  name: 'Ada Lovelace',
  knownFor: ['Mathematics', 'Computing', 'First Programmer']
};
```

Las descripciones comentadas ahora aparecerán con las sugerencias de campo:

![how-to-create-custom-types](./img/how-to-create-custom-types-2.gif)

Al crear un objeto con el tipo personalizado `Programmer`, si asigna un valor con un tipo inesperado a cualquiera de las propiedades, TypeScript arrojará un error. Tome el siguiente bloque de código, con una línea resaltada que no se adhiere a la declaración de tipo:

```ts{7}
type Programmer = {
  name: string;
  knownFor: string[];
};

const ada: Programmer = {
  name: true,
  knownFor: ['Mathematics', 'Computing', 'First Programmer']
};
```

El compilador de TypeScript (`tsc`) mostrará el error `2322`:


```sh
Output
Type 'boolean' is not assignable to type 'string'. (2322)
```

Si omitió alguna de las propiedades requeridas por su tipo, como a continuación:


```ts
type Programmer = {
  name: string;
  knownFor: string[];
};

const ada: Programmer = {
  name: 'Ada Lovelace'
};
```

El compilador de TypeScript dará el error `2741`:


```ts
Output
Property 'knownFor' is missing in type '{ name: string; }' but required in type 'Programmer'. (2741)
```

Agregar una nueva propiedad no especificada en el tipo original también generará un error:


```ts{9}
type Programmer = {
  name: string;
  knownFor: string[];
};

const ada: Programmer = {
  name: "Ada Lovelace",
  knownFor: ['Mathematics', 'Computing', 'First Programmer'],
  age: 36
};
```

En este caso, el error que se muestra es el `2322`:


```sh
Output
Type '{ name: string; knownFor: string[]; age: number; }' is not assignable to type 'Programmer'.
Object literal may only specify known properties, and 'age' does not exist in type 'Programmer'.(2322)
```

## Tipos Personalizados Anidados

También puede anidar tipos personalizados juntos. Imagine que tiene un tipo de `Company` que tiene un campo `manager` que se adhiere a un tipo de `Person`. Podrías crear esos tipos así:

```ts
type Person = {
  name: string;
};

type Company = {
  name: string;
  manager: Person;
};
```

Entonces podrías crear un valor de tipo `Company` como este:


```ts
const manager: Person = {
  name: 'John Doe',
}

const company: Company = {
  name: 'ACME',
  manager,
}
```

Este código pasaría el verificador de tipos, ya que la constante `manager` se ajusta al tipo designado para el campo `manager`. Tenga en cuenta que esto usa [la abreviatura de propiedad de objeto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#property_definitions) para declarar `manager`.


Puede omitir el tipo en la constante `manager` porque tiene la misma forma que el tipo `Person`. TypeScript no generará un error cuando use un objeto con la misma forma que la esperada por el tipo de la propiedad `manager`, incluso si no está configurado explícitamente para tener el tipo `Person`.

Lo siguiente no arrojará un error:


```ts
const manager = {
  name: 'John Doe'
}

const company: Company = {
  name: 'ACME',
  manager
}
```

Incluso puede ir un paso más allá y configurar el `manager` directamente dentro de este literal de objeto de `company`:


```ts
const company: Company = {
  name: 'ACME',
  manager: {
    name: 'John Doe'
  }
};
```

Todos estos escenarios son válidos.

Si escribe estos ejemplos en un editor compatible con TypeScript, encontrará que el editor utilizará la información de tipo disponible para documentarse. Para el ejemplo anterior, tan pronto como abra el literal de objeto `{}` para `manager`, el editor esperará una propiedad `name` de tipo `string`:

![how-to-create-custom-types](./img/how-to-create-custom-types-3.png)


Ahora que ha visto algunos ejemplos de cómo crear su propio tipo personalizado con un número fijo de propiedades, a continuación intentará agregar propiedades opcionales a sus tipos.


## Propiedades Opcionales

Con la declaración de tipo personalizado en las secciones anteriores, no puede omitir ninguna de las propiedades al crear un valor con ese tipo. Sin embargo, hay algunos casos que requieren propiedades opcionales que pueden pasar el verificador de tipos con o sin el valor. En esta sección, declarará estas propiedades opcionales.

Para agregar propiedades opcionales a un tipo, agregue el modificador de la propiedad `?`. Usando el tipo `Programmer` de las secciones anteriores, convierta la propiedad `knownFor` en una propiedad opcional agregando el siguiente carácter resaltado:

```{3}ts
type Programmer = {
  name: string;
  knownFor?: string[];
};
```

Aquí estás agregando el modificador `?` después del nombre de la propiedad. Esto hace que TypeScript considere esta propiedad como opcional y no genere un error cuando omite esa propiedad:


```ts
type Programmer = {
  name: string;
  knownFor?: string[];
};

const ada: Programmer = {
  name: 'Ada Lovelace'
};
```

Esto pasará sin un error.

Ahora que sabe cómo agregar propiedades opcionales a un tipo, es hora de aprender a crear un tipo que pueda contener una cantidad ilimitada de campos.

## Tipos Indexables

Los ejemplos anteriores mostraron que no puede agregar propiedades a un valor de un tipo determinado si ese tipo no especifica esas propiedades cuando se declaró. En esta sección, creará _tipos indexables_, que son tipos que permiten cualquier cantidad de campos si siguen la firma de índice del tipo.

Imagine que tiene un tipo `Data` para contener un número ilimitado de propiedades de tipo `any`. Podría declarar este tipo así:

```ts
type Data = {
  [key: string]: any;
};
```

Aquí crea un tipo normal con el bloque de definición de tipo entre corchetes (`{}`), y luego agrega una propiedad especial en el formato de `[key: typeOfKeys]: typeOfValues`, donde `typeOfKeys` es el tipo que deben tener las claves de ese objeto, y `typeOfValues` es el tipo que deben tener los valores de esas claves.

Luego puede usarlo normalmente como cualquier otro tipo:


```ts
type Data = {
  [key: string]: any;
};

const someData: Data = {
  someBooleanKey: true,
  someStringKey: 'text goes here'
  // ...
}
```

Al usar tipos indexables, puede asignar un número ilimitado de propiedades, siempre que coincidan con la _firma del índice_, que es el nombre que se usa para describir los tipos de claves y valores de un tipo indexable. En este caso, las claves tienen un tipo `string` y los valores tienen tipo `any`.

También es posible agregar propiedades específicas que siempre se requieren para su tipo indexable, tal como lo haría con un tipo normal. En el siguiente código resaltado, está agregando la propiedad `status` a su tipo `Data`:


```ts
type Data = {
  status: boolean;
  [key: string]: any;
};

const someData: Data = {
  status: true,
  someBooleanKey: true,
  someStringKey: 'text goes here'
  // ...
}
```

Esto significaría que un objeto de tipo `Data` debe tener una clave `status` con un valor `boolean` para pasar el verificador de tipo.

Ahora que puede crear un objeto con diferentes cantidades de elementos, puede continuar con el aprendizaje de las matrices en TypeScript, que pueden tener una cantidad personalizada de elementos o más.

## Creación de Matrices con Número de Elementos o Más

Usando los [tipos básicos de matriz y tupla](./how-to-use-basic-types.html#tipos-basicos-utilizados-en-typescript) disponibles en TypeScript, puede crear tipos personalizados para matrices que deben tener una cantidad mínima de elementos. En esta sección, utilizará el [rest operator](https://www.digitalocean.com/community/tutorials/understanding-destructuring-rest-parameters-and-spread-syntax-in-javascript#rest-parameters) `...` de TypeScript para hacer esto.

Imagina que tienes una función responsable de fusionar varias cadenas. Esta función tomará un solo parámetro de matriz. Esta matriz debe tener al menos dos elementos, cada uno de los cuales debe ser una cadena. Puede crear un tipo como este con lo siguiente:

```ts
type MergeStringsArray = [string, string, ...string[]];
```

El tipo `MergeStringsArray` aprovecha el hecho de que puede usar el _rest operator_ con un tipo de matriz y usa el resultado como el tercer elemento de una tupla. Esto significa que se requieren las dos primeras cadenas, pero no se requieren elementos de cadena adicionales posteriores.

Si una matriz tiene menos de dos elementos de cadena, no será válida, como la siguiente:

```ts
const invalidArray: MergeStringsArray = ['some-string']
```

El compilador de TypeScript dará el error `2322` al verificar esta matriz:


```sh
Output
Type '[string]' is not assignable to type 'MergeStringsArray'.
Source has 1 element(s) but target requires 2. (2322)
```

Hasta este momento, ha creado sus propios tipos personalizados a partir de una combinación de tipos básicos. En la siguiente sección, creará un nuevo tipo al componer dos o más tipos personalizados juntos.


## Componer Tipos

Esta sección analizará dos formas en las que puede componer tipos juntos. Estos utilizarán el _operador de unión_ para pasar cualquier dato que se adhiera a un tipo u otro y el _operador de intersección_ para pasar datos que satisfagan todas las condiciones en ambos tipos.

## Uniones

Las uniones se crean usando el `|` (pipe), que representa un valor que puede tener cualquiera de los tipos en la unión. Tome el siguiente ejemplo:

```ts
type ProductCode = number | string
```

En este código, `ProductCode` puede ser un `string` o un `number`. El siguiente código pasará el verificador de tipos:


```ts
type ProductCode = number | string;

const productCodeA: ProductCode = 'this-works';

const productCodeB: ProductCode = 1024;
```

Se puede crear un tipo de unión a partir de una unión de cualquier tipo de TypeScript válido.

## Intersecciones

Puede usar tipos de intersección para crear un tipo completamente nuevo que tenga todas las propiedades de todos los tipos que se intersectan entre sí.

Por ejemplo, imagine que tiene algunos campos comunes que siempre aparecen en la respuesta de sus llamadas API, luego campos específicos para algunos puntos finales:

```ts
type StatusResponse = {
  status: number;
  isValid: boolean;
};

type User = {
  name: string;
};

type GetUserResponse = {
  user: User;
};
```

En este caso, todas las respuestas tendrán las propiedades `status` y `isValid`, pero solo las respuestas de los usuarios tendrán el campo adicional `user`. Para crear la respuesta resultante de una llamada de usuario de API específica utilizando un tipo de intersección, combine los tipos `StatusResponse` y `GetUserResponse`:

```ts
type ApiGetUserResponse = StatusResponse & GetUserResponse;
```

El tipo `ApiGetUserResponse` va a tener todas las propiedades disponibles en `StatusResponse` y las disponibles en `GetUserResponse`. Esto significa que los datos solo pasarán el verificador de tipos si cumplen todas las condiciones de ambos tipos. El siguiente ejemplo funcionará:

```ts
let response: ApiGetUserResponse = {
    status: 200,
    isValid: true,
    user: {
        name: 'Sammy'
    }
}
```

Otro ejemplo sería el tipo de filas devueltas por un cliente de base de datos para una consulta que contiene uniones. Podría utilizar un tipo de intersección para especificar el resultado de dicha consulta:

```ts
type UserRoleRow = {
  role: string;
}

type UserRow = {
  name: string;
};

type UserWithRoleRow = UserRow & UserRoleRow;
```

Más tarde, si usó una función `fetchRowsFromDatabase()` como la siguiente:

```ts
 const joinedRows: UserWithRoleRow = fetchRowsFromDatabase()
```

La constante `joinedRows` resultante tendría que tener una propiedad `role` y una propiedad `name` que contuvieran valores de cadena para pasar el verificador de tipos.

## Usar Tipos de Cadenas de Plantilla

A partir de TypeScript 4.1, es posible crear tipos utilizando tipos de [cadena de plantilla](https://www.digitalocean.com/community/tutorials/understanding-template-literals-in-javascript). Esto le permitirá crear tipos que verifiquen formatos de cadena específicos y agregar más personalización a su proyecto de TypeScript.

Para crear tipos de cadena de plantilla, utiliza una sintaxis que es casi la misma que usaría al crear literales de cadena de plantilla. Pero en lugar de valores, usará otros tipos dentro de la plantilla de cadena.

Imagine que desea crear un tipo que pase todas las cadenas que comienzan con `get`. Podrías hacerlo usando tipos de cadena de plantilla:

```ts
type StringThatStartsWithGet = `get${string}`;

const myString: StringThatStartsWithGet = 'getAbc';
```

`myString` pasará el verificador de tipo aquí porque la cadena comienza con `get` y luego es seguida por una cadena adicional.

Si pasaste un valor no válido a tu tipo, como el siguiente `invalidStringValue`:

```ts
type StringThatStartsWithGet = `get${string}`;

const invalidStringValue: StringThatStartsWithGet = 'something';
```

El compilador de TypeScript le daría el error `2322`:

```sh
Output
Type '"something"' is not assignable to type '`get${string}`'. (2322)
```

La creación de tipos con cadenas de plantilla le ayuda a personalizar su tipo según las necesidades específicas de su proyecto. En la siguiente sección, probará aserciones de tipo, que agregan un tipo a datos que de otro modo no estarían tipificados.

## Usar Aserciones de Tipo

El [tipo `any`](./how-to-use-basic-types.html#tipos-basicos-utilizados-en-typescript) se puede usar como el tipo de cualquier valor, lo que a menudo no proporciona la tipificación fuerte necesaria para obtener el beneficio completo de TypeScript. Pero a veces puede terminar con algunas variables vinculadas a `any` que esté fuera de su control. Esto sucederá si usa dependencias externas que no se escribieron en TypeScript o que no tienen una [declaración de tipo disponible](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html).

En caso de que desee que su código sea seguro para el tipo en esos escenarios, puede usar aserciones de tipo, que es una forma de cambiar el tipo de una variable a otro tipo. Las aserciones de tipo son posibles al agregar `as NewType` después de su variable. Esto cambiará el tipo de la variable al especificado después de la palabra clave `as`.

Tome el siguiente ejemplo:

```ts
const valueA: any = 'something';

const valueB = valueA as string;
```

`valueA` tiene el tipo `any`, pero, al usar la palabra clave `as`, este código obliga a `valueB` a tener el tipo `string`.

:::tip Nota
Para afirmar que una variable de `TypeA` tenga el tipo `TypeB`, `TypeB` debe ser un subtipo de `TypeA`. Casi todos los tipos de TypeScript, además de `never`, son un subtipo de `any`, incluido el `unknown`.
:::

## Tipos de utilidad

En las secciones anteriores, revisó varias formas de crear tipos personalizados a partir de tipos básicos. Pero a veces no desea crear un tipo completamente nuevo desde cero. Hay momentos en los que puede ser mejor usar algunas propiedades de un tipo existente, o incluso crear un nuevo tipo que tenga la misma forma que otro tipo, pero con todas las propiedades configuradas como opcionales.

Todo esto es posible utilizando los tipos de utilidades existentes disponibles con TypeScript. Esta sección cubrirá algunos de esos tipos de utilidad; para obtener una lista completa de todos los disponibles, eche un vistazo a la parte [Tipos de Utilidad](https://www.typescriptlang.org/docs/handbook/utility-types.html) del manual de TypeScript.


Todos los tipos de utilidad son _Tipos Genéricos_, que puede considerar como un tipo que acepta otros tipos como parámetros. Un tipo genérico se puede identificar al poder pasarle parámetros de tipo usando la sintaxis `<TypeA, TypeB, ...>`.

## `Record<Key, Value>`

El tipo de utilidad `Record` se puede usar para crear un tipo indexable de una manera más limpia que usar la firma de índice cubierta anteriormente.

En su ejemplo de tipos indexables, tenía el siguiente tipo:

```ts
type Data = {
  [key: string]: any;
};
```

Puede usar el tipo de utilidad `Record` en lugar de un tipo indexable como este:

```ts
type Data = Record<string, any>;
```

El primer parámetro de tipo del genérico `Record` es el tipo de cada clave. En este ejemplo, todas las claves deben ser cadenas. El segundo parámetro de tipo es el tipo de cada `value` de esas claves. En este ejemplo se permitiría que los valores sean `any`:

## `Omit<Type, Fields>`

El tipo de utilidad `Omit` es útil para crear un nuevo tipo basado en otro, mientras se excluyen algunas propiedades que no desea en el tipo resultante.

Imagine que tiene el siguiente tipo para representar el tipo de una fila de usuario en una base de datos:

```ts
type UserRow = {
  id: number;
  name: string;
  email: string;
  addressId: string;
};
```

Si en su código está recuperando todos los campos excepto el de `addressId`, puede usar `Omit` para crear un nuevo tipo sin ese campo:


```ts{8}
type UserRow = {
  id: number;
  name: string;
  email: string;
  addressId: string;
};

type UserRowWithoutAddressId = Omit<UserRow, 'addressId'>;
```

El primer argumento para `Omit` es el tipo en el que se basa el nuevo tipo. El segundo es el campo que le gustaría omitir.

Si pasa el cursor sobre `UserRowWithoutAddressId` en su editor de código, encontrará que tiene todas las propiedades del tipo `UserRow` excepto las que omitió.

Puede pasar varios campos al segundo parámetro de tipo mediante una unión de cadenas. Digamos que también quería omitir el campo de `id`, podría hacer esto:

```ts{8}
type UserRow = {
  id: number;
  name: string;
  email: string;
  addressId: string;
};

type UserRowWithoutIds = Omit<UserRow, 'id' | 'addressId'>;
```

## `Pick<Type, Fields>`

El tipo de utilidad `Pick` es exactamente lo contrario del tipo `Omit`. En lugar de decir los campos que desea omitir, especifique los campos que desea usar de otro tipo.

Usando el mismo `UserRow` que usó antes:

```ts
type UserRow = {
  id: number;
  name: string;
  email: string;
  addressId: string;
};
```

Imagine que necesita seleccionar solo la clave de `email` de la fila de la base de datos. Podrías crear tal tipo como este usando `Pick`:

```ts{8}
type UserRow = {
  id: number;
  name: string;
  email: string;
  addressId: string;
};

type UserRowWithEmailOnly = Pick<UserRow, 'email'>;
```

El primer argumento para `Pick` aquí especifica el tipo en el que se basa el nuevo tipo. La segunda es la clave que le gustaría incluir.

Esto sería equivalente a lo siguiente:

```ts
type UserRowWithEmailOnly = {
    email: string;
}
```

También puede seleccionar varios campos mediante una unión de cadenas:


```ts{8}
type UserRow = {
  id: number;
  name: string;
  email: string;
  addressId: string;
};

type UserRowWithEmailOnly = Pick<UserRow, 'name' | 'email'>;
```

## `Partial<Type>`

Usando el mismo ejemplo de `UserRow`, imagine que desea crear un nuevo tipo que coincida con el objeto que su cliente de base de datos puede usar para insertar nuevos datos en su tabla de usuario, pero con un pequeño detalle: su base de datos tiene valores predeterminados para todos los campos, por lo que no es requerido que pase ninguno de ellos. Para hacer esto, puede usar un tipo de utilidad `Partial` para incluir opcionalmente todos los campos del tipo base.

Su tipo existente, `UserRow`, tiene todas las propiedades requeridas:

```ts
type UserRow = {
  id: number;
  name: string;
  email: string;
  addressId: string;
};
```

Para crear un nuevo tipo donde todas las propiedades son opcionales, puede usar el tipo de utilidad `Partial<Type>` como el siguiente:

```ts{8}
type UserRow = {
  id: number;
  name: string;
  email: string;
  addressId: string;
};

type UserRowInsert = Partial<UserRow>;
```

Esto es exactamente lo mismo que tener su `UserRowInsert` así:


```ts
type UserRow = {
  id: number;
  name: string;
  email: string;
  addressId: string;
};

type UserRowInsert = {
  id?: number | undefined;
  name?: string | undefined;
  email?: string | undefined;
  addressId?: string | undefined;
};
```

Los tipos de utilidad son un gran recurso porque proporcionan una forma más rápida de crear tipos que crearlos a partir de los tipos básicos en TypeScript.

## Conclusión

La creación de sus propios tipos personalizados para representar las estructuras de datos utilizadas en su propio código puede proporcionar una solución de TypeScript flexible y útil para su proyecto. Además de aumentar la seguridad de tipo de su propio código como un todo, tener sus propios objetos de negocio tipeados como estructuras de datos en el código aumentará la documentación general del código base y mejorará su propia experiencia de desarrollador cuando trabaje con compañeros de equipo en la misma base de código.

