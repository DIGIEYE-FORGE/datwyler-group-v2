
/**
 * Client
**/

import * as runtime from './runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model VirtualDevice
 * 
 */
export type VirtualDevice = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  tenantId: number | null
}

/**
 * Model Group
 * 
 */
export type Group = {
  id: number
  name: string
  type: string | null
  createdAt: Date
  updatedAt: Date
  parentId: number | null
  location: string | null
  lat: number | null
  lng: number | null
  ip: string | null
  attributes: Prisma.JsonValue | null
  tenantId: number | null
}

/**
 * Model Alert
 * 
 */
export type Alert = {
  id: number
  deviceId: number
  type: string | null
  message: string | null
  level: string | null
  createdAt: Date
  updatedAt: Date
  attributes: Prisma.JsonValue
  acknowledgedBy: number | null
}

/**
 * Model Decoder
 * 
 */
export type Decoder = {
  id: number
  name: string
  description: string
  fnc: string
  createdAt: Date
  updatedAt: Date
  tenantId: number | null
}

/**
 * Model DeviceType
 * 
 */
export type DeviceType = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  tenantId: number | null
}

/**
 * Model Firmware
 * 
 */
export type Firmware = {
  id: number
  name: string | null
  version: string | null
  description: string | null
  url: string | null
  size: number | null
  hash: string | null
  createdAt: Date
  updatedAt: Date
  tenantId: number | null
}

/**
 * Model Protocol
 * 
 */
export type Protocol = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  tenantId: number | null
}

/**
 * Model DeviceProfile
 * 
 */
export type DeviceProfile = {
  id: number
  name: string
  description: string | null
  logo: string | null
  cridentialsType: TypeCredential | null
  deviceTypeId: number | null
  createdAt: Date
  updatedAt: Date
  protocolId: number | null
  decoderId: number | null
  attributes: Prisma.JsonValue | null
  tenantId: number | null
}

/**
 * Model Credential
 * 
 */
export type Credential = {
  id: number
  username: string | null
  password: string | null
  token: string | null
  certificate: string | null
  type: TypeCredential
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Tag
 * 
 */
export type Tag = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model VmqAuthAcl
 * 
 */
export type VmqAuthAcl = {
  id: number
  mountpoint: string
  username: string
  clientId: string
  password: string | null
  publishAcl: Prisma.JsonValue
  subscribeAcl: Prisma.JsonValue
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Device
 * 
 */
export type Device = {
  id: number
  name: string
  description: string | null
  serial: string
  isPassive: boolean
  isOnline: boolean
  isdecoded: boolean
  credentialId: number | null
  configuration: string | null
  deviceProfileId: number | null
  firmwareId: number | null
  ip: string | null
  createdAt: Date
  updatedAt: Date
  virtualDeviceId: number | null
  groupId: number | null
  tenantId: number | null
}

/**
 * Model Attribute
 * 
 */
export type Attribute = {
  id: number
  name: string
  value: string
  deviceId: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Model LastTelemetry
 * 
 */
export type LastTelemetry = {
  id: number
  name: string
  value: Prisma.JsonValue
  alias: string | null
  icon: string | null
  color: string | null
  show: boolean
  deviceId: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Report
 * 
 */
export type Report = {
  id: number
  name: string
  tenantId: number
  query: string
  type: string
  format: string
  url: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model History
 * 
 */
export type History = {
  id: number
  name: string
  value: Prisma.JsonValue
  createdAt: Date
  updatedAt: Date
  deviceId: number
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const TypeCredential: {
  TOKEN: 'TOKEN',
  CERTIFICATE: 'CERTIFICATE',
  USERPASSWORD: 'USERPASSWORD'
};

export type TypeCredential = (typeof TypeCredential)[keyof typeof TypeCredential]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more VirtualDevices
 * const virtualDevices = await prisma.virtualDevice.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more VirtualDevices
   * const virtualDevices = await prisma.virtualDevice.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.virtualDevice`: Exposes CRUD operations for the **VirtualDevice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VirtualDevices
    * const virtualDevices = await prisma.virtualDevice.findMany()
    * ```
    */
  get virtualDevice(): Prisma.VirtualDeviceDelegate<GlobalReject>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<GlobalReject>;

  /**
   * `prisma.alert`: Exposes CRUD operations for the **Alert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alerts
    * const alerts = await prisma.alert.findMany()
    * ```
    */
  get alert(): Prisma.AlertDelegate<GlobalReject>;

  /**
   * `prisma.decoder`: Exposes CRUD operations for the **Decoder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Decoders
    * const decoders = await prisma.decoder.findMany()
    * ```
    */
  get decoder(): Prisma.DecoderDelegate<GlobalReject>;

  /**
   * `prisma.deviceType`: Exposes CRUD operations for the **DeviceType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeviceTypes
    * const deviceTypes = await prisma.deviceType.findMany()
    * ```
    */
  get deviceType(): Prisma.DeviceTypeDelegate<GlobalReject>;

  /**
   * `prisma.firmware`: Exposes CRUD operations for the **Firmware** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Firmware
    * const firmware = await prisma.firmware.findMany()
    * ```
    */
  get firmware(): Prisma.FirmwareDelegate<GlobalReject>;

  /**
   * `prisma.protocol`: Exposes CRUD operations for the **Protocol** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Protocols
    * const protocols = await prisma.protocol.findMany()
    * ```
    */
  get protocol(): Prisma.ProtocolDelegate<GlobalReject>;

  /**
   * `prisma.deviceProfile`: Exposes CRUD operations for the **DeviceProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeviceProfiles
    * const deviceProfiles = await prisma.deviceProfile.findMany()
    * ```
    */
  get deviceProfile(): Prisma.DeviceProfileDelegate<GlobalReject>;

  /**
   * `prisma.credential`: Exposes CRUD operations for the **Credential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Credentials
    * const credentials = await prisma.credential.findMany()
    * ```
    */
  get credential(): Prisma.CredentialDelegate<GlobalReject>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<GlobalReject>;

  /**
   * `prisma.vmqAuthAcl`: Exposes CRUD operations for the **VmqAuthAcl** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VmqAuthAcls
    * const vmqAuthAcls = await prisma.vmqAuthAcl.findMany()
    * ```
    */
  get vmqAuthAcl(): Prisma.VmqAuthAclDelegate<GlobalReject>;

  /**
   * `prisma.device`: Exposes CRUD operations for the **Device** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devices
    * const devices = await prisma.device.findMany()
    * ```
    */
  get device(): Prisma.DeviceDelegate<GlobalReject>;

  /**
   * `prisma.attribute`: Exposes CRUD operations for the **Attribute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attributes
    * const attributes = await prisma.attribute.findMany()
    * ```
    */
  get attribute(): Prisma.AttributeDelegate<GlobalReject>;

  /**
   * `prisma.lastTelemetry`: Exposes CRUD operations for the **LastTelemetry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LastTelemetries
    * const lastTelemetries = await prisma.lastTelemetry.findMany()
    * ```
    */
  get lastTelemetry(): Prisma.LastTelemetryDelegate<GlobalReject>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<GlobalReject>;

  /**
   * `prisma.history`: Exposes CRUD operations for the **History** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Histories
    * const histories = await prisma.history.findMany()
    * ```
    */
  get history(): Prisma.HistoryDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.14.1
   * Query Engine version: d9a4c5988f480fa576d43970d5a23641aa77bc9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    VirtualDevice: 'VirtualDevice',
    Group: 'Group',
    Alert: 'Alert',
    Decoder: 'Decoder',
    DeviceType: 'DeviceType',
    Firmware: 'Firmware',
    Protocol: 'Protocol',
    DeviceProfile: 'DeviceProfile',
    Credential: 'Credential',
    Tag: 'Tag',
    VmqAuthAcl: 'VmqAuthAcl',
    Device: 'Device',
    Attribute: 'Attribute',
    LastTelemetry: 'LastTelemetry',
    Report: 'Report',
    History: 'History'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type VirtualDeviceCountOutputType
   */


  export type VirtualDeviceCountOutputType = {
    devices: number
  }

  export type VirtualDeviceCountOutputTypeSelect = {
    devices?: boolean
  }

  export type VirtualDeviceCountOutputTypeGetPayload<S extends boolean | null | undefined | VirtualDeviceCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? VirtualDeviceCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (VirtualDeviceCountOutputTypeArgs)
    ? VirtualDeviceCountOutputType 
    : S extends { select: any } & (VirtualDeviceCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof VirtualDeviceCountOutputType ? VirtualDeviceCountOutputType[P] : never
  } 
      : VirtualDeviceCountOutputType




  // Custom InputTypes

  /**
   * VirtualDeviceCountOutputType without action
   */
  export type VirtualDeviceCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the VirtualDeviceCountOutputType
     */
    select?: VirtualDeviceCountOutputTypeSelect | null
  }



  /**
   * Count Type GroupCountOutputType
   */


  export type GroupCountOutputType = {
    subgroups: number
    devices: number
  }

  export type GroupCountOutputTypeSelect = {
    subgroups?: boolean
    devices?: boolean
  }

  export type GroupCountOutputTypeGetPayload<S extends boolean | null | undefined | GroupCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? GroupCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (GroupCountOutputTypeArgs)
    ? GroupCountOutputType 
    : S extends { select: any } & (GroupCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof GroupCountOutputType ? GroupCountOutputType[P] : never
  } 
      : GroupCountOutputType




  // Custom InputTypes

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect | null
  }



  /**
   * Count Type DecoderCountOutputType
   */


  export type DecoderCountOutputType = {
    deviceProfile: number
  }

  export type DecoderCountOutputTypeSelect = {
    deviceProfile?: boolean
  }

  export type DecoderCountOutputTypeGetPayload<S extends boolean | null | undefined | DecoderCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? DecoderCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (DecoderCountOutputTypeArgs)
    ? DecoderCountOutputType 
    : S extends { select: any } & (DecoderCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof DecoderCountOutputType ? DecoderCountOutputType[P] : never
  } 
      : DecoderCountOutputType




  // Custom InputTypes

  /**
   * DecoderCountOutputType without action
   */
  export type DecoderCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DecoderCountOutputType
     */
    select?: DecoderCountOutputTypeSelect | null
  }



  /**
   * Count Type DeviceTypeCountOutputType
   */


  export type DeviceTypeCountOutputType = {
    deviceProfiles: number
  }

  export type DeviceTypeCountOutputTypeSelect = {
    deviceProfiles?: boolean
  }

  export type DeviceTypeCountOutputTypeGetPayload<S extends boolean | null | undefined | DeviceTypeCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? DeviceTypeCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (DeviceTypeCountOutputTypeArgs)
    ? DeviceTypeCountOutputType 
    : S extends { select: any } & (DeviceTypeCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof DeviceTypeCountOutputType ? DeviceTypeCountOutputType[P] : never
  } 
      : DeviceTypeCountOutputType




  // Custom InputTypes

  /**
   * DeviceTypeCountOutputType without action
   */
  export type DeviceTypeCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DeviceTypeCountOutputType
     */
    select?: DeviceTypeCountOutputTypeSelect | null
  }



  /**
   * Count Type FirmwareCountOutputType
   */


  export type FirmwareCountOutputType = {
    device: number
  }

  export type FirmwareCountOutputTypeSelect = {
    device?: boolean
  }

  export type FirmwareCountOutputTypeGetPayload<S extends boolean | null | undefined | FirmwareCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? FirmwareCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (FirmwareCountOutputTypeArgs)
    ? FirmwareCountOutputType 
    : S extends { select: any } & (FirmwareCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof FirmwareCountOutputType ? FirmwareCountOutputType[P] : never
  } 
      : FirmwareCountOutputType




  // Custom InputTypes

  /**
   * FirmwareCountOutputType without action
   */
  export type FirmwareCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the FirmwareCountOutputType
     */
    select?: FirmwareCountOutputTypeSelect | null
  }



  /**
   * Count Type ProtocolCountOutputType
   */


  export type ProtocolCountOutputType = {
    deviceProfiles: number
  }

  export type ProtocolCountOutputTypeSelect = {
    deviceProfiles?: boolean
  }

  export type ProtocolCountOutputTypeGetPayload<S extends boolean | null | undefined | ProtocolCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ProtocolCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ProtocolCountOutputTypeArgs)
    ? ProtocolCountOutputType 
    : S extends { select: any } & (ProtocolCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ProtocolCountOutputType ? ProtocolCountOutputType[P] : never
  } 
      : ProtocolCountOutputType




  // Custom InputTypes

  /**
   * ProtocolCountOutputType without action
   */
  export type ProtocolCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProtocolCountOutputType
     */
    select?: ProtocolCountOutputTypeSelect | null
  }



  /**
   * Count Type DeviceProfileCountOutputType
   */


  export type DeviceProfileCountOutputType = {
    devices: number
  }

  export type DeviceProfileCountOutputTypeSelect = {
    devices?: boolean
  }

  export type DeviceProfileCountOutputTypeGetPayload<S extends boolean | null | undefined | DeviceProfileCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? DeviceProfileCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (DeviceProfileCountOutputTypeArgs)
    ? DeviceProfileCountOutputType 
    : S extends { select: any } & (DeviceProfileCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof DeviceProfileCountOutputType ? DeviceProfileCountOutputType[P] : never
  } 
      : DeviceProfileCountOutputType




  // Custom InputTypes

  /**
   * DeviceProfileCountOutputType without action
   */
  export type DeviceProfileCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfileCountOutputType
     */
    select?: DeviceProfileCountOutputTypeSelect | null
  }



  /**
   * Count Type TagCountOutputType
   */


  export type TagCountOutputType = {
    devices: number
  }

  export type TagCountOutputTypeSelect = {
    devices?: boolean
  }

  export type TagCountOutputTypeGetPayload<S extends boolean | null | undefined | TagCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TagCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (TagCountOutputTypeArgs)
    ? TagCountOutputType 
    : S extends { select: any } & (TagCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof TagCountOutputType ? TagCountOutputType[P] : never
  } 
      : TagCountOutputType




  // Custom InputTypes

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect | null
  }



  /**
   * Count Type DeviceCountOutputType
   */


  export type DeviceCountOutputType = {
    attributes: number
    lastTelemetries: number
    tags: number
    alerts: number
    history: number
  }

  export type DeviceCountOutputTypeSelect = {
    attributes?: boolean
    lastTelemetries?: boolean
    tags?: boolean
    alerts?: boolean
    history?: boolean
  }

  export type DeviceCountOutputTypeGetPayload<S extends boolean | null | undefined | DeviceCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? DeviceCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (DeviceCountOutputTypeArgs)
    ? DeviceCountOutputType 
    : S extends { select: any } & (DeviceCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof DeviceCountOutputType ? DeviceCountOutputType[P] : never
  } 
      : DeviceCountOutputType




  // Custom InputTypes

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DeviceCountOutputType
     */
    select?: DeviceCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model VirtualDevice
   */


  export type AggregateVirtualDevice = {
    _count: VirtualDeviceCountAggregateOutputType | null
    _avg: VirtualDeviceAvgAggregateOutputType | null
    _sum: VirtualDeviceSumAggregateOutputType | null
    _min: VirtualDeviceMinAggregateOutputType | null
    _max: VirtualDeviceMaxAggregateOutputType | null
  }

  export type VirtualDeviceAvgAggregateOutputType = {
    id: number | null
    tenantId: number | null
  }

  export type VirtualDeviceSumAggregateOutputType = {
    id: number | null
    tenantId: number | null
  }

  export type VirtualDeviceMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: number | null
  }

  export type VirtualDeviceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: number | null
  }

  export type VirtualDeviceCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    tenantId: number
    _all: number
  }


  export type VirtualDeviceAvgAggregateInputType = {
    id?: true
    tenantId?: true
  }

  export type VirtualDeviceSumAggregateInputType = {
    id?: true
    tenantId?: true
  }

  export type VirtualDeviceMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type VirtualDeviceMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type VirtualDeviceCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
    _all?: true
  }

  export type VirtualDeviceAggregateArgs = {
    /**
     * Filter which VirtualDevice to aggregate.
     */
    where?: VirtualDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VirtualDevices to fetch.
     */
    orderBy?: Enumerable<VirtualDeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VirtualDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VirtualDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VirtualDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VirtualDevices
    **/
    _count?: true | VirtualDeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VirtualDeviceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VirtualDeviceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VirtualDeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VirtualDeviceMaxAggregateInputType
  }

  export type GetVirtualDeviceAggregateType<T extends VirtualDeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateVirtualDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVirtualDevice[P]>
      : GetScalarType<T[P], AggregateVirtualDevice[P]>
  }




  export type VirtualDeviceGroupByArgs = {
    where?: VirtualDeviceWhereInput
    orderBy?: Enumerable<VirtualDeviceOrderByWithAggregationInput>
    by: VirtualDeviceScalarFieldEnum[]
    having?: VirtualDeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VirtualDeviceCountAggregateInputType | true
    _avg?: VirtualDeviceAvgAggregateInputType
    _sum?: VirtualDeviceSumAggregateInputType
    _min?: VirtualDeviceMinAggregateInputType
    _max?: VirtualDeviceMaxAggregateInputType
  }


  export type VirtualDeviceGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    tenantId: number | null
    _count: VirtualDeviceCountAggregateOutputType | null
    _avg: VirtualDeviceAvgAggregateOutputType | null
    _sum: VirtualDeviceSumAggregateOutputType | null
    _min: VirtualDeviceMinAggregateOutputType | null
    _max: VirtualDeviceMaxAggregateOutputType | null
  }

  type GetVirtualDeviceGroupByPayload<T extends VirtualDeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<VirtualDeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VirtualDeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VirtualDeviceGroupByOutputType[P]>
            : GetScalarType<T[P], VirtualDeviceGroupByOutputType[P]>
        }
      >
    >


  export type VirtualDeviceSelect = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
    devices?: boolean | VirtualDevice$devicesArgs
    _count?: boolean | VirtualDeviceCountOutputTypeArgs
  }


  export type VirtualDeviceInclude = {
    devices?: boolean | VirtualDevice$devicesArgs
    _count?: boolean | VirtualDeviceCountOutputTypeArgs
  }

  export type VirtualDeviceGetPayload<S extends boolean | null | undefined | VirtualDeviceArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? VirtualDevice :
    S extends undefined ? never :
    S extends { include: any } & (VirtualDeviceArgs | VirtualDeviceFindManyArgs)
    ? VirtualDevice  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'devices' ? Array < DeviceGetPayload<S['include'][P]>>  :
        P extends '_count' ? VirtualDeviceCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (VirtualDeviceArgs | VirtualDeviceFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'devices' ? Array < DeviceGetPayload<S['select'][P]>>  :
        P extends '_count' ? VirtualDeviceCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof VirtualDevice ? VirtualDevice[P] : never
  } 
      : VirtualDevice


  type VirtualDeviceCountArgs = 
    Omit<VirtualDeviceFindManyArgs, 'select' | 'include'> & {
      select?: VirtualDeviceCountAggregateInputType | true
    }

  export interface VirtualDeviceDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one VirtualDevice that matches the filter.
     * @param {VirtualDeviceFindUniqueArgs} args - Arguments to find a VirtualDevice
     * @example
     * // Get one VirtualDevice
     * const virtualDevice = await prisma.virtualDevice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends VirtualDeviceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, VirtualDeviceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'VirtualDevice'> extends True ? Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T>> : Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T> | null, null>

    /**
     * Find one VirtualDevice that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {VirtualDeviceFindUniqueOrThrowArgs} args - Arguments to find a VirtualDevice
     * @example
     * // Get one VirtualDevice
     * const virtualDevice = await prisma.virtualDevice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends VirtualDeviceFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, VirtualDeviceFindUniqueOrThrowArgs>
    ): Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T>>

    /**
     * Find the first VirtualDevice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VirtualDeviceFindFirstArgs} args - Arguments to find a VirtualDevice
     * @example
     * // Get one VirtualDevice
     * const virtualDevice = await prisma.virtualDevice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends VirtualDeviceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, VirtualDeviceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'VirtualDevice'> extends True ? Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T>> : Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T> | null, null>

    /**
     * Find the first VirtualDevice that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VirtualDeviceFindFirstOrThrowArgs} args - Arguments to find a VirtualDevice
     * @example
     * // Get one VirtualDevice
     * const virtualDevice = await prisma.virtualDevice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends VirtualDeviceFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VirtualDeviceFindFirstOrThrowArgs>
    ): Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T>>

    /**
     * Find zero or more VirtualDevices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VirtualDeviceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VirtualDevices
     * const virtualDevices = await prisma.virtualDevice.findMany()
     * 
     * // Get first 10 VirtualDevices
     * const virtualDevices = await prisma.virtualDevice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const virtualDeviceWithIdOnly = await prisma.virtualDevice.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends VirtualDeviceFindManyArgs>(
      args?: SelectSubset<T, VirtualDeviceFindManyArgs>
    ): Prisma.PrismaPromise<Array<VirtualDeviceGetPayload<T>>>

    /**
     * Create a VirtualDevice.
     * @param {VirtualDeviceCreateArgs} args - Arguments to create a VirtualDevice.
     * @example
     * // Create one VirtualDevice
     * const VirtualDevice = await prisma.virtualDevice.create({
     *   data: {
     *     // ... data to create a VirtualDevice
     *   }
     * })
     * 
    **/
    create<T extends VirtualDeviceCreateArgs>(
      args: SelectSubset<T, VirtualDeviceCreateArgs>
    ): Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T>>

    /**
     * Create many VirtualDevices.
     *     @param {VirtualDeviceCreateManyArgs} args - Arguments to create many VirtualDevices.
     *     @example
     *     // Create many VirtualDevices
     *     const virtualDevice = await prisma.virtualDevice.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends VirtualDeviceCreateManyArgs>(
      args?: SelectSubset<T, VirtualDeviceCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VirtualDevice.
     * @param {VirtualDeviceDeleteArgs} args - Arguments to delete one VirtualDevice.
     * @example
     * // Delete one VirtualDevice
     * const VirtualDevice = await prisma.virtualDevice.delete({
     *   where: {
     *     // ... filter to delete one VirtualDevice
     *   }
     * })
     * 
    **/
    delete<T extends VirtualDeviceDeleteArgs>(
      args: SelectSubset<T, VirtualDeviceDeleteArgs>
    ): Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T>>

    /**
     * Update one VirtualDevice.
     * @param {VirtualDeviceUpdateArgs} args - Arguments to update one VirtualDevice.
     * @example
     * // Update one VirtualDevice
     * const virtualDevice = await prisma.virtualDevice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends VirtualDeviceUpdateArgs>(
      args: SelectSubset<T, VirtualDeviceUpdateArgs>
    ): Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T>>

    /**
     * Delete zero or more VirtualDevices.
     * @param {VirtualDeviceDeleteManyArgs} args - Arguments to filter VirtualDevices to delete.
     * @example
     * // Delete a few VirtualDevices
     * const { count } = await prisma.virtualDevice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends VirtualDeviceDeleteManyArgs>(
      args?: SelectSubset<T, VirtualDeviceDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VirtualDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VirtualDeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VirtualDevices
     * const virtualDevice = await prisma.virtualDevice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends VirtualDeviceUpdateManyArgs>(
      args: SelectSubset<T, VirtualDeviceUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VirtualDevice.
     * @param {VirtualDeviceUpsertArgs} args - Arguments to update or create a VirtualDevice.
     * @example
     * // Update or create a VirtualDevice
     * const virtualDevice = await prisma.virtualDevice.upsert({
     *   create: {
     *     // ... data to create a VirtualDevice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VirtualDevice we want to update
     *   }
     * })
    **/
    upsert<T extends VirtualDeviceUpsertArgs>(
      args: SelectSubset<T, VirtualDeviceUpsertArgs>
    ): Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T>>

    /**
     * Count the number of VirtualDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VirtualDeviceCountArgs} args - Arguments to filter VirtualDevices to count.
     * @example
     * // Count the number of VirtualDevices
     * const count = await prisma.virtualDevice.count({
     *   where: {
     *     // ... the filter for the VirtualDevices we want to count
     *   }
     * })
    **/
    count<T extends VirtualDeviceCountArgs>(
      args?: Subset<T, VirtualDeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VirtualDeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VirtualDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VirtualDeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VirtualDeviceAggregateArgs>(args: Subset<T, VirtualDeviceAggregateArgs>): Prisma.PrismaPromise<GetVirtualDeviceAggregateType<T>>

    /**
     * Group by VirtualDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VirtualDeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VirtualDeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VirtualDeviceGroupByArgs['orderBy'] }
        : { orderBy?: VirtualDeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VirtualDeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVirtualDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for VirtualDevice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VirtualDeviceClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    devices<T extends VirtualDevice$devicesArgs= {}>(args?: Subset<T, VirtualDevice$devicesArgs>): Prisma.PrismaPromise<Array<DeviceGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * VirtualDevice base type for findUnique actions
   */
  export type VirtualDeviceFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the VirtualDevice
     */
    select?: VirtualDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VirtualDeviceInclude | null
    /**
     * Filter, which VirtualDevice to fetch.
     */
    where: VirtualDeviceWhereUniqueInput
  }

  /**
   * VirtualDevice findUnique
   */
  export interface VirtualDeviceFindUniqueArgs extends VirtualDeviceFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VirtualDevice findUniqueOrThrow
   */
  export type VirtualDeviceFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the VirtualDevice
     */
    select?: VirtualDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VirtualDeviceInclude | null
    /**
     * Filter, which VirtualDevice to fetch.
     */
    where: VirtualDeviceWhereUniqueInput
  }


  /**
   * VirtualDevice base type for findFirst actions
   */
  export type VirtualDeviceFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the VirtualDevice
     */
    select?: VirtualDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VirtualDeviceInclude | null
    /**
     * Filter, which VirtualDevice to fetch.
     */
    where?: VirtualDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VirtualDevices to fetch.
     */
    orderBy?: Enumerable<VirtualDeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VirtualDevices.
     */
    cursor?: VirtualDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VirtualDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VirtualDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VirtualDevices.
     */
    distinct?: Enumerable<VirtualDeviceScalarFieldEnum>
  }

  /**
   * VirtualDevice findFirst
   */
  export interface VirtualDeviceFindFirstArgs extends VirtualDeviceFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VirtualDevice findFirstOrThrow
   */
  export type VirtualDeviceFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the VirtualDevice
     */
    select?: VirtualDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VirtualDeviceInclude | null
    /**
     * Filter, which VirtualDevice to fetch.
     */
    where?: VirtualDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VirtualDevices to fetch.
     */
    orderBy?: Enumerable<VirtualDeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VirtualDevices.
     */
    cursor?: VirtualDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VirtualDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VirtualDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VirtualDevices.
     */
    distinct?: Enumerable<VirtualDeviceScalarFieldEnum>
  }


  /**
   * VirtualDevice findMany
   */
  export type VirtualDeviceFindManyArgs = {
    /**
     * Select specific fields to fetch from the VirtualDevice
     */
    select?: VirtualDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VirtualDeviceInclude | null
    /**
     * Filter, which VirtualDevices to fetch.
     */
    where?: VirtualDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VirtualDevices to fetch.
     */
    orderBy?: Enumerable<VirtualDeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VirtualDevices.
     */
    cursor?: VirtualDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VirtualDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VirtualDevices.
     */
    skip?: number
    distinct?: Enumerable<VirtualDeviceScalarFieldEnum>
  }


  /**
   * VirtualDevice create
   */
  export type VirtualDeviceCreateArgs = {
    /**
     * Select specific fields to fetch from the VirtualDevice
     */
    select?: VirtualDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VirtualDeviceInclude | null
    /**
     * The data needed to create a VirtualDevice.
     */
    data: XOR<VirtualDeviceCreateInput, VirtualDeviceUncheckedCreateInput>
  }


  /**
   * VirtualDevice createMany
   */
  export type VirtualDeviceCreateManyArgs = {
    /**
     * The data used to create many VirtualDevices.
     */
    data: Enumerable<VirtualDeviceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * VirtualDevice update
   */
  export type VirtualDeviceUpdateArgs = {
    /**
     * Select specific fields to fetch from the VirtualDevice
     */
    select?: VirtualDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VirtualDeviceInclude | null
    /**
     * The data needed to update a VirtualDevice.
     */
    data: XOR<VirtualDeviceUpdateInput, VirtualDeviceUncheckedUpdateInput>
    /**
     * Choose, which VirtualDevice to update.
     */
    where: VirtualDeviceWhereUniqueInput
  }


  /**
   * VirtualDevice updateMany
   */
  export type VirtualDeviceUpdateManyArgs = {
    /**
     * The data used to update VirtualDevices.
     */
    data: XOR<VirtualDeviceUpdateManyMutationInput, VirtualDeviceUncheckedUpdateManyInput>
    /**
     * Filter which VirtualDevices to update
     */
    where?: VirtualDeviceWhereInput
  }


  /**
   * VirtualDevice upsert
   */
  export type VirtualDeviceUpsertArgs = {
    /**
     * Select specific fields to fetch from the VirtualDevice
     */
    select?: VirtualDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VirtualDeviceInclude | null
    /**
     * The filter to search for the VirtualDevice to update in case it exists.
     */
    where: VirtualDeviceWhereUniqueInput
    /**
     * In case the VirtualDevice found by the `where` argument doesn't exist, create a new VirtualDevice with this data.
     */
    create: XOR<VirtualDeviceCreateInput, VirtualDeviceUncheckedCreateInput>
    /**
     * In case the VirtualDevice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VirtualDeviceUpdateInput, VirtualDeviceUncheckedUpdateInput>
  }


  /**
   * VirtualDevice delete
   */
  export type VirtualDeviceDeleteArgs = {
    /**
     * Select specific fields to fetch from the VirtualDevice
     */
    select?: VirtualDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VirtualDeviceInclude | null
    /**
     * Filter which VirtualDevice to delete.
     */
    where: VirtualDeviceWhereUniqueInput
  }


  /**
   * VirtualDevice deleteMany
   */
  export type VirtualDeviceDeleteManyArgs = {
    /**
     * Filter which VirtualDevices to delete
     */
    where?: VirtualDeviceWhereInput
  }


  /**
   * VirtualDevice.devices
   */
  export type VirtualDevice$devicesArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    where?: DeviceWhereInput
    orderBy?: Enumerable<DeviceOrderByWithRelationInput>
    cursor?: DeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DeviceScalarFieldEnum>
  }


  /**
   * VirtualDevice without action
   */
  export type VirtualDeviceArgs = {
    /**
     * Select specific fields to fetch from the VirtualDevice
     */
    select?: VirtualDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VirtualDeviceInclude | null
  }



  /**
   * Model Group
   */


  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _avg: GroupAvgAggregateOutputType | null
    _sum: GroupSumAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupAvgAggregateOutputType = {
    id: number | null
    parentId: number | null
    lat: number | null
    lng: number | null
    tenantId: number | null
  }

  export type GroupSumAggregateOutputType = {
    id: number | null
    parentId: number | null
    lat: number | null
    lng: number | null
    tenantId: number | null
  }

  export type GroupMinAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
    parentId: number | null
    location: string | null
    lat: number | null
    lng: number | null
    ip: string | null
    tenantId: number | null
  }

  export type GroupMaxAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
    parentId: number | null
    location: string | null
    lat: number | null
    lng: number | null
    ip: string | null
    tenantId: number | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    name: number
    type: number
    createdAt: number
    updatedAt: number
    parentId: number
    location: number
    lat: number
    lng: number
    ip: number
    attributes: number
    tenantId: number
    _all: number
  }


  export type GroupAvgAggregateInputType = {
    id?: true
    parentId?: true
    lat?: true
    lng?: true
    tenantId?: true
  }

  export type GroupSumAggregateInputType = {
    id?: true
    parentId?: true
    lat?: true
    lng?: true
    tenantId?: true
  }

  export type GroupMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    parentId?: true
    location?: true
    lat?: true
    lng?: true
    ip?: true
    tenantId?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    parentId?: true
    location?: true
    lat?: true
    lng?: true
    ip?: true
    tenantId?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    parentId?: true
    location?: true
    lat?: true
    lng?: true
    ip?: true
    attributes?: true
    tenantId?: true
    _all?: true
  }

  export type GroupAggregateArgs = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: Enumerable<GroupOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs = {
    where?: GroupWhereInput
    orderBy?: Enumerable<GroupOrderByWithAggregationInput>
    by: GroupScalarFieldEnum[]
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _avg?: GroupAvgAggregateInputType
    _sum?: GroupSumAggregateInputType
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }


  export type GroupGroupByOutputType = {
    id: number
    name: string
    type: string | null
    createdAt: Date
    updatedAt: Date
    parentId: number | null
    location: string | null
    lat: number | null
    lng: number | null
    ip: string | null
    attributes: JsonValue | null
    tenantId: number | null
    _count: GroupCountAggregateOutputType | null
    _avg: GroupAvgAggregateOutputType | null
    _sum: GroupSumAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect = {
    id?: boolean
    name?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentId?: boolean
    location?: boolean
    lat?: boolean
    lng?: boolean
    ip?: boolean
    attributes?: boolean
    tenantId?: boolean
    parent?: boolean | GroupArgs
    subgroups?: boolean | Group$subgroupsArgs
    devices?: boolean | Group$devicesArgs
    _count?: boolean | GroupCountOutputTypeArgs
  }


  export type GroupInclude = {
    parent?: boolean | GroupArgs
    subgroups?: boolean | Group$subgroupsArgs
    devices?: boolean | Group$devicesArgs
    _count?: boolean | GroupCountOutputTypeArgs
  }

  export type GroupGetPayload<S extends boolean | null | undefined | GroupArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Group :
    S extends undefined ? never :
    S extends { include: any } & (GroupArgs | GroupFindManyArgs)
    ? Group  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'parent' ? GroupGetPayload<S['include'][P]> | null :
        P extends 'subgroups' ? Array < GroupGetPayload<S['include'][P]>>  :
        P extends 'devices' ? Array < DeviceGetPayload<S['include'][P]>>  :
        P extends '_count' ? GroupCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (GroupArgs | GroupFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'parent' ? GroupGetPayload<S['select'][P]> | null :
        P extends 'subgroups' ? Array < GroupGetPayload<S['select'][P]>>  :
        P extends 'devices' ? Array < DeviceGetPayload<S['select'][P]>>  :
        P extends '_count' ? GroupCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Group ? Group[P] : never
  } 
      : Group


  type GroupCountArgs = 
    Omit<GroupFindManyArgs, 'select' | 'include'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GroupFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, GroupFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Group'> extends True ? Prisma__GroupClient<GroupGetPayload<T>> : Prisma__GroupClient<GroupGetPayload<T> | null, null>

    /**
     * Find one Group that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, GroupFindUniqueOrThrowArgs>
    ): Prisma__GroupClient<GroupGetPayload<T>>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GroupFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, GroupFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Group'> extends True ? Prisma__GroupClient<GroupGetPayload<T>> : Prisma__GroupClient<GroupGetPayload<T> | null, null>

    /**
     * Find the first Group that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(
      args?: SelectSubset<T, GroupFindFirstOrThrowArgs>
    ): Prisma__GroupClient<GroupGetPayload<T>>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GroupFindManyArgs>(
      args?: SelectSubset<T, GroupFindManyArgs>
    ): Prisma.PrismaPromise<Array<GroupGetPayload<T>>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
    **/
    create<T extends GroupCreateArgs>(
      args: SelectSubset<T, GroupCreateArgs>
    ): Prisma__GroupClient<GroupGetPayload<T>>

    /**
     * Create many Groups.
     *     @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     *     @example
     *     // Create many Groups
     *     const group = await prisma.group.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends GroupCreateManyArgs>(
      args?: SelectSubset<T, GroupCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
    **/
    delete<T extends GroupDeleteArgs>(
      args: SelectSubset<T, GroupDeleteArgs>
    ): Prisma__GroupClient<GroupGetPayload<T>>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GroupUpdateArgs>(
      args: SelectSubset<T, GroupUpdateArgs>
    ): Prisma__GroupClient<GroupGetPayload<T>>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GroupDeleteManyArgs>(
      args?: SelectSubset<T, GroupDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GroupUpdateManyArgs>(
      args: SelectSubset<T, GroupUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
    **/
    upsert<T extends GroupUpsertArgs>(
      args: SelectSubset<T, GroupUpsertArgs>
    ): Prisma__GroupClient<GroupGetPayload<T>>

    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__GroupClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    parent<T extends GroupArgs= {}>(args?: Subset<T, GroupArgs>): Prisma__GroupClient<GroupGetPayload<T> | Null>;

    subgroups<T extends Group$subgroupsArgs= {}>(args?: Subset<T, Group$subgroupsArgs>): Prisma.PrismaPromise<Array<GroupGetPayload<T>>| Null>;

    devices<T extends Group$devicesArgs= {}>(args?: Subset<T, Group$devicesArgs>): Prisma.PrismaPromise<Array<DeviceGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Group base type for findUnique actions
   */
  export type GroupFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUnique
   */
  export interface GroupFindUniqueArgs extends GroupFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }


  /**
   * Group base type for findFirst actions
   */
  export type GroupFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: Enumerable<GroupOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: Enumerable<GroupScalarFieldEnum>
  }

  /**
   * Group findFirst
   */
  export interface GroupFindFirstArgs extends GroupFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: Enumerable<GroupOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: Enumerable<GroupScalarFieldEnum>
  }


  /**
   * Group findMany
   */
  export type GroupFindManyArgs = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: Enumerable<GroupOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: Enumerable<GroupScalarFieldEnum>
  }


  /**
   * Group create
   */
  export type GroupCreateArgs = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }


  /**
   * Group createMany
   */
  export type GroupCreateManyArgs = {
    /**
     * The data used to create many Groups.
     */
    data: Enumerable<GroupCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Group update
   */
  export type GroupUpdateArgs = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }


  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
  }


  /**
   * Group upsert
   */
  export type GroupUpsertArgs = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }


  /**
   * Group delete
   */
  export type GroupDeleteArgs = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }


  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
  }


  /**
   * Group.subgroups
   */
  export type Group$subgroupsArgs = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
    where?: GroupWhereInput
    orderBy?: Enumerable<GroupOrderByWithRelationInput>
    cursor?: GroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<GroupScalarFieldEnum>
  }


  /**
   * Group.devices
   */
  export type Group$devicesArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    where?: DeviceWhereInput
    orderBy?: Enumerable<DeviceOrderByWithRelationInput>
    cursor?: DeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DeviceScalarFieldEnum>
  }


  /**
   * Group without action
   */
  export type GroupArgs = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude | null
  }



  /**
   * Model Alert
   */


  export type AggregateAlert = {
    _count: AlertCountAggregateOutputType | null
    _avg: AlertAvgAggregateOutputType | null
    _sum: AlertSumAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  export type AlertAvgAggregateOutputType = {
    id: number | null
    deviceId: number | null
    acknowledgedBy: number | null
  }

  export type AlertSumAggregateOutputType = {
    id: number | null
    deviceId: number | null
    acknowledgedBy: number | null
  }

  export type AlertMinAggregateOutputType = {
    id: number | null
    deviceId: number | null
    type: string | null
    message: string | null
    level: string | null
    createdAt: Date | null
    updatedAt: Date | null
    acknowledgedBy: number | null
  }

  export type AlertMaxAggregateOutputType = {
    id: number | null
    deviceId: number | null
    type: string | null
    message: string | null
    level: string | null
    createdAt: Date | null
    updatedAt: Date | null
    acknowledgedBy: number | null
  }

  export type AlertCountAggregateOutputType = {
    id: number
    deviceId: number
    type: number
    message: number
    level: number
    createdAt: number
    updatedAt: number
    attributes: number
    acknowledgedBy: number
    _all: number
  }


  export type AlertAvgAggregateInputType = {
    id?: true
    deviceId?: true
    acknowledgedBy?: true
  }

  export type AlertSumAggregateInputType = {
    id?: true
    deviceId?: true
    acknowledgedBy?: true
  }

  export type AlertMinAggregateInputType = {
    id?: true
    deviceId?: true
    type?: true
    message?: true
    level?: true
    createdAt?: true
    updatedAt?: true
    acknowledgedBy?: true
  }

  export type AlertMaxAggregateInputType = {
    id?: true
    deviceId?: true
    type?: true
    message?: true
    level?: true
    createdAt?: true
    updatedAt?: true
    acknowledgedBy?: true
  }

  export type AlertCountAggregateInputType = {
    id?: true
    deviceId?: true
    type?: true
    message?: true
    level?: true
    createdAt?: true
    updatedAt?: true
    attributes?: true
    acknowledgedBy?: true
    _all?: true
  }

  export type AlertAggregateArgs = {
    /**
     * Filter which Alert to aggregate.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: Enumerable<AlertOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alerts
    **/
    _count?: true | AlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlertAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlertSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertMaxAggregateInputType
  }

  export type GetAlertAggregateType<T extends AlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert[P]>
      : GetScalarType<T[P], AggregateAlert[P]>
  }




  export type AlertGroupByArgs = {
    where?: AlertWhereInput
    orderBy?: Enumerable<AlertOrderByWithAggregationInput>
    by: AlertScalarFieldEnum[]
    having?: AlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertCountAggregateInputType | true
    _avg?: AlertAvgAggregateInputType
    _sum?: AlertSumAggregateInputType
    _min?: AlertMinAggregateInputType
    _max?: AlertMaxAggregateInputType
  }


  export type AlertGroupByOutputType = {
    id: number
    deviceId: number
    type: string | null
    message: string | null
    level: string | null
    createdAt: Date
    updatedAt: Date
    attributes: JsonValue
    acknowledgedBy: number | null
    _count: AlertCountAggregateOutputType | null
    _avg: AlertAvgAggregateOutputType | null
    _sum: AlertSumAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  type GetAlertGroupByPayload<T extends AlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertGroupByOutputType[P]>
            : GetScalarType<T[P], AlertGroupByOutputType[P]>
        }
      >
    >


  export type AlertSelect = {
    id?: boolean
    deviceId?: boolean
    type?: boolean
    message?: boolean
    level?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attributes?: boolean
    acknowledgedBy?: boolean
    device?: boolean | DeviceArgs
  }


  export type AlertInclude = {
    device?: boolean | DeviceArgs
  }

  export type AlertGetPayload<S extends boolean | null | undefined | AlertArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Alert :
    S extends undefined ? never :
    S extends { include: any } & (AlertArgs | AlertFindManyArgs)
    ? Alert  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'device' ? DeviceGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (AlertArgs | AlertFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'device' ? DeviceGetPayload<S['select'][P]> :  P extends keyof Alert ? Alert[P] : never
  } 
      : Alert


  type AlertCountArgs = 
    Omit<AlertFindManyArgs, 'select' | 'include'> & {
      select?: AlertCountAggregateInputType | true
    }

  export interface AlertDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Alert that matches the filter.
     * @param {AlertFindUniqueArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AlertFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AlertFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Alert'> extends True ? Prisma__AlertClient<AlertGetPayload<T>> : Prisma__AlertClient<AlertGetPayload<T> | null, null>

    /**
     * Find one Alert that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AlertFindUniqueOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AlertFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AlertFindUniqueOrThrowArgs>
    ): Prisma__AlertClient<AlertGetPayload<T>>

    /**
     * Find the first Alert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AlertFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AlertFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Alert'> extends True ? Prisma__AlertClient<AlertGetPayload<T>> : Prisma__AlertClient<AlertGetPayload<T> | null, null>

    /**
     * Find the first Alert that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AlertFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AlertFindFirstOrThrowArgs>
    ): Prisma__AlertClient<AlertGetPayload<T>>

    /**
     * Find zero or more Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alerts
     * const alerts = await prisma.alert.findMany()
     * 
     * // Get first 10 Alerts
     * const alerts = await prisma.alert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertWithIdOnly = await prisma.alert.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AlertFindManyArgs>(
      args?: SelectSubset<T, AlertFindManyArgs>
    ): Prisma.PrismaPromise<Array<AlertGetPayload<T>>>

    /**
     * Create a Alert.
     * @param {AlertCreateArgs} args - Arguments to create a Alert.
     * @example
     * // Create one Alert
     * const Alert = await prisma.alert.create({
     *   data: {
     *     // ... data to create a Alert
     *   }
     * })
     * 
    **/
    create<T extends AlertCreateArgs>(
      args: SelectSubset<T, AlertCreateArgs>
    ): Prisma__AlertClient<AlertGetPayload<T>>

    /**
     * Create many Alerts.
     *     @param {AlertCreateManyArgs} args - Arguments to create many Alerts.
     *     @example
     *     // Create many Alerts
     *     const alert = await prisma.alert.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AlertCreateManyArgs>(
      args?: SelectSubset<T, AlertCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Alert.
     * @param {AlertDeleteArgs} args - Arguments to delete one Alert.
     * @example
     * // Delete one Alert
     * const Alert = await prisma.alert.delete({
     *   where: {
     *     // ... filter to delete one Alert
     *   }
     * })
     * 
    **/
    delete<T extends AlertDeleteArgs>(
      args: SelectSubset<T, AlertDeleteArgs>
    ): Prisma__AlertClient<AlertGetPayload<T>>

    /**
     * Update one Alert.
     * @param {AlertUpdateArgs} args - Arguments to update one Alert.
     * @example
     * // Update one Alert
     * const alert = await prisma.alert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AlertUpdateArgs>(
      args: SelectSubset<T, AlertUpdateArgs>
    ): Prisma__AlertClient<AlertGetPayload<T>>

    /**
     * Delete zero or more Alerts.
     * @param {AlertDeleteManyArgs} args - Arguments to filter Alerts to delete.
     * @example
     * // Delete a few Alerts
     * const { count } = await prisma.alert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AlertDeleteManyArgs>(
      args?: SelectSubset<T, AlertDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AlertUpdateManyArgs>(
      args: SelectSubset<T, AlertUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Alert.
     * @param {AlertUpsertArgs} args - Arguments to update or create a Alert.
     * @example
     * // Update or create a Alert
     * const alert = await prisma.alert.upsert({
     *   create: {
     *     // ... data to create a Alert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert we want to update
     *   }
     * })
    **/
    upsert<T extends AlertUpsertArgs>(
      args: SelectSubset<T, AlertUpsertArgs>
    ): Prisma__AlertClient<AlertGetPayload<T>>

    /**
     * Count the number of Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertCountArgs} args - Arguments to filter Alerts to count.
     * @example
     * // Count the number of Alerts
     * const count = await prisma.alert.count({
     *   where: {
     *     // ... the filter for the Alerts we want to count
     *   }
     * })
    **/
    count<T extends AlertCountArgs>(
      args?: Subset<T, AlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertAggregateArgs>(args: Subset<T, AlertAggregateArgs>): Prisma.PrismaPromise<GetAlertAggregateType<T>>

    /**
     * Group by Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertGroupByArgs['orderBy'] }
        : { orderBy?: AlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Alert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AlertClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    device<T extends DeviceArgs= {}>(args?: Subset<T, DeviceArgs>): Prisma__DeviceClient<DeviceGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Alert base type for findUnique actions
   */
  export type AlertFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findUnique
   */
  export interface AlertFindUniqueArgs extends AlertFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Alert findUniqueOrThrow
   */
  export type AlertFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }


  /**
   * Alert base type for findFirst actions
   */
  export type AlertFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: Enumerable<AlertOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: Enumerable<AlertScalarFieldEnum>
  }

  /**
   * Alert findFirst
   */
  export interface AlertFindFirstArgs extends AlertFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Alert findFirstOrThrow
   */
  export type AlertFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: Enumerable<AlertOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: Enumerable<AlertScalarFieldEnum>
  }


  /**
   * Alert findMany
   */
  export type AlertFindManyArgs = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
    /**
     * Filter, which Alerts to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: Enumerable<AlertOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    distinct?: Enumerable<AlertScalarFieldEnum>
  }


  /**
   * Alert create
   */
  export type AlertCreateArgs = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
    /**
     * The data needed to create a Alert.
     */
    data: XOR<AlertCreateInput, AlertUncheckedCreateInput>
  }


  /**
   * Alert createMany
   */
  export type AlertCreateManyArgs = {
    /**
     * The data used to create many Alerts.
     */
    data: Enumerable<AlertCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Alert update
   */
  export type AlertUpdateArgs = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
    /**
     * The data needed to update a Alert.
     */
    data: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
    /**
     * Choose, which Alert to update.
     */
    where: AlertWhereUniqueInput
  }


  /**
   * Alert updateMany
   */
  export type AlertUpdateManyArgs = {
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
  }


  /**
   * Alert upsert
   */
  export type AlertUpsertArgs = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
    /**
     * The filter to search for the Alert to update in case it exists.
     */
    where: AlertWhereUniqueInput
    /**
     * In case the Alert found by the `where` argument doesn't exist, create a new Alert with this data.
     */
    create: XOR<AlertCreateInput, AlertUncheckedCreateInput>
    /**
     * In case the Alert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
  }


  /**
   * Alert delete
   */
  export type AlertDeleteArgs = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
    /**
     * Filter which Alert to delete.
     */
    where: AlertWhereUniqueInput
  }


  /**
   * Alert deleteMany
   */
  export type AlertDeleteManyArgs = {
    /**
     * Filter which Alerts to delete
     */
    where?: AlertWhereInput
  }


  /**
   * Alert without action
   */
  export type AlertArgs = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
  }



  /**
   * Model Decoder
   */


  export type AggregateDecoder = {
    _count: DecoderCountAggregateOutputType | null
    _avg: DecoderAvgAggregateOutputType | null
    _sum: DecoderSumAggregateOutputType | null
    _min: DecoderMinAggregateOutputType | null
    _max: DecoderMaxAggregateOutputType | null
  }

  export type DecoderAvgAggregateOutputType = {
    id: number | null
    tenantId: number | null
  }

  export type DecoderSumAggregateOutputType = {
    id: number | null
    tenantId: number | null
  }

  export type DecoderMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    fnc: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: number | null
  }

  export type DecoderMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    fnc: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: number | null
  }

  export type DecoderCountAggregateOutputType = {
    id: number
    name: number
    description: number
    fnc: number
    createdAt: number
    updatedAt: number
    tenantId: number
    _all: number
  }


  export type DecoderAvgAggregateInputType = {
    id?: true
    tenantId?: true
  }

  export type DecoderSumAggregateInputType = {
    id?: true
    tenantId?: true
  }

  export type DecoderMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    fnc?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type DecoderMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    fnc?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type DecoderCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    fnc?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
    _all?: true
  }

  export type DecoderAggregateArgs = {
    /**
     * Filter which Decoder to aggregate.
     */
    where?: DecoderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decoders to fetch.
     */
    orderBy?: Enumerable<DecoderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DecoderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decoders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decoders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Decoders
    **/
    _count?: true | DecoderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DecoderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DecoderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DecoderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DecoderMaxAggregateInputType
  }

  export type GetDecoderAggregateType<T extends DecoderAggregateArgs> = {
        [P in keyof T & keyof AggregateDecoder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDecoder[P]>
      : GetScalarType<T[P], AggregateDecoder[P]>
  }




  export type DecoderGroupByArgs = {
    where?: DecoderWhereInput
    orderBy?: Enumerable<DecoderOrderByWithAggregationInput>
    by: DecoderScalarFieldEnum[]
    having?: DecoderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DecoderCountAggregateInputType | true
    _avg?: DecoderAvgAggregateInputType
    _sum?: DecoderSumAggregateInputType
    _min?: DecoderMinAggregateInputType
    _max?: DecoderMaxAggregateInputType
  }


  export type DecoderGroupByOutputType = {
    id: number
    name: string
    description: string
    fnc: string
    createdAt: Date
    updatedAt: Date
    tenantId: number | null
    _count: DecoderCountAggregateOutputType | null
    _avg: DecoderAvgAggregateOutputType | null
    _sum: DecoderSumAggregateOutputType | null
    _min: DecoderMinAggregateOutputType | null
    _max: DecoderMaxAggregateOutputType | null
  }

  type GetDecoderGroupByPayload<T extends DecoderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<DecoderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DecoderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DecoderGroupByOutputType[P]>
            : GetScalarType<T[P], DecoderGroupByOutputType[P]>
        }
      >
    >


  export type DecoderSelect = {
    id?: boolean
    name?: boolean
    description?: boolean
    fnc?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
    deviceProfile?: boolean | Decoder$deviceProfileArgs
    _count?: boolean | DecoderCountOutputTypeArgs
  }


  export type DecoderInclude = {
    deviceProfile?: boolean | Decoder$deviceProfileArgs
    _count?: boolean | DecoderCountOutputTypeArgs
  }

  export type DecoderGetPayload<S extends boolean | null | undefined | DecoderArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Decoder :
    S extends undefined ? never :
    S extends { include: any } & (DecoderArgs | DecoderFindManyArgs)
    ? Decoder  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'deviceProfile' ? Array < DeviceProfileGetPayload<S['include'][P]>>  :
        P extends '_count' ? DecoderCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (DecoderArgs | DecoderFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'deviceProfile' ? Array < DeviceProfileGetPayload<S['select'][P]>>  :
        P extends '_count' ? DecoderCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Decoder ? Decoder[P] : never
  } 
      : Decoder


  type DecoderCountArgs = 
    Omit<DecoderFindManyArgs, 'select' | 'include'> & {
      select?: DecoderCountAggregateInputType | true
    }

  export interface DecoderDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Decoder that matches the filter.
     * @param {DecoderFindUniqueArgs} args - Arguments to find a Decoder
     * @example
     * // Get one Decoder
     * const decoder = await prisma.decoder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DecoderFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DecoderFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Decoder'> extends True ? Prisma__DecoderClient<DecoderGetPayload<T>> : Prisma__DecoderClient<DecoderGetPayload<T> | null, null>

    /**
     * Find one Decoder that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DecoderFindUniqueOrThrowArgs} args - Arguments to find a Decoder
     * @example
     * // Get one Decoder
     * const decoder = await prisma.decoder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DecoderFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DecoderFindUniqueOrThrowArgs>
    ): Prisma__DecoderClient<DecoderGetPayload<T>>

    /**
     * Find the first Decoder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecoderFindFirstArgs} args - Arguments to find a Decoder
     * @example
     * // Get one Decoder
     * const decoder = await prisma.decoder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DecoderFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DecoderFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Decoder'> extends True ? Prisma__DecoderClient<DecoderGetPayload<T>> : Prisma__DecoderClient<DecoderGetPayload<T> | null, null>

    /**
     * Find the first Decoder that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecoderFindFirstOrThrowArgs} args - Arguments to find a Decoder
     * @example
     * // Get one Decoder
     * const decoder = await prisma.decoder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DecoderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DecoderFindFirstOrThrowArgs>
    ): Prisma__DecoderClient<DecoderGetPayload<T>>

    /**
     * Find zero or more Decoders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecoderFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Decoders
     * const decoders = await prisma.decoder.findMany()
     * 
     * // Get first 10 Decoders
     * const decoders = await prisma.decoder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const decoderWithIdOnly = await prisma.decoder.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DecoderFindManyArgs>(
      args?: SelectSubset<T, DecoderFindManyArgs>
    ): Prisma.PrismaPromise<Array<DecoderGetPayload<T>>>

    /**
     * Create a Decoder.
     * @param {DecoderCreateArgs} args - Arguments to create a Decoder.
     * @example
     * // Create one Decoder
     * const Decoder = await prisma.decoder.create({
     *   data: {
     *     // ... data to create a Decoder
     *   }
     * })
     * 
    **/
    create<T extends DecoderCreateArgs>(
      args: SelectSubset<T, DecoderCreateArgs>
    ): Prisma__DecoderClient<DecoderGetPayload<T>>

    /**
     * Create many Decoders.
     *     @param {DecoderCreateManyArgs} args - Arguments to create many Decoders.
     *     @example
     *     // Create many Decoders
     *     const decoder = await prisma.decoder.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DecoderCreateManyArgs>(
      args?: SelectSubset<T, DecoderCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Decoder.
     * @param {DecoderDeleteArgs} args - Arguments to delete one Decoder.
     * @example
     * // Delete one Decoder
     * const Decoder = await prisma.decoder.delete({
     *   where: {
     *     // ... filter to delete one Decoder
     *   }
     * })
     * 
    **/
    delete<T extends DecoderDeleteArgs>(
      args: SelectSubset<T, DecoderDeleteArgs>
    ): Prisma__DecoderClient<DecoderGetPayload<T>>

    /**
     * Update one Decoder.
     * @param {DecoderUpdateArgs} args - Arguments to update one Decoder.
     * @example
     * // Update one Decoder
     * const decoder = await prisma.decoder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DecoderUpdateArgs>(
      args: SelectSubset<T, DecoderUpdateArgs>
    ): Prisma__DecoderClient<DecoderGetPayload<T>>

    /**
     * Delete zero or more Decoders.
     * @param {DecoderDeleteManyArgs} args - Arguments to filter Decoders to delete.
     * @example
     * // Delete a few Decoders
     * const { count } = await prisma.decoder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DecoderDeleteManyArgs>(
      args?: SelectSubset<T, DecoderDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Decoders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecoderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Decoders
     * const decoder = await prisma.decoder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DecoderUpdateManyArgs>(
      args: SelectSubset<T, DecoderUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Decoder.
     * @param {DecoderUpsertArgs} args - Arguments to update or create a Decoder.
     * @example
     * // Update or create a Decoder
     * const decoder = await prisma.decoder.upsert({
     *   create: {
     *     // ... data to create a Decoder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Decoder we want to update
     *   }
     * })
    **/
    upsert<T extends DecoderUpsertArgs>(
      args: SelectSubset<T, DecoderUpsertArgs>
    ): Prisma__DecoderClient<DecoderGetPayload<T>>

    /**
     * Count the number of Decoders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecoderCountArgs} args - Arguments to filter Decoders to count.
     * @example
     * // Count the number of Decoders
     * const count = await prisma.decoder.count({
     *   where: {
     *     // ... the filter for the Decoders we want to count
     *   }
     * })
    **/
    count<T extends DecoderCountArgs>(
      args?: Subset<T, DecoderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DecoderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Decoder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecoderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DecoderAggregateArgs>(args: Subset<T, DecoderAggregateArgs>): Prisma.PrismaPromise<GetDecoderAggregateType<T>>

    /**
     * Group by Decoder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecoderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DecoderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DecoderGroupByArgs['orderBy'] }
        : { orderBy?: DecoderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DecoderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDecoderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Decoder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DecoderClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    deviceProfile<T extends Decoder$deviceProfileArgs= {}>(args?: Subset<T, Decoder$deviceProfileArgs>): Prisma.PrismaPromise<Array<DeviceProfileGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Decoder base type for findUnique actions
   */
  export type DecoderFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Decoder
     */
    select?: DecoderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DecoderInclude | null
    /**
     * Filter, which Decoder to fetch.
     */
    where: DecoderWhereUniqueInput
  }

  /**
   * Decoder findUnique
   */
  export interface DecoderFindUniqueArgs extends DecoderFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Decoder findUniqueOrThrow
   */
  export type DecoderFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Decoder
     */
    select?: DecoderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DecoderInclude | null
    /**
     * Filter, which Decoder to fetch.
     */
    where: DecoderWhereUniqueInput
  }


  /**
   * Decoder base type for findFirst actions
   */
  export type DecoderFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Decoder
     */
    select?: DecoderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DecoderInclude | null
    /**
     * Filter, which Decoder to fetch.
     */
    where?: DecoderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decoders to fetch.
     */
    orderBy?: Enumerable<DecoderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Decoders.
     */
    cursor?: DecoderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decoders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decoders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Decoders.
     */
    distinct?: Enumerable<DecoderScalarFieldEnum>
  }

  /**
   * Decoder findFirst
   */
  export interface DecoderFindFirstArgs extends DecoderFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Decoder findFirstOrThrow
   */
  export type DecoderFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Decoder
     */
    select?: DecoderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DecoderInclude | null
    /**
     * Filter, which Decoder to fetch.
     */
    where?: DecoderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decoders to fetch.
     */
    orderBy?: Enumerable<DecoderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Decoders.
     */
    cursor?: DecoderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decoders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decoders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Decoders.
     */
    distinct?: Enumerable<DecoderScalarFieldEnum>
  }


  /**
   * Decoder findMany
   */
  export type DecoderFindManyArgs = {
    /**
     * Select specific fields to fetch from the Decoder
     */
    select?: DecoderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DecoderInclude | null
    /**
     * Filter, which Decoders to fetch.
     */
    where?: DecoderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decoders to fetch.
     */
    orderBy?: Enumerable<DecoderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Decoders.
     */
    cursor?: DecoderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decoders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decoders.
     */
    skip?: number
    distinct?: Enumerable<DecoderScalarFieldEnum>
  }


  /**
   * Decoder create
   */
  export type DecoderCreateArgs = {
    /**
     * Select specific fields to fetch from the Decoder
     */
    select?: DecoderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DecoderInclude | null
    /**
     * The data needed to create a Decoder.
     */
    data: XOR<DecoderCreateInput, DecoderUncheckedCreateInput>
  }


  /**
   * Decoder createMany
   */
  export type DecoderCreateManyArgs = {
    /**
     * The data used to create many Decoders.
     */
    data: Enumerable<DecoderCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Decoder update
   */
  export type DecoderUpdateArgs = {
    /**
     * Select specific fields to fetch from the Decoder
     */
    select?: DecoderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DecoderInclude | null
    /**
     * The data needed to update a Decoder.
     */
    data: XOR<DecoderUpdateInput, DecoderUncheckedUpdateInput>
    /**
     * Choose, which Decoder to update.
     */
    where: DecoderWhereUniqueInput
  }


  /**
   * Decoder updateMany
   */
  export type DecoderUpdateManyArgs = {
    /**
     * The data used to update Decoders.
     */
    data: XOR<DecoderUpdateManyMutationInput, DecoderUncheckedUpdateManyInput>
    /**
     * Filter which Decoders to update
     */
    where?: DecoderWhereInput
  }


  /**
   * Decoder upsert
   */
  export type DecoderUpsertArgs = {
    /**
     * Select specific fields to fetch from the Decoder
     */
    select?: DecoderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DecoderInclude | null
    /**
     * The filter to search for the Decoder to update in case it exists.
     */
    where: DecoderWhereUniqueInput
    /**
     * In case the Decoder found by the `where` argument doesn't exist, create a new Decoder with this data.
     */
    create: XOR<DecoderCreateInput, DecoderUncheckedCreateInput>
    /**
     * In case the Decoder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DecoderUpdateInput, DecoderUncheckedUpdateInput>
  }


  /**
   * Decoder delete
   */
  export type DecoderDeleteArgs = {
    /**
     * Select specific fields to fetch from the Decoder
     */
    select?: DecoderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DecoderInclude | null
    /**
     * Filter which Decoder to delete.
     */
    where: DecoderWhereUniqueInput
  }


  /**
   * Decoder deleteMany
   */
  export type DecoderDeleteManyArgs = {
    /**
     * Filter which Decoders to delete
     */
    where?: DecoderWhereInput
  }


  /**
   * Decoder.deviceProfile
   */
  export type Decoder$deviceProfileArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    where?: DeviceProfileWhereInput
    orderBy?: Enumerable<DeviceProfileOrderByWithRelationInput>
    cursor?: DeviceProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DeviceProfileScalarFieldEnum>
  }


  /**
   * Decoder without action
   */
  export type DecoderArgs = {
    /**
     * Select specific fields to fetch from the Decoder
     */
    select?: DecoderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DecoderInclude | null
  }



  /**
   * Model DeviceType
   */


  export type AggregateDeviceType = {
    _count: DeviceTypeCountAggregateOutputType | null
    _avg: DeviceTypeAvgAggregateOutputType | null
    _sum: DeviceTypeSumAggregateOutputType | null
    _min: DeviceTypeMinAggregateOutputType | null
    _max: DeviceTypeMaxAggregateOutputType | null
  }

  export type DeviceTypeAvgAggregateOutputType = {
    id: number | null
    tenantId: number | null
  }

  export type DeviceTypeSumAggregateOutputType = {
    id: number | null
    tenantId: number | null
  }

  export type DeviceTypeMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: number | null
  }

  export type DeviceTypeMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: number | null
  }

  export type DeviceTypeCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    tenantId: number
    _all: number
  }


  export type DeviceTypeAvgAggregateInputType = {
    id?: true
    tenantId?: true
  }

  export type DeviceTypeSumAggregateInputType = {
    id?: true
    tenantId?: true
  }

  export type DeviceTypeMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type DeviceTypeMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type DeviceTypeCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
    _all?: true
  }

  export type DeviceTypeAggregateArgs = {
    /**
     * Filter which DeviceType to aggregate.
     */
    where?: DeviceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTypes to fetch.
     */
    orderBy?: Enumerable<DeviceTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeviceTypes
    **/
    _count?: true | DeviceTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeviceTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeviceTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceTypeMaxAggregateInputType
  }

  export type GetDeviceTypeAggregateType<T extends DeviceTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateDeviceType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeviceType[P]>
      : GetScalarType<T[P], AggregateDeviceType[P]>
  }




  export type DeviceTypeGroupByArgs = {
    where?: DeviceTypeWhereInput
    orderBy?: Enumerable<DeviceTypeOrderByWithAggregationInput>
    by: DeviceTypeScalarFieldEnum[]
    having?: DeviceTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceTypeCountAggregateInputType | true
    _avg?: DeviceTypeAvgAggregateInputType
    _sum?: DeviceTypeSumAggregateInputType
    _min?: DeviceTypeMinAggregateInputType
    _max?: DeviceTypeMaxAggregateInputType
  }


  export type DeviceTypeGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    tenantId: number | null
    _count: DeviceTypeCountAggregateOutputType | null
    _avg: DeviceTypeAvgAggregateOutputType | null
    _sum: DeviceTypeSumAggregateOutputType | null
    _min: DeviceTypeMinAggregateOutputType | null
    _max: DeviceTypeMaxAggregateOutputType | null
  }

  type GetDeviceTypeGroupByPayload<T extends DeviceTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<DeviceTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceTypeGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceTypeGroupByOutputType[P]>
        }
      >
    >


  export type DeviceTypeSelect = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
    deviceProfiles?: boolean | DeviceType$deviceProfilesArgs
    _count?: boolean | DeviceTypeCountOutputTypeArgs
  }


  export type DeviceTypeInclude = {
    deviceProfiles?: boolean | DeviceType$deviceProfilesArgs
    _count?: boolean | DeviceTypeCountOutputTypeArgs
  }

  export type DeviceTypeGetPayload<S extends boolean | null | undefined | DeviceTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? DeviceType :
    S extends undefined ? never :
    S extends { include: any } & (DeviceTypeArgs | DeviceTypeFindManyArgs)
    ? DeviceType  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'deviceProfiles' ? Array < DeviceProfileGetPayload<S['include'][P]>>  :
        P extends '_count' ? DeviceTypeCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (DeviceTypeArgs | DeviceTypeFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'deviceProfiles' ? Array < DeviceProfileGetPayload<S['select'][P]>>  :
        P extends '_count' ? DeviceTypeCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof DeviceType ? DeviceType[P] : never
  } 
      : DeviceType


  type DeviceTypeCountArgs = 
    Omit<DeviceTypeFindManyArgs, 'select' | 'include'> & {
      select?: DeviceTypeCountAggregateInputType | true
    }

  export interface DeviceTypeDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one DeviceType that matches the filter.
     * @param {DeviceTypeFindUniqueArgs} args - Arguments to find a DeviceType
     * @example
     * // Get one DeviceType
     * const deviceType = await prisma.deviceType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DeviceTypeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DeviceTypeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DeviceType'> extends True ? Prisma__DeviceTypeClient<DeviceTypeGetPayload<T>> : Prisma__DeviceTypeClient<DeviceTypeGetPayload<T> | null, null>

    /**
     * Find one DeviceType that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DeviceTypeFindUniqueOrThrowArgs} args - Arguments to find a DeviceType
     * @example
     * // Get one DeviceType
     * const deviceType = await prisma.deviceType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DeviceTypeFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DeviceTypeFindUniqueOrThrowArgs>
    ): Prisma__DeviceTypeClient<DeviceTypeGetPayload<T>>

    /**
     * Find the first DeviceType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeFindFirstArgs} args - Arguments to find a DeviceType
     * @example
     * // Get one DeviceType
     * const deviceType = await prisma.deviceType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DeviceTypeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DeviceTypeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DeviceType'> extends True ? Prisma__DeviceTypeClient<DeviceTypeGetPayload<T>> : Prisma__DeviceTypeClient<DeviceTypeGetPayload<T> | null, null>

    /**
     * Find the first DeviceType that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeFindFirstOrThrowArgs} args - Arguments to find a DeviceType
     * @example
     * // Get one DeviceType
     * const deviceType = await prisma.deviceType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DeviceTypeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DeviceTypeFindFirstOrThrowArgs>
    ): Prisma__DeviceTypeClient<DeviceTypeGetPayload<T>>

    /**
     * Find zero or more DeviceTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceTypes
     * const deviceTypes = await prisma.deviceType.findMany()
     * 
     * // Get first 10 DeviceTypes
     * const deviceTypes = await prisma.deviceType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceTypeWithIdOnly = await prisma.deviceType.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DeviceTypeFindManyArgs>(
      args?: SelectSubset<T, DeviceTypeFindManyArgs>
    ): Prisma.PrismaPromise<Array<DeviceTypeGetPayload<T>>>

    /**
     * Create a DeviceType.
     * @param {DeviceTypeCreateArgs} args - Arguments to create a DeviceType.
     * @example
     * // Create one DeviceType
     * const DeviceType = await prisma.deviceType.create({
     *   data: {
     *     // ... data to create a DeviceType
     *   }
     * })
     * 
    **/
    create<T extends DeviceTypeCreateArgs>(
      args: SelectSubset<T, DeviceTypeCreateArgs>
    ): Prisma__DeviceTypeClient<DeviceTypeGetPayload<T>>

    /**
     * Create many DeviceTypes.
     *     @param {DeviceTypeCreateManyArgs} args - Arguments to create many DeviceTypes.
     *     @example
     *     // Create many DeviceTypes
     *     const deviceType = await prisma.deviceType.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DeviceTypeCreateManyArgs>(
      args?: SelectSubset<T, DeviceTypeCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DeviceType.
     * @param {DeviceTypeDeleteArgs} args - Arguments to delete one DeviceType.
     * @example
     * // Delete one DeviceType
     * const DeviceType = await prisma.deviceType.delete({
     *   where: {
     *     // ... filter to delete one DeviceType
     *   }
     * })
     * 
    **/
    delete<T extends DeviceTypeDeleteArgs>(
      args: SelectSubset<T, DeviceTypeDeleteArgs>
    ): Prisma__DeviceTypeClient<DeviceTypeGetPayload<T>>

    /**
     * Update one DeviceType.
     * @param {DeviceTypeUpdateArgs} args - Arguments to update one DeviceType.
     * @example
     * // Update one DeviceType
     * const deviceType = await prisma.deviceType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DeviceTypeUpdateArgs>(
      args: SelectSubset<T, DeviceTypeUpdateArgs>
    ): Prisma__DeviceTypeClient<DeviceTypeGetPayload<T>>

    /**
     * Delete zero or more DeviceTypes.
     * @param {DeviceTypeDeleteManyArgs} args - Arguments to filter DeviceTypes to delete.
     * @example
     * // Delete a few DeviceTypes
     * const { count } = await prisma.deviceType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DeviceTypeDeleteManyArgs>(
      args?: SelectSubset<T, DeviceTypeDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceTypes
     * const deviceType = await prisma.deviceType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DeviceTypeUpdateManyArgs>(
      args: SelectSubset<T, DeviceTypeUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DeviceType.
     * @param {DeviceTypeUpsertArgs} args - Arguments to update or create a DeviceType.
     * @example
     * // Update or create a DeviceType
     * const deviceType = await prisma.deviceType.upsert({
     *   create: {
     *     // ... data to create a DeviceType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceType we want to update
     *   }
     * })
    **/
    upsert<T extends DeviceTypeUpsertArgs>(
      args: SelectSubset<T, DeviceTypeUpsertArgs>
    ): Prisma__DeviceTypeClient<DeviceTypeGetPayload<T>>

    /**
     * Count the number of DeviceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeCountArgs} args - Arguments to filter DeviceTypes to count.
     * @example
     * // Count the number of DeviceTypes
     * const count = await prisma.deviceType.count({
     *   where: {
     *     // ... the filter for the DeviceTypes we want to count
     *   }
     * })
    **/
    count<T extends DeviceTypeCountArgs>(
      args?: Subset<T, DeviceTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeviceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceTypeAggregateArgs>(args: Subset<T, DeviceTypeAggregateArgs>): Prisma.PrismaPromise<GetDeviceTypeAggregateType<T>>

    /**
     * Group by DeviceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceTypeGroupByArgs['orderBy'] }
        : { orderBy?: DeviceTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for DeviceType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DeviceTypeClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    deviceProfiles<T extends DeviceType$deviceProfilesArgs= {}>(args?: Subset<T, DeviceType$deviceProfilesArgs>): Prisma.PrismaPromise<Array<DeviceProfileGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * DeviceType base type for findUnique actions
   */
  export type DeviceTypeFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude | null
    /**
     * Filter, which DeviceType to fetch.
     */
    where: DeviceTypeWhereUniqueInput
  }

  /**
   * DeviceType findUnique
   */
  export interface DeviceTypeFindUniqueArgs extends DeviceTypeFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DeviceType findUniqueOrThrow
   */
  export type DeviceTypeFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude | null
    /**
     * Filter, which DeviceType to fetch.
     */
    where: DeviceTypeWhereUniqueInput
  }


  /**
   * DeviceType base type for findFirst actions
   */
  export type DeviceTypeFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude | null
    /**
     * Filter, which DeviceType to fetch.
     */
    where?: DeviceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTypes to fetch.
     */
    orderBy?: Enumerable<DeviceTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceTypes.
     */
    cursor?: DeviceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceTypes.
     */
    distinct?: Enumerable<DeviceTypeScalarFieldEnum>
  }

  /**
   * DeviceType findFirst
   */
  export interface DeviceTypeFindFirstArgs extends DeviceTypeFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DeviceType findFirstOrThrow
   */
  export type DeviceTypeFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude | null
    /**
     * Filter, which DeviceType to fetch.
     */
    where?: DeviceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTypes to fetch.
     */
    orderBy?: Enumerable<DeviceTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceTypes.
     */
    cursor?: DeviceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceTypes.
     */
    distinct?: Enumerable<DeviceTypeScalarFieldEnum>
  }


  /**
   * DeviceType findMany
   */
  export type DeviceTypeFindManyArgs = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude | null
    /**
     * Filter, which DeviceTypes to fetch.
     */
    where?: DeviceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTypes to fetch.
     */
    orderBy?: Enumerable<DeviceTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeviceTypes.
     */
    cursor?: DeviceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTypes.
     */
    skip?: number
    distinct?: Enumerable<DeviceTypeScalarFieldEnum>
  }


  /**
   * DeviceType create
   */
  export type DeviceTypeCreateArgs = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude | null
    /**
     * The data needed to create a DeviceType.
     */
    data: XOR<DeviceTypeCreateInput, DeviceTypeUncheckedCreateInput>
  }


  /**
   * DeviceType createMany
   */
  export type DeviceTypeCreateManyArgs = {
    /**
     * The data used to create many DeviceTypes.
     */
    data: Enumerable<DeviceTypeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DeviceType update
   */
  export type DeviceTypeUpdateArgs = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude | null
    /**
     * The data needed to update a DeviceType.
     */
    data: XOR<DeviceTypeUpdateInput, DeviceTypeUncheckedUpdateInput>
    /**
     * Choose, which DeviceType to update.
     */
    where: DeviceTypeWhereUniqueInput
  }


  /**
   * DeviceType updateMany
   */
  export type DeviceTypeUpdateManyArgs = {
    /**
     * The data used to update DeviceTypes.
     */
    data: XOR<DeviceTypeUpdateManyMutationInput, DeviceTypeUncheckedUpdateManyInput>
    /**
     * Filter which DeviceTypes to update
     */
    where?: DeviceTypeWhereInput
  }


  /**
   * DeviceType upsert
   */
  export type DeviceTypeUpsertArgs = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude | null
    /**
     * The filter to search for the DeviceType to update in case it exists.
     */
    where: DeviceTypeWhereUniqueInput
    /**
     * In case the DeviceType found by the `where` argument doesn't exist, create a new DeviceType with this data.
     */
    create: XOR<DeviceTypeCreateInput, DeviceTypeUncheckedCreateInput>
    /**
     * In case the DeviceType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceTypeUpdateInput, DeviceTypeUncheckedUpdateInput>
  }


  /**
   * DeviceType delete
   */
  export type DeviceTypeDeleteArgs = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude | null
    /**
     * Filter which DeviceType to delete.
     */
    where: DeviceTypeWhereUniqueInput
  }


  /**
   * DeviceType deleteMany
   */
  export type DeviceTypeDeleteManyArgs = {
    /**
     * Filter which DeviceTypes to delete
     */
    where?: DeviceTypeWhereInput
  }


  /**
   * DeviceType.deviceProfiles
   */
  export type DeviceType$deviceProfilesArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    where?: DeviceProfileWhereInput
    orderBy?: Enumerable<DeviceProfileOrderByWithRelationInput>
    cursor?: DeviceProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DeviceProfileScalarFieldEnum>
  }


  /**
   * DeviceType without action
   */
  export type DeviceTypeArgs = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude | null
  }



  /**
   * Model Firmware
   */


  export type AggregateFirmware = {
    _count: FirmwareCountAggregateOutputType | null
    _avg: FirmwareAvgAggregateOutputType | null
    _sum: FirmwareSumAggregateOutputType | null
    _min: FirmwareMinAggregateOutputType | null
    _max: FirmwareMaxAggregateOutputType | null
  }

  export type FirmwareAvgAggregateOutputType = {
    id: number | null
    size: number | null
    tenantId: number | null
  }

  export type FirmwareSumAggregateOutputType = {
    id: number | null
    size: number | null
    tenantId: number | null
  }

  export type FirmwareMinAggregateOutputType = {
    id: number | null
    name: string | null
    version: string | null
    description: string | null
    url: string | null
    size: number | null
    hash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: number | null
  }

  export type FirmwareMaxAggregateOutputType = {
    id: number | null
    name: string | null
    version: string | null
    description: string | null
    url: string | null
    size: number | null
    hash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: number | null
  }

  export type FirmwareCountAggregateOutputType = {
    id: number
    name: number
    version: number
    description: number
    url: number
    size: number
    hash: number
    createdAt: number
    updatedAt: number
    tenantId: number
    _all: number
  }


  export type FirmwareAvgAggregateInputType = {
    id?: true
    size?: true
    tenantId?: true
  }

  export type FirmwareSumAggregateInputType = {
    id?: true
    size?: true
    tenantId?: true
  }

  export type FirmwareMinAggregateInputType = {
    id?: true
    name?: true
    version?: true
    description?: true
    url?: true
    size?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type FirmwareMaxAggregateInputType = {
    id?: true
    name?: true
    version?: true
    description?: true
    url?: true
    size?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type FirmwareCountAggregateInputType = {
    id?: true
    name?: true
    version?: true
    description?: true
    url?: true
    size?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
    _all?: true
  }

  export type FirmwareAggregateArgs = {
    /**
     * Filter which Firmware to aggregate.
     */
    where?: FirmwareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firmware to fetch.
     */
    orderBy?: Enumerable<FirmwareOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FirmwareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firmware from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firmware.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Firmware
    **/
    _count?: true | FirmwareCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FirmwareAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FirmwareSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FirmwareMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FirmwareMaxAggregateInputType
  }

  export type GetFirmwareAggregateType<T extends FirmwareAggregateArgs> = {
        [P in keyof T & keyof AggregateFirmware]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFirmware[P]>
      : GetScalarType<T[P], AggregateFirmware[P]>
  }




  export type FirmwareGroupByArgs = {
    where?: FirmwareWhereInput
    orderBy?: Enumerable<FirmwareOrderByWithAggregationInput>
    by: FirmwareScalarFieldEnum[]
    having?: FirmwareScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FirmwareCountAggregateInputType | true
    _avg?: FirmwareAvgAggregateInputType
    _sum?: FirmwareSumAggregateInputType
    _min?: FirmwareMinAggregateInputType
    _max?: FirmwareMaxAggregateInputType
  }


  export type FirmwareGroupByOutputType = {
    id: number
    name: string | null
    version: string | null
    description: string | null
    url: string | null
    size: number | null
    hash: string | null
    createdAt: Date
    updatedAt: Date
    tenantId: number | null
    _count: FirmwareCountAggregateOutputType | null
    _avg: FirmwareAvgAggregateOutputType | null
    _sum: FirmwareSumAggregateOutputType | null
    _min: FirmwareMinAggregateOutputType | null
    _max: FirmwareMaxAggregateOutputType | null
  }

  type GetFirmwareGroupByPayload<T extends FirmwareGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<FirmwareGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FirmwareGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FirmwareGroupByOutputType[P]>
            : GetScalarType<T[P], FirmwareGroupByOutputType[P]>
        }
      >
    >


  export type FirmwareSelect = {
    id?: boolean
    name?: boolean
    version?: boolean
    description?: boolean
    url?: boolean
    size?: boolean
    hash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
    device?: boolean | Firmware$deviceArgs
    _count?: boolean | FirmwareCountOutputTypeArgs
  }


  export type FirmwareInclude = {
    device?: boolean | Firmware$deviceArgs
    _count?: boolean | FirmwareCountOutputTypeArgs
  }

  export type FirmwareGetPayload<S extends boolean | null | undefined | FirmwareArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Firmware :
    S extends undefined ? never :
    S extends { include: any } & (FirmwareArgs | FirmwareFindManyArgs)
    ? Firmware  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'device' ? Array < DeviceGetPayload<S['include'][P]>>  :
        P extends '_count' ? FirmwareCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (FirmwareArgs | FirmwareFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'device' ? Array < DeviceGetPayload<S['select'][P]>>  :
        P extends '_count' ? FirmwareCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Firmware ? Firmware[P] : never
  } 
      : Firmware


  type FirmwareCountArgs = 
    Omit<FirmwareFindManyArgs, 'select' | 'include'> & {
      select?: FirmwareCountAggregateInputType | true
    }

  export interface FirmwareDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Firmware that matches the filter.
     * @param {FirmwareFindUniqueArgs} args - Arguments to find a Firmware
     * @example
     * // Get one Firmware
     * const firmware = await prisma.firmware.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FirmwareFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FirmwareFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Firmware'> extends True ? Prisma__FirmwareClient<FirmwareGetPayload<T>> : Prisma__FirmwareClient<FirmwareGetPayload<T> | null, null>

    /**
     * Find one Firmware that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {FirmwareFindUniqueOrThrowArgs} args - Arguments to find a Firmware
     * @example
     * // Get one Firmware
     * const firmware = await prisma.firmware.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FirmwareFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, FirmwareFindUniqueOrThrowArgs>
    ): Prisma__FirmwareClient<FirmwareGetPayload<T>>

    /**
     * Find the first Firmware that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmwareFindFirstArgs} args - Arguments to find a Firmware
     * @example
     * // Get one Firmware
     * const firmware = await prisma.firmware.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FirmwareFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FirmwareFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Firmware'> extends True ? Prisma__FirmwareClient<FirmwareGetPayload<T>> : Prisma__FirmwareClient<FirmwareGetPayload<T> | null, null>

    /**
     * Find the first Firmware that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmwareFindFirstOrThrowArgs} args - Arguments to find a Firmware
     * @example
     * // Get one Firmware
     * const firmware = await prisma.firmware.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FirmwareFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FirmwareFindFirstOrThrowArgs>
    ): Prisma__FirmwareClient<FirmwareGetPayload<T>>

    /**
     * Find zero or more Firmware that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmwareFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Firmware
     * const firmware = await prisma.firmware.findMany()
     * 
     * // Get first 10 Firmware
     * const firmware = await prisma.firmware.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const firmwareWithIdOnly = await prisma.firmware.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FirmwareFindManyArgs>(
      args?: SelectSubset<T, FirmwareFindManyArgs>
    ): Prisma.PrismaPromise<Array<FirmwareGetPayload<T>>>

    /**
     * Create a Firmware.
     * @param {FirmwareCreateArgs} args - Arguments to create a Firmware.
     * @example
     * // Create one Firmware
     * const Firmware = await prisma.firmware.create({
     *   data: {
     *     // ... data to create a Firmware
     *   }
     * })
     * 
    **/
    create<T extends FirmwareCreateArgs>(
      args: SelectSubset<T, FirmwareCreateArgs>
    ): Prisma__FirmwareClient<FirmwareGetPayload<T>>

    /**
     * Create many Firmware.
     *     @param {FirmwareCreateManyArgs} args - Arguments to create many Firmware.
     *     @example
     *     // Create many Firmware
     *     const firmware = await prisma.firmware.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FirmwareCreateManyArgs>(
      args?: SelectSubset<T, FirmwareCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Firmware.
     * @param {FirmwareDeleteArgs} args - Arguments to delete one Firmware.
     * @example
     * // Delete one Firmware
     * const Firmware = await prisma.firmware.delete({
     *   where: {
     *     // ... filter to delete one Firmware
     *   }
     * })
     * 
    **/
    delete<T extends FirmwareDeleteArgs>(
      args: SelectSubset<T, FirmwareDeleteArgs>
    ): Prisma__FirmwareClient<FirmwareGetPayload<T>>

    /**
     * Update one Firmware.
     * @param {FirmwareUpdateArgs} args - Arguments to update one Firmware.
     * @example
     * // Update one Firmware
     * const firmware = await prisma.firmware.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FirmwareUpdateArgs>(
      args: SelectSubset<T, FirmwareUpdateArgs>
    ): Prisma__FirmwareClient<FirmwareGetPayload<T>>

    /**
     * Delete zero or more Firmware.
     * @param {FirmwareDeleteManyArgs} args - Arguments to filter Firmware to delete.
     * @example
     * // Delete a few Firmware
     * const { count } = await prisma.firmware.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FirmwareDeleteManyArgs>(
      args?: SelectSubset<T, FirmwareDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Firmware.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmwareUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Firmware
     * const firmware = await prisma.firmware.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FirmwareUpdateManyArgs>(
      args: SelectSubset<T, FirmwareUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Firmware.
     * @param {FirmwareUpsertArgs} args - Arguments to update or create a Firmware.
     * @example
     * // Update or create a Firmware
     * const firmware = await prisma.firmware.upsert({
     *   create: {
     *     // ... data to create a Firmware
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Firmware we want to update
     *   }
     * })
    **/
    upsert<T extends FirmwareUpsertArgs>(
      args: SelectSubset<T, FirmwareUpsertArgs>
    ): Prisma__FirmwareClient<FirmwareGetPayload<T>>

    /**
     * Count the number of Firmware.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmwareCountArgs} args - Arguments to filter Firmware to count.
     * @example
     * // Count the number of Firmware
     * const count = await prisma.firmware.count({
     *   where: {
     *     // ... the filter for the Firmware we want to count
     *   }
     * })
    **/
    count<T extends FirmwareCountArgs>(
      args?: Subset<T, FirmwareCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FirmwareCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Firmware.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmwareAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FirmwareAggregateArgs>(args: Subset<T, FirmwareAggregateArgs>): Prisma.PrismaPromise<GetFirmwareAggregateType<T>>

    /**
     * Group by Firmware.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmwareGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FirmwareGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FirmwareGroupByArgs['orderBy'] }
        : { orderBy?: FirmwareGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FirmwareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFirmwareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Firmware.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FirmwareClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    device<T extends Firmware$deviceArgs= {}>(args?: Subset<T, Firmware$deviceArgs>): Prisma.PrismaPromise<Array<DeviceGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Firmware base type for findUnique actions
   */
  export type FirmwareFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Firmware
     */
    select?: FirmwareSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FirmwareInclude | null
    /**
     * Filter, which Firmware to fetch.
     */
    where: FirmwareWhereUniqueInput
  }

  /**
   * Firmware findUnique
   */
  export interface FirmwareFindUniqueArgs extends FirmwareFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Firmware findUniqueOrThrow
   */
  export type FirmwareFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Firmware
     */
    select?: FirmwareSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FirmwareInclude | null
    /**
     * Filter, which Firmware to fetch.
     */
    where: FirmwareWhereUniqueInput
  }


  /**
   * Firmware base type for findFirst actions
   */
  export type FirmwareFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Firmware
     */
    select?: FirmwareSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FirmwareInclude | null
    /**
     * Filter, which Firmware to fetch.
     */
    where?: FirmwareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firmware to fetch.
     */
    orderBy?: Enumerable<FirmwareOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Firmware.
     */
    cursor?: FirmwareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firmware from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firmware.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Firmware.
     */
    distinct?: Enumerable<FirmwareScalarFieldEnum>
  }

  /**
   * Firmware findFirst
   */
  export interface FirmwareFindFirstArgs extends FirmwareFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Firmware findFirstOrThrow
   */
  export type FirmwareFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Firmware
     */
    select?: FirmwareSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FirmwareInclude | null
    /**
     * Filter, which Firmware to fetch.
     */
    where?: FirmwareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firmware to fetch.
     */
    orderBy?: Enumerable<FirmwareOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Firmware.
     */
    cursor?: FirmwareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firmware from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firmware.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Firmware.
     */
    distinct?: Enumerable<FirmwareScalarFieldEnum>
  }


  /**
   * Firmware findMany
   */
  export type FirmwareFindManyArgs = {
    /**
     * Select specific fields to fetch from the Firmware
     */
    select?: FirmwareSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FirmwareInclude | null
    /**
     * Filter, which Firmware to fetch.
     */
    where?: FirmwareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firmware to fetch.
     */
    orderBy?: Enumerable<FirmwareOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Firmware.
     */
    cursor?: FirmwareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firmware from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firmware.
     */
    skip?: number
    distinct?: Enumerable<FirmwareScalarFieldEnum>
  }


  /**
   * Firmware create
   */
  export type FirmwareCreateArgs = {
    /**
     * Select specific fields to fetch from the Firmware
     */
    select?: FirmwareSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FirmwareInclude | null
    /**
     * The data needed to create a Firmware.
     */
    data: XOR<FirmwareCreateInput, FirmwareUncheckedCreateInput>
  }


  /**
   * Firmware createMany
   */
  export type FirmwareCreateManyArgs = {
    /**
     * The data used to create many Firmware.
     */
    data: Enumerable<FirmwareCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Firmware update
   */
  export type FirmwareUpdateArgs = {
    /**
     * Select specific fields to fetch from the Firmware
     */
    select?: FirmwareSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FirmwareInclude | null
    /**
     * The data needed to update a Firmware.
     */
    data: XOR<FirmwareUpdateInput, FirmwareUncheckedUpdateInput>
    /**
     * Choose, which Firmware to update.
     */
    where: FirmwareWhereUniqueInput
  }


  /**
   * Firmware updateMany
   */
  export type FirmwareUpdateManyArgs = {
    /**
     * The data used to update Firmware.
     */
    data: XOR<FirmwareUpdateManyMutationInput, FirmwareUncheckedUpdateManyInput>
    /**
     * Filter which Firmware to update
     */
    where?: FirmwareWhereInput
  }


  /**
   * Firmware upsert
   */
  export type FirmwareUpsertArgs = {
    /**
     * Select specific fields to fetch from the Firmware
     */
    select?: FirmwareSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FirmwareInclude | null
    /**
     * The filter to search for the Firmware to update in case it exists.
     */
    where: FirmwareWhereUniqueInput
    /**
     * In case the Firmware found by the `where` argument doesn't exist, create a new Firmware with this data.
     */
    create: XOR<FirmwareCreateInput, FirmwareUncheckedCreateInput>
    /**
     * In case the Firmware was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FirmwareUpdateInput, FirmwareUncheckedUpdateInput>
  }


  /**
   * Firmware delete
   */
  export type FirmwareDeleteArgs = {
    /**
     * Select specific fields to fetch from the Firmware
     */
    select?: FirmwareSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FirmwareInclude | null
    /**
     * Filter which Firmware to delete.
     */
    where: FirmwareWhereUniqueInput
  }


  /**
   * Firmware deleteMany
   */
  export type FirmwareDeleteManyArgs = {
    /**
     * Filter which Firmware to delete
     */
    where?: FirmwareWhereInput
  }


  /**
   * Firmware.device
   */
  export type Firmware$deviceArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    where?: DeviceWhereInput
    orderBy?: Enumerable<DeviceOrderByWithRelationInput>
    cursor?: DeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DeviceScalarFieldEnum>
  }


  /**
   * Firmware without action
   */
  export type FirmwareArgs = {
    /**
     * Select specific fields to fetch from the Firmware
     */
    select?: FirmwareSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FirmwareInclude | null
  }



  /**
   * Model Protocol
   */


  export type AggregateProtocol = {
    _count: ProtocolCountAggregateOutputType | null
    _avg: ProtocolAvgAggregateOutputType | null
    _sum: ProtocolSumAggregateOutputType | null
    _min: ProtocolMinAggregateOutputType | null
    _max: ProtocolMaxAggregateOutputType | null
  }

  export type ProtocolAvgAggregateOutputType = {
    id: number | null
    tenantId: number | null
  }

  export type ProtocolSumAggregateOutputType = {
    id: number | null
    tenantId: number | null
  }

  export type ProtocolMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: number | null
  }

  export type ProtocolMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: number | null
  }

  export type ProtocolCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    tenantId: number
    _all: number
  }


  export type ProtocolAvgAggregateInputType = {
    id?: true
    tenantId?: true
  }

  export type ProtocolSumAggregateInputType = {
    id?: true
    tenantId?: true
  }

  export type ProtocolMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type ProtocolMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type ProtocolCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
    _all?: true
  }

  export type ProtocolAggregateArgs = {
    /**
     * Filter which Protocol to aggregate.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: Enumerable<ProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Protocols
    **/
    _count?: true | ProtocolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProtocolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProtocolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProtocolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProtocolMaxAggregateInputType
  }

  export type GetProtocolAggregateType<T extends ProtocolAggregateArgs> = {
        [P in keyof T & keyof AggregateProtocol]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProtocol[P]>
      : GetScalarType<T[P], AggregateProtocol[P]>
  }




  export type ProtocolGroupByArgs = {
    where?: ProtocolWhereInput
    orderBy?: Enumerable<ProtocolOrderByWithAggregationInput>
    by: ProtocolScalarFieldEnum[]
    having?: ProtocolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProtocolCountAggregateInputType | true
    _avg?: ProtocolAvgAggregateInputType
    _sum?: ProtocolSumAggregateInputType
    _min?: ProtocolMinAggregateInputType
    _max?: ProtocolMaxAggregateInputType
  }


  export type ProtocolGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    tenantId: number | null
    _count: ProtocolCountAggregateOutputType | null
    _avg: ProtocolAvgAggregateOutputType | null
    _sum: ProtocolSumAggregateOutputType | null
    _min: ProtocolMinAggregateOutputType | null
    _max: ProtocolMaxAggregateOutputType | null
  }

  type GetProtocolGroupByPayload<T extends ProtocolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ProtocolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProtocolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProtocolGroupByOutputType[P]>
            : GetScalarType<T[P], ProtocolGroupByOutputType[P]>
        }
      >
    >


  export type ProtocolSelect = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
    deviceProfiles?: boolean | Protocol$deviceProfilesArgs
    _count?: boolean | ProtocolCountOutputTypeArgs
  }


  export type ProtocolInclude = {
    deviceProfiles?: boolean | Protocol$deviceProfilesArgs
    _count?: boolean | ProtocolCountOutputTypeArgs
  }

  export type ProtocolGetPayload<S extends boolean | null | undefined | ProtocolArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Protocol :
    S extends undefined ? never :
    S extends { include: any } & (ProtocolArgs | ProtocolFindManyArgs)
    ? Protocol  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'deviceProfiles' ? Array < DeviceProfileGetPayload<S['include'][P]>>  :
        P extends '_count' ? ProtocolCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ProtocolArgs | ProtocolFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'deviceProfiles' ? Array < DeviceProfileGetPayload<S['select'][P]>>  :
        P extends '_count' ? ProtocolCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Protocol ? Protocol[P] : never
  } 
      : Protocol


  type ProtocolCountArgs = 
    Omit<ProtocolFindManyArgs, 'select' | 'include'> & {
      select?: ProtocolCountAggregateInputType | true
    }

  export interface ProtocolDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Protocol that matches the filter.
     * @param {ProtocolFindUniqueArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProtocolFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProtocolFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Protocol'> extends True ? Prisma__ProtocolClient<ProtocolGetPayload<T>> : Prisma__ProtocolClient<ProtocolGetPayload<T> | null, null>

    /**
     * Find one Protocol that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ProtocolFindUniqueOrThrowArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProtocolFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProtocolFindUniqueOrThrowArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Find the first Protocol that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolFindFirstArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProtocolFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProtocolFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Protocol'> extends True ? Prisma__ProtocolClient<ProtocolGetPayload<T>> : Prisma__ProtocolClient<ProtocolGetPayload<T> | null, null>

    /**
     * Find the first Protocol that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolFindFirstOrThrowArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProtocolFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProtocolFindFirstOrThrowArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Find zero or more Protocols that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Protocols
     * const protocols = await prisma.protocol.findMany()
     * 
     * // Get first 10 Protocols
     * const protocols = await prisma.protocol.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const protocolWithIdOnly = await prisma.protocol.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProtocolFindManyArgs>(
      args?: SelectSubset<T, ProtocolFindManyArgs>
    ): Prisma.PrismaPromise<Array<ProtocolGetPayload<T>>>

    /**
     * Create a Protocol.
     * @param {ProtocolCreateArgs} args - Arguments to create a Protocol.
     * @example
     * // Create one Protocol
     * const Protocol = await prisma.protocol.create({
     *   data: {
     *     // ... data to create a Protocol
     *   }
     * })
     * 
    **/
    create<T extends ProtocolCreateArgs>(
      args: SelectSubset<T, ProtocolCreateArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Create many Protocols.
     *     @param {ProtocolCreateManyArgs} args - Arguments to create many Protocols.
     *     @example
     *     // Create many Protocols
     *     const protocol = await prisma.protocol.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProtocolCreateManyArgs>(
      args?: SelectSubset<T, ProtocolCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Protocol.
     * @param {ProtocolDeleteArgs} args - Arguments to delete one Protocol.
     * @example
     * // Delete one Protocol
     * const Protocol = await prisma.protocol.delete({
     *   where: {
     *     // ... filter to delete one Protocol
     *   }
     * })
     * 
    **/
    delete<T extends ProtocolDeleteArgs>(
      args: SelectSubset<T, ProtocolDeleteArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Update one Protocol.
     * @param {ProtocolUpdateArgs} args - Arguments to update one Protocol.
     * @example
     * // Update one Protocol
     * const protocol = await prisma.protocol.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProtocolUpdateArgs>(
      args: SelectSubset<T, ProtocolUpdateArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Delete zero or more Protocols.
     * @param {ProtocolDeleteManyArgs} args - Arguments to filter Protocols to delete.
     * @example
     * // Delete a few Protocols
     * const { count } = await prisma.protocol.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProtocolDeleteManyArgs>(
      args?: SelectSubset<T, ProtocolDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Protocols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Protocols
     * const protocol = await prisma.protocol.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProtocolUpdateManyArgs>(
      args: SelectSubset<T, ProtocolUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Protocol.
     * @param {ProtocolUpsertArgs} args - Arguments to update or create a Protocol.
     * @example
     * // Update or create a Protocol
     * const protocol = await prisma.protocol.upsert({
     *   create: {
     *     // ... data to create a Protocol
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Protocol we want to update
     *   }
     * })
    **/
    upsert<T extends ProtocolUpsertArgs>(
      args: SelectSubset<T, ProtocolUpsertArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Count the number of Protocols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolCountArgs} args - Arguments to filter Protocols to count.
     * @example
     * // Count the number of Protocols
     * const count = await prisma.protocol.count({
     *   where: {
     *     // ... the filter for the Protocols we want to count
     *   }
     * })
    **/
    count<T extends ProtocolCountArgs>(
      args?: Subset<T, ProtocolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProtocolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Protocol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProtocolAggregateArgs>(args: Subset<T, ProtocolAggregateArgs>): Prisma.PrismaPromise<GetProtocolAggregateType<T>>

    /**
     * Group by Protocol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProtocolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProtocolGroupByArgs['orderBy'] }
        : { orderBy?: ProtocolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProtocolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProtocolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Protocol.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProtocolClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    deviceProfiles<T extends Protocol$deviceProfilesArgs= {}>(args?: Subset<T, Protocol$deviceProfilesArgs>): Prisma.PrismaPromise<Array<DeviceProfileGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Protocol base type for findUnique actions
   */
  export type ProtocolFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter, which Protocol to fetch.
     */
    where: ProtocolWhereUniqueInput
  }

  /**
   * Protocol findUnique
   */
  export interface ProtocolFindUniqueArgs extends ProtocolFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Protocol findUniqueOrThrow
   */
  export type ProtocolFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter, which Protocol to fetch.
     */
    where: ProtocolWhereUniqueInput
  }


  /**
   * Protocol base type for findFirst actions
   */
  export type ProtocolFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter, which Protocol to fetch.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: Enumerable<ProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Protocols.
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Protocols.
     */
    distinct?: Enumerable<ProtocolScalarFieldEnum>
  }

  /**
   * Protocol findFirst
   */
  export interface ProtocolFindFirstArgs extends ProtocolFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Protocol findFirstOrThrow
   */
  export type ProtocolFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter, which Protocol to fetch.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: Enumerable<ProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Protocols.
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Protocols.
     */
    distinct?: Enumerable<ProtocolScalarFieldEnum>
  }


  /**
   * Protocol findMany
   */
  export type ProtocolFindManyArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter, which Protocols to fetch.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: Enumerable<ProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Protocols.
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    distinct?: Enumerable<ProtocolScalarFieldEnum>
  }


  /**
   * Protocol create
   */
  export type ProtocolCreateArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * The data needed to create a Protocol.
     */
    data: XOR<ProtocolCreateInput, ProtocolUncheckedCreateInput>
  }


  /**
   * Protocol createMany
   */
  export type ProtocolCreateManyArgs = {
    /**
     * The data used to create many Protocols.
     */
    data: Enumerable<ProtocolCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Protocol update
   */
  export type ProtocolUpdateArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * The data needed to update a Protocol.
     */
    data: XOR<ProtocolUpdateInput, ProtocolUncheckedUpdateInput>
    /**
     * Choose, which Protocol to update.
     */
    where: ProtocolWhereUniqueInput
  }


  /**
   * Protocol updateMany
   */
  export type ProtocolUpdateManyArgs = {
    /**
     * The data used to update Protocols.
     */
    data: XOR<ProtocolUpdateManyMutationInput, ProtocolUncheckedUpdateManyInput>
    /**
     * Filter which Protocols to update
     */
    where?: ProtocolWhereInput
  }


  /**
   * Protocol upsert
   */
  export type ProtocolUpsertArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * The filter to search for the Protocol to update in case it exists.
     */
    where: ProtocolWhereUniqueInput
    /**
     * In case the Protocol found by the `where` argument doesn't exist, create a new Protocol with this data.
     */
    create: XOR<ProtocolCreateInput, ProtocolUncheckedCreateInput>
    /**
     * In case the Protocol was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProtocolUpdateInput, ProtocolUncheckedUpdateInput>
  }


  /**
   * Protocol delete
   */
  export type ProtocolDeleteArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter which Protocol to delete.
     */
    where: ProtocolWhereUniqueInput
  }


  /**
   * Protocol deleteMany
   */
  export type ProtocolDeleteManyArgs = {
    /**
     * Filter which Protocols to delete
     */
    where?: ProtocolWhereInput
  }


  /**
   * Protocol.deviceProfiles
   */
  export type Protocol$deviceProfilesArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    where?: DeviceProfileWhereInput
    orderBy?: Enumerable<DeviceProfileOrderByWithRelationInput>
    cursor?: DeviceProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DeviceProfileScalarFieldEnum>
  }


  /**
   * Protocol without action
   */
  export type ProtocolArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
  }



  /**
   * Model DeviceProfile
   */


  export type AggregateDeviceProfile = {
    _count: DeviceProfileCountAggregateOutputType | null
    _avg: DeviceProfileAvgAggregateOutputType | null
    _sum: DeviceProfileSumAggregateOutputType | null
    _min: DeviceProfileMinAggregateOutputType | null
    _max: DeviceProfileMaxAggregateOutputType | null
  }

  export type DeviceProfileAvgAggregateOutputType = {
    id: number | null
    deviceTypeId: number | null
    protocolId: number | null
    decoderId: number | null
    tenantId: number | null
  }

  export type DeviceProfileSumAggregateOutputType = {
    id: number | null
    deviceTypeId: number | null
    protocolId: number | null
    decoderId: number | null
    tenantId: number | null
  }

  export type DeviceProfileMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    logo: string | null
    cridentialsType: TypeCredential | null
    deviceTypeId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    protocolId: number | null
    decoderId: number | null
    tenantId: number | null
  }

  export type DeviceProfileMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    logo: string | null
    cridentialsType: TypeCredential | null
    deviceTypeId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    protocolId: number | null
    decoderId: number | null
    tenantId: number | null
  }

  export type DeviceProfileCountAggregateOutputType = {
    id: number
    name: number
    description: number
    logo: number
    cridentialsType: number
    deviceTypeId: number
    createdAt: number
    updatedAt: number
    protocolId: number
    decoderId: number
    attributes: number
    tenantId: number
    _all: number
  }


  export type DeviceProfileAvgAggregateInputType = {
    id?: true
    deviceTypeId?: true
    protocolId?: true
    decoderId?: true
    tenantId?: true
  }

  export type DeviceProfileSumAggregateInputType = {
    id?: true
    deviceTypeId?: true
    protocolId?: true
    decoderId?: true
    tenantId?: true
  }

  export type DeviceProfileMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logo?: true
    cridentialsType?: true
    deviceTypeId?: true
    createdAt?: true
    updatedAt?: true
    protocolId?: true
    decoderId?: true
    tenantId?: true
  }

  export type DeviceProfileMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logo?: true
    cridentialsType?: true
    deviceTypeId?: true
    createdAt?: true
    updatedAt?: true
    protocolId?: true
    decoderId?: true
    tenantId?: true
  }

  export type DeviceProfileCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logo?: true
    cridentialsType?: true
    deviceTypeId?: true
    createdAt?: true
    updatedAt?: true
    protocolId?: true
    decoderId?: true
    attributes?: true
    tenantId?: true
    _all?: true
  }

  export type DeviceProfileAggregateArgs = {
    /**
     * Filter which DeviceProfile to aggregate.
     */
    where?: DeviceProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceProfiles to fetch.
     */
    orderBy?: Enumerable<DeviceProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeviceProfiles
    **/
    _count?: true | DeviceProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeviceProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeviceProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceProfileMaxAggregateInputType
  }

  export type GetDeviceProfileAggregateType<T extends DeviceProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateDeviceProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeviceProfile[P]>
      : GetScalarType<T[P], AggregateDeviceProfile[P]>
  }




  export type DeviceProfileGroupByArgs = {
    where?: DeviceProfileWhereInput
    orderBy?: Enumerable<DeviceProfileOrderByWithAggregationInput>
    by: DeviceProfileScalarFieldEnum[]
    having?: DeviceProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceProfileCountAggregateInputType | true
    _avg?: DeviceProfileAvgAggregateInputType
    _sum?: DeviceProfileSumAggregateInputType
    _min?: DeviceProfileMinAggregateInputType
    _max?: DeviceProfileMaxAggregateInputType
  }


  export type DeviceProfileGroupByOutputType = {
    id: number
    name: string
    description: string | null
    logo: string | null
    cridentialsType: TypeCredential | null
    deviceTypeId: number | null
    createdAt: Date
    updatedAt: Date
    protocolId: number | null
    decoderId: number | null
    attributes: JsonValue | null
    tenantId: number | null
    _count: DeviceProfileCountAggregateOutputType | null
    _avg: DeviceProfileAvgAggregateOutputType | null
    _sum: DeviceProfileSumAggregateOutputType | null
    _min: DeviceProfileMinAggregateOutputType | null
    _max: DeviceProfileMaxAggregateOutputType | null
  }

  type GetDeviceProfileGroupByPayload<T extends DeviceProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<DeviceProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceProfileGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceProfileGroupByOutputType[P]>
        }
      >
    >


  export type DeviceProfileSelect = {
    id?: boolean
    name?: boolean
    description?: boolean
    logo?: boolean
    cridentialsType?: boolean
    deviceTypeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    protocolId?: boolean
    decoderId?: boolean
    attributes?: boolean
    tenantId?: boolean
    deviceType?: boolean | DeviceTypeArgs
    devices?: boolean | DeviceProfile$devicesArgs
    protocol?: boolean | ProtocolArgs
    decoder?: boolean | DecoderArgs
    _count?: boolean | DeviceProfileCountOutputTypeArgs
  }


  export type DeviceProfileInclude = {
    deviceType?: boolean | DeviceTypeArgs
    devices?: boolean | DeviceProfile$devicesArgs
    protocol?: boolean | ProtocolArgs
    decoder?: boolean | DecoderArgs
    _count?: boolean | DeviceProfileCountOutputTypeArgs
  }

  export type DeviceProfileGetPayload<S extends boolean | null | undefined | DeviceProfileArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? DeviceProfile :
    S extends undefined ? never :
    S extends { include: any } & (DeviceProfileArgs | DeviceProfileFindManyArgs)
    ? DeviceProfile  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'deviceType' ? DeviceTypeGetPayload<S['include'][P]> | null :
        P extends 'devices' ? Array < DeviceGetPayload<S['include'][P]>>  :
        P extends 'protocol' ? ProtocolGetPayload<S['include'][P]> | null :
        P extends 'decoder' ? DecoderGetPayload<S['include'][P]> | null :
        P extends '_count' ? DeviceProfileCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (DeviceProfileArgs | DeviceProfileFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'deviceType' ? DeviceTypeGetPayload<S['select'][P]> | null :
        P extends 'devices' ? Array < DeviceGetPayload<S['select'][P]>>  :
        P extends 'protocol' ? ProtocolGetPayload<S['select'][P]> | null :
        P extends 'decoder' ? DecoderGetPayload<S['select'][P]> | null :
        P extends '_count' ? DeviceProfileCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof DeviceProfile ? DeviceProfile[P] : never
  } 
      : DeviceProfile


  type DeviceProfileCountArgs = 
    Omit<DeviceProfileFindManyArgs, 'select' | 'include'> & {
      select?: DeviceProfileCountAggregateInputType | true
    }

  export interface DeviceProfileDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one DeviceProfile that matches the filter.
     * @param {DeviceProfileFindUniqueArgs} args - Arguments to find a DeviceProfile
     * @example
     * // Get one DeviceProfile
     * const deviceProfile = await prisma.deviceProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DeviceProfileFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DeviceProfileFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DeviceProfile'> extends True ? Prisma__DeviceProfileClient<DeviceProfileGetPayload<T>> : Prisma__DeviceProfileClient<DeviceProfileGetPayload<T> | null, null>

    /**
     * Find one DeviceProfile that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DeviceProfileFindUniqueOrThrowArgs} args - Arguments to find a DeviceProfile
     * @example
     * // Get one DeviceProfile
     * const deviceProfile = await prisma.deviceProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DeviceProfileFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DeviceProfileFindUniqueOrThrowArgs>
    ): Prisma__DeviceProfileClient<DeviceProfileGetPayload<T>>

    /**
     * Find the first DeviceProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceProfileFindFirstArgs} args - Arguments to find a DeviceProfile
     * @example
     * // Get one DeviceProfile
     * const deviceProfile = await prisma.deviceProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DeviceProfileFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DeviceProfileFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DeviceProfile'> extends True ? Prisma__DeviceProfileClient<DeviceProfileGetPayload<T>> : Prisma__DeviceProfileClient<DeviceProfileGetPayload<T> | null, null>

    /**
     * Find the first DeviceProfile that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceProfileFindFirstOrThrowArgs} args - Arguments to find a DeviceProfile
     * @example
     * // Get one DeviceProfile
     * const deviceProfile = await prisma.deviceProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DeviceProfileFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DeviceProfileFindFirstOrThrowArgs>
    ): Prisma__DeviceProfileClient<DeviceProfileGetPayload<T>>

    /**
     * Find zero or more DeviceProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceProfileFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceProfiles
     * const deviceProfiles = await prisma.deviceProfile.findMany()
     * 
     * // Get first 10 DeviceProfiles
     * const deviceProfiles = await prisma.deviceProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceProfileWithIdOnly = await prisma.deviceProfile.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DeviceProfileFindManyArgs>(
      args?: SelectSubset<T, DeviceProfileFindManyArgs>
    ): Prisma.PrismaPromise<Array<DeviceProfileGetPayload<T>>>

    /**
     * Create a DeviceProfile.
     * @param {DeviceProfileCreateArgs} args - Arguments to create a DeviceProfile.
     * @example
     * // Create one DeviceProfile
     * const DeviceProfile = await prisma.deviceProfile.create({
     *   data: {
     *     // ... data to create a DeviceProfile
     *   }
     * })
     * 
    **/
    create<T extends DeviceProfileCreateArgs>(
      args: SelectSubset<T, DeviceProfileCreateArgs>
    ): Prisma__DeviceProfileClient<DeviceProfileGetPayload<T>>

    /**
     * Create many DeviceProfiles.
     *     @param {DeviceProfileCreateManyArgs} args - Arguments to create many DeviceProfiles.
     *     @example
     *     // Create many DeviceProfiles
     *     const deviceProfile = await prisma.deviceProfile.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DeviceProfileCreateManyArgs>(
      args?: SelectSubset<T, DeviceProfileCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DeviceProfile.
     * @param {DeviceProfileDeleteArgs} args - Arguments to delete one DeviceProfile.
     * @example
     * // Delete one DeviceProfile
     * const DeviceProfile = await prisma.deviceProfile.delete({
     *   where: {
     *     // ... filter to delete one DeviceProfile
     *   }
     * })
     * 
    **/
    delete<T extends DeviceProfileDeleteArgs>(
      args: SelectSubset<T, DeviceProfileDeleteArgs>
    ): Prisma__DeviceProfileClient<DeviceProfileGetPayload<T>>

    /**
     * Update one DeviceProfile.
     * @param {DeviceProfileUpdateArgs} args - Arguments to update one DeviceProfile.
     * @example
     * // Update one DeviceProfile
     * const deviceProfile = await prisma.deviceProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DeviceProfileUpdateArgs>(
      args: SelectSubset<T, DeviceProfileUpdateArgs>
    ): Prisma__DeviceProfileClient<DeviceProfileGetPayload<T>>

    /**
     * Delete zero or more DeviceProfiles.
     * @param {DeviceProfileDeleteManyArgs} args - Arguments to filter DeviceProfiles to delete.
     * @example
     * // Delete a few DeviceProfiles
     * const { count } = await prisma.deviceProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DeviceProfileDeleteManyArgs>(
      args?: SelectSubset<T, DeviceProfileDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceProfiles
     * const deviceProfile = await prisma.deviceProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DeviceProfileUpdateManyArgs>(
      args: SelectSubset<T, DeviceProfileUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DeviceProfile.
     * @param {DeviceProfileUpsertArgs} args - Arguments to update or create a DeviceProfile.
     * @example
     * // Update or create a DeviceProfile
     * const deviceProfile = await prisma.deviceProfile.upsert({
     *   create: {
     *     // ... data to create a DeviceProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceProfile we want to update
     *   }
     * })
    **/
    upsert<T extends DeviceProfileUpsertArgs>(
      args: SelectSubset<T, DeviceProfileUpsertArgs>
    ): Prisma__DeviceProfileClient<DeviceProfileGetPayload<T>>

    /**
     * Count the number of DeviceProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceProfileCountArgs} args - Arguments to filter DeviceProfiles to count.
     * @example
     * // Count the number of DeviceProfiles
     * const count = await prisma.deviceProfile.count({
     *   where: {
     *     // ... the filter for the DeviceProfiles we want to count
     *   }
     * })
    **/
    count<T extends DeviceProfileCountArgs>(
      args?: Subset<T, DeviceProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeviceProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceProfileAggregateArgs>(args: Subset<T, DeviceProfileAggregateArgs>): Prisma.PrismaPromise<GetDeviceProfileAggregateType<T>>

    /**
     * Group by DeviceProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceProfileGroupByArgs['orderBy'] }
        : { orderBy?: DeviceProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for DeviceProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DeviceProfileClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    deviceType<T extends DeviceTypeArgs= {}>(args?: Subset<T, DeviceTypeArgs>): Prisma__DeviceTypeClient<DeviceTypeGetPayload<T> | Null>;

    devices<T extends DeviceProfile$devicesArgs= {}>(args?: Subset<T, DeviceProfile$devicesArgs>): Prisma.PrismaPromise<Array<DeviceGetPayload<T>>| Null>;

    protocol<T extends ProtocolArgs= {}>(args?: Subset<T, ProtocolArgs>): Prisma__ProtocolClient<ProtocolGetPayload<T> | Null>;

    decoder<T extends DecoderArgs= {}>(args?: Subset<T, DecoderArgs>): Prisma__DecoderClient<DecoderGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * DeviceProfile base type for findUnique actions
   */
  export type DeviceProfileFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    /**
     * Filter, which DeviceProfile to fetch.
     */
    where: DeviceProfileWhereUniqueInput
  }

  /**
   * DeviceProfile findUnique
   */
  export interface DeviceProfileFindUniqueArgs extends DeviceProfileFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DeviceProfile findUniqueOrThrow
   */
  export type DeviceProfileFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    /**
     * Filter, which DeviceProfile to fetch.
     */
    where: DeviceProfileWhereUniqueInput
  }


  /**
   * DeviceProfile base type for findFirst actions
   */
  export type DeviceProfileFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    /**
     * Filter, which DeviceProfile to fetch.
     */
    where?: DeviceProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceProfiles to fetch.
     */
    orderBy?: Enumerable<DeviceProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceProfiles.
     */
    cursor?: DeviceProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceProfiles.
     */
    distinct?: Enumerable<DeviceProfileScalarFieldEnum>
  }

  /**
   * DeviceProfile findFirst
   */
  export interface DeviceProfileFindFirstArgs extends DeviceProfileFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DeviceProfile findFirstOrThrow
   */
  export type DeviceProfileFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    /**
     * Filter, which DeviceProfile to fetch.
     */
    where?: DeviceProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceProfiles to fetch.
     */
    orderBy?: Enumerable<DeviceProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceProfiles.
     */
    cursor?: DeviceProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceProfiles.
     */
    distinct?: Enumerable<DeviceProfileScalarFieldEnum>
  }


  /**
   * DeviceProfile findMany
   */
  export type DeviceProfileFindManyArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    /**
     * Filter, which DeviceProfiles to fetch.
     */
    where?: DeviceProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceProfiles to fetch.
     */
    orderBy?: Enumerable<DeviceProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeviceProfiles.
     */
    cursor?: DeviceProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceProfiles.
     */
    skip?: number
    distinct?: Enumerable<DeviceProfileScalarFieldEnum>
  }


  /**
   * DeviceProfile create
   */
  export type DeviceProfileCreateArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    /**
     * The data needed to create a DeviceProfile.
     */
    data: XOR<DeviceProfileCreateInput, DeviceProfileUncheckedCreateInput>
  }


  /**
   * DeviceProfile createMany
   */
  export type DeviceProfileCreateManyArgs = {
    /**
     * The data used to create many DeviceProfiles.
     */
    data: Enumerable<DeviceProfileCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DeviceProfile update
   */
  export type DeviceProfileUpdateArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    /**
     * The data needed to update a DeviceProfile.
     */
    data: XOR<DeviceProfileUpdateInput, DeviceProfileUncheckedUpdateInput>
    /**
     * Choose, which DeviceProfile to update.
     */
    where: DeviceProfileWhereUniqueInput
  }


  /**
   * DeviceProfile updateMany
   */
  export type DeviceProfileUpdateManyArgs = {
    /**
     * The data used to update DeviceProfiles.
     */
    data: XOR<DeviceProfileUpdateManyMutationInput, DeviceProfileUncheckedUpdateManyInput>
    /**
     * Filter which DeviceProfiles to update
     */
    where?: DeviceProfileWhereInput
  }


  /**
   * DeviceProfile upsert
   */
  export type DeviceProfileUpsertArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    /**
     * The filter to search for the DeviceProfile to update in case it exists.
     */
    where: DeviceProfileWhereUniqueInput
    /**
     * In case the DeviceProfile found by the `where` argument doesn't exist, create a new DeviceProfile with this data.
     */
    create: XOR<DeviceProfileCreateInput, DeviceProfileUncheckedCreateInput>
    /**
     * In case the DeviceProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceProfileUpdateInput, DeviceProfileUncheckedUpdateInput>
  }


  /**
   * DeviceProfile delete
   */
  export type DeviceProfileDeleteArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
    /**
     * Filter which DeviceProfile to delete.
     */
    where: DeviceProfileWhereUniqueInput
  }


  /**
   * DeviceProfile deleteMany
   */
  export type DeviceProfileDeleteManyArgs = {
    /**
     * Filter which DeviceProfiles to delete
     */
    where?: DeviceProfileWhereInput
  }


  /**
   * DeviceProfile.devices
   */
  export type DeviceProfile$devicesArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    where?: DeviceWhereInput
    orderBy?: Enumerable<DeviceOrderByWithRelationInput>
    cursor?: DeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DeviceScalarFieldEnum>
  }


  /**
   * DeviceProfile without action
   */
  export type DeviceProfileArgs = {
    /**
     * Select specific fields to fetch from the DeviceProfile
     */
    select?: DeviceProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceProfileInclude | null
  }



  /**
   * Model Credential
   */


  export type AggregateCredential = {
    _count: CredentialCountAggregateOutputType | null
    _avg: CredentialAvgAggregateOutputType | null
    _sum: CredentialSumAggregateOutputType | null
    _min: CredentialMinAggregateOutputType | null
    _max: CredentialMaxAggregateOutputType | null
  }

  export type CredentialAvgAggregateOutputType = {
    id: number | null
  }

  export type CredentialSumAggregateOutputType = {
    id: number | null
  }

  export type CredentialMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    token: string | null
    certificate: string | null
    type: TypeCredential | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CredentialMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    token: string | null
    certificate: string | null
    type: TypeCredential | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CredentialCountAggregateOutputType = {
    id: number
    username: number
    password: number
    token: number
    certificate: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CredentialAvgAggregateInputType = {
    id?: true
  }

  export type CredentialSumAggregateInputType = {
    id?: true
  }

  export type CredentialMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    token?: true
    certificate?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CredentialMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    token?: true
    certificate?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CredentialCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    token?: true
    certificate?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CredentialAggregateArgs = {
    /**
     * Filter which Credential to aggregate.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: Enumerable<CredentialOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Credentials
    **/
    _count?: true | CredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CredentialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CredentialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CredentialMaxAggregateInputType
  }

  export type GetCredentialAggregateType<T extends CredentialAggregateArgs> = {
        [P in keyof T & keyof AggregateCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCredential[P]>
      : GetScalarType<T[P], AggregateCredential[P]>
  }




  export type CredentialGroupByArgs = {
    where?: CredentialWhereInput
    orderBy?: Enumerable<CredentialOrderByWithAggregationInput>
    by: CredentialScalarFieldEnum[]
    having?: CredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CredentialCountAggregateInputType | true
    _avg?: CredentialAvgAggregateInputType
    _sum?: CredentialSumAggregateInputType
    _min?: CredentialMinAggregateInputType
    _max?: CredentialMaxAggregateInputType
  }


  export type CredentialGroupByOutputType = {
    id: number
    username: string | null
    password: string | null
    token: string | null
    certificate: string | null
    type: TypeCredential
    createdAt: Date
    updatedAt: Date
    _count: CredentialCountAggregateOutputType | null
    _avg: CredentialAvgAggregateOutputType | null
    _sum: CredentialSumAggregateOutputType | null
    _min: CredentialMinAggregateOutputType | null
    _max: CredentialMaxAggregateOutputType | null
  }

  type GetCredentialGroupByPayload<T extends CredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<CredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CredentialGroupByOutputType[P]>
            : GetScalarType<T[P], CredentialGroupByOutputType[P]>
        }
      >
    >


  export type CredentialSelect = {
    id?: boolean
    username?: boolean
    password?: boolean
    token?: boolean
    certificate?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    device?: boolean | DeviceArgs
  }


  export type CredentialInclude = {
    device?: boolean | DeviceArgs
  }

  export type CredentialGetPayload<S extends boolean | null | undefined | CredentialArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Credential :
    S extends undefined ? never :
    S extends { include: any } & (CredentialArgs | CredentialFindManyArgs)
    ? Credential  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'device' ? DeviceGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (CredentialArgs | CredentialFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'device' ? DeviceGetPayload<S['select'][P]> | null :  P extends keyof Credential ? Credential[P] : never
  } 
      : Credential


  type CredentialCountArgs = 
    Omit<CredentialFindManyArgs, 'select' | 'include'> & {
      select?: CredentialCountAggregateInputType | true
    }

  export interface CredentialDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Credential that matches the filter.
     * @param {CredentialFindUniqueArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CredentialFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CredentialFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Credential'> extends True ? Prisma__CredentialClient<CredentialGetPayload<T>> : Prisma__CredentialClient<CredentialGetPayload<T> | null, null>

    /**
     * Find one Credential that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CredentialFindUniqueOrThrowArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CredentialFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CredentialFindUniqueOrThrowArgs>
    ): Prisma__CredentialClient<CredentialGetPayload<T>>

    /**
     * Find the first Credential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialFindFirstArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CredentialFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CredentialFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Credential'> extends True ? Prisma__CredentialClient<CredentialGetPayload<T>> : Prisma__CredentialClient<CredentialGetPayload<T> | null, null>

    /**
     * Find the first Credential that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialFindFirstOrThrowArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CredentialFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CredentialFindFirstOrThrowArgs>
    ): Prisma__CredentialClient<CredentialGetPayload<T>>

    /**
     * Find zero or more Credentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Credentials
     * const credentials = await prisma.credential.findMany()
     * 
     * // Get first 10 Credentials
     * const credentials = await prisma.credential.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const credentialWithIdOnly = await prisma.credential.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CredentialFindManyArgs>(
      args?: SelectSubset<T, CredentialFindManyArgs>
    ): Prisma.PrismaPromise<Array<CredentialGetPayload<T>>>

    /**
     * Create a Credential.
     * @param {CredentialCreateArgs} args - Arguments to create a Credential.
     * @example
     * // Create one Credential
     * const Credential = await prisma.credential.create({
     *   data: {
     *     // ... data to create a Credential
     *   }
     * })
     * 
    **/
    create<T extends CredentialCreateArgs>(
      args: SelectSubset<T, CredentialCreateArgs>
    ): Prisma__CredentialClient<CredentialGetPayload<T>>

    /**
     * Create many Credentials.
     *     @param {CredentialCreateManyArgs} args - Arguments to create many Credentials.
     *     @example
     *     // Create many Credentials
     *     const credential = await prisma.credential.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CredentialCreateManyArgs>(
      args?: SelectSubset<T, CredentialCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Credential.
     * @param {CredentialDeleteArgs} args - Arguments to delete one Credential.
     * @example
     * // Delete one Credential
     * const Credential = await prisma.credential.delete({
     *   where: {
     *     // ... filter to delete one Credential
     *   }
     * })
     * 
    **/
    delete<T extends CredentialDeleteArgs>(
      args: SelectSubset<T, CredentialDeleteArgs>
    ): Prisma__CredentialClient<CredentialGetPayload<T>>

    /**
     * Update one Credential.
     * @param {CredentialUpdateArgs} args - Arguments to update one Credential.
     * @example
     * // Update one Credential
     * const credential = await prisma.credential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CredentialUpdateArgs>(
      args: SelectSubset<T, CredentialUpdateArgs>
    ): Prisma__CredentialClient<CredentialGetPayload<T>>

    /**
     * Delete zero or more Credentials.
     * @param {CredentialDeleteManyArgs} args - Arguments to filter Credentials to delete.
     * @example
     * // Delete a few Credentials
     * const { count } = await prisma.credential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CredentialDeleteManyArgs>(
      args?: SelectSubset<T, CredentialDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Credentials
     * const credential = await prisma.credential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CredentialUpdateManyArgs>(
      args: SelectSubset<T, CredentialUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Credential.
     * @param {CredentialUpsertArgs} args - Arguments to update or create a Credential.
     * @example
     * // Update or create a Credential
     * const credential = await prisma.credential.upsert({
     *   create: {
     *     // ... data to create a Credential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Credential we want to update
     *   }
     * })
    **/
    upsert<T extends CredentialUpsertArgs>(
      args: SelectSubset<T, CredentialUpsertArgs>
    ): Prisma__CredentialClient<CredentialGetPayload<T>>

    /**
     * Count the number of Credentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialCountArgs} args - Arguments to filter Credentials to count.
     * @example
     * // Count the number of Credentials
     * const count = await prisma.credential.count({
     *   where: {
     *     // ... the filter for the Credentials we want to count
     *   }
     * })
    **/
    count<T extends CredentialCountArgs>(
      args?: Subset<T, CredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Credential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CredentialAggregateArgs>(args: Subset<T, CredentialAggregateArgs>): Prisma.PrismaPromise<GetCredentialAggregateType<T>>

    /**
     * Group by Credential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CredentialGroupByArgs['orderBy'] }
        : { orderBy?: CredentialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Credential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CredentialClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    device<T extends DeviceArgs= {}>(args?: Subset<T, DeviceArgs>): Prisma__DeviceClient<DeviceGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Credential base type for findUnique actions
   */
  export type CredentialFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CredentialInclude | null
    /**
     * Filter, which Credential to fetch.
     */
    where: CredentialWhereUniqueInput
  }

  /**
   * Credential findUnique
   */
  export interface CredentialFindUniqueArgs extends CredentialFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Credential findUniqueOrThrow
   */
  export type CredentialFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CredentialInclude | null
    /**
     * Filter, which Credential to fetch.
     */
    where: CredentialWhereUniqueInput
  }


  /**
   * Credential base type for findFirst actions
   */
  export type CredentialFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CredentialInclude | null
    /**
     * Filter, which Credential to fetch.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: Enumerable<CredentialOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Credentials.
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Credentials.
     */
    distinct?: Enumerable<CredentialScalarFieldEnum>
  }

  /**
   * Credential findFirst
   */
  export interface CredentialFindFirstArgs extends CredentialFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Credential findFirstOrThrow
   */
  export type CredentialFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CredentialInclude | null
    /**
     * Filter, which Credential to fetch.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: Enumerable<CredentialOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Credentials.
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Credentials.
     */
    distinct?: Enumerable<CredentialScalarFieldEnum>
  }


  /**
   * Credential findMany
   */
  export type CredentialFindManyArgs = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CredentialInclude | null
    /**
     * Filter, which Credentials to fetch.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: Enumerable<CredentialOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Credentials.
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    distinct?: Enumerable<CredentialScalarFieldEnum>
  }


  /**
   * Credential create
   */
  export type CredentialCreateArgs = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CredentialInclude | null
    /**
     * The data needed to create a Credential.
     */
    data: XOR<CredentialCreateInput, CredentialUncheckedCreateInput>
  }


  /**
   * Credential createMany
   */
  export type CredentialCreateManyArgs = {
    /**
     * The data used to create many Credentials.
     */
    data: Enumerable<CredentialCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Credential update
   */
  export type CredentialUpdateArgs = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CredentialInclude | null
    /**
     * The data needed to update a Credential.
     */
    data: XOR<CredentialUpdateInput, CredentialUncheckedUpdateInput>
    /**
     * Choose, which Credential to update.
     */
    where: CredentialWhereUniqueInput
  }


  /**
   * Credential updateMany
   */
  export type CredentialUpdateManyArgs = {
    /**
     * The data used to update Credentials.
     */
    data: XOR<CredentialUpdateManyMutationInput, CredentialUncheckedUpdateManyInput>
    /**
     * Filter which Credentials to update
     */
    where?: CredentialWhereInput
  }


  /**
   * Credential upsert
   */
  export type CredentialUpsertArgs = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CredentialInclude | null
    /**
     * The filter to search for the Credential to update in case it exists.
     */
    where: CredentialWhereUniqueInput
    /**
     * In case the Credential found by the `where` argument doesn't exist, create a new Credential with this data.
     */
    create: XOR<CredentialCreateInput, CredentialUncheckedCreateInput>
    /**
     * In case the Credential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CredentialUpdateInput, CredentialUncheckedUpdateInput>
  }


  /**
   * Credential delete
   */
  export type CredentialDeleteArgs = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CredentialInclude | null
    /**
     * Filter which Credential to delete.
     */
    where: CredentialWhereUniqueInput
  }


  /**
   * Credential deleteMany
   */
  export type CredentialDeleteManyArgs = {
    /**
     * Filter which Credentials to delete
     */
    where?: CredentialWhereInput
  }


  /**
   * Credential without action
   */
  export type CredentialArgs = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CredentialInclude | null
  }



  /**
   * Model Tag
   */


  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TagAggregateArgs = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs = {
    where?: TagWhereInput
    orderBy?: Enumerable<TagOrderByWithAggregationInput>
    by: TagScalarFieldEnum[]
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }


  export type TagGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    devices?: boolean | Tag$devicesArgs
    _count?: boolean | TagCountOutputTypeArgs
  }


  export type TagInclude = {
    devices?: boolean | Tag$devicesArgs
    _count?: boolean | TagCountOutputTypeArgs
  }

  export type TagGetPayload<S extends boolean | null | undefined | TagArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Tag :
    S extends undefined ? never :
    S extends { include: any } & (TagArgs | TagFindManyArgs)
    ? Tag  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'devices' ? Array < DeviceGetPayload<S['include'][P]>>  :
        P extends '_count' ? TagCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TagArgs | TagFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'devices' ? Array < DeviceGetPayload<S['select'][P]>>  :
        P extends '_count' ? TagCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Tag ? Tag[P] : never
  } 
      : Tag


  type TagCountArgs = 
    Omit<TagFindManyArgs, 'select' | 'include'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TagFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TagFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tag'> extends True ? Prisma__TagClient<TagGetPayload<T>> : Prisma__TagClient<TagGetPayload<T> | null, null>

    /**
     * Find one Tag that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TagFindUniqueOrThrowArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TagFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TagFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tag'> extends True ? Prisma__TagClient<TagGetPayload<T>> : Prisma__TagClient<TagGetPayload<T> | null, null>

    /**
     * Find the first Tag that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TagFindFirstOrThrowArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TagFindManyArgs>(
      args?: SelectSubset<T, TagFindManyArgs>
    ): Prisma.PrismaPromise<Array<TagGetPayload<T>>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
    **/
    create<T extends TagCreateArgs>(
      args: SelectSubset<T, TagCreateArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Create many Tags.
     *     @param {TagCreateManyArgs} args - Arguments to create many Tags.
     *     @example
     *     // Create many Tags
     *     const tag = await prisma.tag.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TagCreateManyArgs>(
      args?: SelectSubset<T, TagCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
    **/
    delete<T extends TagDeleteArgs>(
      args: SelectSubset<T, TagDeleteArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TagUpdateArgs>(
      args: SelectSubset<T, TagUpdateArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TagDeleteManyArgs>(
      args?: SelectSubset<T, TagDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TagUpdateManyArgs>(
      args: SelectSubset<T, TagUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
    **/
    upsert<T extends TagUpsertArgs>(
      args: SelectSubset<T, TagUpsertArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TagClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    devices<T extends Tag$devicesArgs= {}>(args?: Subset<T, Tag$devicesArgs>): Prisma.PrismaPromise<Array<DeviceGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Tag base type for findUnique actions
   */
  export type TagFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUnique
   */
  export interface TagFindUniqueArgs extends TagFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }


  /**
   * Tag base type for findFirst actions
   */
  export type TagFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: Enumerable<TagScalarFieldEnum>
  }

  /**
   * Tag findFirst
   */
  export interface TagFindFirstArgs extends TagFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Tag findMany
   */
  export type TagFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Tag create
   */
  export type TagCreateArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }


  /**
   * Tag createMany
   */
  export type TagCreateManyArgs = {
    /**
     * The data used to create many Tags.
     */
    data: Enumerable<TagCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tag update
   */
  export type TagUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }


  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
  }


  /**
   * Tag upsert
   */
  export type TagUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }


  /**
   * Tag delete
   */
  export type TagDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }


  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
  }


  /**
   * Tag.devices
   */
  export type Tag$devicesArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    where?: DeviceWhereInput
    orderBy?: Enumerable<DeviceOrderByWithRelationInput>
    cursor?: DeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DeviceScalarFieldEnum>
  }


  /**
   * Tag without action
   */
  export type TagArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
  }



  /**
   * Model VmqAuthAcl
   */


  export type AggregateVmqAuthAcl = {
    _count: VmqAuthAclCountAggregateOutputType | null
    _avg: VmqAuthAclAvgAggregateOutputType | null
    _sum: VmqAuthAclSumAggregateOutputType | null
    _min: VmqAuthAclMinAggregateOutputType | null
    _max: VmqAuthAclMaxAggregateOutputType | null
  }

  export type VmqAuthAclAvgAggregateOutputType = {
    id: number | null
  }

  export type VmqAuthAclSumAggregateOutputType = {
    id: number | null
  }

  export type VmqAuthAclMinAggregateOutputType = {
    id: number | null
    mountpoint: string | null
    username: string | null
    clientId: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VmqAuthAclMaxAggregateOutputType = {
    id: number | null
    mountpoint: string | null
    username: string | null
    clientId: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VmqAuthAclCountAggregateOutputType = {
    id: number
    mountpoint: number
    username: number
    clientId: number
    password: number
    publishAcl: number
    subscribeAcl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VmqAuthAclAvgAggregateInputType = {
    id?: true
  }

  export type VmqAuthAclSumAggregateInputType = {
    id?: true
  }

  export type VmqAuthAclMinAggregateInputType = {
    id?: true
    mountpoint?: true
    username?: true
    clientId?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VmqAuthAclMaxAggregateInputType = {
    id?: true
    mountpoint?: true
    username?: true
    clientId?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VmqAuthAclCountAggregateInputType = {
    id?: true
    mountpoint?: true
    username?: true
    clientId?: true
    password?: true
    publishAcl?: true
    subscribeAcl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VmqAuthAclAggregateArgs = {
    /**
     * Filter which VmqAuthAcl to aggregate.
     */
    where?: VmqAuthAclWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VmqAuthAcls to fetch.
     */
    orderBy?: Enumerable<VmqAuthAclOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VmqAuthAclWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VmqAuthAcls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VmqAuthAcls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VmqAuthAcls
    **/
    _count?: true | VmqAuthAclCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VmqAuthAclAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VmqAuthAclSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VmqAuthAclMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VmqAuthAclMaxAggregateInputType
  }

  export type GetVmqAuthAclAggregateType<T extends VmqAuthAclAggregateArgs> = {
        [P in keyof T & keyof AggregateVmqAuthAcl]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVmqAuthAcl[P]>
      : GetScalarType<T[P], AggregateVmqAuthAcl[P]>
  }




  export type VmqAuthAclGroupByArgs = {
    where?: VmqAuthAclWhereInput
    orderBy?: Enumerable<VmqAuthAclOrderByWithAggregationInput>
    by: VmqAuthAclScalarFieldEnum[]
    having?: VmqAuthAclScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VmqAuthAclCountAggregateInputType | true
    _avg?: VmqAuthAclAvgAggregateInputType
    _sum?: VmqAuthAclSumAggregateInputType
    _min?: VmqAuthAclMinAggregateInputType
    _max?: VmqAuthAclMaxAggregateInputType
  }


  export type VmqAuthAclGroupByOutputType = {
    id: number
    mountpoint: string
    username: string
    clientId: string
    password: string | null
    publishAcl: JsonValue
    subscribeAcl: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: VmqAuthAclCountAggregateOutputType | null
    _avg: VmqAuthAclAvgAggregateOutputType | null
    _sum: VmqAuthAclSumAggregateOutputType | null
    _min: VmqAuthAclMinAggregateOutputType | null
    _max: VmqAuthAclMaxAggregateOutputType | null
  }

  type GetVmqAuthAclGroupByPayload<T extends VmqAuthAclGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<VmqAuthAclGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VmqAuthAclGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VmqAuthAclGroupByOutputType[P]>
            : GetScalarType<T[P], VmqAuthAclGroupByOutputType[P]>
        }
      >
    >


  export type VmqAuthAclSelect = {
    id?: boolean
    mountpoint?: boolean
    username?: boolean
    clientId?: boolean
    password?: boolean
    publishAcl?: boolean
    subscribeAcl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type VmqAuthAclGetPayload<S extends boolean | null | undefined | VmqAuthAclArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? VmqAuthAcl :
    S extends undefined ? never :
    S extends { include: any } & (VmqAuthAclArgs | VmqAuthAclFindManyArgs)
    ? VmqAuthAcl 
    : S extends { select: any } & (VmqAuthAclArgs | VmqAuthAclFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof VmqAuthAcl ? VmqAuthAcl[P] : never
  } 
      : VmqAuthAcl


  type VmqAuthAclCountArgs = 
    Omit<VmqAuthAclFindManyArgs, 'select' | 'include'> & {
      select?: VmqAuthAclCountAggregateInputType | true
    }

  export interface VmqAuthAclDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one VmqAuthAcl that matches the filter.
     * @param {VmqAuthAclFindUniqueArgs} args - Arguments to find a VmqAuthAcl
     * @example
     * // Get one VmqAuthAcl
     * const vmqAuthAcl = await prisma.vmqAuthAcl.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends VmqAuthAclFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, VmqAuthAclFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'VmqAuthAcl'> extends True ? Prisma__VmqAuthAclClient<VmqAuthAclGetPayload<T>> : Prisma__VmqAuthAclClient<VmqAuthAclGetPayload<T> | null, null>

    /**
     * Find one VmqAuthAcl that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {VmqAuthAclFindUniqueOrThrowArgs} args - Arguments to find a VmqAuthAcl
     * @example
     * // Get one VmqAuthAcl
     * const vmqAuthAcl = await prisma.vmqAuthAcl.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends VmqAuthAclFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, VmqAuthAclFindUniqueOrThrowArgs>
    ): Prisma__VmqAuthAclClient<VmqAuthAclGetPayload<T>>

    /**
     * Find the first VmqAuthAcl that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VmqAuthAclFindFirstArgs} args - Arguments to find a VmqAuthAcl
     * @example
     * // Get one VmqAuthAcl
     * const vmqAuthAcl = await prisma.vmqAuthAcl.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends VmqAuthAclFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, VmqAuthAclFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'VmqAuthAcl'> extends True ? Prisma__VmqAuthAclClient<VmqAuthAclGetPayload<T>> : Prisma__VmqAuthAclClient<VmqAuthAclGetPayload<T> | null, null>

    /**
     * Find the first VmqAuthAcl that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VmqAuthAclFindFirstOrThrowArgs} args - Arguments to find a VmqAuthAcl
     * @example
     * // Get one VmqAuthAcl
     * const vmqAuthAcl = await prisma.vmqAuthAcl.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends VmqAuthAclFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VmqAuthAclFindFirstOrThrowArgs>
    ): Prisma__VmqAuthAclClient<VmqAuthAclGetPayload<T>>

    /**
     * Find zero or more VmqAuthAcls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VmqAuthAclFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VmqAuthAcls
     * const vmqAuthAcls = await prisma.vmqAuthAcl.findMany()
     * 
     * // Get first 10 VmqAuthAcls
     * const vmqAuthAcls = await prisma.vmqAuthAcl.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vmqAuthAclWithIdOnly = await prisma.vmqAuthAcl.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends VmqAuthAclFindManyArgs>(
      args?: SelectSubset<T, VmqAuthAclFindManyArgs>
    ): Prisma.PrismaPromise<Array<VmqAuthAclGetPayload<T>>>

    /**
     * Create a VmqAuthAcl.
     * @param {VmqAuthAclCreateArgs} args - Arguments to create a VmqAuthAcl.
     * @example
     * // Create one VmqAuthAcl
     * const VmqAuthAcl = await prisma.vmqAuthAcl.create({
     *   data: {
     *     // ... data to create a VmqAuthAcl
     *   }
     * })
     * 
    **/
    create<T extends VmqAuthAclCreateArgs>(
      args: SelectSubset<T, VmqAuthAclCreateArgs>
    ): Prisma__VmqAuthAclClient<VmqAuthAclGetPayload<T>>

    /**
     * Create many VmqAuthAcls.
     *     @param {VmqAuthAclCreateManyArgs} args - Arguments to create many VmqAuthAcls.
     *     @example
     *     // Create many VmqAuthAcls
     *     const vmqAuthAcl = await prisma.vmqAuthAcl.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends VmqAuthAclCreateManyArgs>(
      args?: SelectSubset<T, VmqAuthAclCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VmqAuthAcl.
     * @param {VmqAuthAclDeleteArgs} args - Arguments to delete one VmqAuthAcl.
     * @example
     * // Delete one VmqAuthAcl
     * const VmqAuthAcl = await prisma.vmqAuthAcl.delete({
     *   where: {
     *     // ... filter to delete one VmqAuthAcl
     *   }
     * })
     * 
    **/
    delete<T extends VmqAuthAclDeleteArgs>(
      args: SelectSubset<T, VmqAuthAclDeleteArgs>
    ): Prisma__VmqAuthAclClient<VmqAuthAclGetPayload<T>>

    /**
     * Update one VmqAuthAcl.
     * @param {VmqAuthAclUpdateArgs} args - Arguments to update one VmqAuthAcl.
     * @example
     * // Update one VmqAuthAcl
     * const vmqAuthAcl = await prisma.vmqAuthAcl.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends VmqAuthAclUpdateArgs>(
      args: SelectSubset<T, VmqAuthAclUpdateArgs>
    ): Prisma__VmqAuthAclClient<VmqAuthAclGetPayload<T>>

    /**
     * Delete zero or more VmqAuthAcls.
     * @param {VmqAuthAclDeleteManyArgs} args - Arguments to filter VmqAuthAcls to delete.
     * @example
     * // Delete a few VmqAuthAcls
     * const { count } = await prisma.vmqAuthAcl.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends VmqAuthAclDeleteManyArgs>(
      args?: SelectSubset<T, VmqAuthAclDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VmqAuthAcls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VmqAuthAclUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VmqAuthAcls
     * const vmqAuthAcl = await prisma.vmqAuthAcl.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends VmqAuthAclUpdateManyArgs>(
      args: SelectSubset<T, VmqAuthAclUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VmqAuthAcl.
     * @param {VmqAuthAclUpsertArgs} args - Arguments to update or create a VmqAuthAcl.
     * @example
     * // Update or create a VmqAuthAcl
     * const vmqAuthAcl = await prisma.vmqAuthAcl.upsert({
     *   create: {
     *     // ... data to create a VmqAuthAcl
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VmqAuthAcl we want to update
     *   }
     * })
    **/
    upsert<T extends VmqAuthAclUpsertArgs>(
      args: SelectSubset<T, VmqAuthAclUpsertArgs>
    ): Prisma__VmqAuthAclClient<VmqAuthAclGetPayload<T>>

    /**
     * Count the number of VmqAuthAcls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VmqAuthAclCountArgs} args - Arguments to filter VmqAuthAcls to count.
     * @example
     * // Count the number of VmqAuthAcls
     * const count = await prisma.vmqAuthAcl.count({
     *   where: {
     *     // ... the filter for the VmqAuthAcls we want to count
     *   }
     * })
    **/
    count<T extends VmqAuthAclCountArgs>(
      args?: Subset<T, VmqAuthAclCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VmqAuthAclCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VmqAuthAcl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VmqAuthAclAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VmqAuthAclAggregateArgs>(args: Subset<T, VmqAuthAclAggregateArgs>): Prisma.PrismaPromise<GetVmqAuthAclAggregateType<T>>

    /**
     * Group by VmqAuthAcl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VmqAuthAclGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VmqAuthAclGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VmqAuthAclGroupByArgs['orderBy'] }
        : { orderBy?: VmqAuthAclGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VmqAuthAclGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVmqAuthAclGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for VmqAuthAcl.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VmqAuthAclClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * VmqAuthAcl base type for findUnique actions
   */
  export type VmqAuthAclFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the VmqAuthAcl
     */
    select?: VmqAuthAclSelect | null
    /**
     * Filter, which VmqAuthAcl to fetch.
     */
    where: VmqAuthAclWhereUniqueInput
  }

  /**
   * VmqAuthAcl findUnique
   */
  export interface VmqAuthAclFindUniqueArgs extends VmqAuthAclFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VmqAuthAcl findUniqueOrThrow
   */
  export type VmqAuthAclFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the VmqAuthAcl
     */
    select?: VmqAuthAclSelect | null
    /**
     * Filter, which VmqAuthAcl to fetch.
     */
    where: VmqAuthAclWhereUniqueInput
  }


  /**
   * VmqAuthAcl base type for findFirst actions
   */
  export type VmqAuthAclFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the VmqAuthAcl
     */
    select?: VmqAuthAclSelect | null
    /**
     * Filter, which VmqAuthAcl to fetch.
     */
    where?: VmqAuthAclWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VmqAuthAcls to fetch.
     */
    orderBy?: Enumerable<VmqAuthAclOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VmqAuthAcls.
     */
    cursor?: VmqAuthAclWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VmqAuthAcls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VmqAuthAcls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VmqAuthAcls.
     */
    distinct?: Enumerable<VmqAuthAclScalarFieldEnum>
  }

  /**
   * VmqAuthAcl findFirst
   */
  export interface VmqAuthAclFindFirstArgs extends VmqAuthAclFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VmqAuthAcl findFirstOrThrow
   */
  export type VmqAuthAclFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the VmqAuthAcl
     */
    select?: VmqAuthAclSelect | null
    /**
     * Filter, which VmqAuthAcl to fetch.
     */
    where?: VmqAuthAclWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VmqAuthAcls to fetch.
     */
    orderBy?: Enumerable<VmqAuthAclOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VmqAuthAcls.
     */
    cursor?: VmqAuthAclWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VmqAuthAcls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VmqAuthAcls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VmqAuthAcls.
     */
    distinct?: Enumerable<VmqAuthAclScalarFieldEnum>
  }


  /**
   * VmqAuthAcl findMany
   */
  export type VmqAuthAclFindManyArgs = {
    /**
     * Select specific fields to fetch from the VmqAuthAcl
     */
    select?: VmqAuthAclSelect | null
    /**
     * Filter, which VmqAuthAcls to fetch.
     */
    where?: VmqAuthAclWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VmqAuthAcls to fetch.
     */
    orderBy?: Enumerable<VmqAuthAclOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VmqAuthAcls.
     */
    cursor?: VmqAuthAclWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VmqAuthAcls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VmqAuthAcls.
     */
    skip?: number
    distinct?: Enumerable<VmqAuthAclScalarFieldEnum>
  }


  /**
   * VmqAuthAcl create
   */
  export type VmqAuthAclCreateArgs = {
    /**
     * Select specific fields to fetch from the VmqAuthAcl
     */
    select?: VmqAuthAclSelect | null
    /**
     * The data needed to create a VmqAuthAcl.
     */
    data: XOR<VmqAuthAclCreateInput, VmqAuthAclUncheckedCreateInput>
  }


  /**
   * VmqAuthAcl createMany
   */
  export type VmqAuthAclCreateManyArgs = {
    /**
     * The data used to create many VmqAuthAcls.
     */
    data: Enumerable<VmqAuthAclCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * VmqAuthAcl update
   */
  export type VmqAuthAclUpdateArgs = {
    /**
     * Select specific fields to fetch from the VmqAuthAcl
     */
    select?: VmqAuthAclSelect | null
    /**
     * The data needed to update a VmqAuthAcl.
     */
    data: XOR<VmqAuthAclUpdateInput, VmqAuthAclUncheckedUpdateInput>
    /**
     * Choose, which VmqAuthAcl to update.
     */
    where: VmqAuthAclWhereUniqueInput
  }


  /**
   * VmqAuthAcl updateMany
   */
  export type VmqAuthAclUpdateManyArgs = {
    /**
     * The data used to update VmqAuthAcls.
     */
    data: XOR<VmqAuthAclUpdateManyMutationInput, VmqAuthAclUncheckedUpdateManyInput>
    /**
     * Filter which VmqAuthAcls to update
     */
    where?: VmqAuthAclWhereInput
  }


  /**
   * VmqAuthAcl upsert
   */
  export type VmqAuthAclUpsertArgs = {
    /**
     * Select specific fields to fetch from the VmqAuthAcl
     */
    select?: VmqAuthAclSelect | null
    /**
     * The filter to search for the VmqAuthAcl to update in case it exists.
     */
    where: VmqAuthAclWhereUniqueInput
    /**
     * In case the VmqAuthAcl found by the `where` argument doesn't exist, create a new VmqAuthAcl with this data.
     */
    create: XOR<VmqAuthAclCreateInput, VmqAuthAclUncheckedCreateInput>
    /**
     * In case the VmqAuthAcl was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VmqAuthAclUpdateInput, VmqAuthAclUncheckedUpdateInput>
  }


  /**
   * VmqAuthAcl delete
   */
  export type VmqAuthAclDeleteArgs = {
    /**
     * Select specific fields to fetch from the VmqAuthAcl
     */
    select?: VmqAuthAclSelect | null
    /**
     * Filter which VmqAuthAcl to delete.
     */
    where: VmqAuthAclWhereUniqueInput
  }


  /**
   * VmqAuthAcl deleteMany
   */
  export type VmqAuthAclDeleteManyArgs = {
    /**
     * Filter which VmqAuthAcls to delete
     */
    where?: VmqAuthAclWhereInput
  }


  /**
   * VmqAuthAcl without action
   */
  export type VmqAuthAclArgs = {
    /**
     * Select specific fields to fetch from the VmqAuthAcl
     */
    select?: VmqAuthAclSelect | null
  }



  /**
   * Model Device
   */


  export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null
    _avg: DeviceAvgAggregateOutputType | null
    _sum: DeviceSumAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  export type DeviceAvgAggregateOutputType = {
    id: number | null
    credentialId: number | null
    deviceProfileId: number | null
    firmwareId: number | null
    virtualDeviceId: number | null
    groupId: number | null
    tenantId: number | null
  }

  export type DeviceSumAggregateOutputType = {
    id: number | null
    credentialId: number | null
    deviceProfileId: number | null
    firmwareId: number | null
    virtualDeviceId: number | null
    groupId: number | null
    tenantId: number | null
  }

  export type DeviceMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    serial: string | null
    isPassive: boolean | null
    isOnline: boolean | null
    isdecoded: boolean | null
    credentialId: number | null
    configuration: string | null
    deviceProfileId: number | null
    firmwareId: number | null
    ip: string | null
    createdAt: Date | null
    updatedAt: Date | null
    virtualDeviceId: number | null
    groupId: number | null
    tenantId: number | null
  }

  export type DeviceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    serial: string | null
    isPassive: boolean | null
    isOnline: boolean | null
    isdecoded: boolean | null
    credentialId: number | null
    configuration: string | null
    deviceProfileId: number | null
    firmwareId: number | null
    ip: string | null
    createdAt: Date | null
    updatedAt: Date | null
    virtualDeviceId: number | null
    groupId: number | null
    tenantId: number | null
  }

  export type DeviceCountAggregateOutputType = {
    id: number
    name: number
    description: number
    serial: number
    isPassive: number
    isOnline: number
    isdecoded: number
    credentialId: number
    configuration: number
    deviceProfileId: number
    firmwareId: number
    ip: number
    createdAt: number
    updatedAt: number
    virtualDeviceId: number
    groupId: number
    tenantId: number
    _all: number
  }


  export type DeviceAvgAggregateInputType = {
    id?: true
    credentialId?: true
    deviceProfileId?: true
    firmwareId?: true
    virtualDeviceId?: true
    groupId?: true
    tenantId?: true
  }

  export type DeviceSumAggregateInputType = {
    id?: true
    credentialId?: true
    deviceProfileId?: true
    firmwareId?: true
    virtualDeviceId?: true
    groupId?: true
    tenantId?: true
  }

  export type DeviceMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    serial?: true
    isPassive?: true
    isOnline?: true
    isdecoded?: true
    credentialId?: true
    configuration?: true
    deviceProfileId?: true
    firmwareId?: true
    ip?: true
    createdAt?: true
    updatedAt?: true
    virtualDeviceId?: true
    groupId?: true
    tenantId?: true
  }

  export type DeviceMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    serial?: true
    isPassive?: true
    isOnline?: true
    isdecoded?: true
    credentialId?: true
    configuration?: true
    deviceProfileId?: true
    firmwareId?: true
    ip?: true
    createdAt?: true
    updatedAt?: true
    virtualDeviceId?: true
    groupId?: true
    tenantId?: true
  }

  export type DeviceCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    serial?: true
    isPassive?: true
    isOnline?: true
    isdecoded?: true
    credentialId?: true
    configuration?: true
    deviceProfileId?: true
    firmwareId?: true
    ip?: true
    createdAt?: true
    updatedAt?: true
    virtualDeviceId?: true
    groupId?: true
    tenantId?: true
    _all?: true
  }

  export type DeviceAggregateArgs = {
    /**
     * Filter which Device to aggregate.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: Enumerable<DeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Devices
    **/
    _count?: true | DeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeviceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeviceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceMaxAggregateInputType
  }

  export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevice[P]>
      : GetScalarType<T[P], AggregateDevice[P]>
  }




  export type DeviceGroupByArgs = {
    where?: DeviceWhereInput
    orderBy?: Enumerable<DeviceOrderByWithAggregationInput>
    by: DeviceScalarFieldEnum[]
    having?: DeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceCountAggregateInputType | true
    _avg?: DeviceAvgAggregateInputType
    _sum?: DeviceSumAggregateInputType
    _min?: DeviceMinAggregateInputType
    _max?: DeviceMaxAggregateInputType
  }


  export type DeviceGroupByOutputType = {
    id: number
    name: string
    description: string | null
    serial: string
    isPassive: boolean
    isOnline: boolean
    isdecoded: boolean
    credentialId: number | null
    configuration: string | null
    deviceProfileId: number | null
    firmwareId: number | null
    ip: string | null
    createdAt: Date
    updatedAt: Date
    virtualDeviceId: number | null
    groupId: number | null
    tenantId: number | null
    _count: DeviceCountAggregateOutputType | null
    _avg: DeviceAvgAggregateOutputType | null
    _sum: DeviceSumAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  type GetDeviceGroupByPayload<T extends DeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<DeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceGroupByOutputType[P]>
        }
      >
    >


  export type DeviceSelect = {
    id?: boolean
    name?: boolean
    description?: boolean
    serial?: boolean
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: boolean
    configuration?: boolean
    deviceProfileId?: boolean
    firmwareId?: boolean
    ip?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    virtualDeviceId?: boolean
    groupId?: boolean
    tenantId?: boolean
    credential?: boolean | CredentialArgs
    attributes?: boolean | Device$attributesArgs
    lastTelemetries?: boolean | Device$lastTelemetriesArgs
    deviceProfile?: boolean | DeviceProfileArgs
    firmware?: boolean | FirmwareArgs
    tags?: boolean | Device$tagsArgs
    VirtualDevice?: boolean | VirtualDeviceArgs
    alerts?: boolean | Device$alertsArgs
    group?: boolean | GroupArgs
    history?: boolean | Device$historyArgs
    _count?: boolean | DeviceCountOutputTypeArgs
  }


  export type DeviceInclude = {
    credential?: boolean | CredentialArgs
    attributes?: boolean | Device$attributesArgs
    lastTelemetries?: boolean | Device$lastTelemetriesArgs
    deviceProfile?: boolean | DeviceProfileArgs
    firmware?: boolean | FirmwareArgs
    tags?: boolean | Device$tagsArgs
    VirtualDevice?: boolean | VirtualDeviceArgs
    alerts?: boolean | Device$alertsArgs
    group?: boolean | GroupArgs
    history?: boolean | Device$historyArgs
    _count?: boolean | DeviceCountOutputTypeArgs
  }

  export type DeviceGetPayload<S extends boolean | null | undefined | DeviceArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Device :
    S extends undefined ? never :
    S extends { include: any } & (DeviceArgs | DeviceFindManyArgs)
    ? Device  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'credential' ? CredentialGetPayload<S['include'][P]> | null :
        P extends 'attributes' ? Array < AttributeGetPayload<S['include'][P]>>  :
        P extends 'lastTelemetries' ? Array < LastTelemetryGetPayload<S['include'][P]>>  :
        P extends 'deviceProfile' ? DeviceProfileGetPayload<S['include'][P]> | null :
        P extends 'firmware' ? FirmwareGetPayload<S['include'][P]> | null :
        P extends 'tags' ? Array < TagGetPayload<S['include'][P]>>  :
        P extends 'VirtualDevice' ? VirtualDeviceGetPayload<S['include'][P]> | null :
        P extends 'alerts' ? Array < AlertGetPayload<S['include'][P]>>  :
        P extends 'group' ? GroupGetPayload<S['include'][P]> | null :
        P extends 'history' ? Array < HistoryGetPayload<S['include'][P]>>  :
        P extends '_count' ? DeviceCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (DeviceArgs | DeviceFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'credential' ? CredentialGetPayload<S['select'][P]> | null :
        P extends 'attributes' ? Array < AttributeGetPayload<S['select'][P]>>  :
        P extends 'lastTelemetries' ? Array < LastTelemetryGetPayload<S['select'][P]>>  :
        P extends 'deviceProfile' ? DeviceProfileGetPayload<S['select'][P]> | null :
        P extends 'firmware' ? FirmwareGetPayload<S['select'][P]> | null :
        P extends 'tags' ? Array < TagGetPayload<S['select'][P]>>  :
        P extends 'VirtualDevice' ? VirtualDeviceGetPayload<S['select'][P]> | null :
        P extends 'alerts' ? Array < AlertGetPayload<S['select'][P]>>  :
        P extends 'group' ? GroupGetPayload<S['select'][P]> | null :
        P extends 'history' ? Array < HistoryGetPayload<S['select'][P]>>  :
        P extends '_count' ? DeviceCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Device ? Device[P] : never
  } 
      : Device


  type DeviceCountArgs = 
    Omit<DeviceFindManyArgs, 'select' | 'include'> & {
      select?: DeviceCountAggregateInputType | true
    }

  export interface DeviceDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Device that matches the filter.
     * @param {DeviceFindUniqueArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DeviceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DeviceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Device'> extends True ? Prisma__DeviceClient<DeviceGetPayload<T>> : Prisma__DeviceClient<DeviceGetPayload<T> | null, null>

    /**
     * Find one Device that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DeviceFindUniqueOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DeviceFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DeviceFindUniqueOrThrowArgs>
    ): Prisma__DeviceClient<DeviceGetPayload<T>>

    /**
     * Find the first Device that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DeviceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DeviceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Device'> extends True ? Prisma__DeviceClient<DeviceGetPayload<T>> : Prisma__DeviceClient<DeviceGetPayload<T> | null, null>

    /**
     * Find the first Device that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DeviceFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DeviceFindFirstOrThrowArgs>
    ): Prisma__DeviceClient<DeviceGetPayload<T>>

    /**
     * Find zero or more Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devices
     * const devices = await prisma.device.findMany()
     * 
     * // Get first 10 Devices
     * const devices = await prisma.device.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceWithIdOnly = await prisma.device.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DeviceFindManyArgs>(
      args?: SelectSubset<T, DeviceFindManyArgs>
    ): Prisma.PrismaPromise<Array<DeviceGetPayload<T>>>

    /**
     * Create a Device.
     * @param {DeviceCreateArgs} args - Arguments to create a Device.
     * @example
     * // Create one Device
     * const Device = await prisma.device.create({
     *   data: {
     *     // ... data to create a Device
     *   }
     * })
     * 
    **/
    create<T extends DeviceCreateArgs>(
      args: SelectSubset<T, DeviceCreateArgs>
    ): Prisma__DeviceClient<DeviceGetPayload<T>>

    /**
     * Create many Devices.
     *     @param {DeviceCreateManyArgs} args - Arguments to create many Devices.
     *     @example
     *     // Create many Devices
     *     const device = await prisma.device.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DeviceCreateManyArgs>(
      args?: SelectSubset<T, DeviceCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Device.
     * @param {DeviceDeleteArgs} args - Arguments to delete one Device.
     * @example
     * // Delete one Device
     * const Device = await prisma.device.delete({
     *   where: {
     *     // ... filter to delete one Device
     *   }
     * })
     * 
    **/
    delete<T extends DeviceDeleteArgs>(
      args: SelectSubset<T, DeviceDeleteArgs>
    ): Prisma__DeviceClient<DeviceGetPayload<T>>

    /**
     * Update one Device.
     * @param {DeviceUpdateArgs} args - Arguments to update one Device.
     * @example
     * // Update one Device
     * const device = await prisma.device.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DeviceUpdateArgs>(
      args: SelectSubset<T, DeviceUpdateArgs>
    ): Prisma__DeviceClient<DeviceGetPayload<T>>

    /**
     * Delete zero or more Devices.
     * @param {DeviceDeleteManyArgs} args - Arguments to filter Devices to delete.
     * @example
     * // Delete a few Devices
     * const { count } = await prisma.device.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DeviceDeleteManyArgs>(
      args?: SelectSubset<T, DeviceDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DeviceUpdateManyArgs>(
      args: SelectSubset<T, DeviceUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Device.
     * @param {DeviceUpsertArgs} args - Arguments to update or create a Device.
     * @example
     * // Update or create a Device
     * const device = await prisma.device.upsert({
     *   create: {
     *     // ... data to create a Device
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Device we want to update
     *   }
     * })
    **/
    upsert<T extends DeviceUpsertArgs>(
      args: SelectSubset<T, DeviceUpsertArgs>
    ): Prisma__DeviceClient<DeviceGetPayload<T>>

    /**
     * Count the number of Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceCountArgs} args - Arguments to filter Devices to count.
     * @example
     * // Count the number of Devices
     * const count = await prisma.device.count({
     *   where: {
     *     // ... the filter for the Devices we want to count
     *   }
     * })
    **/
    count<T extends DeviceCountArgs>(
      args?: Subset<T, DeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceAggregateArgs>(args: Subset<T, DeviceAggregateArgs>): Prisma.PrismaPromise<GetDeviceAggregateType<T>>

    /**
     * Group by Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceGroupByArgs['orderBy'] }
        : { orderBy?: DeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Device.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DeviceClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    credential<T extends CredentialArgs= {}>(args?: Subset<T, CredentialArgs>): Prisma__CredentialClient<CredentialGetPayload<T> | Null>;

    attributes<T extends Device$attributesArgs= {}>(args?: Subset<T, Device$attributesArgs>): Prisma.PrismaPromise<Array<AttributeGetPayload<T>>| Null>;

    lastTelemetries<T extends Device$lastTelemetriesArgs= {}>(args?: Subset<T, Device$lastTelemetriesArgs>): Prisma.PrismaPromise<Array<LastTelemetryGetPayload<T>>| Null>;

    deviceProfile<T extends DeviceProfileArgs= {}>(args?: Subset<T, DeviceProfileArgs>): Prisma__DeviceProfileClient<DeviceProfileGetPayload<T> | Null>;

    firmware<T extends FirmwareArgs= {}>(args?: Subset<T, FirmwareArgs>): Prisma__FirmwareClient<FirmwareGetPayload<T> | Null>;

    tags<T extends Device$tagsArgs= {}>(args?: Subset<T, Device$tagsArgs>): Prisma.PrismaPromise<Array<TagGetPayload<T>>| Null>;

    VirtualDevice<T extends VirtualDeviceArgs= {}>(args?: Subset<T, VirtualDeviceArgs>): Prisma__VirtualDeviceClient<VirtualDeviceGetPayload<T> | Null>;

    alerts<T extends Device$alertsArgs= {}>(args?: Subset<T, Device$alertsArgs>): Prisma.PrismaPromise<Array<AlertGetPayload<T>>| Null>;

    group<T extends GroupArgs= {}>(args?: Subset<T, GroupArgs>): Prisma__GroupClient<GroupGetPayload<T> | Null>;

    history<T extends Device$historyArgs= {}>(args?: Subset<T, Device$historyArgs>): Prisma.PrismaPromise<Array<HistoryGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Device base type for findUnique actions
   */
  export type DeviceFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findUnique
   */
  export interface DeviceFindUniqueArgs extends DeviceFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Device findUniqueOrThrow
   */
  export type DeviceFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }


  /**
   * Device base type for findFirst actions
   */
  export type DeviceFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: Enumerable<DeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: Enumerable<DeviceScalarFieldEnum>
  }

  /**
   * Device findFirst
   */
  export interface DeviceFindFirstArgs extends DeviceFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Device findFirstOrThrow
   */
  export type DeviceFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: Enumerable<DeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: Enumerable<DeviceScalarFieldEnum>
  }


  /**
   * Device findMany
   */
  export type DeviceFindManyArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    /**
     * Filter, which Devices to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: Enumerable<DeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    distinct?: Enumerable<DeviceScalarFieldEnum>
  }


  /**
   * Device create
   */
  export type DeviceCreateArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    /**
     * The data needed to create a Device.
     */
    data: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
  }


  /**
   * Device createMany
   */
  export type DeviceCreateManyArgs = {
    /**
     * The data used to create many Devices.
     */
    data: Enumerable<DeviceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Device update
   */
  export type DeviceUpdateArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    /**
     * The data needed to update a Device.
     */
    data: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
    /**
     * Choose, which Device to update.
     */
    where: DeviceWhereUniqueInput
  }


  /**
   * Device updateMany
   */
  export type DeviceUpdateManyArgs = {
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
  }


  /**
   * Device upsert
   */
  export type DeviceUpsertArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    /**
     * The filter to search for the Device to update in case it exists.
     */
    where: DeviceWhereUniqueInput
    /**
     * In case the Device found by the `where` argument doesn't exist, create a new Device with this data.
     */
    create: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
    /**
     * In case the Device was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
  }


  /**
   * Device delete
   */
  export type DeviceDeleteArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
    /**
     * Filter which Device to delete.
     */
    where: DeviceWhereUniqueInput
  }


  /**
   * Device deleteMany
   */
  export type DeviceDeleteManyArgs = {
    /**
     * Filter which Devices to delete
     */
    where?: DeviceWhereInput
  }


  /**
   * Device.attributes
   */
  export type Device$attributesArgs = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
    where?: AttributeWhereInput
    orderBy?: Enumerable<AttributeOrderByWithRelationInput>
    cursor?: AttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AttributeScalarFieldEnum>
  }


  /**
   * Device.lastTelemetries
   */
  export type Device$lastTelemetriesArgs = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
    where?: LastTelemetryWhereInput
    orderBy?: Enumerable<LastTelemetryOrderByWithRelationInput>
    cursor?: LastTelemetryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<LastTelemetryScalarFieldEnum>
  }


  /**
   * Device.tags
   */
  export type Device$tagsArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    where?: TagWhereInput
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Device.alerts
   */
  export type Device$alertsArgs = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AlertInclude | null
    where?: AlertWhereInput
    orderBy?: Enumerable<AlertOrderByWithRelationInput>
    cursor?: AlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AlertScalarFieldEnum>
  }


  /**
   * Device.history
   */
  export type Device$historyArgs = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
    where?: HistoryWhereInput
    orderBy?: Enumerable<HistoryOrderByWithRelationInput>
    cursor?: HistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<HistoryScalarFieldEnum>
  }


  /**
   * Device without action
   */
  export type DeviceArgs = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceInclude | null
  }



  /**
   * Model Attribute
   */


  export type AggregateAttribute = {
    _count: AttributeCountAggregateOutputType | null
    _avg: AttributeAvgAggregateOutputType | null
    _sum: AttributeSumAggregateOutputType | null
    _min: AttributeMinAggregateOutputType | null
    _max: AttributeMaxAggregateOutputType | null
  }

  export type AttributeAvgAggregateOutputType = {
    id: number | null
    deviceId: number | null
  }

  export type AttributeSumAggregateOutputType = {
    id: number | null
    deviceId: number | null
  }

  export type AttributeMinAggregateOutputType = {
    id: number | null
    name: string | null
    value: string | null
    deviceId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttributeMaxAggregateOutputType = {
    id: number | null
    name: string | null
    value: string | null
    deviceId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttributeCountAggregateOutputType = {
    id: number
    name: number
    value: number
    deviceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AttributeAvgAggregateInputType = {
    id?: true
    deviceId?: true
  }

  export type AttributeSumAggregateInputType = {
    id?: true
    deviceId?: true
  }

  export type AttributeMinAggregateInputType = {
    id?: true
    name?: true
    value?: true
    deviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttributeMaxAggregateInputType = {
    id?: true
    name?: true
    value?: true
    deviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttributeCountAggregateInputType = {
    id?: true
    name?: true
    value?: true
    deviceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AttributeAggregateArgs = {
    /**
     * Filter which Attribute to aggregate.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: Enumerable<AttributeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attributes
    **/
    _count?: true | AttributeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttributeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttributeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttributeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttributeMaxAggregateInputType
  }

  export type GetAttributeAggregateType<T extends AttributeAggregateArgs> = {
        [P in keyof T & keyof AggregateAttribute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttribute[P]>
      : GetScalarType<T[P], AggregateAttribute[P]>
  }




  export type AttributeGroupByArgs = {
    where?: AttributeWhereInput
    orderBy?: Enumerable<AttributeOrderByWithAggregationInput>
    by: AttributeScalarFieldEnum[]
    having?: AttributeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttributeCountAggregateInputType | true
    _avg?: AttributeAvgAggregateInputType
    _sum?: AttributeSumAggregateInputType
    _min?: AttributeMinAggregateInputType
    _max?: AttributeMaxAggregateInputType
  }


  export type AttributeGroupByOutputType = {
    id: number
    name: string
    value: string
    deviceId: number
    createdAt: Date
    updatedAt: Date
    _count: AttributeCountAggregateOutputType | null
    _avg: AttributeAvgAggregateOutputType | null
    _sum: AttributeSumAggregateOutputType | null
    _min: AttributeMinAggregateOutputType | null
    _max: AttributeMaxAggregateOutputType | null
  }

  type GetAttributeGroupByPayload<T extends AttributeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AttributeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttributeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttributeGroupByOutputType[P]>
            : GetScalarType<T[P], AttributeGroupByOutputType[P]>
        }
      >
    >


  export type AttributeSelect = {
    id?: boolean
    name?: boolean
    value?: boolean
    deviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    device?: boolean | DeviceArgs
  }


  export type AttributeInclude = {
    device?: boolean | DeviceArgs
  }

  export type AttributeGetPayload<S extends boolean | null | undefined | AttributeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Attribute :
    S extends undefined ? never :
    S extends { include: any } & (AttributeArgs | AttributeFindManyArgs)
    ? Attribute  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'device' ? DeviceGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (AttributeArgs | AttributeFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'device' ? DeviceGetPayload<S['select'][P]> :  P extends keyof Attribute ? Attribute[P] : never
  } 
      : Attribute


  type AttributeCountArgs = 
    Omit<AttributeFindManyArgs, 'select' | 'include'> & {
      select?: AttributeCountAggregateInputType | true
    }

  export interface AttributeDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Attribute that matches the filter.
     * @param {AttributeFindUniqueArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AttributeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AttributeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Attribute'> extends True ? Prisma__AttributeClient<AttributeGetPayload<T>> : Prisma__AttributeClient<AttributeGetPayload<T> | null, null>

    /**
     * Find one Attribute that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AttributeFindUniqueOrThrowArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AttributeFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AttributeFindUniqueOrThrowArgs>
    ): Prisma__AttributeClient<AttributeGetPayload<T>>

    /**
     * Find the first Attribute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeFindFirstArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AttributeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AttributeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Attribute'> extends True ? Prisma__AttributeClient<AttributeGetPayload<T>> : Prisma__AttributeClient<AttributeGetPayload<T> | null, null>

    /**
     * Find the first Attribute that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeFindFirstOrThrowArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AttributeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AttributeFindFirstOrThrowArgs>
    ): Prisma__AttributeClient<AttributeGetPayload<T>>

    /**
     * Find zero or more Attributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attributes
     * const attributes = await prisma.attribute.findMany()
     * 
     * // Get first 10 Attributes
     * const attributes = await prisma.attribute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attributeWithIdOnly = await prisma.attribute.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AttributeFindManyArgs>(
      args?: SelectSubset<T, AttributeFindManyArgs>
    ): Prisma.PrismaPromise<Array<AttributeGetPayload<T>>>

    /**
     * Create a Attribute.
     * @param {AttributeCreateArgs} args - Arguments to create a Attribute.
     * @example
     * // Create one Attribute
     * const Attribute = await prisma.attribute.create({
     *   data: {
     *     // ... data to create a Attribute
     *   }
     * })
     * 
    **/
    create<T extends AttributeCreateArgs>(
      args: SelectSubset<T, AttributeCreateArgs>
    ): Prisma__AttributeClient<AttributeGetPayload<T>>

    /**
     * Create many Attributes.
     *     @param {AttributeCreateManyArgs} args - Arguments to create many Attributes.
     *     @example
     *     // Create many Attributes
     *     const attribute = await prisma.attribute.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AttributeCreateManyArgs>(
      args?: SelectSubset<T, AttributeCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attribute.
     * @param {AttributeDeleteArgs} args - Arguments to delete one Attribute.
     * @example
     * // Delete one Attribute
     * const Attribute = await prisma.attribute.delete({
     *   where: {
     *     // ... filter to delete one Attribute
     *   }
     * })
     * 
    **/
    delete<T extends AttributeDeleteArgs>(
      args: SelectSubset<T, AttributeDeleteArgs>
    ): Prisma__AttributeClient<AttributeGetPayload<T>>

    /**
     * Update one Attribute.
     * @param {AttributeUpdateArgs} args - Arguments to update one Attribute.
     * @example
     * // Update one Attribute
     * const attribute = await prisma.attribute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AttributeUpdateArgs>(
      args: SelectSubset<T, AttributeUpdateArgs>
    ): Prisma__AttributeClient<AttributeGetPayload<T>>

    /**
     * Delete zero or more Attributes.
     * @param {AttributeDeleteManyArgs} args - Arguments to filter Attributes to delete.
     * @example
     * // Delete a few Attributes
     * const { count } = await prisma.attribute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AttributeDeleteManyArgs>(
      args?: SelectSubset<T, AttributeDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attributes
     * const attribute = await prisma.attribute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AttributeUpdateManyArgs>(
      args: SelectSubset<T, AttributeUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attribute.
     * @param {AttributeUpsertArgs} args - Arguments to update or create a Attribute.
     * @example
     * // Update or create a Attribute
     * const attribute = await prisma.attribute.upsert({
     *   create: {
     *     // ... data to create a Attribute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attribute we want to update
     *   }
     * })
    **/
    upsert<T extends AttributeUpsertArgs>(
      args: SelectSubset<T, AttributeUpsertArgs>
    ): Prisma__AttributeClient<AttributeGetPayload<T>>

    /**
     * Count the number of Attributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeCountArgs} args - Arguments to filter Attributes to count.
     * @example
     * // Count the number of Attributes
     * const count = await prisma.attribute.count({
     *   where: {
     *     // ... the filter for the Attributes we want to count
     *   }
     * })
    **/
    count<T extends AttributeCountArgs>(
      args?: Subset<T, AttributeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttributeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttributeAggregateArgs>(args: Subset<T, AttributeAggregateArgs>): Prisma.PrismaPromise<GetAttributeAggregateType<T>>

    /**
     * Group by Attribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttributeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttributeGroupByArgs['orderBy'] }
        : { orderBy?: AttributeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Attribute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AttributeClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    device<T extends DeviceArgs= {}>(args?: Subset<T, DeviceArgs>): Prisma__DeviceClient<DeviceGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Attribute base type for findUnique actions
   */
  export type AttributeFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
    /**
     * Filter, which Attribute to fetch.
     */
    where: AttributeWhereUniqueInput
  }

  /**
   * Attribute findUnique
   */
  export interface AttributeFindUniqueArgs extends AttributeFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Attribute findUniqueOrThrow
   */
  export type AttributeFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
    /**
     * Filter, which Attribute to fetch.
     */
    where: AttributeWhereUniqueInput
  }


  /**
   * Attribute base type for findFirst actions
   */
  export type AttributeFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
    /**
     * Filter, which Attribute to fetch.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: Enumerable<AttributeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attributes.
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attributes.
     */
    distinct?: Enumerable<AttributeScalarFieldEnum>
  }

  /**
   * Attribute findFirst
   */
  export interface AttributeFindFirstArgs extends AttributeFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Attribute findFirstOrThrow
   */
  export type AttributeFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
    /**
     * Filter, which Attribute to fetch.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: Enumerable<AttributeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attributes.
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attributes.
     */
    distinct?: Enumerable<AttributeScalarFieldEnum>
  }


  /**
   * Attribute findMany
   */
  export type AttributeFindManyArgs = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
    /**
     * Filter, which Attributes to fetch.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: Enumerable<AttributeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attributes.
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    distinct?: Enumerable<AttributeScalarFieldEnum>
  }


  /**
   * Attribute create
   */
  export type AttributeCreateArgs = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
    /**
     * The data needed to create a Attribute.
     */
    data: XOR<AttributeCreateInput, AttributeUncheckedCreateInput>
  }


  /**
   * Attribute createMany
   */
  export type AttributeCreateManyArgs = {
    /**
     * The data used to create many Attributes.
     */
    data: Enumerable<AttributeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Attribute update
   */
  export type AttributeUpdateArgs = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
    /**
     * The data needed to update a Attribute.
     */
    data: XOR<AttributeUpdateInput, AttributeUncheckedUpdateInput>
    /**
     * Choose, which Attribute to update.
     */
    where: AttributeWhereUniqueInput
  }


  /**
   * Attribute updateMany
   */
  export type AttributeUpdateManyArgs = {
    /**
     * The data used to update Attributes.
     */
    data: XOR<AttributeUpdateManyMutationInput, AttributeUncheckedUpdateManyInput>
    /**
     * Filter which Attributes to update
     */
    where?: AttributeWhereInput
  }


  /**
   * Attribute upsert
   */
  export type AttributeUpsertArgs = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
    /**
     * The filter to search for the Attribute to update in case it exists.
     */
    where: AttributeWhereUniqueInput
    /**
     * In case the Attribute found by the `where` argument doesn't exist, create a new Attribute with this data.
     */
    create: XOR<AttributeCreateInput, AttributeUncheckedCreateInput>
    /**
     * In case the Attribute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttributeUpdateInput, AttributeUncheckedUpdateInput>
  }


  /**
   * Attribute delete
   */
  export type AttributeDeleteArgs = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
    /**
     * Filter which Attribute to delete.
     */
    where: AttributeWhereUniqueInput
  }


  /**
   * Attribute deleteMany
   */
  export type AttributeDeleteManyArgs = {
    /**
     * Filter which Attributes to delete
     */
    where?: AttributeWhereInput
  }


  /**
   * Attribute without action
   */
  export type AttributeArgs = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttributeInclude | null
  }



  /**
   * Model LastTelemetry
   */


  export type AggregateLastTelemetry = {
    _count: LastTelemetryCountAggregateOutputType | null
    _avg: LastTelemetryAvgAggregateOutputType | null
    _sum: LastTelemetrySumAggregateOutputType | null
    _min: LastTelemetryMinAggregateOutputType | null
    _max: LastTelemetryMaxAggregateOutputType | null
  }

  export type LastTelemetryAvgAggregateOutputType = {
    id: number | null
    deviceId: number | null
  }

  export type LastTelemetrySumAggregateOutputType = {
    id: number | null
    deviceId: number | null
  }

  export type LastTelemetryMinAggregateOutputType = {
    id: number | null
    name: string | null
    alias: string | null
    icon: string | null
    color: string | null
    show: boolean | null
    deviceId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LastTelemetryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    alias: string | null
    icon: string | null
    color: string | null
    show: boolean | null
    deviceId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LastTelemetryCountAggregateOutputType = {
    id: number
    name: number
    value: number
    alias: number
    icon: number
    color: number
    show: number
    deviceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LastTelemetryAvgAggregateInputType = {
    id?: true
    deviceId?: true
  }

  export type LastTelemetrySumAggregateInputType = {
    id?: true
    deviceId?: true
  }

  export type LastTelemetryMinAggregateInputType = {
    id?: true
    name?: true
    alias?: true
    icon?: true
    color?: true
    show?: true
    deviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LastTelemetryMaxAggregateInputType = {
    id?: true
    name?: true
    alias?: true
    icon?: true
    color?: true
    show?: true
    deviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LastTelemetryCountAggregateInputType = {
    id?: true
    name?: true
    value?: true
    alias?: true
    icon?: true
    color?: true
    show?: true
    deviceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LastTelemetryAggregateArgs = {
    /**
     * Filter which LastTelemetry to aggregate.
     */
    where?: LastTelemetryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LastTelemetries to fetch.
     */
    orderBy?: Enumerable<LastTelemetryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LastTelemetryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LastTelemetries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LastTelemetries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LastTelemetries
    **/
    _count?: true | LastTelemetryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LastTelemetryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LastTelemetrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LastTelemetryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LastTelemetryMaxAggregateInputType
  }

  export type GetLastTelemetryAggregateType<T extends LastTelemetryAggregateArgs> = {
        [P in keyof T & keyof AggregateLastTelemetry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLastTelemetry[P]>
      : GetScalarType<T[P], AggregateLastTelemetry[P]>
  }




  export type LastTelemetryGroupByArgs = {
    where?: LastTelemetryWhereInput
    orderBy?: Enumerable<LastTelemetryOrderByWithAggregationInput>
    by: LastTelemetryScalarFieldEnum[]
    having?: LastTelemetryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LastTelemetryCountAggregateInputType | true
    _avg?: LastTelemetryAvgAggregateInputType
    _sum?: LastTelemetrySumAggregateInputType
    _min?: LastTelemetryMinAggregateInputType
    _max?: LastTelemetryMaxAggregateInputType
  }


  export type LastTelemetryGroupByOutputType = {
    id: number
    name: string
    value: JsonValue
    alias: string | null
    icon: string | null
    color: string | null
    show: boolean
    deviceId: number
    createdAt: Date
    updatedAt: Date
    _count: LastTelemetryCountAggregateOutputType | null
    _avg: LastTelemetryAvgAggregateOutputType | null
    _sum: LastTelemetrySumAggregateOutputType | null
    _min: LastTelemetryMinAggregateOutputType | null
    _max: LastTelemetryMaxAggregateOutputType | null
  }

  type GetLastTelemetryGroupByPayload<T extends LastTelemetryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<LastTelemetryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LastTelemetryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LastTelemetryGroupByOutputType[P]>
            : GetScalarType<T[P], LastTelemetryGroupByOutputType[P]>
        }
      >
    >


  export type LastTelemetrySelect = {
    id?: boolean
    name?: boolean
    value?: boolean
    alias?: boolean
    icon?: boolean
    color?: boolean
    show?: boolean
    deviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    device?: boolean | DeviceArgs
  }


  export type LastTelemetryInclude = {
    device?: boolean | DeviceArgs
  }

  export type LastTelemetryGetPayload<S extends boolean | null | undefined | LastTelemetryArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? LastTelemetry :
    S extends undefined ? never :
    S extends { include: any } & (LastTelemetryArgs | LastTelemetryFindManyArgs)
    ? LastTelemetry  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'device' ? DeviceGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (LastTelemetryArgs | LastTelemetryFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'device' ? DeviceGetPayload<S['select'][P]> :  P extends keyof LastTelemetry ? LastTelemetry[P] : never
  } 
      : LastTelemetry


  type LastTelemetryCountArgs = 
    Omit<LastTelemetryFindManyArgs, 'select' | 'include'> & {
      select?: LastTelemetryCountAggregateInputType | true
    }

  export interface LastTelemetryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one LastTelemetry that matches the filter.
     * @param {LastTelemetryFindUniqueArgs} args - Arguments to find a LastTelemetry
     * @example
     * // Get one LastTelemetry
     * const lastTelemetry = await prisma.lastTelemetry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LastTelemetryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LastTelemetryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'LastTelemetry'> extends True ? Prisma__LastTelemetryClient<LastTelemetryGetPayload<T>> : Prisma__LastTelemetryClient<LastTelemetryGetPayload<T> | null, null>

    /**
     * Find one LastTelemetry that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {LastTelemetryFindUniqueOrThrowArgs} args - Arguments to find a LastTelemetry
     * @example
     * // Get one LastTelemetry
     * const lastTelemetry = await prisma.lastTelemetry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LastTelemetryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LastTelemetryFindUniqueOrThrowArgs>
    ): Prisma__LastTelemetryClient<LastTelemetryGetPayload<T>>

    /**
     * Find the first LastTelemetry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastTelemetryFindFirstArgs} args - Arguments to find a LastTelemetry
     * @example
     * // Get one LastTelemetry
     * const lastTelemetry = await prisma.lastTelemetry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LastTelemetryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LastTelemetryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'LastTelemetry'> extends True ? Prisma__LastTelemetryClient<LastTelemetryGetPayload<T>> : Prisma__LastTelemetryClient<LastTelemetryGetPayload<T> | null, null>

    /**
     * Find the first LastTelemetry that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastTelemetryFindFirstOrThrowArgs} args - Arguments to find a LastTelemetry
     * @example
     * // Get one LastTelemetry
     * const lastTelemetry = await prisma.lastTelemetry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LastTelemetryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LastTelemetryFindFirstOrThrowArgs>
    ): Prisma__LastTelemetryClient<LastTelemetryGetPayload<T>>

    /**
     * Find zero or more LastTelemetries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastTelemetryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LastTelemetries
     * const lastTelemetries = await prisma.lastTelemetry.findMany()
     * 
     * // Get first 10 LastTelemetries
     * const lastTelemetries = await prisma.lastTelemetry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lastTelemetryWithIdOnly = await prisma.lastTelemetry.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LastTelemetryFindManyArgs>(
      args?: SelectSubset<T, LastTelemetryFindManyArgs>
    ): Prisma.PrismaPromise<Array<LastTelemetryGetPayload<T>>>

    /**
     * Create a LastTelemetry.
     * @param {LastTelemetryCreateArgs} args - Arguments to create a LastTelemetry.
     * @example
     * // Create one LastTelemetry
     * const LastTelemetry = await prisma.lastTelemetry.create({
     *   data: {
     *     // ... data to create a LastTelemetry
     *   }
     * })
     * 
    **/
    create<T extends LastTelemetryCreateArgs>(
      args: SelectSubset<T, LastTelemetryCreateArgs>
    ): Prisma__LastTelemetryClient<LastTelemetryGetPayload<T>>

    /**
     * Create many LastTelemetries.
     *     @param {LastTelemetryCreateManyArgs} args - Arguments to create many LastTelemetries.
     *     @example
     *     // Create many LastTelemetries
     *     const lastTelemetry = await prisma.lastTelemetry.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LastTelemetryCreateManyArgs>(
      args?: SelectSubset<T, LastTelemetryCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LastTelemetry.
     * @param {LastTelemetryDeleteArgs} args - Arguments to delete one LastTelemetry.
     * @example
     * // Delete one LastTelemetry
     * const LastTelemetry = await prisma.lastTelemetry.delete({
     *   where: {
     *     // ... filter to delete one LastTelemetry
     *   }
     * })
     * 
    **/
    delete<T extends LastTelemetryDeleteArgs>(
      args: SelectSubset<T, LastTelemetryDeleteArgs>
    ): Prisma__LastTelemetryClient<LastTelemetryGetPayload<T>>

    /**
     * Update one LastTelemetry.
     * @param {LastTelemetryUpdateArgs} args - Arguments to update one LastTelemetry.
     * @example
     * // Update one LastTelemetry
     * const lastTelemetry = await prisma.lastTelemetry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LastTelemetryUpdateArgs>(
      args: SelectSubset<T, LastTelemetryUpdateArgs>
    ): Prisma__LastTelemetryClient<LastTelemetryGetPayload<T>>

    /**
     * Delete zero or more LastTelemetries.
     * @param {LastTelemetryDeleteManyArgs} args - Arguments to filter LastTelemetries to delete.
     * @example
     * // Delete a few LastTelemetries
     * const { count } = await prisma.lastTelemetry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LastTelemetryDeleteManyArgs>(
      args?: SelectSubset<T, LastTelemetryDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LastTelemetries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastTelemetryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LastTelemetries
     * const lastTelemetry = await prisma.lastTelemetry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LastTelemetryUpdateManyArgs>(
      args: SelectSubset<T, LastTelemetryUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LastTelemetry.
     * @param {LastTelemetryUpsertArgs} args - Arguments to update or create a LastTelemetry.
     * @example
     * // Update or create a LastTelemetry
     * const lastTelemetry = await prisma.lastTelemetry.upsert({
     *   create: {
     *     // ... data to create a LastTelemetry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LastTelemetry we want to update
     *   }
     * })
    **/
    upsert<T extends LastTelemetryUpsertArgs>(
      args: SelectSubset<T, LastTelemetryUpsertArgs>
    ): Prisma__LastTelemetryClient<LastTelemetryGetPayload<T>>

    /**
     * Count the number of LastTelemetries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastTelemetryCountArgs} args - Arguments to filter LastTelemetries to count.
     * @example
     * // Count the number of LastTelemetries
     * const count = await prisma.lastTelemetry.count({
     *   where: {
     *     // ... the filter for the LastTelemetries we want to count
     *   }
     * })
    **/
    count<T extends LastTelemetryCountArgs>(
      args?: Subset<T, LastTelemetryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LastTelemetryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LastTelemetry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastTelemetryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LastTelemetryAggregateArgs>(args: Subset<T, LastTelemetryAggregateArgs>): Prisma.PrismaPromise<GetLastTelemetryAggregateType<T>>

    /**
     * Group by LastTelemetry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastTelemetryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LastTelemetryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LastTelemetryGroupByArgs['orderBy'] }
        : { orderBy?: LastTelemetryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LastTelemetryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLastTelemetryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for LastTelemetry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LastTelemetryClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    device<T extends DeviceArgs= {}>(args?: Subset<T, DeviceArgs>): Prisma__DeviceClient<DeviceGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * LastTelemetry base type for findUnique actions
   */
  export type LastTelemetryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
    /**
     * Filter, which LastTelemetry to fetch.
     */
    where: LastTelemetryWhereUniqueInput
  }

  /**
   * LastTelemetry findUnique
   */
  export interface LastTelemetryFindUniqueArgs extends LastTelemetryFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LastTelemetry findUniqueOrThrow
   */
  export type LastTelemetryFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
    /**
     * Filter, which LastTelemetry to fetch.
     */
    where: LastTelemetryWhereUniqueInput
  }


  /**
   * LastTelemetry base type for findFirst actions
   */
  export type LastTelemetryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
    /**
     * Filter, which LastTelemetry to fetch.
     */
    where?: LastTelemetryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LastTelemetries to fetch.
     */
    orderBy?: Enumerable<LastTelemetryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LastTelemetries.
     */
    cursor?: LastTelemetryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LastTelemetries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LastTelemetries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LastTelemetries.
     */
    distinct?: Enumerable<LastTelemetryScalarFieldEnum>
  }

  /**
   * LastTelemetry findFirst
   */
  export interface LastTelemetryFindFirstArgs extends LastTelemetryFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LastTelemetry findFirstOrThrow
   */
  export type LastTelemetryFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
    /**
     * Filter, which LastTelemetry to fetch.
     */
    where?: LastTelemetryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LastTelemetries to fetch.
     */
    orderBy?: Enumerable<LastTelemetryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LastTelemetries.
     */
    cursor?: LastTelemetryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LastTelemetries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LastTelemetries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LastTelemetries.
     */
    distinct?: Enumerable<LastTelemetryScalarFieldEnum>
  }


  /**
   * LastTelemetry findMany
   */
  export type LastTelemetryFindManyArgs = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
    /**
     * Filter, which LastTelemetries to fetch.
     */
    where?: LastTelemetryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LastTelemetries to fetch.
     */
    orderBy?: Enumerable<LastTelemetryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LastTelemetries.
     */
    cursor?: LastTelemetryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LastTelemetries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LastTelemetries.
     */
    skip?: number
    distinct?: Enumerable<LastTelemetryScalarFieldEnum>
  }


  /**
   * LastTelemetry create
   */
  export type LastTelemetryCreateArgs = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
    /**
     * The data needed to create a LastTelemetry.
     */
    data: XOR<LastTelemetryCreateInput, LastTelemetryUncheckedCreateInput>
  }


  /**
   * LastTelemetry createMany
   */
  export type LastTelemetryCreateManyArgs = {
    /**
     * The data used to create many LastTelemetries.
     */
    data: Enumerable<LastTelemetryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * LastTelemetry update
   */
  export type LastTelemetryUpdateArgs = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
    /**
     * The data needed to update a LastTelemetry.
     */
    data: XOR<LastTelemetryUpdateInput, LastTelemetryUncheckedUpdateInput>
    /**
     * Choose, which LastTelemetry to update.
     */
    where: LastTelemetryWhereUniqueInput
  }


  /**
   * LastTelemetry updateMany
   */
  export type LastTelemetryUpdateManyArgs = {
    /**
     * The data used to update LastTelemetries.
     */
    data: XOR<LastTelemetryUpdateManyMutationInput, LastTelemetryUncheckedUpdateManyInput>
    /**
     * Filter which LastTelemetries to update
     */
    where?: LastTelemetryWhereInput
  }


  /**
   * LastTelemetry upsert
   */
  export type LastTelemetryUpsertArgs = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
    /**
     * The filter to search for the LastTelemetry to update in case it exists.
     */
    where: LastTelemetryWhereUniqueInput
    /**
     * In case the LastTelemetry found by the `where` argument doesn't exist, create a new LastTelemetry with this data.
     */
    create: XOR<LastTelemetryCreateInput, LastTelemetryUncheckedCreateInput>
    /**
     * In case the LastTelemetry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LastTelemetryUpdateInput, LastTelemetryUncheckedUpdateInput>
  }


  /**
   * LastTelemetry delete
   */
  export type LastTelemetryDeleteArgs = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
    /**
     * Filter which LastTelemetry to delete.
     */
    where: LastTelemetryWhereUniqueInput
  }


  /**
   * LastTelemetry deleteMany
   */
  export type LastTelemetryDeleteManyArgs = {
    /**
     * Filter which LastTelemetries to delete
     */
    where?: LastTelemetryWhereInput
  }


  /**
   * LastTelemetry without action
   */
  export type LastTelemetryArgs = {
    /**
     * Select specific fields to fetch from the LastTelemetry
     */
    select?: LastTelemetrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LastTelemetryInclude | null
  }



  /**
   * Model Report
   */


  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    id: number | null
    tenantId: number | null
  }

  export type ReportSumAggregateOutputType = {
    id: number | null
    tenantId: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: number | null
    name: string | null
    tenantId: number | null
    query: string | null
    type: string | null
    format: string | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: number | null
    name: string | null
    tenantId: number | null
    query: string | null
    type: string | null
    format: string | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    name: number
    tenantId: number
    query: number
    type: number
    format: number
    url: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    id?: true
    tenantId?: true
  }

  export type ReportSumAggregateInputType = {
    id?: true
    tenantId?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    name?: true
    tenantId?: true
    query?: true
    type?: true
    format?: true
    url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    name?: true
    tenantId?: true
    query?: true
    type?: true
    format?: true
    url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    name?: true
    tenantId?: true
    query?: true
    type?: true
    format?: true
    url?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs = {
    where?: ReportWhereInput
    orderBy?: Enumerable<ReportOrderByWithAggregationInput>
    by: ReportScalarFieldEnum[]
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }


  export type ReportGroupByOutputType = {
    id: number
    name: string
    tenantId: number
    query: string
    type: string
    format: string
    url: string
    createdAt: Date
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect = {
    id?: boolean
    name?: boolean
    tenantId?: boolean
    query?: boolean
    type?: boolean
    format?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type ReportGetPayload<S extends boolean | null | undefined | ReportArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Report :
    S extends undefined ? never :
    S extends { include: any } & (ReportArgs | ReportFindManyArgs)
    ? Report 
    : S extends { select: any } & (ReportArgs | ReportFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Report ? Report[P] : never
  } 
      : Report


  type ReportCountArgs = 
    Omit<ReportFindManyArgs, 'select' | 'include'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReportFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ReportFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Report'> extends True ? Prisma__ReportClient<ReportGetPayload<T>> : Prisma__ReportClient<ReportGetPayload<T> | null, null>

    /**
     * Find one Report that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ReportFindUniqueOrThrowArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReportFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ReportFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Report'> extends True ? Prisma__ReportClient<ReportGetPayload<T>> : Prisma__ReportClient<ReportGetPayload<T> | null, null>

    /**
     * Find the first Report that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ReportFindFirstOrThrowArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReportFindManyArgs>(
      args?: SelectSubset<T, ReportFindManyArgs>
    ): Prisma.PrismaPromise<Array<ReportGetPayload<T>>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
    **/
    create<T extends ReportCreateArgs>(
      args: SelectSubset<T, ReportCreateArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Create many Reports.
     *     @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     *     @example
     *     // Create many Reports
     *     const report = await prisma.report.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReportCreateManyArgs>(
      args?: SelectSubset<T, ReportCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
    **/
    delete<T extends ReportDeleteArgs>(
      args: SelectSubset<T, ReportDeleteArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReportUpdateArgs>(
      args: SelectSubset<T, ReportUpdateArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReportDeleteManyArgs>(
      args?: SelectSubset<T, ReportDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReportUpdateManyArgs>(
      args: SelectSubset<T, ReportUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
    **/
    upsert<T extends ReportUpsertArgs>(
      args: SelectSubset<T, ReportUpsertArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ReportClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Report base type for findUnique actions
   */
  export type ReportFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUnique
   */
  export interface ReportFindUniqueArgs extends ReportFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report base type for findFirst actions
   */
  export type ReportFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: Enumerable<ReportScalarFieldEnum>
  }

  /**
   * Report findFirst
   */
  export interface ReportFindFirstArgs extends ReportFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * Report findMany
   */
  export type ReportFindManyArgs = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * Report create
   */
  export type ReportCreateArgs = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }


  /**
   * Report createMany
   */
  export type ReportCreateManyArgs = {
    /**
     * The data used to create many Reports.
     */
    data: Enumerable<ReportCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Report update
   */
  export type ReportUpdateArgs = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
  }


  /**
   * Report upsert
   */
  export type ReportUpsertArgs = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }


  /**
   * Report delete
   */
  export type ReportDeleteArgs = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
  }


  /**
   * Report without action
   */
  export type ReportArgs = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect | null
  }



  /**
   * Model History
   */


  export type AggregateHistory = {
    _count: HistoryCountAggregateOutputType | null
    _avg: HistoryAvgAggregateOutputType | null
    _sum: HistorySumAggregateOutputType | null
    _min: HistoryMinAggregateOutputType | null
    _max: HistoryMaxAggregateOutputType | null
  }

  export type HistoryAvgAggregateOutputType = {
    id: number | null
    deviceId: number | null
  }

  export type HistorySumAggregateOutputType = {
    id: number | null
    deviceId: number | null
  }

  export type HistoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deviceId: number | null
  }

  export type HistoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deviceId: number | null
  }

  export type HistoryCountAggregateOutputType = {
    id: number
    name: number
    value: number
    createdAt: number
    updatedAt: number
    deviceId: number
    _all: number
  }


  export type HistoryAvgAggregateInputType = {
    id?: true
    deviceId?: true
  }

  export type HistorySumAggregateInputType = {
    id?: true
    deviceId?: true
  }

  export type HistoryMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    deviceId?: true
  }

  export type HistoryMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    deviceId?: true
  }

  export type HistoryCountAggregateInputType = {
    id?: true
    name?: true
    value?: true
    createdAt?: true
    updatedAt?: true
    deviceId?: true
    _all?: true
  }

  export type HistoryAggregateArgs = {
    /**
     * Filter which History to aggregate.
     */
    where?: HistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Histories to fetch.
     */
    orderBy?: Enumerable<HistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Histories
    **/
    _count?: true | HistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HistoryMaxAggregateInputType
  }

  export type GetHistoryAggregateType<T extends HistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHistory[P]>
      : GetScalarType<T[P], AggregateHistory[P]>
  }




  export type HistoryGroupByArgs = {
    where?: HistoryWhereInput
    orderBy?: Enumerable<HistoryOrderByWithAggregationInput>
    by: HistoryScalarFieldEnum[]
    having?: HistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HistoryCountAggregateInputType | true
    _avg?: HistoryAvgAggregateInputType
    _sum?: HistorySumAggregateInputType
    _min?: HistoryMinAggregateInputType
    _max?: HistoryMaxAggregateInputType
  }


  export type HistoryGroupByOutputType = {
    id: number
    name: string
    value: JsonValue
    createdAt: Date
    updatedAt: Date
    deviceId: number
    _count: HistoryCountAggregateOutputType | null
    _avg: HistoryAvgAggregateOutputType | null
    _sum: HistorySumAggregateOutputType | null
    _min: HistoryMinAggregateOutputType | null
    _max: HistoryMaxAggregateOutputType | null
  }

  type GetHistoryGroupByPayload<T extends HistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<HistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HistoryGroupByOutputType[P]>
            : GetScalarType<T[P], HistoryGroupByOutputType[P]>
        }
      >
    >


  export type HistorySelect = {
    id?: boolean
    name?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deviceId?: boolean
    device?: boolean | DeviceArgs
  }


  export type HistoryInclude = {
    device?: boolean | DeviceArgs
  }

  export type HistoryGetPayload<S extends boolean | null | undefined | HistoryArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? History :
    S extends undefined ? never :
    S extends { include: any } & (HistoryArgs | HistoryFindManyArgs)
    ? History  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'device' ? DeviceGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (HistoryArgs | HistoryFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'device' ? DeviceGetPayload<S['select'][P]> :  P extends keyof History ? History[P] : never
  } 
      : History


  type HistoryCountArgs = 
    Omit<HistoryFindManyArgs, 'select' | 'include'> & {
      select?: HistoryCountAggregateInputType | true
    }

  export interface HistoryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one History that matches the filter.
     * @param {HistoryFindUniqueArgs} args - Arguments to find a History
     * @example
     * // Get one History
     * const history = await prisma.history.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends HistoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, HistoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'History'> extends True ? Prisma__HistoryClient<HistoryGetPayload<T>> : Prisma__HistoryClient<HistoryGetPayload<T> | null, null>

    /**
     * Find one History that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {HistoryFindUniqueOrThrowArgs} args - Arguments to find a History
     * @example
     * // Get one History
     * const history = await prisma.history.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends HistoryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, HistoryFindUniqueOrThrowArgs>
    ): Prisma__HistoryClient<HistoryGetPayload<T>>

    /**
     * Find the first History that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoryFindFirstArgs} args - Arguments to find a History
     * @example
     * // Get one History
     * const history = await prisma.history.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends HistoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, HistoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'History'> extends True ? Prisma__HistoryClient<HistoryGetPayload<T>> : Prisma__HistoryClient<HistoryGetPayload<T> | null, null>

    /**
     * Find the first History that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoryFindFirstOrThrowArgs} args - Arguments to find a History
     * @example
     * // Get one History
     * const history = await prisma.history.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends HistoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, HistoryFindFirstOrThrowArgs>
    ): Prisma__HistoryClient<HistoryGetPayload<T>>

    /**
     * Find zero or more Histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Histories
     * const histories = await prisma.history.findMany()
     * 
     * // Get first 10 Histories
     * const histories = await prisma.history.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const historyWithIdOnly = await prisma.history.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends HistoryFindManyArgs>(
      args?: SelectSubset<T, HistoryFindManyArgs>
    ): Prisma.PrismaPromise<Array<HistoryGetPayload<T>>>

    /**
     * Create a History.
     * @param {HistoryCreateArgs} args - Arguments to create a History.
     * @example
     * // Create one History
     * const History = await prisma.history.create({
     *   data: {
     *     // ... data to create a History
     *   }
     * })
     * 
    **/
    create<T extends HistoryCreateArgs>(
      args: SelectSubset<T, HistoryCreateArgs>
    ): Prisma__HistoryClient<HistoryGetPayload<T>>

    /**
     * Create many Histories.
     *     @param {HistoryCreateManyArgs} args - Arguments to create many Histories.
     *     @example
     *     // Create many Histories
     *     const history = await prisma.history.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends HistoryCreateManyArgs>(
      args?: SelectSubset<T, HistoryCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a History.
     * @param {HistoryDeleteArgs} args - Arguments to delete one History.
     * @example
     * // Delete one History
     * const History = await prisma.history.delete({
     *   where: {
     *     // ... filter to delete one History
     *   }
     * })
     * 
    **/
    delete<T extends HistoryDeleteArgs>(
      args: SelectSubset<T, HistoryDeleteArgs>
    ): Prisma__HistoryClient<HistoryGetPayload<T>>

    /**
     * Update one History.
     * @param {HistoryUpdateArgs} args - Arguments to update one History.
     * @example
     * // Update one History
     * const history = await prisma.history.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends HistoryUpdateArgs>(
      args: SelectSubset<T, HistoryUpdateArgs>
    ): Prisma__HistoryClient<HistoryGetPayload<T>>

    /**
     * Delete zero or more Histories.
     * @param {HistoryDeleteManyArgs} args - Arguments to filter Histories to delete.
     * @example
     * // Delete a few Histories
     * const { count } = await prisma.history.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends HistoryDeleteManyArgs>(
      args?: SelectSubset<T, HistoryDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Histories
     * const history = await prisma.history.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends HistoryUpdateManyArgs>(
      args: SelectSubset<T, HistoryUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one History.
     * @param {HistoryUpsertArgs} args - Arguments to update or create a History.
     * @example
     * // Update or create a History
     * const history = await prisma.history.upsert({
     *   create: {
     *     // ... data to create a History
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the History we want to update
     *   }
     * })
    **/
    upsert<T extends HistoryUpsertArgs>(
      args: SelectSubset<T, HistoryUpsertArgs>
    ): Prisma__HistoryClient<HistoryGetPayload<T>>

    /**
     * Count the number of Histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoryCountArgs} args - Arguments to filter Histories to count.
     * @example
     * // Count the number of Histories
     * const count = await prisma.history.count({
     *   where: {
     *     // ... the filter for the Histories we want to count
     *   }
     * })
    **/
    count<T extends HistoryCountArgs>(
      args?: Subset<T, HistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a History.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HistoryAggregateArgs>(args: Subset<T, HistoryAggregateArgs>): Prisma.PrismaPromise<GetHistoryAggregateType<T>>

    /**
     * Group by History.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HistoryGroupByArgs['orderBy'] }
        : { orderBy?: HistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for History.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__HistoryClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    device<T extends DeviceArgs= {}>(args?: Subset<T, DeviceArgs>): Prisma__DeviceClient<DeviceGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * History base type for findUnique actions
   */
  export type HistoryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
    /**
     * Filter, which History to fetch.
     */
    where: HistoryWhereUniqueInput
  }

  /**
   * History findUnique
   */
  export interface HistoryFindUniqueArgs extends HistoryFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * History findUniqueOrThrow
   */
  export type HistoryFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
    /**
     * Filter, which History to fetch.
     */
    where: HistoryWhereUniqueInput
  }


  /**
   * History base type for findFirst actions
   */
  export type HistoryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
    /**
     * Filter, which History to fetch.
     */
    where?: HistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Histories to fetch.
     */
    orderBy?: Enumerable<HistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Histories.
     */
    cursor?: HistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Histories.
     */
    distinct?: Enumerable<HistoryScalarFieldEnum>
  }

  /**
   * History findFirst
   */
  export interface HistoryFindFirstArgs extends HistoryFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * History findFirstOrThrow
   */
  export type HistoryFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
    /**
     * Filter, which History to fetch.
     */
    where?: HistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Histories to fetch.
     */
    orderBy?: Enumerable<HistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Histories.
     */
    cursor?: HistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Histories.
     */
    distinct?: Enumerable<HistoryScalarFieldEnum>
  }


  /**
   * History findMany
   */
  export type HistoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
    /**
     * Filter, which Histories to fetch.
     */
    where?: HistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Histories to fetch.
     */
    orderBy?: Enumerable<HistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Histories.
     */
    cursor?: HistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Histories.
     */
    skip?: number
    distinct?: Enumerable<HistoryScalarFieldEnum>
  }


  /**
   * History create
   */
  export type HistoryCreateArgs = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
    /**
     * The data needed to create a History.
     */
    data: XOR<HistoryCreateInput, HistoryUncheckedCreateInput>
  }


  /**
   * History createMany
   */
  export type HistoryCreateManyArgs = {
    /**
     * The data used to create many Histories.
     */
    data: Enumerable<HistoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * History update
   */
  export type HistoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
    /**
     * The data needed to update a History.
     */
    data: XOR<HistoryUpdateInput, HistoryUncheckedUpdateInput>
    /**
     * Choose, which History to update.
     */
    where: HistoryWhereUniqueInput
  }


  /**
   * History updateMany
   */
  export type HistoryUpdateManyArgs = {
    /**
     * The data used to update Histories.
     */
    data: XOR<HistoryUpdateManyMutationInput, HistoryUncheckedUpdateManyInput>
    /**
     * Filter which Histories to update
     */
    where?: HistoryWhereInput
  }


  /**
   * History upsert
   */
  export type HistoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
    /**
     * The filter to search for the History to update in case it exists.
     */
    where: HistoryWhereUniqueInput
    /**
     * In case the History found by the `where` argument doesn't exist, create a new History with this data.
     */
    create: XOR<HistoryCreateInput, HistoryUncheckedCreateInput>
    /**
     * In case the History was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HistoryUpdateInput, HistoryUncheckedUpdateInput>
  }


  /**
   * History delete
   */
  export type HistoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
    /**
     * Filter which History to delete.
     */
    where: HistoryWhereUniqueInput
  }


  /**
   * History deleteMany
   */
  export type HistoryDeleteManyArgs = {
    /**
     * Filter which Histories to delete
     */
    where?: HistoryWhereInput
  }


  /**
   * History without action
   */
  export type HistoryArgs = {
    /**
     * Select specific fields to fetch from the History
     */
    select?: HistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: HistoryInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AlertScalarFieldEnum: {
    id: 'id',
    deviceId: 'deviceId',
    type: 'type',
    message: 'message',
    level: 'level',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    attributes: 'attributes',
    acknowledgedBy: 'acknowledgedBy'
  };

  export type AlertScalarFieldEnum = (typeof AlertScalarFieldEnum)[keyof typeof AlertScalarFieldEnum]


  export const AttributeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    value: 'value',
    deviceId: 'deviceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AttributeScalarFieldEnum = (typeof AttributeScalarFieldEnum)[keyof typeof AttributeScalarFieldEnum]


  export const CredentialScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    token: 'token',
    certificate: 'certificate',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CredentialScalarFieldEnum = (typeof CredentialScalarFieldEnum)[keyof typeof CredentialScalarFieldEnum]


  export const DecoderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    fnc: 'fnc',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tenantId: 'tenantId'
  };

  export type DecoderScalarFieldEnum = (typeof DecoderScalarFieldEnum)[keyof typeof DecoderScalarFieldEnum]


  export const DeviceProfileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    logo: 'logo',
    cridentialsType: 'cridentialsType',
    deviceTypeId: 'deviceTypeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    protocolId: 'protocolId',
    decoderId: 'decoderId',
    attributes: 'attributes',
    tenantId: 'tenantId'
  };

  export type DeviceProfileScalarFieldEnum = (typeof DeviceProfileScalarFieldEnum)[keyof typeof DeviceProfileScalarFieldEnum]


  export const DeviceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    serial: 'serial',
    isPassive: 'isPassive',
    isOnline: 'isOnline',
    isdecoded: 'isdecoded',
    credentialId: 'credentialId',
    configuration: 'configuration',
    deviceProfileId: 'deviceProfileId',
    firmwareId: 'firmwareId',
    ip: 'ip',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    virtualDeviceId: 'virtualDeviceId',
    groupId: 'groupId',
    tenantId: 'tenantId'
  };

  export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum]


  export const DeviceTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tenantId: 'tenantId'
  };

  export type DeviceTypeScalarFieldEnum = (typeof DeviceTypeScalarFieldEnum)[keyof typeof DeviceTypeScalarFieldEnum]


  export const FirmwareScalarFieldEnum: {
    id: 'id',
    name: 'name',
    version: 'version',
    description: 'description',
    url: 'url',
    size: 'size',
    hash: 'hash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tenantId: 'tenantId'
  };

  export type FirmwareScalarFieldEnum = (typeof FirmwareScalarFieldEnum)[keyof typeof FirmwareScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    parentId: 'parentId',
    location: 'location',
    lat: 'lat',
    lng: 'lng',
    ip: 'ip',
    attributes: 'attributes',
    tenantId: 'tenantId'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const HistoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    value: 'value',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deviceId: 'deviceId'
  };

  export type HistoryScalarFieldEnum = (typeof HistoryScalarFieldEnum)[keyof typeof HistoryScalarFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const LastTelemetryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    value: 'value',
    alias: 'alias',
    icon: 'icon',
    color: 'color',
    show: 'show',
    deviceId: 'deviceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LastTelemetryScalarFieldEnum = (typeof LastTelemetryScalarFieldEnum)[keyof typeof LastTelemetryScalarFieldEnum]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const ProtocolScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tenantId: 'tenantId'
  };

  export type ProtocolScalarFieldEnum = (typeof ProtocolScalarFieldEnum)[keyof typeof ProtocolScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const ReportScalarFieldEnum: {
    id: 'id',
    name: 'name',
    tenantId: 'tenantId',
    query: 'query',
    type: 'type',
    format: 'format',
    url: 'url',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const VirtualDeviceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tenantId: 'tenantId'
  };

  export type VirtualDeviceScalarFieldEnum = (typeof VirtualDeviceScalarFieldEnum)[keyof typeof VirtualDeviceScalarFieldEnum]


  export const VmqAuthAclScalarFieldEnum: {
    id: 'id',
    mountpoint: 'mountpoint',
    username: 'username',
    clientId: 'clientId',
    password: 'password',
    publishAcl: 'publishAcl',
    subscribeAcl: 'subscribeAcl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VmqAuthAclScalarFieldEnum = (typeof VmqAuthAclScalarFieldEnum)[keyof typeof VmqAuthAclScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type VirtualDeviceWhereInput = {
    AND?: Enumerable<VirtualDeviceWhereInput>
    OR?: Enumerable<VirtualDeviceWhereInput>
    NOT?: Enumerable<VirtualDeviceWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    tenantId?: IntNullableFilter | number | null
    devices?: DeviceListRelationFilter
  }

  export type VirtualDeviceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    devices?: DeviceOrderByRelationAggregateInput
  }

  export type VirtualDeviceWhereUniqueInput = {
    id?: number
  }

  export type VirtualDeviceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    _count?: VirtualDeviceCountOrderByAggregateInput
    _avg?: VirtualDeviceAvgOrderByAggregateInput
    _max?: VirtualDeviceMaxOrderByAggregateInput
    _min?: VirtualDeviceMinOrderByAggregateInput
    _sum?: VirtualDeviceSumOrderByAggregateInput
  }

  export type VirtualDeviceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<VirtualDeviceScalarWhereWithAggregatesInput>
    OR?: Enumerable<VirtualDeviceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<VirtualDeviceScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    tenantId?: IntNullableWithAggregatesFilter | number | null
  }

  export type GroupWhereInput = {
    AND?: Enumerable<GroupWhereInput>
    OR?: Enumerable<GroupWhereInput>
    NOT?: Enumerable<GroupWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    type?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    parentId?: IntNullableFilter | number | null
    location?: StringNullableFilter | string | null
    lat?: FloatNullableFilter | number | null
    lng?: FloatNullableFilter | number | null
    ip?: StringNullableFilter | string | null
    attributes?: JsonNullableFilter
    tenantId?: IntNullableFilter | number | null
    parent?: XOR<GroupRelationFilter, GroupWhereInput> | null
    subgroups?: GroupListRelationFilter
    devices?: DeviceListRelationFilter
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentId?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    ip?: SortOrder
    attributes?: SortOrder
    tenantId?: SortOrder
    parent?: GroupOrderByWithRelationInput
    subgroups?: GroupOrderByRelationAggregateInput
    devices?: DeviceOrderByRelationAggregateInput
  }

  export type GroupWhereUniqueInput = {
    id?: number
    name_tenantId_parentId?: GroupNameTenantIdParentIdCompoundUniqueInput
  }

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentId?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    ip?: SortOrder
    attributes?: SortOrder
    tenantId?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _avg?: GroupAvgOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
    _sum?: GroupSumOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: Enumerable<GroupScalarWhereWithAggregatesInput>
    OR?: Enumerable<GroupScalarWhereWithAggregatesInput>
    NOT?: Enumerable<GroupScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    type?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    parentId?: IntNullableWithAggregatesFilter | number | null
    location?: StringNullableWithAggregatesFilter | string | null
    lat?: FloatNullableWithAggregatesFilter | number | null
    lng?: FloatNullableWithAggregatesFilter | number | null
    ip?: StringNullableWithAggregatesFilter | string | null
    attributes?: JsonNullableWithAggregatesFilter
    tenantId?: IntNullableWithAggregatesFilter | number | null
  }

  export type AlertWhereInput = {
    AND?: Enumerable<AlertWhereInput>
    OR?: Enumerable<AlertWhereInput>
    NOT?: Enumerable<AlertWhereInput>
    id?: IntFilter | number
    deviceId?: IntFilter | number
    type?: StringNullableFilter | string | null
    message?: StringNullableFilter | string | null
    level?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    attributes?: JsonFilter
    acknowledgedBy?: IntNullableFilter | number | null
    device?: XOR<DeviceRelationFilter, DeviceWhereInput>
  }

  export type AlertOrderByWithRelationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attributes?: SortOrder
    acknowledgedBy?: SortOrder
    device?: DeviceOrderByWithRelationInput
  }

  export type AlertWhereUniqueInput = {
    id?: number
  }

  export type AlertOrderByWithAggregationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attributes?: SortOrder
    acknowledgedBy?: SortOrder
    _count?: AlertCountOrderByAggregateInput
    _avg?: AlertAvgOrderByAggregateInput
    _max?: AlertMaxOrderByAggregateInput
    _min?: AlertMinOrderByAggregateInput
    _sum?: AlertSumOrderByAggregateInput
  }

  export type AlertScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AlertScalarWhereWithAggregatesInput>
    OR?: Enumerable<AlertScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AlertScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    deviceId?: IntWithAggregatesFilter | number
    type?: StringNullableWithAggregatesFilter | string | null
    message?: StringNullableWithAggregatesFilter | string | null
    level?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    attributes?: JsonWithAggregatesFilter
    acknowledgedBy?: IntNullableWithAggregatesFilter | number | null
  }

  export type DecoderWhereInput = {
    AND?: Enumerable<DecoderWhereInput>
    OR?: Enumerable<DecoderWhereInput>
    NOT?: Enumerable<DecoderWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    description?: StringFilter | string
    fnc?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    tenantId?: IntNullableFilter | number | null
    deviceProfile?: DeviceProfileListRelationFilter
  }

  export type DecoderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    fnc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    deviceProfile?: DeviceProfileOrderByRelationAggregateInput
  }

  export type DecoderWhereUniqueInput = {
    id?: number
    name_tenantId?: DecoderNameTenantIdCompoundUniqueInput
  }

  export type DecoderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    fnc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    _count?: DecoderCountOrderByAggregateInput
    _avg?: DecoderAvgOrderByAggregateInput
    _max?: DecoderMaxOrderByAggregateInput
    _min?: DecoderMinOrderByAggregateInput
    _sum?: DecoderSumOrderByAggregateInput
  }

  export type DecoderScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DecoderScalarWhereWithAggregatesInput>
    OR?: Enumerable<DecoderScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DecoderScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    fnc?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    tenantId?: IntNullableWithAggregatesFilter | number | null
  }

  export type DeviceTypeWhereInput = {
    AND?: Enumerable<DeviceTypeWhereInput>
    OR?: Enumerable<DeviceTypeWhereInput>
    NOT?: Enumerable<DeviceTypeWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    tenantId?: IntNullableFilter | number | null
    deviceProfiles?: DeviceProfileListRelationFilter
  }

  export type DeviceTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    deviceProfiles?: DeviceProfileOrderByRelationAggregateInput
  }

  export type DeviceTypeWhereUniqueInput = {
    id?: number
    name_tenantId?: DeviceTypeNameTenantIdCompoundUniqueInput
  }

  export type DeviceTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    _count?: DeviceTypeCountOrderByAggregateInput
    _avg?: DeviceTypeAvgOrderByAggregateInput
    _max?: DeviceTypeMaxOrderByAggregateInput
    _min?: DeviceTypeMinOrderByAggregateInput
    _sum?: DeviceTypeSumOrderByAggregateInput
  }

  export type DeviceTypeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DeviceTypeScalarWhereWithAggregatesInput>
    OR?: Enumerable<DeviceTypeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DeviceTypeScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    tenantId?: IntNullableWithAggregatesFilter | number | null
  }

  export type FirmwareWhereInput = {
    AND?: Enumerable<FirmwareWhereInput>
    OR?: Enumerable<FirmwareWhereInput>
    NOT?: Enumerable<FirmwareWhereInput>
    id?: IntFilter | number
    name?: StringNullableFilter | string | null
    version?: StringNullableFilter | string | null
    description?: StringNullableFilter | string | null
    url?: StringNullableFilter | string | null
    size?: IntNullableFilter | number | null
    hash?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    tenantId?: IntNullableFilter | number | null
    device?: DeviceListRelationFilter
  }

  export type FirmwareOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    url?: SortOrder
    size?: SortOrder
    hash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    device?: DeviceOrderByRelationAggregateInput
  }

  export type FirmwareWhereUniqueInput = {
    id?: number
    url?: string
    name_version_tenantId?: FirmwareNameVersionTenantIdCompoundUniqueInput
  }

  export type FirmwareOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    url?: SortOrder
    size?: SortOrder
    hash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    _count?: FirmwareCountOrderByAggregateInput
    _avg?: FirmwareAvgOrderByAggregateInput
    _max?: FirmwareMaxOrderByAggregateInput
    _min?: FirmwareMinOrderByAggregateInput
    _sum?: FirmwareSumOrderByAggregateInput
  }

  export type FirmwareScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FirmwareScalarWhereWithAggregatesInput>
    OR?: Enumerable<FirmwareScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FirmwareScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringNullableWithAggregatesFilter | string | null
    version?: StringNullableWithAggregatesFilter | string | null
    description?: StringNullableWithAggregatesFilter | string | null
    url?: StringNullableWithAggregatesFilter | string | null
    size?: IntNullableWithAggregatesFilter | number | null
    hash?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    tenantId?: IntNullableWithAggregatesFilter | number | null
  }

  export type ProtocolWhereInput = {
    AND?: Enumerable<ProtocolWhereInput>
    OR?: Enumerable<ProtocolWhereInput>
    NOT?: Enumerable<ProtocolWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    tenantId?: IntNullableFilter | number | null
    deviceProfiles?: DeviceProfileListRelationFilter
  }

  export type ProtocolOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    deviceProfiles?: DeviceProfileOrderByRelationAggregateInput
  }

  export type ProtocolWhereUniqueInput = {
    id?: number
    name_tenantId?: ProtocolNameTenantIdCompoundUniqueInput
  }

  export type ProtocolOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    _count?: ProtocolCountOrderByAggregateInput
    _avg?: ProtocolAvgOrderByAggregateInput
    _max?: ProtocolMaxOrderByAggregateInput
    _min?: ProtocolMinOrderByAggregateInput
    _sum?: ProtocolSumOrderByAggregateInput
  }

  export type ProtocolScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProtocolScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProtocolScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProtocolScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    tenantId?: IntNullableWithAggregatesFilter | number | null
  }

  export type DeviceProfileWhereInput = {
    AND?: Enumerable<DeviceProfileWhereInput>
    OR?: Enumerable<DeviceProfileWhereInput>
    NOT?: Enumerable<DeviceProfileWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    description?: StringNullableFilter | string | null
    logo?: StringNullableFilter | string | null
    cridentialsType?: EnumTypeCredentialNullableFilter | TypeCredential | null
    deviceTypeId?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    protocolId?: IntNullableFilter | number | null
    decoderId?: IntNullableFilter | number | null
    attributes?: JsonNullableFilter
    tenantId?: IntNullableFilter | number | null
    deviceType?: XOR<DeviceTypeRelationFilter, DeviceTypeWhereInput> | null
    devices?: DeviceListRelationFilter
    protocol?: XOR<ProtocolRelationFilter, ProtocolWhereInput> | null
    decoder?: XOR<DecoderRelationFilter, DecoderWhereInput> | null
  }

  export type DeviceProfileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    cridentialsType?: SortOrder
    deviceTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    protocolId?: SortOrder
    decoderId?: SortOrder
    attributes?: SortOrder
    tenantId?: SortOrder
    deviceType?: DeviceTypeOrderByWithRelationInput
    devices?: DeviceOrderByRelationAggregateInput
    protocol?: ProtocolOrderByWithRelationInput
    decoder?: DecoderOrderByWithRelationInput
  }

  export type DeviceProfileWhereUniqueInput = {
    id?: number
    name_tenantId?: DeviceProfileNameTenantIdCompoundUniqueInput
  }

  export type DeviceProfileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    cridentialsType?: SortOrder
    deviceTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    protocolId?: SortOrder
    decoderId?: SortOrder
    attributes?: SortOrder
    tenantId?: SortOrder
    _count?: DeviceProfileCountOrderByAggregateInput
    _avg?: DeviceProfileAvgOrderByAggregateInput
    _max?: DeviceProfileMaxOrderByAggregateInput
    _min?: DeviceProfileMinOrderByAggregateInput
    _sum?: DeviceProfileSumOrderByAggregateInput
  }

  export type DeviceProfileScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DeviceProfileScalarWhereWithAggregatesInput>
    OR?: Enumerable<DeviceProfileScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DeviceProfileScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    logo?: StringNullableWithAggregatesFilter | string | null
    cridentialsType?: EnumTypeCredentialNullableWithAggregatesFilter | TypeCredential | null
    deviceTypeId?: IntNullableWithAggregatesFilter | number | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    protocolId?: IntNullableWithAggregatesFilter | number | null
    decoderId?: IntNullableWithAggregatesFilter | number | null
    attributes?: JsonNullableWithAggregatesFilter
    tenantId?: IntNullableWithAggregatesFilter | number | null
  }

  export type CredentialWhereInput = {
    AND?: Enumerable<CredentialWhereInput>
    OR?: Enumerable<CredentialWhereInput>
    NOT?: Enumerable<CredentialWhereInput>
    id?: IntFilter | number
    username?: StringNullableFilter | string | null
    password?: StringNullableFilter | string | null
    token?: StringNullableFilter | string | null
    certificate?: StringNullableFilter | string | null
    type?: EnumTypeCredentialFilter | TypeCredential
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    device?: XOR<DeviceRelationFilter, DeviceWhereInput> | null
  }

  export type CredentialOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    token?: SortOrder
    certificate?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    device?: DeviceOrderByWithRelationInput
  }

  export type CredentialWhereUniqueInput = {
    id?: number
    username?: string
    token?: string
  }

  export type CredentialOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    token?: SortOrder
    certificate?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CredentialCountOrderByAggregateInput
    _avg?: CredentialAvgOrderByAggregateInput
    _max?: CredentialMaxOrderByAggregateInput
    _min?: CredentialMinOrderByAggregateInput
    _sum?: CredentialSumOrderByAggregateInput
  }

  export type CredentialScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CredentialScalarWhereWithAggregatesInput>
    OR?: Enumerable<CredentialScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CredentialScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    username?: StringNullableWithAggregatesFilter | string | null
    password?: StringNullableWithAggregatesFilter | string | null
    token?: StringNullableWithAggregatesFilter | string | null
    certificate?: StringNullableWithAggregatesFilter | string | null
    type?: EnumTypeCredentialWithAggregatesFilter | TypeCredential
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type TagWhereInput = {
    AND?: Enumerable<TagWhereInput>
    OR?: Enumerable<TagWhereInput>
    NOT?: Enumerable<TagWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    devices?: DeviceListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    devices?: DeviceOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _avg?: TagAvgOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
    _sum?: TagSumOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TagScalarWhereWithAggregatesInput>
    OR?: Enumerable<TagScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TagScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type VmqAuthAclWhereInput = {
    AND?: Enumerable<VmqAuthAclWhereInput>
    OR?: Enumerable<VmqAuthAclWhereInput>
    NOT?: Enumerable<VmqAuthAclWhereInput>
    id?: IntFilter | number
    mountpoint?: StringFilter | string
    username?: StringFilter | string
    clientId?: StringFilter | string
    password?: StringNullableFilter | string | null
    publishAcl?: JsonFilter
    subscribeAcl?: JsonFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type VmqAuthAclOrderByWithRelationInput = {
    id?: SortOrder
    mountpoint?: SortOrder
    username?: SortOrder
    clientId?: SortOrder
    password?: SortOrder
    publishAcl?: SortOrder
    subscribeAcl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VmqAuthAclWhereUniqueInput = {
    id?: number
    mountpoint_username_clientId?: VmqAuthAclMountpointUsernameClientIdCompoundUniqueInput
  }

  export type VmqAuthAclOrderByWithAggregationInput = {
    id?: SortOrder
    mountpoint?: SortOrder
    username?: SortOrder
    clientId?: SortOrder
    password?: SortOrder
    publishAcl?: SortOrder
    subscribeAcl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VmqAuthAclCountOrderByAggregateInput
    _avg?: VmqAuthAclAvgOrderByAggregateInput
    _max?: VmqAuthAclMaxOrderByAggregateInput
    _min?: VmqAuthAclMinOrderByAggregateInput
    _sum?: VmqAuthAclSumOrderByAggregateInput
  }

  export type VmqAuthAclScalarWhereWithAggregatesInput = {
    AND?: Enumerable<VmqAuthAclScalarWhereWithAggregatesInput>
    OR?: Enumerable<VmqAuthAclScalarWhereWithAggregatesInput>
    NOT?: Enumerable<VmqAuthAclScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    mountpoint?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
    clientId?: StringWithAggregatesFilter | string
    password?: StringNullableWithAggregatesFilter | string | null
    publishAcl?: JsonWithAggregatesFilter
    subscribeAcl?: JsonWithAggregatesFilter
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type DeviceWhereInput = {
    AND?: Enumerable<DeviceWhereInput>
    OR?: Enumerable<DeviceWhereInput>
    NOT?: Enumerable<DeviceWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    description?: StringNullableFilter | string | null
    serial?: StringFilter | string
    isPassive?: BoolFilter | boolean
    isOnline?: BoolFilter | boolean
    isdecoded?: BoolFilter | boolean
    credentialId?: IntNullableFilter | number | null
    configuration?: StringNullableFilter | string | null
    deviceProfileId?: IntNullableFilter | number | null
    firmwareId?: IntNullableFilter | number | null
    ip?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    virtualDeviceId?: IntNullableFilter | number | null
    groupId?: IntNullableFilter | number | null
    tenantId?: IntNullableFilter | number | null
    credential?: XOR<CredentialRelationFilter, CredentialWhereInput> | null
    attributes?: AttributeListRelationFilter
    lastTelemetries?: LastTelemetryListRelationFilter
    deviceProfile?: XOR<DeviceProfileRelationFilter, DeviceProfileWhereInput> | null
    firmware?: XOR<FirmwareRelationFilter, FirmwareWhereInput> | null
    tags?: TagListRelationFilter
    VirtualDevice?: XOR<VirtualDeviceRelationFilter, VirtualDeviceWhereInput> | null
    alerts?: AlertListRelationFilter
    group?: XOR<GroupRelationFilter, GroupWhereInput> | null
    history?: HistoryListRelationFilter
  }

  export type DeviceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    serial?: SortOrder
    isPassive?: SortOrder
    isOnline?: SortOrder
    isdecoded?: SortOrder
    credentialId?: SortOrder
    configuration?: SortOrder
    deviceProfileId?: SortOrder
    firmwareId?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    virtualDeviceId?: SortOrder
    groupId?: SortOrder
    tenantId?: SortOrder
    credential?: CredentialOrderByWithRelationInput
    attributes?: AttributeOrderByRelationAggregateInput
    lastTelemetries?: LastTelemetryOrderByRelationAggregateInput
    deviceProfile?: DeviceProfileOrderByWithRelationInput
    firmware?: FirmwareOrderByWithRelationInput
    tags?: TagOrderByRelationAggregateInput
    VirtualDevice?: VirtualDeviceOrderByWithRelationInput
    alerts?: AlertOrderByRelationAggregateInput
    group?: GroupOrderByWithRelationInput
    history?: HistoryOrderByRelationAggregateInput
  }

  export type DeviceWhereUniqueInput = {
    id?: number
    serial?: string
    credentialId?: number
  }

  export type DeviceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    serial?: SortOrder
    isPassive?: SortOrder
    isOnline?: SortOrder
    isdecoded?: SortOrder
    credentialId?: SortOrder
    configuration?: SortOrder
    deviceProfileId?: SortOrder
    firmwareId?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    virtualDeviceId?: SortOrder
    groupId?: SortOrder
    tenantId?: SortOrder
    _count?: DeviceCountOrderByAggregateInput
    _avg?: DeviceAvgOrderByAggregateInput
    _max?: DeviceMaxOrderByAggregateInput
    _min?: DeviceMinOrderByAggregateInput
    _sum?: DeviceSumOrderByAggregateInput
  }

  export type DeviceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DeviceScalarWhereWithAggregatesInput>
    OR?: Enumerable<DeviceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DeviceScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    serial?: StringWithAggregatesFilter | string
    isPassive?: BoolWithAggregatesFilter | boolean
    isOnline?: BoolWithAggregatesFilter | boolean
    isdecoded?: BoolWithAggregatesFilter | boolean
    credentialId?: IntNullableWithAggregatesFilter | number | null
    configuration?: StringNullableWithAggregatesFilter | string | null
    deviceProfileId?: IntNullableWithAggregatesFilter | number | null
    firmwareId?: IntNullableWithAggregatesFilter | number | null
    ip?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    virtualDeviceId?: IntNullableWithAggregatesFilter | number | null
    groupId?: IntNullableWithAggregatesFilter | number | null
    tenantId?: IntNullableWithAggregatesFilter | number | null
  }

  export type AttributeWhereInput = {
    AND?: Enumerable<AttributeWhereInput>
    OR?: Enumerable<AttributeWhereInput>
    NOT?: Enumerable<AttributeWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    value?: StringFilter | string
    deviceId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    device?: XOR<DeviceRelationFilter, DeviceWhereInput>
  }

  export type AttributeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    device?: DeviceOrderByWithRelationInput
  }

  export type AttributeWhereUniqueInput = {
    id?: number
    deviceId_name?: AttributeDeviceIdNameCompoundUniqueInput
  }

  export type AttributeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AttributeCountOrderByAggregateInput
    _avg?: AttributeAvgOrderByAggregateInput
    _max?: AttributeMaxOrderByAggregateInput
    _min?: AttributeMinOrderByAggregateInput
    _sum?: AttributeSumOrderByAggregateInput
  }

  export type AttributeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AttributeScalarWhereWithAggregatesInput>
    OR?: Enumerable<AttributeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AttributeScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
    deviceId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type LastTelemetryWhereInput = {
    AND?: Enumerable<LastTelemetryWhereInput>
    OR?: Enumerable<LastTelemetryWhereInput>
    NOT?: Enumerable<LastTelemetryWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    value?: JsonFilter
    alias?: StringNullableFilter | string | null
    icon?: StringNullableFilter | string | null
    color?: StringNullableFilter | string | null
    show?: BoolFilter | boolean
    deviceId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    device?: XOR<DeviceRelationFilter, DeviceWhereInput>
  }

  export type LastTelemetryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    alias?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    show?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    device?: DeviceOrderByWithRelationInput
  }

  export type LastTelemetryWhereUniqueInput = {
    id?: number
    deviceId_name?: LastTelemetryDeviceIdNameCompoundUniqueInput
  }

  export type LastTelemetryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    alias?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    show?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LastTelemetryCountOrderByAggregateInput
    _avg?: LastTelemetryAvgOrderByAggregateInput
    _max?: LastTelemetryMaxOrderByAggregateInput
    _min?: LastTelemetryMinOrderByAggregateInput
    _sum?: LastTelemetrySumOrderByAggregateInput
  }

  export type LastTelemetryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LastTelemetryScalarWhereWithAggregatesInput>
    OR?: Enumerable<LastTelemetryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LastTelemetryScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    value?: JsonWithAggregatesFilter
    alias?: StringNullableWithAggregatesFilter | string | null
    icon?: StringNullableWithAggregatesFilter | string | null
    color?: StringNullableWithAggregatesFilter | string | null
    show?: BoolWithAggregatesFilter | boolean
    deviceId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ReportWhereInput = {
    AND?: Enumerable<ReportWhereInput>
    OR?: Enumerable<ReportWhereInput>
    NOT?: Enumerable<ReportWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    tenantId?: IntFilter | number
    query?: StringFilter | string
    type?: StringFilter | string
    format?: StringFilter | string
    url?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    query?: SortOrder
    type?: SortOrder
    format?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportWhereUniqueInput = {
    id?: number
    tenantId_name?: ReportTenantIdNameCompoundUniqueInput
  }

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    query?: SortOrder
    type?: SortOrder
    format?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ReportScalarWhereWithAggregatesInput>
    OR?: Enumerable<ReportScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ReportScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    tenantId?: IntWithAggregatesFilter | number
    query?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    format?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type HistoryWhereInput = {
    AND?: Enumerable<HistoryWhereInput>
    OR?: Enumerable<HistoryWhereInput>
    NOT?: Enumerable<HistoryWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    value?: JsonFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deviceId?: IntFilter | number
    device?: XOR<DeviceRelationFilter, DeviceWhereInput>
  }

  export type HistoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deviceId?: SortOrder
    device?: DeviceOrderByWithRelationInput
  }

  export type HistoryWhereUniqueInput = {
    id?: number
  }

  export type HistoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deviceId?: SortOrder
    _count?: HistoryCountOrderByAggregateInput
    _avg?: HistoryAvgOrderByAggregateInput
    _max?: HistoryMaxOrderByAggregateInput
    _min?: HistoryMinOrderByAggregateInput
    _sum?: HistorySumOrderByAggregateInput
  }

  export type HistoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<HistoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<HistoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<HistoryScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    value?: JsonWithAggregatesFilter
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deviceId?: IntWithAggregatesFilter | number
  }

  export type VirtualDeviceCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    devices?: DeviceCreateNestedManyWithoutVirtualDeviceInput
  }

  export type VirtualDeviceUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    devices?: DeviceUncheckedCreateNestedManyWithoutVirtualDeviceInput
  }

  export type VirtualDeviceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    devices?: DeviceUpdateManyWithoutVirtualDeviceNestedInput
  }

  export type VirtualDeviceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    devices?: DeviceUncheckedUpdateManyWithoutVirtualDeviceNestedInput
  }

  export type VirtualDeviceCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type VirtualDeviceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type VirtualDeviceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GroupCreateInput = {
    name: string
    type?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    lat?: number | null
    lng?: number | null
    ip?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    parent?: GroupCreateNestedOneWithoutSubgroupsInput
    subgroups?: GroupCreateNestedManyWithoutParentInput
    devices?: DeviceCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: number
    name: string
    type?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId?: number | null
    location?: string | null
    lat?: number | null
    lng?: number | null
    ip?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    subgroups?: GroupUncheckedCreateNestedManyWithoutParentInput
    devices?: DeviceUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    parent?: GroupUpdateOneWithoutSubgroupsNestedInput
    subgroups?: GroupUpdateManyWithoutParentNestedInput
    devices?: DeviceUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    subgroups?: GroupUncheckedUpdateManyWithoutParentNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyInput = {
    id?: number
    name: string
    type?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId?: number | null
    location?: string | null
    lat?: number | null
    lng?: number | null
    ip?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
  }

  export type GroupUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AlertCreateInput = {
    type?: string | null
    message?: string | null
    level?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: number | null
    device: DeviceCreateNestedOneWithoutAlertsInput
  }

  export type AlertUncheckedCreateInput = {
    id?: number
    deviceId: number
    type?: string | null
    message?: string | null
    level?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: number | null
  }

  export type AlertUpdateInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: NullableIntFieldUpdateOperationsInput | number | null
    device?: DeviceUpdateOneRequiredWithoutAlertsNestedInput
  }

  export type AlertUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    deviceId?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AlertCreateManyInput = {
    id?: number
    deviceId: number
    type?: string | null
    message?: string | null
    level?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: number | null
  }

  export type AlertUpdateManyMutationInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AlertUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    deviceId?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DecoderCreateInput = {
    name: string
    description: string
    fnc: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    deviceProfile?: DeviceProfileCreateNestedManyWithoutDecoderInput
  }

  export type DecoderUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    fnc: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    deviceProfile?: DeviceProfileUncheckedCreateNestedManyWithoutDecoderInput
  }

  export type DecoderUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    fnc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceProfile?: DeviceProfileUpdateManyWithoutDecoderNestedInput
  }

  export type DecoderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    fnc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceProfile?: DeviceProfileUncheckedUpdateManyWithoutDecoderNestedInput
  }

  export type DecoderCreateManyInput = {
    id?: number
    name: string
    description: string
    fnc: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type DecoderUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    fnc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DecoderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    fnc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceTypeCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    deviceProfiles?: DeviceProfileCreateNestedManyWithoutDeviceTypeInput
  }

  export type DeviceTypeUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    deviceProfiles?: DeviceProfileUncheckedCreateNestedManyWithoutDeviceTypeInput
  }

  export type DeviceTypeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceProfiles?: DeviceProfileUpdateManyWithoutDeviceTypeNestedInput
  }

  export type DeviceTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceProfiles?: DeviceProfileUncheckedUpdateManyWithoutDeviceTypeNestedInput
  }

  export type DeviceTypeCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type DeviceTypeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FirmwareCreateInput = {
    name?: string | null
    version?: string | null
    description?: string | null
    url?: string | null
    size?: number | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    device?: DeviceCreateNestedManyWithoutFirmwareInput
  }

  export type FirmwareUncheckedCreateInput = {
    id?: number
    name?: string | null
    version?: string | null
    description?: string | null
    url?: string | null
    size?: number | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    device?: DeviceUncheckedCreateNestedManyWithoutFirmwareInput
  }

  export type FirmwareUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    device?: DeviceUpdateManyWithoutFirmwareNestedInput
  }

  export type FirmwareUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    device?: DeviceUncheckedUpdateManyWithoutFirmwareNestedInput
  }

  export type FirmwareCreateManyInput = {
    id?: number
    name?: string | null
    version?: string | null
    description?: string | null
    url?: string | null
    size?: number | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type FirmwareUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FirmwareUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProtocolCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    deviceProfiles?: DeviceProfileCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    deviceProfiles?: DeviceProfileUncheckedCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceProfiles?: DeviceProfileUpdateManyWithoutProtocolNestedInput
  }

  export type ProtocolUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceProfiles?: DeviceProfileUncheckedUpdateManyWithoutProtocolNestedInput
  }

  export type ProtocolCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type ProtocolUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProtocolUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceProfileCreateInput = {
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    deviceType?: DeviceTypeCreateNestedOneWithoutDeviceProfilesInput
    devices?: DeviceCreateNestedManyWithoutDeviceProfileInput
    protocol?: ProtocolCreateNestedOneWithoutDeviceProfilesInput
    decoder?: DecoderCreateNestedOneWithoutDeviceProfileInput
  }

  export type DeviceProfileUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    deviceTypeId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    protocolId?: number | null
    decoderId?: number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    devices?: DeviceUncheckedCreateNestedManyWithoutDeviceProfileInput
  }

  export type DeviceProfileUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceType?: DeviceTypeUpdateOneWithoutDeviceProfilesNestedInput
    devices?: DeviceUpdateManyWithoutDeviceProfileNestedInput
    protocol?: ProtocolUpdateOneWithoutDeviceProfilesNestedInput
    decoder?: DecoderUpdateOneWithoutDeviceProfileNestedInput
  }

  export type DeviceProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    deviceTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: NullableIntFieldUpdateOperationsInput | number | null
    decoderId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    devices?: DeviceUncheckedUpdateManyWithoutDeviceProfileNestedInput
  }

  export type DeviceProfileCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    deviceTypeId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    protocolId?: number | null
    decoderId?: number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
  }

  export type DeviceProfileUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    deviceTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: NullableIntFieldUpdateOperationsInput | number | null
    decoderId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CredentialCreateInput = {
    username?: string | null
    password?: string | null
    token?: string | null
    certificate?: string | null
    type?: TypeCredential
    createdAt?: Date | string
    updatedAt?: Date | string
    device?: DeviceCreateNestedOneWithoutCredentialInput
  }

  export type CredentialUncheckedCreateInput = {
    id?: number
    username?: string | null
    password?: string | null
    token?: string | null
    certificate?: string | null
    type?: TypeCredential
    createdAt?: Date | string
    updatedAt?: Date | string
    device?: DeviceUncheckedCreateNestedOneWithoutCredentialInput
  }

  export type CredentialUpdateInput = {
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    certificate?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeCredentialFieldUpdateOperationsInput | TypeCredential
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: DeviceUpdateOneWithoutCredentialNestedInput
  }

  export type CredentialUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    certificate?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeCredentialFieldUpdateOperationsInput | TypeCredential
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: DeviceUncheckedUpdateOneWithoutCredentialNestedInput
  }

  export type CredentialCreateManyInput = {
    id?: number
    username?: string | null
    password?: string | null
    token?: string | null
    certificate?: string | null
    type?: TypeCredential
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CredentialUpdateManyMutationInput = {
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    certificate?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeCredentialFieldUpdateOperationsInput | TypeCredential
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CredentialUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    certificate?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeCredentialFieldUpdateOperationsInput | TypeCredential
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VmqAuthAclCreateInput = {
    mountpoint?: string
    username: string
    clientId: string
    password?: string | null
    publishAcl: JsonNullValueInput | InputJsonValue
    subscribeAcl: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VmqAuthAclUncheckedCreateInput = {
    id?: number
    mountpoint?: string
    username: string
    clientId: string
    password?: string | null
    publishAcl: JsonNullValueInput | InputJsonValue
    subscribeAcl: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VmqAuthAclUpdateInput = {
    mountpoint?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    publishAcl?: JsonNullValueInput | InputJsonValue
    subscribeAcl?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VmqAuthAclUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mountpoint?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    publishAcl?: JsonNullValueInput | InputJsonValue
    subscribeAcl?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VmqAuthAclCreateManyInput = {
    id?: number
    mountpoint?: string
    username: string
    clientId: string
    password?: string | null
    publishAcl: JsonNullValueInput | InputJsonValue
    subscribeAcl: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VmqAuthAclUpdateManyMutationInput = {
    mountpoint?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    publishAcl?: JsonNullValueInput | InputJsonValue
    subscribeAcl?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VmqAuthAclUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mountpoint?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    publishAcl?: JsonNullValueInput | InputJsonValue
    subscribeAcl?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceCreateInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    credential?: CredentialCreateNestedOneWithoutDeviceInput
    attributes?: AttributeCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryCreateNestedManyWithoutDeviceInput
    deviceProfile?: DeviceProfileCreateNestedOneWithoutDevicesInput
    firmware?: FirmwareCreateNestedOneWithoutDeviceInput
    tags?: TagCreateNestedManyWithoutDevicesInput
    VirtualDevice?: VirtualDeviceCreateNestedOneWithoutDevicesInput
    alerts?: AlertCreateNestedManyWithoutDeviceInput
    group?: GroupCreateNestedOneWithoutDevicesInput
    history?: HistoryCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
    attributes?: AttributeUncheckedCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput
    tags?: TagUncheckedCreateNestedManyWithoutDevicesInput
    alerts?: AlertUncheckedCreateNestedManyWithoutDeviceInput
    history?: HistoryUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    credential?: CredentialUpdateOneWithoutDeviceNestedInput
    attributes?: AttributeUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUpdateManyWithoutDeviceNestedInput
    deviceProfile?: DeviceProfileUpdateOneWithoutDevicesNestedInput
    firmware?: FirmwareUpdateOneWithoutDeviceNestedInput
    tags?: TagUpdateManyWithoutDevicesNestedInput
    VirtualDevice?: VirtualDeviceUpdateOneWithoutDevicesNestedInput
    alerts?: AlertUpdateManyWithoutDeviceNestedInput
    group?: GroupUpdateOneWithoutDevicesNestedInput
    history?: HistoryUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUncheckedUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput
    tags?: TagUncheckedUpdateManyWithoutDevicesNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutDeviceNestedInput
    history?: HistoryUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
  }

  export type DeviceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AttributeCreateInput = {
    name: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
    device: DeviceCreateNestedOneWithoutAttributesInput
  }

  export type AttributeUncheckedCreateInput = {
    id?: number
    name: string
    value: string
    deviceId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttributeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: DeviceUpdateOneRequiredWithoutAttributesNestedInput
  }

  export type AttributeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    deviceId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttributeCreateManyInput = {
    id?: number
    name: string
    value: string
    deviceId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttributeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttributeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    deviceId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LastTelemetryCreateInput = {
    name: string
    value: JsonNullValueInput | InputJsonValue
    alias?: string | null
    icon?: string | null
    color?: string | null
    show?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    device: DeviceCreateNestedOneWithoutLastTelemetriesInput
  }

  export type LastTelemetryUncheckedCreateInput = {
    id?: number
    name: string
    value: JsonNullValueInput | InputJsonValue
    alias?: string | null
    icon?: string | null
    color?: string | null
    show?: boolean
    deviceId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LastTelemetryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    alias?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    show?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: DeviceUpdateOneRequiredWithoutLastTelemetriesNestedInput
  }

  export type LastTelemetryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    alias?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    show?: BoolFieldUpdateOperationsInput | boolean
    deviceId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LastTelemetryCreateManyInput = {
    id?: number
    name: string
    value: JsonNullValueInput | InputJsonValue
    alias?: string | null
    icon?: string | null
    color?: string | null
    show?: boolean
    deviceId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LastTelemetryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    alias?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    show?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LastTelemetryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    alias?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    show?: BoolFieldUpdateOperationsInput | boolean
    deviceId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    name: string
    tenantId: number
    query: string
    type: string
    format: string
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUncheckedCreateInput = {
    id?: number
    name: string
    tenantId: number
    query: string
    type: string
    format: string
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: IntFieldUpdateOperationsInput | number
    query?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: IntFieldUpdateOperationsInput | number
    query?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateManyInput = {
    id?: number
    name: string
    tenantId: number
    query: string
    type: string
    format: string
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: IntFieldUpdateOperationsInput | number
    query?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: IntFieldUpdateOperationsInput | number
    query?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoryCreateInput = {
    name: string
    value: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    device: DeviceCreateNestedOneWithoutHistoryInput
  }

  export type HistoryUncheckedCreateInput = {
    id?: number
    name: string
    value: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deviceId: number
  }

  export type HistoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: DeviceUpdateOneRequiredWithoutHistoryNestedInput
  }

  export type HistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deviceId?: IntFieldUpdateOperationsInput | number
  }

  export type HistoryCreateManyInput = {
    id?: number
    name: string
    value: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deviceId: number
  }

  export type HistoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deviceId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type DeviceListRelationFilter = {
    every?: DeviceWhereInput
    some?: DeviceWhereInput
    none?: DeviceWhereInput
  }

  export type DeviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VirtualDeviceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type VirtualDeviceAvgOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
  }

  export type VirtualDeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type VirtualDeviceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type VirtualDeviceSumOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type FloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type GroupRelationFilter = {
    is?: GroupWhereInput | null
    isNot?: GroupWhereInput | null
  }

  export type GroupListRelationFilter = {
    every?: GroupWhereInput
    some?: GroupWhereInput
    none?: GroupWhereInput
  }

  export type GroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupNameTenantIdParentIdCompoundUniqueInput = {
    name: string
    tenantId: number
    parentId: number
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentId?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    ip?: SortOrder
    attributes?: SortOrder
    tenantId?: SortOrder
  }

  export type GroupAvgOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    tenantId?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentId?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    ip?: SortOrder
    tenantId?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentId?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    ip?: SortOrder
    tenantId?: SortOrder
  }

  export type GroupSumOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    tenantId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type FloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type DeviceRelationFilter = {
    is?: DeviceWhereInput | null
    isNot?: DeviceWhereInput | null
  }

  export type AlertCountOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attributes?: SortOrder
    acknowledgedBy?: SortOrder
  }

  export type AlertAvgOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    acknowledgedBy?: SortOrder
  }

  export type AlertMaxOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    acknowledgedBy?: SortOrder
  }

  export type AlertMinOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    acknowledgedBy?: SortOrder
  }

  export type AlertSumOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    acknowledgedBy?: SortOrder
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type DeviceProfileListRelationFilter = {
    every?: DeviceProfileWhereInput
    some?: DeviceProfileWhereInput
    none?: DeviceProfileWhereInput
  }

  export type DeviceProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DecoderNameTenantIdCompoundUniqueInput = {
    name: string
    tenantId: number
  }

  export type DecoderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    fnc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type DecoderAvgOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
  }

  export type DecoderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    fnc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type DecoderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    fnc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type DecoderSumOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceTypeNameTenantIdCompoundUniqueInput = {
    name: string
    tenantId: number
  }

  export type DeviceTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceTypeAvgOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceTypeSumOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
  }

  export type FirmwareNameVersionTenantIdCompoundUniqueInput = {
    name: string
    version: string
    tenantId: number
  }

  export type FirmwareCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    url?: SortOrder
    size?: SortOrder
    hash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type FirmwareAvgOrderByAggregateInput = {
    id?: SortOrder
    size?: SortOrder
    tenantId?: SortOrder
  }

  export type FirmwareMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    url?: SortOrder
    size?: SortOrder
    hash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type FirmwareMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    url?: SortOrder
    size?: SortOrder
    hash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type FirmwareSumOrderByAggregateInput = {
    id?: SortOrder
    size?: SortOrder
    tenantId?: SortOrder
  }

  export type ProtocolNameTenantIdCompoundUniqueInput = {
    name: string
    tenantId: number
  }

  export type ProtocolCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type ProtocolAvgOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
  }

  export type ProtocolMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type ProtocolMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type ProtocolSumOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
  }

  export type EnumTypeCredentialNullableFilter = {
    equals?: TypeCredential | null
    in?: Enumerable<TypeCredential> | null
    notIn?: Enumerable<TypeCredential> | null
    not?: NestedEnumTypeCredentialNullableFilter | TypeCredential | null
  }

  export type DeviceTypeRelationFilter = {
    is?: DeviceTypeWhereInput | null
    isNot?: DeviceTypeWhereInput | null
  }

  export type ProtocolRelationFilter = {
    is?: ProtocolWhereInput | null
    isNot?: ProtocolWhereInput | null
  }

  export type DecoderRelationFilter = {
    is?: DecoderWhereInput | null
    isNot?: DecoderWhereInput | null
  }

  export type DeviceProfileNameTenantIdCompoundUniqueInput = {
    name: string
    tenantId: number
  }

  export type DeviceProfileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    cridentialsType?: SortOrder
    deviceTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    protocolId?: SortOrder
    decoderId?: SortOrder
    attributes?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    deviceTypeId?: SortOrder
    protocolId?: SortOrder
    decoderId?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    cridentialsType?: SortOrder
    deviceTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    protocolId?: SortOrder
    decoderId?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceProfileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    cridentialsType?: SortOrder
    deviceTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    protocolId?: SortOrder
    decoderId?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceProfileSumOrderByAggregateInput = {
    id?: SortOrder
    deviceTypeId?: SortOrder
    protocolId?: SortOrder
    decoderId?: SortOrder
    tenantId?: SortOrder
  }

  export type EnumTypeCredentialNullableWithAggregatesFilter = {
    equals?: TypeCredential | null
    in?: Enumerable<TypeCredential> | null
    notIn?: Enumerable<TypeCredential> | null
    not?: NestedEnumTypeCredentialNullableWithAggregatesFilter | TypeCredential | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumTypeCredentialNullableFilter
    _max?: NestedEnumTypeCredentialNullableFilter
  }

  export type EnumTypeCredentialFilter = {
    equals?: TypeCredential
    in?: Enumerable<TypeCredential>
    notIn?: Enumerable<TypeCredential>
    not?: NestedEnumTypeCredentialFilter | TypeCredential
  }

  export type CredentialCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    token?: SortOrder
    certificate?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CredentialAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CredentialMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    token?: SortOrder
    certificate?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CredentialMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    token?: SortOrder
    certificate?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CredentialSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumTypeCredentialWithAggregatesFilter = {
    equals?: TypeCredential
    in?: Enumerable<TypeCredential>
    notIn?: Enumerable<TypeCredential>
    not?: NestedEnumTypeCredentialWithAggregatesFilter | TypeCredential
    _count?: NestedIntFilter
    _min?: NestedEnumTypeCredentialFilter
    _max?: NestedEnumTypeCredentialFilter
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VmqAuthAclMountpointUsernameClientIdCompoundUniqueInput = {
    mountpoint: string
    username: string
    clientId: string
  }

  export type VmqAuthAclCountOrderByAggregateInput = {
    id?: SortOrder
    mountpoint?: SortOrder
    username?: SortOrder
    clientId?: SortOrder
    password?: SortOrder
    publishAcl?: SortOrder
    subscribeAcl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VmqAuthAclAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VmqAuthAclMaxOrderByAggregateInput = {
    id?: SortOrder
    mountpoint?: SortOrder
    username?: SortOrder
    clientId?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VmqAuthAclMinOrderByAggregateInput = {
    id?: SortOrder
    mountpoint?: SortOrder
    username?: SortOrder
    clientId?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VmqAuthAclSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type CredentialRelationFilter = {
    is?: CredentialWhereInput | null
    isNot?: CredentialWhereInput | null
  }

  export type AttributeListRelationFilter = {
    every?: AttributeWhereInput
    some?: AttributeWhereInput
    none?: AttributeWhereInput
  }

  export type LastTelemetryListRelationFilter = {
    every?: LastTelemetryWhereInput
    some?: LastTelemetryWhereInput
    none?: LastTelemetryWhereInput
  }

  export type DeviceProfileRelationFilter = {
    is?: DeviceProfileWhereInput | null
    isNot?: DeviceProfileWhereInput | null
  }

  export type FirmwareRelationFilter = {
    is?: FirmwareWhereInput | null
    isNot?: FirmwareWhereInput | null
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type VirtualDeviceRelationFilter = {
    is?: VirtualDeviceWhereInput | null
    isNot?: VirtualDeviceWhereInput | null
  }

  export type AlertListRelationFilter = {
    every?: AlertWhereInput
    some?: AlertWhereInput
    none?: AlertWhereInput
  }

  export type HistoryListRelationFilter = {
    every?: HistoryWhereInput
    some?: HistoryWhereInput
    none?: HistoryWhereInput
  }

  export type AttributeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LastTelemetryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlertOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeviceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    serial?: SortOrder
    isPassive?: SortOrder
    isOnline?: SortOrder
    isdecoded?: SortOrder
    credentialId?: SortOrder
    configuration?: SortOrder
    deviceProfileId?: SortOrder
    firmwareId?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    virtualDeviceId?: SortOrder
    groupId?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceAvgOrderByAggregateInput = {
    id?: SortOrder
    credentialId?: SortOrder
    deviceProfileId?: SortOrder
    firmwareId?: SortOrder
    virtualDeviceId?: SortOrder
    groupId?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    serial?: SortOrder
    isPassive?: SortOrder
    isOnline?: SortOrder
    isdecoded?: SortOrder
    credentialId?: SortOrder
    configuration?: SortOrder
    deviceProfileId?: SortOrder
    firmwareId?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    virtualDeviceId?: SortOrder
    groupId?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    serial?: SortOrder
    isPassive?: SortOrder
    isOnline?: SortOrder
    isdecoded?: SortOrder
    credentialId?: SortOrder
    configuration?: SortOrder
    deviceProfileId?: SortOrder
    firmwareId?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    virtualDeviceId?: SortOrder
    groupId?: SortOrder
    tenantId?: SortOrder
  }

  export type DeviceSumOrderByAggregateInput = {
    id?: SortOrder
    credentialId?: SortOrder
    deviceProfileId?: SortOrder
    firmwareId?: SortOrder
    virtualDeviceId?: SortOrder
    groupId?: SortOrder
    tenantId?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type AttributeDeviceIdNameCompoundUniqueInput = {
    deviceId: number
    name: string
  }

  export type AttributeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttributeAvgOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
  }

  export type AttributeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttributeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttributeSumOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
  }

  export type LastTelemetryDeviceIdNameCompoundUniqueInput = {
    deviceId: number
    name: string
  }

  export type LastTelemetryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    alias?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    show?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LastTelemetryAvgOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
  }

  export type LastTelemetryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    alias?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    show?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LastTelemetryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    alias?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    show?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LastTelemetrySumOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
  }

  export type ReportTenantIdNameCompoundUniqueInput = {
    tenantId: number
    name: string
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    query?: SortOrder
    type?: SortOrder
    format?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    query?: SortOrder
    type?: SortOrder
    format?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    query?: SortOrder
    type?: SortOrder
    format?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
  }

  export type HistoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deviceId?: SortOrder
  }

  export type HistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
  }

  export type HistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deviceId?: SortOrder
  }

  export type HistoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deviceId?: SortOrder
  }

  export type HistorySumOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
  }

  export type DeviceCreateNestedManyWithoutVirtualDeviceInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutVirtualDeviceInput>, Enumerable<DeviceUncheckedCreateWithoutVirtualDeviceInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutVirtualDeviceInput>
    createMany?: DeviceCreateManyVirtualDeviceInputEnvelope
    connect?: Enumerable<DeviceWhereUniqueInput>
  }

  export type DeviceUncheckedCreateNestedManyWithoutVirtualDeviceInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutVirtualDeviceInput>, Enumerable<DeviceUncheckedCreateWithoutVirtualDeviceInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutVirtualDeviceInput>
    createMany?: DeviceCreateManyVirtualDeviceInputEnvelope
    connect?: Enumerable<DeviceWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DeviceUpdateManyWithoutVirtualDeviceNestedInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutVirtualDeviceInput>, Enumerable<DeviceUncheckedCreateWithoutVirtualDeviceInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutVirtualDeviceInput>
    upsert?: Enumerable<DeviceUpsertWithWhereUniqueWithoutVirtualDeviceInput>
    createMany?: DeviceCreateManyVirtualDeviceInputEnvelope
    set?: Enumerable<DeviceWhereUniqueInput>
    disconnect?: Enumerable<DeviceWhereUniqueInput>
    delete?: Enumerable<DeviceWhereUniqueInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
    update?: Enumerable<DeviceUpdateWithWhereUniqueWithoutVirtualDeviceInput>
    updateMany?: Enumerable<DeviceUpdateManyWithWhereWithoutVirtualDeviceInput>
    deleteMany?: Enumerable<DeviceScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DeviceUncheckedUpdateManyWithoutVirtualDeviceNestedInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutVirtualDeviceInput>, Enumerable<DeviceUncheckedCreateWithoutVirtualDeviceInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutVirtualDeviceInput>
    upsert?: Enumerable<DeviceUpsertWithWhereUniqueWithoutVirtualDeviceInput>
    createMany?: DeviceCreateManyVirtualDeviceInputEnvelope
    set?: Enumerable<DeviceWhereUniqueInput>
    disconnect?: Enumerable<DeviceWhereUniqueInput>
    delete?: Enumerable<DeviceWhereUniqueInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
    update?: Enumerable<DeviceUpdateWithWhereUniqueWithoutVirtualDeviceInput>
    updateMany?: Enumerable<DeviceUpdateManyWithWhereWithoutVirtualDeviceInput>
    deleteMany?: Enumerable<DeviceScalarWhereInput>
  }

  export type GroupCreateNestedOneWithoutSubgroupsInput = {
    create?: XOR<GroupCreateWithoutSubgroupsInput, GroupUncheckedCreateWithoutSubgroupsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutSubgroupsInput
    connect?: GroupWhereUniqueInput
  }

  export type GroupCreateNestedManyWithoutParentInput = {
    create?: XOR<Enumerable<GroupCreateWithoutParentInput>, Enumerable<GroupUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<GroupCreateOrConnectWithoutParentInput>
    createMany?: GroupCreateManyParentInputEnvelope
    connect?: Enumerable<GroupWhereUniqueInput>
  }

  export type DeviceCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutGroupInput>, Enumerable<DeviceUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutGroupInput>
    createMany?: DeviceCreateManyGroupInputEnvelope
    connect?: Enumerable<DeviceWhereUniqueInput>
  }

  export type GroupUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<Enumerable<GroupCreateWithoutParentInput>, Enumerable<GroupUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<GroupCreateOrConnectWithoutParentInput>
    createMany?: GroupCreateManyParentInputEnvelope
    connect?: Enumerable<GroupWhereUniqueInput>
  }

  export type DeviceUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutGroupInput>, Enumerable<DeviceUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutGroupInput>
    createMany?: DeviceCreateManyGroupInputEnvelope
    connect?: Enumerable<DeviceWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GroupUpdateOneWithoutSubgroupsNestedInput = {
    create?: XOR<GroupCreateWithoutSubgroupsInput, GroupUncheckedCreateWithoutSubgroupsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutSubgroupsInput
    upsert?: GroupUpsertWithoutSubgroupsInput
    disconnect?: boolean
    delete?: boolean
    connect?: GroupWhereUniqueInput
    update?: XOR<GroupUpdateWithoutSubgroupsInput, GroupUncheckedUpdateWithoutSubgroupsInput>
  }

  export type GroupUpdateManyWithoutParentNestedInput = {
    create?: XOR<Enumerable<GroupCreateWithoutParentInput>, Enumerable<GroupUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<GroupCreateOrConnectWithoutParentInput>
    upsert?: Enumerable<GroupUpsertWithWhereUniqueWithoutParentInput>
    createMany?: GroupCreateManyParentInputEnvelope
    set?: Enumerable<GroupWhereUniqueInput>
    disconnect?: Enumerable<GroupWhereUniqueInput>
    delete?: Enumerable<GroupWhereUniqueInput>
    connect?: Enumerable<GroupWhereUniqueInput>
    update?: Enumerable<GroupUpdateWithWhereUniqueWithoutParentInput>
    updateMany?: Enumerable<GroupUpdateManyWithWhereWithoutParentInput>
    deleteMany?: Enumerable<GroupScalarWhereInput>
  }

  export type DeviceUpdateManyWithoutGroupNestedInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutGroupInput>, Enumerable<DeviceUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<DeviceUpsertWithWhereUniqueWithoutGroupInput>
    createMany?: DeviceCreateManyGroupInputEnvelope
    set?: Enumerable<DeviceWhereUniqueInput>
    disconnect?: Enumerable<DeviceWhereUniqueInput>
    delete?: Enumerable<DeviceWhereUniqueInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
    update?: Enumerable<DeviceUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<DeviceUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<DeviceScalarWhereInput>
  }

  export type GroupUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<Enumerable<GroupCreateWithoutParentInput>, Enumerable<GroupUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<GroupCreateOrConnectWithoutParentInput>
    upsert?: Enumerable<GroupUpsertWithWhereUniqueWithoutParentInput>
    createMany?: GroupCreateManyParentInputEnvelope
    set?: Enumerable<GroupWhereUniqueInput>
    disconnect?: Enumerable<GroupWhereUniqueInput>
    delete?: Enumerable<GroupWhereUniqueInput>
    connect?: Enumerable<GroupWhereUniqueInput>
    update?: Enumerable<GroupUpdateWithWhereUniqueWithoutParentInput>
    updateMany?: Enumerable<GroupUpdateManyWithWhereWithoutParentInput>
    deleteMany?: Enumerable<GroupScalarWhereInput>
  }

  export type DeviceUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutGroupInput>, Enumerable<DeviceUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<DeviceUpsertWithWhereUniqueWithoutGroupInput>
    createMany?: DeviceCreateManyGroupInputEnvelope
    set?: Enumerable<DeviceWhereUniqueInput>
    disconnect?: Enumerable<DeviceWhereUniqueInput>
    delete?: Enumerable<DeviceWhereUniqueInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
    update?: Enumerable<DeviceUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<DeviceUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<DeviceScalarWhereInput>
  }

  export type DeviceCreateNestedOneWithoutAlertsInput = {
    create?: XOR<DeviceCreateWithoutAlertsInput, DeviceUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutAlertsInput
    connect?: DeviceWhereUniqueInput
  }

  export type DeviceUpdateOneRequiredWithoutAlertsNestedInput = {
    create?: XOR<DeviceCreateWithoutAlertsInput, DeviceUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutAlertsInput
    upsert?: DeviceUpsertWithoutAlertsInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<DeviceUpdateWithoutAlertsInput, DeviceUncheckedUpdateWithoutAlertsInput>
  }

  export type DeviceProfileCreateNestedManyWithoutDecoderInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutDecoderInput>, Enumerable<DeviceProfileUncheckedCreateWithoutDecoderInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutDecoderInput>
    createMany?: DeviceProfileCreateManyDecoderInputEnvelope
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
  }

  export type DeviceProfileUncheckedCreateNestedManyWithoutDecoderInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutDecoderInput>, Enumerable<DeviceProfileUncheckedCreateWithoutDecoderInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutDecoderInput>
    createMany?: DeviceProfileCreateManyDecoderInputEnvelope
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
  }

  export type DeviceProfileUpdateManyWithoutDecoderNestedInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutDecoderInput>, Enumerable<DeviceProfileUncheckedCreateWithoutDecoderInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutDecoderInput>
    upsert?: Enumerable<DeviceProfileUpsertWithWhereUniqueWithoutDecoderInput>
    createMany?: DeviceProfileCreateManyDecoderInputEnvelope
    set?: Enumerable<DeviceProfileWhereUniqueInput>
    disconnect?: Enumerable<DeviceProfileWhereUniqueInput>
    delete?: Enumerable<DeviceProfileWhereUniqueInput>
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
    update?: Enumerable<DeviceProfileUpdateWithWhereUniqueWithoutDecoderInput>
    updateMany?: Enumerable<DeviceProfileUpdateManyWithWhereWithoutDecoderInput>
    deleteMany?: Enumerable<DeviceProfileScalarWhereInput>
  }

  export type DeviceProfileUncheckedUpdateManyWithoutDecoderNestedInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutDecoderInput>, Enumerable<DeviceProfileUncheckedCreateWithoutDecoderInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutDecoderInput>
    upsert?: Enumerable<DeviceProfileUpsertWithWhereUniqueWithoutDecoderInput>
    createMany?: DeviceProfileCreateManyDecoderInputEnvelope
    set?: Enumerable<DeviceProfileWhereUniqueInput>
    disconnect?: Enumerable<DeviceProfileWhereUniqueInput>
    delete?: Enumerable<DeviceProfileWhereUniqueInput>
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
    update?: Enumerable<DeviceProfileUpdateWithWhereUniqueWithoutDecoderInput>
    updateMany?: Enumerable<DeviceProfileUpdateManyWithWhereWithoutDecoderInput>
    deleteMany?: Enumerable<DeviceProfileScalarWhereInput>
  }

  export type DeviceProfileCreateNestedManyWithoutDeviceTypeInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutDeviceTypeInput>, Enumerable<DeviceProfileUncheckedCreateWithoutDeviceTypeInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutDeviceTypeInput>
    createMany?: DeviceProfileCreateManyDeviceTypeInputEnvelope
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
  }

  export type DeviceProfileUncheckedCreateNestedManyWithoutDeviceTypeInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutDeviceTypeInput>, Enumerable<DeviceProfileUncheckedCreateWithoutDeviceTypeInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutDeviceTypeInput>
    createMany?: DeviceProfileCreateManyDeviceTypeInputEnvelope
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
  }

  export type DeviceProfileUpdateManyWithoutDeviceTypeNestedInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutDeviceTypeInput>, Enumerable<DeviceProfileUncheckedCreateWithoutDeviceTypeInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutDeviceTypeInput>
    upsert?: Enumerable<DeviceProfileUpsertWithWhereUniqueWithoutDeviceTypeInput>
    createMany?: DeviceProfileCreateManyDeviceTypeInputEnvelope
    set?: Enumerable<DeviceProfileWhereUniqueInput>
    disconnect?: Enumerable<DeviceProfileWhereUniqueInput>
    delete?: Enumerable<DeviceProfileWhereUniqueInput>
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
    update?: Enumerable<DeviceProfileUpdateWithWhereUniqueWithoutDeviceTypeInput>
    updateMany?: Enumerable<DeviceProfileUpdateManyWithWhereWithoutDeviceTypeInput>
    deleteMany?: Enumerable<DeviceProfileScalarWhereInput>
  }

  export type DeviceProfileUncheckedUpdateManyWithoutDeviceTypeNestedInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutDeviceTypeInput>, Enumerable<DeviceProfileUncheckedCreateWithoutDeviceTypeInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutDeviceTypeInput>
    upsert?: Enumerable<DeviceProfileUpsertWithWhereUniqueWithoutDeviceTypeInput>
    createMany?: DeviceProfileCreateManyDeviceTypeInputEnvelope
    set?: Enumerable<DeviceProfileWhereUniqueInput>
    disconnect?: Enumerable<DeviceProfileWhereUniqueInput>
    delete?: Enumerable<DeviceProfileWhereUniqueInput>
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
    update?: Enumerable<DeviceProfileUpdateWithWhereUniqueWithoutDeviceTypeInput>
    updateMany?: Enumerable<DeviceProfileUpdateManyWithWhereWithoutDeviceTypeInput>
    deleteMany?: Enumerable<DeviceProfileScalarWhereInput>
  }

  export type DeviceCreateNestedManyWithoutFirmwareInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutFirmwareInput>, Enumerable<DeviceUncheckedCreateWithoutFirmwareInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutFirmwareInput>
    createMany?: DeviceCreateManyFirmwareInputEnvelope
    connect?: Enumerable<DeviceWhereUniqueInput>
  }

  export type DeviceUncheckedCreateNestedManyWithoutFirmwareInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutFirmwareInput>, Enumerable<DeviceUncheckedCreateWithoutFirmwareInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutFirmwareInput>
    createMany?: DeviceCreateManyFirmwareInputEnvelope
    connect?: Enumerable<DeviceWhereUniqueInput>
  }

  export type DeviceUpdateManyWithoutFirmwareNestedInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutFirmwareInput>, Enumerable<DeviceUncheckedCreateWithoutFirmwareInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutFirmwareInput>
    upsert?: Enumerable<DeviceUpsertWithWhereUniqueWithoutFirmwareInput>
    createMany?: DeviceCreateManyFirmwareInputEnvelope
    set?: Enumerable<DeviceWhereUniqueInput>
    disconnect?: Enumerable<DeviceWhereUniqueInput>
    delete?: Enumerable<DeviceWhereUniqueInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
    update?: Enumerable<DeviceUpdateWithWhereUniqueWithoutFirmwareInput>
    updateMany?: Enumerable<DeviceUpdateManyWithWhereWithoutFirmwareInput>
    deleteMany?: Enumerable<DeviceScalarWhereInput>
  }

  export type DeviceUncheckedUpdateManyWithoutFirmwareNestedInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutFirmwareInput>, Enumerable<DeviceUncheckedCreateWithoutFirmwareInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutFirmwareInput>
    upsert?: Enumerable<DeviceUpsertWithWhereUniqueWithoutFirmwareInput>
    createMany?: DeviceCreateManyFirmwareInputEnvelope
    set?: Enumerable<DeviceWhereUniqueInput>
    disconnect?: Enumerable<DeviceWhereUniqueInput>
    delete?: Enumerable<DeviceWhereUniqueInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
    update?: Enumerable<DeviceUpdateWithWhereUniqueWithoutFirmwareInput>
    updateMany?: Enumerable<DeviceUpdateManyWithWhereWithoutFirmwareInput>
    deleteMany?: Enumerable<DeviceScalarWhereInput>
  }

  export type DeviceProfileCreateNestedManyWithoutProtocolInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutProtocolInput>, Enumerable<DeviceProfileUncheckedCreateWithoutProtocolInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutProtocolInput>
    createMany?: DeviceProfileCreateManyProtocolInputEnvelope
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
  }

  export type DeviceProfileUncheckedCreateNestedManyWithoutProtocolInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutProtocolInput>, Enumerable<DeviceProfileUncheckedCreateWithoutProtocolInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutProtocolInput>
    createMany?: DeviceProfileCreateManyProtocolInputEnvelope
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
  }

  export type DeviceProfileUpdateManyWithoutProtocolNestedInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutProtocolInput>, Enumerable<DeviceProfileUncheckedCreateWithoutProtocolInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutProtocolInput>
    upsert?: Enumerable<DeviceProfileUpsertWithWhereUniqueWithoutProtocolInput>
    createMany?: DeviceProfileCreateManyProtocolInputEnvelope
    set?: Enumerable<DeviceProfileWhereUniqueInput>
    disconnect?: Enumerable<DeviceProfileWhereUniqueInput>
    delete?: Enumerable<DeviceProfileWhereUniqueInput>
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
    update?: Enumerable<DeviceProfileUpdateWithWhereUniqueWithoutProtocolInput>
    updateMany?: Enumerable<DeviceProfileUpdateManyWithWhereWithoutProtocolInput>
    deleteMany?: Enumerable<DeviceProfileScalarWhereInput>
  }

  export type DeviceProfileUncheckedUpdateManyWithoutProtocolNestedInput = {
    create?: XOR<Enumerable<DeviceProfileCreateWithoutProtocolInput>, Enumerable<DeviceProfileUncheckedCreateWithoutProtocolInput>>
    connectOrCreate?: Enumerable<DeviceProfileCreateOrConnectWithoutProtocolInput>
    upsert?: Enumerable<DeviceProfileUpsertWithWhereUniqueWithoutProtocolInput>
    createMany?: DeviceProfileCreateManyProtocolInputEnvelope
    set?: Enumerable<DeviceProfileWhereUniqueInput>
    disconnect?: Enumerable<DeviceProfileWhereUniqueInput>
    delete?: Enumerable<DeviceProfileWhereUniqueInput>
    connect?: Enumerable<DeviceProfileWhereUniqueInput>
    update?: Enumerable<DeviceProfileUpdateWithWhereUniqueWithoutProtocolInput>
    updateMany?: Enumerable<DeviceProfileUpdateManyWithWhereWithoutProtocolInput>
    deleteMany?: Enumerable<DeviceProfileScalarWhereInput>
  }

  export type DeviceTypeCreateNestedOneWithoutDeviceProfilesInput = {
    create?: XOR<DeviceTypeCreateWithoutDeviceProfilesInput, DeviceTypeUncheckedCreateWithoutDeviceProfilesInput>
    connectOrCreate?: DeviceTypeCreateOrConnectWithoutDeviceProfilesInput
    connect?: DeviceTypeWhereUniqueInput
  }

  export type DeviceCreateNestedManyWithoutDeviceProfileInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutDeviceProfileInput>, Enumerable<DeviceUncheckedCreateWithoutDeviceProfileInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutDeviceProfileInput>
    createMany?: DeviceCreateManyDeviceProfileInputEnvelope
    connect?: Enumerable<DeviceWhereUniqueInput>
  }

  export type ProtocolCreateNestedOneWithoutDeviceProfilesInput = {
    create?: XOR<ProtocolCreateWithoutDeviceProfilesInput, ProtocolUncheckedCreateWithoutDeviceProfilesInput>
    connectOrCreate?: ProtocolCreateOrConnectWithoutDeviceProfilesInput
    connect?: ProtocolWhereUniqueInput
  }

  export type DecoderCreateNestedOneWithoutDeviceProfileInput = {
    create?: XOR<DecoderCreateWithoutDeviceProfileInput, DecoderUncheckedCreateWithoutDeviceProfileInput>
    connectOrCreate?: DecoderCreateOrConnectWithoutDeviceProfileInput
    connect?: DecoderWhereUniqueInput
  }

  export type DeviceUncheckedCreateNestedManyWithoutDeviceProfileInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutDeviceProfileInput>, Enumerable<DeviceUncheckedCreateWithoutDeviceProfileInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutDeviceProfileInput>
    createMany?: DeviceCreateManyDeviceProfileInputEnvelope
    connect?: Enumerable<DeviceWhereUniqueInput>
  }

  export type NullableEnumTypeCredentialFieldUpdateOperationsInput = {
    set?: TypeCredential | null
  }

  export type DeviceTypeUpdateOneWithoutDeviceProfilesNestedInput = {
    create?: XOR<DeviceTypeCreateWithoutDeviceProfilesInput, DeviceTypeUncheckedCreateWithoutDeviceProfilesInput>
    connectOrCreate?: DeviceTypeCreateOrConnectWithoutDeviceProfilesInput
    upsert?: DeviceTypeUpsertWithoutDeviceProfilesInput
    disconnect?: boolean
    delete?: boolean
    connect?: DeviceTypeWhereUniqueInput
    update?: XOR<DeviceTypeUpdateWithoutDeviceProfilesInput, DeviceTypeUncheckedUpdateWithoutDeviceProfilesInput>
  }

  export type DeviceUpdateManyWithoutDeviceProfileNestedInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutDeviceProfileInput>, Enumerable<DeviceUncheckedCreateWithoutDeviceProfileInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutDeviceProfileInput>
    upsert?: Enumerable<DeviceUpsertWithWhereUniqueWithoutDeviceProfileInput>
    createMany?: DeviceCreateManyDeviceProfileInputEnvelope
    set?: Enumerable<DeviceWhereUniqueInput>
    disconnect?: Enumerable<DeviceWhereUniqueInput>
    delete?: Enumerable<DeviceWhereUniqueInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
    update?: Enumerable<DeviceUpdateWithWhereUniqueWithoutDeviceProfileInput>
    updateMany?: Enumerable<DeviceUpdateManyWithWhereWithoutDeviceProfileInput>
    deleteMany?: Enumerable<DeviceScalarWhereInput>
  }

  export type ProtocolUpdateOneWithoutDeviceProfilesNestedInput = {
    create?: XOR<ProtocolCreateWithoutDeviceProfilesInput, ProtocolUncheckedCreateWithoutDeviceProfilesInput>
    connectOrCreate?: ProtocolCreateOrConnectWithoutDeviceProfilesInput
    upsert?: ProtocolUpsertWithoutDeviceProfilesInput
    disconnect?: boolean
    delete?: boolean
    connect?: ProtocolWhereUniqueInput
    update?: XOR<ProtocolUpdateWithoutDeviceProfilesInput, ProtocolUncheckedUpdateWithoutDeviceProfilesInput>
  }

  export type DecoderUpdateOneWithoutDeviceProfileNestedInput = {
    create?: XOR<DecoderCreateWithoutDeviceProfileInput, DecoderUncheckedCreateWithoutDeviceProfileInput>
    connectOrCreate?: DecoderCreateOrConnectWithoutDeviceProfileInput
    upsert?: DecoderUpsertWithoutDeviceProfileInput
    disconnect?: boolean
    delete?: boolean
    connect?: DecoderWhereUniqueInput
    update?: XOR<DecoderUpdateWithoutDeviceProfileInput, DecoderUncheckedUpdateWithoutDeviceProfileInput>
  }

  export type DeviceUncheckedUpdateManyWithoutDeviceProfileNestedInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutDeviceProfileInput>, Enumerable<DeviceUncheckedCreateWithoutDeviceProfileInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutDeviceProfileInput>
    upsert?: Enumerable<DeviceUpsertWithWhereUniqueWithoutDeviceProfileInput>
    createMany?: DeviceCreateManyDeviceProfileInputEnvelope
    set?: Enumerable<DeviceWhereUniqueInput>
    disconnect?: Enumerable<DeviceWhereUniqueInput>
    delete?: Enumerable<DeviceWhereUniqueInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
    update?: Enumerable<DeviceUpdateWithWhereUniqueWithoutDeviceProfileInput>
    updateMany?: Enumerable<DeviceUpdateManyWithWhereWithoutDeviceProfileInput>
    deleteMany?: Enumerable<DeviceScalarWhereInput>
  }

  export type DeviceCreateNestedOneWithoutCredentialInput = {
    create?: XOR<DeviceCreateWithoutCredentialInput, DeviceUncheckedCreateWithoutCredentialInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutCredentialInput
    connect?: DeviceWhereUniqueInput
  }

  export type DeviceUncheckedCreateNestedOneWithoutCredentialInput = {
    create?: XOR<DeviceCreateWithoutCredentialInput, DeviceUncheckedCreateWithoutCredentialInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutCredentialInput
    connect?: DeviceWhereUniqueInput
  }

  export type EnumTypeCredentialFieldUpdateOperationsInput = {
    set?: TypeCredential
  }

  export type DeviceUpdateOneWithoutCredentialNestedInput = {
    create?: XOR<DeviceCreateWithoutCredentialInput, DeviceUncheckedCreateWithoutCredentialInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutCredentialInput
    upsert?: DeviceUpsertWithoutCredentialInput
    disconnect?: boolean
    delete?: boolean
    connect?: DeviceWhereUniqueInput
    update?: XOR<DeviceUpdateWithoutCredentialInput, DeviceUncheckedUpdateWithoutCredentialInput>
  }

  export type DeviceUncheckedUpdateOneWithoutCredentialNestedInput = {
    create?: XOR<DeviceCreateWithoutCredentialInput, DeviceUncheckedCreateWithoutCredentialInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutCredentialInput
    upsert?: DeviceUpsertWithoutCredentialInput
    disconnect?: boolean
    delete?: boolean
    connect?: DeviceWhereUniqueInput
    update?: XOR<DeviceUpdateWithoutCredentialInput, DeviceUncheckedUpdateWithoutCredentialInput>
  }

  export type DeviceCreateNestedManyWithoutTagsInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutTagsInput>, Enumerable<DeviceUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutTagsInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
  }

  export type DeviceUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutTagsInput>, Enumerable<DeviceUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutTagsInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
  }

  export type DeviceUpdateManyWithoutTagsNestedInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutTagsInput>, Enumerable<DeviceUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutTagsInput>
    upsert?: Enumerable<DeviceUpsertWithWhereUniqueWithoutTagsInput>
    set?: Enumerable<DeviceWhereUniqueInput>
    disconnect?: Enumerable<DeviceWhereUniqueInput>
    delete?: Enumerable<DeviceWhereUniqueInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
    update?: Enumerable<DeviceUpdateWithWhereUniqueWithoutTagsInput>
    updateMany?: Enumerable<DeviceUpdateManyWithWhereWithoutTagsInput>
    deleteMany?: Enumerable<DeviceScalarWhereInput>
  }

  export type DeviceUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<Enumerable<DeviceCreateWithoutTagsInput>, Enumerable<DeviceUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<DeviceCreateOrConnectWithoutTagsInput>
    upsert?: Enumerable<DeviceUpsertWithWhereUniqueWithoutTagsInput>
    set?: Enumerable<DeviceWhereUniqueInput>
    disconnect?: Enumerable<DeviceWhereUniqueInput>
    delete?: Enumerable<DeviceWhereUniqueInput>
    connect?: Enumerable<DeviceWhereUniqueInput>
    update?: Enumerable<DeviceUpdateWithWhereUniqueWithoutTagsInput>
    updateMany?: Enumerable<DeviceUpdateManyWithWhereWithoutTagsInput>
    deleteMany?: Enumerable<DeviceScalarWhereInput>
  }

  export type CredentialCreateNestedOneWithoutDeviceInput = {
    create?: XOR<CredentialCreateWithoutDeviceInput, CredentialUncheckedCreateWithoutDeviceInput>
    connectOrCreate?: CredentialCreateOrConnectWithoutDeviceInput
    connect?: CredentialWhereUniqueInput
  }

  export type AttributeCreateNestedManyWithoutDeviceInput = {
    create?: XOR<Enumerable<AttributeCreateWithoutDeviceInput>, Enumerable<AttributeUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<AttributeCreateOrConnectWithoutDeviceInput>
    createMany?: AttributeCreateManyDeviceInputEnvelope
    connect?: Enumerable<AttributeWhereUniqueInput>
  }

  export type LastTelemetryCreateNestedManyWithoutDeviceInput = {
    create?: XOR<Enumerable<LastTelemetryCreateWithoutDeviceInput>, Enumerable<LastTelemetryUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<LastTelemetryCreateOrConnectWithoutDeviceInput>
    createMany?: LastTelemetryCreateManyDeviceInputEnvelope
    connect?: Enumerable<LastTelemetryWhereUniqueInput>
  }

  export type DeviceProfileCreateNestedOneWithoutDevicesInput = {
    create?: XOR<DeviceProfileCreateWithoutDevicesInput, DeviceProfileUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: DeviceProfileCreateOrConnectWithoutDevicesInput
    connect?: DeviceProfileWhereUniqueInput
  }

  export type FirmwareCreateNestedOneWithoutDeviceInput = {
    create?: XOR<FirmwareCreateWithoutDeviceInput, FirmwareUncheckedCreateWithoutDeviceInput>
    connectOrCreate?: FirmwareCreateOrConnectWithoutDeviceInput
    connect?: FirmwareWhereUniqueInput
  }

  export type TagCreateNestedManyWithoutDevicesInput = {
    create?: XOR<Enumerable<TagCreateWithoutDevicesInput>, Enumerable<TagUncheckedCreateWithoutDevicesInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutDevicesInput>
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type VirtualDeviceCreateNestedOneWithoutDevicesInput = {
    create?: XOR<VirtualDeviceCreateWithoutDevicesInput, VirtualDeviceUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: VirtualDeviceCreateOrConnectWithoutDevicesInput
    connect?: VirtualDeviceWhereUniqueInput
  }

  export type AlertCreateNestedManyWithoutDeviceInput = {
    create?: XOR<Enumerable<AlertCreateWithoutDeviceInput>, Enumerable<AlertUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<AlertCreateOrConnectWithoutDeviceInput>
    createMany?: AlertCreateManyDeviceInputEnvelope
    connect?: Enumerable<AlertWhereUniqueInput>
  }

  export type GroupCreateNestedOneWithoutDevicesInput = {
    create?: XOR<GroupCreateWithoutDevicesInput, GroupUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: GroupCreateOrConnectWithoutDevicesInput
    connect?: GroupWhereUniqueInput
  }

  export type HistoryCreateNestedManyWithoutDeviceInput = {
    create?: XOR<Enumerable<HistoryCreateWithoutDeviceInput>, Enumerable<HistoryUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<HistoryCreateOrConnectWithoutDeviceInput>
    createMany?: HistoryCreateManyDeviceInputEnvelope
    connect?: Enumerable<HistoryWhereUniqueInput>
  }

  export type AttributeUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<Enumerable<AttributeCreateWithoutDeviceInput>, Enumerable<AttributeUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<AttributeCreateOrConnectWithoutDeviceInput>
    createMany?: AttributeCreateManyDeviceInputEnvelope
    connect?: Enumerable<AttributeWhereUniqueInput>
  }

  export type LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<Enumerable<LastTelemetryCreateWithoutDeviceInput>, Enumerable<LastTelemetryUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<LastTelemetryCreateOrConnectWithoutDeviceInput>
    createMany?: LastTelemetryCreateManyDeviceInputEnvelope
    connect?: Enumerable<LastTelemetryWhereUniqueInput>
  }

  export type TagUncheckedCreateNestedManyWithoutDevicesInput = {
    create?: XOR<Enumerable<TagCreateWithoutDevicesInput>, Enumerable<TagUncheckedCreateWithoutDevicesInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutDevicesInput>
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type AlertUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<Enumerable<AlertCreateWithoutDeviceInput>, Enumerable<AlertUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<AlertCreateOrConnectWithoutDeviceInput>
    createMany?: AlertCreateManyDeviceInputEnvelope
    connect?: Enumerable<AlertWhereUniqueInput>
  }

  export type HistoryUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<Enumerable<HistoryCreateWithoutDeviceInput>, Enumerable<HistoryUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<HistoryCreateOrConnectWithoutDeviceInput>
    createMany?: HistoryCreateManyDeviceInputEnvelope
    connect?: Enumerable<HistoryWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CredentialUpdateOneWithoutDeviceNestedInput = {
    create?: XOR<CredentialCreateWithoutDeviceInput, CredentialUncheckedCreateWithoutDeviceInput>
    connectOrCreate?: CredentialCreateOrConnectWithoutDeviceInput
    upsert?: CredentialUpsertWithoutDeviceInput
    disconnect?: boolean
    delete?: boolean
    connect?: CredentialWhereUniqueInput
    update?: XOR<CredentialUpdateWithoutDeviceInput, CredentialUncheckedUpdateWithoutDeviceInput>
  }

  export type AttributeUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<Enumerable<AttributeCreateWithoutDeviceInput>, Enumerable<AttributeUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<AttributeCreateOrConnectWithoutDeviceInput>
    upsert?: Enumerable<AttributeUpsertWithWhereUniqueWithoutDeviceInput>
    createMany?: AttributeCreateManyDeviceInputEnvelope
    set?: Enumerable<AttributeWhereUniqueInput>
    disconnect?: Enumerable<AttributeWhereUniqueInput>
    delete?: Enumerable<AttributeWhereUniqueInput>
    connect?: Enumerable<AttributeWhereUniqueInput>
    update?: Enumerable<AttributeUpdateWithWhereUniqueWithoutDeviceInput>
    updateMany?: Enumerable<AttributeUpdateManyWithWhereWithoutDeviceInput>
    deleteMany?: Enumerable<AttributeScalarWhereInput>
  }

  export type LastTelemetryUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<Enumerable<LastTelemetryCreateWithoutDeviceInput>, Enumerable<LastTelemetryUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<LastTelemetryCreateOrConnectWithoutDeviceInput>
    upsert?: Enumerable<LastTelemetryUpsertWithWhereUniqueWithoutDeviceInput>
    createMany?: LastTelemetryCreateManyDeviceInputEnvelope
    set?: Enumerable<LastTelemetryWhereUniqueInput>
    disconnect?: Enumerable<LastTelemetryWhereUniqueInput>
    delete?: Enumerable<LastTelemetryWhereUniqueInput>
    connect?: Enumerable<LastTelemetryWhereUniqueInput>
    update?: Enumerable<LastTelemetryUpdateWithWhereUniqueWithoutDeviceInput>
    updateMany?: Enumerable<LastTelemetryUpdateManyWithWhereWithoutDeviceInput>
    deleteMany?: Enumerable<LastTelemetryScalarWhereInput>
  }

  export type DeviceProfileUpdateOneWithoutDevicesNestedInput = {
    create?: XOR<DeviceProfileCreateWithoutDevicesInput, DeviceProfileUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: DeviceProfileCreateOrConnectWithoutDevicesInput
    upsert?: DeviceProfileUpsertWithoutDevicesInput
    disconnect?: boolean
    delete?: boolean
    connect?: DeviceProfileWhereUniqueInput
    update?: XOR<DeviceProfileUpdateWithoutDevicesInput, DeviceProfileUncheckedUpdateWithoutDevicesInput>
  }

  export type FirmwareUpdateOneWithoutDeviceNestedInput = {
    create?: XOR<FirmwareCreateWithoutDeviceInput, FirmwareUncheckedCreateWithoutDeviceInput>
    connectOrCreate?: FirmwareCreateOrConnectWithoutDeviceInput
    upsert?: FirmwareUpsertWithoutDeviceInput
    disconnect?: boolean
    delete?: boolean
    connect?: FirmwareWhereUniqueInput
    update?: XOR<FirmwareUpdateWithoutDeviceInput, FirmwareUncheckedUpdateWithoutDeviceInput>
  }

  export type TagUpdateManyWithoutDevicesNestedInput = {
    create?: XOR<Enumerable<TagCreateWithoutDevicesInput>, Enumerable<TagUncheckedCreateWithoutDevicesInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutDevicesInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutDevicesInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    connect?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutDevicesInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutDevicesInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type VirtualDeviceUpdateOneWithoutDevicesNestedInput = {
    create?: XOR<VirtualDeviceCreateWithoutDevicesInput, VirtualDeviceUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: VirtualDeviceCreateOrConnectWithoutDevicesInput
    upsert?: VirtualDeviceUpsertWithoutDevicesInput
    disconnect?: boolean
    delete?: boolean
    connect?: VirtualDeviceWhereUniqueInput
    update?: XOR<VirtualDeviceUpdateWithoutDevicesInput, VirtualDeviceUncheckedUpdateWithoutDevicesInput>
  }

  export type AlertUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<Enumerable<AlertCreateWithoutDeviceInput>, Enumerable<AlertUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<AlertCreateOrConnectWithoutDeviceInput>
    upsert?: Enumerable<AlertUpsertWithWhereUniqueWithoutDeviceInput>
    createMany?: AlertCreateManyDeviceInputEnvelope
    set?: Enumerable<AlertWhereUniqueInput>
    disconnect?: Enumerable<AlertWhereUniqueInput>
    delete?: Enumerable<AlertWhereUniqueInput>
    connect?: Enumerable<AlertWhereUniqueInput>
    update?: Enumerable<AlertUpdateWithWhereUniqueWithoutDeviceInput>
    updateMany?: Enumerable<AlertUpdateManyWithWhereWithoutDeviceInput>
    deleteMany?: Enumerable<AlertScalarWhereInput>
  }

  export type GroupUpdateOneWithoutDevicesNestedInput = {
    create?: XOR<GroupCreateWithoutDevicesInput, GroupUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: GroupCreateOrConnectWithoutDevicesInput
    upsert?: GroupUpsertWithoutDevicesInput
    disconnect?: boolean
    delete?: boolean
    connect?: GroupWhereUniqueInput
    update?: XOR<GroupUpdateWithoutDevicesInput, GroupUncheckedUpdateWithoutDevicesInput>
  }

  export type HistoryUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<Enumerable<HistoryCreateWithoutDeviceInput>, Enumerable<HistoryUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<HistoryCreateOrConnectWithoutDeviceInput>
    upsert?: Enumerable<HistoryUpsertWithWhereUniqueWithoutDeviceInput>
    createMany?: HistoryCreateManyDeviceInputEnvelope
    set?: Enumerable<HistoryWhereUniqueInput>
    disconnect?: Enumerable<HistoryWhereUniqueInput>
    delete?: Enumerable<HistoryWhereUniqueInput>
    connect?: Enumerable<HistoryWhereUniqueInput>
    update?: Enumerable<HistoryUpdateWithWhereUniqueWithoutDeviceInput>
    updateMany?: Enumerable<HistoryUpdateManyWithWhereWithoutDeviceInput>
    deleteMany?: Enumerable<HistoryScalarWhereInput>
  }

  export type AttributeUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<Enumerable<AttributeCreateWithoutDeviceInput>, Enumerable<AttributeUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<AttributeCreateOrConnectWithoutDeviceInput>
    upsert?: Enumerable<AttributeUpsertWithWhereUniqueWithoutDeviceInput>
    createMany?: AttributeCreateManyDeviceInputEnvelope
    set?: Enumerable<AttributeWhereUniqueInput>
    disconnect?: Enumerable<AttributeWhereUniqueInput>
    delete?: Enumerable<AttributeWhereUniqueInput>
    connect?: Enumerable<AttributeWhereUniqueInput>
    update?: Enumerable<AttributeUpdateWithWhereUniqueWithoutDeviceInput>
    updateMany?: Enumerable<AttributeUpdateManyWithWhereWithoutDeviceInput>
    deleteMany?: Enumerable<AttributeScalarWhereInput>
  }

  export type LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<Enumerable<LastTelemetryCreateWithoutDeviceInput>, Enumerable<LastTelemetryUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<LastTelemetryCreateOrConnectWithoutDeviceInput>
    upsert?: Enumerable<LastTelemetryUpsertWithWhereUniqueWithoutDeviceInput>
    createMany?: LastTelemetryCreateManyDeviceInputEnvelope
    set?: Enumerable<LastTelemetryWhereUniqueInput>
    disconnect?: Enumerable<LastTelemetryWhereUniqueInput>
    delete?: Enumerable<LastTelemetryWhereUniqueInput>
    connect?: Enumerable<LastTelemetryWhereUniqueInput>
    update?: Enumerable<LastTelemetryUpdateWithWhereUniqueWithoutDeviceInput>
    updateMany?: Enumerable<LastTelemetryUpdateManyWithWhereWithoutDeviceInput>
    deleteMany?: Enumerable<LastTelemetryScalarWhereInput>
  }

  export type TagUncheckedUpdateManyWithoutDevicesNestedInput = {
    create?: XOR<Enumerable<TagCreateWithoutDevicesInput>, Enumerable<TagUncheckedCreateWithoutDevicesInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutDevicesInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutDevicesInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    connect?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutDevicesInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutDevicesInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type AlertUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<Enumerable<AlertCreateWithoutDeviceInput>, Enumerable<AlertUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<AlertCreateOrConnectWithoutDeviceInput>
    upsert?: Enumerable<AlertUpsertWithWhereUniqueWithoutDeviceInput>
    createMany?: AlertCreateManyDeviceInputEnvelope
    set?: Enumerable<AlertWhereUniqueInput>
    disconnect?: Enumerable<AlertWhereUniqueInput>
    delete?: Enumerable<AlertWhereUniqueInput>
    connect?: Enumerable<AlertWhereUniqueInput>
    update?: Enumerable<AlertUpdateWithWhereUniqueWithoutDeviceInput>
    updateMany?: Enumerable<AlertUpdateManyWithWhereWithoutDeviceInput>
    deleteMany?: Enumerable<AlertScalarWhereInput>
  }

  export type HistoryUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<Enumerable<HistoryCreateWithoutDeviceInput>, Enumerable<HistoryUncheckedCreateWithoutDeviceInput>>
    connectOrCreate?: Enumerable<HistoryCreateOrConnectWithoutDeviceInput>
    upsert?: Enumerable<HistoryUpsertWithWhereUniqueWithoutDeviceInput>
    createMany?: HistoryCreateManyDeviceInputEnvelope
    set?: Enumerable<HistoryWhereUniqueInput>
    disconnect?: Enumerable<HistoryWhereUniqueInput>
    delete?: Enumerable<HistoryWhereUniqueInput>
    connect?: Enumerable<HistoryWhereUniqueInput>
    update?: Enumerable<HistoryUpdateWithWhereUniqueWithoutDeviceInput>
    updateMany?: Enumerable<HistoryUpdateManyWithWhereWithoutDeviceInput>
    deleteMany?: Enumerable<HistoryScalarWhereInput>
  }

  export type DeviceCreateNestedOneWithoutAttributesInput = {
    create?: XOR<DeviceCreateWithoutAttributesInput, DeviceUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutAttributesInput
    connect?: DeviceWhereUniqueInput
  }

  export type DeviceUpdateOneRequiredWithoutAttributesNestedInput = {
    create?: XOR<DeviceCreateWithoutAttributesInput, DeviceUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutAttributesInput
    upsert?: DeviceUpsertWithoutAttributesInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<DeviceUpdateWithoutAttributesInput, DeviceUncheckedUpdateWithoutAttributesInput>
  }

  export type DeviceCreateNestedOneWithoutLastTelemetriesInput = {
    create?: XOR<DeviceCreateWithoutLastTelemetriesInput, DeviceUncheckedCreateWithoutLastTelemetriesInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutLastTelemetriesInput
    connect?: DeviceWhereUniqueInput
  }

  export type DeviceUpdateOneRequiredWithoutLastTelemetriesNestedInput = {
    create?: XOR<DeviceCreateWithoutLastTelemetriesInput, DeviceUncheckedCreateWithoutLastTelemetriesInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutLastTelemetriesInput
    upsert?: DeviceUpsertWithoutLastTelemetriesInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<DeviceUpdateWithoutLastTelemetriesInput, DeviceUncheckedUpdateWithoutLastTelemetriesInput>
  }

  export type DeviceCreateNestedOneWithoutHistoryInput = {
    create?: XOR<DeviceCreateWithoutHistoryInput, DeviceUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutHistoryInput
    connect?: DeviceWhereUniqueInput
  }

  export type DeviceUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: XOR<DeviceCreateWithoutHistoryInput, DeviceUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutHistoryInput
    upsert?: DeviceUpsertWithoutHistoryInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<DeviceUpdateWithoutHistoryInput, DeviceUncheckedUpdateWithoutHistoryInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedFloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type NestedEnumTypeCredentialNullableFilter = {
    equals?: TypeCredential | null
    in?: Enumerable<TypeCredential> | null
    notIn?: Enumerable<TypeCredential> | null
    not?: NestedEnumTypeCredentialNullableFilter | TypeCredential | null
  }

  export type NestedEnumTypeCredentialNullableWithAggregatesFilter = {
    equals?: TypeCredential | null
    in?: Enumerable<TypeCredential> | null
    notIn?: Enumerable<TypeCredential> | null
    not?: NestedEnumTypeCredentialNullableWithAggregatesFilter | TypeCredential | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumTypeCredentialNullableFilter
    _max?: NestedEnumTypeCredentialNullableFilter
  }

  export type NestedEnumTypeCredentialFilter = {
    equals?: TypeCredential
    in?: Enumerable<TypeCredential>
    notIn?: Enumerable<TypeCredential>
    not?: NestedEnumTypeCredentialFilter | TypeCredential
  }

  export type NestedEnumTypeCredentialWithAggregatesFilter = {
    equals?: TypeCredential
    in?: Enumerable<TypeCredential>
    notIn?: Enumerable<TypeCredential>
    not?: NestedEnumTypeCredentialWithAggregatesFilter | TypeCredential
    _count?: NestedIntFilter
    _min?: NestedEnumTypeCredentialFilter
    _max?: NestedEnumTypeCredentialFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DeviceCreateWithoutVirtualDeviceInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    credential?: CredentialCreateNestedOneWithoutDeviceInput
    attributes?: AttributeCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryCreateNestedManyWithoutDeviceInput
    deviceProfile?: DeviceProfileCreateNestedOneWithoutDevicesInput
    firmware?: FirmwareCreateNestedOneWithoutDeviceInput
    tags?: TagCreateNestedManyWithoutDevicesInput
    alerts?: AlertCreateNestedManyWithoutDeviceInput
    group?: GroupCreateNestedOneWithoutDevicesInput
    history?: HistoryCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutVirtualDeviceInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId?: number | null
    tenantId?: number | null
    attributes?: AttributeUncheckedCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput
    tags?: TagUncheckedCreateNestedManyWithoutDevicesInput
    alerts?: AlertUncheckedCreateNestedManyWithoutDeviceInput
    history?: HistoryUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutVirtualDeviceInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutVirtualDeviceInput, DeviceUncheckedCreateWithoutVirtualDeviceInput>
  }

  export type DeviceCreateManyVirtualDeviceInputEnvelope = {
    data: Enumerable<DeviceCreateManyVirtualDeviceInput>
    skipDuplicates?: boolean
  }

  export type DeviceUpsertWithWhereUniqueWithoutVirtualDeviceInput = {
    where: DeviceWhereUniqueInput
    update: XOR<DeviceUpdateWithoutVirtualDeviceInput, DeviceUncheckedUpdateWithoutVirtualDeviceInput>
    create: XOR<DeviceCreateWithoutVirtualDeviceInput, DeviceUncheckedCreateWithoutVirtualDeviceInput>
  }

  export type DeviceUpdateWithWhereUniqueWithoutVirtualDeviceInput = {
    where: DeviceWhereUniqueInput
    data: XOR<DeviceUpdateWithoutVirtualDeviceInput, DeviceUncheckedUpdateWithoutVirtualDeviceInput>
  }

  export type DeviceUpdateManyWithWhereWithoutVirtualDeviceInput = {
    where: DeviceScalarWhereInput
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyWithoutDevicesInput>
  }

  export type DeviceScalarWhereInput = {
    AND?: Enumerable<DeviceScalarWhereInput>
    OR?: Enumerable<DeviceScalarWhereInput>
    NOT?: Enumerable<DeviceScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    description?: StringNullableFilter | string | null
    serial?: StringFilter | string
    isPassive?: BoolFilter | boolean
    isOnline?: BoolFilter | boolean
    isdecoded?: BoolFilter | boolean
    credentialId?: IntNullableFilter | number | null
    configuration?: StringNullableFilter | string | null
    deviceProfileId?: IntNullableFilter | number | null
    firmwareId?: IntNullableFilter | number | null
    ip?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    virtualDeviceId?: IntNullableFilter | number | null
    groupId?: IntNullableFilter | number | null
    tenantId?: IntNullableFilter | number | null
  }

  export type GroupCreateWithoutSubgroupsInput = {
    name: string
    type?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    lat?: number | null
    lng?: number | null
    ip?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    parent?: GroupCreateNestedOneWithoutSubgroupsInput
    devices?: DeviceCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutSubgroupsInput = {
    id?: number
    name: string
    type?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId?: number | null
    location?: string | null
    lat?: number | null
    lng?: number | null
    ip?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    devices?: DeviceUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutSubgroupsInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutSubgroupsInput, GroupUncheckedCreateWithoutSubgroupsInput>
  }

  export type GroupCreateWithoutParentInput = {
    name: string
    type?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    lat?: number | null
    lng?: number | null
    ip?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    subgroups?: GroupCreateNestedManyWithoutParentInput
    devices?: DeviceCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutParentInput = {
    id?: number
    name: string
    type?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    lat?: number | null
    lng?: number | null
    ip?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    subgroups?: GroupUncheckedCreateNestedManyWithoutParentInput
    devices?: DeviceUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutParentInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutParentInput, GroupUncheckedCreateWithoutParentInput>
  }

  export type GroupCreateManyParentInputEnvelope = {
    data: Enumerable<GroupCreateManyParentInput>
    skipDuplicates?: boolean
  }

  export type DeviceCreateWithoutGroupInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    credential?: CredentialCreateNestedOneWithoutDeviceInput
    attributes?: AttributeCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryCreateNestedManyWithoutDeviceInput
    deviceProfile?: DeviceProfileCreateNestedOneWithoutDevicesInput
    firmware?: FirmwareCreateNestedOneWithoutDeviceInput
    tags?: TagCreateNestedManyWithoutDevicesInput
    VirtualDevice?: VirtualDeviceCreateNestedOneWithoutDevicesInput
    alerts?: AlertCreateNestedManyWithoutDeviceInput
    history?: HistoryCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutGroupInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    tenantId?: number | null
    attributes?: AttributeUncheckedCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput
    tags?: TagUncheckedCreateNestedManyWithoutDevicesInput
    alerts?: AlertUncheckedCreateNestedManyWithoutDeviceInput
    history?: HistoryUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutGroupInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutGroupInput, DeviceUncheckedCreateWithoutGroupInput>
  }

  export type DeviceCreateManyGroupInputEnvelope = {
    data: Enumerable<DeviceCreateManyGroupInput>
    skipDuplicates?: boolean
  }

  export type GroupUpsertWithoutSubgroupsInput = {
    update: XOR<GroupUpdateWithoutSubgroupsInput, GroupUncheckedUpdateWithoutSubgroupsInput>
    create: XOR<GroupCreateWithoutSubgroupsInput, GroupUncheckedCreateWithoutSubgroupsInput>
  }

  export type GroupUpdateWithoutSubgroupsInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    parent?: GroupUpdateOneWithoutSubgroupsNestedInput
    devices?: DeviceUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutSubgroupsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    devices?: DeviceUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupUpsertWithWhereUniqueWithoutParentInput = {
    where: GroupWhereUniqueInput
    update: XOR<GroupUpdateWithoutParentInput, GroupUncheckedUpdateWithoutParentInput>
    create: XOR<GroupCreateWithoutParentInput, GroupUncheckedCreateWithoutParentInput>
  }

  export type GroupUpdateWithWhereUniqueWithoutParentInput = {
    where: GroupWhereUniqueInput
    data: XOR<GroupUpdateWithoutParentInput, GroupUncheckedUpdateWithoutParentInput>
  }

  export type GroupUpdateManyWithWhereWithoutParentInput = {
    where: GroupScalarWhereInput
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyWithoutSubgroupsInput>
  }

  export type GroupScalarWhereInput = {
    AND?: Enumerable<GroupScalarWhereInput>
    OR?: Enumerable<GroupScalarWhereInput>
    NOT?: Enumerable<GroupScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    type?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    parentId?: IntNullableFilter | number | null
    location?: StringNullableFilter | string | null
    lat?: FloatNullableFilter | number | null
    lng?: FloatNullableFilter | number | null
    ip?: StringNullableFilter | string | null
    attributes?: JsonNullableFilter
    tenantId?: IntNullableFilter | number | null
  }

  export type DeviceUpsertWithWhereUniqueWithoutGroupInput = {
    where: DeviceWhereUniqueInput
    update: XOR<DeviceUpdateWithoutGroupInput, DeviceUncheckedUpdateWithoutGroupInput>
    create: XOR<DeviceCreateWithoutGroupInput, DeviceUncheckedCreateWithoutGroupInput>
  }

  export type DeviceUpdateWithWhereUniqueWithoutGroupInput = {
    where: DeviceWhereUniqueInput
    data: XOR<DeviceUpdateWithoutGroupInput, DeviceUncheckedUpdateWithoutGroupInput>
  }

  export type DeviceUpdateManyWithWhereWithoutGroupInput = {
    where: DeviceScalarWhereInput
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyWithoutDevicesInput>
  }

  export type DeviceCreateWithoutAlertsInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    credential?: CredentialCreateNestedOneWithoutDeviceInput
    attributes?: AttributeCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryCreateNestedManyWithoutDeviceInput
    deviceProfile?: DeviceProfileCreateNestedOneWithoutDevicesInput
    firmware?: FirmwareCreateNestedOneWithoutDeviceInput
    tags?: TagCreateNestedManyWithoutDevicesInput
    VirtualDevice?: VirtualDeviceCreateNestedOneWithoutDevicesInput
    group?: GroupCreateNestedOneWithoutDevicesInput
    history?: HistoryCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutAlertsInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
    attributes?: AttributeUncheckedCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput
    tags?: TagUncheckedCreateNestedManyWithoutDevicesInput
    history?: HistoryUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutAlertsInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutAlertsInput, DeviceUncheckedCreateWithoutAlertsInput>
  }

  export type DeviceUpsertWithoutAlertsInput = {
    update: XOR<DeviceUpdateWithoutAlertsInput, DeviceUncheckedUpdateWithoutAlertsInput>
    create: XOR<DeviceCreateWithoutAlertsInput, DeviceUncheckedCreateWithoutAlertsInput>
  }

  export type DeviceUpdateWithoutAlertsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    credential?: CredentialUpdateOneWithoutDeviceNestedInput
    attributes?: AttributeUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUpdateManyWithoutDeviceNestedInput
    deviceProfile?: DeviceProfileUpdateOneWithoutDevicesNestedInput
    firmware?: FirmwareUpdateOneWithoutDeviceNestedInput
    tags?: TagUpdateManyWithoutDevicesNestedInput
    VirtualDevice?: VirtualDeviceUpdateOneWithoutDevicesNestedInput
    group?: GroupUpdateOneWithoutDevicesNestedInput
    history?: HistoryUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutAlertsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUncheckedUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput
    tags?: TagUncheckedUpdateManyWithoutDevicesNestedInput
    history?: HistoryUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceProfileCreateWithoutDecoderInput = {
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    deviceType?: DeviceTypeCreateNestedOneWithoutDeviceProfilesInput
    devices?: DeviceCreateNestedManyWithoutDeviceProfileInput
    protocol?: ProtocolCreateNestedOneWithoutDeviceProfilesInput
  }

  export type DeviceProfileUncheckedCreateWithoutDecoderInput = {
    id?: number
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    deviceTypeId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    protocolId?: number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    devices?: DeviceUncheckedCreateNestedManyWithoutDeviceProfileInput
  }

  export type DeviceProfileCreateOrConnectWithoutDecoderInput = {
    where: DeviceProfileWhereUniqueInput
    create: XOR<DeviceProfileCreateWithoutDecoderInput, DeviceProfileUncheckedCreateWithoutDecoderInput>
  }

  export type DeviceProfileCreateManyDecoderInputEnvelope = {
    data: Enumerable<DeviceProfileCreateManyDecoderInput>
    skipDuplicates?: boolean
  }

  export type DeviceProfileUpsertWithWhereUniqueWithoutDecoderInput = {
    where: DeviceProfileWhereUniqueInput
    update: XOR<DeviceProfileUpdateWithoutDecoderInput, DeviceProfileUncheckedUpdateWithoutDecoderInput>
    create: XOR<DeviceProfileCreateWithoutDecoderInput, DeviceProfileUncheckedCreateWithoutDecoderInput>
  }

  export type DeviceProfileUpdateWithWhereUniqueWithoutDecoderInput = {
    where: DeviceProfileWhereUniqueInput
    data: XOR<DeviceProfileUpdateWithoutDecoderInput, DeviceProfileUncheckedUpdateWithoutDecoderInput>
  }

  export type DeviceProfileUpdateManyWithWhereWithoutDecoderInput = {
    where: DeviceProfileScalarWhereInput
    data: XOR<DeviceProfileUpdateManyMutationInput, DeviceProfileUncheckedUpdateManyWithoutDeviceProfileInput>
  }

  export type DeviceProfileScalarWhereInput = {
    AND?: Enumerable<DeviceProfileScalarWhereInput>
    OR?: Enumerable<DeviceProfileScalarWhereInput>
    NOT?: Enumerable<DeviceProfileScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    description?: StringNullableFilter | string | null
    logo?: StringNullableFilter | string | null
    cridentialsType?: EnumTypeCredentialNullableFilter | TypeCredential | null
    deviceTypeId?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    protocolId?: IntNullableFilter | number | null
    decoderId?: IntNullableFilter | number | null
    attributes?: JsonNullableFilter
    tenantId?: IntNullableFilter | number | null
  }

  export type DeviceProfileCreateWithoutDeviceTypeInput = {
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    devices?: DeviceCreateNestedManyWithoutDeviceProfileInput
    protocol?: ProtocolCreateNestedOneWithoutDeviceProfilesInput
    decoder?: DecoderCreateNestedOneWithoutDeviceProfileInput
  }

  export type DeviceProfileUncheckedCreateWithoutDeviceTypeInput = {
    id?: number
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    createdAt?: Date | string
    updatedAt?: Date | string
    protocolId?: number | null
    decoderId?: number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    devices?: DeviceUncheckedCreateNestedManyWithoutDeviceProfileInput
  }

  export type DeviceProfileCreateOrConnectWithoutDeviceTypeInput = {
    where: DeviceProfileWhereUniqueInput
    create: XOR<DeviceProfileCreateWithoutDeviceTypeInput, DeviceProfileUncheckedCreateWithoutDeviceTypeInput>
  }

  export type DeviceProfileCreateManyDeviceTypeInputEnvelope = {
    data: Enumerable<DeviceProfileCreateManyDeviceTypeInput>
    skipDuplicates?: boolean
  }

  export type DeviceProfileUpsertWithWhereUniqueWithoutDeviceTypeInput = {
    where: DeviceProfileWhereUniqueInput
    update: XOR<DeviceProfileUpdateWithoutDeviceTypeInput, DeviceProfileUncheckedUpdateWithoutDeviceTypeInput>
    create: XOR<DeviceProfileCreateWithoutDeviceTypeInput, DeviceProfileUncheckedCreateWithoutDeviceTypeInput>
  }

  export type DeviceProfileUpdateWithWhereUniqueWithoutDeviceTypeInput = {
    where: DeviceProfileWhereUniqueInput
    data: XOR<DeviceProfileUpdateWithoutDeviceTypeInput, DeviceProfileUncheckedUpdateWithoutDeviceTypeInput>
  }

  export type DeviceProfileUpdateManyWithWhereWithoutDeviceTypeInput = {
    where: DeviceProfileScalarWhereInput
    data: XOR<DeviceProfileUpdateManyMutationInput, DeviceProfileUncheckedUpdateManyWithoutDeviceProfilesInput>
  }

  export type DeviceCreateWithoutFirmwareInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    credential?: CredentialCreateNestedOneWithoutDeviceInput
    attributes?: AttributeCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryCreateNestedManyWithoutDeviceInput
    deviceProfile?: DeviceProfileCreateNestedOneWithoutDevicesInput
    tags?: TagCreateNestedManyWithoutDevicesInput
    VirtualDevice?: VirtualDeviceCreateNestedOneWithoutDevicesInput
    alerts?: AlertCreateNestedManyWithoutDeviceInput
    group?: GroupCreateNestedOneWithoutDevicesInput
    history?: HistoryCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutFirmwareInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
    attributes?: AttributeUncheckedCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput
    tags?: TagUncheckedCreateNestedManyWithoutDevicesInput
    alerts?: AlertUncheckedCreateNestedManyWithoutDeviceInput
    history?: HistoryUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutFirmwareInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutFirmwareInput, DeviceUncheckedCreateWithoutFirmwareInput>
  }

  export type DeviceCreateManyFirmwareInputEnvelope = {
    data: Enumerable<DeviceCreateManyFirmwareInput>
    skipDuplicates?: boolean
  }

  export type DeviceUpsertWithWhereUniqueWithoutFirmwareInput = {
    where: DeviceWhereUniqueInput
    update: XOR<DeviceUpdateWithoutFirmwareInput, DeviceUncheckedUpdateWithoutFirmwareInput>
    create: XOR<DeviceCreateWithoutFirmwareInput, DeviceUncheckedCreateWithoutFirmwareInput>
  }

  export type DeviceUpdateWithWhereUniqueWithoutFirmwareInput = {
    where: DeviceWhereUniqueInput
    data: XOR<DeviceUpdateWithoutFirmwareInput, DeviceUncheckedUpdateWithoutFirmwareInput>
  }

  export type DeviceUpdateManyWithWhereWithoutFirmwareInput = {
    where: DeviceScalarWhereInput
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyWithoutDeviceInput>
  }

  export type DeviceProfileCreateWithoutProtocolInput = {
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    deviceType?: DeviceTypeCreateNestedOneWithoutDeviceProfilesInput
    devices?: DeviceCreateNestedManyWithoutDeviceProfileInput
    decoder?: DecoderCreateNestedOneWithoutDeviceProfileInput
  }

  export type DeviceProfileUncheckedCreateWithoutProtocolInput = {
    id?: number
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    deviceTypeId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    decoderId?: number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    devices?: DeviceUncheckedCreateNestedManyWithoutDeviceProfileInput
  }

  export type DeviceProfileCreateOrConnectWithoutProtocolInput = {
    where: DeviceProfileWhereUniqueInput
    create: XOR<DeviceProfileCreateWithoutProtocolInput, DeviceProfileUncheckedCreateWithoutProtocolInput>
  }

  export type DeviceProfileCreateManyProtocolInputEnvelope = {
    data: Enumerable<DeviceProfileCreateManyProtocolInput>
    skipDuplicates?: boolean
  }

  export type DeviceProfileUpsertWithWhereUniqueWithoutProtocolInput = {
    where: DeviceProfileWhereUniqueInput
    update: XOR<DeviceProfileUpdateWithoutProtocolInput, DeviceProfileUncheckedUpdateWithoutProtocolInput>
    create: XOR<DeviceProfileCreateWithoutProtocolInput, DeviceProfileUncheckedCreateWithoutProtocolInput>
  }

  export type DeviceProfileUpdateWithWhereUniqueWithoutProtocolInput = {
    where: DeviceProfileWhereUniqueInput
    data: XOR<DeviceProfileUpdateWithoutProtocolInput, DeviceProfileUncheckedUpdateWithoutProtocolInput>
  }

  export type DeviceProfileUpdateManyWithWhereWithoutProtocolInput = {
    where: DeviceProfileScalarWhereInput
    data: XOR<DeviceProfileUpdateManyMutationInput, DeviceProfileUncheckedUpdateManyWithoutDeviceProfilesInput>
  }

  export type DeviceTypeCreateWithoutDeviceProfilesInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type DeviceTypeUncheckedCreateWithoutDeviceProfilesInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type DeviceTypeCreateOrConnectWithoutDeviceProfilesInput = {
    where: DeviceTypeWhereUniqueInput
    create: XOR<DeviceTypeCreateWithoutDeviceProfilesInput, DeviceTypeUncheckedCreateWithoutDeviceProfilesInput>
  }

  export type DeviceCreateWithoutDeviceProfileInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    credential?: CredentialCreateNestedOneWithoutDeviceInput
    attributes?: AttributeCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryCreateNestedManyWithoutDeviceInput
    firmware?: FirmwareCreateNestedOneWithoutDeviceInput
    tags?: TagCreateNestedManyWithoutDevicesInput
    VirtualDevice?: VirtualDeviceCreateNestedOneWithoutDevicesInput
    alerts?: AlertCreateNestedManyWithoutDeviceInput
    group?: GroupCreateNestedOneWithoutDevicesInput
    history?: HistoryCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutDeviceProfileInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
    attributes?: AttributeUncheckedCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput
    tags?: TagUncheckedCreateNestedManyWithoutDevicesInput
    alerts?: AlertUncheckedCreateNestedManyWithoutDeviceInput
    history?: HistoryUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutDeviceProfileInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutDeviceProfileInput, DeviceUncheckedCreateWithoutDeviceProfileInput>
  }

  export type DeviceCreateManyDeviceProfileInputEnvelope = {
    data: Enumerable<DeviceCreateManyDeviceProfileInput>
    skipDuplicates?: boolean
  }

  export type ProtocolCreateWithoutDeviceProfilesInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type ProtocolUncheckedCreateWithoutDeviceProfilesInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type ProtocolCreateOrConnectWithoutDeviceProfilesInput = {
    where: ProtocolWhereUniqueInput
    create: XOR<ProtocolCreateWithoutDeviceProfilesInput, ProtocolUncheckedCreateWithoutDeviceProfilesInput>
  }

  export type DecoderCreateWithoutDeviceProfileInput = {
    name: string
    description: string
    fnc: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type DecoderUncheckedCreateWithoutDeviceProfileInput = {
    id?: number
    name: string
    description: string
    fnc: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type DecoderCreateOrConnectWithoutDeviceProfileInput = {
    where: DecoderWhereUniqueInput
    create: XOR<DecoderCreateWithoutDeviceProfileInput, DecoderUncheckedCreateWithoutDeviceProfileInput>
  }

  export type DeviceTypeUpsertWithoutDeviceProfilesInput = {
    update: XOR<DeviceTypeUpdateWithoutDeviceProfilesInput, DeviceTypeUncheckedUpdateWithoutDeviceProfilesInput>
    create: XOR<DeviceTypeCreateWithoutDeviceProfilesInput, DeviceTypeUncheckedCreateWithoutDeviceProfilesInput>
  }

  export type DeviceTypeUpdateWithoutDeviceProfilesInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceTypeUncheckedUpdateWithoutDeviceProfilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceUpsertWithWhereUniqueWithoutDeviceProfileInput = {
    where: DeviceWhereUniqueInput
    update: XOR<DeviceUpdateWithoutDeviceProfileInput, DeviceUncheckedUpdateWithoutDeviceProfileInput>
    create: XOR<DeviceCreateWithoutDeviceProfileInput, DeviceUncheckedCreateWithoutDeviceProfileInput>
  }

  export type DeviceUpdateWithWhereUniqueWithoutDeviceProfileInput = {
    where: DeviceWhereUniqueInput
    data: XOR<DeviceUpdateWithoutDeviceProfileInput, DeviceUncheckedUpdateWithoutDeviceProfileInput>
  }

  export type DeviceUpdateManyWithWhereWithoutDeviceProfileInput = {
    where: DeviceScalarWhereInput
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyWithoutDevicesInput>
  }

  export type ProtocolUpsertWithoutDeviceProfilesInput = {
    update: XOR<ProtocolUpdateWithoutDeviceProfilesInput, ProtocolUncheckedUpdateWithoutDeviceProfilesInput>
    create: XOR<ProtocolCreateWithoutDeviceProfilesInput, ProtocolUncheckedCreateWithoutDeviceProfilesInput>
  }

  export type ProtocolUpdateWithoutDeviceProfilesInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProtocolUncheckedUpdateWithoutDeviceProfilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DecoderUpsertWithoutDeviceProfileInput = {
    update: XOR<DecoderUpdateWithoutDeviceProfileInput, DecoderUncheckedUpdateWithoutDeviceProfileInput>
    create: XOR<DecoderCreateWithoutDeviceProfileInput, DecoderUncheckedCreateWithoutDeviceProfileInput>
  }

  export type DecoderUpdateWithoutDeviceProfileInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    fnc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DecoderUncheckedUpdateWithoutDeviceProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    fnc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceCreateWithoutCredentialInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    attributes?: AttributeCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryCreateNestedManyWithoutDeviceInput
    deviceProfile?: DeviceProfileCreateNestedOneWithoutDevicesInput
    firmware?: FirmwareCreateNestedOneWithoutDeviceInput
    tags?: TagCreateNestedManyWithoutDevicesInput
    VirtualDevice?: VirtualDeviceCreateNestedOneWithoutDevicesInput
    alerts?: AlertCreateNestedManyWithoutDeviceInput
    group?: GroupCreateNestedOneWithoutDevicesInput
    history?: HistoryCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutCredentialInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
    attributes?: AttributeUncheckedCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput
    tags?: TagUncheckedCreateNestedManyWithoutDevicesInput
    alerts?: AlertUncheckedCreateNestedManyWithoutDeviceInput
    history?: HistoryUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutCredentialInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutCredentialInput, DeviceUncheckedCreateWithoutCredentialInput>
  }

  export type DeviceUpsertWithoutCredentialInput = {
    update: XOR<DeviceUpdateWithoutCredentialInput, DeviceUncheckedUpdateWithoutCredentialInput>
    create: XOR<DeviceCreateWithoutCredentialInput, DeviceUncheckedCreateWithoutCredentialInput>
  }

  export type DeviceUpdateWithoutCredentialInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUpdateManyWithoutDeviceNestedInput
    deviceProfile?: DeviceProfileUpdateOneWithoutDevicesNestedInput
    firmware?: FirmwareUpdateOneWithoutDeviceNestedInput
    tags?: TagUpdateManyWithoutDevicesNestedInput
    VirtualDevice?: VirtualDeviceUpdateOneWithoutDevicesNestedInput
    alerts?: AlertUpdateManyWithoutDeviceNestedInput
    group?: GroupUpdateOneWithoutDevicesNestedInput
    history?: HistoryUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutCredentialInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUncheckedUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput
    tags?: TagUncheckedUpdateManyWithoutDevicesNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutDeviceNestedInput
    history?: HistoryUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceCreateWithoutTagsInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    credential?: CredentialCreateNestedOneWithoutDeviceInput
    attributes?: AttributeCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryCreateNestedManyWithoutDeviceInput
    deviceProfile?: DeviceProfileCreateNestedOneWithoutDevicesInput
    firmware?: FirmwareCreateNestedOneWithoutDeviceInput
    VirtualDevice?: VirtualDeviceCreateNestedOneWithoutDevicesInput
    alerts?: AlertCreateNestedManyWithoutDeviceInput
    group?: GroupCreateNestedOneWithoutDevicesInput
    history?: HistoryCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutTagsInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
    attributes?: AttributeUncheckedCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput
    alerts?: AlertUncheckedCreateNestedManyWithoutDeviceInput
    history?: HistoryUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutTagsInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutTagsInput, DeviceUncheckedCreateWithoutTagsInput>
  }

  export type DeviceUpsertWithWhereUniqueWithoutTagsInput = {
    where: DeviceWhereUniqueInput
    update: XOR<DeviceUpdateWithoutTagsInput, DeviceUncheckedUpdateWithoutTagsInput>
    create: XOR<DeviceCreateWithoutTagsInput, DeviceUncheckedCreateWithoutTagsInput>
  }

  export type DeviceUpdateWithWhereUniqueWithoutTagsInput = {
    where: DeviceWhereUniqueInput
    data: XOR<DeviceUpdateWithoutTagsInput, DeviceUncheckedUpdateWithoutTagsInput>
  }

  export type DeviceUpdateManyWithWhereWithoutTagsInput = {
    where: DeviceScalarWhereInput
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyWithoutDevicesInput>
  }

  export type CredentialCreateWithoutDeviceInput = {
    username?: string | null
    password?: string | null
    token?: string | null
    certificate?: string | null
    type?: TypeCredential
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CredentialUncheckedCreateWithoutDeviceInput = {
    id?: number
    username?: string | null
    password?: string | null
    token?: string | null
    certificate?: string | null
    type?: TypeCredential
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CredentialCreateOrConnectWithoutDeviceInput = {
    where: CredentialWhereUniqueInput
    create: XOR<CredentialCreateWithoutDeviceInput, CredentialUncheckedCreateWithoutDeviceInput>
  }

  export type AttributeCreateWithoutDeviceInput = {
    name: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttributeUncheckedCreateWithoutDeviceInput = {
    id?: number
    name: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttributeCreateOrConnectWithoutDeviceInput = {
    where: AttributeWhereUniqueInput
    create: XOR<AttributeCreateWithoutDeviceInput, AttributeUncheckedCreateWithoutDeviceInput>
  }

  export type AttributeCreateManyDeviceInputEnvelope = {
    data: Enumerable<AttributeCreateManyDeviceInput>
    skipDuplicates?: boolean
  }

  export type LastTelemetryCreateWithoutDeviceInput = {
    name: string
    value: JsonNullValueInput | InputJsonValue
    alias?: string | null
    icon?: string | null
    color?: string | null
    show?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LastTelemetryUncheckedCreateWithoutDeviceInput = {
    id?: number
    name: string
    value: JsonNullValueInput | InputJsonValue
    alias?: string | null
    icon?: string | null
    color?: string | null
    show?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LastTelemetryCreateOrConnectWithoutDeviceInput = {
    where: LastTelemetryWhereUniqueInput
    create: XOR<LastTelemetryCreateWithoutDeviceInput, LastTelemetryUncheckedCreateWithoutDeviceInput>
  }

  export type LastTelemetryCreateManyDeviceInputEnvelope = {
    data: Enumerable<LastTelemetryCreateManyDeviceInput>
    skipDuplicates?: boolean
  }

  export type DeviceProfileCreateWithoutDevicesInput = {
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    deviceType?: DeviceTypeCreateNestedOneWithoutDeviceProfilesInput
    protocol?: ProtocolCreateNestedOneWithoutDeviceProfilesInput
    decoder?: DecoderCreateNestedOneWithoutDeviceProfileInput
  }

  export type DeviceProfileUncheckedCreateWithoutDevicesInput = {
    id?: number
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    deviceTypeId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    protocolId?: number | null
    decoderId?: number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
  }

  export type DeviceProfileCreateOrConnectWithoutDevicesInput = {
    where: DeviceProfileWhereUniqueInput
    create: XOR<DeviceProfileCreateWithoutDevicesInput, DeviceProfileUncheckedCreateWithoutDevicesInput>
  }

  export type FirmwareCreateWithoutDeviceInput = {
    name?: string | null
    version?: string | null
    description?: string | null
    url?: string | null
    size?: number | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type FirmwareUncheckedCreateWithoutDeviceInput = {
    id?: number
    name?: string | null
    version?: string | null
    description?: string | null
    url?: string | null
    size?: number | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type FirmwareCreateOrConnectWithoutDeviceInput = {
    where: FirmwareWhereUniqueInput
    create: XOR<FirmwareCreateWithoutDeviceInput, FirmwareUncheckedCreateWithoutDeviceInput>
  }

  export type TagCreateWithoutDevicesInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TagUncheckedCreateWithoutDevicesInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TagCreateOrConnectWithoutDevicesInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutDevicesInput, TagUncheckedCreateWithoutDevicesInput>
  }

  export type VirtualDeviceCreateWithoutDevicesInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type VirtualDeviceUncheckedCreateWithoutDevicesInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
  }

  export type VirtualDeviceCreateOrConnectWithoutDevicesInput = {
    where: VirtualDeviceWhereUniqueInput
    create: XOR<VirtualDeviceCreateWithoutDevicesInput, VirtualDeviceUncheckedCreateWithoutDevicesInput>
  }

  export type AlertCreateWithoutDeviceInput = {
    type?: string | null
    message?: string | null
    level?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: number | null
  }

  export type AlertUncheckedCreateWithoutDeviceInput = {
    id?: number
    type?: string | null
    message?: string | null
    level?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: number | null
  }

  export type AlertCreateOrConnectWithoutDeviceInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutDeviceInput, AlertUncheckedCreateWithoutDeviceInput>
  }

  export type AlertCreateManyDeviceInputEnvelope = {
    data: Enumerable<AlertCreateManyDeviceInput>
    skipDuplicates?: boolean
  }

  export type GroupCreateWithoutDevicesInput = {
    name: string
    type?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    lat?: number | null
    lng?: number | null
    ip?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    parent?: GroupCreateNestedOneWithoutSubgroupsInput
    subgroups?: GroupCreateNestedManyWithoutParentInput
  }

  export type GroupUncheckedCreateWithoutDevicesInput = {
    id?: number
    name: string
    type?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId?: number | null
    location?: string | null
    lat?: number | null
    lng?: number | null
    ip?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
    subgroups?: GroupUncheckedCreateNestedManyWithoutParentInput
  }

  export type GroupCreateOrConnectWithoutDevicesInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutDevicesInput, GroupUncheckedCreateWithoutDevicesInput>
  }

  export type HistoryCreateWithoutDeviceInput = {
    name: string
    value: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HistoryUncheckedCreateWithoutDeviceInput = {
    id?: number
    name: string
    value: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HistoryCreateOrConnectWithoutDeviceInput = {
    where: HistoryWhereUniqueInput
    create: XOR<HistoryCreateWithoutDeviceInput, HistoryUncheckedCreateWithoutDeviceInput>
  }

  export type HistoryCreateManyDeviceInputEnvelope = {
    data: Enumerable<HistoryCreateManyDeviceInput>
    skipDuplicates?: boolean
  }

  export type CredentialUpsertWithoutDeviceInput = {
    update: XOR<CredentialUpdateWithoutDeviceInput, CredentialUncheckedUpdateWithoutDeviceInput>
    create: XOR<CredentialCreateWithoutDeviceInput, CredentialUncheckedCreateWithoutDeviceInput>
  }

  export type CredentialUpdateWithoutDeviceInput = {
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    certificate?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeCredentialFieldUpdateOperationsInput | TypeCredential
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CredentialUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    certificate?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeCredentialFieldUpdateOperationsInput | TypeCredential
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttributeUpsertWithWhereUniqueWithoutDeviceInput = {
    where: AttributeWhereUniqueInput
    update: XOR<AttributeUpdateWithoutDeviceInput, AttributeUncheckedUpdateWithoutDeviceInput>
    create: XOR<AttributeCreateWithoutDeviceInput, AttributeUncheckedCreateWithoutDeviceInput>
  }

  export type AttributeUpdateWithWhereUniqueWithoutDeviceInput = {
    where: AttributeWhereUniqueInput
    data: XOR<AttributeUpdateWithoutDeviceInput, AttributeUncheckedUpdateWithoutDeviceInput>
  }

  export type AttributeUpdateManyWithWhereWithoutDeviceInput = {
    where: AttributeScalarWhereInput
    data: XOR<AttributeUpdateManyMutationInput, AttributeUncheckedUpdateManyWithoutAttributesInput>
  }

  export type AttributeScalarWhereInput = {
    AND?: Enumerable<AttributeScalarWhereInput>
    OR?: Enumerable<AttributeScalarWhereInput>
    NOT?: Enumerable<AttributeScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    value?: StringFilter | string
    deviceId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type LastTelemetryUpsertWithWhereUniqueWithoutDeviceInput = {
    where: LastTelemetryWhereUniqueInput
    update: XOR<LastTelemetryUpdateWithoutDeviceInput, LastTelemetryUncheckedUpdateWithoutDeviceInput>
    create: XOR<LastTelemetryCreateWithoutDeviceInput, LastTelemetryUncheckedCreateWithoutDeviceInput>
  }

  export type LastTelemetryUpdateWithWhereUniqueWithoutDeviceInput = {
    where: LastTelemetryWhereUniqueInput
    data: XOR<LastTelemetryUpdateWithoutDeviceInput, LastTelemetryUncheckedUpdateWithoutDeviceInput>
  }

  export type LastTelemetryUpdateManyWithWhereWithoutDeviceInput = {
    where: LastTelemetryScalarWhereInput
    data: XOR<LastTelemetryUpdateManyMutationInput, LastTelemetryUncheckedUpdateManyWithoutLastTelemetriesInput>
  }

  export type LastTelemetryScalarWhereInput = {
    AND?: Enumerable<LastTelemetryScalarWhereInput>
    OR?: Enumerable<LastTelemetryScalarWhereInput>
    NOT?: Enumerable<LastTelemetryScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    value?: JsonFilter
    alias?: StringNullableFilter | string | null
    icon?: StringNullableFilter | string | null
    color?: StringNullableFilter | string | null
    show?: BoolFilter | boolean
    deviceId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type DeviceProfileUpsertWithoutDevicesInput = {
    update: XOR<DeviceProfileUpdateWithoutDevicesInput, DeviceProfileUncheckedUpdateWithoutDevicesInput>
    create: XOR<DeviceProfileCreateWithoutDevicesInput, DeviceProfileUncheckedCreateWithoutDevicesInput>
  }

  export type DeviceProfileUpdateWithoutDevicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceType?: DeviceTypeUpdateOneWithoutDeviceProfilesNestedInput
    protocol?: ProtocolUpdateOneWithoutDeviceProfilesNestedInput
    decoder?: DecoderUpdateOneWithoutDeviceProfileNestedInput
  }

  export type DeviceProfileUncheckedUpdateWithoutDevicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    deviceTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: NullableIntFieldUpdateOperationsInput | number | null
    decoderId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FirmwareUpsertWithoutDeviceInput = {
    update: XOR<FirmwareUpdateWithoutDeviceInput, FirmwareUncheckedUpdateWithoutDeviceInput>
    create: XOR<FirmwareCreateWithoutDeviceInput, FirmwareUncheckedCreateWithoutDeviceInput>
  }

  export type FirmwareUpdateWithoutDeviceInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FirmwareUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TagUpsertWithWhereUniqueWithoutDevicesInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutDevicesInput, TagUncheckedUpdateWithoutDevicesInput>
    create: XOR<TagCreateWithoutDevicesInput, TagUncheckedCreateWithoutDevicesInput>
  }

  export type TagUpdateWithWhereUniqueWithoutDevicesInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutDevicesInput, TagUncheckedUpdateWithoutDevicesInput>
  }

  export type TagUpdateManyWithWhereWithoutDevicesInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutTagsInput>
  }

  export type TagScalarWhereInput = {
    AND?: Enumerable<TagScalarWhereInput>
    OR?: Enumerable<TagScalarWhereInput>
    NOT?: Enumerable<TagScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type VirtualDeviceUpsertWithoutDevicesInput = {
    update: XOR<VirtualDeviceUpdateWithoutDevicesInput, VirtualDeviceUncheckedUpdateWithoutDevicesInput>
    create: XOR<VirtualDeviceCreateWithoutDevicesInput, VirtualDeviceUncheckedCreateWithoutDevicesInput>
  }

  export type VirtualDeviceUpdateWithoutDevicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type VirtualDeviceUncheckedUpdateWithoutDevicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AlertUpsertWithWhereUniqueWithoutDeviceInput = {
    where: AlertWhereUniqueInput
    update: XOR<AlertUpdateWithoutDeviceInput, AlertUncheckedUpdateWithoutDeviceInput>
    create: XOR<AlertCreateWithoutDeviceInput, AlertUncheckedCreateWithoutDeviceInput>
  }

  export type AlertUpdateWithWhereUniqueWithoutDeviceInput = {
    where: AlertWhereUniqueInput
    data: XOR<AlertUpdateWithoutDeviceInput, AlertUncheckedUpdateWithoutDeviceInput>
  }

  export type AlertUpdateManyWithWhereWithoutDeviceInput = {
    where: AlertScalarWhereInput
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyWithoutAlertsInput>
  }

  export type AlertScalarWhereInput = {
    AND?: Enumerable<AlertScalarWhereInput>
    OR?: Enumerable<AlertScalarWhereInput>
    NOT?: Enumerable<AlertScalarWhereInput>
    id?: IntFilter | number
    deviceId?: IntFilter | number
    type?: StringNullableFilter | string | null
    message?: StringNullableFilter | string | null
    level?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    attributes?: JsonFilter
    acknowledgedBy?: IntNullableFilter | number | null
  }

  export type GroupUpsertWithoutDevicesInput = {
    update: XOR<GroupUpdateWithoutDevicesInput, GroupUncheckedUpdateWithoutDevicesInput>
    create: XOR<GroupCreateWithoutDevicesInput, GroupUncheckedCreateWithoutDevicesInput>
  }

  export type GroupUpdateWithoutDevicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    parent?: GroupUpdateOneWithoutSubgroupsNestedInput
    subgroups?: GroupUpdateManyWithoutParentNestedInput
  }

  export type GroupUncheckedUpdateWithoutDevicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    subgroups?: GroupUncheckedUpdateManyWithoutParentNestedInput
  }

  export type HistoryUpsertWithWhereUniqueWithoutDeviceInput = {
    where: HistoryWhereUniqueInput
    update: XOR<HistoryUpdateWithoutDeviceInput, HistoryUncheckedUpdateWithoutDeviceInput>
    create: XOR<HistoryCreateWithoutDeviceInput, HistoryUncheckedCreateWithoutDeviceInput>
  }

  export type HistoryUpdateWithWhereUniqueWithoutDeviceInput = {
    where: HistoryWhereUniqueInput
    data: XOR<HistoryUpdateWithoutDeviceInput, HistoryUncheckedUpdateWithoutDeviceInput>
  }

  export type HistoryUpdateManyWithWhereWithoutDeviceInput = {
    where: HistoryScalarWhereInput
    data: XOR<HistoryUpdateManyMutationInput, HistoryUncheckedUpdateManyWithoutHistoryInput>
  }

  export type HistoryScalarWhereInput = {
    AND?: Enumerable<HistoryScalarWhereInput>
    OR?: Enumerable<HistoryScalarWhereInput>
    NOT?: Enumerable<HistoryScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    value?: JsonFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deviceId?: IntFilter | number
  }

  export type DeviceCreateWithoutAttributesInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    credential?: CredentialCreateNestedOneWithoutDeviceInput
    lastTelemetries?: LastTelemetryCreateNestedManyWithoutDeviceInput
    deviceProfile?: DeviceProfileCreateNestedOneWithoutDevicesInput
    firmware?: FirmwareCreateNestedOneWithoutDeviceInput
    tags?: TagCreateNestedManyWithoutDevicesInput
    VirtualDevice?: VirtualDeviceCreateNestedOneWithoutDevicesInput
    alerts?: AlertCreateNestedManyWithoutDeviceInput
    group?: GroupCreateNestedOneWithoutDevicesInput
    history?: HistoryCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutAttributesInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
    lastTelemetries?: LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput
    tags?: TagUncheckedCreateNestedManyWithoutDevicesInput
    alerts?: AlertUncheckedCreateNestedManyWithoutDeviceInput
    history?: HistoryUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutAttributesInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutAttributesInput, DeviceUncheckedCreateWithoutAttributesInput>
  }

  export type DeviceUpsertWithoutAttributesInput = {
    update: XOR<DeviceUpdateWithoutAttributesInput, DeviceUncheckedUpdateWithoutAttributesInput>
    create: XOR<DeviceCreateWithoutAttributesInput, DeviceUncheckedCreateWithoutAttributesInput>
  }

  export type DeviceUpdateWithoutAttributesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    credential?: CredentialUpdateOneWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUpdateManyWithoutDeviceNestedInput
    deviceProfile?: DeviceProfileUpdateOneWithoutDevicesNestedInput
    firmware?: FirmwareUpdateOneWithoutDeviceNestedInput
    tags?: TagUpdateManyWithoutDevicesNestedInput
    VirtualDevice?: VirtualDeviceUpdateOneWithoutDevicesNestedInput
    alerts?: AlertUpdateManyWithoutDeviceNestedInput
    group?: GroupUpdateOneWithoutDevicesNestedInput
    history?: HistoryUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutAttributesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    lastTelemetries?: LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput
    tags?: TagUncheckedUpdateManyWithoutDevicesNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutDeviceNestedInput
    history?: HistoryUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceCreateWithoutLastTelemetriesInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    credential?: CredentialCreateNestedOneWithoutDeviceInput
    attributes?: AttributeCreateNestedManyWithoutDeviceInput
    deviceProfile?: DeviceProfileCreateNestedOneWithoutDevicesInput
    firmware?: FirmwareCreateNestedOneWithoutDeviceInput
    tags?: TagCreateNestedManyWithoutDevicesInput
    VirtualDevice?: VirtualDeviceCreateNestedOneWithoutDevicesInput
    alerts?: AlertCreateNestedManyWithoutDeviceInput
    group?: GroupCreateNestedOneWithoutDevicesInput
    history?: HistoryCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutLastTelemetriesInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
    attributes?: AttributeUncheckedCreateNestedManyWithoutDeviceInput
    tags?: TagUncheckedCreateNestedManyWithoutDevicesInput
    alerts?: AlertUncheckedCreateNestedManyWithoutDeviceInput
    history?: HistoryUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutLastTelemetriesInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutLastTelemetriesInput, DeviceUncheckedCreateWithoutLastTelemetriesInput>
  }

  export type DeviceUpsertWithoutLastTelemetriesInput = {
    update: XOR<DeviceUpdateWithoutLastTelemetriesInput, DeviceUncheckedUpdateWithoutLastTelemetriesInput>
    create: XOR<DeviceCreateWithoutLastTelemetriesInput, DeviceUncheckedCreateWithoutLastTelemetriesInput>
  }

  export type DeviceUpdateWithoutLastTelemetriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    credential?: CredentialUpdateOneWithoutDeviceNestedInput
    attributes?: AttributeUpdateManyWithoutDeviceNestedInput
    deviceProfile?: DeviceProfileUpdateOneWithoutDevicesNestedInput
    firmware?: FirmwareUpdateOneWithoutDeviceNestedInput
    tags?: TagUpdateManyWithoutDevicesNestedInput
    VirtualDevice?: VirtualDeviceUpdateOneWithoutDevicesNestedInput
    alerts?: AlertUpdateManyWithoutDeviceNestedInput
    group?: GroupUpdateOneWithoutDevicesNestedInput
    history?: HistoryUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutLastTelemetriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUncheckedUpdateManyWithoutDeviceNestedInput
    tags?: TagUncheckedUpdateManyWithoutDevicesNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutDeviceNestedInput
    history?: HistoryUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceCreateWithoutHistoryInput = {
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    configuration?: string | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: number | null
    credential?: CredentialCreateNestedOneWithoutDeviceInput
    attributes?: AttributeCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryCreateNestedManyWithoutDeviceInput
    deviceProfile?: DeviceProfileCreateNestedOneWithoutDevicesInput
    firmware?: FirmwareCreateNestedOneWithoutDeviceInput
    tags?: TagCreateNestedManyWithoutDevicesInput
    VirtualDevice?: VirtualDeviceCreateNestedOneWithoutDevicesInput
    alerts?: AlertCreateNestedManyWithoutDeviceInput
    group?: GroupCreateNestedOneWithoutDevicesInput
  }

  export type DeviceUncheckedCreateWithoutHistoryInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
    attributes?: AttributeUncheckedCreateNestedManyWithoutDeviceInput
    lastTelemetries?: LastTelemetryUncheckedCreateNestedManyWithoutDeviceInput
    tags?: TagUncheckedCreateNestedManyWithoutDevicesInput
    alerts?: AlertUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutHistoryInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutHistoryInput, DeviceUncheckedCreateWithoutHistoryInput>
  }

  export type DeviceUpsertWithoutHistoryInput = {
    update: XOR<DeviceUpdateWithoutHistoryInput, DeviceUncheckedUpdateWithoutHistoryInput>
    create: XOR<DeviceCreateWithoutHistoryInput, DeviceUncheckedCreateWithoutHistoryInput>
  }

  export type DeviceUpdateWithoutHistoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    credential?: CredentialUpdateOneWithoutDeviceNestedInput
    attributes?: AttributeUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUpdateManyWithoutDeviceNestedInput
    deviceProfile?: DeviceProfileUpdateOneWithoutDevicesNestedInput
    firmware?: FirmwareUpdateOneWithoutDeviceNestedInput
    tags?: TagUpdateManyWithoutDevicesNestedInput
    VirtualDevice?: VirtualDeviceUpdateOneWithoutDevicesNestedInput
    alerts?: AlertUpdateManyWithoutDeviceNestedInput
    group?: GroupUpdateOneWithoutDevicesNestedInput
  }

  export type DeviceUncheckedUpdateWithoutHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUncheckedUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput
    tags?: TagUncheckedUpdateManyWithoutDevicesNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceCreateManyVirtualDeviceInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId?: number | null
    tenantId?: number | null
  }

  export type DeviceUpdateWithoutVirtualDeviceInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    credential?: CredentialUpdateOneWithoutDeviceNestedInput
    attributes?: AttributeUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUpdateManyWithoutDeviceNestedInput
    deviceProfile?: DeviceProfileUpdateOneWithoutDevicesNestedInput
    firmware?: FirmwareUpdateOneWithoutDeviceNestedInput
    tags?: TagUpdateManyWithoutDevicesNestedInput
    alerts?: AlertUpdateManyWithoutDeviceNestedInput
    group?: GroupUpdateOneWithoutDevicesNestedInput
    history?: HistoryUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutVirtualDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUncheckedUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput
    tags?: TagUncheckedUpdateManyWithoutDevicesNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutDeviceNestedInput
    history?: HistoryUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateManyWithoutDevicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GroupCreateManyParentInput = {
    id?: number
    name: string
    type?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    lat?: number | null
    lng?: number | null
    ip?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
  }

  export type DeviceCreateManyGroupInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    tenantId?: number | null
  }

  export type GroupUpdateWithoutParentInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    subgroups?: GroupUpdateManyWithoutParentNestedInput
    devices?: DeviceUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    subgroups?: GroupUncheckedUpdateManyWithoutParentNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateManyWithoutSubgroupsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceUpdateWithoutGroupInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    credential?: CredentialUpdateOneWithoutDeviceNestedInput
    attributes?: AttributeUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUpdateManyWithoutDeviceNestedInput
    deviceProfile?: DeviceProfileUpdateOneWithoutDevicesNestedInput
    firmware?: FirmwareUpdateOneWithoutDeviceNestedInput
    tags?: TagUpdateManyWithoutDevicesNestedInput
    VirtualDevice?: VirtualDeviceUpdateOneWithoutDevicesNestedInput
    alerts?: AlertUpdateManyWithoutDeviceNestedInput
    history?: HistoryUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUncheckedUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput
    tags?: TagUncheckedUpdateManyWithoutDevicesNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutDeviceNestedInput
    history?: HistoryUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceProfileCreateManyDecoderInput = {
    id?: number
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    deviceTypeId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    protocolId?: number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
  }

  export type DeviceProfileUpdateWithoutDecoderInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceType?: DeviceTypeUpdateOneWithoutDeviceProfilesNestedInput
    devices?: DeviceUpdateManyWithoutDeviceProfileNestedInput
    protocol?: ProtocolUpdateOneWithoutDeviceProfilesNestedInput
  }

  export type DeviceProfileUncheckedUpdateWithoutDecoderInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    deviceTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    devices?: DeviceUncheckedUpdateManyWithoutDeviceProfileNestedInput
  }

  export type DeviceProfileUncheckedUpdateManyWithoutDeviceProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    deviceTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceProfileCreateManyDeviceTypeInput = {
    id?: number
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    createdAt?: Date | string
    updatedAt?: Date | string
    protocolId?: number | null
    decoderId?: number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
  }

  export type DeviceProfileUpdateWithoutDeviceTypeInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    devices?: DeviceUpdateManyWithoutDeviceProfileNestedInput
    protocol?: ProtocolUpdateOneWithoutDeviceProfilesNestedInput
    decoder?: DecoderUpdateOneWithoutDeviceProfileNestedInput
  }

  export type DeviceProfileUncheckedUpdateWithoutDeviceTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: NullableIntFieldUpdateOperationsInput | number | null
    decoderId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    devices?: DeviceUncheckedUpdateManyWithoutDeviceProfileNestedInput
  }

  export type DeviceProfileUncheckedUpdateManyWithoutDeviceProfilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: NullableIntFieldUpdateOperationsInput | number | null
    decoderId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceCreateManyFirmwareInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    deviceProfileId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
  }

  export type DeviceUpdateWithoutFirmwareInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    credential?: CredentialUpdateOneWithoutDeviceNestedInput
    attributes?: AttributeUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUpdateManyWithoutDeviceNestedInput
    deviceProfile?: DeviceProfileUpdateOneWithoutDevicesNestedInput
    tags?: TagUpdateManyWithoutDevicesNestedInput
    VirtualDevice?: VirtualDeviceUpdateOneWithoutDevicesNestedInput
    alerts?: AlertUpdateManyWithoutDeviceNestedInput
    group?: GroupUpdateOneWithoutDevicesNestedInput
    history?: HistoryUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutFirmwareInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUncheckedUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput
    tags?: TagUncheckedUpdateManyWithoutDevicesNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutDeviceNestedInput
    history?: HistoryUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateManyWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceProfileCreateManyProtocolInput = {
    id?: number
    name: string
    description?: string | null
    logo?: string | null
    cridentialsType?: TypeCredential | null
    deviceTypeId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    decoderId?: number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: number | null
  }

  export type DeviceProfileUpdateWithoutProtocolInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceType?: DeviceTypeUpdateOneWithoutDeviceProfilesNestedInput
    devices?: DeviceUpdateManyWithoutDeviceProfileNestedInput
    decoder?: DecoderUpdateOneWithoutDeviceProfileNestedInput
  }

  export type DeviceProfileUncheckedUpdateWithoutProtocolInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    cridentialsType?: NullableEnumTypeCredentialFieldUpdateOperationsInput | TypeCredential | null
    deviceTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    decoderId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    devices?: DeviceUncheckedUpdateManyWithoutDeviceProfileNestedInput
  }

  export type DeviceCreateManyDeviceProfileInput = {
    id?: number
    name: string
    description?: string | null
    serial: string
    isPassive?: boolean
    isOnline?: boolean
    isdecoded?: boolean
    credentialId?: number | null
    configuration?: string | null
    firmwareId?: number | null
    ip?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    virtualDeviceId?: number | null
    groupId?: number | null
    tenantId?: number | null
  }

  export type DeviceUpdateWithoutDeviceProfileInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    credential?: CredentialUpdateOneWithoutDeviceNestedInput
    attributes?: AttributeUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUpdateManyWithoutDeviceNestedInput
    firmware?: FirmwareUpdateOneWithoutDeviceNestedInput
    tags?: TagUpdateManyWithoutDevicesNestedInput
    VirtualDevice?: VirtualDeviceUpdateOneWithoutDevicesNestedInput
    alerts?: AlertUpdateManyWithoutDeviceNestedInput
    group?: GroupUpdateOneWithoutDevicesNestedInput
    history?: HistoryUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutDeviceProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUncheckedUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput
    tags?: TagUncheckedUpdateManyWithoutDevicesNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutDeviceNestedInput
    history?: HistoryUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUpdateWithoutTagsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    credential?: CredentialUpdateOneWithoutDeviceNestedInput
    attributes?: AttributeUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUpdateManyWithoutDeviceNestedInput
    deviceProfile?: DeviceProfileUpdateOneWithoutDevicesNestedInput
    firmware?: FirmwareUpdateOneWithoutDeviceNestedInput
    VirtualDevice?: VirtualDeviceUpdateOneWithoutDevicesNestedInput
    alerts?: AlertUpdateManyWithoutDeviceNestedInput
    group?: GroupUpdateOneWithoutDevicesNestedInput
    history?: HistoryUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    isPassive?: BoolFieldUpdateOperationsInput | boolean
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isdecoded?: BoolFieldUpdateOperationsInput | boolean
    credentialId?: NullableIntFieldUpdateOperationsInput | number | null
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    deviceProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    firmwareId?: NullableIntFieldUpdateOperationsInput | number | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    virtualDeviceId?: NullableIntFieldUpdateOperationsInput | number | null
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    tenantId?: NullableIntFieldUpdateOperationsInput | number | null
    attributes?: AttributeUncheckedUpdateManyWithoutDeviceNestedInput
    lastTelemetries?: LastTelemetryUncheckedUpdateManyWithoutDeviceNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutDeviceNestedInput
    history?: HistoryUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type AttributeCreateManyDeviceInput = {
    id?: number
    name: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LastTelemetryCreateManyDeviceInput = {
    id?: number
    name: string
    value: JsonNullValueInput | InputJsonValue
    alias?: string | null
    icon?: string | null
    color?: string | null
    show?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AlertCreateManyDeviceInput = {
    id?: number
    type?: string | null
    message?: string | null
    level?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: number | null
  }

  export type HistoryCreateManyDeviceInput = {
    id?: number
    name: string
    value: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttributeUpdateWithoutDeviceInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttributeUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttributeUncheckedUpdateManyWithoutAttributesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LastTelemetryUpdateWithoutDeviceInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    alias?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    show?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LastTelemetryUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    alias?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    show?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LastTelemetryUncheckedUpdateManyWithoutLastTelemetriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    alias?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    show?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpdateWithoutDevicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateWithoutDevicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateManyWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUpdateWithoutDeviceInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AlertUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AlertUncheckedUpdateManyWithoutAlertsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: JsonNullValueInput | InputJsonValue
    acknowledgedBy?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HistoryUpdateWithoutDeviceInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoryUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoryUncheckedUpdateManyWithoutHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}