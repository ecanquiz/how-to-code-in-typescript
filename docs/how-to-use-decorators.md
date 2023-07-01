# Cómo Usar Decoradores en TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-decorators-in-typescript)
:::

## Introducción

[TypeScript](https://www.typescriptlang.org/) es una extensión del lenguaje [JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) que utiliza el tiempo de ejecución de JavaScript con un verificador de tipos en tiempo de compilación. Esta combinación permite a los desarrolladores usar el ecosistema completo de JavaScript y las características del lenguaje, al mismo tiempo que agregan verificación de tipo estático, enumeraciones, clases e interfaces opcionales. Una de esas características adicionales es el soporte para decoradores.

Los decoradores son una forma de decorar miembros de una clase, o una clase en sí misma, con funcionalidad adicional. Cuando aplica un decorador a una clase o a un miembro de clase, en realidad está llamando a una función que recibirá detalles de lo que se está decorando, y la implementación del decorador podrá transformar el código dinámicamente, agregando funcionalidad adicional y reduciendo el código repetitivo. Son una forma de tener metaprogramación en TypeScript, que es una técnica de programación que permite al programador crear código que utiliza otro código de la propia aplicación como datos.

:::tip Nota
Actualmente, hay una [propuesta de etapa 2 que agrega decoradores](https://tc39.es/proposal-decorators/) al estándar ECMAScript. Como aún no es una característica de JavaScript, TypeScript ofrece su propia implementación de decoradores, bajo una bandera experimental.
:::


Este tutorial le mostrará cómo crear sus propios decoradores en TypeScript para clases y miembros de clases, y también cómo usarlos. Lo guiará a través de diferentes ejemplos de código, que puede seguir en su propio entorno de TypeScript o en [TypeScript Playground](https://www.typescriptlang.org/play?ts=4.2.2#), un entorno en línea que le permite escribir TypeScript directamente en el navegador.

## Habilitar Soporte de Decoradores en TypeScript

Actualmente, los decoradores siguen siendo una función experimental en TypeScript y, como tal, primero se debe habilitar. En esta sección, verá cómo habilitar los decoradores en TypeScript, según la forma en que trabaje con TypeScript.

## CLI del Compilador de TypeScript

Para habilitar la compatibilidad con decoradores cuando se utiliza la CLI del Compilador de TypeScript (`tsc`), el único paso adicional que se necesita es pasar una bandera adicional `--experimentalDecorators`:

```sh
tsc --experimentalDecorators
```

## tsconfig.json

Al trabajar en un proyecto que tiene un archivo `tsconfig.json`, para habilitar los decoradores experimentales debe agregar la propiedad `experimentalDecorators` al objeto `compilerOptions`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

En TypeScript Playground, los decoradores están habilitados de forma predeterminada.

## Usando Sintaxis del Decorador

En esta sección, aplicará decoradores en clases de TypeScript.

En TypeScript, puede crear decoradores utilizando la sintaxis especial `@expression`, donde `expression` es una función que se llamará automáticamente durante el tiempo de ejecución con detalles sobre el objetivo del decorador.

El objetivo de un decorador depende de dónde lo agregue. Actualmente, los decoradores se pueden agregar a los siguientes componentes de una clase:

- Declaración de clase en sí
- Propiedades
- Accesorios
- Métodos
- Parámetros

Por ejemplo, supongamos que tiene un decorador llamado `sealed` que llama a [`Object.seal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) en una clase. Para usar tu decorador podrías escribir lo siguiente:

```ts{1}
@sealed
class Person {}
```

Observe en el código resaltado que agregó el decorador justo antes del objetivo de su decorador `sealed`, en este caso, la declaración de la clase `Person`.

Lo mismo es válido para todos los demás tipos de decoradores:


```ts
@classDecorator
class Person {
  @propertyDecorator
  public name: string;

  @accessorDecorator
  get fullName() {
    // ...
  }

  @methodDecorator
  printName(@parameterDecorator prefix: string) {
    // ...
  }
}
```

Para agregar varios decoradores, agréguelos juntos, uno tras otro:


```ts
@decoratorA
@decoratorB
class Person {}
```

## Creando Decoradores de Clase en TypeScript

En esta sección, seguirá los pasos para crear decoradores de clase en TypeScript.

Para un decorador llamado `@decoratorA`, le dice a TypeScript que debe llamar a la función `decoratorA`. Se llamará a la función `decoratorA` con detalles sobre cómo usó el decorador en su código. Por ejemplo, si aplicó el decorador a una declaración de clase, la función recibirá detalles sobre la clase. Esta función debe estar disponible para que su decorador funcione.

Para crear su propio decorador, debe crear una función con el mismo nombre que su decorador. Es decir, para crear el decorador de clase `sealed` que viste en la sección anterior, debes crear una función `sealed` que reciba un conjunto específico de parámetros. Hagamos exactamente eso:


```ts
@sealed
class Person {}

function sealed(target: Function) {
  Object.seal(target);
  Object.seal(target.prototype);
}
```

Los parámetros pasados al decorador dependerán de dónde se utilizará el decorador. El primer parámetro se denomina comúnmente `target`.

El decorador `sealed` se usará solo en declaraciones de clase, por lo que su función recibirá un solo parámetro, el `target`, que será de tipo `Function`. Este será el constructor de la clase a la que se aplicó el decorador.

En la función `sealed`, llama a `Object.seal` sobre el `target`, que es el constructor de la clase, y también sobre su prototipo. Cuando lo haga, no se pueden agregar nuevas propiedades al constructor de clase o su propiedad, y las existentes se marcarán como no configurables.

Es importante recordar que actualmente no es posible extender el tipo TypeScript del `target` cuando se usan decoradores. Esto significa, por ejemplo, que no puede agregar un nuevo campo a una clase usando un decorador y hacerlo con seguridad de tipos.

Si devolvió un valor en el decorador de clase `sealed`, este valor se convertirá en la nueva función constructora de la clase. Esto es útil si desea sobrescribir completamente el constructor de clases.

Ha creado su primer decorador y lo ha utilizado con una clase. En la siguiente sección aprenderá a crear fábricas de decoradores.

## Creando Fábricas de Decoradores

A veces necesitarás pasar opciones adicionales al decorador al aplicarlo, y para eso, tienes que usar fábricas de decoradores. En esta sección, aprenderá cómo crear esas fábricas y usarlas.

Las fábricas de decoradores son funciones que devuelven otra función. Reciben este nombre porque no son la implementación del decorador en sí. En su lugar, devuelven otra función responsable de la implementación del decorador y actúan como una función contenedora. Son útiles para hacer que los decoradores sean personalizables, al permitir que el código del cliente pase opciones a los decoradores cuando los usan.

Imaginemos que tiene un decorador de clase llamado `decoratorA` y desea agregar una opción que se puede configurar al llamar al decorador, como una bandera booleana. Puede lograr esto escribiendo una fábrica de decoradores similar a la siguiente:


```ts{1}
const decoratorA = (someBooleanFlag: boolean) => {
  return (target: Function) => {
  }
}
```

Aquí, su función `decoradorA` devuelve otra función con la implementación del decorador. Observe cómo la fábrica de decoradores recibe una bandera booleana como su único parámetro. 


Puede pasar el valor de este parámetro cuando usa el decorador. Vea el código resaltado en el siguiente ejemplo:


```ts{6}
const decoratorA = (someBooleanFlag: boolean) => {
  return (target: Function) => {
  }
}

@decoratorA(true)
class Person {}
```

Aquí, cuando usa el decorador `decoratorA`, la fábrica de decoradores se llamará con el parámetro `someBooleanFlag` establecido en `true`. Luego se ejecutará la implementación del decorador. Esto le permite cambiar el comportamiento de su decorador en función de cómo se usó, lo que hace que sus decoradores sean fáciles de personalizar y reutilizar a través de su aplicación.

Tenga en cuenta que debe pasar todos los parámetros esperados por la fábrica decoradora. Si simplemente aplicó el decorador sin pasar ningún parámetro, como en el siguiente ejemplo:


```ts
const decoratorA = (someBooleanFlag: boolean) => {
  return (target: Function) => {
  }
}

@decoratorA
class Person {}
```

El Compilador de TypeScript le dará dos errores, que pueden variar según el tipo de decorador. Para los decoradores de clase, los errores son `1238` y `1240`:


```sh
Output
Unable to resolve signature of class decorator when called as an expression.
  Type '(target: Function) => void' is not assignable to type 'typeof Person'.
    Type '(target: Function) => void' provides no match for the signature 'new (): Person'. (1238)
Argument of type 'typeof Person' is not assignable to parameter of type 'boolean'. (2345)
```

Acaba de crear una fábrica de decoradores que puede recibir parámetros y cambiar su comportamiento en función de estos parámetros. En el siguiente paso, aprenderá a crear decoradores de propiedades.


## Creando Decoradores de Propiedades

Las propiedades de clase son otro lugar donde puede usar decoradores. En esta sección, verás cómo crearlos.

Cualquier decorador de propiedades recibe los siguientes parámetros:

- Para propiedades estáticas, la función constructora de la clase. Para todas las demás propiedades, el prototipo de la clase.
- El nombre del miembro.

Actualmente, no hay forma de obtener el descriptor de propiedad como parámetro. Esto se debe a la forma en que se inicializan los decoradores de propiedades en TypeScript.

Aquí hay una función de decorador que imprimirá el nombre del miembro en la consola:


```ts
const printMemberName = (target: any, memberName: string) => {
  console.log(memberName);
};

class Person {
  @printMemberName
  name: string = "Jon";
}
```

Cuando ejecute el código TypeScript anterior, verá lo siguiente impreso en la consola:


```sh
Output
name
```

Puede utilizar decoradores de propiedades para anular la propiedad que se está decorando. Esto se puede hacer usando [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) junto con un nuevo _setter_ y _getter_ para la propiedad. Veamos cómo puede crear un decorador llamado `allowlist`, que solo permite que una propiedad se establezca en valores presentes en una estática lista de permitidos:


```ts
const allowlist = ["Jon", "Jane"];

const allowlistOnly = (target: any, memberName: string) => {
  let currentValue: any = target[memberName];

  Object.defineProperty(target, memberName, {
    set: (newValue: any) => {
      if (!allowlist.includes(newValue)) {
        return;
      }
      currentValue = newValue;
    },
    get: () => currentValue
  });
};
```

Primero, está creando una estática lista de permitidos en la parte superior del código:


```ts
const allowlist = ["Jon", "Jane"];
```

A continuación, está creando la implementación del decorador de propiedades:


```ts
const allowlistOnly = (target: any, memberName: string) => {
  let currentValue: any = target[memberName];

  Object.defineProperty(target, memberName, {
    set: (newValue: any) => {
      if (!allowlist.includes(newValue)) {
        return;
      }
      currentValue = newValue;
    },
    get: () => currentValue
  });
};
```

Observe cómo está utilizando `any` como el tipo del `target`:


```ts{1}
const allowlistOnly = (target: any, memberName: string) => {
```


Para los decoradores de propiedades, el tipo del parámetro de destino puede ser el constructor de la clase o el prototipo de la clase; es más fácil usar `any` en esta situación.

En la primera línea de la implementación de su decorador, está almacenando el valor actual de la propiedad que se está decorando en la variable `currentValue`:


```ts
let currentValue: any = target[memberName];
```

Para las propiedades estáticas, esto se establecerá en su valor predeterminado, si corresponde. Para propiedades no estáticas, esto siempre será `undefined`. Esto se debe a que, en tiempo de ejecución, en el código JavaScript compilado, el decorador se ejecuta antes de que la propiedad de la instancia se establezca en su valor predeterminado.

Luego está anulando la propiedad usando `Object.defineProperty`:


```ts
Object.defineProperty(target, memberName, {
  set: (newValue: any) => {
    if (!allowlist.includes(newValue)) {
      return;
    }
    currentValue = newValue;
  },
  get: () => currentValue
});
```

La llamada `Object.defineProperty` tiene un `getter` y un `setter`. El `getter` devuelve el valor almacenado en la variable `currentValue`. El `setter` establecerá el valor de `currentVariable` en `newValue` si está dentro de la lista de permitidos.

Usemos el decorador que acabas de escribir. Cree la siguiente clase `Person`:

```ts
class Person {
  @allowlistOnly
  name: string = "Jon";
}
```

Ahora creará una nueva instancia de su clase y probará la configuración y obtendrá la propiedad de instancia `name`:


```ts
const allowlist = ["Jon", "Jane"];

const allowlistOnly = (target: any, memberName: string) => {
  let currentValue: any = target[memberName];

  Object.defineProperty(target, memberName, {
    set: (newValue: any) => {
      if (!allowlist.includes(newValue)) {
        return;
      }
      currentValue = newValue;
    },
    get: () => currentValue
  });
};

class Person {
  @allowlistOnly
  name: string = "Jon";
}

const person = new Person();
console.log(person.name);

person.name = "Peter";
console.log(person.name);

person.name = "Jane";
console.log(person.name);
```

Al ejecutar el código, debería ver el siguiente resultado:


```sh
Output
Jon
Jon
Jane
```

El valor nunca se establece en `Peter`, ya que `Peter` no está en la lista de permitidos.

¿Qué pasaría si quisiera hacer que su código sea un poco más reutilizable, permitiendo que se establezca la lista de permitidos al aplicar el decorador? Este es un gran caso de uso para las fábricas de decoradores. Hagamos exactamente eso, convirtiendo su decorador `allowlistOnly` en una fábrica de decoradores:


```ts
const allowlistOnly = (allowlist: string[]) => {
  return (target: any, memberName: string) => {
    let currentValue: any = target[memberName];

    Object.defineProperty(target, memberName, {
      set: (newValue: any) => {
        if (!allowlist.includes(newValue)) {
          return;
        }
        currentValue = newValue;
      },
      get: () => currentValue
    });
  };
}
```

Aquí envolvió su implementación anterior en otra función, una fábrica de decoradores. La fábrica de decoradores recibe un solo parámetro llamado `allowlist`, que es una matriz de cadenas.

Ahora, para usar su decorador, debe pasar la lista de permitidos, como en el siguiente código resaltado:


```ts{2}
class Person {
  @allowlistOnly(["Claire", "Oliver"])
  name: string = "Claire";
}
```

Intente ejecutar un código similar al anterior que escribió, pero con los nuevos cambios:


```ts
const allowlistOnly = (allowlist: string[]) => {
  return (target: any, memberName: string) => {
    let currentValue: any = target[memberName];

    Object.defineProperty(target, memberName, {
      set: (newValue: any) => {
        if (!allowlist.includes(newValue)) {
          return;
        }
        currentValue = newValue;
      },
      get: () => currentValue
    });
  };
}

class Person {
  @allowlistOnly(["Claire", "Oliver"])
  name: string = "Claire";
}

const person = new Person();
console.log(person.name);
person.name = "Peter";
console.log(person.name);
person.name = "Oliver";
console.log(person.name);
```

El código debería darte el siguiente resultado:


```sh
Output
Claire
Claire
Oliver
```

Demostrando que funciona como se esperaba, `person.name` nunca se establece a `Peter`, ya que `Peter` no está en la lista de permitidos dada.

Ahora que creó su primer decorador de propiedades usando una función de decorador normal y una fábrica de decoradores, es hora de echar un vistazo a cómo crear decoradores para accesores de clase.

## Creating Accessor Decorators


